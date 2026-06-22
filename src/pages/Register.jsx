import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Building2 } from 'lucide-react'
import AuthLayout from '../components/layout/AuthLayout.jsx'
import Button from '../components/ui/Button.jsx'
import Seo from '../components/Seo.jsx'
import { Field, Input } from '../components/ui/Input.jsx'
import { saveLead } from '../lib/waitlist.js'

export default function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.currentTarget)
    await saveLead({
      source: 'register',
      name: form.get('name'),
      email: form.get('email'),
      company: form.get('company'),
    })
    navigate('/welcome')
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your 14-day free trial. No credit card required."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
            Log in
          </Link>
        </>
      }
    >
      <Seo title="Start free — Create your account" description="Create your VartaBot account and start a 14-day free trial. No credit card required." noindex />
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Full name" htmlFor="name">
          <Input id="name" name="name" type="text" icon={User} placeholder="Jane Doe" required />
        </Field>

        <Field label="Work email" htmlFor="email">
          <Input id="email" name="email" type="email" icon={Mail} placeholder="you@company.com" required />
        </Field>

        <Field label="Company" htmlFor="company">
          <Input id="company" name="company" type="text" icon={Building2} placeholder="Acme Inc." />
        </Field>

        <Field label="Password" htmlFor="password" hint="Min. 8 characters">
          <Input id="password" type="password" icon={Lock} placeholder="••••••••" required />
        </Field>

        <label className="flex items-start gap-2 text-sm text-surface-600 dark:text-surface-300">
          <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-surface-300 text-brand-600 focus:ring-brand-500" required />
          <span>
            I agree to the{' '}
            <Link to="/terms" className="text-brand-600 hover:underline dark:text-brand-400">Terms</Link> and{' '}
            <Link to="/privacy" className="text-brand-600 hover:underline dark:text-brand-400">Privacy Policy</Link>.
          </span>
        </label>

        <Button type="submit" className="w-full" size="lg" loading={loading}>
          {loading ? 'Creating account…' : 'Create free account'}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-surface-200 dark:bg-surface-800" />
        <span className="text-xs uppercase tracking-wider text-surface-400">or</span>
        <div className="h-px flex-1 bg-surface-200 dark:bg-surface-800" />
      </div>

      <Button variant="secondary" className="w-full" size="lg" onClick={() => navigate('/welcome')}>
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
        </svg>
        Sign up with Google
      </Button>
    </AuthLayout>
  )
}
