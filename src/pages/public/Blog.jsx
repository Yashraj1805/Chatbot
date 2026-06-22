import { Link } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout.jsx'
import PageHero from '../../components/PageHero.jsx'
import Reveal from '../../components/landing/Reveal.jsx'
import BlogCover from '../../components/BlogCover.jsx'
import { blogPosts, formatDate } from '../../data/blogPosts.js'

export default function Blog() {
  const [featured, ...rest] = blogPosts

  return (
    <PublicLayout
      title="Blog"
      description="Product updates, chatbot tips, and lead-generation playbooks from the VartaBot team."
    >
      <PageHero
        eyebrow="Blog"
        title="Ideas & playbooks"
        subtitle="Practical guides on chatbots, lead capture, and conversion."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          {/* Featured post */}
          <Reveal>
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-3xl border border-surface-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-glow dark:border-surface-800 dark:bg-surface-900 lg:grid-cols-2"
            >
              <BlogCover post={featured} className="h-56 w-full lg:h-full" iconClass="h-20 w-20" />
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
                  {featured.category} · Featured
                </span>
                <h2 className="mt-3 text-2xl font-bold leading-snug text-surface-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400 sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-surface-600 dark:text-surface-300">{featured.excerpt}</p>
                <p className="mt-5 text-sm text-surface-400">
                  {featured.author} · {formatDate(featured.date)} · {featured.read} read
                </p>
              </div>
            </Link>
          </Reveal>

          {/* Grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 50} className="h-full">
                <Link
                  to={`/blog/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-surface-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-glow dark:border-surface-800 dark:bg-surface-900"
                >
                  <BlogCover post={p} className="h-40 w-full" />
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
                      {p.category}
                    </span>
                    <h3 className="mt-2 text-base font-semibold leading-snug text-surface-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-surface-600 dark:text-surface-400">{p.excerpt}</p>
                    <span className="mt-auto pt-4 text-xs text-surface-400">
                      {formatDate(p.date)} · {p.read} read
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
