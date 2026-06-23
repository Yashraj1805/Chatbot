import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, CreditCard, Ban, ShieldCheck, Clock } from 'lucide-react'
import { pricingPlans, billingTerms, lifetimeDeal } from '../../data/mockData.js'
import Button from '../ui/Button.jsx'
import Reveal from './Reveal.jsx'
import { Stagger, StaggerItem, AnimatedNumber } from '../motion/index.jsx'
import { cn } from '../../utils/cn.js'

const includes = [
  { icon: Ban, label: 'No credit card required' },
  { icon: Clock, label: '14-day free trial' },
  { icon: CreditCard, label: 'Cancel anytime' },
  { icon: ShieldCheck, label: 'SSL secure & GDPR-ready' },
]

export default function Pricing() {
  const [term, setTerm] = useState('monthly')

  return (
    <section id="pricing" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Pricing
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-surface-900 dark:text-white sm:text-4xl">
            Simple, transparent plans
          </h2>
          <p className="mt-4 text-lg text-surface-600 dark:text-surface-300">
            Start free. Upgrade when you grow. No hidden fees, cancel anytime.
          </p>

          {/* Billing term toggle — longer commitment, lower /mo price */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-1 rounded-full border border-surface-200 bg-white p-1 dark:border-surface-700 dark:bg-surface-900">
            {billingTerms.map((t) => (
              <button
                key={t.key}
                onClick={() => setTerm(t.key)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors',
                  term === t.key ? 'bg-brand-600 text-white' : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
                )}
              >
                {t.label}
                {t.note && (
                  <span
                    className={cn(
                      'rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase',
                      term === t.key ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                    )}
                  >
                    {t.note}
                  </span>
                )}
              </button>
            ))}
          </div>
        </Reveal>

        <Stagger className="mt-12 grid items-start gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => {
            const price = plan.prices[term]
            const saved = plan.prices.monthly - price
            return (
              <StaggerItem
                key={plan.name}
                className={cn(
                  'relative rounded-2xl border bg-white p-7 transition-shadow dark:bg-surface-900',
                  plan.highlighted
                    ? 'border-brand-500 shadow-glow lg:-mt-3'
                    : 'border-surface-200 shadow-card dark:border-surface-800'
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-surface-900 dark:text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">{plan.tagline}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-surface-900 dark:text-white">
                    ₹<AnimatedNumber value={price} />
                  </span>
                  <span className="text-sm text-surface-500">/month</span>
                </div>
                <p className="mt-1 h-4 text-xs text-emerald-600 dark:text-emerald-400">
                  {saved > 0 ? `Save ₹${saved}/mo vs monthly` : ''}
                </p>

                <Button
                  as={Link}
                  to="/join"
                  variant={plan.highlighted ? 'primary' : 'secondary'}
                  className="mt-5 w-full transition-transform hover:-translate-y-0.5"
                >
                  {plan.cta}
                </Button>

                <ul className="mt-7 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-surface-600 dark:text-surface-300">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            )
          })}
        </Stagger>

        {/* All plans include */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {includes.map((i) => (
            <span key={i.label} className="inline-flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
              <i.icon className="h-4 w-4 text-emerald-500" /> {i.label}
            </span>
          ))}
        </div>

        {/* Early-adopter lifetime deal */}
        <Reveal className="mt-12">
          <div className="relative overflow-hidden rounded-2xl bg-surface-900 p-6 text-white shadow-glow dark:bg-surface-950 sm:p-8">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-500/30 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-300">
                  🚀 {lifetimeDeal.badge}
                </span>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-surface-200">
                  <span className="font-semibold text-white">{lifetimeDeal.limit}.</span> {lifetimeDeal.desc}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold tracking-tight">₹{lifetimeDeal.price.toLocaleString('en-IN')}</span>
                  <span className="text-sm text-surface-300">one-time</span>
                </div>
                <Button as={Link} to="/join" variant="white" size="sm">
                  {lifetimeDeal.cta}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
