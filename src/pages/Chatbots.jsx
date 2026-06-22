import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus,
  Search,
  Bot,
  MoreVertical,
  Pencil,
  Trash2,
  Copy,
  Power,
  PowerOff,
  Waypoints,
} from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import Badge, { statusTone } from '../components/ui/Badge.jsx'
import Modal from '../components/ui/Modal.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { Input, Select } from '../components/ui/Input.jsx'
import { chatbotStatuses } from '../data/mockData.js'
import { useChatbots } from '../context/ChatbotsContext.jsx'

export default function Chatbots() {
  const { chatbots: list, deleteChatbot, cloneChatbot, toggleChatbot } = useChatbots()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [menuId, setMenuId] = useState(null)
  const [toDelete, setToDelete] = useState(null)

  const filtered = useMemo(() => {
    return list.filter((b) => {
      const matchesQuery =
        b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.description.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = status === 'all' || b.status === status
      return matchesQuery && matchesStatus
    })
  }, [list, query, status])

  const confirmDelete = () => {
    deleteChatbot(toDelete.id)
    setToDelete(null)
  }

  const cloneBot = (bot) => {
    cloneChatbot(bot.id)
    setMenuId(null)
  }

  const toggleBot = (id) => {
    toggleChatbot(id)
    setMenuId(null)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Chatbots" subtitle="Create, manage, and deploy your rule-based chatbots.">
        <Button as={Link} to="/app/chatbots/new">
          <Plus className="h-4 w-4" /> Create chatbot
        </Button>
      </PageHeader>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <Input
            icon={Search}
            placeholder="Search chatbots…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="sm:w-44">
          {chatbotStatuses.map((s) => (
            <option key={s} value={s}>
              {s === 'all' ? 'All statuses' : s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Bot}
          title="No chatbots found"
          description={
            query || status !== 'all'
              ? 'Try adjusting your search or filter.'
              : 'Create your first chatbot to start capturing leads.'
          }
          action={
            <Button as={Link} to="/app/chatbots/new">
              <Plus className="h-4 w-4" /> Create chatbot
            </Button>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((bot) => (
            <Card key={bot.id} hover className="relative flex flex-col p-5">
              <div className="flex items-start justify-between">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: bot.themeColor }}
                >
                  <Bot className="h-5 w-5" />
                </span>

                <div className="relative">
                  <button
                    onClick={() => setMenuId(menuId === bot.id ? null : bot.id)}
                    className="rounded-lg p-1.5 text-surface-400 hover:bg-surface-100 hover:text-surface-600 dark:hover:bg-surface-800"
                    aria-label="Actions"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                  {menuId === bot.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setMenuId(null)} />
                      <div className="absolute right-0 z-20 mt-1 w-48 animate-scale-in rounded-xl border border-surface-200 bg-white p-1.5 shadow-soft dark:border-surface-800 dark:bg-surface-900">
                        <MenuItem as={Link} to="/app/chatbots/new" icon={Pencil} label="Edit" />
                        <MenuItem as={Link} to={`/app/chatbots/${bot.id}/flow`} icon={Waypoints} label="Edit flow" />
                        <MenuItem icon={Copy} label="Clone" onClick={() => cloneBot(bot)} />
                        <MenuItem
                          icon={bot.status === 'active' ? PowerOff : Power}
                          label={bot.status === 'active' ? 'Disable' : 'Enable'}
                          onClick={() => toggleBot(bot.id)}
                        />
                        <div className="my-1 h-px bg-surface-100 dark:bg-surface-800" />
                        <button
                          onClick={() => {
                            setToDelete(bot)
                            setMenuId(null)
                          }}
                          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <h3 className="mt-4 text-base font-semibold text-surface-900 dark:text-white">
                {bot.name}
              </h3>
              <p className="mt-1 line-clamp-2 flex-1 text-sm text-surface-500 dark:text-surface-400">
                {bot.description}
              </p>

              <div className="mt-4 flex items-center gap-4 border-t border-surface-100 pt-4 text-sm dark:border-surface-800">
                <Stat label="Rules" value={bot.rules} />
                <Stat label="Chats" value={bot.conversations.toLocaleString()} />
                <Stat label="Leads" value={bot.leads} />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Badge tone={statusTone[bot.status]} dot>
                  {bot.status}
                </Badge>
                <div className="flex gap-2">
                  <Button as={Link} to={`/app/chatbots/${bot.id}/flow`} variant="secondary" size="sm">
                    <Waypoints className="h-3.5 w-3.5" /> Flow
                  </Button>
                  <Button as={Link} to="/app/chatbots/new" variant="secondary" size="sm">
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="Delete chatbot?"
        description={`This will permanently remove “${toDelete?.name}” and all its rules. This action cannot be undone.`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setToDelete(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              <Trash2 className="h-4 w-4" /> Delete
            </Button>
          </>
        }
      >
        <div className="flex items-center gap-3 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          <Trash2 className="h-5 w-5 shrink-0" />
          <span>All conversations and captured leads will remain, but the bot will stop responding.</span>
        </div>
      </Modal>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="font-semibold text-surface-900 dark:text-white">{value}</p>
      <p className="text-xs text-surface-400">{label}</p>
    </div>
  )
}

function MenuItem({ as: Tag = 'button', icon: Icon, label, ...props }) {
  return (
    <Tag
      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
      {...props}
    >
      <Icon className="h-4 w-4" /> {label}
    </Tag>
  )
}
