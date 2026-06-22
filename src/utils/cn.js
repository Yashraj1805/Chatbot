// Classname helper used across the app and by 21st.dev / shadcn components.
// clsx handles conditional classes; tailwind-merge dedupes conflicting
// Tailwind utilities (e.g. cn('p-2', 'p-4') -> 'p-4').
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...classes) {
  return twMerge(clsx(classes))
}
