import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router doesn't restore scroll or jump to #hash on navigation. This does:
//  • new page → scroll to top (fixes pages opening mid-screen)
//  • /path#section → smooth-scroll to that section once it has rendered
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      // The target may still be animating/mounting in — retry briefly.
      let tries = 0
      const tick = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else if (tries++ < 10) {
          setTimeout(tick, 60)
        }
      }
      const t = setTimeout(tick, 60)
      return () => clearTimeout(t)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
