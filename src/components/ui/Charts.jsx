// Lightweight, dependency-free chart primitives (SVG + CSS).
// These are presentational placeholders driven by mock data — swap for a
// real charting lib (Recharts, visx, etc.) in a later phase if needed.
import { cn } from '../../utils/cn.js'

// ------------------------------- Bar chart ---------------------------------
export function BarChart({ data, height = 200, color = '#6366f1', valueFormat = (v) => v }) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div>
      <div className="flex items-end gap-2" style={{ height }}>
        {data.map((d) => (
          <div key={d.label} className="group flex flex-1 flex-col items-center justify-end gap-2">
            <span className="text-xs font-medium text-surface-400 opacity-0 transition-opacity group-hover:opacity-100">
              {valueFormat(d.value)}
            </span>
            <div
              className="w-full rounded-t-md transition-all duration-300 hover:opacity-80"
              style={{ height: `${(d.value / max) * 100}%`, backgroundColor: color }}
              title={`${d.label}: ${valueFormat(d.value)}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        {data.map((d) => (
          <span key={d.label} className="flex-1 text-center text-xs text-surface-400">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}

// ------------------------------- Line chart --------------------------------
export function LineChart({ data, height = 200, color = '#6366f1' }) {
  const w = 600
  const h = height
  const pad = 8
  const max = Math.max(...data.map((d) => d.value), 1)
  const min = Math.min(...data.map((d) => d.value), 0)
  const range = max - min || 1
  const step = (w - pad * 2) / (data.length - 1 || 1)

  const points = data.map((d, i) => {
    const x = pad + i * step
    const y = h - pad - ((d.value - min) / range) * (h - pad * 2)
    return [x, y]
  })

  const linePath = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')
  const areaPath = `${linePath} L${points[points.length - 1][0]},${h - pad} L${points[0][0]},${h - pad} Z`

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
        <defs>
          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#lineFill)" />
        <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill={color} />
        ))}
      </svg>
      <div className="mt-2 flex justify-between">
        {data.map((d) => (
          <span key={d.label} className="text-xs text-surface-400">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}

// ------------------------------- Donut chart -------------------------------
export function DonutChart({ data, size = 180 }) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1
  const radius = 60
  const circ = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
      <svg viewBox="0 0 160 160" style={{ width: size, height: size }} className="-rotate-90">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="currentColor" strokeWidth="20" className="text-surface-100 dark:text-surface-800" />
        {data.map((d) => {
          const len = (d.value / total) * circ
          const seg = (
            <circle
              key={d.label}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={d.color}
              strokeWidth="20"
              strokeDasharray={`${len} ${circ - len}`}
              strokeDashoffset={-offset}
            />
          )
          offset += len
          return seg
        })}
      </svg>
      <ul className="space-y-2">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-2.5 text-sm">
            <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: d.color }} />
            <span className="text-surface-600 dark:text-surface-300">{d.label}</span>
            <span className="ml-auto font-semibold text-surface-900 dark:text-white">
              {Math.round((d.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ------------------------------- Sparkline ---------------------------------
export function Sparkline({ values, width = 120, height = 36, color = '#6366f1', className = '' }) {
  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const range = max - min || 1
  const step = width / (values.length - 1 || 1)
  const path = values
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${i * step},${height - ((v - min) / range) * height}`)
    .join(' ')
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={cn('overflow-visible', className)} style={{ width, height }}>
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// --------------------------- Horizontal progress ---------------------------
export function ProgressBar({ value, max = 100, color = '#6366f1', className = '' }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className={cn('h-2 overflow-hidden rounded-full bg-surface-200 dark:bg-surface-700', className)}>
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  )
}
