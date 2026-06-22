import { useMemo, useState } from 'react'
import { Search, Headset, Circle } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Card from '../../components/ui/Card.jsx'
import Badge from '../../components/ui/Badge.jsx'
import Avatar from '../../components/ui/Avatar.jsx'
import StatCard from '../../components/ui/StatCard.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import { Input, Select } from '../../components/ui/Input.jsx'
import { ProgressBar } from '../../components/ui/Charts.jsx'
import { Users, Wifi, WifiOff, Clock } from 'lucide-react'
import { agents, agentStatuses } from '../../data/portalData.js'

const dotColor = { online: 'text-emerald-500', away: 'text-amber-500', offline: 'text-surface-400' }

export default function AgentMonitoring() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')

  const filtered = useMemo(
    () =>
      agents.filter((a) => {
        const matchesQuery = a.name.toLowerCase().includes(query.toLowerCase()) || a.email.toLowerCase().includes(query.toLowerCase())
        const matchesStatus = status === 'all' || a.status === status
        return matchesQuery && matchesStatus
      }),
    [query, status]
  )

  const online = agents.filter((a) => a.status === 'online').length
  const offline = agents.filter((a) => a.status === 'offline').length

  return (
    <div className="space-y-6">
      <PageHeader title="Agent monitoring" subtitle="Live agent availability and performance across customers." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total agents" value={agents.length} delta="+88" period="platform" />
        <StatCard icon={Wifi} label="Online now" value={online} delta="" period="available" />
        <StatCard icon={WifiOff} label="Offline" value={offline} delta="" period="unavailable" trend="down" />
        <StatCard icon={Clock} label="Avg response" value="48s" delta="-6s" period="vs last week" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <Input icon={Search} placeholder="Search agents…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="sm:w-44">
          {agentStatuses.map((s) => (
            <option key={s} value={s}>{s === 'all' ? 'All statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Headset} title="No agents found" description="Try a different search or filter." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <Card key={a.id} hover className="p-5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar name={a.name} />
                  <Circle className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full fill-current ${dotColor[a.status]} ring-2 ring-white dark:ring-surface-900`} />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-surface-900 dark:text-white">{a.name}</p>
                  <p className="truncate text-xs text-surface-500">{a.role}</p>
                </div>
                <Badge tone={a.status === 'online' ? 'green' : a.status === 'away' ? 'amber' : 'gray'} dot className="ml-auto">
                  {a.status}
                </Badge>
              </div>

              <div className="mt-4 space-y-3 border-t border-surface-100 pt-4 dark:border-surface-800">
                <Row label="Chats handled" value={a.chatsHandled.toLocaleString()} />
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-surface-500">Resolution rate</span>
                    <span className="font-medium text-surface-900 dark:text-white">{a.resolutionRate}%</span>
                  </div>
                  <ProgressBar value={a.resolutionRate} color="#10b981" />
                </div>
                <Row label="Avg response" value={a.avgResponse} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-surface-500">{label}</span>
      <span className="font-medium text-surface-900 dark:text-white">{value}</span>
    </div>
  )
}
