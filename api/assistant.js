// Vercel Serverless Function — powers the site's "Ask AI" assistant with
// Google Gemini. The API key stays here on the server (GEMINI_API_KEY); it is
// never sent to the browser. Configure via Vercel env vars:
//   GEMINI_API_KEY — your Gemini API key (from aistudio.google.com)  [required]
//   GEMINI_MODEL   — model id (default: gemini-2.0-flash)            [optional]

const SYSTEM_PROMPT = `You are "VartaBot AI", the friendly assistant on VartaBot's website.
VartaBot is a no-code chatbot platform that lets businesses build chatbots and capture leads — live in minutes, no developer needed.

Key facts (only state these if relevant, keep it accurate):
- Plans: Starter ₹99/mo, Growth ₹599/mo (most popular), Scale ₹999/mo. Every plan has a 14-day free trial, no credit card needed. On Scale, the team sets up the bot for you.
- Fully no-code: build rules visually, add the bot by pasting one line of code. Most go live in under 15 minutes.
- Today it is rule-based (keywords, buttons, flows) — predictable and under the customer's control. AI conversation bots are on the roadmap.
- Lead capture: automatically collects names, emails, phone numbers; view, filter, export, or send to a CRM via Zapier.
- Works on any website (WordPress, Shopify, Webflow, Wix, Squarespace...) with no plugin. Connects to Slack, HubSpot and 50+ tools via Zapier.
- Security: GDPR-conscious, role-based access, SSL-encrypted.
- Billing: month-to-month, no lock-in, 30-day money-back guarantee on paid plans, cancel anytime.
- The product is currently in an early pilot; visitors can join from the "Start free" / pilot signup button.

Style: warm, concise (2-4 sentences), helpful. You may reply in the user's language (English or Hindi/Hinglish). If you don't know something, suggest the Contact page. Never invent features or prices beyond the facts above.`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(503).json({ ok: false, error: 'Assistant not configured' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { body = {} }
  }
  body = body || {}

  const message = String(body.message || '').trim().slice(0, 1000)
  if (!message) return res.status(400).json({ ok: false, error: 'Message required' })

  // Build conversation: last few turns of history + the new message.
  const history = Array.isArray(body.history) ? body.history.slice(-8) : []
  const contents = [
    ...history
      .filter((m) => m && m.text)
      .map((m) => ({
        role: m.from === 'user' ? 'user' : 'model',
        parts: [{ text: String(m.text).slice(0, 1000) }],
      })),
    { role: 'user', parts: [{ text: message }] },
  ]

  const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash'
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { temperature: 0.6, maxOutputTokens: 400 },
      }),
    })

    if (!r.ok) {
      const detail = await r.text()
      console.error('[assistant] Gemini error', r.status, detail)
      return res.status(502).json({ ok: false, error: 'Upstream error' })
    }

    const data = await r.json()
    const reply = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('').trim()

    if (!reply) return res.status(502).json({ ok: false, error: 'Empty reply' })
    return res.status(200).json({ ok: true, reply })
  } catch (err) {
    console.error('[assistant] request failed:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
