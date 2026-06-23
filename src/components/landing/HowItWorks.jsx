import { motion } from 'framer-motion'
import { howItWorks } from '../../data/mockData.js'
import Reveal from './Reveal.jsx'
import { Stagger, StaggerItem } from '../motion/index.jsx'

// Mini visual mock for each step — makes the section feel alive & product-real.
const visuals = [
  // 1. Create your chatbot — brand color + name
  <div key="v1" className="rounded-xl border border-surface-200 bg-surface-50 p-3 text-left dark:border-surface-700 dark:bg-surface-950/50">
    <div className="flex gap-1.5">
      {['#284b7d', '#e9853d', '#6c8cff', '#f59e0b', '#ec4899'].map((c, i) => (
        <span
          key={c}
          className={`h-5 w-5 rounded-full ${i === 0 ? 'ring-2 ring-offset-2 ring-brand-500 dark:ring-offset-surface-950' : ''}`}
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
    <div className="mt-3 flex h-7 items-center rounded-md bg-white px-2 text-[11px] text-surface-500 shadow-sm dark:bg-surface-800 dark:text-surface-300">
      Sales Assistant
    </div>
  </div>,

  // 2. Define rules & responses — keyword → response
  <div key="v2" className="rounded-xl border border-surface-200 bg-surface-50 p-3 text-left dark:border-surface-700 dark:bg-surface-950/50">
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="rounded-md bg-brand-100 px-2 py-1 text-[11px] font-semibold text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
        “pricing”
      </span>
      <span className="text-brand-400">→</span>
      <span className="rounded-md bg-white px-2 py-1 text-[11px] text-surface-500 shadow-sm dark:bg-surface-800 dark:text-surface-300">
        Send plans
      </span>
    </div>
    <div className="mt-2 rounded-lg rounded-tl-sm bg-white px-2.5 py-1.5 text-[11px] text-surface-600 shadow-sm dark:bg-surface-800 dark:text-surface-300">
      Plans start at $29/mo 👋
    </div>
  </div>,

  // 3. Embed & go live — code snippet
  <div key="v3" className="rounded-xl border border-surface-200 bg-surface-900 p-3 text-left font-mono dark:border-surface-700">
    <div className="mb-1.5 flex gap-1">
      <span className="h-2 w-2 rounded-full bg-red-400" />
      <span className="h-2 w-2 rounded-full bg-amber-400" />
      <span className="h-2 w-2 rounded-full bg-emerald-400" />
    </div>
    <p className="text-[10.5px] leading-relaxed text-surface-300">
      <span className="text-surface-500">&lt;script</span>{' '}
      <span className="text-accent-300">src</span>=
      <span className="text-brand-300">"vartabot.js"</span>
      <span className="text-surface-500">&gt;&lt;/script&gt;</span>
    </p>
  </div>,
]

export default function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 py-12 sm:py-16">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            How it works
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-surface-900 dark:text-white sm:text-4xl">
            From zero to live in three steps
          </h2>
        </Reveal>

        <div className="relative mt-16">
          {/* glowing connector on desktop — draws in when scrolled into view */}
          <motion.div
            aria-hidden
            className="absolute left-[16%] right-[16%] top-16 hidden h-0.5 origin-left bg-gradient-to-r from-brand-400/0 via-brand-400/70 to-accent-400/0 md:block"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />

          <Stagger className="grid gap-6 md:grid-cols-3" gap={0.15}>
            {howItWorks.map(({ step, icon: Icon, title, description }, i) => (
              <StaggerItem key={step} className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-surface-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-glow dark:border-surface-800 dark:bg-surface-900 dark:hover:border-brand-700">
                {/* watermark number */}
                <span className="pointer-events-none absolute -right-2 -top-4 select-none text-8xl font-black leading-none text-surface-100 transition-colors duration-300 group-hover:text-brand-100 dark:text-surface-800/70 dark:group-hover:text-brand-950/60">
                  {step}
                </span>

                {/* gradient icon badge */}
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-7 w-7" />
                </div>

                <div className="relative mt-5 text-center text-xs font-bold uppercase tracking-widest text-brand-500">
                  Step {step}
                </div>
                <h3 className="relative mt-2 text-center text-lg font-semibold text-surface-900 dark:text-white">
                  {title}
                </h3>
                <p className="relative mx-auto mt-2 max-w-xs text-center text-sm leading-relaxed text-surface-600 dark:text-surface-400">
                  {description}
                </p>

                {/* mini visual */}
                <div className="relative mt-5">{visuals[i]}</div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
