import { Analytics } from '@vercel/analytics/react'
import { useConsent } from '../lib/consent.js'

// Loads Vercel Web Analytics ONLY after the visitor accepts optional cookies.
// Mounts/unmounts reactively when the consent choice changes.
export default function AnalyticsGate() {
  const consent = useConsent()
  if (consent !== 'accepted') return null
  return <Analytics />
}
