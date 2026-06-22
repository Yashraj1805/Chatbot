import { X, Trash2, Copy } from 'lucide-react'
import { flowCatalog, categoryAccent } from '../../data/flowNodes.js'
import Button from '../ui/Button.jsx'
import NodeFields from './NodeFields.jsx'

// Context-aware editor for the selected canvas node.
export default function NodeProperties({ node, onChange, onDelete, onDuplicate, onClose }) {
  if (!node) return null
  const def = flowCatalog[node.data.kind]
  if (!def) return null
  const Icon = def.icon
  const accent = categoryAccent[def.category]

  const update = (key, value) => onChange(node.id, { ...node.data, [key]: value })

  return (
    <aside className="flex w-80 shrink-0 flex-col border-l border-surface-200 bg-white dark:border-surface-800 dark:bg-surface-900">
      <div className="flex items-center justify-between border-b border-surface-200 p-4 dark:border-surface-800">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg text-white" style={{ backgroundColor: accent }}>
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-surface-900 dark:text-white">{def.label}</p>
            <p className="text-xs text-surface-500">{def.category}</p>
          </div>
        </div>
        <button onClick={onClose} className="rounded-lg p-1.5 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <p className="text-sm text-surface-500 dark:text-surface-400">{def.sub}</p>
        <NodeFields fields={def.fields} data={node.data} onChange={update} />
      </div>

      <div className="flex gap-2 border-t border-surface-200 p-4 dark:border-surface-800">
        <Button variant="secondary" size="sm" className="flex-1" onClick={() => onDuplicate(node.id)}>
          <Copy className="h-4 w-4" /> Duplicate
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 text-red-600" onClick={() => onDelete(node.id)}>
          <Trash2 className="h-4 w-4" /> Delete
        </Button>
      </div>
    </aside>
  )
}
