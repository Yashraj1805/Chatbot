// Blog posts. Each renders at /blog/:slug. Covers are branded gradient panels
// (icon + tint) — reliable and on-brand. Body is ordered [{ h, p }] sections.
import { Workflow, Sparkles, TrendingUp, MessageSquare, Headset, Code2 } from 'lucide-react'

export const blogPosts = [
  {
    slug: 'chatbot-flows-that-capture-leads',
    title: '7 chatbot flows that capture more leads',
    excerpt: 'Proven conversation flows you can copy to turn website visitors into qualified leads.',
    category: 'Playbooks',
    date: '2026-06-12',
    read: '6 min',
    author: 'Aisha Khan',
    icon: Workflow,
    tint: 'from-brand-500 to-accent-500',
    body: [
      { h: 'Why flows beat forms', p: 'Static contact forms convert poorly because they ask for everything upfront. A conversational flow earns trust step by step, so visitors share more.' },
      { h: '1. The greeter', p: 'Open with a friendly question tied to intent — “Looking to grow your sales or get support?” — and branch from there.' },
      { h: '2. The qualifier', p: 'Ask one or two qualifying questions (team size, use case) before requesting an email. Context first, contact second.' },
      { h: '3. The booker', p: 'For high-intent visitors, offer to book a demo and capture their work email in the same breath.' },
    ],
  },
  {
    slug: 'rule-based-vs-ai-chatbots',
    title: 'Rule-based vs AI chatbots: which should you pick?',
    excerpt: 'A practical breakdown of when predictable rules win and when AI is worth it.',
    category: 'Guides',
    date: '2026-06-05',
    read: '8 min',
    author: 'Raj Malhotra',
    icon: Sparkles,
    tint: 'from-accent-500 to-brand-500',
    body: [
      { h: 'The trade-off', p: 'Rule-based bots are fast, predictable, and fully under your control. AI bots are flexible but less predictable and harder to govern.' },
      { h: 'When rules win', p: 'Lead capture, FAQs, routing, and booking — anything with a known set of outcomes — is perfect for rules.' },
      { h: 'When AI helps', p: 'Open-ended questions and long-tail support benefit from AI. Many teams start with rules and layer AI in later.' },
    ],
  },
  {
    slug: 'qualify-visitors-without-a-form',
    title: 'How to qualify visitors without a form',
    excerpt: 'Replace your clunky lead form with a conversation that actually converts.',
    category: 'Growth',
    date: '2026-05-28',
    read: '5 min',
    author: 'Camila Torres',
    icon: TrendingUp,
    tint: 'from-brand-600 to-accent-400',
    body: [
      { h: 'Forms create friction', p: 'Every extra field drops conversion. A chat asks one thing at a time, so it feels lighter and gets more completions.' },
      { h: 'Ask in order of value', p: 'Start with what helps the visitor, then ask for contact details once they’re engaged.' },
    ],
  },
  {
    slug: 'welcome-message-that-converts',
    title: 'Designing a welcome message that converts',
    excerpt: 'Your first line sets the tone. Here’s how to write one that earns a reply.',
    category: 'Playbooks',
    date: '2026-05-20',
    read: '4 min',
    author: 'Daniel Cho',
    icon: MessageSquare,
    tint: 'from-accent-600 to-brand-400',
    body: [
      { h: 'Be specific', p: 'Generic “How can I help?” gets ignored. Tie the greeting to the page and offer clear choices.' },
      { h: 'Offer quick replies', p: 'Buttons lower the effort to respond and guide visitors toward your goals.' },
    ],
  },
  {
    slug: 'cut-support-volume-with-bots',
    title: 'Cutting support volume by 40% with chatbots',
    excerpt: 'How a small team deflected routine tickets and freed up humans for hard problems.',
    category: 'Case study',
    date: '2026-05-11',
    read: '7 min',
    author: 'Lena Müller',
    icon: Headset,
    tint: 'from-brand-500 to-accent-600',
    body: [
      { h: 'The problem', p: 'The team was drowning in repetitive “how do I…” questions that ate into real support time.' },
      { h: 'The fix', p: 'They mapped the top 20 questions to rules and added a live-agent handoff for everything else.' },
      { h: 'The result', p: 'Routine tickets dropped 40% in a month and response time fell to seconds.' },
    ],
  },
  {
    slug: 'embed-vartabot-on-any-platform',
    title: 'Embedding VartaBot on any platform',
    excerpt: 'A quick guide to adding your chatbot to WordPress, Shopify, Webflow and more.',
    category: 'Docs',
    date: '2026-05-02',
    read: '3 min',
    author: 'Marco Rossi',
    icon: Code2,
    tint: 'from-accent-500 to-brand-600',
    body: [
      { h: 'One snippet, any site', p: 'Copy your embed snippet and paste it before the closing body tag — no plugin required.' },
      { h: 'Platform tips', p: 'Most site builders have a “custom code” or “footer scripts” area; that’s where the snippet goes.' },
    ],
  },
]

export const postBySlug = Object.fromEntries(blogPosts.map((p) => [p.slug, p]))

export function formatDate(iso) {
  const [y, m, d] = iso.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[Number(m) - 1]} ${Number(d)}, ${y}`
}
