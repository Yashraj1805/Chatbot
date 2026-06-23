import { Link } from 'react-router-dom'
import { ArrowRight, Target, Heart, Zap, ShieldCheck } from 'lucide-react'
import Navbar from '../components/landing/Navbar.jsx'
import Footer from '../components/landing/Footer.jsx'
import Seo from '../components/Seo.jsx'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'

const stats = [
  { label: 'Businesses', value: '1,200+' },
  { label: 'Chatbots built', value: '4,900+' },
  { label: 'Conversations', value: '1.4M+' },
  { label: 'Countries', value: '40+' },
]

const values = [
  { icon: Zap, title: 'No-code first', desc: 'Anyone on the team can build and ship a bot — no developer required.' },
  { icon: Heart, title: 'Customer obsessed', desc: 'Every feature starts with a real problem our customers face.' },
  { icon: ShieldCheck, title: 'Trust & privacy', desc: 'Your data and your visitors’ data are handled with care, always.' },
  { icon: Target, title: 'Simple by design', desc: 'Powerful doesn’t have to mean complicated. We sweat the details.' },
]

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-950">
      <Seo title="About" description="VartaBot is a no-code platform for building chatbots that greet visitors, answer questions, and capture leads 24/7." />
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-brand-400/20 blur-3xl dark:bg-brand-600/20" />
          </div>
          <div className="container-page text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:border-brand-900/60 dark:bg-brand-950/50 dark:text-brand-300">
              About VartaBot
            </span>
            <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-surface-900 dark:text-white sm:text-5xl">
              We help businesses talk to every visitor — without code
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-surface-600 dark:text-surface-300">
              VartaBot is a no-code platform for building rule-based chatbots that answer questions,
              capture leads, and hand off to live agents — so no customer ever goes unanswered.
            </p>

            {/* Join the pilot */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button as={Link} to="/join" size="lg" className="w-full sm:w-auto">
                Sign up free <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-surface-200 bg-surface-50 py-12 dark:border-surface-800 dark:bg-surface-900/40">
          <div className="container-page grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold tracking-tight text-brand-600 dark:text-brand-400 sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-sm font-medium text-surface-500 dark:text-surface-400">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission / story */}
        <section className="py-20">
          <div className="container-page grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Our mission
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-surface-900 dark:text-white">
                Make great customer conversations effortless
              </h2>
              <p className="mt-4 text-surface-600 dark:text-surface-300">
                We started VartaBot after watching small teams lose leads simply because no one was
                available to reply in time. Hiring more agents wasn’t always the answer — but a smart,
                rule-based assistant that works 24/7 was.
              </p>
              <p className="mt-4 text-surface-600 dark:text-surface-300">
                Today, businesses in 40+ countries use VartaBot to greet visitors, answer common
                questions instantly, capture leads automatically, and bring in a human agent exactly
                when it matters.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((v) => (
                <Card key={v.title} className="p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-300">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-surface-900 dark:text-white">{v.title}</h3>
                  <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">{v.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA with login + signup */}
        <section className="py-20">
          <div className="container-page">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-16 text-center sm:px-16">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Join thousands of growing businesses
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-lg text-brand-100">
                Create your free account in minutes, or log in to your workspace.
              </p>
              <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button as={Link} to="/join" size="lg" className="w-full bg-white text-brand-700 hover:bg-brand-50 sm:w-auto">
                  Sign up free <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
