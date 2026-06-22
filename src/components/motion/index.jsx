import { useEffect, useRef, useState } from 'react'
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion'
import { cn } from '../../utils/cn.js'

const EASE = [0.22, 1, 0.36, 1]

// ---------------------------------------------------------------------------
// CountUp — animates the numeric part of a label (e.g. "12k+", "<15 min",
// "99.9%") from 0 to its value the first time it scrolls into view. Any
// surrounding text (prefix/suffix) is preserved verbatim.
// ---------------------------------------------------------------------------
export function CountUp({ value, className, duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  const reduce = useReducedMotion()

  const match = String(value).match(/^(\D*)(\d[\d,.]*)(.*)$/)
  // No number to animate — render the raw string.
  if (!match) return <span className={className}>{value}</span>

  const [, prefix, numStr, suffix] = match
  const target = parseFloat(numStr.replace(/,/g, ''))
  const decimals = (numStr.split('.')[1] || '').length

  const [display, setDisplay] = useState(reduce ? target : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, target, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [inView, reduce, target, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}

// ---------------------------------------------------------------------------
// AnimatedNumber — smoothly tweens to its `value` every time it changes (e.g.
// a price flipping between monthly/annual). Unlike CountUp it re-animates on
// each update rather than once on scroll.
// ---------------------------------------------------------------------------
export function AnimatedNumber({ value, className, format = (n) => Math.round(n) }) {
  const reduce = useReducedMotion()
  const prev = useRef(value)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (reduce) {
      setDisplay(value)
      prev.current = value
      return
    }
    const controls = animate(prev.current, value, {
      duration: 0.5,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
    })
    prev.current = value
    return () => controls.stop()
  }, [value, reduce])

  return <span className={className}>{format(display)}</span>
}

// ---------------------------------------------------------------------------
// Magnetic — gently pulls its child toward the cursor on hover, then springs
// back on leave. Disabled under prefers-reduced-motion.
// ---------------------------------------------------------------------------
export function Magnetic({ children, className = 'inline-block', strength = 0.35 }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })
  const reduce = useReducedMotion()

  function onMove(e) {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Stagger / StaggerItem — children rise + fade in sequence as the group
// enters the viewport. Wrap each child in <StaggerItem>.
// ---------------------------------------------------------------------------
export function Stagger({ children, className, gap = 0.08, delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      variants={{ show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  )
}
