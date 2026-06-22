import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout.jsx'
import Reveal from '../../components/landing/Reveal.jsx'
import Button from '../../components/ui/Button.jsx'
import BlogCover from '../../components/BlogCover.jsx'
import { blogPosts, postBySlug, formatDate } from '../../data/blogPosts.js'

export default function BlogPost() {
  const { slug } = useParams()
  const post = postBySlug[slug]
  if (!post) return <Navigate to="/blog" replace />

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <PublicLayout title={post.title} description={post.excerpt}>
      <article className="py-12 sm:py-16">
        <div className="container-page max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-surface-500 hover:text-brand-600 dark:text-surface-400">
            <ArrowLeft className="h-4 w-4" /> All posts
          </Link>

          <Reveal>
            <span className="mt-6 block text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
              {post.category}
            </span>
            <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-surface-900 dark:text-white sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-3 text-sm text-surface-400">
              By {post.author} · {formatDate(post.date)} · {post.read} read
            </p>
          </Reveal>

          <Reveal delay={60}>
            <BlogCover post={post} className="mt-8 aspect-[16/9] w-full rounded-2xl" iconClass="h-24 w-24" />
          </Reveal>

          <div className="mt-10 space-y-8">
            <p className="text-lg leading-relaxed text-surface-700 dark:text-surface-200">{post.excerpt}</p>
            {post.body.map((s, i) => (
              <Reveal key={s.h} delay={i * 30}>
                <h2 className="text-xl font-semibold text-surface-900 dark:text-white">{s.h}</h2>
                <p className="mt-2 leading-relaxed text-surface-600 dark:text-surface-300">{s.p}</p>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl border border-surface-200 bg-gradient-to-br from-brand-50 to-accent-50/50 p-7 text-center dark:border-surface-800 dark:from-brand-950/40 dark:to-accent-950/20">
            <h3 className="text-lg font-bold text-surface-900 dark:text-white">Put this into practice</h3>
            <p className="mt-1 text-sm text-surface-600 dark:text-surface-400">
              Build a lead-capturing chatbot in minutes — free for 14 days.
            </p>
            <Button as={Link} to="/register" className="mt-4">Start building free</Button>
          </div>
        </div>

        {/* Related */}
        <div className="container-page mt-16 max-w-5xl">
          <h2 className="mb-6 text-xl font-bold text-surface-900 dark:text-white">More from the blog</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 50} className="h-full">
                <Link to={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-surface-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-glow dark:border-surface-800 dark:bg-surface-900">
                  <BlogCover post={p} className="h-32 w-full" iconClass="h-12 w-12" />
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-sm font-semibold leading-snug text-surface-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">{p.title}</h3>
                    <span className="mt-auto pt-3 text-xs text-surface-400">{p.read} read</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </article>
    </PublicLayout>
  )
}
