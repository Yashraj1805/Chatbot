import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Smile } from 'lucide-react'
import { cn } from '../../utils/cn.js'
import { LogoGlyph } from '../Logo.jsx'
import { saveLead } from '../../lib/waitlist.js'

const EMAIL_RE = /[^\s@]+@[^\s@]+\.[^\s@]+/

const BUBBLE_IN = {
  initial: { opacity: 0, y: 10, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
}

// A self-contained, fully interactive chatbot widget preview.
// Works in two modes:
//   • mode="floating" — a launcher button + pop-up panel (like a real site widget)
//   • mode="inline"   — always-open panel for embedding in preview cards
//
// All behavior is mock/local: the bot echoes a canned reply with a typing delay.
export default function ChatWidget({
  mode = 'floating',
  themeColor = '#0d8983',
  botName = 'VartaBot Assistant',
  welcomeMessage = '👋 Hi there! How can I help you today?',
  quickReplies = ['💰 Pricing', '🛟 Support', '📅 Book a demo'],
  startOpen = false,
}) {
  const [open, setOpen] = useState(mode === 'inline' ? true : startOpen)
  const [messages, setMessages] = useState([{ from: 'bot', text: welcomeMessage }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)
  const capturedRef = useRef(false)

  // Reset the conversation whenever the configured welcome message changes
  useEffect(() => {
    setMessages([{ from: 'bot', text: welcomeMessage }])
  }, [welcomeMessage])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  const send = (text) => {
    const value = (text ?? input).trim()
    if (!value) return
    setMessages((m) => [...m, { from: 'user', text: value }])
    setInput('')
    setTyping(true)

    // If the visitor shares an email, capture it as a lead (once per session).
    const email = value.match(EMAIL_RE)?.[0]
    if (email && !capturedRef.current) {
      capturedRef.current = true
      saveLead({ source: 'widget', email })
    }

    // Rule-based reply — this widget mirrors the product itself (a no-code,
    // rule-based bot). It guides the visitor to leave their email.
    const reply = mockReply(value, messages)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { from: 'bot', text: reply }])
    }, 800)
  }

  const panel = (
    <div
      className={cn(
        'flex w-full flex-col overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-2xl dark:border-surface-700 dark:bg-surface-900',
        mode === 'floating' && 'h-[30rem] w-80 animate-slide-up sm:w-96'
      )}
      style={mode === 'inline' ? { height: '28rem' } : undefined}
    >
      {/* Header */}
      <div
        className="relative flex items-center gap-3 px-4 py-3.5 text-white"
        style={{ backgroundColor: themeColor }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10" />
        <div className="relative">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
            <LogoGlyph className="h-5 w-5 text-white" />
          </span>
          <span
            className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-400 ring-2"
            style={{ '--tw-ring-color': themeColor }}
          />
        </div>
        <div className="relative min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{botName}</p>
          <p className="truncate text-xs text-white/80">Online · replies instantly</p>
        </div>
        {mode === 'floating' && (
          <button
            onClick={() => setOpen(false)}
            className="relative rounded-lg p-1 transition-colors hover:bg-white/15"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto bg-surface-50 p-4 dark:bg-surface-950"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(120,130,150,0.07) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      >
        <div className="flex justify-center">
          <span className="rounded-full bg-surface-200/70 px-2.5 py-0.5 text-[10px] font-medium text-surface-500 dark:bg-surface-800/70 dark:text-surface-400">
            Today
          </span>
        </div>

        {messages.map((m, i) => (
          <motion.div key={i} {...BUBBLE_IN}>
            <Bubble from={m.from} themeColor={themeColor}>
              {m.text}
            </Bubble>
          </motion.div>
        ))}

        <AnimatePresence>
          {typing && (
            <motion.div {...BUBBLE_IN} exit={{ opacity: 0, scale: 0.96 }}>
              <Bubble from="bot" themeColor={themeColor}>
                <span className="flex gap-1 py-0.5">
                  <Dot delay="0ms" />
                  <Dot delay="150ms" />
                  <Dot delay="300ms" />
                </span>
              </Bubble>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick replies — only while it's just the greeting */}
        {messages.length === 1 && quickReplies?.length > 0 && (
          <div className="flex flex-wrap gap-2 pl-9 pt-1">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full border bg-white px-3 py-1.5 text-xs font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow dark:bg-surface-800"
                style={{ borderColor: themeColor, color: themeColor }}
              >
                {q}
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
        <div className="relative flex flex-1 items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message…"
            className="h-10 w-full rounded-full border border-surface-200 bg-surface-50 pl-4 pr-10 text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-surface-700 dark:bg-surface-800 dark:text-white"
          />
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-2 text-surface-400 transition-colors hover:text-surface-600 dark:hover:text-surface-200"
            aria-label="Add emoji"
          >
            <Smile className="h-5 w-5" />
          </button>
        </div>
        <button
          type="submit"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-md transition-transform hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
          style={{ backgroundColor: themeColor }}
          disabled={!input.trim()}
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>

      <div className="flex items-center justify-center gap-1 bg-white pb-2 text-[10px] text-surface-400 dark:bg-surface-900">
        Powered by
        <LogoGlyph className="h-3 w-3 text-brand-600" />
        <span className="font-semibold text-surface-500 dark:text-surface-400">VartaBot</span>
      </div>
    </div>
  )

  if (mode === 'inline') return panel

  // Floating mode: launcher + panel
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open && <div className="pointer-events-auto">{panel}</div>}
      <button
        onClick={() => setOpen((o) => !o)}
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full text-white shadow-glow transition-transform hover:scale-105"
        style={{ backgroundColor: themeColor }}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? <X className="h-6 w-6" /> : <LogoGlyph className="h-7 w-7" />}
      </button>
    </div>
  )
}

function Bubble({ from, themeColor, children }) {
  const isUser = from === 'user'

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[80%] rounded-2xl rounded-br-md px-3.5 py-2 text-sm leading-relaxed text-white shadow-sm"
          style={{ backgroundColor: themeColor }}
        >
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-end gap-2">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-sm">
        <LogoGlyph className="h-4 w-4" />
      </span>
      <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2 text-sm leading-relaxed text-surface-700 shadow-sm dark:bg-surface-800 dark:text-surface-100">
        {children}
      </div>
    </div>
  )
}

function Dot({ delay }) {
  return (
    <span
      className="h-2 w-2 animate-bounce-subtle rounded-full bg-surface-400"
      style={{ animationDelay: delay }}
    />
  )
}

// Small mock "rule engine" so the preview feels alive. Covers common intents and
// rotates its fallback so it never repeats the same line over and over.
const FALLBACKS = [
  'Got it 👍 I can help with pricing, setup, lead capture, or booking a demo — which sounds useful?',
  'Sure! Tell me what you’re after — pricing, features, or a quick demo?',
  'Happy to help! Try asking about pricing, integrations, or how setup works. 🙂',
]
let fbIndex = 0

function mockReply(text, history = []) {
  const t = text.toLowerCase().trim()
  if (!t) return FALLBACKS[0]

  const lastBot = [...history].reverse().find((m) => m.from === 'bot')?.text?.toLowerCase() || ''
  const askedEmail = lastBot.includes('email')
  const hasEmail = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(t)

  // Email capture flow — progresses instead of looping.
  if (hasEmail)
    return 'Perfect, got it ✅ — our team will reach out to you shortly. Anything else I can help with?'
  if (askedEmail) {
    if (/\b(yes|yeah|yep|sure|ok|okay|please|go ahead)\b/.test(t))
      return 'Great — just type your work email (like you@company.com) and I’ll set it up. ✉️'
    if (/\b(no|nope|not now|later|nah)\b/.test(t))
      return 'No problem! Browse pricing or features anytime — I’m here whenever you’re ready. 🙂'
  }

  if (/\b(hi|hello|hey|namaste|yo|hii)\b/.test(t))
    return 'Hey there! 👋 I can help with pricing, a demo, setup, or lead capture. What brings you in today?'
  if (/(thank|thx|thanks)/.test(t))
    return 'You’re welcome! 😊 Anything else — pricing, a demo, or setup help?'
  if (/(bye|goodbye|see ya|see you)/.test(t))
    return 'Take care! 👋 I’m here 24/7 whenever you need me.'
  if (/(pric|cost|plan|how much|budget|₹|💰)/.test(t))
    return 'Plans start at ₹99/mo with a 14-day free trial. Want me to start your trial? Just share your work email. ✉️'
  if (/(free|trial|start)/.test(t))
    return 'Awesome — your 14-day free trial needs no credit card. What’s your work email and I’ll set it up? ✉️'
  if (/(demo|book|call|schedule|meeting|📅)/.test(t))
    return 'Love it! A quick demo takes ~15 min. Drop your work email and I’ll send an invite. ✉️'
  if (/(setup|set up|install|embed|integrat|wordpress|shopify|webflow|wix|add to|code|website)/.test(t))
    return 'Setup is 3 steps: create a bot, add rules, paste one line of code — live in under 15 min. Which platform is your site on?'
  if (/(support|help|issue|problem|stuck|🛟)/.test(t))
    return 'Happy to help! Is it about setup, billing, or a feature? Tell me a bit more and I’ll point you the right way.'
  if (/(lead|capture|crm|contact)/.test(t))
    return 'VartaBot captures names, emails & phone numbers automatically. Want to try it — what’s your work email? ✉️'
  if (/(feature|what can|what do|do you|able to|capab)/.test(t))
    return 'I can greet visitors, answer FAQs, capture leads, and hand off to a human — all no-code. Want to see pricing or start a free trial?'
  if (/\b(yes|yeah|yep|sure|ok|okay|sounds good|please)\b/.test(t))
    return 'Perfect 🙌 Let’s get you started — what’s your work email and I’ll set up your free trial? ✉️'
  if (/\b(no|nope|not now|later|nah)\b/.test(t))
    return 'No worries! I’m here whenever you’re ready. Curious about pricing or what it can do?'

  const reply = FALLBACKS[fbIndex % FALLBACKS.length]
  fbIndex++
  return reply
}
