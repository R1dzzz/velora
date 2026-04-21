export default async function handler(req, res) {
  // CORS headers for same-origin HTML
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages, model } = req.body

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages must be a non-empty array' })
  }

  const modelId = model || 'openai/gpt-4o-mini:free'

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : 'https://velora.vercel.app',
        'X-Title': 'Velora by RLC',
      },
      body: JSON.stringify({ model: modelId, messages, max_tokens: 4096 }),
    })

    const data = await response.json()

    if (!response.ok) {
      const msg = data?.error?.message || 'OpenRouter error'
      return res.status(response.status).json({ error: msg })
    }

    return res.status(200).json(data)
  } catch (err) {
    console.error('[/api/chat]', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
