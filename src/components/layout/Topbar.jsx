import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, Search, Bell, ChevronDown, LogOut, User, Settings } from 'lucide-react'
import Avatar from '../ui/Avatar.jsx'
import ThemeToggle from './ThemeToggle.jsx'

export default function Topbar({ portal, onMenuClick }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const user = portal.user
  const loginPath = portal.id === 'admin' ? '/admin/login' : '/login'

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-surface-200 bg-white/80 px-4 backdrop-blur-md dark:border-surface-800 dark:bg-surface-900/80 sm:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="relative hidden max-w-sm flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
        <input
          type="search"
          placeholder="Search…"
          className="h-10 w-full rounded-lg border border-surface-200 bg-surface-50 pl-9 pr-3 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-surface-700 dark:bg-surface-800 dark:text-white"
        />
      </div>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <ThemeToggle />

        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-surface-500 transition-colors hover:bg-surface-100 hover:text-surface-700 dark:text-surface-400 dark:hover:bg-surface-800"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-white dark:ring-surface-900" />
        </button>

        {/* Profile menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-lg p-1 pr-2 transition-colors hover:bg-surface-100 dark:hover:bg-surface-800"
          >
            <Avatar name={user.name} size="sm" />
            <span className="hidden text-sm font-medium text-surface-700 dark:text-surface-200 md:block">
              {user.name.split(' ')[0]}
            </span>
            <ChevronDown className="hidden h-4 w-4 text-surface-400 md:block" />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 z-20 mt-2 w-56 animate-scale-in rounded-xl border border-surface-200 bg-white p-1.5 shadow-soft dark:border-surface-800 dark:bg-surface-900">
                <div className="border-b border-surface-100 px-3 py-2 dark:border-surface-800">
                  <p className="text-sm font-semibold text-surface-900 dark:text-white">{user.name}</p>
                  <p className="truncate text-xs text-surface-500">{user.email}</p>
                  <p className="mt-0.5 text-xs font-medium text-brand-600 dark:text-brand-400">{user.role}</p>
                </div>
                <Link
                  to={`${portal.basePath}/settings`}
                  onClick={() => setMenuOpen(false)}
                  className="mt-1 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
                >
                  <User className="h-4 w-4" /> Profile
                </Link>
                <Link
                  to={`${portal.basePath}/settings`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
                >
                  <Settings className="h-4 w-4" /> Settings
                </Link>
                <button
                  onClick={() => navigate(loginPath)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
