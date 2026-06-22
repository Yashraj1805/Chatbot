import { useMemo, useState } from 'react'
import { Search, Bot } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Card from '../../components/ui/Card.jsx'
import Badge from '../../components/ui/Badge.jsx'
import StatCard from '../../components/ui/StatCard.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import { Input, Select } from '../../components/ui/Input.jsx'
import { ProgressBar } from '../../components/ui/Charts.jsx'
import { Activity, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import { monitoredChatbots } from '../../data/portalData.js'

const statusTone = { active: 'green', degraded: 'amber', down: 'red', paused: 'gray' }

function healthColor(h) {
  if (h >= 90) return '#10b981'
  if (h >= 60) return '#f59e0b'
  return '#ef4444'
}

export default function ChatbotMonitoring() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')

  const filtered = useMemo(
    () =>
      monitoredChatbots.filter((b) => {
        const q = query.toLowerCase()
        const matchesQuery = b.name.toLowerCase().includes(q) || b.customer.toLowerCase().includes(q)
        const matchesStatus = status === 'all' || b.status === status
        return matchesQuery && matchesStatus
      }),
    [query, status]
  )

  const counts = monitoredChatbots.reduce((acc, b) => ({ ...acc, [b.status]: (acc[b.status] || 0) + 1 }), {})

  return (
    <div className="space-y-6">
      <PageHeader title="Chatbot monitoring" subtitle="Health and activity across every customer chatbot." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Activity} label="Total chatbots" value={monitoredChatbots.length} delta="+213" period="platform" />
        <StatCard icon={CheckCircle2} label="Healthy" value={counts.active || 0} delta="" period="≥ 90% health" />
        <StatCard icon={AlertTriangle} label="Degraded" value={counts.degraded || 0} delta="" period="needs review" trend="down" />
        <StatCard icon={XCircle} label="Down" value={counts.down || 0} delta="" period="action required" trend="down" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <Input icon={Search} placeholder="Search chatbots or customers…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="sm:w-44">
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="degraded">Degraded</option>
          <option value="down">Down</option>
          <option value="paused">Paused</option>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Bot} title="No chatbots found" description="Try a different search or filter." />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200 text-left text-xs uppercase tracking-wider text-surface-400 dark:border-surface-800">
                  <th className="px-5 py-3 font-semibold">Chatbot</th>
                  <th className="px-5 py-3 font-semibold">Customer</th>
                  <th className="px-5 py-3 font-semibold">Conversations</th>
                  <th className="px-5 py-3 font-semibold">Health</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                {filtered.map((b) => (
                  <tr key={b.id} className="transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/40">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-300">
                          <Bot className="h-4 w-4" />
                        </span>
                        <span className="font-medium text-surface-900 dark:text-white">{b.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-surface-600 dark:text-surface-400">{b.customer}</td>
                    <td className="px-5 py-3.5 text-surface-600 dark:text-surface-400">{b.conversations.toLocaleString()}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <ProgressBar value={b.health} color={healthColor(b.health)} className="w-24" />
                        <span className="text-xs font-medium text-surface-500">{b.health}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><Badge tone={statusTone[b.status]} dot>{b.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
