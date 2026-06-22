import { cn } from '../../utils/cn.js'

export default function Card({ className = '', hover = false, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-surface-200 bg-white shadow-card',
        'dark:border-surface-800 dark:bg-surface-900',
        hover &&
          'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft hover:border-surface-300 dark:hover:border-surface-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className = '', children }) {
  return (
    <div className={cn('flex items-start justify-between gap-4 p-5 sm:p-6', className)}>
      {children}
    </div>
  )
}

export function CardBody({ className = '', children }) {
  return <div className={cn('px-5 pb-5 sm:px-6 sm:pb-6', className)}>{children}</div>
}

export function CardTitle({ className = '', children }) {
  return (
    <h3 className={cn('text-base font-semibold text-surface-900 dark:text-white', className)}>
      {children}
    </h3>
  )
}
