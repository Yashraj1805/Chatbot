import { Check, Minus, ShieldCheck } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout.jsx'
import Pricing from '../../components/landing/Pricing.jsx'
import CTA from '../../components/landing/CTASpotlight.jsx'
import Reveal from '../../components/landing/Reveal.jsx'

// Per-plan feature matrix — pricing-specific (distinct from the landing page).
const matrix = [
  { label: 'Chatbots', s: '1', g: '5', x: 'Unlimited' },
  { label: 'Rules per bot', s: '50', g: 'Unlimited', x: 'Unlimited' },
  { label: 'Conversations / month', s: 'Unlimited', g: 'Unlimited', x: 'Unlimited' },
  { label: 'Live agent seats', s: '0', g: '2', x: '10' },
  { label: 'Lead capture', s: true, g: true, x: true },
  { label: 'Lead export (CSV)', s: false, g: true, x: true },
  { label: 'CRM integration', s: false, g: false, x: true },
  { label: 'Conversation analytics', s: false, g: true, x: true },
  { label: 'Remove VartaBot badge', s: false, g: true, x: true },
  { label: 'Done-for-you AI chatbot setup', s: false, g: false, x: true },
  { label: 'Team roles & permissions', s: false, g: false, x: true },
  { label: 'Dedicated success manager', s: false, g: false, x: true },
  { label: 'Support', s: 'Email', g: 'Priority', x: 'Dedicated' },
]

const faqs = [
  { q: 'Is there a free trial?', a: 'Yes — every plan includes a 14-day free trial. No credit card required to start.' },
  { q: 'Can I change plans later?', a: 'Anytime. Upgrades and downgrades take effect immediately and are prorated automatically.' },
  { q: 'What counts as a conversation?', a: 'One chat session with a visitor counts as a single conversation, no matter how many messages it contains.' },
  { q: 'Do you offer annual billing?', a: 'Yes — switch to annual on the pricing toggle and save 20% versus monthly.' },
  { q: 'Do you offer refunds?', a: 'Every paid plan comes with a 30-day money-back guarantee, no questions asked.' },
  { q: 'Which payment methods do you accept?', a: 'All major credit and debit cards through our secure checkout.' },
]

function Cell({ value }) {
  if (value === true) return <Check className="mx-auto h-4 w-4 text-accent-600 dark:text-accent-400" strokeWidth={2.5} />
  if (value === false) return <Minus className="mx-auto h-4 w-4 text-surface-300 dark:text-surface-600" />
  return <span className="text-sm text-surface-700 dark:text-surface-200">{value}</span>
}

export default function PricingPage() {
  return (
    <PublicLayout
      title="Pricing"
      description="Simple, transparent VartaBot pricing — Starter, Growth, and Scale plans with a 14-day free trial. No credit card required."
    >
      <Pricing />

      {/* Guarantee banner */}
      <section className="pb-4">
        <div className="container-page">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-accent-200 bg-accent-50 p-6 text-center dark:border-accent-900/50 dark:bg-accent-950/30 sm:flex-row sm:text-left">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-soft">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <p className="font-semibold text-surface-900 dark:text-white">30-day money-back guarantee</p>
              <p className="mt-0.5 text-sm text-surface-600 dark:text-surface-300">
                Try any paid plan risk-free. Not happy in the first 30 days? We’ll refund you in full.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Plan feature matrix */}
      <section className="py-16 sm:py-20">
        <div className="container-page max-w-4xl">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-surface-900 dark:text-white sm:text-4xl">
              Compare plans in detail
            </h2>
            <p className="mt-4 text-lg text-surface-600 dark:text-surface-300">
              Everything that’s included at each tier.
            </p>
          </Reveal>

          <Reveal className="overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-card dark:border-surface-800 dark:bg-surface-900">
            <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-surface-200 bg-surface-50 dark:border-surface-800 dark:bg-surface-950">
              <div className="px-4 py-4 text-sm font-semibold text-surface-500 sm:px-6">Feature</div>
              <div className="px-2 py-4 text-center text-sm font-bold text-surface-900 dark:text-white">Starter</div>
              <div className="relative px-2 py-4 text-center text-sm font-bold text-brand-700 dark:text-brand-300">
                Growth
                <span className="ml-1 hidden rounded-full bg-brand-600 px-1.5 py-0.5 text-[10px] text-white sm:inline">Popular</span>
              </div>
              <div className="px-2 py-4 text-center text-sm font-bold text-surface-900 dark:text-white">Scale</div>
            </div>
            {matrix.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center ${i % 2 === 1 ? 'bg-surface-50/50 dark:bg-surface-950/30' : ''}`}
              >
                <div className="px-4 py-3.5 text-sm text-surface-700 dark:text-surface-200 sm:px-6">{row.label}</div>
                <div className="px-2 py-3.5 text-center"><Cell value={row.s} /></div>
                <div className="bg-brand-50/40 px-2 py-3.5 text-center dark:bg-brand-950/20"><Cell value={row.g} /></div>
                <div className="px-2 py-3.5 text-center"><Cell value={row.x} /></div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="border-t border-surface-200 py-16 dark:border-surface-800 sm:py-20">
        <div className="container-page max-w-4xl">
          <Reveal className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-surface-900 dark:text-white sm:text-4xl">
              Pricing questions
            </h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 40}>
                <div className="h-full rounded-2xl border border-surface-200 bg-white p-5 dark:border-surface-800 dark:bg-surface-900">
                  <h3 className="text-base font-semibold text-surface-900 dark:text-white">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-surface-600 dark:text-surface-400">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </PublicLayout>
  )
}
