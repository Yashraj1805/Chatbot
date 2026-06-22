import { useEffect, useState } from 'react'

// Types a word out, pauses, deletes it, then moves to the next — looping.
// Respects prefers-reduced-motion (shows the first word statically).
export default function Typewriter({
  words = [],
  typingSpeed = 85,
  deletingSpeed = 40,
  pause = 1500,
  className = '',
  caretClassName = 'bg-current',
}) {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [index, setIndex] = useState(0)
  const [sub, setSub] = useState(reduced ? words[0] || '' : '')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduced || words.length === 0) return
    const current = words[index % words.length]

    let delay = deleting ? deletingSpeed : typingSpeed
    if (!deleting && sub === current) delay = pause
    if (deleting && sub === '') delay = 350

    const t = setTimeout(() => {
      if (!deleting && sub === current) {
        setDeleting(true)
      } else if (deleting && sub === '') {
        setDeleting(false)
        setIndex((i) => (i + 1) % words.length)
      } else {
        setSub(deleting ? current.slice(0, sub.length - 1) : current.slice(0, sub.length + 1))
      }
    }, delay)

    return () => clearTimeout(t)
  }, [sub, deleting, index, words, typingSpeed, deletingSpeed, pause, reduced])

  return (
    <span className={className} aria-live="polite">
      {sub}
      <span className={`ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] rounded-full align-baseline animate-caret motion-reduce:hidden ${caretClassName}`} />
    </span>
  )
}
