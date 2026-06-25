export default async function handler(req, res) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 100,
        messages: [{ role: 'user', content: 'Say hello in one word' }]
      })
    });

    const status = response.status;
    const text = await response.text();
    res.status(200).json({ status, body: text.substring(0, 500) });
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
}
