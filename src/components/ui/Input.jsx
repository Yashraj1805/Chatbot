import { cn } from '../../utils/cn.js'

const baseField =
  'w-full rounded-lg border border-surface-300 bg-white px-3.5 text-sm text-surface-900 placeholder:text-surface-400 transition-colors ' +
  'focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 focus:outline-none ' +
  'disabled:cursor-not-allowed disabled:bg-surface-50 ' +
  'dark:border-surface-700 dark:bg-surface-800 dark:text-white dark:placeholder:text-surface-500 dark:disabled:bg-surface-900'

export function Label({ htmlFor, children, hint, className = '' }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'mb-1.5 flex items-center justify-between text-sm font-medium text-surface-700 dark:text-surface-300',
        className
      )}
    >
      <span>{children}</span>
      {hint && <span className="text-xs font-normal text-surface-400">{hint}</span>}
    </label>
  )
}

export function Input({ icon: Icon, className = '', ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
      )}
      <input
        className={cn(baseField, 'h-10', Icon && 'pl-9', className)}
        {...props}
      />
    </div>
  )
}

export function Textarea({ className = '', rows = 4, ...props }) {
  return <textarea rows={rows} className={cn(baseField, 'py-2.5', className)} {...props} />
}

export function Select({ className = '', children, ...props }) {
  return (
    <select className={cn(baseField, 'h-10 pr-8', className)} {...props}>
      {children}
    </select>
  )
}

// A labelled field wrapper to keep forms tidy
export function Field({ label, hint, htmlFor, children, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <Label htmlFor={htmlFor} hint={hint}>
          {label}
        </Label>
      )}
      {children}
    </div>
  )
}
