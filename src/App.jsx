import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PortalLayout from './components/layout/PortalLayout.jsx'
import Spinner from './components/ui/Spinner.jsx'
import ScrollManager from './components/ScrollManager.jsx'
import { portals } from './config/portals.js'

// Entry page — eager so the landing paints instantly.
import Landing from './pages/Landing.jsx'

// Everything else is route-level code-split (lazy) to keep the initial bundle small.
// Public + auth pages
const About = lazy(() => import('./pages/About.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const AdminLogin = lazy(() => import('./pages/AdminLogin.jsx'))
const Register = lazy(() => import('./pages/Register.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

// Public content / footer pages
const PricingPage = lazy(() => import('./pages/public/PricingPage.jsx'))
const FeaturesPage = lazy(() => import('./pages/public/FeaturesPage.jsx'))
const Contact = lazy(() => import('./pages/public/Contact.jsx'))
const Blog = lazy(() => import('./pages/public/Blog.jsx'))
const BlogPost = lazy(() => import('./pages/public/BlogPost.jsx'))
const Roadmap = lazy(() => import('./pages/public/Roadmap.jsx'))
const Docs = lazy(() => import('./pages/public/Docs.jsx'))
const DocArticle = lazy(() => import('./pages/public/DocArticle.jsx'))
const Help = lazy(() => import('./pages/public/Help.jsx'))
const Community = lazy(() => import('./pages/public/Community.jsx'))
const ApiReference = lazy(() => import('./pages/public/ApiReference.jsx'))
const Status = lazy(() => import('./pages/public/Status.jsx'))
const LegalPage = lazy(() => import('./pages/public/LegalPage.jsx'))

// Customer portal pages
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const Chatbots = lazy(() => import('./pages/Chatbots.jsx'))
const CreateChatbot = lazy(() => import('./pages/CreateChatbot.jsx'))
const Rules = lazy(() => import('./pages/Rules.jsx'))
const Conversations = lazy(() => import('./pages/Conversations.jsx'))
const Leads = lazy(() => import('./pages/Leads.jsx'))
const AgentsSettings = lazy(() => import('./pages/Agents.jsx'))
const Analytics = lazy(() => import('./pages/Analytics.jsx'))
const WidgetInstall = lazy(() => import('./pages/WidgetInstall.jsx'))
const Settings = lazy(() => import('./pages/Settings.jsx'))

// The flow builder pulls in React Flow (heavy) — load it on demand only.
const FlowBuilder = lazy(() => import('./pages/FlowBuilder.jsx'))

// Super Admin portal pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'))
const Customers = lazy(() => import('./pages/admin/Customers.jsx'))
const Subscriptions = lazy(() => import('./pages/admin/Subscriptions.jsx'))
const ChatbotMonitoring = lazy(() => import('./pages/admin/ChatbotMonitoring.jsx'))
const AgentMonitoring = lazy(() => import('./pages/admin/AgentMonitoring.jsx'))
const PlatformAnalytics = lazy(() => import('./pages/admin/PlatformAnalytics.jsx'))
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings.jsx'))

// Live Agent portal pages
const AgentDashboard = lazy(() => import('./pages/agent/AgentDashboard.jsx'))
const LiveInbox = lazy(() => import('./pages/agent/LiveInbox.jsx'))
const AgentPerformancePage = lazy(() => import('./pages/agent/AgentPerformance.jsx'))
const AgentProfile = lazy(() => import('./pages/agent/AgentProfile.jsx'))

export default function App() {
  const { pathname } = useLocation()
  // Key the fade on the top-level segment only ("/", "/app", "/admin"…) so
  // navigating *within* a portal doesn't remount its layout — only crossing
  // into a different area triggers the cross-fade.
  const segment = '/' + (pathname.split('/')[1] || '')

  return (
    <>
      <ScrollManager />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={segment}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          <AppRoutes />
        </motion.div>
      </AnimatePresence>
    </>
  )
}

function AppRoutes() {
  return (
    <Suspense fallback={<FlowFallback />}>
    <Routes>
      {/* Public marketing + auth */}
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/register" element={<Register />} />

      {/* Public content / footer pages */}
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/docs/:slug" element={<DocArticle />} />
      <Route path="/help" element={<Help />} />
      <Route path="/community" element={<Community />} />
      <Route path="/api" element={<ApiReference />} />
      <Route path="/status" element={<Status />} />
      <Route path="/privacy" element={<LegalPage docKey="privacy" />} />
      <Route path="/terms" element={<LegalPage docKey="terms" />} />
      <Route path="/security" element={<LegalPage docKey="security" />} />
      <Route path="/gdpr" element={<LegalPage docKey="gdpr" />} />
      <Route path="/cookies" element={<LegalPage docKey="cookies" />} />

      {/* Full-screen flow builder — scoped to a chatbot (needs the whole viewport) */}
      <Route
        path="/app/chatbots/:id/flow"
        element={
          <Suspense fallback={<FlowFallback />}>
            <FlowBuilder />
          </Suspense>
        }
      />

      {/* ---------------------- Customer portal ---------------------- */}
      <Route path="/app" element={<PortalLayout portal={portals.customer} />}>
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="chatbots" element={<Chatbots />} />
        <Route path="chatbots/new" element={<CreateChatbot />} />
        <Route path="rules" element={<Rules />} />
        <Route path="conversations" element={<Conversations />} />
        <Route path="leads" element={<Leads />} />
        <Route path="agents" element={<AgentsSettings />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="install" element={<WidgetInstall />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* --------------------- Super Admin portal -------------------- */}
      <Route path="/admin" element={<PortalLayout portal={portals.admin} />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="chatbots" element={<ChatbotMonitoring />} />
        <Route path="agents" element={<AgentMonitoring />} />
        <Route path="analytics" element={<PlatformAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* --------------------- Live Agent portal --------------------- */}
      <Route path="/agent" element={<PortalLayout portal={portals.agent} />}>
        <Route index element={<Navigate to="/agent/dashboard" replace />} />
        <Route path="dashboard" element={<AgentDashboard />} />
        <Route path="inbox" element={<LiveInbox />} />
        <Route path="performance" element={<AgentPerformancePage />} />
        <Route path="profile" element={<AgentProfile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
    </Suspense>
  )
}

function FlowFallback() {
  return (
    <div className="flex h-screen items-center justify-center bg-surface-50 dark:bg-surface-950">
      <Spinner size="lg" />
    </div>
  )
}
