import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Button from '../ui/Button.jsx'
import Logo from '../Logo.jsx'
import { cn } from '../../utils/cn.js'

const links = [
  { label: 'Features', to: '/features' },
  { label: 'How it works', to: '/#how' },
  { label: 'Integrations', to: '/#integrations' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'FAQ', to: '/#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled
          ? 'border-b border-surface-200 bg-white/80 backdrop-blur-lg dark:border-surface-800 dark:bg-surface-950/80'
          : 'border-b border-transparent'
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <Link to="/" aria-label="VartaBot home">
          <Logo markClassName="h-10 w-10" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm font-medium text-surface-600 transition-colors hover:text-surface-900 dark:text-surface-300 dark:hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/about"
            className="text-sm font-medium text-surface-600 transition-colors hover:text-surface-900 dark:text-surface-300 dark:hover:text-white"
          >
            About
          </Link>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button as={Link} to="/#pricing" variant="secondary" size="sm">
            Book a demo
          </Button>
          <Button as={Link} to="/join" size="sm">
            Start free
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-lg p-2 text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-surface-200 bg-white px-4 py-4 dark:border-surface-800 dark:bg-surface-950 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
            >
              About
            </Link>
            <div className="mt-2 flex flex-col gap-2">
              <Button as={Link} to="/#pricing" variant="secondary" onClick={() => setOpen(false)}>
                Book a demo
              </Button>
              <Button as={Link} to="/join" onClick={() => setOpen(false)}>
                Start free
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
