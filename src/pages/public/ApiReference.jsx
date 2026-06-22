import { Link } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout.jsx'
import PageHero from '../../components/PageHero.jsx'
import Reveal from '../../components/landing/Reveal.jsx'

const endpoints = [
  { m: 'GET', p: '/v1/chatbots', d: 'List all chatbots' },
  { m: 'POST', p: '/v1/chatbots', d: 'Create a chatbot' },
  { m: 'GET', p: '/v1/leads', d: 'List captured leads' },
  { m: 'POST', p: '/v1/rules', d: 'Add a rule to a bot' },
  { m: 'GET', p: '/v1/conversations', d: 'Fetch conversations' },
]

const methodTone = {
  GET: 'bg-accent-500/15 text-accent-600 dark:text-accent-400',
  POST: 'bg-brand-500/15 text-brand-600 dark:text-brand-400',
}

export default function ApiReference() {
  return (
    <PublicLayout
      title="API Reference"
      description="Integrate VartaBot programmatically with a clean REST API for chatbots, rules, conversations, and leads."
    >
      <PageHero eyebrow="Developers" title="API Reference" subtitle="A clean REST API to manage chatbots, rules, conversations, and leads." />
      <section className="py-16 sm:py-20">
        <div className="container-page max-w-3xl">
          {/* auth snippet */}
          <Reveal>
            <p className="mb-2 text-sm font-semibold text-surface-700 dark:text-surface-200">Authentication</p>
            <pre className="overflow-x-auto rounded-2xl border border-surface-800 bg-surface-900 p-5 font-mono text-[13px] leading-relaxed text-surface-200">
{`curl https://api.vartabot.in/v1/chatbots \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
            </pre>
          </Reveal>

          {/* endpoints */}
          <h2 className="mb-4 mt-10 text-xl font-semibold text-surface-900 dark:text-white">Endpoints</h2>
          <div className="divide-y divide-surface-200 overflow-hidden rounded-2xl border border-surface-200 bg-white dark:divide-surface-800 dark:border-surface-800 dark:bg-surface-900">
            {endpoints.map((e, i) => (
              <Reveal key={e.p + e.m} delay={i * 40}>
                <div className="flex items-center gap-4 px-5 py-4">
                  <span className={`w-14 shrink-0 rounded-md px-2 py-1 text-center text-xs font-bold ${methodTone[e.m]}`}>{e.m}</span>
                  <code className="font-mono text-sm text-surface-800 dark:text-surface-100">{e.p}</code>
                  <span className="ml-auto hidden text-sm text-surface-500 sm:block">{e.d}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-surface-500 dark:text-surface-400">
            Need a key? <Link to="/register" className="font-semibold text-brand-600 dark:text-brand-400">Create an account →</Link>
          </p>
        </div>
      </section>
    </PublicLayout>
  )
}
