import { useState } from 'react'
import { User, Building2, Bell, CreditCard, Check, UploadCloud } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import Card, { CardBody, CardHeader, CardTitle } from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import Avatar from '../components/ui/Avatar.jsx'
import Badge from '../components/ui/Badge.jsx'
import Toggle from '../components/ui/Toggle.jsx'
import { Field, Input, Select } from '../components/ui/Input.jsx'
import { cn } from '../utils/cn.js'
import { currentUser, pricingPlans } from '../data/mockData.js'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'workspace', label: 'Workspace', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'billing', label: 'Billing', icon: CreditCard },
]

export default function Settings() {
  const [tab, setTab] = useState('profile')

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Manage your profile, workspace, and preferences." />

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Tab nav */}
        <nav className="lg:col-span-3">
          <div className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  'flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  tab === t.id
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300'
                    : 'text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800'
                )}
              >
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Panel */}
        <div className="lg:col-span-9">
          {tab === 'profile' && <ProfileTab />}
          {tab === 'workspace' && <WorkspaceTab />}
          {tab === 'notifications' && <NotificationsTab />}
          {tab === 'billing' && <BillingTab />}
        </div>
      </div>
    </div>
  )
}

function ProfileTab() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Profile settings</CardTitle>
          <p className="mt-0.5 text-sm text-surface-500">Update your personal information.</p>
        </div>
      </CardHeader>
      <CardBody className="space-y-6 pt-0">
        <div className="flex items-center gap-4">
          <Avatar name={currentUser.name} size="lg" />
          <Button variant="secondary" size="sm">
            <UploadCloud className="h-4 w-4" /> Change photo
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" htmlFor="name">
            <Input id="name" defaultValue={currentUser.name} />
          </Field>
          <Field label="Email" htmlFor="email">
            <Input id="email" type="email" defaultValue={currentUser.email} />
          </Field>
          <Field label="Role" htmlFor="role">
            <Input id="role" defaultValue={currentUser.role} disabled />
          </Field>
          <Field label="Timezone" htmlFor="tz">
            <Select id="tz" defaultValue="pt">
              <option value="pt">(GMT-08:00) Pacific Time</option>
              <option value="et">(GMT-05:00) Eastern Time</option>
              <option value="gmt">(GMT+00:00) London</option>
              <option value="ist">(GMT+05:30) India</option>
            </Select>
          </Field>
        </div>
        <div className="flex justify-end gap-3 border-t border-surface-100 pt-5 dark:border-surface-800">
          <Button variant="secondary">Cancel</Button>
          <Button>Save changes</Button>
        </div>
      </CardBody>
    </Card>
  )
}

function WorkspaceTab() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Workspace settings</CardTitle>
          <p className="mt-0.5 text-sm text-surface-500">Manage your organization details.</p>
        </div>
      </CardHeader>
      <CardBody className="space-y-6 pt-0">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Company name" htmlFor="company">
            <Input id="company" defaultValue={currentUser.company} />
          </Field>
          <Field label="Website" htmlFor="web">
            <Input id="web" defaultValue="sachdevgroup.com" />
          </Field>
          <Field label="Workspace URL" htmlFor="url" hint="vartabot.in/…">
            <Input id="url" defaultValue="sachdev-group" />
          </Field>
          <Field label="Industry" htmlFor="ind">
            <Select id="ind" defaultValue="saas">
              <option value="saas">SaaS / Software</option>
              <option value="ecom">E-commerce</option>
              <option value="agency">Agency</option>
              <option value="other">Other</option>
            </Select>
          </Field>
        </div>
        <div className="rounded-xl border border-red-100 bg-red-50/50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
          <p className="text-sm font-semibold text-red-700 dark:text-red-300">Danger zone</p>
          <p className="mt-1 text-sm text-red-600/80 dark:text-red-400/80">
            Deleting your workspace removes all chatbots, rules, conversations, and leads.
          </p>
          <Button variant="danger" size="sm" className="mt-3">
            Delete workspace
          </Button>
        </div>
        <div className="flex justify-end gap-3 border-t border-surface-100 pt-5 dark:border-surface-800">
          <Button>Save changes</Button>
        </div>
      </CardBody>
    </Card>
  )
}

function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    newLead: true,
    weeklyReport: true,
    botPaused: false,
    productUpdates: true,
    conversationDigest: false,
  })
  const set = (key) => (v) => setPrefs((p) => ({ ...p, [key]: v }))

  const rows = [
    { key: 'newLead', label: 'New lead captured', desc: 'Get notified the moment a chatbot captures a lead.' },
    { key: 'weeklyReport', label: 'Weekly summary report', desc: 'A digest of conversations and leads every Monday.' },
    { key: 'botPaused', label: 'Chatbot paused alerts', desc: 'Alert me if a chatbot is paused or stops responding.' },
    { key: 'conversationDigest', label: 'Daily conversation digest', desc: 'A summary of yesterday’s conversations each morning.' },
    { key: 'productUpdates', label: 'Product updates', desc: 'News about new VartaBot features and improvements.' },
  ]

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Notification settings</CardTitle>
          <p className="mt-0.5 text-sm text-surface-500">Choose what we email you about.</p>
        </div>
      </CardHeader>
      <CardBody className="divide-y divide-surface-100 pt-0 dark:divide-surface-800">
        {rows.map((r) => (
          <div key={r.key} className="py-4 first:pt-0">
            <Toggle id={r.key} label={r.label} description={r.desc} checked={prefs[r.key]} onChange={set(r.key)} />
          </div>
        ))}
      </CardBody>
    </Card>
  )
}

function BillingTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Current plan</CardTitle>
            <p className="mt-0.5 text-sm text-surface-500">You’re on the Growth plan.</p>
          </div>
          <Badge tone="brand">Growth</Badge>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="flex flex-wrap items-end justify-between gap-4 rounded-xl bg-surface-50 p-5 dark:bg-surface-800/50">
            <div>
              <p className="text-3xl font-bold text-surface-900 dark:text-white">
                $79<span className="text-base font-normal text-surface-500">/month</span>
              </p>
              <p className="mt-1 text-sm text-surface-500">Renews on July 17, 2026</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary">Manage plan</Button>
              <Button>Upgrade</Button>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <UsageBar label="Chatbots" used={4} total={5} />
            <UsageBar label="Conversations this month" used={9240} total={15000} />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment method</CardTitle>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="flex items-center justify-between rounded-xl border border-surface-200 p-4 dark:border-surface-800">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-14 items-center justify-center rounded-lg bg-surface-900 text-xs font-bold text-white">
                VISA
              </span>
              <div>
                <p className="text-sm font-medium text-surface-900 dark:text-white">•••• •••• •••• 4242</p>
                <p className="text-xs text-surface-500">Expires 09/2028</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">
              Update
            </Button>
          </div>
          <p className="mt-3 text-xs text-surface-400">
            Billing is a placeholder — no real payment processing in this demo.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compare plans</CardTitle>
        </CardHeader>
        <CardBody className="grid gap-4 pt-0 sm:grid-cols-3">
          {pricingPlans.map((p) => (
            <div
              key={p.name}
              className={cn(
                'rounded-xl border p-4',
                p.name === 'Growth'
                  ? 'border-brand-400 bg-brand-50/40 dark:border-brand-700 dark:bg-brand-950/20'
                  : 'border-surface-200 dark:border-surface-800'
              )}
            >
              <p className="text-sm font-semibold text-surface-900 dark:text-white">{p.name}</p>
              <p className="mt-1 text-2xl font-bold text-surface-900 dark:text-white">
                ${p.price}
                <span className="text-sm font-normal text-surface-500">/mo</span>
              </p>
              <ul className="mt-3 space-y-1.5">
                {p.features.slice(0, 3).map((f) => (
                  <li key={f} className="flex items-start gap-1.5 text-xs text-surface-600 dark:text-surface-400">
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-brand-500" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  )
}

function UsageBar({ label, used, total }) {
  const pct = Math.min(100, Math.round((used / total) * 100))
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-sm">
        <span className="text-surface-600 dark:text-surface-300">{label}</span>
        <span className="font-medium text-surface-900 dark:text-white">
          {used.toLocaleString()} / {total.toLocaleString()}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-200 dark:bg-surface-700">
        <div
          className={cn('h-full rounded-full', pct > 85 ? 'bg-amber-500' : 'bg-brand-500')}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
