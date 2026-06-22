import { useMemo, useRef, useState, useEffect } from 'react'
import {
  Search,
  Send,
  Bot,
  User,
  Zap,
  ArrowRightLeft,
  AlertTriangle,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Inbox as InboxIcon,
  ChevronLeft,
} from 'lucide-react'
import Card from '../../components/ui/Card.jsx'
import Badge from '../../components/ui/Badge.jsx'
import Button from '../../components/ui/Button.jsx'
import Avatar from '../../components/ui/Avatar.jsx'
import Modal from '../../components/ui/Modal.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import { Input, Select } from '../../components/ui/Input.jsx'
import { cn } from '../../utils/cn.js'
import { agentInbox, inboxStatuses, quickResponses, agents } from '../../data/portalData.js'

const tone = { new: 'blue', active: 'green', waiting: 'amber', closed: 'gray' }

export default function LiveInbox() {
  const [chats, setChats] = useState(agentInbox)
  const [activeId, setActiveId] = useState(agentInbox[0]?.id)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [input, setInput] = useState('')
  const [showQuick, setShowQuick] = useState(false)
  const [transferOpen, setTransferOpen] = useState(false)
  const [mobileView, setMobileView] = useState('list') // 'list' | 'chat'
  const scrollRef = useRef(null)

  const filtered = useMemo(
    () =>
      chats.filter((c) => {
        const matchesQuery = c.customer.name.toLowerCase().includes(query.toLowerCase())
        const matchesFilter = filter === 'all' || c.status === filter
        return matchesQuery && matchesFilter
      }),
    [chats, query, filter]
  )

  const active = chats.find((c) => c.id === activeId)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [active?.messages.length, activeId])

  const updateActive = (mutator) =>
    setChats((cs) => cs.map((c) => (c.id === activeId ? mutator(c) : c)))

  const send = (text) => {
    const value = (text ?? input).trim()
    if (!value || !active) return
    updateActive((c) => ({
      ...c,
      status: c.status === 'closed' ? 'closed' : 'active',
      messages: [...c.messages, { from: 'agent', text: value, time: 'now' }],
    }))
    setInput('')
    setShowQuick(false)
  }

  const closeChat = () => {
    updateActive((c) => ({
      ...c,
      status: 'closed',
      messages: [...c.messages, { from: 'system', text: 'Chat closed by Sam Rivera', time: 'now' }],
    }))
  }

  const escalate = () => {
    updateActive((c) => ({
      ...c,
      messages: [...c.messages, { from: 'system', text: 'Chat escalated to a specialist', time: 'now' }],
    }))
  }

  const transferTo = (agentName) => {
    updateActive((c) => ({
      ...c,
      messages: [...c.messages, { from: 'system', text: `Chat transferred to ${agentName}`, time: 'now' }],
    }))
    setTransferOpen(false)
  }

  const openChat = (id) => {
    setActiveId(id)
    setMobileView('chat')
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-surface-900 dark:text-white">Live inbox</h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
          Handle conversations transferred from your chatbots.
        </p>
      </div>

      <div className="grid h-[calc(100vh-13rem)] grid-cols-1 gap-4 lg:grid-cols-12">
        {/* ----------------------------- Chat list ----------------------------- */}
        <Card className={cn('flex flex-col overflow-hidden lg:col-span-4 xl:col-span-3', mobileView === 'chat' && 'hidden lg:flex')}>
          <div className="space-y-3 border-b border-surface-200 p-3 dark:border-surface-800">
            <Input icon={Search} placeholder="Search chats…" value={query} onChange={(e) => setQuery(e.target.value)} />
            <div className="flex gap-1 overflow-x-auto">
              {inboxStatuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={cn(
                    'shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors',
                    filter === s
                      ? 'bg-brand-600 text-white'
                      : 'bg-surface-100 text-surface-600 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-300'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <EmptyState icon={InboxIcon} title="No chats" description="Nothing here right now." className="m-3 border-0" />
            ) : (
              filtered.map((c) => (
                <button
                  key={c.id}
                  onClick={() => openChat(c.id)}
                  className={cn(
                    'flex w-full items-start gap-3 border-b border-surface-100 p-3 text-left transition-colors dark:border-surface-800',
                    activeId === c.id ? 'bg-brand-50 dark:bg-brand-950/30' : 'hover:bg-surface-50 dark:hover:bg-surface-800/40'
                  )}
                >
                  <Avatar name={c.customer.name} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-semibold text-surface-900 dark:text-white">{c.customer.name}</p>
                      <span className="shrink-0 text-xs text-surface-400">{c.waitingSince}</span>
                    </div>
                    <p className="truncate text-xs text-surface-500">{c.messages[c.messages.length - 1].text}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <Badge tone={tone[c.status]} dot>{c.status}</Badge>
                      {c.unread > 0 && (
                        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-semibold text-white">
                          {c.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </Card>

        {/* --------------------------- Message window --------------------------- */}
        <Card className={cn('flex flex-col overflow-hidden lg:col-span-8 xl:col-span-6', mobileView === 'list' && 'hidden lg:flex')}>
          {active ? (
            <>
              <div className="flex items-center justify-between gap-3 border-b border-surface-200 p-3 dark:border-surface-800">
                <div className="flex items-center gap-3">
                  <button onClick={() => setMobileView('list')} className="rounded-lg p-1.5 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 lg:hidden">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <Avatar name={active.customer.name} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-surface-900 dark:text-white">{active.customer.name}</p>
                    <p className="text-xs text-surface-500">via {active.bot}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button variant="secondary" size="sm" onClick={() => setTransferOpen(true)}>
                    <ArrowRightLeft className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Transfer</span>
                  </Button>
                  <Button variant="secondary" size="sm" onClick={escalate}>
                    <AlertTriangle className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Escalate</span>
                  </Button>
                  <Button size="sm" onClick={closeChat} disabled={active.status === 'closed'}>
                    <CheckCircle2 className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Close</span>
                  </Button>
                </div>
              </div>

              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-surface-50 p-4 dark:bg-surface-950">
                {active.messages.map((m, i) => (
                  <Message key={i} m={m} />
                ))}
              </div>

              {/* Composer */}
              <div className="relative border-t border-surface-200 p-3 dark:border-surface-800">
                {showQuick && (
                  <div className="absolute bottom-full left-3 right-3 mb-2 max-h-60 overflow-y-auto rounded-xl border border-surface-200 bg-white p-1.5 shadow-soft dark:border-surface-800 dark:bg-surface-900">
                    {quickResponses.map((q) => (
                      <button
                        key={q.id}
                        onClick={() => send(q.text)}
                        className="flex w-full flex-col rounded-lg px-3 py-2 text-left hover:bg-surface-100 dark:hover:bg-surface-800"
                      >
                        <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">{q.shortcut} · {q.title}</span>
                        <span className="truncate text-sm text-surface-600 dark:text-surface-300">{q.text}</span>
                      </button>
                    ))}
                  </div>
                )}
                <form onSubmit={(e) => { e.preventDefault(); send() }} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowQuick((s) => !s)}
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors',
                      showQuick
                        ? 'border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-950/40'
                        : 'border-surface-200 text-surface-500 hover:bg-surface-100 dark:border-surface-700 dark:hover:bg-surface-800'
                    )}
                    title="Quick responses"
                  >
                    <Zap className="h-5 w-5" />
                  </button>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={active.status === 'closed' ? 'This chat is closed' : 'Type a reply…'}
                    disabled={active.status === 'closed'}
                    className="h-10 flex-1 rounded-lg border border-surface-200 bg-surface-50 px-3.5 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 disabled:opacity-60 dark:border-surface-700 dark:bg-surface-800 dark:text-white"
                  />
                  <Button type="submit" size="icon" disabled={!input.trim() || active.status === 'closed'}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <EmptyState icon={InboxIcon} title="No conversation selected" description="Pick a chat from the list to start replying." className="m-4 border-0" />
          )}
        </Card>

        {/* ------------------------ Customer info panel ------------------------ */}
        <Card className="hidden flex-col overflow-y-auto xl:col-span-3 xl:flex">
          {active ? (
            <div className="space-y-5 p-4">
              <div className="flex flex-col items-center text-center">
                <Avatar name={active.customer.name} size="lg" />
                <p className="mt-3 font-semibold text-surface-900 dark:text-white">{active.customer.name}</p>
                <Badge tone={tone[active.status]} dot className="mt-1.5">{active.status}</Badge>
              </div>

              <div className="space-y-2.5 border-t border-surface-100 pt-4 text-sm dark:border-surface-800">
                <InfoRow icon={Mail} value={active.customer.email} />
                <InfoRow icon={Phone} value={active.customer.phone} />
                <InfoRow icon={MapPin} value={active.customer.location} />
                <InfoRow icon={Bot} value={`Started via ${active.bot}`} />
              </div>

              <div className="border-t border-surface-100 pt-4 dark:border-surface-800">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-400">Lead information</p>
                <div className="space-y-2 rounded-xl bg-surface-50 p-3 text-sm dark:bg-surface-800/50">
                  <LeadRow label="Interest" value={active.lead.interest} />
                  <LeadRow label="Budget" value={active.lead.budget} />
                  <LeadRow label="Stage" value={active.lead.stage} />
                </div>
              </div>

              <div className="border-t border-surface-100 pt-4 dark:border-surface-800">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-400">Conversation</p>
                <p className="text-sm text-surface-500">{active.messages.length} messages · waiting {active.waitingSince}</p>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center p-4 text-center text-sm text-surface-400">
              Customer details appear here
            </div>
          )}
        </Card>
      </div>

      {/* Transfer modal */}
      <Modal
        open={transferOpen}
        onClose={() => setTransferOpen(false)}
        title="Transfer chat"
        description="Hand this conversation to another agent."
      >
        <div className="space-y-2">
          {agents.filter((a) => a.name !== 'Sam Rivera').map((a) => (
            <button
              key={a.id}
              onClick={() => transferTo(a.name)}
              className="flex w-full items-center gap-3 rounded-xl border border-surface-200 p-3 text-left transition-colors hover:border-brand-300 hover:bg-surface-50 dark:border-surface-800 dark:hover:bg-surface-800/50"
            >
              <Avatar name={a.name} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-surface-900 dark:text-white">{a.name}</p>
                <p className="text-xs text-surface-500">{a.role}</p>
              </div>
              <Badge tone={a.status === 'online' ? 'green' : a.status === 'away' ? 'amber' : 'gray'} dot>{a.status}</Badge>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  )
}

function Message({ m }) {
  if (m.from === 'system') {
    return (
      <div className="flex justify-center">
        <span className="rounded-full bg-surface-200 px-3 py-1 text-xs text-surface-500 dark:bg-surface-800">{m.text}</span>
      </div>
    )
  }
  const isAgent = m.from === 'agent'
  const isBot = m.from === 'bot'
  return (
    <div className={cn('flex gap-2.5', isAgent ? 'flex-row-reverse' : '')}>
      <span
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          isBot ? 'bg-surface-200 text-surface-500 dark:bg-surface-700' : isAgent ? 'bg-brand-100 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300' : 'bg-surface-200 text-surface-500 dark:bg-surface-700'
        )}
      >
        {isAgent ? <User className="h-4 w-4" /> : isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </span>
      <div className={cn('max-w-[78%]', isAgent ? 'text-right' : '')}>
        <div
          className={cn(
            'inline-block rounded-2xl px-3.5 py-2 text-sm leading-relaxed',
            isAgent ? 'rounded-br-md bg-brand-600 text-white' : 'rounded-bl-md bg-white text-surface-700 shadow-sm dark:bg-surface-800 dark:text-surface-100'
          )}
        >
          {m.text}
        </div>
        <p className="mt-1 text-xs text-surface-400">{m.from === 'customer' ? 'Customer' : m.from === 'bot' ? 'Bot' : 'You'} · {m.time}</p>
      </div>
    </div>
  )
}

function InfoRow({ icon: Icon, value }) {
  return (
    <p className="flex items-center gap-2.5 text-surface-600 dark:text-surface-300">
      <Icon className="h-4 w-4 shrink-0 text-surface-400" />
      <span className="truncate">{value}</span>
    </p>
  )
}

function LeadRow({ label, value }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-surface-500">{label}</span>
      <span className="font-medium text-surface-900 dark:text-white">{value}</span>
    </div>
  )
}
