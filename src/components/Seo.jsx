import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Lightweight, dependency-free SEO manager. Sets the document title and upserts
// description / canonical / Open Graph / Twitter / robots tags per route. Canonical
// is derived automatically from the current path.
const SITE = 'VartaBot'
const BASE = 'https://vartabot.in'
const DEFAULT_DESC =
  'VartaBot — build no-code chatbots that capture leads and answer visitors 24/7. Live in minutes, no developer needed.'
const DEFAULT_IMAGE = '/og-image.svg'

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function Seo({ title, description = DEFAULT_DESC, image = DEFAULT_IMAGE, noindex = false }) {
  const { pathname } = useLocation()
  const fullTitle = title ? `${title} · ${SITE}` : `${SITE} — No-Code Chatbot Platform`
  const url = BASE + pathname
  const img = image.startsWith('http') ? image : BASE + image

  useEffect(() => {
    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    upsertLink('canonical', url)

    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', img)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', SITE)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', img)
  }, [fullTitle, description, url, img, noindex])

  return null
}
