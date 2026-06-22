import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout.jsx'
import PageHero from '../../components/PageHero.jsx'
import Reveal from '../../components/landing/Reveal.jsx'
import { docs } from '../../data/docsContent.js'

const popular = [
  { q: 'How do I install the chatbot on my site?', slug: 'install-widget' },
  { q: 'How does lead capture work?', slug: 'lead-capture' },
  { q: 'Can I change the widget colors?', slug: 'customize-widget' },
  { q: 'How do I hand off to a live agent?', slug: 'live-agent-handoff' },
  { q: 'How do I export my leads?', slug: 'export-leads' },
  { q: 'How do I cancel or change my plan?', slug: 'billing-plans' },
]

export default function Help() {
  const [q, setQ] = useState('')
  const query = q.trim().toLowerCase()
  const results = query
    ? docs.filter((d) => `${d.title} ${d.excerpt} ${d.cat}`.toLowerCase().includes(query))
    : []

  return (
    <PublicLayout
      title="Help Center"
      description="Answers and how-tos for using VartaBot — setup, billing, flows, lead capture, and more."
    >
      <PageHero eyebrow="Help Center" title="How can we help?" subtitle="Search our guides or browse popular questions.">
        <div className="relative mx-auto max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search help articles…"
            className="h-12 w-full rounded-full border border-surface-300 bg-white pl-11 pr-4 text-sm text-surface-900 shadow-sm placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 dark:border-surface-700 dark:bg-surface-900 dark:text-white"
          />
        </div>
      </PageHero>

      <section className="py-16 sm:py-20">
        <div className="container-page max-w-3xl">
          {query ? (
            /* Live search results */
            <>
              <p className="mb-4 text-sm font-medium text-surface-500 dark:text-surface-400">
                {results.length} result{results.length === 1 ? '' : 's'} for “{q}”
              </p>
              {results.length > 0 ? (
                <div className="space-y-3">
                  {results.map((d) => (
                    <Link
                      key={d.slug}
                      to={`/docs/${d.slug}`}
                      className="group flex items-start gap-4 rounded-xl border border-surface-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft dark:border-surface-800 dark:bg-surface-900 dark:hover:border-brand-700"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-soft">
                        <d.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-surface-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                          {d.title}
                        </p>
                        <p className="mt-0.5 text-sm text-surface-500 dark:text-surface-400">{d.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-surface-200 bg-white p-8 text-center dark:border-surface-800 dark:bg-surface-900">
                  <p className="text-sm text-surface-600 dark:text-surface-300">
                    No articles matched “{q}”.
                  </p>
                  <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">
                    Try a different term, or{' '}
                    <Link to="/contact" className="font-semibold text-brand-600 dark:text-brand-400">contact support →</Link>
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Default — popular questions */
            <>
              <h2 className="mb-4 text-xl font-semibold text-surface-900 dark:text-white">Popular questions</h2>
              <div className="divide-y divide-surface-200 overflow-hidden rounded-2xl border border-surface-200 bg-white dark:divide-surface-800 dark:border-surface-800 dark:bg-surface-900">
                {popular.map((item, i) => (
                  <Reveal key={item.slug} delay={i * 30}>
                    <Link
                      to={`/docs/${item.slug}`}
                      className="flex items-center justify-between px-5 py-4 text-sm font-medium text-surface-700 transition-colors hover:bg-surface-50 hover:text-brand-600 dark:text-surface-200 dark:hover:bg-surface-950/40 dark:hover:text-brand-400"
                    >
                      {item.q}
                      <span className="text-surface-300">→</span>
                    </Link>
                  </Reveal>
                ))}
              </div>
              <p className="mt-8 text-center text-sm text-surface-500 dark:text-surface-400">
                Can’t find an answer?{' '}
                <Link to="/contact" className="font-semibold text-brand-600 dark:text-brand-400">Contact support →</Link>
              </p>
            </>
          )}
        </div>
      </section>
    </PublicLayout>
  )
}
