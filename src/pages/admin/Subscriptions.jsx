import { useState } from 'react'
import { Check, ArrowUpCircle, ArrowDownCircle } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Card, { CardBody, CardHeader, CardTitle } from '../../components/ui/Card.jsx'
import Badge, { statusTone } from '../../components/ui/Badge.jsx'
import Button from '../../components/ui/Button.jsx'
import StatCard from '../../components/ui/StatCard.jsx'
import { DollarSign, CreditCard, Repeat, TrendingDown } from 'lucide-react'
import { pricingPlans } from '../../data/mockData.js'
import { billingOverview } from '../../data/portalData.js'
import { cn } from '../../utils/cn.js'

const invoiceTone = { paid: 'green', overdue: 'amber', failed: 'red' }

export default function Subscriptions() {
  const [rows] = useState(billingOverview)
  const mrr = rows.filter((r) => r.status === 'paid').reduce((s, r) => s + r.amount, 0)

  return (
    <div className="space-y-6">
      <PageHeader title="Subscriptions" subtitle="Plans, pricing, and customer billing across the platform." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={DollarSign} label="Collected MRR" value={`$${mrr}`} delta="+7.4%" period="this month" />
        <StatCard icon={Repeat} label="Active subscriptions" value="1,106" delta="+41" period="this month" />
        <StatCard icon={CreditCard} label="Failed payments" value="2" delta="-1" period="vs last month" />
        <StatCard icon={TrendingDown} label="Churn" value="1.8%" delta="-0.3%" period="vs last month" />
      </div>

      {/* Plans + controls */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Plans & pricing</CardTitle>
            <p className="mt-0.5 text-sm text-surface-500">Manage the plans customers can subscribe to.</p>
          </div>
          <Button size="sm">Edit plans</Button>
        </CardHeader>
        <CardBody className="grid gap-4 pt-0 lg:grid-cols-3">
          {pricingPlans.map((p) => (
            <div
              key={p.name}
              className={cn(
                'rounded-xl border p-5',
                p.highlighted ? 'border-brand-400 dark:border-brand-700' : 'border-surface-200 dark:border-surface-800'
              )}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-surface-900 dark:text-white">{p.name}</p>
                {p.highlighted && <Badge tone="brand">Popular</Badge>}
              </div>
              <p className="mt-2 text-2xl font-bold text-surface-900 dark:text-white">
                ${p.price}<span className="text-sm font-normal text-surface-500">/mo</span>
              </p>
              <ul className="mt-3 space-y-1.5">
                {p.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-start gap-1.5 text-xs text-surface-600 dark:text-surface-400">
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-brand-500" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* Billing overview */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Customer billing overview</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-surface-200 text-left text-xs uppercase tracking-wider text-surface-400 dark:border-surface-800">
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Plan</th>
                <th className="px-5 py-3 font-semibold">Amount</th>
                <th className="px-5 py-3 font-semibold">Last invoice</th>
                <th className="px-5 py-3 font-semibold">Next billing</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
              {rows.map((r) => (
                <tr key={r.id} className="transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/40">
                  <td className="px-5 py-3.5 font-medium text-surface-900 dark:text-white">{r.customer}</td>
                  <td className="px-5 py-3.5"><Badge tone="brand">{r.plan}</Badge></td>
                  <td className="px-5 py-3.5 text-surface-600 dark:text-surface-400">${r.amount}/mo</td>
                  <td className="px-5 py-3.5 text-surface-500">{r.date}</td>
                  <td className="px-5 py-3.5 text-surface-500">{r.next}</td>
                  <td className="px-5 py-3.5"><Badge tone={invoiceTone[r.status]} dot>{r.status}</Badge></td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-1">
                      <button title="Upgrade" className="rounded-lg p-2 text-surface-400 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/40">
                        <ArrowUpCircle className="h-4 w-4" />
                      </button>
                      <button title="Downgrade" className="rounded-lg p-2 text-surface-400 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-950/40">
                        <ArrowDownCircle className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
