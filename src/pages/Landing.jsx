import Navbar from '../components/landing/Navbar.jsx'
import Ambience from '../components/landing/Ambience.jsx'
import AIAssistant from '../components/AIAssistant.jsx'
import Seo from '../components/Seo.jsx'
import Hero from '../components/landing/Hero.jsx'
import ProductShowcase from '../components/landing/ProductShowcase.jsx'
import Stats from '../components/landing/Stats.jsx'
import Features from '../components/landing/Features.jsx'
import HowItWorks from '../components/landing/HowItWorks.jsx'
import Integrations from '../components/landing/Integrations.jsx'
import Pricing from '../components/landing/Pricing.jsx'
import Comparison from '../components/landing/Comparison.jsx'
import FAQ from '../components/landing/FAQ.jsx'
import CTA from '../components/landing/CTASpotlight.jsx'
import Footer from '../components/landing/Footer.jsx'

export default function Landing() {
  return (
    <div className="relative min-h-screen bg-surface-50 dark:bg-surface-950">
      <Seo description="VartaBot is a no-code platform to build chatbots that capture leads and answer visitors 24/7 — live on your site in minutes, no developer needed." />
      <Ambience />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <ProductShowcase />
        <Stats />
        <Features />
        <HowItWorks />
        <Integrations />
        <Pricing />
        <Comparison />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  )
}
