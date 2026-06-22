import Reveal from './landing/Reveal.jsx'

// Consistent hero band for content pages.
export default function PageHero({ eyebrow, title, subtitle, children }) {
  return (
    <section className="relative overflow-hidden border-b border-surface-200 py-16 dark:border-surface-800 sm:py-20">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-400/15 blur-3xl dark:bg-brand-600/15" />
      <div className="container-page relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          {eyebrow && (
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-surface-900 dark:text-white sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-xl text-lg text-surface-600 dark:text-surface-300">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  )
}
