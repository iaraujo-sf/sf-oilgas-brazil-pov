const INSTANCE_URL = process.env.SF_INSTANCE_URL || 'https://storm-f10a7458d1f648.my.salesforce.com';
const BOT_ID = process.env.SF_BOT_ID || '0XxKY000000OCDV0A4';
const SF_ACCESS_TOKEN = process.env.SF_ACCESS_TOKEN;

const AGENT_API = 'https://api.salesforce.com/einstein/ai-agent/v1';

let cachedJwt = null;
let jwtExpiry = 0;

async function getAgentJwt() {
  if (cachedJwt && Date.now() < jwtExpiry) return cachedJwt;

  const res = await fetch(`${INSTANCE_URL}/agentforce/bootstrap/nameduser`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `sid=${SF_ACCESS_TOKEN}`,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Bootstrap failed (${res.status}): ${err}`);
  }

  const data = await res.json();
  cachedJwt = data.access_token;
  // JWT typically valid for ~2 hours, refresh after 90 min
  jwtExpiry = Date.now() + 5400000;
  return cachedJwt;
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!SF_ACCESS_TOKEN) {
    return res.status(500).json({ error: 'SF_ACCESS_TOKEN not configured' });
  }

  try {
    const jwt = await getAgentJwt();
    const { action, sessionId, message } = req.body;

    if (action === 'start') {
      const body = {
        externalSessionKey: `web-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        instanceConfig: { endpoint: INSTANCE_URL },
        streamingCapabilities: { chunkTypes: ['Text'] },
        bypassUser: false,
      };

      const resp = await fetch(`${AGENT_API}/agents/${BOT_ID}/sessions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
          'x-client-name': 'oilgas-pov-web',
        },
        body: JSON.stringify(body),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        return res.status(502).json({ error: `Agent API (${resp.status}): ${errText}` });
      }

      const data = await resp.json();
      const welcomeMsg = data.messages?.map(m => m.message).join('\n') || '';
      return res.status(200).json({ sessionId: data.sessionId, welcome: welcomeMsg });
    }

    if (action === 'send') {
      if (!sessionId || !message) {
        return res.status(400).json({ error: 'sessionId and message required' });
      }

      const body = {
        message: { sequenceId: Date.now(), type: 'Text', text: message },
        variables: [],
      };

      const resp = await fetch(`${AGENT_API}/sessions/${sessionId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
          'x-client-name': 'oilgas-pov-web',
        },
        body: JSON.stringify(body),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        return res.status(502).json({ error: `Agent API (${resp.status}): ${errText}` });
      }

      const data = await resp.json();
      const reply = data.messages?.map(m => m.message).join('\n') || 'No response';
      return res.status(200).json({ reply });
    }

    return res.status(400).json({ error: 'action must be "start" or "send"' });
  } catch (err) {
    // If JWT expired, clear cache and return specific error
    if (err.message?.includes('401') || err.message?.includes('Bootstrap')) {
      cachedJwt = null;
      jwtExpiry = 0;
    }
    return res.status(500).json({ error: err.message });
  }
}
