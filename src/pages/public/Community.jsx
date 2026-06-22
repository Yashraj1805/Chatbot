import { MessagesSquare, Github, Twitter, Mail } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout.jsx'
import PageHero from '../../components/PageHero.jsx'
import Reveal from '../../components/landing/Reveal.jsx'

const channels = [
  { icon: MessagesSquare, title: 'Discord', desc: 'Chat with the team and other builders in real time.', cta: 'Join server', href: 'https://discord.gg/vartabot' },
  { icon: Github, title: 'GitHub', desc: 'Follow our SDKs, report issues, and request features.', cta: 'View repos', href: 'https://github.com/vartabot' },
  { icon: Twitter, title: 'X / Twitter', desc: 'Product updates, tips, and announcements.', cta: 'Follow us', href: 'https://twitter.com/vartabot' },
  { icon: Mail, title: 'Newsletter', desc: 'One short email a week — playbooks and product news.', cta: 'Subscribe', href: 'mailto:hello@vartabot.in' },
]

export default function Community() {
  return (
    <PublicLayout
      title="Community"
      description="Join the VartaBot community to learn, share, and build better chatbots with thousands of others."
    >
      <PageHero eyebrow="Community" title="Join the community" subtitle="Learn, share, and build better chatbots with thousands of others." />
      <section className="py-16 sm:py-20">
        <div className="container-page grid max-w-4xl gap-6 sm:grid-cols-2">
          {channels.map((c, i) => (
            <Reveal key={c.title} delay={i * 60} className="h-full">
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-start gap-4 rounded-2xl border border-surface-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-glow dark:border-surface-800 dark:bg-surface-900 dark:hover:border-brand-700">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-soft"><c.icon className="h-6 w-6" /></span>
                <div>
                  <h3 className="text-base font-semibold text-surface-900 dark:text-white">{c.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-surface-600 dark:text-surface-400">{c.desc}</p>
                  <span className="mt-3 inline-block text-sm font-semibold text-brand-600 group-hover:underline dark:text-brand-400">{c.cta} →</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </PublicLayout>
  )
}
