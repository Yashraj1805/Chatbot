import { Link } from 'react-router-dom'
import {
  Workflow,
  MousePointerClick,
  ShieldCheck,
  Zap,
  Gauge,
  ListChecks,
  ArrowRight,
} from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout.jsx'
import PageHero from '../../components/PageHero.jsx'
import Reveal from '../../components/landing/Reveal.jsx'
import Button from '../../components/ui/Button.jsx'
import JsonLd from '../../components/JsonLd.jsx'

const BASE = 'https://vartabot.in'

const TITLE = 'Rule-Based Chatbot Builder'
const DESCRIPTION =
  'A rule-based chatbot answers visitors with keywords, buttons and predefined flows you control — no AI, no code. Learn how rule-based chatbots work and build one with VartaBot in minutes.'

const benefits = [
  {
    icon: Gauge,
    title: 'Predictable by design',
    body: 'A rule-based chatbot only says what you tell it to. No hallucinations, no off-brand answers — every reply is one you approved.',
  },
  {
    icon: Zap,
    title: 'Live in minutes',
    body: 'Add a few keyword and button rules, paste one line of code, and your chatbot is answering visitors. Most teams go live in under 15 minutes.',
  },
  {
    icon: MousePointerClick,
    title: 'Truly no-code',
    body: 'Build the whole conversation visually with a drag-and-drop flow builder. No developers, no scripts, no maintenance headaches.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe & compliant',
    body: 'Because answers are fixed, a rule-based chatbot is easy to govern — ideal for regulated industries and brand-sensitive teams.',
  },
]

const steps = [
  {
    icon: ListChecks,
    title: '1. Define your rules',
    body: 'Map visitor intents to responses: keywords (“pricing”, “support”), tappable buttons, and conditions that branch the conversation.',
  },
  {
    icon: Workflow,
    title: '2. Build the flow',
    body: 'Connect messages, questions and conditions into a visual flow. Capture name, email and phone automatically along the way.',
  },
  {
    icon: MousePointerClick,
    title: '3. Embed & go live',
    body: 'Copy one snippet onto any website — WordPress, Shopify, Webflow, Wix and more — and your rule-based chatbot starts working 24/7.',
  },
]

const faqs = [
  {
    q: 'What is a rule-based chatbot?',
    a: 'A rule-based chatbot is a bot that responds using predefined rules — keywords, buttons, conditions and conversation flows — instead of generative AI. It always replies in ways you have configured, which makes it fast, predictable and easy to control.',
  },
  {
    q: 'How is a rule-based chatbot different from an AI chatbot?',
    a: 'A rule-based chatbot follows fixed rules and only gives answers you set up, so it is predictable and governable. An AI chatbot generates answers on the fly, which is more flexible but less predictable. Many teams start with rules for lead capture and FAQs, then add AI later.',
  },
  {
    q: 'Do I need to code to build a rule-based chatbot?',
    a: 'No. With VartaBot you build the entire chatbot visually — create rules and flows with drag-and-drop, then install it with a single copy-paste snippet. No coding required.',
  },
  {
    q: 'Where can I use a rule-based chatbot?',
    a: 'On any website. VartaBot works with WordPress, Shopify, Webflow, Wix, Squarespace and custom sites, and connects to tools like Slack and HubSpot via Zapier.',
  },
  {
    q: 'Can a rule-based chatbot capture leads?',
    a: 'Yes. Rule-based chatbots are excellent at lead capture — they ask qualifying questions and collect name, email and phone automatically, then store them in your dashboard for export.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    { '@type': 'ListItem', position: 2, name: TITLE, item: `${BASE}/rule-based-chatbot` },
  ],
}

export default function RuleBasedChatbot() {
  return (
    <PublicLayout title={TITLE} description={DESCRIPTION}>
      <JsonLd id="rbc-faq-schema" data={faqSchema} />
      <JsonLd id="rbc-breadcrumb-schema" data={breadcrumbSchema} />

      <PageHero
        eyebrow="Rule-based chatbots"
        title="The no-code rule-based chatbot builder"
        subtitle="Build a rule-based chatbot that greets visitors, answers with keywords and buttons, and captures leads 24/7 — predictable, on-brand, and live on your site in minutes."
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Button as={Link} to="/join" size="lg">
            Build your chatbot free <ArrowRight className="h-4 w-4" />
          </Button>
          <Button as={Link} to="/pricing" size="lg" variant="secondary">
            See pricing
          </Button>
        </div>
      </PageHero>

      {/* What is it */}
      <section className="py-12 sm:py-16">
        <div className="container-page max-w-3xl">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight text-surface-900 dark:text-white sm:text-3xl">
              What is a rule-based chatbot?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-surface-600 dark:text-surface-300">
              A <strong>rule-based chatbot</strong> responds to visitors using rules you define —
              keywords, tappable buttons, conditions and conversation flows — instead of generative
              AI. Every answer is one you set up in advance, so the bot is fast, predictable and
              completely under your control. That makes rule-based chatbots ideal for lead capture,
              FAQs, routing and booking, where the set of possible outcomes is known.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-surface-600 dark:text-surface-300">
              VartaBot is a <strong>no-code rule-based chatbot builder</strong>: you create the whole
              conversation visually and embed it on any website with a single line of code. Want the
              full comparison? Read{' '}
              <Link
                to="/blog/rule-based-vs-ai-chatbots"
                className="font-semibold text-brand-600 hover:underline dark:text-brand-400"
              >
                rule-based vs AI chatbots
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why */}
      <section className="bg-surface-100/60 py-12 dark:bg-surface-900/40 sm:py-16">
        <div className="container-page">
          <Reveal>
            <h2 className="text-center text-2xl font-bold tracking-tight text-surface-900 dark:text-white sm:text-3xl">
              Why choose a rule-based chatbot?
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 60}>
                <div className="flex h-full gap-4 rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-soft">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-surface-900 dark:text-white">
                      {b.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-surface-600 dark:text-surface-400">
                      {b.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How */}
      <section className="py-12 sm:py-16">
        <div className="container-page">
          <Reveal>
            <h2 className="text-center text-2xl font-bold tracking-tight text-surface-900 dark:text-white sm:text-3xl">
              How to build a rule-based chatbot
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-surface-900 dark:text-white">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-surface-600 dark:text-surface-400">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button as={Link} to="/features" variant="secondary">
              Explore all features
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-100/60 py-12 dark:bg-surface-900/40 sm:py-16">
        <div className="container-page max-w-3xl">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight text-surface-900 dark:text-white sm:text-3xl">
              Rule-based chatbot FAQs
            </h2>
          </Reveal>
          <div className="mt-8 space-y-6">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 30}>
                <h3 className="text-lg font-semibold text-surface-900 dark:text-white">{f.q}</h3>
                <p className="mt-2 leading-relaxed text-surface-600 dark:text-surface-300">{f.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-surface-900 dark:text-white sm:text-3xl">
            Build your rule-based chatbot today
          </h2>
          <p className="mt-3 text-lg text-surface-600 dark:text-surface-300">
            Free for 14 days. No credit card. Live on your site in minutes.
          </p>
          <Button as={Link} to="/join" size="lg" className="mt-6">
            Get started free <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </PublicLayout>
  )
}
