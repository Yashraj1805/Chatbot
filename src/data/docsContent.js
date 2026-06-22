// Documentation articles. Each article renders at /docs/:slug and is grouped by
// category on the /docs index. Keep bodies as ordered [{ h, p }] sections.
import { Rocket, Workflow, Code2, Palette, Users, Download, Headset, Puzzle, CreditCard, ShieldCheck } from 'lucide-react'

export const docCategories = [
  { id: 'start', label: 'Getting started' },
  { id: 'build', label: 'Building chatbots' },
  { id: 'leads', label: 'Leads & inbox' },
  { id: 'account', label: 'Account & billing' },
  { id: 'security', label: 'Security' },
]

export const docs = [
  {
    slug: 'getting-started',
    cat: 'start',
    icon: Rocket,
    title: 'Getting started with VartaBot',
    excerpt: 'Create your first chatbot and go live in under 15 minutes.',
    body: [
      { h: 'Create your workspace', p: 'Sign up for a free trial and you’ll land in your dashboard. No credit card is required to start building.' },
      { h: 'Build your first bot', p: 'Click “New chatbot”, give it a name and a brand colour, and write a welcome message. That’s your bot’s first impression.' },
      { h: 'Go live', p: 'Add a couple of rules, copy the one-line embed snippet, and paste it into your website. Your bot is live and capturing leads.' },
    ],
  },
  {
    slug: 'install-widget',
    cat: 'start',
    icon: Code2,
    title: 'Installing the widget on your site',
    excerpt: 'Add VartaBot to any website with a single line of code.',
    body: [
      { h: 'Copy the snippet', p: 'In your dashboard go to Install and copy the <script> snippet. It’s unique to your workspace.' },
      { h: 'Paste before </body>', p: 'Paste the snippet just before the closing </body> tag on every page where the widget should appear.' },
      { h: 'Platform notes', p: 'On WordPress, Shopify, Webflow, Wix or Squarespace you can paste it into the theme’s custom-code / footer section — no plugin needed.' },
    ],
  },
  {
    slug: 'building-flows',
    cat: 'build',
    icon: Workflow,
    title: 'Building rules & flows',
    excerpt: 'Map keywords and buttons to responses with the visual builder.',
    body: [
      { h: 'Keywords', p: 'A keyword rule fires when a visitor’s message contains certain words (e.g. “pricing”, “demo”). Map each to a response.' },
      { h: 'Buttons', p: 'Offer quick-reply buttons so visitors can tap instead of type — great for guiding the conversation.' },
      { h: 'Flows', p: 'Chain steps together to qualify visitors, ask follow-up questions, and capture details — all without code.' },
    ],
  },
  {
    slug: 'customize-widget',
    cat: 'build',
    icon: Palette,
    title: 'Customizing your widget',
    excerpt: 'Match the widget to your brand — colours, logo, and tone.',
    body: [
      { h: 'Brand colour', p: 'Set your brand colour in the chatbot settings; the header, buttons, and bubbles update instantly.' },
      { h: 'Welcome message & tone', p: 'Edit the greeting and quick replies so the widget sounds like your brand.' },
      { h: 'Remove our badge', p: 'On Growth and Scale plans you can hide the “Powered by VartaBot” badge for a fully white-label look.' },
    ],
  },
  {
    slug: 'lead-capture',
    cat: 'leads',
    icon: Users,
    title: 'How lead capture works',
    excerpt: 'Collect names, emails, and phone numbers automatically.',
    body: [
      { h: 'Asking for details', p: 'Add a rule that asks for an email or phone number. When a visitor replies, VartaBot saves it as a lead.' },
      { h: 'Where leads go', p: 'Every captured lead appears in your Leads dashboard with its source bot and conversation.' },
      { h: 'Validation', p: 'Email and phone formats are validated automatically so you collect clean, usable data.' },
    ],
  },
  {
    slug: 'export-leads',
    cat: 'leads',
    icon: Download,
    title: 'Exporting & syncing leads',
    excerpt: 'Get your leads into a CSV or your CRM.',
    body: [
      { h: 'CSV export', p: 'From the Leads page, filter by status or source and export to CSV with one click.' },
      { h: 'CRM sync', p: 'Connect Zapier (or our REST API) to push new leads into HubSpot, Salesforce, Google Sheets and 50+ tools in real time.' },
    ],
  },
  {
    slug: 'live-agent-handoff',
    cat: 'leads',
    icon: Headset,
    title: 'Live agent handoff',
    excerpt: 'Transfer a conversation from the bot to a human.',
    body: [
      { h: 'When it triggers', p: 'Add a “Talk to a human” button or a fallback rule that hands off when the bot can’t help.' },
      { h: 'The agent inbox', p: 'Handed-off chats land in the Live Agent inbox where your team can reply in real time and pick up full context.' },
    ],
  },
  {
    slug: 'integrations',
    cat: 'build',
    icon: Puzzle,
    title: 'Integrations & Zapier',
    excerpt: 'Connect VartaBot to the tools your team already uses.',
    body: [
      { h: 'Native + Zapier', p: 'Drop the widget on any platform, and connect Slack, HubSpot, Google Sheets and more through Zapier.' },
      { h: 'Webhooks & API', p: 'Use webhooks to receive events (new lead, conversation completed) or the REST API to manage everything programmatically.' },
    ],
  },
  {
    slug: 'billing-plans',
    cat: 'account',
    icon: CreditCard,
    title: 'Billing & plans',
    excerpt: 'Change, upgrade, or cancel your plan anytime.',
    body: [
      { h: 'Change plan', p: 'Go to Settings → Billing to upgrade or downgrade. Changes are prorated automatically.' },
      { h: 'Cancel anytime', p: 'Plans are month-to-month with no lock-in, and every paid plan includes a 30-day money-back guarantee.' },
      { h: 'Free trial', p: 'Your 14-day trial needs no credit card. Add one only when you’re ready to keep going.' },
    ],
  },
  {
    slug: 'security-data',
    cat: 'security',
    icon: ShieldCheck,
    title: 'Security & data handling',
    excerpt: 'How we keep your data safe and compliant.',
    body: [
      { h: 'Encryption', p: 'All traffic is encrypted over SSL/TLS, and data is stored securely at rest.' },
      { h: 'Access control', p: 'Role-based access and audit-friendly logs keep your workspace controlled and traceable.' },
      { h: 'GDPR', p: 'We’re GDPR-conscious — you control what’s collected, and can export or delete lead data on request.' },
    ],
  },
]

export const docBySlug = Object.fromEntries(docs.map((d) => [d.slug, d]))
