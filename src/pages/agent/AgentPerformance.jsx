import PageHeader from '../../components/ui/PageHeader.jsx'
import Card, { CardBody, CardHeader, CardTitle } from '../../components/ui/Card.jsx'
import StatCard from '../../components/ui/StatCard.jsx'
import Badge from '../../components/ui/Badge.jsx'
import { BarChart, Sparkline, ProgressBar } from '../../components/ui/Charts.jsx'
import { MessageCircle, CheckCircle2, Clock, Star } from 'lucide-react'
import { agentPerformance } from '../../data/portalData.js'

export default function AgentPerformance() {
  const p = agentPerformance
  const totalHandled = p.chatsHandled.reduce((s, d) => s + d.value, 0)

  return (
    <div className="space-y-6">
      <PageHeader title="My performance" subtitle="Your chat handling stats for this week." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={MessageCircle} label="Chats Handled" value={totalHandled} delta="+12" period="this week" />
        <StatCard icon={CheckCircle2} label="Resolution Rate" value={`${p.resolutionRate}%`} delta="+2%" period="vs last week" />
        <StatCard icon={Clock} label="Avg Response Time" value={p.avgResponse} delta="-8s" period="vs last week" />
        <StatCard icon={Star} label="Satisfaction" value={p.satisfaction} delta="+0.2" period="CSAT / 5" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Chats handled</CardTitle>
              <p className="mt-0.5 text-sm text-surface-500">This week</p>
            </div>
            <Badge tone="green" dot>+12</Badge>
          </CardHeader>
          <CardBody>
            <BarChart data={p.chatsHandled} color="#4f46e5" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>CSAT trend</CardTitle></CardHeader>
          <CardBody className="space-y-5">
            <div>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-surface-900 dark:text-white">{p.satisfaction}</span>
                <Sparkline values={p.csatTrend} width={120} height={40} color="#10b981" />
              </div>
              <p className="mt-1 text-sm text-surface-500">Customer satisfaction (out of 5)</p>
            </div>
            <div>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="text-surface-600 dark:text-surface-300">Resolution rate</span>
                <span className="font-medium text-surface-900 dark:text-white">{p.resolutionRate}%</span>
              </div>
              <ProgressBar value={p.resolutionRate} color="#10b981" />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
