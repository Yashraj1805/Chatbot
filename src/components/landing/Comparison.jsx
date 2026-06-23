import { Check, X, Minus } from 'lucide-react'
import { comparison } from '../../data/mockData.js'
import Reveal from './Reveal.jsx'
import { LogoGlyph } from '../Logo.jsx'

function Cell({ value, highlight = false }) {
  if (value === true)
    return (
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
          highlight ? 'bg-white text-brand-600 shadow-sm' : 'bg-accent-500/15 text-accent-600 dark:text-accent-400'
        }`}
      >
        <Check className="h-4 w-4" strokeWidth={2.5} />
      </span>
    )
  if (value === 'limited')
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-400/15 text-amber-500">
        <Minus className="h-4 w-4" />
      </span>
    )
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-surface-200 text-surface-400 dark:bg-surface-800">
      <X className="h-4 w-4" />
    </span>
  )
}

export default function Comparison() {
  const rows = comparison.rows
  return (
    <section className="py-12 sm:py-16">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Why VartaBot
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-surface-900 dark:text-white sm:text-4xl">
            Everything you need, none of the bloat
          </h2>
          <p className="mt-4 text-lg text-surface-600 dark:text-surface-300">
            See how VartaBot stacks up against typical chatbot tools.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="grid grid-cols-[1fr_5.5rem_5.5rem] overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-card dark:border-surface-800 dark:bg-surface-900 sm:grid-cols-[1fr_8rem_8rem]">
            {/* Header */}
            <div className="border-b border-surface-200 px-5 py-5 dark:border-surface-800 sm:px-7">
              <span className="text-sm font-semibold text-surface-500">Capability</span>
            </div>
            <div className="relative flex flex-col items-center gap-1 rounded-t-xl bg-gradient-to-b from-brand-500 to-brand-600 px-2 py-4 text-white">
              <LogoGlyph className="h-6 w-6" />
              <span className="text-sm font-bold">VartaBot</span>
            </div>
            <div className="flex items-center justify-center border-b border-surface-200 px-2 py-5 text-center text-sm font-medium text-surface-400 dark:border-surface-800">
              Other tools
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div key={row.label} className="contents">
                <div
                  className={`flex items-center px-5 py-4 text-sm text-surface-700 dark:text-surface-200 sm:px-7 ${
                    i % 2 === 1 ? 'bg-surface-50/60 dark:bg-surface-950/30' : ''
                  }`}
                >
                  {row.label}
                </div>
                <div
                  className={`flex items-center justify-center bg-gradient-to-b from-brand-500 to-brand-600 px-2 py-4 ${
                    i === rows.length - 1 ? 'rounded-b-xl' : ''
                  }`}
                >
                  <Cell value={row.us} highlight />
                </div>
                <div
                  className={`flex items-center justify-center px-2 py-4 ${
                    i % 2 === 1 ? 'bg-surface-50/60 dark:bg-surface-950/30' : ''
                  }`}
                >
                  <Cell value={row.them} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
