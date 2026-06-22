import { useState } from 'react'
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Play, Flag, GripVertical } from 'lucide-react'
import { cn } from '../../utils/cn.js'
import { flowCatalog, categoryAccent, nodeSummary } from '../../data/flowNodes.js'
import NodePicker from './NodePicker.jsx'
import NodeFields from './NodeFields.jsx'
import Modal from '../ui/Modal.jsx'
import Button from '../ui/Button.jsx'

// Classic, linear workflow: a bounded container holding a vertical list of
// modules. Add one module, then the next, top to bottom — each runs in order.
export default function StepsBuilder({ steps, onInsert, onInsertExisting, onUpdate, onDelete, onMove, onReorder }) {
  const [pickerIndex, setPickerIndex] = useState(null) // where to insert
  const [editingId, setEditingId] = useState(null)
  const [dragIndex, setDragIndex] = useState(null)
  const [overIndex, setOverIndex] = useState(null)
  const editingStep = steps.find((s) => s.id === editingId)

  const dropOn = (to) => {
    if (dragIndex !== null && dragIndex !== to) onReorder?.(dragIndex, to)
    setDragIndex(null)
    setOverIndex(null)
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      {/* Module container */}
      <div className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card dark:border-surface-800 dark:bg-surface-900 sm:p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-surface-900 dark:text-white">Conversation steps</h2>
          <p className="text-xs text-surface-500">
            {steps.length} module{steps.length === 1 ? '' : 's'} · runs top to bottom
          </p>
        </div>

        {/* Start */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow">
            <Play className="h-4 w-4 fill-current" /> Conversation starts
          </span>
        </div>

        {steps.length === 0 ? (
          <>
            <Rail />
            <button
              onClick={() => setPickerIndex(0)}
              className="flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-surface-300 px-6 py-10 text-surface-500 transition-colors hover:border-brand-400 hover:bg-brand-50/30 hover:text-brand-600 dark:border-surface-700 dark:hover:border-brand-600 dark:hover:bg-brand-950/20"
            >
              <Plus className="h-6 w-6" />
              <span className="text-sm font-medium">Add your first module</span>
            </button>
          </>
        ) : (
          steps.map((step, i) => (
            <div key={step.id}>
              <AddBetween onClick={() => setPickerIndex(i)} />
              <StepCard
                step={step}
                index={i}
                total={steps.length}
                isDragging={dragIndex === i}
                isOver={overIndex === i && dragIndex !== null && dragIndex !== i}
                onDragStart={() => setDragIndex(i)}
                onDragOver={(e) => {
                  e.preventDefault()
                  if (overIndex !== i) setOverIndex(i)
                }}
                onDrop={() => dropOn(i)}
                onDragEnd={() => {
                  setDragIndex(null)
                  setOverIndex(null)
                }}
                onEdit={() => setEditingId(step.id)}
                onDelete={() => onDelete(step.id)}
                onUp={() => onMove(step.id, -1)}
                onDown={() => onMove(step.id, 1)}
              />
            </div>
          ))
        )}

        {/* Add at end + End marker */}
        {steps.length > 0 && (
          <>
            <Rail />
            <button
              onClick={() => setPickerIndex(steps.length)}
              className="mx-auto flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100 dark:border-brand-900/60 dark:bg-brand-950/40 dark:text-brand-300"
            >
              <Plus className="h-4 w-4" /> Add module
            </button>
          </>
        )}

        <Rail />
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-surface-200 px-4 py-1.5 text-xs font-medium text-surface-500 dark:bg-surface-800 dark:text-surface-400">
            <Flag className="h-3.5 w-3.5" /> End of conversation
          </span>
        </div>
      </div>

      {/* Block picker — New module, or Jump to an existing step */}
      {pickerIndex !== null && (
        <NodePicker
          onSelect={(kind) => {
            onInsert(kind, pickerIndex)
            setPickerIndex(null)
          }}
          onClose={() => setPickerIndex(null)}
          onSelectExisting={
            onInsertExisting
              ? (targetId) => {
                  onInsertExisting(targetId, pickerIndex)
                  setPickerIndex(null)
                }
              : undefined
          }
          existing={steps.map((s, i) => ({
            id: s.id,
            kind: s.kind,
            label: `Step ${i + 1} · ${flowCatalog[s.kind].label}`,
            summary: nodeSummary(s.kind, s.data),
          }))}
        />
      )}

      {/* Step editor */}
      {editingStep && (
        <StepEditModal
          step={editingStep}
          onChange={(data) => onUpdate(editingStep.id, data)}
          onClose={() => setEditingId(null)}
          onDelete={() => {
            onDelete(editingStep.id)
            setEditingId(null)
          }}
          onAddNext={() => {
            const idx = steps.findIndex((s) => s.id === editingStep.id)
            setEditingId(null)
            setPickerIndex(idx + 1) // insert right after this step
          }}
        />
      )}
    </div>
  )
}

function Rail() {
  return <div className="mx-auto my-2 h-5 w-px bg-surface-300 dark:bg-surface-700" />
}

function AddBetween({ onClick }) {
  return (
    <div className="group relative mx-auto flex h-7 w-px items-center justify-center bg-surface-300 dark:bg-surface-700">
      <button
        onClick={onClick}
        title="Insert module here"
        className="absolute flex h-6 w-6 items-center justify-center rounded-full border border-surface-300 bg-white text-surface-400 opacity-0 shadow-sm transition-all hover:scale-110 hover:border-brand-400 hover:text-brand-600 group-hover:opacity-100 dark:border-surface-600 dark:bg-surface-800"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

function StepCard({
  step,
  index,
  total,
  isDragging,
  isOver,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onEdit,
  onDelete,
  onUp,
  onDown,
}) {
  const def = flowCatalog[step.kind]
  const Icon = def.icon
  const accent = categoryAccent[def.category]
  const chips = step.data.options || step.data.buttons

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      onClick={onEdit}
      role="button"
      title="Click to edit"
      className={cn(
        'group relative w-full cursor-pointer rounded-xl border bg-white shadow-card transition-all dark:bg-surface-900',
        isOver ? 'border-brand-500 ring-2 ring-brand-500/30' : 'border-surface-200 hover:border-brand-300 hover:shadow-soft dark:border-surface-800 dark:hover:border-brand-700',
        isDragging && 'opacity-40'
      )}
    >
      <div className="flex items-start gap-3 p-4">
        <button
          onClick={(e) => e.stopPropagation()}
          className="mt-1 flex h-5 w-5 shrink-0 cursor-grab touch-none items-center justify-center text-surface-300 hover:text-surface-500 active:cursor-grabbing dark:text-surface-600"
          title="Drag to reorder"
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white" style={{ backgroundColor: accent }}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-surface-400">Step {index + 1}</span>
            {def.beta && (
              <span className="rounded bg-violet-100 px-1 text-[9px] font-bold uppercase text-violet-600 dark:bg-violet-950/60 dark:text-violet-300">
                Beta
              </span>
            )}
          </div>
          <p className="text-sm font-semibold text-surface-900 dark:text-white">{def.label}</p>
          <p className="mt-0.5 line-clamp-2 text-sm text-surface-500 dark:text-surface-400">
            {nodeSummary(step.kind, step.data)}
          </p>
          {chips?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {chips.map((b) => (
                <span key={b} className="rounded-md border border-surface-200 px-1.5 py-0.5 text-[10px] text-surface-500 dark:border-surface-700">
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
          <button onClick={(e) => { e.stopPropagation(); onUp() }} disabled={index === 0} className="flex h-7 w-7 items-center justify-center rounded-md text-surface-400 hover:bg-surface-100 disabled:opacity-30 dark:hover:bg-surface-800" title="Move up">
            <ArrowUp className="h-4 w-4" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDown() }} disabled={index === total - 1} className="flex h-7 w-7 items-center justify-center rounded-md text-surface-400 hover:bg-surface-100 disabled:opacity-30 dark:hover:bg-surface-800" title="Move down">
            <ArrowDown className="h-4 w-4" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onEdit() }} className="flex h-7 w-7 items-center justify-center rounded-md text-surface-400 hover:bg-surface-100 hover:text-brand-600 dark:hover:bg-surface-800" title="Edit">
            <Pencil className="h-4 w-4" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDelete() }} className="flex h-7 w-7 items-center justify-center rounded-md text-surface-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40" title="Delete">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function StepEditModal({ step, onChange, onClose, onDelete, onAddNext }) {
  const def = flowCatalog[step.kind]
  const update = (key, value) => onChange({ ...step.data, [key]: value })
  return (
    <Modal
      open
      onClose={onClose}
      title={def.label}
      description={def.sub}
      footer={
        <>
          <Button variant="ghost" className="mr-auto text-red-600" onClick={onDelete}>
            <Trash2 className="h-4 w-4" /> Delete
          </Button>
          <Button variant="secondary" onClick={onAddNext}>
            <Plus className="h-4 w-4" /> Add next
          </Button>
          <Button onClick={onClose}>Done</Button>
        </>
      }
    >
      <NodeFields fields={def.fields} data={step.data} onChange={update} />
    </Modal>
  )
}
