import { useMemo, useState } from 'react'
import { Search, Download, Users, Mail, Phone } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import Badge, { statusTone } from '../components/ui/Badge.jsx'
import Avatar from '../components/ui/Avatar.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { Input, Select } from '../components/ui/Input.jsx'
import { leads, leadStatuses } from '../data/mockData.js'

export default function Leads() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')

  const filtered = useMemo(
    () =>
      leads.filter((l) => {
        const q = query.toLowerCase()
        const matchesQuery =
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.source.toLowerCase().includes(q)
        const matchesStatus = status === 'all' || l.status === status
        return matchesQuery && matchesStatus
      }),
    [query, status]
  )

  return (
    <div className="space-y-6">
      <PageHeader title="Leads" subtitle={`${leads.length} leads captured by your chatbots.`}>
        <Button variant="secondary">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </PageHeader>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <Input icon={Search} placeholder="Search by name, email, or source…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="sm:w-44">
          {leadStatuses.map((s) => (
            <option key={s} value={s}>
              {s === 'all' ? 'All statuses' : s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Users} title="No leads found" description="Try a different search or filter, or wait for your bots to capture new leads." />
      ) : (
        <Card className="overflow-hidden">
          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200 text-left text-xs uppercase tracking-wider text-surface-400 dark:border-surface-800">
                  <th className="px-5 py-3 font-semibold">Name</th>
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-5 py-3 font-semibold">Phone</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">Source</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                {filtered.map((l) => (
                  <tr key={l.id} className="transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/40">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={l.name} size="sm" />
                        <span className="font-medium text-surface-900 dark:text-white">{l.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-surface-600 dark:text-surface-400">{l.email}</td>
                    <td className="px-5 py-3.5 text-surface-600 dark:text-surface-400">{l.phone}</td>
                    <td className="px-5 py-3.5 text-surface-500">{l.date}</td>
                    <td className="px-5 py-3.5">
                      <Badge tone="gray">{l.source}</Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge tone={statusTone[l.status]} dot>
                        {l.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="divide-y divide-surface-100 dark:divide-surface-800 md:hidden">
            {filtered.map((l) => (
              <div key={l.id} className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={l.name} size="sm" />
                    <div>
                      <p className="font-medium text-surface-900 dark:text-white">{l.name}</p>
                      <p className="text-xs text-surface-400">{l.date}</p>
                    </div>
                  </div>
                  <Badge tone={statusTone[l.status]} dot>
                    {l.status}
                  </Badge>
                </div>
                <div className="mt-3 space-y-1.5 text-sm text-surface-600 dark:text-surface-400">
                  <p className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-surface-400" /> {l.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-surface-400" /> {l.phone}
                  </p>
                </div>
                <div className="mt-2">
                  <Badge tone="gray">{l.source}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
