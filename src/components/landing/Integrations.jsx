import { useState } from 'react'
import { integrations } from '../../data/mockData.js'
import Reveal from './Reveal.jsx'
import { Stagger, StaggerItem } from '../motion/index.jsx'

// Official Slack mark (Simple Icons removed Slack for legal reasons, so we inline it).
function SlackMark({ className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 122.8 122.8" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#E01E5A" />
      <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36C5F0" />
      <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2EB67D" />
      <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ECB22E" />
    </svg>
  )
}

function IntegrationLogo({ item }) {
  const [failed, setFailed] = useState(false)

  if (item.inline === 'slack') return <SlackMark />

  if (failed) {
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold text-white">
        {item.name[0]}
      </span>
    )
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${item.slug}`}
      alt={`${item.name} logo`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-7 w-7 object-contain"
    />
  )
}

export default function Integrations() {
  return (
    <section id="integrations" className="scroll-mt-20 py-12 sm:py-16">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Integrations
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-surface-900 dark:text-white sm:text-4xl">
            Works with the tools you already use
          </h2>
          <p className="mt-4 text-lg text-surface-600 dark:text-surface-300">
            Drop the widget on any platform and pipe your leads wherever your team works — no plugin required.
          </p>
        </Reveal>

        <Stagger className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4" gap={0.06}>
          {integrations.map((it) => (
            <StaggerItem key={it.name}>
              <div className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-surface-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-glow dark:border-surface-800 dark:bg-surface-900 dark:hover:border-brand-700">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-surface-200 transition-transform duration-300 group-hover:scale-110 dark:ring-surface-700">
                  <IntegrationLogo item={it} />
                </span>
                <span className="text-sm font-semibold text-surface-700 dark:text-surface-200">
                  {it.name}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-10 text-center text-sm text-surface-500 dark:text-surface-400">
          …and 50+ more via Zapier &amp; our REST API.
        </p>
      </div>
    </section>
  )
}
