import { useContext } from 'react'
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from '@xyflow/react'
import { X } from 'lucide-react'
import { FlowActionsContext } from './flowContext.js'

// An edge with a disconnect button (and optional label) at its midpoint.
export function DeletableEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  style,
  label,
}) {
  const actions = useContext(FlowActionsContext)
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan flex items-center gap-1"
        >
          {label && (
            <span className="rounded-full border border-surface-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-surface-500 shadow-sm dark:border-surface-700 dark:bg-surface-800 dark:text-surface-300">
              {label}
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation()
              actions?.deleteEdge(id)
            }}
            title="Disconnect"
            className="flex h-5 w-5 items-center justify-center rounded-full border border-surface-200 bg-white text-surface-400 shadow-sm transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-surface-700 dark:bg-surface-800 dark:hover:border-red-700 dark:hover:bg-red-950/40 dark:hover:text-red-400"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  )
}

export const edgeTypes = { deletable: DeletableEdge }
