import { useState } from 'react'
import { Search, Sparkles, Link2 } from 'lucide-react'
import Modal from '../ui/Modal.jsx'
import { flowCategories, flowCatalog, categoryAccent } from '../../data/flowNodes.js'
import { cn } from '../../utils/cn.js'

// Popup that suggests what to add next. Two modes:
//   • New block   → create a fresh module (always available)
//   • Existing    → connect to a block already in the flow (canvas only —
//                   provide `existing` + `onSelectExisting`)
export default function NodePicker({ onSelect, onClose, existing, onSelectExisting }) {
  const canReuse = typeof onSelectExisting === 'function'
  const [tab, setTab] = useState('new')
  const [query, setQuery] = useState('')
  const q = query.toLowerCase()

  return (
    <Modal open onClose={onClose} size="lg" title="Add next block" description="Pick what happens next — it’ll be connected automatically.">
      <div className="space-y-4">
        {/* New vs Existing */}
        {canReuse && (
          <div className="flex gap-1 rounded-lg border border-surface-200 p-0.5 dark:border-surface-700">
            <TabButton active={tab === 'new'} onClick={() => setTab('new')} icon={Sparkles} label="New block" />
            <TabButton active={tab === 'existing'} onClick={() => setTab('existing')} icon={Link2} label={`Existing block${existing?.length ? ` (${existing.length})` : ''}`} />
          </div>
        )}

        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tab === 'existing' ? 'Search existing blocks…' : 'Search blocks…'}
            className="h-10 w-full rounded-lg border border-surface-200 bg-surface-50 pl-9 pr-3 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-surface-700 dark:bg-surface-800 dark:text-white"
          />
        </div>

        {/* -------- New block: all module types -------- */}
        {tab === 'new' && (
          <div className="-mr-1 max-h-[24rem] space-y-5 overflow-y-auto pr-1">
            {flowCategories.map((cat) => {
              const types = cat.types.filter((t) => {
                const d = flowCatalog[t]
                return d.label.toLowerCase().includes(q) || d.sub.toLowerCase().includes(q)
              })
              if (types.length === 0) return null
              const accent = categoryAccent[cat.name]
              return (
                <div key={cat.name}>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-surface-400">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                    {cat.name}
                  </p>
                  <div className="grid gap-1.5 sm:grid-cols-2">
                    {types.map((t) => {
                      const d = flowCatalog[t]
                      const Icon = d.icon
                      return (
                        <button key={t} onClick={() => onSelect(t)} className="flex items-center gap-2.5 rounded-lg border border-surface-200 p-2.5 text-left transition-colors hover:border-brand-300 hover:bg-surface-50 dark:border-surface-700 dark:hover:border-brand-600 dark:hover:bg-surface-800">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white" style={{ backgroundColor: accent }}>
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0">
                            <p className="flex items-center gap-1.5 truncate text-sm font-medium text-surface-900 dark:text-white">
                              {d.label}
                              {d.beta && (
                                <span className="rounded bg-violet-100 px-1 text-[9px] font-bold uppercase text-violet-600 dark:bg-violet-950/60 dark:text-violet-300">Beta</span>
                              )}
                            </p>
                            <p className="truncate text-xs text-surface-500">{d.sub}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* -------- Existing block: connect to a node already in the flow -------- */}
        {tab === 'existing' && (
          <div className="-mr-1 max-h-[24rem] space-y-1.5 overflow-y-auto pr-1">
            {(() => {
              const list = (existing || []).filter((n) => n.label.toLowerCase().includes(q) || (n.summary || '').toLowerCase().includes(q))
              if (list.length === 0) {
                return (
                  <div className="rounded-xl border border-dashed border-surface-300 py-10 text-center text-sm text-surface-400 dark:border-surface-700">
                    No existing blocks to connect to.
                  </div>
                )
              }
              return list.map((n) => {
                const d = flowCatalog[n.kind]
                const Icon = d?.icon
                const accent = categoryAccent[d?.category] || '#6366f1'
                return (
                  <button
                    key={n.id}
                    onClick={() => onSelectExisting(n.id)}
                    className="flex w-full items-center gap-2.5 rounded-lg border border-surface-200 p-2.5 text-left transition-colors hover:border-brand-300 hover:bg-surface-50 dark:border-surface-700 dark:hover:border-brand-600 dark:hover:bg-surface-800"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white" style={{ backgroundColor: accent }}>
                      {Icon && <Icon className="h-4 w-4" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-surface-900 dark:text-white">{n.label}</p>
                      <p className="truncate text-xs text-surface-500">{n.summary}</p>
                    </div>
                    <Link2 className="h-4 w-4 shrink-0 text-surface-400" />
                  </button>
                )
              })
            })()}
          </div>
        )}
      </div>
    </Modal>
  )
}

function TabButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
        active ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300' : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
      )}
    >
      <Icon className="h-4 w-4" /> {label}
    </button>
  )
}
