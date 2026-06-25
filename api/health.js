export default function handler(req, res) {
  const hasKey = !!process.env.ANTHROPIC_API_KEY;
  const keyPrefix = hasKey ? process.env.ANTHROPIC_API_KEY.substring(0, 10) + '...' : 'NOT_SET';
  res.status(200).json({
    status: 'ok',
    hasAnthropicKey: hasKey,
    keyPrefix: keyPrefix,
    nodeVersion: process.version
  });
}
