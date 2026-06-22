import { useState } from 'react'
import { UserPlus, Trash2, Circle, Headset, Bot } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'
import Avatar from '../components/ui/Avatar.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { Field, Input, Select } from '../components/ui/Input.jsx'
import { agents as seed } from '../data/portalData.js'
import { chatbots } from '../data/mockData.js'

const dotColor = { online: 'text-emerald-500', away: 'text-amber-500', offline: 'text-surface-400' }

export default function Agents() {
  const [list, setList] = useState(seed)
  const [adding, setAdding] = useState(false)
  const [toRemove, setToRemove] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', role: 'Agent', assignedBot: chatbots[0].name })

  const addAgent = () => {
    setList((l) => [
      ...l,
      {
        id: `ag_${Date.now()}`,
        name: form.name,
        email: form.email,
        role: form.role,
        status: 'offline',
        chatsHandled: 0,
        resolutionRate: 0,
        avgResponse: '—',
        assignedBots: form.assignedBot ? [form.assignedBot] : [],
      },
    ])
    setAdding(false)
    setForm({ name: '', email: '', role: 'Agent', assignedBot: chatbots[0].name })
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Agents" subtitle="Add live agents and assign them to chatbots for chat transfers.">
        <Button onClick={() => setAdding(true)}>
          <UserPlus className="h-4 w-4" /> Add agent
        </Button>
      </PageHeader>

      {list.length === 0 ? (
        <EmptyState
          icon={Headset}
          title="No agents yet"
          description="Add a live agent so conversations can be transferred from the bot to a human."
          action={<Button onClick={() => setAdding(true)}><UserPlus className="h-4 w-4" /> Add agent</Button>}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => (
            <Card key={a.id} hover className="p-5">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar name={a.name} />
                  <Circle className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full fill-current ${dotColor[a.status]} ring-2 ring-white dark:ring-surface-900`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-surface-900 dark:text-white">{a.name}</p>
                  <p className="truncate text-xs text-surface-500">{a.email}</p>
                </div>
                <button
                  onClick={() => setToRemove(a)}
                  className="rounded-lg p-1.5 text-surface-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                  aria-label="Remove agent"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge tone="gray">{a.role}</Badge>
                <Badge tone={a.status === 'online' ? 'green' : a.status === 'away' ? 'amber' : 'gray'} dot>{a.status}</Badge>
              </div>

              <div className="mt-4 border-t border-surface-100 pt-3 dark:border-surface-800">
                <p className="mb-1.5 text-xs font-medium text-surface-400">Assigned chatbots</p>
                {a.assignedBots.length ? (
                  <div className="flex flex-wrap gap-1.5">
                    {a.assignedBots.map((b) => (
                      <span key={b} className="inline-flex items-center gap-1 rounded-md bg-surface-100 px-2 py-1 text-xs text-surface-600 dark:bg-surface-800 dark:text-surface-300">
                        <Bot className="h-3 w-3" /> {b}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs italic text-surface-400">Not assigned to any chatbot</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add agent modal */}
      <Modal
        open={adding}
        onClose={() => setAdding(false)}
        title="Add agent"
        description="Invite a teammate to handle live chats."
        footer={
          <>
            <Button variant="secondary" onClick={() => setAdding(false)}>Cancel</Button>
            <Button onClick={addAgent} disabled={!form.name.trim() || !form.email.trim()}>
              <UserPlus className="h-4 w-4" /> Add agent
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Full name" htmlFor="an">
            <Input id="an" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Jane Doe" />
          </Field>
          <Field label="Email" htmlFor="ae">
            <Input id="ae" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="jane@company.com" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Role" htmlFor="ar">
              <Select id="ar" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}>
                <option>Agent</option>
                <option>Senior Agent</option>
                <option>Team Lead</option>
              </Select>
            </Field>
            <Field label="Assign to" htmlFor="ab">
              <Select id="ab" value={form.assignedBot} onChange={(e) => setForm((f) => ({ ...f, assignedBot: e.target.value }))}>
                {chatbots.map((b) => (
                  <option key={b.id}>{b.name}</option>
                ))}
              </Select>
            </Field>
          </div>
        </div>
      </Modal>

      {/* Remove confirm */}
      <Modal
        open={!!toRemove}
        onClose={() => setToRemove(null)}
        title="Remove agent?"
        description={`${toRemove?.name} will no longer receive transferred chats.`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setToRemove(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => { setList((l) => l.filter((a) => a.id !== toRemove.id)); setToRemove(null) }}>
              <Trash2 className="h-4 w-4" /> Remove
            </Button>
          </>
        }
      >
        <p className="text-sm text-surface-600 dark:text-surface-400">Active chats will be reassigned to the support queue.</p>
      </Modal>
    </div>
  )
}
