import { useEffect, useRef, useState } from 'react'
import { Bot, User, Send, X, RotateCcw } from 'lucide-react'
import { flowCatalog, nodeSummary } from '../../data/flowNodes.js'
import { cn } from '../../utils/cn.js'

// Evaluates a condition node against the variables collected so far.
function evalCondition(d, vars) {
  const raw = vars[d.variable]
  const has = raw !== undefined && raw !== null && String(raw).trim() !== ''
  switch (d.operator) {
    case 'is set':
      return has
    case 'is not set':
      return !has
    case 'equals':
      return String(raw ?? '') === String(d.value ?? '')
    case 'not equals':
      return String(raw ?? '') !== String(d.value ?? '')
    case 'contains':
      return String(raw ?? '').toLowerCase().includes(String(d.value ?? '').toLowerCase())
    case 'greater than':
      return Number(raw) > Number(d.value)
    case 'less than':
      return Number(raw) < Number(d.value)
    default:
      return false
  }
}

// A right-side drawer that runs the flow the customer built — a real
// interpreter over the nodes/edges, so testing reflects the actual graph.
export default function FlowPlayground({ nodes, edges, botName = 'Chatbot', themeColor = '#4f46e5', onClose }) {
  const [messages, setMessages] = useState([])
  const [awaiting, setAwaiting] = useState(null) // {type:'input'|'buttons', nodeId, variable?, buttons?}
  const [input, setInput] = useState('')
  const [ended, setEnded] = useState(false)
  const varsRef = useRef({})
  const scrollRef = useRef(null)
  const guardRef = useRef(0) // stops runaway loops (e.g. a Jump-to-step cycle)

  const nodeById = (id) => nodes.find((n) => n.id === id)
  const outTarget = (id, handle) =>
    edges.find((e) => e.source === id && (handle ? e.sourceHandle === handle : true))?.target

  const addBot = (text) => setMessages((m) => [...m, { from: 'bot', text }])
  const addUser = (text) => setMessages((m) => [...m, { from: 'user', text }])
  const addSys = (text) => setMessages((m) => [...m, { from: 'system', text }])

  const next = (id) => setTimeout(() => run(outTarget(id)), 550)

  const run = (nodeId) => {
    guardRef.current += 1
    if (guardRef.current > 60) {
      addSys('— Stopped: too many steps without a reply (possible loop) —')
      setEnded(true)
      setAwaiting(null)
      return
    }
    const node = nodeId && nodeById(nodeId)
    if (!node) {
      addSys('— End of conversation —')
      setEnded(true)
      setAwaiting(null)
      return
    }
    if (node.type === 'start') return run(outTarget(nodeId))

    const { kind } = node.data
    const d = node.data
    const def = flowCatalog[kind]

    if (kind === 'send_message') {
      addBot(d.message || '…')
      if (d.buttons?.length) setAwaiting({ type: 'buttons', nodeId, buttons: d.buttons })
      else next(nodeId)
    } else if (kind === 'buttons' || kind === 'list') {
      addBot(d.message || '…')
      const opts = d.options || []
      if (opts.length) setAwaiting({ type: 'options', nodeId, options: opts })
      else next(nodeId)
    } else if (kind === 'ask_question') {
      addBot(d.question || '…')
      setAwaiting({ type: 'input', nodeId, variable: d.variable })
    } else if (kind === 'condition') {
      const res = evalCondition(d, varsRef.current)
      addSys(`Condition: $${d.variable} ${d.operator}${d.value ? ` "${d.value}"` : ''} → ${res ? 'Yes' : 'No'}`)
      setTimeout(() => run(outTarget(nodeId, res ? 'true' : 'false')), 500)
    } else if (kind === 'goto') {
      addSys(`↪ ${d.targetLabel ? `Jump to ${d.targetLabel}` : 'Jump to step'}`)
      setTimeout(() => run(d.targetId), 500)
    } else {
      addSys(`⚙ ${def?.label}: ${nodeSummary(kind, d)}`)
      next(nodeId)
    }
  }

  const start = () => {
    varsRef.current = {}
    guardRef.current = 0
    setEnded(false)
    setAwaiting(null)
    setMessages([])
    const startNode = nodes.find((n) => n.type === 'start') || nodes[0]
    const firstId = startNode ? (startNode.type === 'start' ? outTarget(startNode.id) : startNode.id) : null
    setTimeout(() => run(firstId), 300)
  }

  // Kick off on open
  useEffect(() => {
    start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, awaiting])

  const submitInput = () => {
    const val = input.trim()
    if (!val || awaiting?.type !== 'input') return
    if (awaiting.variable) varsRef.current[awaiting.variable] = val
    addUser(val)
    setInput('')
    guardRef.current = 0
    const nid = awaiting.nodeId
    setAwaiting(null)
    next(nid)
  }

  const clickButton = (label) => {
    addUser(label)
    guardRef.current = 0
    const nid = awaiting.nodeId
    setAwaiting(null)
    next(nid)
  }

  // Buttons / List — each option follows its own branch (sourceHandle opt-i)
  const clickOption = (index, label) => {
    addUser(label)
    guardRef.current = 0
    const nid = awaiting.nodeId
    setAwaiting(null)
    setTimeout(() => run(outTarget(nid, `opt-${index}`)), 550)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-surface-950/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-fade-in dark:bg-surface-900">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 text-white" style={{ backgroundColor: themeColor }}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
            <Bot className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{botName}</p>
            <p className="text-xs text-white/80">Playground · test mode</p>
          </div>
          <button onClick={start} className="rounded-lg p-1.5 hover:bg-white/15" title="Restart">
            <RotateCcw className="h-4.5 w-4.5" />
          </button>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-white/15" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-surface-50 p-4 dark:bg-surface-950">
          {messages.map((m, i) => (
            <Bubble key={i} m={m} themeColor={themeColor} />
          ))}
        </div>

        {/* Composer */}
        <div className="border-t border-surface-200 bg-white p-3 dark:border-surface-800 dark:bg-surface-900">
          {awaiting?.type === 'buttons' ? (
            <div className="flex flex-wrap gap-2">
              {awaiting.buttons.map((b) => (
                <button
                  key={b}
                  onClick={() => clickButton(b)}
                  className="rounded-full border px-3 py-1.5 text-sm font-medium transition-colors hover:text-white"
                  style={{ borderColor: themeColor, color: themeColor }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = themeColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {b}
                </button>
              ))}
            </div>
          ) : awaiting?.type === 'options' ? (
            <div className="flex flex-col gap-2">
              {awaiting.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => clickOption(i, opt)}
                  className="flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm font-medium transition-colors hover:text-white"
                  style={{ borderColor: themeColor, color: themeColor }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = themeColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : ended ? (
            <button
              onClick={start}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-surface-200 py-2.5 text-sm font-semibold text-surface-600 hover:bg-surface-50 dark:border-surface-700 dark:text-surface-300 dark:hover:bg-surface-800"
            >
              <RotateCcw className="h-4 w-4" /> Restart conversation
            </button>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submitInput()
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={awaiting?.type !== 'input'}
                placeholder={awaiting?.type === 'input' ? 'Type your answer…' : 'Bot is responding…'}
                className="h-10 flex-1 rounded-full border border-surface-200 bg-surface-50 px-4 text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 disabled:opacity-60 dark:border-surface-700 dark:bg-surface-800 dark:text-white"
              />
              <button
                type="submit"
                disabled={awaiting?.type !== 'input' || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-transform hover:scale-105 disabled:opacity-50"
                style={{ backgroundColor: themeColor }}
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function Bubble({ m, themeColor }) {
  if (m.from === 'system') {
    return (
      <div className="flex justify-center">
        <span className="rounded-full bg-surface-200 px-3 py-1 text-xs text-surface-500 dark:bg-surface-800">
          {m.text}
        </span>
      </div>
    )
  }
  const isUser = m.from === 'user'
  return (
    <div className={cn('flex gap-2', isUser ? 'flex-row-reverse' : '')}>
      <span
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white',
          isUser ? 'bg-surface-400 dark:bg-surface-600' : ''
        )}
        style={!isUser ? { backgroundColor: themeColor } : undefined}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </span>
      <div
        className={cn(
          'max-w-[78%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed',
          isUser ? 'rounded-br-md text-white' : 'rounded-bl-md bg-white text-surface-700 shadow-sm dark:bg-surface-800 dark:text-surface-100'
        )}
        style={isUser ? { backgroundColor: themeColor } : undefined}
      >
        {m.text}
      </div>
    </div>
  )
}
