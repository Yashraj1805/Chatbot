import { useState } from 'react'
import { Copy, Check, Code2, Globe, MousePointer, Rocket, Eye } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import Card, { CardBody, CardHeader, CardTitle } from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import { Select } from '../components/ui/Input.jsx'
import ChatWidget from '../components/widget/ChatWidget.jsx'
import { embedSnippet, chatbots } from '../data/mockData.js'

const steps = [
  { icon: MousePointer, title: 'Copy the snippet', description: 'Click the copy button to grab your unique embed code.' },
  { icon: Code2, title: 'Paste before </body>', description: 'Add the snippet to every page where you want the widget to appear.' },
  { icon: Globe, title: 'Publish your site', description: 'Save and publish. The widget loads automatically for visitors.' },
  { icon: Rocket, title: 'You’re live!', description: 'Your chatbot starts greeting visitors and capturing leads instantly.' },
]

export default function WidgetInstall() {
  const [copied, setCopied] = useState(false)
  const [botId, setBotId] = useState(chatbots[0].id)
  const bot = chatbots.find((b) => b.id === botId)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(embedSnippet)
    } catch {
      /* clipboard may be blocked in some browsers — preview still shown */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Install widget" subtitle="Add your chatbot to any website with a single snippet." />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-surface-600 dark:text-surface-300">
          Select which chatbot to embed:
        </p>
        <Select value={botId} onChange={(e) => setBotId(e.target.value)} className="sm:w-64">
          {chatbots.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          {/* Embed code */}
          <Card>
            <CardHeader>
              <CardTitle>Embed code</CardTitle>
              <Button size="sm" variant={copied ? 'secondary' : 'primary'} onClick={copy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy code'}
              </Button>
            </CardHeader>
            <CardBody className="pt-0">
              <pre className="overflow-x-auto rounded-xl bg-surface-900 p-4 text-xs leading-relaxed text-surface-100 dark:bg-surface-950 dark:ring-1 dark:ring-surface-800">
                <code>{embedSnippet}</code>
              </pre>
              <p className="mt-3 text-xs text-surface-500">
                This snippet is unique to your workspace. Paste it once per site — it works across
                all pages.
              </p>
            </CardBody>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Installation instructions</CardTitle>
            </CardHeader>
            <CardBody className="pt-0">
              <ol className="space-y-5">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-600 dark:bg-brand-950/50 dark:text-brand-300">
                      {i + 1}
                    </span>
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-surface-900 dark:text-white">
                        <s.icon className="h-4 w-4 text-surface-400" /> {s.title}
                      </p>
                      <p className="mt-0.5 text-sm text-surface-500 dark:text-surface-400">
                        {s.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-6 rounded-xl border border-brand-100 bg-brand-50/60 p-4 text-sm text-brand-800 dark:border-brand-900/50 dark:bg-brand-950/30 dark:text-brand-200">
                <strong>Using WordPress, Shopify, or Webflow?</strong> Paste the snippet into your
                theme’s footer / custom-code section. No plugin required.
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Live preview */}
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-surface-500 dark:text-surface-400">
              <Eye className="h-4 w-4" /> Widget preview — {bot.name}
            </div>
            <div className="rounded-2xl border border-surface-200 bg-gradient-to-br from-surface-100 to-surface-50 p-6 dark:border-surface-800 dark:from-surface-900 dark:to-surface-950">
              <ChatWidget
                mode="inline"
                themeColor={bot.themeColor}
                botName={bot.name}
                welcomeMessage={bot.welcomeMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
