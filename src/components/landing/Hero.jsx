import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Check } from 'lucide-react'
import Button from '../ui/Button.jsx'
import ChatWidget from '../widget/ChatWidget.jsx'
import Reveal from './Reveal.jsx'
import TrustLogos from './TrustLogos.jsx'
import Typewriter from '../Typewriter.jsx'
import { Stagger, StaggerItem } from '../motion/index.jsx'
import { trustLogos } from '../../data/mockData.js'

export default function Hero() {
  // Drift the background glow as the page scrolls for a subtle parallax depth.
  const { scrollY } = useScroll()
  const glowY = useTransform(scrollY, [0, 600], [0, 140])
  const glowScale = useTransform(scrollY, [0, 600], [1, 1.15])

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          style={{ y: glowY, scale: glowScale }}
          className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-brand-400/20 blur-3xl dark:bg-brand-600/20"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,var(--tw-gradient-to)_70%)]" />
      </div>

      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <Stagger className="text-center lg:text-left" gap={0.1}>
          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:border-brand-900/60 dark:bg-brand-950/50 dark:text-brand-300">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" /> No-code · Rule-based · Live in minutes
            </span>
          </StaggerItem>

          <StaggerItem>
            <h1 className="mt-5 text-[2.75rem] font-extrabold leading-[1.05] tracking-tight text-surface-900 dark:text-white sm:text-6xl lg:text-7xl">
              <span className="block">A chatbot that</span>
              <Typewriter
                words={['converts', 'replies', 'qualifies', 'sells']}
                caretClassName="bg-accent-500"
                className="mt-1 block text-gradient-brand"
              />
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mx-auto mt-5 max-w-md text-lg text-surface-600 dark:text-surface-300 lg:mx-0">
              No-code chatbots that capture leads and reply 24/7. Live in minutes.
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Button as={Link} to="/join" size="lg" className="w-full transition-transform hover:-translate-y-0.5 sm:w-auto">
                Start building free <ArrowRight className="h-4 w-4" />
              </Button>
              <Button as="a" href="#how" variant="secondary" size="lg" className="w-full sm:w-auto">
                See how it works
              </Button>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-surface-500 dark:text-surface-400 lg:justify-start">
              {['No credit card required', '14-day free trial', 'Cancel anytime'].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" /> {t}
                </span>
              ))}
            </div>
          </StaggerItem>
        </Stagger>

        {/* Live widget preview */}
        <Reveal delay={120} className="relative mx-auto w-full max-w-md">
          <motion.div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/40 to-transparent blur-2xl dark:from-brand-800/30"
            animate={{ y: [0, -14, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <ChatWidget mode="inline" />
        </Reveal>
      </div>

      {/* Logo strip */}
      <TrustLogos items={trustLogos} />
    </section>
  )
}
