import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'

// Generic shell shared by all three portals. Pass a portal config from
// src/config/portals.js. The customer portal gets an upgrade card in the
// sidebar footer; other portals can pass their own footer or none.
export default function PortalLayout({ portal }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const footer = portal.id === 'customer' ? <UpgradeCard portal={portal} /> : null

  return (
    <div className="flex min-h-screen bg-surface-50 dark:bg-surface-950">
      <Sidebar portal={portal} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} footer={footer} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar portal={portal} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

function UpgradeCard({ portal }) {
  return (
    <div className="rounded-xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-4 dark:border-brand-900/50 dark:from-brand-950/40 dark:to-surface-900">
      <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300">
        <Sparkles className="h-4 w-4" />
        <span className="text-sm font-semibold">Growth plan</span>
      </div>
      <p className="mt-1.5 text-xs text-surface-500 dark:text-surface-400">
        You’ve used 4 of 5 chatbots. Upgrade for unlimited bots and analytics.
      </p>
      <Link
        to={`${portal.basePath}/settings`}
        className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-700"
      >
        Upgrade plan
      </Link>
    </div>
  )
}
