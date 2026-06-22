// Central definition of the three portals: nav items, identity, and metadata.
// Layouts and the portal switcher read from here so adding a nav item is a
// one-line change.
import {
  LayoutDashboard,
  Bot,
  Workflow,
  MessagesSquare,
  Users,
  Code2,
  Settings,
  BarChart3,
  Building2,
  CreditCard,
  Activity,
  Headset,
  Inbox,
  UserCog,
  ShieldCheck,
  Gauge,
} from 'lucide-react'
import { currentUser } from '../data/mockData.js'
import { adminUser, agentUser } from '../data/portalData.js'

export const portals = {
  admin: {
    id: 'admin',
    name: 'Super Admin',
    label: 'Platform',
    icon: ShieldCheck,
    basePath: '/admin',
    home: '/admin/dashboard',
    user: adminUser,
    nav: [
      { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/admin/customers', label: 'Customers', icon: Building2 },
      { to: '/admin/subscriptions', label: 'Subscriptions', icon: CreditCard },
      { to: '/admin/chatbots', label: 'Chatbot Monitoring', icon: Bot },
      { to: '/admin/agents', label: 'Agent Monitoring', icon: Headset },
      { to: '/admin/analytics', label: 'Platform Analytics', icon: BarChart3 },
      { to: '/admin/settings', label: 'Settings', icon: Settings },
    ],
  },

  customer: {
    id: 'customer',
    name: 'Customer',
    label: 'Workspace',
    icon: Bot,
    basePath: '/app',
    home: '/app/dashboard',
    user: currentUser,
    nav: [
      { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/app/chatbots', label: 'Chatbots', icon: Bot },
      { to: '/app/rules', label: 'Rules', icon: Workflow },
      { to: '/app/conversations', label: 'Conversations', icon: MessagesSquare },
      { to: '/app/leads', label: 'Leads', icon: Users },
      { to: '/app/agents', label: 'Agents', icon: Headset },
      { to: '/app/analytics', label: 'Analytics', icon: BarChart3 },
      { to: '/app/install', label: 'Install Widget', icon: Code2 },
      { to: '/app/settings', label: 'Settings', icon: Settings },
    ],
  },

  agent: {
    id: 'agent',
    name: 'Live Agent',
    label: 'Support',
    icon: Headset,
    basePath: '/agent',
    home: '/agent/dashboard',
    user: agentUser,
    nav: [
      { to: '/agent/dashboard', label: 'Dashboard', icon: Gauge },
      { to: '/agent/inbox', label: 'Live Inbox', icon: Inbox },
      { to: '/agent/performance', label: 'Performance', icon: Activity },
      { to: '/agent/profile', label: 'Profile', icon: UserCog },
    ],
  },
}

export const portalList = [portals.admin, portals.customer, portals.agent]
