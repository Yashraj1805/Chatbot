import { useState } from 'react'
import { Search, GripVertical } from 'lucide-react'
import { flowCategories, flowCatalog, categoryAccent } from '../../data/flowNodes.js'
import { cn } from '../../utils/cn.js'

// Draggable node palette. Drag an item onto the canvas to create that node.
export default function NodePalette({ onAdd }) {
  const [query, setQuery] = useState('')

  const onDragStart = (e, kind) => {
    e.dataTransfer.setData('application/reactflow', kind)
    e.dataTransfer.effectAllowed = 'move'
  }

  const q = query.toLowerCase()

  return (
    <aside className="flex w-72 shrink-0 flex-col border-r border-surface-200 bg-white dark:border-surface-800 dark:bg-surface-900">
      <div className="border-b border-surface-200 p-3 dark:border-surface-800">
        <p className="px-1 pb-2 text-xs font-semibold uppercase tracking-wider text-surface-400">
          Blocks
        </p>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search blocks…"
            className="h-9 w-full rounded-lg border border-surface-200 bg-surface-50 pl-9 pr-3 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-surface-700 dark:bg-surface-800 dark:text-white"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {flowCategories.map((cat) => {
          const types = cat.types.filter((t) => {
            const def = flowCatalog[t]
            return def.label.toLowerCase().includes(q) || def.sub.toLowerCase().includes(q)
          })
          if (types.length === 0) return null
          const accent = categoryAccent[cat.name]
          return (
            <div key={cat.name} className="mb-5">
              <p className="mb-2 flex items-center gap-1.5 px-1 text-xs font-semibold uppercase tracking-wider text-surface-400">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                {cat.name}
              </p>
              <div className="space-y-1.5">
                {types.map((t) => {
                  const def = flowCatalog[t]
                  const Icon = def.icon
                  return (
                    <div
                      key={t}
                      role="button"
                      tabIndex={0}
                      draggable
                      onDragStart={(e) => onDragStart(e, t)}
                      onClick={() => onAdd?.(t)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          onAdd?.(t)
                        }
                      }}
                      title="Click to add, or drag onto the canvas"
                      className="group flex cursor-grab items-center gap-2.5 rounded-lg border border-surface-200 bg-white p-2.5 transition-colors hover:border-brand-300 hover:bg-surface-50 active:cursor-grabbing dark:border-surface-700 dark:bg-surface-800/50 dark:hover:border-brand-600"
                    >
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white"
                        style={{ backgroundColor: accent }}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-1.5 text-sm font-medium text-surface-900 dark:text-white">
                          {def.label}
                          {def.beta && (
                            <span className="rounded bg-violet-100 px-1 text-[9px] font-bold uppercase text-violet-600 dark:bg-violet-950/60 dark:text-violet-300">
                              Beta
                            </span>
                          )}
                        </p>
                        <p className="truncate text-xs text-surface-500">{def.sub}</p>
                      </div>
                      <GripVertical className="h-4 w-4 shrink-0 text-surface-300 group-hover:text-surface-400" />
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="border-t border-surface-200 p-3 text-center text-xs text-surface-400 dark:border-surface-800">
        Click a block to add — or drag it onto the canvas
      </div>
    </aside>
  )
}
