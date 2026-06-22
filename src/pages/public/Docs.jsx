import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout.jsx'
import PageHero from '../../components/PageHero.jsx'
import Reveal from '../../components/landing/Reveal.jsx'
import { docCategories, docs } from '../../data/docsContent.js'

export default function Docs() {
  return (
    <PublicLayout
      title="Documentation"
      description="Guides and documentation to build, ship, and scale your VartaBot chatbots."
    >
      <PageHero
        eyebrow="Documentation"
        title="Docs & guides"
        subtitle="Everything you need to build, ship, and scale your chatbots."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page max-w-5xl space-y-14">
          {docCategories.map((cat) => {
            const items = docs.filter((d) => d.cat === cat.id)
            if (!items.length) return null
            return (
              <div key={cat.id}>
                <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {cat.label}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((d, i) => (
                    <Reveal key={d.slug} delay={i * 40} className="h-full">
                      <Link
                        to={`/docs/${d.slug}`}
                        className="group flex h-full flex-col rounded-2xl border border-surface-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-glow dark:border-surface-800 dark:bg-surface-900 dark:hover:border-brand-700"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-soft">
                          <d.icon className="h-5 w-5" />
                        </span>
                        <h3 className="mt-4 text-base font-semibold text-surface-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                          {d.title}
                        </h3>
                        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-surface-600 dark:text-surface-400">
                          {d.excerpt}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400">
                          Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </PublicLayout>
  )
}
