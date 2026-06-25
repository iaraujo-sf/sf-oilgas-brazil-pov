export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body || {};
  if (!message) {
    return res.status(400).json({ error: 'message is required' });
  }

  try {
    const token = await getAccessToken();
    const instanceUrl = process.env.SF_INSTANCE_URL;

    const response = await fetch(`${instanceUrl}/services/apexrest/agent/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      console.error('Apex REST error:', response.status, await response.text());
      return res.status(200).json({ reply: null, fallback: true });
    }

    const data = await response.json();
    return res.status(200).json({ reply: data.reply });
  } catch (err) {
    console.error('Agent proxy error:', err.message);
    return res.status(200).json({ reply: null, fallback: true });
  }
}

async function getAccessToken() {
  if (process.env.SF_ACCESS_TOKEN) {
    return process.env.SF_ACCESS_TOKEN;
  }

  const params = new URLSearchParams({
    grant_type: 'password',
    client_id: process.env.SF_CLIENT_ID,
    client_secret: process.env.SF_CLIENT_SECRET,
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD + (process.env.SF_SECURITY_TOKEN || '')
  });

  const loginUrl = process.env.SF_LOGIN_URL || 'https://login.salesforce.com';
  const response = await fetch(`${loginUrl}/services/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  if (!response.ok) {
    throw new Error(`OAuth failed: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}
