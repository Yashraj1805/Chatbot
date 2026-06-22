import { useState } from 'react'
import { Mail, MessageSquare, MapPin, Check } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout.jsx'
import PageHero from '../../components/PageHero.jsx'
import Reveal from '../../components/landing/Reveal.jsx'
import Button from '../../components/ui/Button.jsx'

const channels = [
  { icon: Mail, label: 'Email us', value: 'hello@vartabot.in', href: 'mailto:hello@vartabot.in' },
  { icon: MessageSquare, label: 'Live chat', value: 'Use the assistant, bottom-right' },
  { icon: MapPin, label: 'Office', value: 'San Francisco, CA' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <PublicLayout
      title="Contact"
      description="Get in touch with the VartaBot team for questions, demos, or partnerships. We reply within a few hours."
    >
      <PageHero eyebrow="Contact" title="Let’s talk" subtitle="Questions, demos, or partnerships — we usually reply within a few hours." />

      <section className="py-16 sm:py-20">
        <div className="container-page grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Channels */}
          <Reveal className="space-y-4">
            {channels.map((c) => (
              <div key={c.label} className="flex items-start gap-4 rounded-2xl border border-surface-200 bg-white p-5 dark:border-surface-800 dark:bg-surface-900">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-soft">
                  <c.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-surface-900 dark:text-white">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="text-sm text-brand-600 dark:text-brand-400">{c.value}</a>
                  ) : (
                    <p className="text-sm text-surface-600 dark:text-surface-400">{c.value}</p>
                  )}
                </div>
              </div>
            ))}
          </Reveal>

          {/* Form */}
          <Reveal delay={80}>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
              className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card dark:border-surface-800 dark:bg-surface-900 sm:p-8"
            >
              {sent ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-500/15 text-accent-600 dark:text-accent-400">
                    <Check className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-surface-900 dark:text-white">Message sent!</h3>
                  <p className="mt-1 text-sm text-surface-600 dark:text-surface-400">We’ll get back to you shortly.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name"><input required className={inputCls} placeholder="Harpreet Sachdev" /></Field>
                    <Field label="Work email"><input required type="email" className={inputCls} placeholder="you@company.com" /></Field>
                  </div>
                  <Field label="Company"><input className={inputCls} placeholder="The Sachdev Group" /></Field>
                  <Field label="How can we help?">
                    <textarea required rows={4} className={inputCls + ' resize-none'} placeholder="Tell us a bit about what you need…" />
                  </Field>
                  <Button type="submit" className="w-full">Send message</Button>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </PublicLayout>
  )
}

const inputCls =
  'w-full rounded-lg border border-surface-300 bg-white px-3.5 py-2.5 text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 dark:border-surface-700 dark:bg-surface-800 dark:text-white'

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">{label}</span>
      {children}
    </label>
  )
}
