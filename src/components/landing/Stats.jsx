import { brandStats } from '../../data/mockData.js'
import Reveal from './Reveal.jsx'
import { CountUp } from '../motion/index.jsx'

export default function Stats() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container-page">
        <Reveal className="grid grid-cols-2 gap-y-10 rounded-3xl border border-surface-200 bg-white px-6 py-10 shadow-card dark:border-surface-800 dark:bg-surface-900 sm:grid-cols-4 sm:divide-x sm:divide-surface-200 sm:dark:divide-surface-800">
          {brandStats.map((s) => (
            <div key={s.label} className="px-2 text-center">
              <CountUp
                value={s.value}
                className="text-gradient-brand text-3xl font-extrabold tracking-tight sm:text-4xl"
              />
              <p className="mt-2 text-sm font-medium text-surface-500 dark:text-surface-400">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
