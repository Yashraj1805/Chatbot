import { cn } from '../../utils/cn.js'

export default function Toggle({ checked, onChange, label, description, id }) {
  const toggle = (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      id={id}
      onClick={() => onChange?.(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-900',
        checked ? 'bg-brand-600' : 'bg-surface-300 dark:bg-surface-700'
      )}
    >
      <span
        className={cn(
          'inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0.5'
        )}
      />
    </button>
  )

  if (!label) return toggle

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <label htmlFor={id} className="text-sm font-medium text-surface-800 dark:text-surface-100">
          {label}
        </label>
        {description && (
          <p className="text-sm text-surface-500 dark:text-surface-400">{description}</p>
        )}
      </div>
      {toggle}
    </div>
  )
}
