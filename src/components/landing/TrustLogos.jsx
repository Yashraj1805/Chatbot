import Reveal from './Reveal.jsx'

// Hand-drawn marks for the (fictional) customer logo wall. Monochrome via
// currentColor so the whole strip reads as one cohesive, muted logo set.
const marks = {
  BrightLabs: (
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
    </g>
  ),
  Northwind: (
    <path
      d="M12 3l8 16-8-4-8 4 8-16Z"
      fill="currentColor"
    />
  ),
  Lumen: (
    <g>
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </g>
  ),
  Stackmint: (
    <g fill="currentColor">
      <path d="M12 3l8 4.2-8 4.2-8-4.2z" />
      <path d="M4 12l8 4.2 8-4.2 v2.4l-8 4.2-8-4.2z" opacity="0.55" />
    </g>
  ),
  'Rossi Media': (
    <g>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M10 8.5l6 3.5-6 3.5z" fill="currentColor" />
    </g>
  ),
  'Patel & Co': (
    <g fill="currentColor">
      <circle cx="9" cy="12" r="5.5" opacity="0.55" />
      <circle cx="15" cy="12" r="5.5" />
    </g>
  ),
}

export default function TrustLogos({ items = [] }) {
  return (
    <div className="container-page mt-20">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-surface-400">
        Trusted by modern teams worldwide
      </p>
      <Reveal className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
        {items.map((name) => (
          <span
            key={name}
            className="flex items-center gap-2.5 text-surface-400 opacity-80 grayscale transition-all duration-300 hover:text-brand-600 hover:opacity-100 dark:text-surface-500 dark:hover:text-brand-300"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden="true">
              {marks[name]}
            </svg>
            <span className="text-lg font-bold tracking-tight">{name}</span>
          </span>
        ))}
      </Reveal>
    </div>
  )
}
