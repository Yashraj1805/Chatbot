import { useMemo, useState } from 'react'
import { Plus, Search, Workflow, Pencil, Trash2, Zap, MousePointerClick, CornerDownRight, GitBranch } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import Badge, { statusTone } from '../components/ui/Badge.jsx'
import Modal from '../components/ui/Modal.jsx'
import Toggle from '../components/ui/Toggle.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { Field, Input, Textarea, Select } from '../components/ui/Input.jsx'
import { rules as seed, ruleTypes, chatbots } from '../data/mockData.js'
import { ruleCategories } from '../data/portalData.js'

const typeMeta = {
  keyword: { icon: Zap, tone: 'brand', label: 'Keyword' },
  button: { icon: MousePointerClick, tone: 'blue', label: 'Button' },
  fallback: { icon: CornerDownRight, tone: 'amber', label: 'Fallback' },
  flow: { icon: GitBranch, tone: 'green', label: 'Flow' },
}

const emptyRule = { trigger: '', response: '', type: 'keyword', category: 'General', status: 'active', botId: 'bot_01' }

export default function Rules() {
  const [list, setList] = useState(seed)
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [editing, setEditing] = useState(null) // rule object or {emptyRule} for new
  const [toDelete, setToDelete] = useState(null)

  const filtered = useMemo(
    () =>
      list.filter((r) => {
        const q = query.toLowerCase()
        const matchesQuery = r.trigger.toLowerCase().includes(q) || r.response.toLowerCase().includes(q)
        const matchesType = typeFilter === 'all' || r.type === typeFilter
        return matchesQuery && matchesType
      }),
    [list, query, typeFilter]
  )

  const toggleStatus = (id) =>
    setList((l) =>
      l.map((r) => (r.id === id ? { ...r, status: r.status === 'active' ? 'paused' : 'active' } : r))
    )

  const saveRule = (rule) => {
    if (rule.id) {
      setList((l) => l.map((r) => (r.id === rule.id ? rule : r)))
    } else {
      setList((l) => [{ ...rule, id: `r_${Date.now()}`, hits: 0 }, ...l])
    }
    setEditing(null)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Rules" subtitle="Map triggers to responses. Keywords, buttons, and fallbacks.">
        <Button onClick={() => setEditing({ ...emptyRule })}>
          <Plus className="h-4 w-4" /> Add rule
        </Button>
      </PageHeader>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <Input icon={Search} placeholder="Search rules…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="sm:w-44">
          <option value="all">All types</option>
          {ruleTypes.map((t) => (
            <option key={t} value={t}>
              {typeMeta[t].label}
            </option>
          ))}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Workflow}
          title="No rules yet"
          description="Add a rule to tell your chatbot what to say when visitors use certain keywords."
          action={
            <Button onClick={() => setEditing({ ...emptyRule })}>
              <Plus className="h-4 w-4" /> Add rule
            </Button>
          }
        />
      ) : (
        <Card className="overflow-hidden">
          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200 text-left text-xs uppercase tracking-wider text-surface-400 dark:border-surface-800">
                  <th className="px-5 py-3 font-semibold">Trigger</th>
                  <th className="px-5 py-3 font-semibold">Response</th>
                  <th className="px-5 py-3 font-semibold">Type</th>
                  <th className="px-5 py-3 font-semibold">Category</th>
                  <th className="px-5 py-3 font-semibold">Hits</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                {filtered.map((r) => {
                  const meta = typeMeta[r.type]
                  return (
                    <tr key={r.id} className="transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/40">
                      <td className="max-w-[14rem] px-5 py-3.5">
                        <p className="truncate font-medium text-surface-900 dark:text-white">{r.trigger}</p>
                      </td>
                      <td className="max-w-xs px-5 py-3.5">
                        <p className="truncate text-surface-600 dark:text-surface-400">{r.response}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge tone={meta.tone}>
                          <meta.icon className="h-3 w-3" /> {meta.label}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge tone="gray">{r.category || 'General'}</Badge>
                      </td>
                      <td className="px-5 py-3.5 text-surface-500">{r.hits?.toLocaleString() ?? 0}</td>
                      <td className="px-5 py-3.5">
                        <button onClick={() => toggleStatus(r.id)} className="flex items-center gap-2">
                          <Toggle checked={r.status === 'active'} onChange={() => toggleStatus(r.id)} />
                          <span className="text-xs capitalize text-surface-500">{r.status}</span>
                        </button>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex justify-end gap-1">
                          <IconBtn onClick={() => setEditing(r)} label="Edit">
                            <Pencil className="h-4 w-4" />
                          </IconBtn>
                          <IconBtn onClick={() => setToDelete(r)} label="Delete" danger>
                            <Trash2 className="h-4 w-4" />
                          </IconBtn>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="divide-y divide-surface-100 dark:divide-surface-800 md:hidden">
            {filtered.map((r) => {
              const meta = typeMeta[r.type]
              return (
                <div key={r.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <Badge tone={meta.tone}>
                      <meta.icon className="h-3 w-3" /> {meta.label}
                    </Badge>
                    <Badge tone={statusTone[r.status]} dot>
                      {r.status}
                    </Badge>
                  </div>
                  <p className="mt-2 font-medium text-surface-900 dark:text-white">{r.trigger}</p>
                  <p className="mt-1 text-sm text-surface-500">{r.response}</p>
                  <div className="mt-3 flex gap-2">
                    <Button variant="secondary" size="sm" onClick={() => setEditing(r)}>
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setToDelete(r)} className="text-red-600">
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      )}

      {/* Add / Edit modal */}
      <RuleModal rule={editing} onClose={() => setEditing(null)} onSave={saveRule} />

      {/* Delete confirm */}
      <Modal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="Delete rule?"
        description="This rule will no longer trigger a response. This cannot be undone."
        footer={
          <>
            <Button variant="secondary" onClick={() => setToDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setList((l) => l.filter((r) => r.id !== toDelete.id))
                setToDelete(null)
              }}
            >
              <Trash2 className="h-4 w-4" /> Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-surface-600 dark:text-surface-400">
          Trigger: <span className="font-medium text-surface-900 dark:text-white">{toDelete?.trigger}</span>
        </p>
      </Modal>
    </div>
  )
}

function RuleModal({ rule, onClose, onSave }) {
  if (!rule) return null
  // key-based remount resets the form draft each time a rule is opened
  return <RuleForm key={rule.id || 'new'} initial={rule} onClose={onClose} onSave={onSave} />
}

function RuleForm({ initial, onClose, onSave }) {
  const [draft, setDraft] = useState(initial)
  const set = (key) => (e) => setDraft((d) => ({ ...d, [key]: e.target.value }))

  return (
    <Modal
      open
      onClose={onClose}
      title={initial.id ? 'Edit rule' : 'Add rule'}
      description="Define what the chatbot replies when the trigger is matched."
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(draft)} disabled={!draft.trigger.trim() || !draft.response.trim()}>
            Save rule
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Chatbot" htmlFor="bot">
            <Select id="bot" value={draft.botId} onChange={set('botId')}>
              {chatbots.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Rule type" htmlFor="type">
            <Select id="type" value={draft.type} onChange={set('type')}>
              {ruleTypes.map((t) => (
                <option key={t} value={t}>
                  {typeMeta[t].label}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <Field label="Category" htmlFor="category">
          <Select id="category" value={draft.category || 'General'} onChange={set('category')}>
            {ruleCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Trigger" htmlFor="trigger" hint="Comma-separated keywords or button label">
          <Input id="trigger" value={draft.trigger} onChange={set('trigger')} placeholder="pricing, cost, how much" />
        </Field>
        <Field label="Response" htmlFor="response">
          <Textarea id="response" value={draft.response} onChange={set('response')} placeholder="What should the bot say?" />
        </Field>
        <Toggle
          id="status"
          label="Active"
          description="Inactive rules won’t trigger a response."
          checked={draft.status === 'active'}
          onChange={(v) => setDraft((d) => ({ ...d, status: v ? 'active' : 'paused' }))}
        />
      </div>
    </Modal>
  )
}

function IconBtn({ children, onClick, label, danger }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`rounded-lg p-2 transition-colors ${
        danger
          ? 'text-surface-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40'
          : 'text-surface-400 hover:bg-surface-100 hover:text-surface-700 dark:hover:bg-surface-800'
      }`}
    >
      {children}
    </button>
  )
}
