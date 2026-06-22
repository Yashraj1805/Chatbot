import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Spinner from './components/ui/Spinner.jsx'
import ScrollManager from './components/ScrollManager.jsx'

// Entry page — eager so the landing paints instantly.
import Landing from './pages/Landing.jsx'
// Pilot launch: signed-in users land here until the full portals ship.
import ComingSoon from './pages/ComingSoon.jsx'

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

// NOTE: The customer / super-admin / live-agent portal pages and the flow
// builder are built but intentionally NOT routed yet. For the pilot launch,
// every signed-in route redirects to <ComingSoon>. They'll be wired back in a
// later phase (see the portal redirects in <AppRoutes>).

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

      {/* Post-login pilot landing — shown after sign in / sign up. */}
      <Route path="/welcome" element={<ComingSoon />} />

      {/* Portals are not live yet. Any signed-in route (and old deep links)
          redirect to the pilot "coming soon" page. */}
      <Route path="/app/*" element={<Navigate to="/welcome" replace />} />
      <Route path="/admin/dashboard" element={<Navigate to="/welcome" replace />} />
      <Route path="/admin/customers" element={<Navigate to="/welcome" replace />} />
      <Route path="/admin/subscriptions" element={<Navigate to="/welcome" replace />} />
      <Route path="/admin/chatbots" element={<Navigate to="/welcome" replace />} />
      <Route path="/admin/agents" element={<Navigate to="/welcome" replace />} />
      <Route path="/admin/analytics" element={<Navigate to="/welcome" replace />} />
      <Route path="/admin/settings" element={<Navigate to="/welcome" replace />} />
      <Route path="/agent/*" element={<Navigate to="/welcome" replace />} />

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
