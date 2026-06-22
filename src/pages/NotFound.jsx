import { Link } from 'react-router-dom'
import { Bot, Home } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import Seo from '../components/Seo.jsx'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-50 px-4 text-center dark:bg-surface-950">
      <Seo title="Page not found" noindex />
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-glow">
        <Bot className="h-8 w-8" />
      </span>
      <p className="mt-8 text-7xl font-extrabold tracking-tight text-surface-900 dark:text-white">404</p>
      <h1 className="mt-2 text-xl font-semibold text-surface-800 dark:text-surface-100">
        This page wandered off
      </h1>
      <p className="mt-2 max-w-sm text-sm text-surface-500 dark:text-surface-400">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <div className="mt-6 flex gap-3">
        <Button as={Link} to="/">
          <Home className="h-4 w-4" /> Back home
        </Button>
        <Button as={Link} to="/app/dashboard" variant="secondary">
          Go to dashboard
        </Button>
      </div>
    </div>
  )
}
