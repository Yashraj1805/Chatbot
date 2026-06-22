import { NavLink, Link } from 'react-router-dom'
import { Bot, X } from 'lucide-react'
import { cn } from '../../utils/cn.js'

function Brand({ portal }) {
  const PortalIcon = portal.icon
  return (
    <Link to={portal.home} className="flex items-center gap-2.5 px-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-sm">
        <Bot className="h-5 w-5" />
      </span>
      <div className="leading-tight">
        <span className="block text-base font-bold tracking-tight text-surface-900 dark:text-white">
          Varta<span className="text-brand-600 dark:text-brand-400">Bot</span>
        </span>
        <span className="flex items-center gap-1 text-[11px] font-medium text-surface-400">
          <PortalIcon className="h-3 w-3" /> {portal.name}
        </span>
      </div>
    </Link>
  )
}

export default function Sidebar({ portal, mobileOpen, onClose, footer }) {
  const links = (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
      {portal.nav.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === portal.basePath + '/chatbots'}
          onClick={onClose}
          className={({ isActive }) =>
            cn(
              'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300'
                : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-100'
            )
          }
        >
          <Icon className="h-5 w-5 shrink-0" />
          {label}
        </NavLink>
      ))}
    </nav>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-surface-200 bg-white px-4 py-5 dark:border-surface-800 dark:bg-surface-900 lg:flex">
        <div className="mb-6">
          <Brand portal={portal} />
        </div>
        {links}
        {footer && <div className="mt-4 shrink-0">{footer}</div>}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-surface-950/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col border-r border-surface-200 bg-white px-4 py-5 shadow-2xl dark:border-surface-800 dark:bg-surface-900 animate-fade-in">
            <div className="mb-6 flex items-center justify-between">
              <Brand portal={portal} />
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {links}
            {footer && <div className="mt-4 shrink-0">{footer}</div>}
          </aside>
        </div>
      )}
    </>
  )
}
