import { cn } from '../../utils/cn.js'

export default function Spinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'h-4 w-4 border-2', md: 'h-6 w-6 border-2', lg: 'h-10 w-10 border-[3px]' }
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-block animate-spin rounded-full border-brand-500 border-t-transparent',
        sizes[size],
        className
      )}
    />
  )
}

// Full-area loading state used inside page bodies / cards
export function LoadingBlock({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-surface-500 dark:text-surface-400">
      <Spinner size="lg" />
      <p className="text-sm">{label}</p>
    </div>
  )
}

// Reusable skeleton bar
export function Skeleton({ className = '' }) {
  return <div className={cn('skeleton h-4 w-full', className)} />
}
