import { useContext } from 'react'
import { Handle, Position } from '@xyflow/react'
import { Play, Pencil, Trash2, Plus } from 'lucide-react'
import { flowCatalog, categoryAccent, nodeSummary } from '../../data/flowNodes.js'
import { FlowActionsContext } from './flowContext.js'
import { cn } from '../../utils/cn.js'

const handleClass =
  '!h-3 !w-3 !rounded-full !border-2 !border-white !bg-brand-500 dark:!border-surface-900'

// "+" button next to a node's output — opens the block picker and connects the
// chosen block to this node automatically.
function AddNextButton({ id, sourceHandle }) {
  const actions = useContext(FlowActionsContext)
  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        actions?.openAddMenu(id, sourceHandle)
      }}
      title="Add next block"
      className="nodrag absolute -right-9 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-brand-300 bg-white text-brand-600 opacity-0 shadow-sm transition-all hover:scale-110 hover:bg-brand-50 group-hover:opacity-100 dark:border-brand-700 dark:bg-surface-800 dark:hover:bg-surface-700"
    >
      <Plus className="h-4 w-4" />
    </button>
  )
}

// --------------------------- Start node ---------------------------
export function StartNode({ id }) {
  return (
    <div className="group relative flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
      <Play className="h-4 w-4 fill-current" />
      Conversation starts
      <Handle type="source" position={Position.Right} className={handleClass} />
      <AddNextButton id={id} />
    </div>
  )
}

function NodeToolbar({ id, selected }) {
  const actions = useContext(FlowActionsContext)
  return (
    <div
      className={cn(
        'nodrag absolute -top-9 right-0 z-10 flex items-center gap-0.5 rounded-lg border border-surface-200 bg-white p-1 shadow-md transition-opacity dark:border-surface-700 dark:bg-surface-800',
        selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      )}
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          actions?.editNode(id)
        }}
        title="Edit"
        className="flex h-7 w-7 items-center justify-center rounded-md text-surface-500 hover:bg-surface-100 hover:text-brand-600 dark:hover:bg-surface-700"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          actions?.deleteNode(id)
        }}
        title="Delete"
        className="flex h-7 w-7 items-center justify-center rounded-md text-surface-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}

function NodeShell({ id, kind, selected, children }) {
  const def = flowCatalog[kind]
  const Icon = def.icon
  const accent = categoryAccent[def.category]
  return (
    <div
      className={cn(
        'group relative w-64 rounded-xl border bg-white shadow-md transition-shadow dark:bg-surface-900',
        selected
          ? 'border-brand-500 ring-2 ring-brand-500/30'
          : 'border-surface-200 hover:shadow-lg dark:border-surface-700'
      )}
    >
      <NodeToolbar id={id} selected={selected} />
      <div
        className="flex items-center gap-2 rounded-t-xl border-b border-surface-100 px-3 py-2 dark:border-surface-800"
        style={{ backgroundColor: `${accent}14` }}
      >
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white"
          style={{ backgroundColor: accent }}
        >
          <Icon className="h-4 w-4" />
        </span>
        <p className="min-w-0 flex-1 truncate text-sm font-semibold text-surface-900 dark:text-white">
          {def.label}
        </p>
        {def.beta && (
          <span className="rounded-full bg-violet-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-violet-600 dark:bg-violet-950/60 dark:text-violet-300">
            Beta
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

// --------------------------- Generic node ---------------------------
export function FlowNode({ id, data, selected }) {
  const def = flowCatalog[data.kind]
  return (
    <NodeShell id={id} kind={data.kind} selected={selected}>
      <div className="px-3 py-2.5">
        <p className="line-clamp-2 text-xs leading-relaxed text-surface-600 dark:text-surface-400">
          {nodeSummary(data.kind, data)}
        </p>
        {data.kind === 'send_message' && data.buttons?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {data.buttons.map((b) => (
              <span
                key={b}
                className="rounded-md border border-surface-200 px-1.5 py-0.5 text-[10px] text-surface-500 dark:border-surface-700"
              >
                {b}
              </span>
            ))}
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className={handleClass} />
      <Handle type="source" position={Position.Right} className={handleClass} />
      <AddNextButton id={id} />
    </NodeShell>
  )
}

// ------------------- Condition node (two outputs) -------------------
export function ConditionNode({ id, data, selected }) {
  return (
    <div className="relative">
      <NodeShell id={id} kind={data.kind} selected={selected}>
        <div className="px-3 py-2.5">
          <p className="line-clamp-2 text-xs leading-relaxed text-surface-600 dark:text-surface-400">
            {nodeSummary(data.kind, data)}
          </p>
          <div className="mt-2 flex justify-end gap-3 text-[10px] font-semibold">
            <span className="text-emerald-600 dark:text-emerald-400">Yes ▸</span>
            <span className="text-red-500 dark:text-red-400">No ▸</span>
          </div>
        </div>
      </NodeShell>
      <Handle type="target" position={Position.Left} className={handleClass} style={{ top: '50%' }} />
      <Handle
        id="true"
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !rounded-full !border-2 !border-white !bg-emerald-500 dark:!border-surface-900"
        style={{ top: 'calc(100% - 26px)' }}
      />
      <Handle
        id="false"
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !rounded-full !border-2 !border-white !bg-red-500 dark:!border-surface-900"
        style={{ top: 'calc(100% - 12px)' }}
      />
    </div>
  )
}

// ------------- Options node (Buttons / List — one output per option) -------------
export function OptionsNode({ id, data, selected }) {
  const def = flowCatalog[data.kind]
  const options = data.options || []
  return (
    <NodeShell id={id} kind={data.kind} selected={selected}>
      <div className="px-3 py-2.5">
        {data.header && data.kind === 'list' && (
          <p className="mb-1 text-xs font-semibold text-surface-700 dark:text-surface-200">{data.header}</p>
        )}
        <p className="text-xs leading-relaxed text-surface-600 dark:text-surface-400">
          {data.message || def.sub}
        </p>
        <div className="mt-2 space-y-1.5">
          {options.length === 0 && (
            <p className="text-xs italic text-surface-400">No options yet — add some in the panel</p>
          )}
          {options.map((opt, i) => (
            <div
              key={i}
              className="relative rounded-md border border-surface-200 bg-surface-50 px-2 py-1 text-xs text-surface-600 dark:border-surface-700 dark:bg-surface-800/60 dark:text-surface-300"
            >
              {data.kind === 'list' ? `${i + 1}. ${opt}` : opt}
              <Handle
                id={`opt-${i}`}
                type="source"
                position={Position.Right}
                className={handleClass}
                style={{ right: -16 }}
              />
            </div>
          ))}
        </div>
      </div>
      <Handle type="target" position={Position.Left} className={handleClass} />
    </NodeShell>
  )
}

export const nodeTypes = {
  start: StartNode,
  flow: FlowNode,
  condition: ConditionNode,
  options: OptionsNode,
}
