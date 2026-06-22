import { useState } from 'react'
import { User, Lock, Bell, UploadCloud, Circle } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Card, { CardBody, CardHeader, CardTitle } from '../../components/ui/Card.jsx'
import Button from '../../components/ui/Button.jsx'
import Avatar from '../../components/ui/Avatar.jsx'
import Toggle from '../../components/ui/Toggle.jsx'
import { Field, Input, Select } from '../../components/ui/Input.jsx'
import { cn } from '../../utils/cn.js'
import { agentUser } from '../../data/portalData.js'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'password', label: 'Password', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
]

export default function AgentProfile() {
  const [tab, setTab] = useState('profile')
  const [availability, setAvailability] = useState('online')
  const [prefs, setPrefs] = useState({ newChat: true, mention: true, transfer: true, sound: true })
  const set = (k) => (v) => setPrefs((p) => ({ ...p, [k]: v }))

  return (
    <div className="space-y-6">
      <PageHeader title="Profile settings" subtitle="Manage your agent profile and preferences." />

      <div className="grid gap-6 lg:grid-cols-12">
        <nav className="lg:col-span-3">
          <div className="flex gap-1 overflow-x-auto lg:flex-col">
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

        <div className="lg:col-span-9">
          {tab === 'profile' && (
            <Card>
              <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
              <CardBody className="space-y-6 pt-0">
                <div className="flex items-center gap-4">
                  <Avatar name={agentUser.name} size="lg" />
                  <Button variant="secondary" size="sm"><UploadCloud className="h-4 w-4" /> Change photo</Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" htmlFor="n"><Input id="n" defaultValue={agentUser.name} /></Field>
                  <Field label="Email" htmlFor="e"><Input id="e" type="email" defaultValue={agentUser.email} /></Field>
                  <Field label="Role" htmlFor="r"><Input id="r" defaultValue={agentUser.role} disabled /></Field>
                  <Field label="Availability" htmlFor="av">
                    <Select id="av" value={availability} onChange={(e) => setAvailability(e.target.value)}>
                      <option value="online">🟢 Online</option>
                      <option value="away">🟡 Away</option>
                      <option value="offline">⚫ Offline</option>
                    </Select>
                  </Field>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-surface-50 p-3 text-sm dark:bg-surface-800/50">
                  <Circle className={cn('h-3 w-3 fill-current', availability === 'online' ? 'text-emerald-500' : availability === 'away' ? 'text-amber-500' : 'text-surface-400')} />
                  <span className="text-surface-600 dark:text-surface-300">
                    You are currently <strong className="capitalize">{availability}</strong> — {availability === 'online' ? 'receiving new chats' : 'not receiving new chats'}.
                  </span>
                </div>
                <div className="flex justify-end gap-3 border-t border-surface-100 pt-5 dark:border-surface-800">
                  <Button>Save changes</Button>
                </div>
              </CardBody>
            </Card>
          )}

          {tab === 'password' && (
            <Card>
              <CardHeader><CardTitle>Change password</CardTitle></CardHeader>
              <CardBody className="space-y-4 pt-0">
                <Field label="Current password" htmlFor="cp"><Input id="cp" type="password" placeholder="••••••••" /></Field>
                <Field label="New password" htmlFor="np" hint="Min. 8 characters"><Input id="np" type="password" placeholder="••••••••" /></Field>
                <Field label="Confirm new password" htmlFor="cnp"><Input id="cnp" type="password" placeholder="••••••••" /></Field>
                <div className="flex justify-end gap-3 border-t border-surface-100 pt-5 dark:border-surface-800">
                  <Button>Update password</Button>
                </div>
              </CardBody>
            </Card>
          )}

          {tab === 'notifications' && (
            <Card>
              <CardHeader><CardTitle>Notification preferences</CardTitle></CardHeader>
              <CardBody className="divide-y divide-surface-100 pt-0 dark:divide-surface-800">
                <Row><Toggle id="nc" label="New chat assigned" description="Notify me when a chat is routed to me." checked={prefs.newChat} onChange={set('newChat')} /></Row>
                <Row><Toggle id="mn" label="Mentions" description="Notify me when a teammate @mentions me." checked={prefs.mention} onChange={set('mention')} /></Row>
                <Row><Toggle id="tr" label="Transfers" description="Notify me when a chat is transferred to me." checked={prefs.transfer} onChange={set('transfer')} /></Row>
                <Row><Toggle id="sd" label="Sound alerts" description="Play a sound for incoming messages." checked={prefs.sound} onChange={set('sound')} /></Row>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function Row({ children }) {
  return <div className="py-4 first:pt-0">{children}</div>
}
