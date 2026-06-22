import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, UploadCloud, Save, Eye } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import Button from '../components/ui/Button.jsx'
import Card, { CardBody, CardHeader, CardTitle } from '../components/ui/Card.jsx'
import { Field, Input, Textarea } from '../components/ui/Input.jsx'
import ChatWidget from '../components/widget/ChatWidget.jsx'
import { useChatbots } from '../context/ChatbotsContext.jsx'

const presetColors = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#ef4444', '#14b8a6']

export default function CreateChatbot() {
  const navigate = useNavigate()
  const { addChatbot } = useChatbots()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: 'My New Chatbot',
    description: '',
    welcomeMessage: '👋 Hi there! How can I help you today?',
    themeColor: '#4f46e5',
  })

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    setSaving(true)
    // Actually add the bot to the shared list, then go build its flow
    const bot = addChatbot({
      name: form.name,
      description: form.description,
      welcomeMessage: form.welcomeMessage,
      themeColor: form.themeColor,
      status: 'active',
    })
    setTimeout(
      () =>
        navigate(`/app/chatbots/${bot.id}/flow`, {
          state: {
            botName: bot.name,
            themeColor: bot.themeColor,
            welcomeMessage: bot.welcomeMessage,
            isNew: true,
          },
        }),
      900
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/app/chatbots"
          className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
        >
          <ArrowLeft className="h-4 w-4" /> Back to chatbots
        </Link>
        <PageHeader
          title="Create chatbot"
          subtitle="Configure your chatbot’s identity and appearance. Changes preview live."
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-6 lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Basic details</CardTitle>
            </CardHeader>
            <CardBody className="space-y-4 pt-0">
              <Field label="Chatbot name" htmlFor="name">
                <Input id="name" value={form.name} onChange={update('name')} placeholder="e.g. Sales Assistant" required />
              </Field>
              <Field label="Description" htmlFor="description" hint="Internal only">
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={update('description')}
                  placeholder="What is this chatbot for?"
                />
              </Field>
              <Field label="Welcome message" htmlFor="welcome" hint="First thing visitors see">
                <Textarea
                  id="welcome"
                  rows={2}
                  value={form.welcomeMessage}
                  onChange={update('welcomeMessage')}
                />
              </Field>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardBody className="space-y-5 pt-0">
              <div>
                <p className="mb-2 text-sm font-medium text-surface-700 dark:text-surface-300">
                  Theme color
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {presetColors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, themeColor: c }))}
                      className={`h-9 w-9 rounded-full ring-offset-2 transition-all dark:ring-offset-surface-900 ${
                        form.themeColor === c ? 'ring-2 ring-surface-900 dark:ring-white' : ''
                      }`}
                      style={{ backgroundColor: c }}
                      aria-label={`Select color ${c}`}
                    />
                  ))}
                  <label className="relative flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-dashed border-surface-300 text-xs text-surface-400 dark:border-surface-600">
                    <input
                      type="color"
                      value={form.themeColor}
                      onChange={update('themeColor')}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                    +
                  </label>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-surface-700 dark:text-surface-300">
                  Logo
                </p>
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-surface-300 bg-surface-50 px-6 py-8 text-center transition-colors hover:border-brand-400 hover:bg-brand-50/30 dark:border-surface-700 dark:bg-surface-800/50 dark:hover:border-brand-600">
                  <UploadCloud className="h-7 w-7 text-surface-400" />
                  <span className="text-sm font-medium text-surface-600 dark:text-surface-300">
                    Click to upload or drag & drop
                  </span>
                  <span className="text-xs text-surface-400">PNG, JPG or SVG (max. 2MB)</span>
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>
            </CardBody>
          </Card>

          <div className="flex justify-end gap-3">
            <Button as={Link} to="/app/chatbots" variant="secondary">
              Cancel
            </Button>
            <Button type="submit" loading={saving}>
              <Save className="h-4 w-4" /> {saving ? 'Saving…' : 'Save & build flow'}
            </Button>
          </div>
        </form>

        {/* Live preview */}
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-surface-500 dark:text-surface-400">
              <Eye className="h-4 w-4" /> Live preview
            </div>
            <div className="rounded-2xl border border-surface-200 bg-gradient-to-br from-surface-100 to-surface-50 p-6 dark:border-surface-800 dark:from-surface-900 dark:to-surface-950">
              <ChatWidget
                mode="inline"
                themeColor={form.themeColor}
                botName={form.name || 'My New Chatbot'}
                welcomeMessage={form.welcomeMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
