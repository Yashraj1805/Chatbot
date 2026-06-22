import { Link } from 'react-router-dom'
import {
  Workflow, Palette, Code2, Users, BarChart3, Headset, Globe, Clock, ShieldCheck, Check,
} from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout.jsx'
import PageHero from '../../components/PageHero.jsx'
import Reveal from '../../components/landing/Reveal.jsx'
import Button from '../../components/ui/Button.jsx'

// Detailed, explained features — the dedicated /features page (not the landing grid).
const featureSections = [
  {
    icon: Workflow,
    title: 'Visual rule builder',
    desc: 'Design exactly what your bot says — no code, no flowchart degree required. Map keywords and buttons to responses, then chain them into full conversations.',
    points: ['Keyword, button & fallback rules', 'Drag-to-connect conversation flows', 'Live preview as you build'],
  },
  {
    icon: Palette,
    title: 'Fully branded widget',
    desc: 'Your chatbot should feel like part of your site — not a bolt-on. Control colours, logo, welcome message, and tone so it looks built-in.',
    points: ['Brand colour & logo', 'Custom greeting & quick replies', 'Remove our badge (Growth+)'],
  },
  {
    icon: Users,
    title: 'Automatic lead capture',
    desc: 'Turn conversations into pipeline. VartaBot collects names, emails, and phone numbers, validates them, and stores every lead with its context.',
    points: ['Name, email & phone capture', 'Validated, clean data', 'Filter, export & sync to CRM'],
  },
  {
    icon: BarChart3,
    title: 'Conversation analytics',
    desc: 'See what visitors actually ask, where they drop off, and which rules convert — so you can improve your bot every week.',
    points: ['Top questions & intents', 'Drop-off & conversion insights', 'Per-rule performance'],
  },
  {
    icon: Headset,
    title: 'Live agent handoff',
    desc: 'When a visitor needs a human, the bot hands off seamlessly. Your team picks up with full conversation context in a live inbox.',
    points: ['One-tap “talk to a human”', 'Shared live inbox', 'Full conversation history'],
  },
  {
    icon: Code2,
    title: 'One-line install, works everywhere',
    desc: 'Paste a single snippet and you’re live — on WordPress, Shopify, Webflow, Wix, Squarespace, or any custom site. No plugin needed.',
    points: ['Single <script> snippet', 'Any platform, no plugin', 'Live in under 15 minutes'],
  },
]

const extras = [
  { icon: Globe, title: 'Works on any site', desc: 'WordPress, Shopify, Webflow, Wix & more.' },
  { icon: Clock, title: '24/7 availability', desc: 'Greet and qualify visitors around the clock.' },
  { icon: ShieldCheck, title: 'Enterprise-ready', desc: 'Roles, audit logs, and GDPR-conscious data.' },
]

export default function FeaturesPage() {
  return (
    <PublicLayout
      title="Features"
      description="Everything VartaBot offers — a visual no-code rule builder, branded widget, lead capture, analytics, integrations, and live agent handoff."
    >
      <PageHero
        eyebrow="Features"
        title="Everything you need to convert visitors"
        subtitle="A complete, no-code toolkit to design, deploy, and grow chatbots — built for marketers and support teams."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page max-w-5xl space-y-16 sm:space-y-24">
          {featureSections.map((f, i) => (
            <Reveal key={f.title}>
              <div className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                {/* Visual */}
                <div className="relative">
                  <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-500/15 to-accent-500/10 blur-2xl" />
                  <div className="flex aspect-[4/3] items-center justify-center rounded-3xl border border-surface-200 bg-gradient-to-br from-surface-50 to-white dark:border-surface-800 dark:from-surface-900 dark:to-surface-950">
                    <span className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
                      <f.icon className="h-12 w-12" />
                    </span>
                  </div>
                </div>
                {/* Copy */}
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-surface-900 dark:text-white sm:text-3xl">{f.title}</h2>
                  <p className="mt-3 text-lg leading-relaxed text-surface-600 dark:text-surface-300">{f.desc}</p>
                  <ul className="mt-5 space-y-2.5">
                    {f.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-surface-700 dark:text-surface-200">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-600 dark:text-accent-400">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Extras */}
      <section className="border-t border-surface-200 py-16 dark:border-surface-800 sm:py-20">
        <div className="container-page grid max-w-4xl gap-6 sm:grid-cols-3">
          {extras.map((e, i) => (
            <Reveal key={e.title} delay={i * 60} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-300">
                  <e.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-surface-900 dark:text-white">{e.title}</h3>
                <p className="mt-1.5 text-sm text-surface-600 dark:text-surface-400">{e.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button as={Link} to="/join" size="lg">Start building free</Button>
          <p className="mt-3 text-sm text-surface-500">14-day free trial · no credit card</p>
        </div>
      </section>
    </PublicLayout>
  )
}
