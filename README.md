# VartaBot — No-Code Chatbot Platform

A premium marketing site + multi-portal SaaS frontend for **VartaBot**, a no-code,
**rule-based** chatbot platform that lets businesses build chatbots and capture leads —
live in minutes, no developer needed. Built with **React 18 + Vite 5 + Tailwind CSS 3**,
deployed on **Vercel**.

> ### 🚦 Current phase: public pilot
> Only the **public marketing site** is routed right now. The three internal portals
> (Customer / Super Admin / Live Agent) are fully built in `src/` but **intentionally
> not wired into the router yet** — every signed-in route redirects to a pilot
> **"You're in"** page. Visitors join the pilot by leaving their email at `/join`.
> See [`src/App.jsx`](src/App.jsx) for the live route table.

The site also ships **two real Vercel serverless functions** (in [`api/`](api/)) — an
"Ask AI" assistant powered by Claude, and a pilot-signup capture that writes to Postgres.
Everything inside the portals still runs on mock data ([`src/data/`](src/data/)).

---

## ✨ What's live today

| Area | Pages |
| --- | --- |
| **Landing** | Hero · Product showcase · Stats · Features · How it works · Integrations · Pricing · Comparison · FAQ · CTA · Footer |
| **Marketing** | Features, Pricing, About, Roadmap |
| **Resources** | Blog + posts, Docs + articles, Help center, Community, API reference, Status |
| **Legal** | Privacy, Terms, Security, GDPR, Cookies |
| **Pilot** | `/join` email capture → `/welcome` confirmation ("Coming soon") |
| **AI** | Floating "Ask AI" assistant on public pages (Claude-backed serverless API) |

### Built but dormant (not routed during the pilot)
Customer portal (`/app`), Super Admin portal (`/admin`), Live Agent portal (`/agent`),
and the visual **flow builder** — all complete in `src/pages/` and `src/components/`, ready
to be re-enabled in a later phase.

---

## 🚀 Getting started

> **Prerequisite:** [Node.js](https://nodejs.org/) **18+** and npm.

```bash
npm install      # install dependencies
npm run dev      # dev server → http://localhost:5173 (opens automatically)
npm run build    # production build → /dist
npm run preview  # preview the production build
```

> The `api/` serverless functions **don't run** under `npm run dev`. To exercise them
> locally, use `vercel dev`. Without them the pilot form fails quietly and the UI still
> proceeds.

---

## 🔑 Environment variables

Server-side only (never exposed to the browser). Set in Vercel → Settings → Environment
Variables, or copy [`.env.example`](.env.example) → `.env` for `vercel dev`.

| Var | Used by | Required |
| --- | --- | --- |
| `DATABASE_URL` | `api/lead.js` — Postgres (Neon/Supabase/Railway) to store signups | To persist signups |
| `RESEND_API_KEY` | `api/lead.js` — email alert on each signup | Optional |
| `NOTIFY_EMAIL` | `api/lead.js` — where the alert goes | Optional |
| `NOTIFY_FROM` | `api/lead.js` — from address (default `onboarding@resend.dev`) | Optional |
| `ANTHROPIC_API_KEY` | `api/assistant.js` — Claude API key for the "Ask AI" assistant | For live AI answers |
| `ANTHROPIC_MODEL` | `api/assistant.js` — model id (default `claude-haiku-4-5`) | Optional |

---

## 🗺️ Routes (live)

**Public marketing**

| Path | Page |
| --- | --- |
| `/` | Landing |
| `/about` | About / company |
| `/features` | Features |
| `/pricing` | Pricing |
| `/blog`, `/blog/:slug` | Blog index + post |
| `/roadmap` | Product roadmap |
| `/docs`, `/docs/:slug` | Docs hub + article |
| `/help` | Help center |
| `/community` | Community |
| `/api` | API reference |
| `/status` | System status |
| `/privacy`, `/terms`, `/security`, `/gdpr`, `/cookies` | Legal pages |

**Pilot funnel**

| Path | Behaviour |
| --- | --- |
| `/join` | Pilot signup (email capture → posts to `/api/lead`) |
| `/welcome` | Post-signup "You're in 🎉" page |
| `/login`, `/register`, `/contact` | Redirect → `/join` |
| `/app/*`, `/agent/*` | Redirect → `/welcome` (portals dormant) |
| `*` | Styled 404 |

---

## 🎨 Design system

- **Brand:** deep navy `brand-600 = #284b7d` + warm orange `accent-400 = #e9853d`, on a
  cool **surface** slate scale — defined in [`tailwind.config.js`](tailwind.config.js).
- **Fonts:** **Outfit** (display/headings) + **Plus Jakarta Sans** (body), via Google Fonts
  in [`index.html`](index.html).
- **Theme:** **light only.** `ThemeContext` strips the `dark` class on mount, so `dark:`
  utilities are inert and there's no theme persistence. (Dark styles still exist in the
  markup for a future re-enable.)
- **UI kit** in [`src/components/ui/`](src/components/ui/): `Button`, `Card`, `Badge`,
  `Input`, `Modal`, `Avatar`, `Toggle`, `Spinner`, `EmptyState`, `StatCard`, `PageHeader`,
  `Charts` (dependency-free SVG).
- **SEO:** [`src/components/Seo.jsx`](src/components/Seo.jsx) is a dependency-free
  `document.title`/meta manager; base URL `https://vartabot.in`. Plus a sitemap, robots.txt,
  and JSON-LD in `index.html`.

---

## 🧰 Tech stack

- **React 18** + **Vite 5** (vendor chunk-splitting for Core Web Vitals)
- **Tailwind CSS 3** (custom brand theme; dark mode disabled)
- **React Router 6**
- **Framer Motion** — animation
- **React Flow** (`@xyflow/react`) — the (dormant) visual flow builder
- **lucide-react** icons
- **Vercel serverless** (`api/`) — `pg` for Postgres, Claude Messages API, Resend (optional)

---

## 📁 Project structure

```
Chatbot/
├── api/                       # Vercel serverless functions
│   ├── assistant.js           # "Ask AI" — Claude Messages API (key stays server-side)
│   └── lead.js                # pilot signup → Postgres + optional Resend email
├── public/                    # favicon, og-image, robots.txt, sitemap.xml, logo lab pages
├── logo-assets/               # source logo marks
├── index.html                 # shell, fonts, theme-color, JSON-LD
├── tailwind.config.js          # brand/accent/surface palettes, fonts, animations
├── vite.config.js              # React plugin + manual vendor chunking
├── vercel.json                 # Vite framework + SPA rewrites
└── src/
    ├── main.jsx                # BrowserRouter → ThemeProvider → ChatbotsProvider → App
    ├── App.jsx                 # live routes (portals redirect to /welcome)
    ├── index.css               # Tailwind layers + utilities (.container-page, .glass, .aurora…)
    ├── lib/waitlist.js         # posts pilot signups to /api/lead
    ├── context/                # ThemeContext (light-only), ChatbotsContext (localStorage)
    ├── config/portals.js       # the 3 portals (nav/identity/paths) — used when re-enabled
    ├── data/                   # mockData, portalData, flowNodes, blogPosts, docsContent
    ├── components/
    │   ├── ui/                 # design-system primitives
    │   ├── layout/             # PublicLayout, PortalLayout, Sidebar, Topbar, AuthLayout, ThemeToggle
    │   ├── landing/            # marketing sections (Hero, Features, Pricing, FAQ, Footer…)
    │   ├── flow/               # the visual flow builder (dormant)
    │   ├── widget/ChatWidget.jsx
    │   ├── AIAssistant.jsx     # floating "Ask AI" widget
    │   ├── Logo.jsx · Seo.jsx · PageHero.jsx · BlogCover.jsx · Typewriter.jsx · ScrollManager.jsx
    │   └── motion/index.jsx    # CountUp + motion helpers
    └── pages/                  # one file per route (+ admin/ and agent/ subfolders, dormant)
```

For the full deep-dive — portals, flow builder, data layer, API contract — see
[DOCUMENTATION.md](DOCUMENTATION.md).

---

## 💸 Pricing (INR)

Prices drop the longer you commit (Monthly → Quarterly → Half-Yearly → Yearly).

| Plan | From (yearly) | Monthly | Notes |
| --- | --- | --- | --- |
| **Powered By** | ₹399/mo | ₹699/mo | 100 AI responses, "Powered by" branding |
| **Micro-Subscription** ⭐ | ₹999/mo | ₹1,499/mo | Best value — 1,000 responses, no branding, CSV export |
| **Omnichannel** | ₹2,199/mo | ₹2,999/mo | 5,000 responses, Web + WhatsApp, analytics, webhooks |

Plus a one-time **Early Adopter Lifetime Deal — ₹14,999** (first 50 customers; lifetime
Omnichannel capped at 2,000 messages/mo). Edit in [`src/data/mockData.js`](src/data/mockData.js).

---

## ✅ What still needs doing (before / after launch)

Tracked here so nothing slips. Items marked **(you)** need decisions/access only the
owner has — they can't be done from code.

### ⚖️ Legal — needs review before public launch
- [ ] **(you)** Have a lawyer review all copy in [`src/pages/public/legalContent.js`](src/pages/public/legalContent.js).
- [ ] **(you)** Fill the 3 hidden `draft: true` sections, then remove the flag to publish them:
  **Grievance officer** (name/email/address — required by India's DPDP Act), **Cancellations & refunds** (refund window + processing time), **Governing law & disputes** (jurisdiction).
- [ ] **(you)** Confirm the legal entity ("VartaBot, Inc." in the footer) and jurisdiction; add DPDP-specific clauses if operating in India.
- [ ] **(you)** Verify the mailboxes referenced actually exist: `privacy@`, `security@`, `legal@`, `support@`, `grievance@`, `hello@` `vartabot.in`.

### 📈 Analytics & consent
- [ ] **(you)** Enable **Web Analytics** in the Vercel dashboard (Project → Analytics) so the consent-gated `<AnalyticsGate>` actually receives data.
- [ ] *(optional)* Add a "Manage cookies" footer link that re-opens the consent banner / lets visitors withdraw consent.

### 🔍 SEO
- [ ] **(you)** Set up **Google Search Console**, verify the domain, and submit `https://vartabot.in/sitemap.xml`.
- [ ] **(you)** Off-page: backlinks (directories, Product Hunt, guest posts) + a regular blog cadence — the real levers for competitive keywords.
- [ ] **Pre-rendering / SSG** (biggest technical lever): the site is a client-side SPA, so non-Google crawlers and social scrapers only see the global `index.html` meta. Pre-rendering each route to static HTML gives every page its own OG/meta and faster indexing. *(Not yet done — changes the build.)*
- [ ] **(you)** After each deploy, re-check social previews with the Facebook/LinkedIn/Twitter debuggers (OG image is now a real PNG at `/og-image.png`).

### 🎨 Content accuracy (before making public claims)
- [ ] **(you)** Replace fictional social proof with real data: `testimonials`, `trustLogos`, `brandStats`, and the `4.9/5 · 1200 ratings` in the `index.html` JSON-LD.

### 🚪 Portals (later phase)
- [ ] Re-route `/app`, `/admin`, `/agent` (currently redirect to `/welcome`) and add real auth + a `<ProtectedRoute>` when the backend is ready — see [DOCUMENTATION.md §2](DOCUMENTATION.md).

---

Built to feel like a real, commercial SaaS product. 🛠️
