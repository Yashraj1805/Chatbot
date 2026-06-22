import { motion, useReducedMotion } from 'framer-motion'

// Scroll-reveal wrapper powered by Framer Motion. Fades + rises into view once,
// and automatically respects prefers-reduced-motion.
export default function Reveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  )
}
