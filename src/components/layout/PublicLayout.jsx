import Navbar from '../landing/Navbar.jsx'
import Footer from '../landing/Footer.jsx'
import Ambience from '../landing/Ambience.jsx'
import AIAssistant from '../AIAssistant.jsx'
import Seo from '../Seo.jsx'

// Shared shell for all public (pre-login) pages: nav, footer, ambient depth,
// and the site-wide AI assistant. Pass `title`/`description` for per-page SEO.
export default function PublicLayout({ children, title, description, noindex }) {
  return (
    <div className="relative min-h-screen bg-surface-50 dark:bg-surface-950">
      <Seo title={title} description={description} noindex={noindex} />
      <Ambience />
      <Navbar />
      <main className="relative z-10 pt-16">{children}</main>
      <Footer />
      <AIAssistant />
    </div>
  )
}
