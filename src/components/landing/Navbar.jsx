import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
        scrolled || open
          ? 'border-b border-brand-300 bg-brand-200/95 shadow-sm backdrop-blur-lg dark:border-surface-800 dark:bg-surface-950/90'
          : 'border-b border-transparent'
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <Link to="/" aria-label="VartaBot home">
          <Logo markClassName="h-14 w-14" textClassName="text-xl" />
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
            className="rounded-lg p-2 text-surface-700 hover:bg-white/50 dark:text-surface-300 dark:hover:bg-surface-800"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-gradient-to-b from-brand-200/95 to-white backdrop-blur-lg dark:from-surface-950/90 dark:to-surface-950 md:hidden"
          >
            <motion.div
              className="flex flex-col gap-1 px-4 pb-5 pt-2"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } } }}
            >
              {[...links, { label: 'About', to: '/about' }].map((l) => (
                <motion.div
                  key={l.label}
                  variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-surface-700 transition-colors hover:bg-white/70 hover:text-brand-700 dark:text-surface-200 dark:hover:bg-surface-800"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                className="mt-3 flex flex-col gap-2"
              >
                <Button as={Link} to="/#pricing" variant="secondary" onClick={() => setOpen(false)}>
                  Book a demo
                </Button>
                <Button as={Link} to="/join" onClick={() => setOpen(false)}>
                  Start free
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
