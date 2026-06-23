import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Button from '../ui/Button.jsx'

// Premium "spotlight" CTA — a rich brand-gradient banner with drifting glow
// orbs, a shimmer sweep, floating particles, and a springy entrance.
// (Magic MCP redesign of the original CTA, adapted to brand tokens.)
export default function CTASpotlight() {
  const reduce = useReducedMotion()

  return (
    <section className="py-12 sm:py-16">
      <div className="container-page">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-700 via-brand-600 to-accent-700 px-6 py-16 text-center shadow-glow sm:px-16 sm:py-20"
        >
          {/* drifting glow orbs */}
          {!reduce && (
            <>
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl"
                animate={{ x: [0, 40, 0], y: [0, 25, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-accent-300/25 blur-3xl"
                animate={{ x: [0, -30, 0], y: [0, -20, 0], scale: [1, 1.25, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              />
            </>
          )}

          {/* shimmer sweep */}
          {!reduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
              }}
              animate={{ x: ['-120%', '220%'] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'linear', repeatDelay: 2.5 }}
            />
          )}

          {/* floating particles */}
          {!reduce &&
            [...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                aria-hidden
                className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-white/50"
                style={{ left: `${18 + i * 13}%`, top: `${28 + (i % 3) * 22}%` }}
                animate={{ y: [0, -18, 0], opacity: [0.3, 0.9, 0.3], scale: [1, 1.3, 1] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              />
            ))}

          {/* badge */}
          <motion.div
            initial={reduce ? false : { scale: 0, rotate: -120 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.15 }}
            className="relative mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/25 bg-white/15 backdrop-blur-sm"
          >
            <Sparkles className="h-7 w-7 text-white" />
          </motion.div>

          <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Ready to launch your chatbot?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-brand-50/90">
            Join thousands of teams capturing more leads and answering visitors 24/7. Set up your
            first bot in minutes.
          </p>

          <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button as={Link} to="/join" size="lg" variant="white" className="w-full transition-transform hover:-translate-y-0.5 sm:w-auto">
              Start free trial <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* bottom hairline glow */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
