import { legalDocs } from './legalContent.js'
import PublicLayout from '../../components/layout/PublicLayout.jsx'
import PageHero from '../../components/PageHero.jsx'
import Reveal from '../../components/landing/Reveal.jsx'

export default function LegalPage({ docKey }) {
  const doc = legalDocs[docKey]
  if (!doc) return null

  return (
    <PublicLayout title={doc.title} description={doc.intro}>
      <PageHero eyebrow={doc.eyebrow} title={doc.title} subtitle={doc.intro} />
      <section className="py-16 sm:py-20">
        <div className="container-page max-w-3xl">
          <p className="mb-8 text-sm text-surface-500 dark:text-surface-400">Last updated: {doc.updated}</p>
          <div className="space-y-8">
            {/* `draft` sections (unconfirmed legal placeholders) are hidden from visitors. */}
            {doc.sections.filter((s) => !s.draft).map((s) => (
              <Reveal key={s.h}>
                <h2 className="text-xl font-semibold text-surface-900 dark:text-white">{s.h}</h2>
                <p className="mt-2 leading-relaxed text-surface-600 dark:text-surface-300">{s.p}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-12 rounded-xl border border-surface-200 bg-white p-5 text-sm text-surface-500 dark:border-surface-800 dark:bg-surface-900 dark:text-surface-400">
            Questions about this document? Email{' '}
            <a href="mailto:legal@vartabot.in" className="font-semibold text-brand-600 dark:text-brand-400">
              legal@vartabot.in
            </a>
            .
          </p>
        </div>
      </section>
    </PublicLayout>
  )
}
