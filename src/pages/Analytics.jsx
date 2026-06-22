import PageHeader from '../components/ui/PageHeader.jsx'
import Card, { CardBody, CardHeader, CardTitle } from '../components/ui/Card.jsx'
import StatCard from '../components/ui/StatCard.jsx'
import Badge from '../components/ui/Badge.jsx'
import { BarChart, DonutChart, ProgressBar } from '../components/ui/Charts.jsx'
import { MessagesSquare, Users, Activity, ArrowRightLeft } from 'lucide-react'
import { customerAnalytics } from '../data/portalData.js'

export default function Analytics() {
  const a = customerAnalytics
  const totalConversations = a.conversations.reduce((s, d) => s + d.value, 0)
  const totalLeads = a.leadsByBot.reduce((s, d) => s + d.value, 0)

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" subtitle="Understand how your chatbots and agents are performing." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={MessagesSquare} label="Total Conversations" value={totalConversations.toLocaleString()} delta="+18%" period="this week" />
        <StatCard icon={Users} label="Total Leads" value={totalLeads.toLocaleString()} delta="+9%" period="this week" />
        <StatCard icon={Activity} label="Response Rate" value={`${a.responseRate}%`} delta="+2%" period="vs last week" />
        <StatCard icon={ArrowRightLeft} label="Agent Transfers" value={a.agentTransfers} delta="+24" period="this week" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Conversations this week</CardTitle>
              <p className="mt-0.5 text-sm text-surface-500">Across all chatbots</p>
            </div>
            <Badge tone="green" dot>+18%</Badge>
          </CardHeader>
          <CardBody>
            <BarChart data={a.conversations} color="#4f46e5" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Leads by chatbot</CardTitle></CardHeader>
          <CardBody>
            <DonutChart data={a.leadsByBot} />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Response rate by chatbot</CardTitle></CardHeader>
        <CardBody className="space-y-4 pt-0">
          {a.leadsByBot.map((b, i) => {
            const rate = [96, 92, 84, 89, 78][i] ?? 85
            return (
              <div key={b.label}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="text-surface-600 dark:text-surface-300">{b.label}</span>
                  <span className="font-medium text-surface-900 dark:text-white">{rate}%</span>
                </div>
                <ProgressBar value={rate} color={b.color} />
              </div>
            )
          })}
        </CardBody>
      </Card>
    </div>
  )
}
