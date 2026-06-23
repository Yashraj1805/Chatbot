import { Link } from 'react-router-dom'
import { Home, Sparkles, Rocket, Mail } from 'lucide-react'
import Logo from '../components/Logo.jsx'
import Button from '../components/ui/Button.jsx'
import Seo from '../components/Seo.jsx'

// Thank-you page shown after a visitor submits their email to join the pilot.
// The full product is not live yet, so this confirms their spot + sets
// expectations.
export default function ComingSoon() {
  const upcoming = [
    'Build & manage no-code chatbots',
    'Capture and track your leads',
    'Live agent inbox & handoff',
    'Analytics, rules & flow builder',
  ]

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-surface-50 px-4 py-16 text-center dark:bg-surface-950">
      <Seo title="You're in — Coming soon" noindex />

      {/* Ambient brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl"
      />

      <div className="relative w-full max-w-lg">
        <Logo className="justify-center" markClassName="h-16 w-16 drop-shadow-sm" textClassName="text-3xl" />

        <span className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:border-brand-900/60 dark:bg-brand-950/40 dark:text-brand-300">
          <Sparkles className="h-3.5 w-3.5" /> Pilot access
        </span>

        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-surface-900 dark:text-white sm:text-4xl">
          You’re in! 🎉
        </h1>

        <p className="mt-3 text-base font-medium text-surface-700 dark:text-surface-200">
          Thank you for being one of our pilot customers.
        </p>

        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-surface-500 dark:text-surface-400">
          We’re putting the finishing touches on your dashboard. Your account is
          ready and your spot is secured — the full VartaBot experience is{' '}
          <span className="font-semibold text-surface-700 dark:text-surface-200">coming soon</span>.
          We’ll email you the moment it goes live.
        </p>

        {/* What's coming */}
        <ul className="mx-auto mt-8 grid max-w-md gap-2 text-left sm:grid-cols-2">
          {upcoming.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 rounded-xl border border-surface-200 bg-white px-3.5 py-2.5 text-sm text-surface-600 dark:border-surface-800 dark:bg-surface-900 dark:text-surface-300"
            >
              <Rocket className="h-4 w-4 shrink-0 text-brand-500" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex items-center justify-center">
          <Button as={Link} to="/">
            <Home className="h-4 w-4" /> Back to home
          </Button>
        </div>

        <p className="mt-8 flex items-center justify-center gap-1.5 text-xs text-surface-400 dark:text-surface-500">
          <Mail className="h-3.5 w-3.5" />
          Questions? Reach us at{' '}
          <a href="mailto:hello@vartabot.in" className="font-medium text-brand-600 hover:underline dark:text-brand-400">
            hello@vartabot.in
          </a>
        </p>
      </div>
    </div>
  )
}
