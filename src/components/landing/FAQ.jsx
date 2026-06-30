import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, MessageCircleQuestion } from 'lucide-react'
import { faqs } from '../../data/mockData.js'
import Reveal from './Reveal.jsx'
import Button from '../ui/Button.jsx'
import JsonLd from '../JsonLd.jsx'
import { Stagger, StaggerItem } from '../motion/index.jsx'
import { cn } from '../../utils/cn.js'

// FAQPage structured data → eligible for Google's expandable FAQ rich results.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="scroll-mt-20 py-12 sm:py-16">
      <JsonLd id="faq-schema" data={faqSchema} />
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Left — heading + support */}
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-surface-900 dark:text-white sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-surface-600 dark:text-surface-300">
            Everything you need to know before getting started.
          </p>

          <div className="mt-8 rounded-2xl border border-surface-200 bg-gradient-to-br from-brand-50 to-accent-50/50 p-6 dark:border-surface-800 dark:from-brand-950/40 dark:to-accent-950/20">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-soft">
              <MessageCircleQuestion className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-surface-900 dark:text-white">
              Still have questions?
            </h3>
            <p className="mt-1 text-sm text-surface-600 dark:text-surface-400">
              Our team replies within a few hours. Ask us anything.
            </p>
            <Button as={Link} to="/join" size="sm" className="mt-4">
              Talk to us
            </Button>
          </div>
        </Reveal>

        {/* Right — accordion */}
        <Stagger className="space-y-3" gap={0.05}>
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <StaggerItem key={f.q}>
                <div
                  className={cn(
                    'overflow-hidden rounded-xl border bg-white transition-colors dark:bg-surface-900',
                    isOpen
                      ? 'border-brand-300 shadow-soft dark:border-brand-700'
                      : 'border-surface-200 dark:border-surface-800'
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-base font-semibold text-surface-900 dark:text-white">
                      {f.q}
                    </span>
                    <span
                      className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200',
                        isOpen
                          ? 'rotate-180 bg-brand-600 text-white'
                          : 'bg-surface-100 text-surface-500 dark:bg-surface-800'
                      )}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className={cn(
                      'grid transition-all duration-200',
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-surface-600 dark:text-surface-400">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
