import { useState } from 'react'
import { Settings, Palette, Bell } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Card, { CardBody, CardHeader, CardTitle } from '../../components/ui/Card.jsx'
import Button from '../../components/ui/Button.jsx'
import Toggle from '../../components/ui/Toggle.jsx'
import { Field, Input, Select } from '../../components/ui/Input.jsx'
import { cn } from '../../utils/cn.js'

const tabs = [
  { id: 'platform', label: 'Platform', icon: Settings },
  { id: 'branding', label: 'Branding', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
]

const brandColors = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6']

export default function AdminSettings() {
  const [tab, setTab] = useState('platform')
  const [color, setColor] = useState('#4f46e5')
  const [prefs, setPrefs] = useState({ newCustomer: true, failedPayment: true, churnAlert: true, weeklyDigest: false })
  const set = (k) => (v) => setPrefs((p) => ({ ...p, [k]: v }))

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Configure the platform, branding, and notifications." />

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
          {tab === 'platform' && (
            <Card>
              <CardHeader><CardTitle>Platform settings</CardTitle></CardHeader>
              <CardBody className="space-y-4 pt-0">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Platform name" htmlFor="pn"><Input id="pn" defaultValue="VartaBot" /></Field>
                  <Field label="Support email" htmlFor="se"><Input id="se" type="email" defaultValue="support@vartabot.in" /></Field>
                  <Field label="Default currency" htmlFor="cur">
                    <Select id="cur" defaultValue="usd">
                      <option value="usd">USD ($)</option>
                      <option value="inr">INR (₹)</option>
                      <option value="eur">EUR (€)</option>
                    </Select>
                  </Field>
                  <Field label="Default language" htmlFor="lang">
                    <Select id="lang" defaultValue="en">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="de">German</option>
                    </Select>
                  </Field>
                </div>
                <div className="flex justify-end gap-3 border-t border-surface-100 pt-5 dark:border-surface-800">
                  <Button>Save changes</Button>
                </div>
              </CardBody>
            </Card>
          )}

          {tab === 'branding' && (
            <Card>
              <CardHeader><CardTitle>Branding settings</CardTitle></CardHeader>
              <CardBody className="space-y-5 pt-0">
                <Field label="Logo">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-2xl font-bold text-white">B</div>
                    <Button variant="secondary" size="sm">Upload logo</Button>
                  </div>
                </Field>
                <div>
                  <p className="mb-2 text-sm font-medium text-surface-700 dark:text-surface-300">Primary brand color</p>
                  <div className="flex flex-wrap gap-2.5">
                    {brandColors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={cn('h-9 w-9 rounded-full ring-offset-2 dark:ring-offset-surface-900', color === c && 'ring-2 ring-surface-900 dark:ring-white')}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3 border-t border-surface-100 pt-5 dark:border-surface-800">
                  <Button>Save branding</Button>
                </div>
              </CardBody>
            </Card>
          )}

          {tab === 'notifications' && (
            <Card>
              <CardHeader><CardTitle>Notification settings</CardTitle></CardHeader>
              <CardBody className="divide-y divide-surface-100 pt-0 dark:divide-surface-800">
                <Row><Toggle id="nc" label="New customer signups" description="Get notified when a business signs up." checked={prefs.newCustomer} onChange={set('newCustomer')} /></Row>
                <Row><Toggle id="fp" label="Failed payments" description="Alert me when a customer payment fails." checked={prefs.failedPayment} onChange={set('failedPayment')} /></Row>
                <Row><Toggle id="ca" label="Churn alerts" description="Notify me when a customer downgrades or cancels." checked={prefs.churnAlert} onChange={set('churnAlert')} /></Row>
                <Row><Toggle id="wd" label="Weekly digest" description="A summary of platform metrics every Monday." checked={prefs.weeklyDigest} onChange={set('weeklyDigest')} /></Row>
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
