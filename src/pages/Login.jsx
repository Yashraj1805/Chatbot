import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Bot, Headset } from 'lucide-react'
import AuthLayout from '../components/layout/AuthLayout.jsx'
import Button from '../components/ui/Button.jsx'
import Seo from '../components/Seo.jsx'
import { Field, Input } from '../components/ui/Input.jsx'
import { cn } from '../utils/cn.js'

// Customer + Live Agent sign in here. Super Admin has a separate console login.
const portalOptions = [
  { id: 'customer', label: 'Customer', icon: Bot, home: '/app/dashboard' },
  { id: 'agent', label: 'Live Agent', icon: Headset, home: '/agent/dashboard' },
]

export default function Login() {
  const navigate = useNavigate()
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [portal, setPortal] = useState('customer')

  const home = portalOptions.find((p) => p.id === portal).home

  const onSubmit = (e) => {
    e.preventDefault()
    // Mock auth — no real backend. Simulate a request then enter the chosen portal.
    setLoading(true)
    setTimeout(() => navigate(home), 800)
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to manage your chatbots and leads."
      footer={
        <>
          Don’t have an account?{' '}
          <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
            Sign up free
          </Link>
        </>
      }
    >
      <Seo title="Log in" noindex />
      {/* Portal selector (demo only) */}
      <div className="mb-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-surface-400">Sign in as</p>
        <div className="grid grid-cols-2 gap-2">
          {portalOptions.map((p) => {
            const Icon = p.icon
            const active = portal === p.id
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPortal(p.id)}
                className={cn(
                  'flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all',
                  active
                    ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300'
                    : 'border-surface-200 text-surface-500 hover:border-surface-300 dark:border-surface-700 dark:hover:border-surface-600'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-semibold">{p.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Email" htmlFor="email">
          <Input id="email" type="email" icon={Mail} placeholder="you@company.com" defaultValue="harpreet@thesachdevgroup.com" required />
        </Field>

        <Field
          label="Password"
          htmlFor="password"
          hint={
            <Link to="#" className="text-brand-600 hover:underline dark:text-brand-400">
              Forgot password?
            </Link>
          }
        >
          <div className="relative">
            <Input
              id="password"
              type={showPw ? 'text' : 'password'}
              icon={Lock}
              placeholder="••••••••"
              defaultValue="password"
              required
            />
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

        <label className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-300">
          <input type="checkbox" className="h-4 w-4 rounded border-surface-300 text-brand-600 focus:ring-brand-500" defaultChecked />
          Keep me signed in
        </label>

        <Button type="submit" className="w-full" size="lg" loading={loading}>
          {loading ? 'Signing in…' : 'Log in'}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-surface-200 dark:bg-surface-800" />
        <span className="text-xs uppercase tracking-wider text-surface-400">or</span>
        <div className="h-px flex-1 bg-surface-200 dark:bg-surface-800" />
      </div>

      <Button variant="secondary" className="w-full" size="lg" onClick={() => navigate(home)}>
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
        </svg>
        Continue with Google
      </Button>

      <div className="mt-6 flex items-center justify-center gap-1.5 rounded-lg border border-surface-200 bg-surface-50 px-3 py-2.5 text-sm dark:border-surface-800 dark:bg-surface-900">
        <ShieldCheck className="h-4 w-4 text-surface-400" />
        <span className="text-surface-500 dark:text-surface-400">Platform owner?</span>
        <Link to="/admin/login" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
          Super Admin console
        </Link>
      </div>
    </AuthLayout>
  )
}
