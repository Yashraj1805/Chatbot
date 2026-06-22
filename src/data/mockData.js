// ---------------------------------------------------------------------------
// VartaBot — Mock data layer
// Everything in this file is static, frontend-only sample data. No backend,
// no API, no persistence. Swap these out for real API calls in a later phase.
// ---------------------------------------------------------------------------

import {
  MessageSquare,
  Zap,
  Palette,
  Code2,
  BarChart3,
  Users,
  ShieldCheck,
  Workflow,
  Headset,
  Globe,
  Clock,
} from 'lucide-react'

// ----------------------------- Current user --------------------------------
export const currentUser = {
  name: 'Harpreet Sachdev',
  email: 'harpreet@thesachdevgroup.com',
  role: 'Owner',
  company: 'The Sachdev Group',
  avatar: null, // null → render initials
  plan: 'Growth',
}

// --------------------------- Dashboard summary ------------------------------
export const dashboardStats = [
  { id: 'chatbots', label: 'Total Chatbots', value: 6, delta: '+2', trend: 'up', period: 'this month' },
  { id: 'rules', label: 'Total Rules', value: 148, delta: '+23', trend: 'up', period: 'this month' },
  { id: 'conversations', label: 'Conversations', value: '12,480', delta: '+18%', trend: 'up', period: 'vs last month' },
  { id: 'leads', label: 'Leads Captured', value: 932, delta: '+9%', trend: 'up', period: 'vs last month' },
]

// Tiny sparkline-friendly series (conversations per day, last 14 days)
export const conversationsSeries = [
  120, 145, 138, 162, 180, 175, 210, 198, 240, 232, 268, 255, 290, 312,
]

export const recentActivity = [
  { id: 1, type: 'lead', title: 'New lead captured', detail: 'Aisha Khan via Sales Assistant', time: '2 minutes ago' },
  { id: 2, type: 'conversation', title: 'Conversation completed', detail: 'Support Bot — 6 messages', time: '14 minutes ago' },
  { id: 3, type: 'rule', title: 'Rule updated', detail: '“Pricing” response edited by you', time: '1 hour ago' },
  { id: 4, type: 'chatbot', title: 'Chatbot published', detail: 'Onboarding Helper went live', time: '3 hours ago' },
  { id: 5, type: 'lead', title: 'New lead captured', detail: 'Marco Rossi via Website Bot', time: '5 hours ago' },
  { id: 6, type: 'conversation', title: 'Conversation completed', detail: 'Sales Assistant — 9 messages', time: 'Yesterday' },
  { id: 7, type: 'rule', title: 'Rule created', detail: '“Refund policy” added to Support Bot', time: 'Yesterday' },
]

// ------------------------------- Chatbots -----------------------------------
export const chatbots = [
  {
    id: 'bot_01',
    name: 'Sales Assistant',
    description: 'Qualifies visitors and books demo calls for the sales team.',
    status: 'active',
    themeColor: '#4f46e5',
    welcomeMessage: '👋 Hi there! Looking to grow your business? I can help.',
    rules: 32,
    conversations: 4120,
    leads: 412,
    updatedAt: '2026-06-15',
    website: 'sachdevgroup.com',
  },
  {
    id: 'bot_02',
    name: 'Support Bot',
    description: 'Answers common support questions and routes tickets.',
    status: 'active',
    themeColor: '#0ea5e9',
    welcomeMessage: 'Hi! Need a hand? Ask me anything about your account.',
    rules: 41,
    conversations: 5230,
    leads: 188,
    updatedAt: '2026-06-14',
    website: 'help.sachdevgroup.com',
  },
  {
    id: 'bot_03',
    name: 'Onboarding Helper',
    description: 'Guides new customers through their first 7 days.',
    status: 'active',
    themeColor: '#10b981',
    welcomeMessage: 'Welcome aboard! Let me show you around. 🚀',
    rules: 28,
    conversations: 1840,
    leads: 96,
    updatedAt: '2026-06-12',
    website: 'app.sachdevgroup.com',
  },
  {
    id: 'bot_04',
    name: 'Website Bot',
    description: 'General-purpose greeter for the marketing site.',
    status: 'paused',
    themeColor: '#f59e0b',
    welcomeMessage: 'Hey! 👋 What brings you in today?',
    rules: 22,
    conversations: 980,
    leads: 142,
    updatedAt: '2026-06-08',
    website: 'sachdevgroup.com',
  },
  {
    id: 'bot_05',
    name: 'Pricing Concierge',
    description: 'Explains plans and answers billing questions.',
    status: 'draft',
    themeColor: '#ec4899',
    welcomeMessage: 'Curious about pricing? I can break it down for you.',
    rules: 15,
    conversations: 0,
    leads: 0,
    updatedAt: '2026-06-16',
    website: '—',
  },
  {
    id: 'bot_06',
    name: 'Event Registration',
    description: 'Collects sign-ups for the summer product webinar.',
    status: 'active',
    themeColor: '#8b5cf6',
    welcomeMessage: 'Saving your spot for the webinar — let’s get a few details!',
    rules: 10,
    conversations: 310,
    leads: 94,
    updatedAt: '2026-06-11',
    website: 'events.sachdevgroup.com',
  },
]

export const chatbotStatuses = ['all', 'active', 'paused', 'draft']

// --------------------------------- Rules ------------------------------------
export const rules = [
  { id: 'r_01', botId: 'bot_01', trigger: 'pricing, cost, how much, plans', response: 'Our plans start at $29/mo. Want me to walk you through what each tier includes?', type: 'keyword', status: 'active', hits: 1240 },
  { id: 'r_02', botId: 'bot_01', trigger: 'demo, book a call, talk to sales', response: 'Great! Let’s find a time. What’s your work email so I can send a calendar invite?', type: 'keyword', status: 'active', hits: 860 },
  { id: 'r_03', botId: 'bot_02', trigger: 'reset password, can’t log in, locked out', response: 'No problem — head to Settings → Security → Reset Password. Want the direct link?', type: 'keyword', status: 'active', hits: 642 },
  { id: 'r_04', botId: 'bot_02', trigger: 'refund, money back, cancel', response: 'You’re covered by our 30-day money-back guarantee. Should I connect you with billing?', type: 'keyword', status: 'active', hits: 410 },
  { id: 'r_05', botId: 'bot_01', trigger: 'Button: Talk to Sales', response: 'Connecting you with our sales team. First, what size is your company?', type: 'button', status: 'active', hits: 521 },
  { id: 'r_06', botId: 'bot_02', trigger: 'Button: Contact Support', response: 'Here are your support options: 📚 Help Center · ✉️ Email us · 💬 Live chat', type: 'button', status: 'active', hits: 980 },
  { id: 'r_07', botId: 'bot_03', trigger: 'getting started, setup, first steps', response: 'Let’s get you set up in 3 steps: 1) Create a bot 2) Add rules 3) Embed the widget.', type: 'keyword', status: 'active', hits: 230 },
  { id: 'r_08', botId: 'bot_04', trigger: 'contact, phone, email, address', response: '📞 +1 (555) 010-2040 · ✉️ hello@sachdevgroup.com · 🏢 San Francisco, CA', type: 'keyword', status: 'paused', hits: 120 },
  { id: 'r_09', botId: 'bot_06', trigger: 'webinar, register, sign up', response: 'Awesome! The webinar is June 28 at 11am PT. What name should I register?', type: 'keyword', status: 'active', hits: 88 },
  { id: 'r_10', botId: 'bot_02', trigger: 'fallback', response: 'I’m not sure I caught that — could you rephrase, or pick an option below?', type: 'fallback', status: 'active', hits: 1530 },
]

export const ruleTypes = ['keyword', 'button', 'fallback', 'flow']

// ----------------------------- Conversations --------------------------------
export const conversations = [
  {
    id: 'c_01',
    botId: 'bot_01',
    botName: 'Sales Assistant',
    visitor: 'Visitor #4821',
    channel: 'Website',
    startedAt: '2026-06-17 09:42',
    messageCount: 8,
    status: 'completed',
    capturedLead: true,
    messages: [
      { from: 'bot', text: '👋 Hi there! Looking to grow your business? I can help.', time: '09:42' },
      { from: 'user', text: 'How much does the platform cost?', time: '09:42' },
      { from: 'bot', text: 'Our plans start at $29/mo. Want me to walk you through what each tier includes?', time: '09:43' },
      { from: 'user', text: 'Yes please', time: '09:43' },
      { from: 'bot', text: 'Starter ($29), Growth ($79), and Scale ($199). Shall I book a quick demo?', time: '09:43' },
      { from: 'user', text: 'Sure, book a demo', time: '09:44' },
      { from: 'bot', text: 'Great! What’s your work email so I can send a calendar invite?', time: '09:44' },
      { from: 'user', text: 'aisha@brightlabs.io', time: '09:45' },
    ],
  },
  {
    id: 'c_02',
    botId: 'bot_02',
    botName: 'Support Bot',
    visitor: 'Visitor #4820',
    channel: 'Website',
    startedAt: '2026-06-17 09:20',
    messageCount: 6,
    status: 'completed',
    capturedLead: false,
    messages: [
      { from: 'bot', text: 'Hi! Need a hand? Ask me anything about your account.', time: '09:20' },
      { from: 'user', text: 'I can’t log in', time: '09:20' },
      { from: 'bot', text: 'No problem — head to Settings → Security → Reset Password. Want the direct link?', time: '09:21' },
      { from: 'user', text: 'yes', time: '09:21' },
      { from: 'bot', text: 'Here you go: app.sachdevgroup.com/reset. Anything else?', time: '09:21' },
      { from: 'user', text: 'That worked, thanks!', time: '09:22' },
    ],
  },
  {
    id: 'c_03',
    botId: 'bot_03',
    botName: 'Onboarding Helper',
    visitor: 'Visitor #4815',
    channel: 'App',
    startedAt: '2026-06-17 08:05',
    messageCount: 5,
    status: 'active',
    capturedLead: false,
    messages: [
      { from: 'bot', text: 'Welcome aboard! Let me show you around. 🚀', time: '08:05' },
      { from: 'user', text: 'How do I create my first bot?', time: '08:06' },
      { from: 'bot', text: 'Let’s get you set up in 3 steps: 1) Create a bot 2) Add rules 3) Embed the widget.', time: '08:06' },
      { from: 'user', text: 'Got it', time: '08:07' },
      { from: 'bot', text: 'Want me to open the Create Chatbot page for you?', time: '08:07' },
    ],
  },
  {
    id: 'c_04',
    botId: 'bot_06',
    botName: 'Event Registration',
    visitor: 'Visitor #4810',
    channel: 'Website',
    startedAt: '2026-06-16 17:30',
    messageCount: 4,
    status: 'completed',
    capturedLead: true,
    messages: [
      { from: 'bot', text: 'Saving your spot for the webinar — let’s get a few details!', time: '17:30' },
      { from: 'user', text: 'I want to register', time: '17:30' },
      { from: 'bot', text: 'Awesome! The webinar is June 28 at 11am PT. What name should I register?', time: '17:31' },
      { from: 'user', text: 'Marco Rossi', time: '17:31' },
    ],
  },
  {
    id: 'c_05',
    botId: 'bot_01',
    botName: 'Sales Assistant',
    visitor: 'Visitor #4802',
    channel: 'Website',
    startedAt: '2026-06-16 14:12',
    messageCount: 3,
    status: 'abandoned',
    capturedLead: false,
    messages: [
      { from: 'bot', text: '👋 Hi there! Looking to grow your business? I can help.', time: '14:12' },
      { from: 'user', text: 'just browsing', time: '14:12' },
      { from: 'bot', text: 'No worries! I’m here if you need anything. 😊', time: '14:13' },
    ],
  },
]

// -------------------------------- Leads -------------------------------------
export const leads = [
  { id: 'l_01', name: 'Aisha Khan', email: 'aisha@brightlabs.io', phone: '+1 (555) 204-8810', date: '2026-06-17', source: 'Sales Assistant', status: 'new' },
  { id: 'l_02', name: 'Marco Rossi', email: 'marco@rossimedia.it', phone: '+39 320 998 2210', date: '2026-06-16', source: 'Event Registration', status: 'new' },
  { id: 'l_03', name: 'Priya Patel', email: 'priya@patelco.com', phone: '+1 (555) 771-3320', date: '2026-06-16', source: 'Website Bot', status: 'contacted' },
  { id: 'l_04', name: 'James Wright', email: 'james.wright@northstar.co', phone: '+44 7700 900123', date: '2026-06-15', source: 'Sales Assistant', status: 'qualified' },
  { id: 'l_05', name: 'Lena Müller', email: 'lena@muellerdesign.de', phone: '+49 151 23456789', date: '2026-06-15', source: 'Support Bot', status: 'contacted' },
  { id: 'l_06', name: 'Diego Fernández', email: 'diego@fernandez.mx', phone: '+52 55 1234 5678', date: '2026-06-14', source: 'Website Bot', status: 'new' },
  { id: 'l_07', name: 'Sara Lindqvist', email: 'sara@lindqvist.se', phone: '+46 70 123 4567', date: '2026-06-13', source: 'Event Registration', status: 'qualified' },
  { id: 'l_08', name: 'Tom Becker', email: 'tom.becker@beckerfit.com', phone: '+1 (555) 660-1199', date: '2026-06-12', source: 'Sales Assistant', status: 'lost' },
]

export const leadStatuses = ['all', 'new', 'contacted', 'qualified', 'lost']

// ------------------------- Landing page content -----------------------------
export const features = [
  { icon: Workflow, title: 'Visual rule builder', description: 'Map triggers to responses with a clean, no-code editor. Keywords, buttons, and full flows.' },
  { icon: Palette, title: 'Fully branded widget', description: 'Match your colors, logo, and tone. Your chatbot, your brand — pixel perfect.' },
  { icon: Code2, title: 'One-line install', description: 'Drop a single script tag on any site. Live in under two minutes, no developer needed.' },
  { icon: Users, title: 'Lead capture', description: 'Collect names, emails, and phone numbers automatically, then export or sync them.' },
  { icon: BarChart3, title: 'Conversation analytics', description: 'See what visitors ask, where they drop off, and which rules convert best.' },
  { icon: ShieldCheck, title: 'Enterprise-ready', description: 'Role-based access, audit-friendly logs, and GDPR-conscious data handling.' },
  { icon: Headset, title: 'Live agent handoff', description: 'Transfer a conversation from the bot to a human agent the moment it’s needed.' },
  { icon: Globe, title: 'Works everywhere', description: 'Drop the widget on WordPress, Shopify, Webflow, or any site — no plugin required.' },
  { icon: Clock, title: '24/7 availability', description: 'Greet and qualify visitors around the clock, even while your team sleeps.' },
]

export const howItWorks = [
  { step: '01', icon: MessageSquare, title: 'Create your chatbot', description: 'Name it, pick a brand color, and write a welcome message. No code required.' },
  { step: '02', icon: Zap, title: 'Define rules & responses', description: 'Tell the bot what to say when visitors use certain keywords or tap buttons.' },
  { step: '03', icon: Code2, title: 'Embed & go live', description: 'Copy the embed snippet, paste it on your site, and start capturing leads.' },
]

export const pricingPlans = [
  {
    name: 'Starter',
    price: 99,
    tagline: 'For solo founders & small sites',
    features: ['1 chatbot', '50 rules', 'Unlimited conversations', 'Lead capture', 'Email support'],
    cta: 'Start free trial',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: 599,
    tagline: 'For growing teams',
    features: ['5 chatbots', 'Unlimited rules', 'Unlimited conversations', '2 live agent seats', 'Lead capture + CSV export', 'Conversation analytics', 'Remove VartaBot badge', 'Priority support'],
    cta: 'Start free trial',
    highlighted: true,
  },
  {
    name: 'Scale',
    price: 999,
    tagline: 'For high-traffic businesses',
    features: ['Unlimited chatbots', 'Unlimited rules', 'Unlimited conversations', '10 live agent seats', 'CRM integration (export + sync)', 'Done-for-you AI chatbot setup by our team', 'Team roles & permissions', 'Dedicated success manager'],
    cta: 'Contact sales',
    highlighted: false,
  },
]

export const testimonials = [
  { name: 'Olivia Bennett', role: 'Head of Growth, BrightLabs', quote: 'We replaced our clunky help form with VartaBot and tripled qualified leads in a month. Setup took ten minutes.', avatar: 'OB' },
  { name: 'Raj Malhotra', role: 'Founder, Northwind Apps', quote: 'Finally a chatbot tool that non-engineers on my team can actually manage. The rule builder is brilliant.', avatar: 'RM' },
  { name: 'Camila Torres', role: 'CX Lead, Lumen Retail', quote: 'Our support volume dropped 40%. Visitors get answers instantly and we capture every lead automatically.', avatar: 'CT' },
  { name: 'Daniel Cho', role: 'CEO, Stackmint', quote: 'The branded widget looks like we built it in-house. Our customers have no idea it’s VartaBot under the hood.', avatar: 'DC' },
]

export const faqs = [
  { q: 'Do I need to know how to code?', a: 'Not at all. VartaBot is built for non-technical teams. You create rules visually and install the widget with a single copy-paste snippet.' },
  { q: 'Is this an AI chatbot?', a: 'This version is rule-based — it responds to keywords, buttons, and predefined flows you configure. That makes it fast, predictable, and fully under your control.' },
  { q: 'How long does setup take?', a: 'Most customers go live in under 15 minutes: create a bot, add a few rules, and paste the embed code on your site.' },
  { q: 'Can I match my brand?', a: 'Yes. You control the colors, logo, welcome message, and tone so the widget feels native to your website.' },
  { q: 'Where are my leads stored?', a: 'Captured leads appear in your dashboard where you can review, filter, and export them. CRM sync is on the roadmap.' },
  { q: 'Can I cancel anytime?', a: 'Absolutely. Plans are month-to-month with no lock-in, and every paid plan includes a 30-day money-back guarantee.' },
]

// ------------------------------- Trust logos --------------------------------
// Lightweight stand-in "customer" brands shown in the hero logo strip.
export const trustLogos = ['BrightLabs', 'Northwind', 'Lumen', 'Stackmint', 'Rossi Media', 'Patel & Co']

// -------------------------------- Stats band --------------------------------
export const brandStats = [
  { value: '12k+', label: 'Businesses onboarded' },
  { value: '8M+', label: 'Conversations handled' },
  { value: '42%', label: 'Avg. support load reduced' },
  { value: '<15 min', label: 'Average time to go live' },
]

// ------------------------------- Integrations -------------------------------
// `slug` maps to the Simple Icons CDN (https://cdn.simpleicons.org/<slug>) so we
// render the real, brand-coloured logo for each platform.
export const integrations = [
  { name: 'WordPress', slug: 'wordpress' },
  { name: 'Shopify', slug: 'shopify' },
  { name: 'Webflow', slug: 'webflow' },
  { name: 'Wix', slug: 'wix' },
  { name: 'Slack', inline: 'slack' }, // Simple Icons removed Slack — use inline SVG
  { name: 'Zapier', slug: 'zapier' },
  { name: 'HubSpot', slug: 'hubspot' },
  { name: 'Squarespace', slug: 'squarespace' },
]

// ------------------------- Comparison (vs others) ---------------------------
export const comparison = {
  rows: [
    { label: 'No-code visual rule builder', us: true, them: 'limited' },
    { label: 'Go live in under 15 minutes', us: true, them: false },
    { label: 'Fully branded widget — remove our badge', us: true, them: false },
    { label: 'Built-in lead capture & export', us: true, them: true },
    { label: 'Live agent handoff', us: true, them: 'limited' },
    { label: 'Simple flat pricing — no per-chat fees', us: true, them: false },
    { label: 'Works on any site, no plugin', us: true, them: true },
  ],
}

// ---------------------- Widget preview default config -----------------------
export const widgetPreviewMessages = [
  { from: 'bot', text: '👋 Hi there! Looking to grow your business? I can help.' },
  { from: 'user', text: 'What can you do?' },
  { from: 'bot', text: 'I can answer questions about pricing, support, and book you a demo. What would you like?' },
]

export const widgetQuickReplies = ['💰 Pricing', '🛟 Support', '📅 Book a demo']

// ------------------------------ Embed snippet -------------------------------
export const embedSnippet = `<!-- VartaBot widget -->
<script>
  (function (w, d) {
    w.VartaBot = w.VartaBot || {};
    w.VartaBot.id = "wgt_8f3a91c0";
    var s = d.createElement("script");
    s.async = true;
    s.src = "https://cdn.vartabot.in/widget.js";
    d.head.appendChild(s);
  })(window, document);
</script>`
