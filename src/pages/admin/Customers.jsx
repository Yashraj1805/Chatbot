import { useMemo, useState } from 'react'
import { Search, Building2, Eye, Ban, CheckCircle2, PauseCircle, Bot, MessagesSquare, Users, Headset } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Card from '../../components/ui/Card.jsx'
import Badge, { statusTone } from '../../components/ui/Badge.jsx'
import Button from '../../components/ui/Button.jsx'
import Avatar from '../../components/ui/Avatar.jsx'
import Modal from '../../components/ui/Modal.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import { Input, Select } from '../../components/ui/Input.jsx'
import { customers as seed, customerStatuses } from '../../data/portalData.js'

export default function Customers() {
  const [list, setList] = useState(seed)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [active, setActive] = useState(null)

  const filtered = useMemo(
    () =>
      list.filter((c) => {
        const q = query.toLowerCase()
        const matchesQuery =
          c.company.toLowerCase().includes(q) ||
          c.owner.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q)
        const matchesStatus = status === 'all' || c.status === status
        return matchesQuery && matchesStatus
      }),
    [list, query, status]
  )

  const setCustomerStatus = (id, next) => {
    setList((l) => l.map((c) => (c.id === id ? { ...c, status: next } : c)))
    setActive((a) => (a && a.id === id ? { ...a, status: next } : a))
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Customers" subtitle={`${list.length} businesses on the platform.`} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <Input icon={Search} placeholder="Search by company, owner, or email…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="sm:w-44">
          {customerStatuses.map((s) => (
            <option key={s} value={s}>{s === 'all' ? 'All statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Building2} title="No customers found" description="Try a different search or filter." />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200 text-left text-xs uppercase tracking-wider text-surface-400 dark:border-surface-800">
                  <th className="px-5 py-3 font-semibold">Company</th>
                  <th className="px-5 py-3 font-semibold">Plan</th>
                  <th className="px-5 py-3 font-semibold">Chatbots</th>
                  <th className="px-5 py-3 font-semibold">MRR</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                {filtered.map((c) => (
                  <tr key={c.id} className="transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/40">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={c.company} size="sm" />
                        <div>
                          <p className="font-medium text-surface-900 dark:text-white">{c.company}</p>
                          <p className="text-xs text-surface-500">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><Badge tone="brand">{c.plan}</Badge></td>
                    <td className="px-5 py-3.5 text-surface-600 dark:text-surface-400">{c.chatbots}</td>
                    <td className="px-5 py-3.5 font-medium text-surface-900 dark:text-white">${c.mrr}/mo</td>
                    <td className="px-5 py-3.5"><Badge tone={statusTone[c.status]} dot>{c.status}</Badge></td>
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end">
                        <Button variant="secondary" size="sm" onClick={() => setActive(c)}>
                          <Eye className="h-3.5 w-3.5" /> View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Customer detail */}
      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        size="lg"
        title={active?.company}
        description={`${active?.owner} · ${active?.country}`}
      >
        {active && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="brand">{active.plan} plan</Badge>
              <Badge tone={statusTone[active.status]} dot>{active.status}</Badge>
              <span className="text-sm text-surface-500">Joined {active.joined}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MiniStat icon={Bot} label="Chatbots" value={active.chatbots} />
              <MiniStat icon={MessagesSquare} label="Conversations" value={active.conversations.toLocaleString()} />
              <MiniStat icon={Users} label="Leads" value={active.leads.toLocaleString()} />
              <MiniStat icon={Headset} label="Agents" value={active.agents} />
            </div>

            <div className="rounded-xl border border-surface-200 p-4 dark:border-surface-800">
              <p className="text-sm font-semibold text-surface-900 dark:text-white">Subscription</p>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-surface-500">{active.plan} · ${active.mrr}/mo</span>
                <Badge tone={active.mrr > 0 ? 'green' : 'gray'} dot>{active.mrr > 0 ? 'billing active' : 'no billing'}</Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-surface-100 pt-4 dark:border-surface-800">
              {active.status !== 'active' && (
                <Button size="sm" onClick={() => setCustomerStatus(active.id, 'active')}>
                  <CheckCircle2 className="h-4 w-4" /> Activate
                </Button>
              )}
              {active.status !== 'suspended' && (
                <Button variant="secondary" size="sm" onClick={() => setCustomerStatus(active.id, 'suspended')}>
                  <PauseCircle className="h-4 w-4" /> Suspend
                </Button>
              )}
              {active.status !== 'inactive' && (
                <Button variant="danger" size="sm" onClick={() => setCustomerStatus(active.id, 'inactive')}>
                  <Ban className="h-4 w-4" /> Deactivate
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-surface-50 p-3 dark:bg-surface-800/50">
      <Icon className="h-4 w-4 text-brand-500" />
      <p className="mt-2 text-lg font-bold text-surface-900 dark:text-white">{value}</p>
      <p className="text-xs text-surface-500">{label}</p>
    </div>
  )
}
