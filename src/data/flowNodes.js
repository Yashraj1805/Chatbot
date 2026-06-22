// ---------------------------------------------------------------------------
// Flow builder — node catalog
// Defines every node type the visual chatbot flow builder supports: which
// category it belongs to, its icon/color, default data, and the fields shown
// in the right-hand properties panel. Frontend-only / mock.
// ---------------------------------------------------------------------------
import {
  MessageSquare,
  HelpCircle,
  Split,
  MousePointerClick,
  List,
  CornerUpRight,
  Sparkles,
  Bell,
  BellOff,
  PencilLine,
  Tags,
  Users,
  UserCheck,
  Bot,
  CircleDot,
  LayoutTemplate,
  Clock,
  MessageCircle,
  Webhook,
  Sheet,
  Library,
  Layers,
  Package,
} from 'lucide-react'

// Accent color per category (used for node headers, palette, handles)
export const categoryAccent = {
  Messages: '#4f46e5', // indigo
  Operations: '#8b5cf6', // violet
  Integrations: '#0d9488', // teal
}

// Field schema types supported by the properties panel:
//   text | textarea | number | select | tags
export const flowCatalog = {
  // ----------------------------- Messages -----------------------------
  send_message: {
    category: 'Messages',
    label: 'Send a message',
    sub: 'With no response required from visitor',
    icon: MessageSquare,
    primary: 'message',
    defaultData: { message: 'Hi there! 👋 Thanks for reaching out.', buttons: [] },
    fields: [
      { key: 'message', label: 'Message', type: 'textarea', placeholder: 'Type your message…' },
      { key: 'buttons', label: 'Quick reply buttons', type: 'tags', placeholder: 'Add a button label' },
    ],
  },
  ask_question: {
    category: 'Messages',
    label: 'Ask a question',
    sub: 'Ask a question and store user input in a variable',
    icon: HelpCircle,
    primary: 'question',
    defaultData: { question: 'What’s your email?', variable: 'email', inputType: 'email' },
    fields: [
      { key: 'question', label: 'Question', type: 'textarea', placeholder: 'What would you like to ask?' },
      { key: 'variable', label: 'Save answer to variable', type: 'text', placeholder: 'e.g. email', prefix: '$' },
      {
        key: 'inputType',
        label: 'Expected input',
        type: 'select',
        options: ['text', 'email', 'phone', 'number', 'date'],
      },
    ],
  },
  buttons: {
    category: 'Messages',
    label: 'Buttons',
    sub: 'Send a message with tappable buttons',
    icon: MousePointerClick,
    primary: 'message',
    branching: true,
    defaultData: { message: 'How can we help you today?', options: ['Pricing', 'Support', 'Talk to sales'] },
    fields: [
      { key: 'message', label: 'Message', type: 'textarea', placeholder: 'Message shown above the buttons' },
      { key: 'options', label: 'Buttons', type: 'tags', placeholder: 'Add a button label' },
    ],
  },
  list: {
    category: 'Messages',
    label: 'List',
    sub: 'Send a menu of selectable options',
    icon: List,
    primary: 'message',
    branching: true,
    defaultData: {
      header: 'Main menu',
      message: 'Choose an option from the list:',
      options: ['Track my order', 'Browse products', 'Speak to an agent'],
    },
    fields: [
      { key: 'header', label: 'List title', type: 'text', placeholder: 'e.g. Main menu' },
      { key: 'message', label: 'Message', type: 'textarea', placeholder: 'Message shown above the list' },
      { key: 'options', label: 'List items', type: 'tags', placeholder: 'Add a list item' },
    ],
  },
  condition: {
    category: 'Messages',
    label: 'Set a condition',
    sub: 'Branch the flow based on logical condition(s)',
    icon: Split,
    primary: 'variable',
    defaultData: { variable: 'email', operator: 'is set', value: '' },
    fields: [
      { key: 'variable', label: 'Variable / attribute', type: 'text', placeholder: 'e.g. email', prefix: '$' },
      {
        key: 'operator',
        label: 'Operator',
        type: 'select',
        options: ['equals', 'not equals', 'contains', 'greater than', 'less than', 'is set', 'is not set'],
      },
      { key: 'value', label: 'Value', type: 'text', placeholder: 'Comparison value' },
    ],
  },

  // Jump / GOTO — created only via the "Existing block" picker (not in palette)
  goto: {
    category: 'Messages',
    label: 'Jump to step',
    sub: 'Continue the conversation from an existing step',
    icon: CornerUpRight,
    primary: 'targetLabel',
    defaultData: { targetId: null, targetLabel: '' },
    fields: [],
  },

  // ----------------------------- Operations ----------------------------
  ai_assist: {
    category: 'Operations',
    label: 'AI Assist',
    sub: 'Generate a smart reply with AI',
    icon: Sparkles,
    beta: true,
    primary: 'instructions',
    defaultData: { instructions: 'Answer the user’s question helpfully and concisely.', model: 'claude-haiku-4-5' },
    fields: [
      { key: 'instructions', label: 'Instructions', type: 'textarea', placeholder: 'Tell the AI how to respond…' },
      { key: 'model', label: 'Model', type: 'select', options: ['claude-haiku-4-5', 'claude-sonnet-4-6', 'claude-opus-4-8'] },
    ],
  },
  subscribe: {
    category: 'Operations',
    label: 'Subscribe',
    sub: 'Add the contact to a list',
    icon: Bell,
    primary: 'list',
    defaultData: { list: 'Newsletter' },
    fields: [{ key: 'list', label: 'List', type: 'select', options: ['Newsletter', 'Product updates', 'Promotions'] }],
  },
  unsubscribe: {
    category: 'Operations',
    label: 'Unsubscribe',
    sub: 'Remove the contact from a list',
    icon: BellOff,
    primary: 'list',
    defaultData: { list: 'Newsletter' },
    fields: [{ key: 'list', label: 'List', type: 'select', options: ['Newsletter', 'Product updates', 'Promotions'] }],
  },
  update_attribute: {
    category: 'Operations',
    label: 'Update Attribute',
    sub: 'Set or update a contact attribute',
    icon: PencilLine,
    primary: 'attribute',
    defaultData: { attribute: 'plan', value: 'Growth' },
    fields: [
      { key: 'attribute', label: 'Attribute', type: 'text', placeholder: 'e.g. plan' },
      { key: 'value', label: 'Value', type: 'text', placeholder: 'e.g. Growth' },
    ],
  },
  set_tags: {
    category: 'Operations',
    label: 'Set tags',
    sub: 'Add tags to the conversation',
    icon: Tags,
    primary: 'tags',
    defaultData: { tags: ['lead', 'hot'] },
    fields: [{ key: 'tags', label: 'Tags', type: 'tags', placeholder: 'Add a tag' }],
  },
  assign_team: {
    category: 'Operations',
    label: 'Assign Team',
    sub: 'Route the chat to a team',
    icon: Users,
    primary: 'team',
    defaultData: { team: 'Sales' },
    fields: [{ key: 'team', label: 'Team', type: 'select', options: ['Sales', 'Support', 'Customer Success', 'Billing'] }],
  },
  assign_user: {
    category: 'Operations',
    label: 'Assign User',
    sub: 'Route the chat to an agent',
    icon: UserCheck,
    primary: 'user',
    defaultData: { user: 'Sam Rivera' },
    fields: [
      { key: 'user', label: 'Agent', type: 'select', options: ['Sam Rivera', 'Nina Kapoor', 'Leo Schmidt', 'Maya Okafor'] },
    ],
  },
  trigger_chatbot: {
    category: 'Operations',
    label: 'Trigger Chatbot',
    sub: 'Hand off to another chatbot',
    icon: Bot,
    primary: 'chatbot',
    defaultData: { chatbot: 'Support Bot' },
    fields: [
      { key: 'chatbot', label: 'Chatbot', type: 'select', options: ['Sales Assistant', 'Support Bot', 'Onboarding Helper', 'Website Bot'] },
    ],
  },
  update_chat_status: {
    category: 'Operations',
    label: 'Update Chat Status',
    sub: 'Change the conversation status',
    icon: CircleDot,
    primary: 'status',
    defaultData: { status: 'Resolved' },
    fields: [{ key: 'status', label: 'Status', type: 'select', options: ['Open', 'Pending', 'On hold', 'Resolved', 'Closed'] }],
  },
  template: {
    category: 'Operations',
    label: 'Template',
    sub: 'Send a pre-approved message template',
    icon: LayoutTemplate,
    primary: 'template',
    defaultData: { template: 'Welcome' },
    fields: [
      { key: 'template', label: 'Template', type: 'select', options: ['Welcome', 'Order update', 'Feedback request', 'Appointment reminder'] },
    ],
  },
  time_delay: {
    category: 'Operations',
    label: 'Time Delay',
    sub: 'Wait before the next step',
    icon: Clock,
    primary: 'amount',
    defaultData: { amount: 5, unit: 'minutes' },
    fields: [
      { key: 'amount', label: 'Wait for', type: 'number', placeholder: '5' },
      { key: 'unit', label: 'Unit', type: 'select', options: ['seconds', 'minutes', 'hours', 'days'] },
    ],
  },
  whatsapp_flows: {
    category: 'Operations',
    label: 'WhatsApp Flows',
    sub: 'Launch an interactive WhatsApp flow',
    icon: MessageCircle,
    primary: 'flow',
    defaultData: { flow: 'Lead capture' },
    fields: [{ key: 'flow', label: 'WhatsApp flow', type: 'select', options: ['Lead capture', 'Appointment booking', 'Sign-up', 'Survey'] }],
  },

  // ---------------------------- Integrations ---------------------------
  webhook: {
    category: 'Integrations',
    label: 'Webhook',
    sub: 'Send data to an external URL',
    icon: Webhook,
    primary: 'url',
    defaultData: { method: 'POST', url: 'https://api.example.com/hook' },
    fields: [
      { key: 'method', label: 'Method', type: 'select', options: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] },
      { key: 'url', label: 'URL', type: 'text', placeholder: 'https://…' },
    ],
  },
  google_spreadsheet: {
    category: 'Integrations',
    label: 'Google Spreadsheet',
    sub: 'Append or update a row',
    icon: Sheet,
    primary: 'spreadsheet',
    defaultData: { spreadsheet: 'Leads 2026', worksheet: 'Sheet1', action: 'Append row' },
    fields: [
      { key: 'spreadsheet', label: 'Spreadsheet', type: 'text', placeholder: 'Spreadsheet name or ID' },
      { key: 'worksheet', label: 'Worksheet', type: 'text', placeholder: 'Sheet1' },
      { key: 'action', label: 'Action', type: 'select', options: ['Append row', 'Update row', 'Lookup row'] },
    ],
  },
  catalog: {
    category: 'Integrations',
    label: 'Catalog',
    sub: 'Show a product catalog',
    icon: Library,
    primary: 'catalog',
    defaultData: { catalog: 'Summer collection' },
    fields: [{ key: 'catalog', label: 'Catalog', type: 'select', options: ['Summer collection', 'Bestsellers', 'New arrivals'] }],
  },
  sets: {
    category: 'Integrations',
    label: 'Sets',
    sub: 'Show a curated product set',
    icon: Layers,
    primary: 'set',
    defaultData: { set: 'Featured' },
    fields: [{ key: 'set', label: 'Product set', type: 'select', options: ['Featured', 'On sale', 'Recommended'] }],
  },
  product: {
    category: 'Integrations',
    label: 'Product',
    sub: 'Share a single product',
    icon: Package,
    primary: 'product',
    defaultData: { product: 'Pro Plan' },
    fields: [{ key: 'product', label: 'Product', type: 'select', options: ['Pro Plan', 'Starter Kit', 'Add-on Pack', 'Gift Card'] }],
  },
}

// Ordered categories for the palette
export const flowCategories = [
  { name: 'Messages', types: ['send_message', 'ask_question', 'buttons', 'list', 'condition'] },
  {
    name: 'Operations',
    types: [
      // 'ai_assist',  // AI is out of scope for v1 — keep rule-based only (re-enable later)
      'subscribe',
      'unsubscribe',
      'update_attribute',
      'set_tags',
      'assign_team',
      'assign_user',
      'trigger_chatbot',
      'update_chat_status',
      'template',
      'time_delay',
      'whatsapp_flows',
    ],
  },
  { name: 'Integrations', types: ['webhook', 'google_spreadsheet', 'catalog', 'sets', 'product'] },
]

// Maps a catalog key to the React Flow node component type
export const rfTypeFor = (kind) => {
  if (kind === 'condition') return 'condition'
  if (kind === 'buttons' || kind === 'list') return 'options'
  return 'flow'
}

// A short human-readable summary of a node's primary field (node body preview)
export function nodeSummary(kind, data) {
  const def = flowCatalog[kind]
  if (!def) return ''
  if (kind === 'condition') {
    const v = data.variable ? `$${data.variable}` : 'variable'
    return `If ${v} ${data.operator}${data.value ? ` "${data.value}"` : ''}`
  }
  if (kind === 'time_delay') return `Wait ${data.amount} ${data.unit}`
  if (kind === 'set_tags') return (data.tags || []).length ? data.tags.join(', ') : def.sub
  if (kind === 'buttons' || kind === 'list') return data.message || def.sub
  if (kind === 'goto') return `↪ Go to: ${data.targetLabel || 'a step'}`
  const val = data[def.primary]
  if (Array.isArray(val)) return val.length ? val.join(', ') : def.sub
  return val ? String(val) : def.sub
}

// Seed flow shown when the builder first opens
export const initialFlowNodes = [
  { id: 'start', type: 'start', position: { x: 40, y: 200 }, data: {}, deletable: false },
  {
    id: 'n1',
    type: 'flow',
    position: { x: 280, y: 160 },
    data: { kind: 'send_message', message: '👋 Hi! Welcome to VartaBot. How can I help today?', buttons: ['Pricing', 'Support', 'Talk to sales'] },
  },
  {
    id: 'n2',
    type: 'flow',
    position: { x: 580, y: 160 },
    data: { kind: 'ask_question', question: 'What’s your work email?', variable: 'email', inputType: 'email' },
  },
  {
    id: 'n3',
    type: 'condition',
    position: { x: 880, y: 160 },
    data: { kind: 'condition', variable: 'email', operator: 'is set', value: '' },
  },
  {
    id: 'n4',
    type: 'flow',
    position: { x: 1180, y: 60 },
    data: { kind: 'assign_team', team: 'Sales' },
  },
  {
    id: 'n5',
    type: 'flow',
    position: { x: 1180, y: 280 },
    data: { kind: 'send_message', message: 'No problem! Browse our help center anytime. 😊', buttons: [] },
  },
]

export const initialFlowEdges = [
  { id: 'e0', source: 'start', target: 'n1', animated: true },
  { id: 'e1', source: 'n1', target: 'n2', animated: true },
  { id: 'e2', source: 'n2', target: 'n3', animated: true },
  { id: 'e3', source: 'n3', sourceHandle: 'true', target: 'n4', animated: true, label: 'Yes' },
  { id: 'e4', source: 'n3', sourceHandle: 'false', target: 'n5', animated: true, label: 'No' },
]
