import { CheckCircle2 } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout.jsx'
import PageHero from '../../components/PageHero.jsx'
import Reveal from '../../components/landing/Reveal.jsx'

const systems = [
  { name: 'Chatbot widget', uptime: '99.99%' },
  { name: 'Dashboard & API', uptime: '99.98%' },
  { name: 'Lead capture & storage', uptime: '100%' },
  { name: 'Integrations (Zapier, webhooks)', uptime: '99.95%' },
  { name: 'Authentication', uptime: '100%' },
]

export default function Status() {
  return (
    <PublicLayout
      title="Status"
      description="Live health and uptime for VartaBot services — widget, dashboard, API, and integrations."
    >
      <PageHero eyebrow="Status" title="System status" subtitle="Live health of VartaBot services." />
      <section className="py-16 sm:py-20">
        <div className="container-page max-w-3xl">
          <Reveal className="mb-6 flex items-center gap-3 rounded-2xl border border-accent-200 bg-accent-50 p-5 dark:border-accent-900/50 dark:bg-accent-950/30">
            <CheckCircle2 className="h-6 w-6 text-accent-600 dark:text-accent-400" />
            <span className="font-semibold text-surface-900 dark:text-white">All systems operational</span>
          </Reveal>
          <div className="divide-y divide-surface-200 overflow-hidden rounded-2xl border border-surface-200 bg-white dark:divide-surface-800 dark:border-surface-800 dark:bg-surface-900">
            {systems.map((s) => (
              <div key={s.name} className="flex items-center justify-between px-5 py-4">
                <span className="text-sm font-medium text-surface-700 dark:text-surface-200">{s.name}</span>
                <span className="flex items-center gap-2 text-sm">
                  <span className="text-surface-400">{s.uptime}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500/15 px-2.5 py-0.5 text-xs font-semibold text-accent-600 dark:text-accent-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-500" /> Operational
                  </span>
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">Uptime shown for the last 90 days.</p>
        </div>
      </section>
    </PublicLayout>
  )
}
