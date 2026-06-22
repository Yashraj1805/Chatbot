import { Link } from 'react-router-dom'
import { Inbox, MessageCircle, CheckCircle2, Clock, ArrowRight } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import StatCard from '../../components/ui/StatCard.jsx'
import Card, { CardBody, CardHeader, CardTitle } from '../../components/ui/Card.jsx'
import Badge, { statusTone } from '../../components/ui/Badge.jsx'
import Button from '../../components/ui/Button.jsx'
import Avatar from '../../components/ui/Avatar.jsx'
import { agentDashboardStats, agentInbox } from '../../data/portalData.js'

const icons = { assigned: Inbox, active: MessageCircle, closed: CheckCircle2, response: Clock }
const inboxTone = { new: 'blue', active: 'green', waiting: 'amber', closed: 'gray' }

export default function AgentDashboard() {
  const queue = agentInbox.filter((c) => c.status !== 'closed')

  return (
    <div className="space-y-6">
      <PageHeader title="Agent dashboard" subtitle="Welcome back, Sam — here are your chats for today.">
        <Button as={Link} to="/agent/inbox">
          <Inbox className="h-4 w-4" /> Open inbox
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {agentDashboardStats.map((s) => (
          <StatCard key={s.id} icon={icons[s.id]} {...s} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your queue</CardTitle>
          <Button as={Link} to="/agent/inbox" variant="ghost" size="sm">
            Go to inbox <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardBody className="pt-0">
          <ul className="divide-y divide-surface-100 dark:divide-surface-800">
            {queue.map((c) => (
              <li key={c.id} className="flex items-center gap-3 py-3">
                <Avatar name={c.customer.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-surface-900 dark:text-white">
                    {c.customer.name}
                  </p>
                  <p className="truncate text-xs text-surface-500">
                    {c.messages[c.messages.length - 1].text}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {c.unread > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1.5 text-xs font-semibold text-white">
                      {c.unread}
                    </span>
                  )}
                  <Badge tone={inboxTone[c.status]} dot>{c.status}</Badge>
                  <Button as={Link} to="/agent/inbox" variant="secondary" size="sm">Open</Button>
                </div>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  )
}
