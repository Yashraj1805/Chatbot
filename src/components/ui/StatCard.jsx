import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import Card from './Card.jsx'
import { cn } from '../../utils/cn.js'

export default function StatCard({ icon: Icon, label, value, delta, trend = 'up', period }) {
  const up = trend === 'up'
  return (
    <Card hover className="p-5">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-300">
          {Icon && <Icon className="h-5 w-5" />}
        </div>
        {delta && (
          <span
            className={cn(
              'inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold',
              up
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400'
                : 'bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400'
            )}
          >
            {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {delta}
          </span>
        )}
      </div>
      <p className="mt-4 text-3xl font-bold tracking-tight text-surface-900 dark:text-white">
        {value}
      </p>
      <p className="mt-1 text-sm font-medium text-surface-500 dark:text-surface-400">{label}</p>
      {period && <p className="mt-0.5 text-xs text-surface-400">{period}</p>}
    </Card>
  )
}
