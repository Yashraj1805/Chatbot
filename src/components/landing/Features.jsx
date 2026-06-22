import { features } from '../../data/mockData.js'
import Reveal from './Reveal.jsx'
import { Stagger, StaggerItem } from '../motion/index.jsx'

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-surface-200 bg-gradient-to-b from-white to-surface-50/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-glow dark:border-surface-800 dark:from-surface-900 dark:to-surface-950/50 dark:hover:border-brand-700">
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-brand-500/15 to-accent-500/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-[0_6px_20px_-6px_rgba(20,167,160,0.6)] ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-base font-semibold text-surface-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-surface-600 dark:text-surface-400">{description}</p>
    </div>
  )
}

function BigFeature({ icon: Icon, title, description }) {
  const chips = ['Visitor: “pricing?”', 'Send plans', 'Capture email', 'Notify team']
  return (
    <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-surface-200 bg-gradient-to-br from-white to-brand-50/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow dark:border-surface-800 dark:from-surface-900 dark:to-brand-950/30">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-brand-500/15 to-accent-500/15 blur-3xl" />
      <div className="relative">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-surface-900 dark:text-white">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-surface-600 dark:text-surface-400">
          {description}
        </p>
      </div>

      {/* mini rule-flow visual */}
      <div className="relative mt-6 flex flex-wrap items-center gap-2">
        {chips.map((c, i) => (
          <div key={c} className="flex items-center gap-2">
            {i > 0 && <span className="text-brand-400">→</span>}
            <span className="rounded-lg border border-surface-200 bg-white px-2.5 py-1.5 text-xs font-medium text-surface-600 shadow-sm dark:border-surface-700 dark:bg-surface-800 dark:text-surface-300">
              {c}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Features() {
  const f = features

  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Features
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-surface-900 dark:text-white sm:text-4xl">
            Everything you need to convert visitors
          </h2>
          <p className="mt-4 text-lg text-surface-600 dark:text-surface-300">
            A complete toolkit to design, deploy, and manage chatbots — built for marketers and
            support teams, not engineers.
          </p>
        </Reveal>

        {/* Bento grid */}
        <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[13.5rem]">
          <StaggerItem className="h-full sm:col-span-2 lg:col-span-2 lg:row-span-2">
            <BigFeature {...f[0]} />
          </StaggerItem>
          <StaggerItem className="h-full lg:col-span-2">
            <FeatureCard {...f[1]} />
          </StaggerItem>
          <StaggerItem className="h-full">
            <FeatureCard {...f[2]} />
          </StaggerItem>
          <StaggerItem className="h-full">
            <FeatureCard {...f[3]} />
          </StaggerItem>
          <StaggerItem className="h-full lg:col-span-2">
            <FeatureCard {...f[4]} />
          </StaggerItem>
          <StaggerItem className="h-full lg:col-span-2">
            <FeatureCard {...f[5]} />
          </StaggerItem>
        </Stagger>

        {/* Remaining features — compact row */}
        <Stagger className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {f.slice(6).map((ft) => (
            <StaggerItem key={ft.title} className="h-full">
              <FeatureCard {...ft} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
