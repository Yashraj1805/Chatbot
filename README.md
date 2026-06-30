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

Built to feel like a real, commercial SaaS product. 🛠️
