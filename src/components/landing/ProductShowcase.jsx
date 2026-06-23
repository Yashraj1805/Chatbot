import { motion } from 'framer-motion'
import { LayoutDashboard, MessageSquare, Users, BarChart3, Settings, Bot, TrendingUp } from 'lucide-react'
import Reveal from './Reveal.jsx'
import Logo from '../Logo.jsx'

// A stylised, static mock of the product dashboard inside a browser frame.
// Pure markup — gives visitors the "this is a real platform" signal the hero
// widget alone can't provide.
const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Bot, label: 'Chatbots' },
  { icon: MessageSquare, label: 'Conversations' },
  { icon: Users, label: 'Leads' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
]

const stats = [
  { label: 'Conversations', value: '12,480', delta: '+18%' },
  { label: 'Leads captured', value: '932', delta: '+9%' },
  { label: 'Active chatbots', value: '6', delta: '+2' },
]

const bars = [42, 58, 50, 72, 65, 88, 79, 96, 84, 100, 92, 78]

export default function ProductShowcase() {
  return (
    <section className="relative -mt-6 pb-8">
      <div className="container-page">
        <Reveal className="relative mx-auto max-w-5xl">
          {/* glow behind frame */}
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-brand-500/20 via-accent-500/10 to-transparent blur-2xl" />

          <div className="overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-glow dark:border-surface-800 dark:bg-surface-900">
            {/* browser top bar */}
            <div className="flex items-center gap-2 border-b border-surface-200 bg-surface-50 px-4 py-3 dark:border-surface-800 dark:bg-surface-950">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <div className="mx-auto hidden items-center gap-2 rounded-md bg-white px-3 py-1 text-xs text-surface-400 dark:bg-surface-900 sm:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> app.vartabot.in/dashboard
              </div>
            </div>

            {/* app body */}
            <div className="flex">
              {/* sidebar */}
              <aside className="hidden w-44 shrink-0 border-r border-surface-200 p-3 dark:border-surface-800 sm:block">
                <div className="px-2 pb-4">
                  <Logo markClassName="h-8 w-8" textClassName="text-sm" />
                </div>
                <nav className="space-y-1">
                  {navItems.map((n) => (
                    <div
                      key={n.label}
                      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium ${
                        n.active
                          ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300'
                          : 'text-surface-500 dark:text-surface-400'
                      }`}
                    >
                      <n.icon className="h-4 w-4" /> {n.label}
                    </div>
                  ))}
                </nav>
              </aside>

              {/* main panel */}
              <div className="min-w-0 flex-1 bg-surface-50/60 p-4 dark:bg-surface-950/40 sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-surface-900 dark:text-white">Dashboard</p>
                    <p className="text-xs text-surface-500">Welcome back, Harpreet 👋</p>
                  </div>
                  <span className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white">
                    + New chatbot
                  </span>
                </div>

                {/* stat cards */}
                <div className="grid grid-cols-3 gap-3">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-surface-200 bg-white p-3 dark:border-surface-800 dark:bg-surface-900"
                    >
                      <p className="truncate text-[10px] uppercase tracking-wide text-surface-400">{s.label}</p>
                      <p className="mt-1 text-base font-bold text-surface-900 dark:text-white sm:text-lg">{s.value}</p>
                      <p className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-500">
                        <TrendingUp className="h-3 w-3" /> {s.delta}
                      </p>
                    </div>
                  ))}
                </div>

                {/* chart */}
                <div className="mt-3 rounded-xl border border-surface-200 bg-white p-4 dark:border-surface-800 dark:bg-surface-900">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-semibold text-surface-700 dark:text-surface-200">
                      Conversations · last 12 days
                    </p>
                    <span className="text-[10px] font-medium text-emerald-500">▲ Trending up</span>
                  </div>
                  <div className="flex h-24 items-end gap-1.5">
                    {bars.map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-t bg-gradient-to-t from-brand-500 to-accent-400"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.04 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
