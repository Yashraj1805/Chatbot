import { Link } from 'react-router-dom'
import {
  Building2,
  Bot,
  MessagesSquare,
  Headset,
  Users,
  DollarSign,
  CreditCard,
  TrendingDown,
  ArrowRight,
} from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import StatCard from '../../components/ui/StatCard.jsx'
import Card, { CardBody, CardHeader, CardTitle } from '../../components/ui/Card.jsx'
import Badge, { statusTone } from '../../components/ui/Badge.jsx'
import Button from '../../components/ui/Button.jsx'
import { LineChart, DonutChart } from '../../components/ui/Charts.jsx'
import { platformStats, customers, adminSeries, monitoredChatbots } from '../../data/portalData.js'

const icons = {
  customers: Building2,
  chatbots: Bot,
  conversations: MessagesSquare,
  agents: Headset,
  leads: Users,
  revenue: DollarSign,
  subscriptions: CreditCard,
  churn: TrendingDown,
}

export default function AdminDashboard() {
  const newest = [...customers].sort((a, b) => b.joined.localeCompare(a.joined)).slice(0, 5)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform overview"
        subtitle="Welcome back, Alex — here’s how VartaBot is performing across all customers."
      />

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {platformStats.map((s) => (
          <StatCard key={s.id} icon={icons[s.id]} {...s} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue growth */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Revenue growth</CardTitle>
              <p className="mt-0.5 text-sm text-surface-500">Monthly recurring revenue · last 6 months</p>
            </div>
            <Badge tone="green" dot>+7.4%</Badge>
          </CardHeader>
          <CardBody>
            <LineChart
              data={adminSeries.revenueGrowth}
              color="#10b981"
              height={220}
            />
          </CardBody>
        </Card>

        {/* Plan distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Plan distribution</CardTitle>
          </CardHeader>
          <CardBody>
            <DonutChart data={adminSeries.planDistribution} />
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Newest customers */}
        <Card>
          <CardHeader>
            <CardTitle>Newest customers</CardTitle>
            <Button as={Link} to="/admin/customers" variant="ghost" size="sm">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardBody className="pt-0">
            <ul className="divide-y divide-surface-100 dark:divide-surface-800">
              {newest.map((c) => (
                <li key={c.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-semibold text-surface-900 dark:text-white">{c.company}</p>
                    <p className="text-xs text-surface-500">{c.owner} · joined {c.joined}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge tone="brand">{c.plan}</Badge>
                    <Badge tone={statusTone[c.status]} dot>{c.status}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        {/* Chatbot health watch */}
        <Card>
          <CardHeader>
            <CardTitle>Chatbots needing attention</CardTitle>
            <Button as={Link} to="/admin/chatbots" variant="ghost" size="sm">
              Monitor <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardBody className="pt-0">
            <ul className="divide-y divide-surface-100 dark:divide-surface-800">
              {monitoredChatbots
                .filter((b) => b.health < 90)
                .map((b) => (
                  <li key={b.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-semibold text-surface-900 dark:text-white">{b.name}</p>
                      <p className="text-xs text-surface-500">{b.customer}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-semibold ${b.health < 50 ? 'text-red-500' : 'text-amber-500'}`}>
                        {b.health}%
                      </span>
                      <Badge tone={b.status === 'down' ? 'red' : b.status === 'degraded' ? 'amber' : 'gray'} dot>
                        {b.status}
                      </Badge>
                    </div>
                  </li>
                ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
