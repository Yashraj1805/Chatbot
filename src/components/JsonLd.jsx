import { useEffect } from 'react'

// Injects a JSON-LD <script> into <head>, keyed by `id`, and removes it on
// unmount. Lets each page add structured data (FAQ, Article, Breadcrumb…) for
// rich results in Google search.
export default function JsonLd({ id, data }) {
  const json = JSON.stringify(data)

  useEffect(() => {
    let el = document.getElementById(id)
    if (!el) {
      el = document.createElement('script')
      el.type = 'application/ld+json'
      el.id = id
      document.head.appendChild(el)
    }
    el.textContent = json
    return () => {
      el.remove()
    }
  }, [id, json])

  return null
}
