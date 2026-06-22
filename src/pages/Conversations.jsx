import { useMemo, useState } from 'react'
import { Search, MessagesSquare, Bot, User, UserCheck } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import Card from '../components/ui/Card.jsx'
import Badge, { statusTone } from '../components/ui/Badge.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { Input } from '../components/ui/Input.jsx'
import { cn } from '../utils/cn.js'
import { conversations } from '../data/mockData.js'

export default function Conversations() {
  const [query, setQuery] = useState('')
  const [activeId, setActiveId] = useState(conversations[0]?.id)

  const filtered = useMemo(
    () =>
      conversations.filter((c) => {
        const q = query.toLowerCase()
        return (
          c.visitor.toLowerCase().includes(q) ||
          c.botName.toLowerCase().includes(q) ||
          c.messages.some((m) => m.text.toLowerCase().includes(q))
        )
      }),
    [query]
  )

  const active = conversations.find((c) => c.id === activeId)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Conversations"
        subtitle="Review every chat between your visitors and your bots."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        {/* List */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="mb-3">
            <Input icon={Search} placeholder="Search conversations…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>

          {filtered.length === 0 ? (
            <EmptyState icon={MessagesSquare} title="No conversations" description="Nothing matches your search." />
          ) : (
            <Card className="divide-y divide-surface-100 overflow-hidden dark:divide-surface-800">
              {filtered.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={cn(
                    'flex w-full items-start gap-3 p-4 text-left transition-colors',
                    activeId === c.id
                      ? 'bg-brand-50 dark:bg-brand-950/30'
                      : 'hover:bg-surface-50 dark:hover:bg-surface-800/40'
                  )}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-100 text-surface-500 dark:bg-surface-800">
                    <User className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-surface-900 dark:text-white">
                        {c.visitor}
                      </p>
                      <span className="shrink-0 text-xs text-surface-400">{c.startedAt.split(' ')[1]}</span>
                    </div>
                    <p className="truncate text-xs text-surface-500">{c.botName}</p>
                    <p className="mt-1 truncate text-sm text-surface-600 dark:text-surface-400">
                      {c.messages[c.messages.length - 1].text}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <Badge tone={statusTone[c.status]} dot>
                        {c.status}
                      </Badge>
                      {c.capturedLead && (
                        <Badge tone="blue">
                          <UserCheck className="h-3 w-3" /> Lead
                        </Badge>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </Card>
          )}
        </div>

        {/* Transcript */}
        <div className="lg:col-span-7 xl:col-span-8">
          {active ? (
            <Card className="flex h-[36rem] flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b border-surface-200 p-4 dark:border-surface-800">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-100 text-surface-500 dark:bg-surface-800">
                    <User className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-surface-900 dark:text-white">{active.visitor}</p>
                    <p className="text-xs text-surface-500">
                      {active.botName} · {active.channel} · {active.startedAt}
                    </p>
                  </div>
                </div>
                <Badge tone={statusTone[active.status]} dot>
                  {active.status}
                </Badge>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto bg-surface-50 p-5 dark:bg-surface-950">
                {active.messages.map((m, i) => (
                  <div key={i} className={cn('flex gap-2.5', m.from === 'user' ? 'flex-row-reverse' : '')}>
                    <span
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                        m.from === 'bot'
                          ? 'bg-brand-100 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300'
                          : 'bg-surface-200 text-surface-500 dark:bg-surface-700'
                      )}
                    >
                      {m.from === 'bot' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </span>
                    <div className={cn('max-w-[75%]', m.from === 'user' ? 'text-right' : '')}>
                      <div
                        className={cn(
                          'inline-block rounded-2xl px-3.5 py-2 text-sm leading-relaxed',
                          m.from === 'bot'
                            ? 'rounded-bl-md bg-white text-surface-700 shadow-sm dark:bg-surface-800 dark:text-surface-100'
                            : 'rounded-br-md bg-brand-600 text-white'
                        )}
                      >
                        {m.text}
                      </div>
                      <p className="mt-1 text-xs text-surface-400">{m.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-surface-200 p-3 text-center text-xs text-surface-400 dark:border-surface-800">
                This is a read-only transcript · {active.messageCount} messages
              </div>
            </Card>
          ) : (
            <EmptyState icon={MessagesSquare} title="Select a conversation" description="Pick a chat from the list to read the full transcript." />
          )}
        </div>
      </div>
    </div>
  )
}
