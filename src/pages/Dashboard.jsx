import { Link } from 'react-router-dom'
import {
  Bot,
  Workflow,
  MessagesSquare,
  Users,
  UserPlus,
  CheckCircle2,
  PencilLine,
  Rocket,
  ArrowRight,
  Headset,
} from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import StatCard from '../components/ui/StatCard.jsx'
import Button from '../components/ui/Button.jsx'
import Card, { CardBody, CardHeader, CardTitle } from '../components/ui/Card.jsx'
import Badge, { statusTone } from '../components/ui/Badge.jsx'
import { dashboardStats, recentActivity, conversationsSeries } from '../data/mockData.js'
import { useChatbots } from '../context/ChatbotsContext.jsx'

const iconFor = { chatbots: Bot, rules: Workflow, conversations: MessagesSquare, leads: Users, agents: Headset }

// Customer dashboard adds an "Assigned Agents" metric on top of the core stats
const customerStats = [
  ...dashboardStats,
  { id: 'agents', label: 'Assigned Agents', value: 4, delta: '+1', trend: 'up', period: 'this month' },
]

const activityIcon = {
  lead: { icon: UserPlus, tone: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50' },
  conversation: { icon: CheckCircle2, tone: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50' },
  rule: { icon: PencilLine, tone: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50' },
  chatbot: { icon: Rocket, tone: 'text-brand-500 bg-brand-50 dark:bg-brand-950/50' },
}

export default function Dashboard() {
  const { chatbots } = useChatbots()
  const max = Math.max(...conversationsSeries)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back, Harpreet — here’s what’s happening across your chatbots."
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {customerStats.map((s) => (
          <StatCard key={s.id} icon={iconFor[s.id]} {...s} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Conversations chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Conversations</CardTitle>
              <p className="mt-0.5 text-sm text-surface-500">Last 14 days</p>
            </div>
            <Badge tone="green" dot>
              +18%
            </Badge>
          </CardHeader>
          <CardBody>
            <div className="flex h-48 items-end gap-1.5">
              {conversationsSeries.map((v, i) => (
                <div key={i} className="group flex flex-1 flex-col items-center justify-end">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-brand-500 to-brand-400 transition-all duration-300 hover:from-brand-600 hover:to-brand-500"
                    style={{ height: `${(v / max) * 100}%` }}
                    title={`${v} conversations`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-surface-400">
              <span>14 days ago</span>
              <span>Today</span>
            </div>
          </CardBody>
        </Card>

        {/* Recent activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardBody className="pt-0">
            <ul className="space-y-1">
              {recentActivity.slice(0, 6).map((a) => {
                const { icon: Icon, tone } = activityIcon[a.type]
                return (
                  <li key={a.id} className="flex gap-3 rounded-lg p-2 transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/50">
                    <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${tone}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-surface-800 dark:text-surface-100">
                        {a.title}
                      </p>
                      <p className="truncate text-xs text-surface-500">{a.detail}</p>
                      <p className="mt-0.5 text-xs text-surface-400">{a.time}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </CardBody>
        </Card>
      </div>

      {/* Active chatbots quick view */}
      <Card>
        <CardHeader>
          <CardTitle>Your chatbots</CardTitle>
          <Button as={Link} to="/app/chatbots" variant="ghost" size="sm">
            View all <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {chatbots.slice(0, 3).map((bot) => (
              <Link
                key={bot.id}
                to="/app/chatbots"
                className="flex items-center gap-3 rounded-xl border border-surface-200 p-3 transition-colors hover:border-brand-300 hover:bg-surface-50 dark:border-surface-800 dark:hover:bg-surface-800/50"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: bot.themeColor }}
                >
                  <Bot className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-surface-900 dark:text-white">
                    {bot.name}
                  </p>
                  <p className="text-xs text-surface-500">{bot.conversations.toLocaleString()} chats</p>
                </div>
                <Badge tone={statusTone[bot.status]} dot>
                  {bot.status}
                </Badge>
              </Link>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
