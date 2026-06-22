import PageHeader from '../../components/ui/PageHeader.jsx'
import Card, { CardBody, CardHeader, CardTitle } from '../../components/ui/Card.jsx'
import Badge from '../../components/ui/Badge.jsx'
import { BarChart, LineChart, DonutChart } from '../../components/ui/Charts.jsx'
import { adminSeries } from '../../data/portalData.js'

export default function PlatformAnalytics() {
  return (
    <div className="space-y-6">
      <PageHeader title="Platform analytics" subtitle="Trends across conversations, leads, revenue, and customers." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Daily conversations</CardTitle>
              <p className="mt-0.5 text-sm text-surface-500">This week</p>
            </div>
            <Badge tone="green" dot>+12%</Badge>
          </CardHeader>
          <CardBody>
            <BarChart data={adminSeries.dailyConversations} color="#6366f1" valueFormat={(v) => `${(v / 1000).toFixed(1)}k`} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Monthly leads</CardTitle>
              <p className="mt-0.5 text-sm text-surface-500">Last 6 months</p>
            </div>
            <Badge tone="green" dot>+15%</Badge>
          </CardHeader>
          <CardBody>
            <LineChart data={adminSeries.monthlyLeads} color="#0ea5e9" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Revenue growth</CardTitle>
              <p className="mt-0.5 text-sm text-surface-500">MRR · last 6 months</p>
            </div>
            <Badge tone="green" dot>+7.4%</Badge>
          </CardHeader>
          <CardBody>
            <LineChart data={adminSeries.revenueGrowth} color="#10b981" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active customers by plan</CardTitle>
          </CardHeader>
          <CardBody>
            <DonutChart data={adminSeries.planDistribution} />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
