// ---------------------------------------------------------------------------
// VartaBot — Multi-portal mock data (Super Admin · Customer · Live Agent)
// Frontend-only sample data. No backend, no persistence.
// ---------------------------------------------------------------------------

// ============================= USERS / IDENTITIES ==========================
export const adminUser = {
  name: 'Alex Morgan',
  email: 'alex@vartabot.in',
  role: 'Super Admin',
  company: 'VartaBot, Inc.',
  avatar: null,
}

export const agentUser = {
  name: 'Sam Rivera',
  email: 'sam@thesachdevgroup.com',
  role: 'Live Agent',
  company: 'The Sachdev Group',
  status: 'online',
  avatar: null,
}

// ============================= SUPER ADMIN PORTAL ==========================
export const platformStats = [
  { id: 'customers', label: 'Total Customers', value: '1,284', delta: '+64', trend: 'up', period: 'this month' },
  { id: 'chatbots', label: 'Total Chatbots', value: '4,910', delta: '+213', trend: 'up', period: 'this month' },
  { id: 'conversations', label: 'Conversations', value: '1.42M', delta: '+12%', trend: 'up', period: 'vs last month' },
  { id: 'agents', label: 'Total Agents', value: '3,672', delta: '+88', trend: 'up', period: 'this month' },
  { id: 'leads', label: 'Leads Captured', value: '218K', delta: '+9%', trend: 'up', period: 'vs last month' },
  { id: 'revenue', label: 'Monthly Revenue', value: '$184,920', delta: '+7.4%', trend: 'up', period: 'MRR' },
  { id: 'subscriptions', label: 'Active Subscriptions', value: '1,106', delta: '+41', trend: 'up', period: 'this month' },
  { id: 'churn', label: 'Churn Rate', value: '1.8%', delta: '-0.3%', trend: 'up', period: 'vs last month' },
]

export const customers = [
  { id: 'cus_01', company: 'BrightLabs', owner: 'Olivia Bennett', email: 'olivia@brightlabs.io', plan: 'Scale', status: 'active', chatbots: 8, conversations: 48210, leads: 3120, agents: 12, mrr: 199, joined: '2025-02-14', country: 'United States' },
  { id: 'cus_02', company: 'Northwind Apps', owner: 'Raj Malhotra', email: 'raj@northwind.app', plan: 'Growth', status: 'active', chatbots: 4, conversations: 18430, leads: 1024, agents: 5, mrr: 79, joined: '2025-04-02', country: 'India' },
  { id: 'cus_03', company: 'Lumen Retail', owner: 'Camila Torres', email: 'camila@lumen.shop', plan: 'Scale', status: 'active', chatbots: 11, conversations: 92010, leads: 6540, agents: 18, mrr: 199, joined: '2024-11-20', country: 'Mexico' },
  { id: 'cus_04', company: 'Stackmint', owner: 'Daniel Cho', email: 'daniel@stackmint.co', plan: 'Growth', status: 'suspended', chatbots: 3, conversations: 8120, leads: 410, agents: 3, mrr: 79, joined: '2025-06-01', country: 'South Korea' },
  { id: 'cus_05', company: 'Rossi Media', owner: 'Marco Rossi', email: 'marco@rossimedia.it', plan: 'Starter', status: 'active', chatbots: 1, conversations: 2310, leads: 142, agents: 1, mrr: 29, joined: '2025-05-18', country: 'Italy' },
  { id: 'cus_06', company: 'Müller Design', owner: 'Lena Müller', email: 'lena@muellerdesign.de', plan: 'Growth', status: 'inactive', chatbots: 2, conversations: 5400, leads: 230, agents: 2, mrr: 0, joined: '2025-01-09', country: 'Germany' },
  { id: 'cus_07', company: 'Northstar Co', owner: 'James Wright', email: 'james@northstar.co', plan: 'Scale', status: 'active', chatbots: 9, conversations: 61200, leads: 4120, agents: 14, mrr: 199, joined: '2024-09-30', country: 'United Kingdom' },
  { id: 'cus_08', company: 'Lindqvist AB', owner: 'Sara Lindqvist', email: 'sara@lindqvist.se', plan: 'Starter', status: 'active', chatbots: 1, conversations: 1840, leads: 96, agents: 1, mrr: 29, joined: '2025-06-10', country: 'Sweden' },
  { id: 'cus_09', company: 'Becker Fit', owner: 'Tom Becker', email: 'tom@beckerfit.com', plan: 'Growth', status: 'suspended', chatbots: 2, conversations: 3120, leads: 188, agents: 2, mrr: 79, joined: '2025-03-22', country: 'United States' },
  { id: 'cus_10', company: 'Fernández MX', owner: 'Diego Fernández', email: 'diego@fernandez.mx', plan: 'Growth', status: 'active', chatbots: 5, conversations: 22400, leads: 1340, agents: 6, mrr: 79, joined: '2025-02-28', country: 'Mexico' },
  { id: 'cus_11', company: 'Patel & Co', owner: 'Priya Patel', email: 'priya@patelco.com', plan: 'Scale', status: 'active', chatbots: 7, conversations: 38900, leads: 2510, agents: 9, mrr: 199, joined: '2024-12-15', country: 'India' },
  { id: 'cus_12', company: 'The Sachdev Group', owner: 'Harpreet Sachdev', email: 'harpreet@thesachdevgroup.com', plan: 'Growth', status: 'active', chatbots: 6, conversations: 12480, leads: 932, agents: 4, mrr: 79, joined: '2025-05-01', country: 'United States' },
]

export const customerStatuses = ['all', 'active', 'suspended', 'inactive']

// Billing rows for subscription management
export const billingOverview = [
  { id: 'inv_01', customer: 'Lumen Retail', plan: 'Scale', amount: 199, status: 'paid', date: '2026-06-01', next: '2026-07-01' },
  { id: 'inv_02', customer: 'BrightLabs', plan: 'Scale', amount: 199, status: 'paid', date: '2026-06-01', next: '2026-07-01' },
  { id: 'inv_03', customer: 'Northstar Co', plan: 'Scale', amount: 199, status: 'paid', date: '2026-06-02', next: '2026-07-02' },
  { id: 'inv_04', customer: 'Northwind Apps', plan: 'Growth', amount: 79, status: 'paid', date: '2026-06-03', next: '2026-07-03' },
  { id: 'inv_05', customer: 'Stackmint', plan: 'Growth', amount: 79, status: 'overdue', date: '2026-05-20', next: '2026-06-20' },
  { id: 'inv_06', customer: 'Becker Fit', plan: 'Growth', amount: 79, status: 'failed', date: '2026-06-05', next: '2026-07-05' },
  { id: 'inv_07', customer: 'Rossi Media', plan: 'Starter', amount: 29, status: 'paid', date: '2026-06-07', next: '2026-07-07' },
  { id: 'inv_08', customer: 'The Sachdev Group', plan: 'Growth', amount: 79, status: 'paid', date: '2026-06-09', next: '2026-07-09' },
]

// Platform-wide chatbot monitoring
export const monitoredChatbots = [
  { id: 'm_01', name: 'Sales Assistant', customer: 'BrightLabs', status: 'active', conversations: 12400, health: 98 },
  { id: 'm_02', name: 'Support Bot', customer: 'Lumen Retail', status: 'active', conversations: 28900, health: 95 },
  { id: 'm_03', name: 'Onboarding Helper', customer: 'Northwind Apps', status: 'active', conversations: 6120, health: 91 },
  { id: 'm_04', name: 'Returns Bot', customer: 'Lumen Retail', status: 'degraded', conversations: 14200, health: 72 },
  { id: 'm_05', name: 'Lead Capture', customer: 'Northstar Co', status: 'active', conversations: 9800, health: 99 },
  { id: 'm_06', name: 'Billing Bot', customer: 'Stackmint', status: 'down', conversations: 320, health: 18 },
  { id: 'm_07', name: 'Concierge', customer: 'Patel & Co', status: 'active', conversations: 17600, health: 94 },
  { id: 'm_08', name: 'Event Bot', customer: 'Rossi Media', status: 'paused', conversations: 1240, health: 64 },
]

// Daily / monthly series used by admin analytics charts
export const adminSeries = {
  dailyConversations: [
    { label: 'Mon', value: 42100 },
    { label: 'Tue', value: 47800 },
    { label: 'Wed', value: 51200 },
    { label: 'Thu', value: 49800 },
    { label: 'Fri', value: 58900 },
    { label: 'Sat', value: 38400 },
    { label: 'Sun', value: 34100 },
  ],
  monthlyLeads: [
    { label: 'Jan', value: 12400 },
    { label: 'Feb', value: 14800 },
    { label: 'Mar', value: 16200 },
    { label: 'Apr', value: 18900 },
    { label: 'May', value: 21500 },
    { label: 'Jun', value: 24800 },
  ],
  revenueGrowth: [
    { label: 'Jan', value: 121000 },
    { label: 'Feb', value: 134000 },
    { label: 'Mar', value: 142000 },
    { label: 'Apr', value: 158000 },
    { label: 'May', value: 171000 },
    { label: 'Jun', value: 184920 },
  ],
  planDistribution: [
    { label: 'Starter', value: 412, color: '#94a3b8' },
    { label: 'Growth', value: 528, color: '#6366f1' },
    { label: 'Scale', value: 166, color: '#10b981' },
  ],
}

// ============================= AGENTS (shared) =============================
export const agents = [
  { id: 'ag_01', name: 'Sam Rivera', email: 'sam@thesachdevgroup.com', status: 'online', chatsHandled: 1240, resolutionRate: 94, avgResponse: '42s', assignedBots: ['Sales Assistant', 'Support Bot'], role: 'Senior Agent' },
  { id: 'ag_02', name: 'Nina Kapoor', email: 'nina@thesachdevgroup.com', status: 'online', chatsHandled: 980, resolutionRate: 91, avgResponse: '55s', assignedBots: ['Support Bot'], role: 'Agent' },
  { id: 'ag_03', name: 'Leo Schmidt', email: 'leo@thesachdevgroup.com', status: 'away', chatsHandled: 612, resolutionRate: 88, avgResponse: '1m 10s', assignedBots: ['Onboarding Helper'], role: 'Agent' },
  { id: 'ag_04', name: 'Maya Okafor', email: 'maya@thesachdevgroup.com', status: 'offline', chatsHandled: 1430, resolutionRate: 96, avgResponse: '38s', assignedBots: ['Sales Assistant', 'Event Registration'], role: 'Team Lead' },
  { id: 'ag_05', name: 'Carlos Díaz', email: 'carlos@thesachdevgroup.com', status: 'offline', chatsHandled: 410, resolutionRate: 85, avgResponse: '1m 32s', assignedBots: [], role: 'Agent' },
]

export const agentStatuses = ['all', 'online', 'away', 'offline']

export const agentDashboardStats = [
  { id: 'assigned', label: 'Assigned Chats', value: 7, delta: '+3', trend: 'up', period: 'today' },
  { id: 'active', label: 'Active Chats', value: 3, delta: '+1', trend: 'up', period: 'right now' },
  { id: 'closed', label: 'Closed Today', value: 24, delta: '+6', trend: 'up', period: 'today' },
  { id: 'response', label: 'Avg Response', value: '42s', delta: '-8s', trend: 'up', period: 'today' },
]

export const agentPerformance = {
  chatsHandled: [
    { label: 'Mon', value: 18 },
    { label: 'Tue', value: 22 },
    { label: 'Wed', value: 26 },
    { label: 'Thu', value: 19 },
    { label: 'Fri', value: 31 },
    { label: 'Sat', value: 12 },
    { label: 'Sun', value: 9 },
  ],
  resolutionRate: 94,
  avgResponse: '42s',
  satisfaction: 4.8,
  csatTrend: [88, 90, 89, 92, 94, 93, 95],
}

// ====================== LIVE AGENT INBOX (chats) ===========================
export const quickResponses = [
  { id: 'qr_01', shortcut: '/greet', title: 'Greeting', text: 'Hi! Thanks for reaching out. My name is Sam — how can I help you today?' },
  { id: 'qr_02', shortcut: '/wait', title: 'Ask to wait', text: 'Thanks for your patience! Let me look into that for you — one moment please.' },
  { id: 'qr_03', shortcut: '/pricing', title: 'Pricing', text: 'Our plans start at ₹999/month. I can share a full breakdown if that helps!' },
  { id: 'qr_04', shortcut: '/refund', title: 'Refund policy', text: 'You’re covered by our 30-day money-back guarantee. Would you like me to start a refund?' },
  { id: 'qr_05', shortcut: '/bye', title: 'Closing', text: 'Glad I could help! Is there anything else I can do for you before we wrap up?' },
  { id: 'qr_06', shortcut: '/escalate', title: 'Escalation', text: 'I’m escalating this to a specialist who can dig deeper. They’ll be with you shortly.' },
]

export const agentInbox = [
  {
    id: 'chat_01',
    customer: { name: 'Aisha Khan', email: 'aisha@brightlabs.io', phone: '+1 (555) 204-8810', location: 'New York, US' },
    bot: 'Sales Assistant',
    status: 'active',
    unread: 2,
    waitingSince: '2m',
    lead: { interest: 'Enterprise plan', budget: '$5k+/mo', stage: 'Qualified' },
    messages: [
      { from: 'bot', text: '👋 Hi there! Looking to grow your business? I can help.', time: '10:01' },
      { from: 'customer', text: 'I want to talk to a real person about enterprise pricing', time: '10:02' },
      { from: 'system', text: 'Conversation transferred to Sam Rivera', time: '10:02' },
      { from: 'agent', text: 'Hi Aisha! I’m Sam. Happy to help with enterprise pricing — how many seats are you thinking?', time: '10:03' },
      { from: 'customer', text: 'Around 50 to start, scaling to 200', time: '10:04' },
    ],
  },
  {
    id: 'chat_02',
    customer: { name: 'Marco Rossi', email: 'marco@rossimedia.it', phone: '+39 320 998 2210', location: 'Milan, IT' },
    bot: 'Support Bot',
    status: 'waiting',
    unread: 1,
    waitingSince: '5m',
    lead: { interest: 'Integration help', budget: '—', stage: 'Customer' },
    messages: [
      { from: 'bot', text: 'Hi! Need a hand? Ask me anything about your account.', time: '09:48' },
      { from: 'customer', text: 'My widget isn’t showing on mobile', time: '09:49' },
      { from: 'system', text: 'Conversation transferred to Sam Rivera', time: '09:49' },
      { from: 'customer', text: 'Are you there?', time: '09:54' },
    ],
  },
  {
    id: 'chat_03',
    customer: { name: 'Priya Patel', email: 'priya@patelco.com', phone: '+1 (555) 771-3320', location: 'Austin, US' },
    bot: 'Website Bot',
    status: 'new',
    unread: 1,
    waitingSince: '30s',
    lead: { interest: 'Demo request', budget: 'Unknown', stage: 'New' },
    messages: [
      { from: 'bot', text: 'Hey! 👋 What brings you in today?', time: '10:10' },
      { from: 'customer', text: 'Can someone walk me through the product?', time: '10:11' },
      { from: 'system', text: 'Conversation transferred to support queue', time: '10:11' },
    ],
  },
  {
    id: 'chat_04',
    customer: { name: 'James Wright', email: 'james@northstar.co', phone: '+44 7700 900123', location: 'London, UK' },
    bot: 'Sales Assistant',
    status: 'active',
    unread: 0,
    waitingSince: '8m',
    lead: { interest: 'Annual contract', budget: '$2k/mo', stage: 'Negotiation' },
    messages: [
      { from: 'agent', text: 'Hi James — following up on the annual contract. Did the proposal land okay?', time: '09:30' },
      { from: 'customer', text: 'Yes, reviewing with my team now', time: '09:41' },
      { from: 'customer', text: 'Quick question on the SLA terms', time: '09:42' },
    ],
  },
  {
    id: 'chat_05',
    customer: { name: 'Lena Müller', email: 'lena@muellerdesign.de', phone: '+49 151 23456789', location: 'Berlin, DE' },
    bot: 'Support Bot',
    status: 'closed',
    unread: 0,
    waitingSince: '—',
    lead: { interest: 'Billing question', budget: '—', stage: 'Customer' },
    messages: [
      { from: 'customer', text: 'I was double charged this month', time: 'Yesterday' },
      { from: 'agent', text: 'So sorry about that! I’ve issued a refund — it’ll land in 3–5 days.', time: 'Yesterday' },
      { from: 'customer', text: 'Perfect, thank you!', time: 'Yesterday' },
      { from: 'system', text: 'Chat closed by Sam Rivera', time: 'Yesterday' },
    ],
  },
]

export const inboxStatuses = ['all', 'new', 'active', 'waiting', 'closed']

// Rule categories (used by the Customer rule builder)
export const ruleCategories = ['General', 'Sales', 'Support', 'Billing', 'Onboarding']

// Customer-portal analytics
export const customerAnalytics = {
  conversations: [
    { label: 'Mon', value: 320 },
    { label: 'Tue', value: 410 },
    { label: 'Wed', value: 380 },
    { label: 'Thu', value: 460 },
    { label: 'Fri', value: 520 },
    { label: 'Sat', value: 290 },
    { label: 'Sun', value: 240 },
  ],
  responseRate: 92,
  agentTransfers: 184,
  leadsByBot: [
    { label: 'Sales Assistant', value: 412, color: '#4f46e5' },
    { label: 'Support Bot', value: 188, color: '#0ea5e9' },
    { label: 'Website Bot', value: 142, color: '#f59e0b' },
    { label: 'Event Registration', value: 94, color: '#8b5cf6' },
    { label: 'Onboarding Helper', value: 96, color: '#10b981' },
  ],
}
