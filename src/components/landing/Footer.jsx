import { Link } from 'react-router-dom'
import { Twitter, Github, Linkedin } from 'lucide-react'
import Logo from '../Logo.jsx'

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', to: '/features' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Integrations', to: '/#integrations' },
      { label: 'Roadmap', to: '/roadmap' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Blog', to: '/blog' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', to: '/docs' },
      { label: 'Help Center', to: '/help' },
      { label: 'Community', to: '/community' },
      { label: 'API Reference', to: '/api' },
      { label: 'Status', to: '/status' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
      { label: 'Security', to: '/security' },
      { label: 'GDPR', to: '/gdpr' },
      { label: 'Cookies', to: '/cookies' },
    ],
  },
]

const socials = [
  { Icon: Twitter, href: 'https://twitter.com/vartabot', label: 'VartaBot on X' },
  { Icon: Github, href: 'https://github.com/vartabot', label: 'VartaBot on GitHub' },
  { Icon: Linkedin, href: 'https://linkedin.com/company/vartabot', label: 'VartaBot on LinkedIn' },
]

const linkCls =
  'text-sm text-surface-500 transition-colors hover:text-brand-600 dark:text-surface-400 dark:hover:text-brand-400'

export default function Footer() {
  return (
    <footer className="border-t border-surface-200 bg-surface-50 dark:border-surface-800 dark:bg-surface-950">
      <div className="container-page py-14">
        {/* Newsletter */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h4 className="text-lg font-bold text-surface-900 dark:text-white">
              Get product updates &amp; chatbot tips
            </h4>
            <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
              Join 8,000+ marketers. One short email a week, no spam.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-sm items-center gap-2 sm:w-auto"
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="h-11 flex-1 rounded-lg border border-surface-300 bg-white px-3.5 text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 dark:border-surface-700 dark:bg-surface-800 dark:text-white sm:w-56"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="grid gap-10 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link to="/" aria-label="VartaBot home">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-surface-500 dark:text-surface-400">
              The no-code platform for building rule-based chatbots that convert visitors into
              customers.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-200 text-surface-500 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-surface-800 dark:hover:border-brand-600"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-surface-900 dark:text-white">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className={linkCls}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-surface-200 pt-6 dark:border-surface-800 sm:flex-row">
          <p className="text-sm text-surface-500 dark:text-surface-400">
            © 2026 VartaBot, Inc. All rights reserved.
          </p>
          <p className="text-sm text-surface-500 dark:text-surface-400">
            Made for teams who hate writing code.
          </p>
        </div>
      </div>
    </footer>
  )
}
