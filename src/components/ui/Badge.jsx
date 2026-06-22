import { cn } from '../../utils/cn.js'

const tones = {
  gray: 'bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-300',
  brand: 'bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300',
  green: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300',
  amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
  red: 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300',
  blue: 'bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300',
}

// Maps a domain status string to a tone + readable label
export const statusTone = {
  active: 'green',
  paused: 'amber',
  draft: 'gray',
  completed: 'green',
  abandoned: 'red',
  new: 'blue',
  contacted: 'amber',
  qualified: 'green',
  lost: 'red',
}

export default function Badge({ tone = 'gray', dot = false, className = '', children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
        tones[tone] || tones.gray,
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}
