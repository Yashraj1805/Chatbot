import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Lock as LockIcon } from 'lucide-react'
import AuthLayout from '../components/layout/AuthLayout.jsx'
import Button from '../components/ui/Button.jsx'
import { Field, Input } from '../components/ui/Input.jsx'

// Separate, restricted sign-in for the platform owner (Super Admin).
export default function AdminLogin() {
  const navigate = useNavigate()
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => navigate('/welcome'), 800)
  }

  const panel = (
    <div className="relative flex flex-col justify-center px-16 text-white">
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
        <ShieldCheck className="h-3.5 w-3.5" /> Restricted access
      </span>
      <h2 className="mt-6 text-3xl font-bold leading-tight">Super Admin Console</h2>
      <p className="mt-4 max-w-sm text-brand-100">
        Manage every customer, subscription, chatbot, and agent across the entire VartaBot platform
        from one secure dashboard.
      </p>
      <ul className="mt-10 space-y-3 text-brand-50">
        {['Customer & subscription management', 'Platform-wide monitoring', 'Revenue & growth analytics', 'Branding & platform settings'].map((t) => (
          <li key={t} className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
              <ShieldCheck className="h-3.5 w-3.5" />
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <AuthLayout
      title="Super Admin sign in"
      subtitle="Restricted to VartaBot platform owners."
      panel={panel}
      footer={
        <>
          Not an admin?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
            Customer / Agent login
          </Link>
        </>
      }
    >
      <div className="mb-6 flex items-center gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
        <LockIcon className="h-4 w-4 shrink-0" />
        This area is for platform administrators only.
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Admin email" htmlFor="email">
          <Input id="email" type="email" icon={Mail} placeholder="you@vartabot.in" defaultValue="alex@vartabot.in" required />
        </Field>

        <Field label="Password" htmlFor="password">
          <div className="relative">
            <Input id="password" type={showPw ? 'text' : 'password'} icon={Lock} placeholder="••••••••" defaultValue="password" required />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
              aria-label="Toggle password visibility"
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </Field>

        <Button type="submit" className="w-full" size="lg" loading={loading}>
          {loading ? 'Signing in…' : 'Sign in to console'}
        </Button>
      </form>
    </AuthLayout>
  )
}
