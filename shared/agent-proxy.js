#!/usr/bin/env node
/**
 * Agentforce Proxy Server
 * Bridges the POV chat widget to the real Agentforce agent via sf CLI preview.
 * Handles CORS and relays requests using `sf agent preview send`.
 *
 * Usage: node shared/agent-proxy.js
 * Requires: sf CLI authenticated to the oilgas-pov org
 */

const http = require('http');
const { execFileSync } = require('child_process');

const path = require('path');

const PORT = 3001;
const AGENT_API_NAME = 'OilGas_Advisor';
const PROJECT_DIR = path.resolve(__dirname, '..', 'agentforce-adlc');

let instanceUrl = '';
let sessionId = null;

function refreshCredentials() {
  try {
    const output = execFileSync('sf', ['org', 'display', '--json', '--target-org', 'oilgas-pov'], { encoding: 'utf8' });
    const data = JSON.parse(output);
    instanceUrl = data.result.instanceUrl;
    console.log(`[proxy] Org connected: ${instanceUrl}`);
  } catch (e) {
    console.error('[proxy] Failed to connect. Run: sf org login web --alias oilgas-pov');
    process.exit(1);
  }
}

function startPreviewSession() {
  try {
    const output = execFileSync('sf', [
      'agent', 'preview', 'start', '--json',
      '--use-live-actions',
      '--authoring-bundle', AGENT_API_NAME
    ], { encoding: 'utf8', timeout: 90000, cwd: PROJECT_DIR });
    const data = JSON.parse(output);
    if (data.status === 0 && data.result.sessionId) {
      sessionId = data.result.sessionId;
      console.log(`[proxy] Preview session started: ${sessionId}`);
      return true;
    }
    return false;
  } catch (e) {
    console.error('[proxy] Failed to start preview session:', e.message);
    return false;
  }
}

function sendToAgent(message) {
  if (!sessionId) {
    if (!startPreviewSession()) {
      return null;
    }
  }

  try {
    const output = execFileSync('sf', [
      'agent', 'preview', 'send', '--json',
      '--authoring-bundle', AGENT_API_NAME,
      '--session-id', sessionId,
      '-u', message
    ], { encoding: 'utf8', timeout: 60000, cwd: PROJECT_DIR });

    const data = JSON.parse(output);
    if (data.status === 0 && data.result.messages) {
      const agentMessages = data.result.messages
        .filter(m => m.type === 'Inform' || m.type === 'Text')
        .map(m => m.message || m.text || '')
        .join('\n\n');
      return agentMessages || null;
    }
    return null;
  } catch (e) {
    console.error('[proxy] Send failed, resetting session:', e.message);
    sessionId = null;
    return null;
  }
}

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => resolve(data));
  });
}

const server = http.createServer(async (req, res) => {
  setCors(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    if (req.method === 'POST' && req.url === '/session') {
      if (!sessionId) startPreviewSession();
      const clientId = `client_${Date.now()}`;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ clientId, sessionId }));
      console.log(`[proxy] Client connected: ${clientId}`);

    } else if (req.method === 'POST' && req.url === '/message') {
      const body = JSON.parse(await readBody(req));
      const { message } = body;

      console.log(`[proxy] >>> ${message}`);
      const reply = sendToAgent(message);

      if (reply) {
        console.log(`[proxy] <<< ${reply.substring(0, 100)}...`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply: null, fallback: true }));
      }

    } else if (req.method === 'GET' && req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', agent: AGENT_API_NAME, org: instanceUrl, session: sessionId }));

    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not found' }));
    }
  } catch (err) {
    console.error('[proxy] Error:', err.message);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err.message }));
  }
});

refreshCredentials();
server.listen(PORT, () => {
  console.log(`\n Agentforce Proxy running on http://localhost:${PORT}`);
  console.log(`   Agent: ${AGENT_API_NAME}`);
  console.log(`   Org: ${instanceUrl}`);
  console.log(`   Session: ${sessionId}`);
  console.log(`   Endpoints:`);
  console.log(`     POST /session  — create client session`);
  console.log(`     POST /message  — send message {clientId, message}`);
  console.log(`     GET  /health   — status check\n`);
});
