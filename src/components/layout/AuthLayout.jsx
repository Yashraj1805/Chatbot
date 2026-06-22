import { Link } from 'react-router-dom'
import { Bot, Check } from 'lucide-react'
import ThemeToggle from './ThemeToggle.jsx'

// Two-pane auth shell: form on the left, branded marketing panel on the right.
export default function AuthLayout({ title, subtitle, children, footer, panel }) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-surface-950">
      {/* Form pane */}
      <div className="flex w-full flex-col px-6 py-8 sm:px-12 lg:w-1/2">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white">
              <Bot className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold tracking-tight text-surface-900 dark:text-white">
              Varta<span className="text-brand-600 dark:text-brand-400">Bot</span>
            </span>
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl font-bold tracking-tight text-surface-900 dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">{subtitle}</p>
            )}
            <div className="mt-8">{children}</div>
            {footer && (
              <p className="mt-8 text-center text-sm text-surface-500 dark:text-surface-400">
                {footer}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Marketing pane */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-600 to-brand-900 lg:flex lg:w-1/2">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        {panel || (
        <div className="relative flex flex-col justify-center px-16 text-white">
          <blockquote className="text-2xl font-semibold leading-snug">
            “VartaBot let our marketing team launch a lead-capturing chatbot in an afternoon — no
            developers, no tickets, no waiting.”
          </blockquote>
          <div className="mt-6">
            <p className="font-semibold">Olivia Bennett</p>
            <p className="text-sm text-brand-200">Head of Growth, BrightLabs</p>
          </div>

          <ul className="mt-12 space-y-3">
            {[
              'No-code visual rule builder',
              'One-line website install',
              'Automatic lead capture',
              'Beautiful branded widget',
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-brand-50">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        )}
      </div>
    </div>
  )
}
