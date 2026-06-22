import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button.jsx'
import Reveal from './Reveal.jsx'

export default function CTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

          <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to launch your chatbot?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-brand-100">
            Join thousands of teams capturing more leads and answering visitors 24/7. Set up your
            first bot in minutes.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button as={Link} to="/register" size="lg" variant="white" className="w-full sm:w-auto">
              Start free trial <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as={Link} to="/login" size="lg" variant="ghostLight" className="w-full sm:w-auto">
              Log in
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
