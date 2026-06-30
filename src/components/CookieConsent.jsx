import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cookie } from 'lucide-react'
import Button from './ui/Button.jsx'
import { getConsent, setConsent } from '../lib/consent.js'

// Re-exported for convenience; the real implementation lives in lib/consent.js.
export { hasAnalyticsConsent } from '../lib/consent.js'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!getConsent()) setShow(true)
  }, [])

  const choose = (value) => {
    setConsent(value) // persists + notifies AnalyticsGate to (un)load analytics
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 animate-fade-in-up sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-sm">
      <div className="glass rounded-2xl border border-surface-200 p-4 shadow-card dark:border-surface-700">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400">
            <Cookie className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-surface-900 dark:text-white">
              We value your privacy
            </p>
            <p className="mt-1 text-sm leading-relaxed text-surface-600 dark:text-surface-300">
              We use essential cookies to run VartaBot, and optional analytics cookies to
              improve it. Read our{' '}
              <Link
                to="/cookies"
                className="font-semibold text-brand-600 hover:underline dark:text-brand-400"
              >
                Cookie Policy
              </Link>
              .
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => choose('accepted')}>
                Accept all
              </Button>
              <Button size="sm" variant="secondary" onClick={() => choose('essential')}>
                Essential only
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
