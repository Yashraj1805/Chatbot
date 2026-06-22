import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout.jsx'
import Reveal from '../../components/landing/Reveal.jsx'
import { docs, docBySlug } from '../../data/docsContent.js'

export default function DocArticle() {
  const { slug } = useParams()
  const doc = docBySlug[slug]
  if (!doc) return <Navigate to="/docs" replace />

  const idx = docs.findIndex((d) => d.slug === slug)
  const next = docs[idx + 1]

  return (
    <PublicLayout title={doc.title} description={doc.excerpt}>
      <section className="py-12 sm:py-16">
        <div className="container-page grid max-w-6xl gap-10 lg:grid-cols-[16rem_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Link to="/docs" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-surface-500 hover:text-brand-600 dark:text-surface-400">
              <ArrowLeft className="h-4 w-4" /> All docs
            </Link>
            <nav className="space-y-1">
              {docs.map((d) => (
                <Link
                  key={d.slug}
                  to={`/docs/${d.slug}`}
                  className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                    d.slug === slug
                      ? 'bg-brand-50 font-semibold text-brand-700 dark:bg-brand-950/50 dark:text-brand-300'
                      : 'text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800'
                  }`}
                >
                  {d.title}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Article */}
          <article className="min-w-0">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-soft">
                  <doc.icon className="h-6 w-6" />
                </span>
                <h1 className="text-3xl font-bold tracking-tight text-surface-900 dark:text-white">{doc.title}</h1>
              </div>
              <p className="mt-3 text-lg text-surface-600 dark:text-surface-300">{doc.excerpt}</p>
            </Reveal>

            <div className="mt-8 space-y-8">
              {doc.body.map((s, i) => (
                <Reveal key={s.h} delay={i * 40}>
                  <h2 className="text-xl font-semibold text-surface-900 dark:text-white">{s.h}</h2>
                  <p className="mt-2 leading-relaxed text-surface-600 dark:text-surface-300">{s.p}</p>
                </Reveal>
              ))}
            </div>

            {next && (
              <Link
                to={`/docs/${next.slug}`}
                className="group mt-12 flex items-center justify-between gap-4 rounded-2xl border border-surface-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft dark:border-surface-800 dark:bg-surface-900 dark:hover:border-brand-700"
              >
                <span>
                  <span className="text-xs font-medium uppercase tracking-wide text-surface-400">Next</span>
                  <span className="block text-base font-semibold text-surface-900 dark:text-white">{next.title}</span>
                </span>
                <ArrowRight className="h-5 w-5 text-surface-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-500" />
              </Link>
            )}
          </article>
        </div>
      </section>
    </PublicLayout>
  )
}
