import { useEffect, useRef, useState } from 'react'
import { X, Send, Sparkles, ChevronDown } from 'lucide-react'
import { LogoGlyph } from './Logo.jsx'

// Site-wide AI helper. Talks to our serverless function (/api/assistant, backed
// by Gemini) for real answers, and falls back to a local knowledge base if the
// API is unavailable (e.g. local `npm run dev`, or no key configured).
const KB = [
  {
    keys: ['price', 'pricing', 'cost', 'plan', 'how much', 'expensive'],
    a: 'We have 3 plans — Starter ₹99/mo, Growth ₹599/mo (most popular), and Scale ₹999/mo. Every plan includes a 14-day free trial, no credit card needed. On Scale, our team even sets up your AI chatbot for you. Want me to point you to pricing?',
  },
  {
    keys: ['free', 'trial', 'credit card'],
    a: 'Yes! Every plan has a 14-day free trial and you don’t need a credit card to start. You can cancel anytime.',
  },
  {
    keys: ['code', 'no-code', 'developer', 'technical', 'install', 'embed'],
    a: 'VartaBot is fully no-code. You build rules visually and add the chatbot to your site by pasting a single line of code — most people go live in under 15 minutes.',
  },
  {
    keys: ['ai', 'gpt', 'smart', 'rule', 'rule-based'],
    a: 'Today VartaBot is rule-based — fast, predictable, and fully under your control (keywords, buttons, and flows). AI-powered conversation bots are on our roadmap.',
  },
  {
    keys: ['lead', 'capture', 'email', 'crm'],
    a: 'VartaBot automatically captures names, emails, and phone numbers from conversations. You can view, filter, and export them, or pipe them to your CRM via Zapier.',
  },
  {
    keys: ['integration', 'wordpress', 'shopify', 'webflow', 'wix', 'slack', 'zapier'],
    a: 'It works on any website — WordPress, Shopify, Webflow, Wix, Squarespace and more — with no plugin. You can also connect Slack, HubSpot, and 50+ tools via Zapier.',
  },
  {
    keys: ['secure', 'security', 'gdpr', 'data', 'privacy'],
    a: 'We’re GDPR-conscious with role-based access and audit-friendly logs. Your data stays yours, and traffic is encrypted over SSL.',
  },
  {
    keys: ['setup', 'how long', 'time', 'fast', 'quick'],
    a: 'Setup takes about 3 steps: create a bot, add a few rules, and paste the embed snippet. Most customers are live in under 15 minutes.',
  },
  {
    keys: ['support', 'help', 'contact', 'talk', 'human', 'sales'],
    a: 'Happy to help! Start a free trial and we’ll guide you through onboarding — or just drop your email and our team will reach out.',
  },
  {
    keys: ['cancel', 'refund', 'money back'],
    a: 'Plans are month-to-month with no lock-in, and every paid plan includes a 30-day money-back guarantee. Cancel anytime.',
  },
]

const SUGGESTIONS = ['How much does it cost?', 'Do I need to code?', 'Is there a free trial?', 'How does lead capture work?']

function localAnswer(text) {
  const t = text.toLowerCase()
  const hit = KB.find((entry) => entry.keys.some((k) => t.includes(k)))
  if (hit) return hit.a
  if (/(hi|hello|hey|namaste)/.test(t))
    return 'Hi! 👋 I’m the VartaBot AI assistant. Ask me anything about pricing, features, integrations, or getting started.'
  return "Great question! I can help with pricing, features, integrations, security, and setup. Want to start a free trial, or share your email so our team can reach out?"
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: '👋 Hi! I’m the VartaBot AI assistant. How can I help you today?' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [nudge, setNudge] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing, open])

  // First-visit greeting pop — once per browser session, only while closed.
  useEffect(() => {
    if (open) {
      setNudge(false)
      return
    }
    try {
      if (sessionStorage.getItem('varta-nudge-seen')) return
    } catch (e) {}
    const t = setTimeout(() => setNudge(true), 2500)
    return () => clearTimeout(t)
  }, [open])

  const dismissNudge = () => {
    setNudge(false)
    try {
      sessionStorage.setItem('varta-nudge-seen', '1')
    } catch (e) {}
  }

  const toggle = () => {
    setOpen((o) => !o)
    dismissNudge()
  }

  const send = async (text) => {
    const value = (text ?? input).trim()
    if (!value) return
    // Snapshot history (before adding this message) for the model's context.
    const history = messages.slice(-8)
    setMessages((m) => [...m, { from: 'user', text: value }])
    setInput('')
    setTyping(true)

    let reply
    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: value, history }),
      })
      const data = await res.json()
      reply = res.ok && data.reply ? data.reply : localAnswer(value)
    } catch (e) {
      reply = localAnswer(value)
    }

    setTyping(false)
    setMessages((m) => [...m, { from: 'bot', text: reply }])
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div className="flex h-[min(32rem,75vh)] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-2xl animate-slide-up dark:border-surface-700 dark:bg-surface-900 sm:w-96">
          {/* Header */}
          <div className="relative flex items-center gap-3 bg-gradient-to-br from-brand-600 to-accent-600 px-4 py-3.5 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
              <Sparkles className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">VartaBot AI</p>
              <p className="truncate text-xs text-white/80">Ask me anything · always on</p>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-lg p-1 transition-colors hover:bg-white/15" aria-label="Minimize assistant">
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-surface-50 p-4 dark:bg-surface-950"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(120,130,150,0.07) 1px, transparent 1px)', backgroundSize: '16px 16px' }}
          >
            {messages.map((m, i) =>
              m.from === 'user' ? (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-br from-brand-600 to-accent-600 px-3.5 py-2 text-sm leading-relaxed text-white shadow-sm">
                    {m.text}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex items-end gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-sm">
                    <LogoGlyph className="h-4 w-4" />
                  </span>
                  <div className="max-w-[82%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2 text-sm leading-relaxed text-surface-700 shadow-sm dark:bg-surface-800 dark:text-surface-100">
                    {m.text}
                  </div>
                </div>
              )
            )}

            {typing && (
              <div className="flex items-end gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-sm">
                  <LogoGlyph className="h-4 w-4" />
                </span>
                <div className="rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 shadow-sm dark:bg-surface-800">
                  <span className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce-subtle rounded-full bg-surface-400" />
                    <span className="h-2 w-2 animate-bounce-subtle rounded-full bg-surface-400" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 animate-bounce-subtle rounded-full bg-surface-400" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pl-9 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-semibold text-brand-600 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow dark:border-brand-800 dark:bg-surface-800 dark:text-brand-300"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send()
            }}
            className="flex items-center gap-2 border-t border-surface-200 bg-white p-3 dark:border-surface-700 dark:bg-surface-900"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about pricing, features…"
              className="h-10 flex-1 rounded-full border border-surface-200 bg-surface-50 px-4 text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-surface-700 dark:bg-surface-800 dark:text-white"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-accent-600 text-white shadow-md transition-transform hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Launcher area: greeting nudge + label pill + button */}
      <div className="relative flex items-center gap-2.5">
        {/* First-visit greeting bubble */}
        {nudge && !open && (
          <div className="absolute bottom-[4.5rem] right-0 flex w-max max-w-[15rem] animate-fade-in-up items-center gap-2 rounded-2xl rounded-br-md border border-surface-200 bg-white px-3.5 py-2.5 text-sm font-medium text-surface-700 shadow-xl dark:border-surface-700 dark:bg-surface-800 dark:text-surface-100">
            <span>Need help? Ask me 👋</span>
            <button
              onClick={dismissNudge}
              className="text-surface-400 transition-colors hover:text-surface-600 dark:hover:text-surface-200"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* "Ask AI" label pill (hidden when open) */}
        {!open && (
          <span className="hidden animate-fade-in rounded-full border border-surface-200 bg-white px-3 py-1.5 text-xs font-semibold text-surface-700 shadow-md dark:border-surface-700 dark:bg-surface-800 dark:text-surface-200 sm:inline-block">
            Ask AI
          </span>
        )}

        {/* Button — clean centered shadow (no offset halo) */}
        <button
          onClick={toggle}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-accent-600 text-white shadow-[0_8px_24px_-6px_rgba(20,167,160,0.5)] ring-1 ring-white/30 transition-transform hover:scale-105 active:scale-95"
          aria-label={open ? 'Close assistant' : 'Open AI assistant'}
        >
          {open ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
        </button>
      </div>
    </div>
  )
}
