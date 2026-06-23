import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, ArrowRight, Sparkles, Home } from 'lucide-react'
import Logo from '../components/Logo.jsx'
import Button from '../components/ui/Button.jsx'
import Seo from '../components/Seo.jsx'
import { Input } from '../components/ui/Input.jsx'
import { saveLead } from '../lib/waitlist.js'

// Single, simple entry point for the pilot: drop your email to join. On submit
// we save the lead and send the visitor to the thank-you / coming-soon page.
export default function PilotSignup() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.currentTarget)
    await saveLead({ source: 'pilot', email: form.get('email') })
    navigate('/welcome')
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-surface-50 px-4 py-16 text-center dark:bg-surface-950">
      <Seo title="Become a pilot customer" noindex />

      {/* Ambient brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl"
      />

      <div className="relative w-full max-w-md">
        <Logo className="justify-center" markClassName="h-16 w-16 drop-shadow-sm" textClassName="text-3xl" />

        <span className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:border-brand-900/60 dark:bg-brand-950/40 dark:text-brand-300">
          <Sparkles className="h-3.5 w-3.5" /> Pilot program
        </span>

        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-surface-900 dark:text-white sm:text-4xl">
          Become a pilot customer
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-surface-500 dark:text-surface-400">
          Write your email to join VartaBot as one of our early pilot customers.
          We’ll reach out as soon as your access is ready.
        </p>

        <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:flex-row">
          <Input
            id="email"
            name="email"
            type="email"
            icon={Mail}
            placeholder="you@company.com"
            required
            className="h-12 flex-1"
            autoFocus
          />
          <Button type="submit" size="lg" loading={loading} className="h-12 shrink-0">
            {loading ? 'Submitting…' : (<>Join the pilot <ArrowRight className="h-4 w-4" /></>)}
          </Button>
        </form>

        <p className="mt-4 text-xs text-surface-400 dark:text-surface-500">
          No spam. We’ll only email you about your pilot access.
        </p>

        <div className="mt-10">
          <Button as={Link} to="/" variant="ghost" size="sm">
            <Home className="h-4 w-4" /> Back to home
          </Button>
        </div>
      </div>
    </div>
  )
}
