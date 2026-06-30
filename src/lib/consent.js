import { useEffect, useState } from 'react'

// Single source of truth for the visitor's cookie choice.
//   'accepted'  → essential + optional analytics cookies
//   'essential' → essential cookies only
//   null        → not chosen yet (show the banner)
const KEY = 'vartabot-cookie-consent'
const EVENT = 'vartabot:consent'

export function getConsent() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

// Gate OPTIONAL analytics/tracking behind this so we honour the visitor's choice.
export function hasAnalyticsConsent() {
  return getConsent() === 'accepted'
}

export function setConsent(value) {
  try {
    localStorage.setItem(KEY, value)
  } catch {
    /* storage blocked — choice just won't persist */
  }
  // `storage` only fires in *other* tabs, so dispatch our own event for this one.
  try {
    window.dispatchEvent(new CustomEvent(EVENT, { detail: value }))
  } catch {
    /* ignore */
  }
}

// Reactive read of the current consent value (updates on change, even same-tab).
export function useConsent() {
  const [consent, setStateValue] = useState(getConsent)

  useEffect(() => {
    const sync = () => setStateValue(getConsent())
    window.addEventListener(EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  return consent
}
