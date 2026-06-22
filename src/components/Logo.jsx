import { cn } from '../utils/cn.js'

// Brand mark for "VartaBot" — a glossy app-icon style tile: vibrant teal→mint
// gradient with a top highlight, an inset rim light, and a soft-shadowed white
// speech bubble holding a spark (conversation + intelligence). Crisp from a
// 16px favicon up to hero size.
export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-label="VartaBot"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="vartaBase" x1="3" y1="2" x2="37" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#16d6c4" />
          <stop offset="0.5" stopColor="#10b8a6" />
          <stop offset="1" stopColor="#0e8f6f" />
        </linearGradient>
        <radialGradient id="vartaGloss" cx="0.32" cy="0.18" r="0.85">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="0.55" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="vartaShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0.8" stdDeviation="0.9" floodColor="#003b37" floodOpacity="0.45" />
        </filter>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#vartaBase)" />
      <rect width="40" height="40" rx="11" fill="url(#vartaGloss)" />
      <rect x="0.6" y="0.6" width="38.8" height="38.8" rx="10.6" fill="none" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="0.8" />
      <g filter="url(#vartaShadow)">
        <path
          d="M11 10.5h18a4.5 4.5 0 0 1 4.5 4.5v7a4.5 4.5 0 0 1-4.5 4.5h-9.5l-5.6 4.3a1 1 0 0 1-1.6-.8V26.5H11A4.5 4.5 0 0 1 6.5 22v-7A4.5 4.5 0 0 1 11 10.5Z"
          fill="#ffffff"
        />
      </g>
      <path
        d="M20 14.2c.5 3.4 1.1 4 4.5 4.5-3.4.5-4 1.1-4.5 4.5-.5-3.4-1.1-4-4.5-4.5 3.4-.5 4-1.1 4.5-4.5Z"
        fill="url(#vartaBase)"
      />
    </svg>
  )
}

// Monochrome glyph (no tile) — the speech bubble with the spark knocked out,
// in `currentColor`. Drop it on any coloured surface (e.g. the widget header).
export function LogoGlyph({ className = 'h-5 w-5' }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-label="VartaBot"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M11 10.5h18a4.5 4.5 0 0 1 4.5 4.5v7a4.5 4.5 0 0 1-4.5 4.5h-9.5l-5.6 4.3a1 1 0 0 1-1.6-.8V26.5H11A4.5 4.5 0 0 1 6.5 22v-7A4.5 4.5 0 0 1 11 10.5ZM20 14.2c.5 3.4 1.1 4 4.5 4.5-3.4.5-4 1.1-4.5 4.5-.5-3.4-1.1-4-4.5-4.5 3.4-.5 4-1.1 4.5-4.5Z"
      />
    </svg>
  )
}

export default function Logo({
  className = '',
  markClassName = 'h-9 w-9 drop-shadow-sm',
  textClassName = 'text-lg',
  showWordmark = true,
}) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark className={markClassName} />
      {showWordmark && (
        <span className={cn('font-bold tracking-tight text-surface-900 dark:text-white', textClassName)}>
          Varta<span className="text-brand-600 dark:text-brand-400">Bot</span>
        </span>
      )}
    </span>
  )
}
