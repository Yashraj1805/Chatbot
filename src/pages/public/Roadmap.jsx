import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles, Rocket, Clock, CheckCircle2 } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout.jsx'
import PageHero from '../../components/PageHero.jsx'

const columns = [
  {
    title: 'Now',
    icon: Rocket,
    tone: 'from-accent-500 to-accent-600',
    ring: 'ring-accent-500/30',
    items: [
      { t: 'AI conversation bots (beta)', p: 72 },
      { t: 'CRM sync — HubSpot & Salesforce', p: 54 },
      { t: 'Team roles & permissions', p: 88 },
    ],
  },
  {
    title: 'Next',
    icon: Sparkles,
    tone: 'from-brand-500 to-brand-600',
    ring: 'ring-brand-500/30',
    items: [
      { t: 'A/B testing for flows', p: 20 },
      { t: 'Multilingual chatbots', p: 12 },
      { t: 'WhatsApp channel', p: 8 },
    ],
  },
  {
    title: 'Later',
    icon: Clock,
    tone: 'from-surface-400 to-surface-500',
    ring: 'ring-surface-400/30',
    items: [
      { t: 'Voice assistant', p: 0 },
      { t: 'Template marketplace', p: 0 },
      { t: 'Advanced analytics & cohorts', p: 0 },
    ],
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Roadmap() {
  const reduce = useReducedMotion()

  return (
    <PublicLayout
      title="Roadmap"
      description="See what we’re building next at VartaBot — upcoming features and ideas."
    >
      <PageHero
        eyebrow="Roadmap"
        title="Where VartaBot is headed"
        subtitle="A living look at what we’re building. Priorities shift with your feedback."
      />

      <section className="relative overflow-hidden py-16 sm:py-20">
        {/* animated ambient blobs */}
        {!reduce && (
          <>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-500/15 blur-3xl"
              animate={{ y: [0, 30, 0], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-accent-500/15 blur-3xl"
              animate={{ y: [0, -30, 0], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}

        <motion.div
          className="container-page relative grid gap-6 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        >
          {columns.map((col) => (
            <motion.div
              key={col.title}
              variants={card}
              whileHover={reduce ? undefined : { y: -6 }}
              className="rounded-3xl border border-surface-200 bg-white/80 p-6 backdrop-blur dark:border-surface-800 dark:bg-surface-900/80"
            >
              <div className="flex items-center gap-3">
                <span className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${col.tone} text-white shadow-soft`}>
                  <col.icon className="h-5 w-5" />
                </span>
                <span className="text-lg font-bold text-surface-900 dark:text-white">{col.title}</span>
              </div>

              <div className="mt-6 space-y-3">
                {col.items.map((it) => (
                  <motion.div
                    key={it.t}
                    variants={card}
                    whileHover={reduce ? undefined : { scale: 1.02 }}
                    className={`rounded-xl border border-surface-200 bg-surface-50 p-4 ring-1 ring-inset ${col.ring} dark:border-surface-700 dark:bg-surface-950/40`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-surface-800 dark:text-surface-100">{it.t}</p>
                      {it.p >= 100 ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-500" />
                      ) : (
                        <span className="shrink-0 text-[11px] font-semibold text-surface-400">
                          {it.p > 0 ? `${it.p}%` : 'Idea'}
                        </span>
                      )}
                    </div>
                    {it.p > 0 && (
                      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-surface-200 dark:bg-surface-700">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${col.tone}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${it.p}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="container-page relative mt-10 text-center text-sm text-surface-500 dark:text-surface-400">
          Got an idea? <Link to="/join" className="font-semibold text-brand-600 dark:text-brand-400">Tell us what to build next →</Link>
        </p>
      </section>
    </PublicLayout>
  )
}
