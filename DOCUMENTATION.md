# VartaBot — Complete Project Documentation

> A premium **no-code, rule-based chatbot platform**. This repo is the **frontend marketing
> site + multi-portal SaaS app**, built with React + Vite + Tailwind, plus two lightweight
> **Vercel serverless functions** (Claude "Ask AI" assistant + Postgres pilot-signup capture).
> The portal pages run on mock data; there is no full backend yet.

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Current Phase: Public Pilot](#2-current-phase-public-pilot)
3. [Tech Stack](#3-tech-stack)
4. [Getting Started](#4-getting-started)
5. [Environment Variables](#5-environment-variables)
6. [High-Level Architecture](#6-high-level-architecture)
7. [Project Structure](#7-project-structure)
8. [Routing Map](#8-routing-map)
9. [Public / Marketing Pages](#9-public--marketing-pages)
10. [The Pilot Funnel](#10-the-pilot-funnel)
11. [Serverless API Layer](#11-serverless-api-layer)
12. [The "Ask AI" Assistant](#12-the-ask-ai-assistant)
13. [The Portal System (dormant)](#13-the-portal-system-dormant)
14. [Customer / Admin / Agent Portals](#14-customer--admin--agent-portals)
15. [The Visual Flow Builder (dormant)](#15-the-visual-flow-builder-dormant)
16. [Reusable UI Component Library](#16-reusable-ui-component-library)
17. [The Chat Widget](#17-the-chat-widget)
18. [Design System & Theming](#18-design-system--theming)
19. [SEO & Metadata](#19-seo--metadata)
20. [Legal & Privacy](#20-legal--privacy)
21. [Mock Data Layer](#21-mock-data-layer)
22. [State Management](#22-state-management)
23. [Deployment (Vercel)](#23-deployment-vercel)
24. [Roadmap](#24-roadmap)

---

## 1. Product Overview

**VartaBot** lets businesses create, manage, and deploy **rule-based chatbots** on their
websites — *without writing code*. It is explicitly **not** an AI conversation bot in this
version: the bot responds using **predefined rules, keywords, buttons, conditions, and
conversation flows** the customer configures. (AI conversation bots are on the roadmap; the
only AI in the product today is the *marketing-site* "Ask AI" helper.)

### What customers will be able to do (in the full app)
- Create chatbots (name, welcome message, brand color, logo)
- Define rules (trigger → response) and full visual conversation flows
- Capture leads (name, email, phone) automatically
- Monitor conversations
- Hand off ("transfer") a conversation from the bot to a **live human agent**
- Deploy on any website via a one-line embed snippet

### Three portals (built, currently dormant)
| Portal | Who | Purpose |
|--------|-----|---------|
| 🛡️ **Super Admin** | Platform owner | Customers, subscriptions, monitoring, platform analytics |
| 🤖 **Customer** | Businesses | Build & manage chatbots, rules, flows, leads, agents |
| 🎧 **Live Agent** | Support staff | Handle conversations transferred from the bot |

---

## 2. Current Phase: Public Pilot

Only the **public marketing site** is routed. The portals are fully built in `src/` but
**not connected to the router**, because the product is in an early pilot. Concretely, in
[`src/App.jsx`](src/App.jsx):

- All public marketing/resource/legal pages are live.
- `/join` is the single pilot entry point (email capture).
- `/login`, `/register`, `/contact` → **redirect to `/join`**.
- `/app/*` and `/agent/*` → **redirect to `/welcome`** (a "You're in / coming soon" page).
- There are **no `Login.jsx`, `AdminLogin.jsx`, or `Register.jsx` files** — the old auth
  pages were replaced by the pilot funnel.

To re-enable the portals later, restore their `<Route>` blocks (wrapped in `PortalLayout`)
and add a real `<ProtectedRoute>`. The page components and `portals.js` config are ready.

---

## 3. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **React 18** |
| Build tool | **Vite 5** (manual vendor chunk-splitting) |
| Styling | **Tailwind CSS 3** (custom theme; **dark mode disabled**) |
| Routing | **React Router 6** |
| Animation | **Framer Motion** |
| Icons | **lucide-react** |
| Flow builder | **React Flow** (`@xyflow/react` v12) — dormant |
| Fonts | **Outfit** (display) + **Plus Jakarta Sans** (body), Google Fonts |
| Serverless | **Vercel functions** (`api/`) — `pg` (Postgres), Claude Messages API, Resend |
| Image tooling | `sharp` (logo/asset processing) |

The portal data is still **mock data** in `src/data/`; the only real backend is the two
`api/` functions.

---

## 4. Getting Started

### Prerequisites
- **Node.js 18+** and npm

### Commands
```bash
npm install      # install dependencies
npm run dev      # dev server → http://localhost:5173 (auto-opens)
npm run build    # production build → /dist
npm run preview  # preview the production build
```

> **Note:** `npm run dev` (plain Vite) does **not** run the `api/` serverless functions.
> Use `vercel dev` to exercise them locally. Without them, the pilot signup form fails
> silently and the AI assistant falls back gracefully.

---

## 5. Environment Variables

All server-side (not `VITE_` vars — never shipped to the browser). See [`.env.example`](.env.example).

| Variable | Function | Required |
|----------|----------|----------|
| `DATABASE_URL` | Postgres connection string for `api/lead.js` (Neon/Supabase/Railway) | To store signups |
| `RESEND_API_KEY` | Email alert on each signup | Optional |
| `NOTIFY_EMAIL` | Recipient of the signup alert | Optional |
| `NOTIFY_FROM` | From address (default `onboarding@resend.dev`) | Optional |
| `ANTHROPIC_API_KEY` | Claude API key for `api/assistant.js` | For live AI |
| `ANTHROPIC_MODEL` | Model id, default `claude-haiku-4-5` (e.g. `claude-sonnet-4-6`, `claude-opus-4-8`) | Optional |

---

## 6. High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│ main.jsx → BrowserRouter → ThemeProvider → ChatbotsProvider →  │
│            App.jsx                                             │
│                                                                │
│  App.jsx (Routes)                                              │
│   ├── Public marketing + resources + legal  → PublicLayout     │
│   ├── /join (PilotSignup) → posts to /api/lead                 │
│   ├── /welcome (ComingSoon)                                    │
│   ├── /app/*  /agent/*  → redirect to /welcome  (dormant)      │
│   └── * → NotFound                                             │
│                                                                │
│  api/ (Vercel serverless, separate from the SPA)               │
│   ├── /api/assistant → Claude Messages API                     │
│   └── /api/lead      → Postgres (+ optional Resend email)      │
└──────────────────────────────────────────────────────────────┘
```

Key ideas:
- **Public pages** share `PublicLayout` (Navbar + Footer + Ambience + AIAssistant + SEO).
- **Portals** share one config-driven `PortalLayout` (Sidebar + Topbar + Outlet) — ready
  but not routed.
- **Theme** is light-only (context strips `dark`); **chatbots** persist to `localStorage`.
- **Flow builder** and **React Flow** are code-split into their own vendor chunk.
- **Landing** is eager-loaded; everything else is lazy.

---

## 7. Project Structure

```
Chatbot/
├── api/
│   ├── assistant.js            # "Ask AI" — Claude Messages API; same-origin + rate-limited
│   └── lead.js                 # pilot signup → Postgres (pilot_signups) + optional Resend
├── public/
│   ├── favicon-logo.png, favicon.svg, logo.png, og-image.svg
│   ├── robots.txt              # disallows /app /admin /agent /login /register
│   ├── sitemap.xml             # ~39 public URLs
│   └── logo-lab.html, logo-mockups.html, logo-showcase.html   # design references
├── logo-assets/                # varta-v-mark.svg/.png
├── index.html                  # shell, Outfit + Plus Jakarta Sans, theme-color #284b7d, JSON-LD
├── vite.config.js              # React plugin, manualChunks (vendor-motion/flow/icons/react)
├── tailwind.config.js          # brand/accent/surface palettes, fonts, shadows, animations
├── postcss.config.js
├── vercel.json                 # framework: vite, SPA rewrites
├── .env.example
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css               # @layer base/components: .container-page, .glass, .aurora, .skeleton…
    ├── lib/waitlist.js         # saveLead() → POST /api/lead
    ├── context/
    │   ├── ThemeContext.jsx    # light-only; useTheme()
    │   └── ChatbotsContext.jsx # localStorage 'vartabot-chatbots'; CRUD + clone + toggle
    ├── config/portals.js       # admin / customer / agent definitions
    ├── utils/cn.js
    ├── data/
    │   ├── mockData.js         # customer + landing data, pricing (INR), embed snippet
    │   ├── portalData.js       # admin + agent data, analytics series, inbox
    │   ├── flowNodes.js        # flow builder catalog + helpers + seed flow
    │   ├── blogPosts.js        # blog content
    │   └── docsContent.js      # docs categories + articles
    ├── components/
    │   ├── ui/                 # Button, Card, Badge, Input, Modal, Avatar, Toggle,
    │   │                       #   Spinner, EmptyState, StatCard, PageHeader, Charts
    │   ├── layout/             # PublicLayout, PortalLayout, Sidebar, Topbar,
    │   │                       #   AuthLayout, ThemeToggle
    │   ├── landing/            # Ambience, Navbar, Hero, ProductShowcase, Stats, Features,
    │   │                       #   HowItWorks, Integrations, Pricing, Comparison, FAQ,
    │   │                       #   CTA, CTASpotlight, TrustLogos, Reveal, Footer
    │   ├── flow/               # FlowPlayground, NodePalette, NodePicker, NodeProperties,
    │   │                       #   NodeFields, StepsBuilder, nodes, edges, flowContext
    │   ├── widget/ChatWidget.jsx
    │   ├── AIAssistant.jsx     # floating "Ask AI" widget (calls /api/assistant)
    │   ├── Logo.jsx, Seo.jsx, PageHero.jsx, BlogCover.jsx, Typewriter.jsx, ScrollManager.jsx
    │   └── motion/index.jsx    # CountUp + motion helpers
    └── pages/
        ├── Landing.jsx, About.jsx, PilotSignup.jsx, ComingSoon.jsx, NotFound.jsx
        ├── public/             # PricingPage, FeaturesPage, Blog, BlogPost, Roadmap, Docs,
        │                       #   DocArticle, Help, Community, ApiReference, Status,
        │                       #   LegalPage, legalContent.js
        ├── (customer)          # Dashboard, Chatbots, CreateChatbot, Rules, Conversations,
        │                       #   Leads, Agents, Analytics, WidgetInstall, Settings, FlowBuilder
        ├── admin/              # AdminDashboard, Customers, Subscriptions, ChatbotMonitoring,
        │                       #   AgentMonitoring, PlatformAnalytics, AdminSettings
        └── agent/              # AgentDashboard, LiveInbox, AgentPerformance, AgentProfile
```

---

## 8. Routing Map

Defined in [`src/App.jsx`](src/App.jsx).

### Live — public
| Path | Component |
|------|-----------|
| `/` | `Landing` |
| `/about` | `About` |
| `/features` | `public/FeaturesPage` |
| `/pricing` | `public/PricingPage` |
| `/blog`, `/blog/:slug` | `public/Blog`, `public/BlogPost` |
| `/roadmap` | `public/Roadmap` |
| `/docs`, `/docs/:slug` | `public/Docs`, `public/DocArticle` |
| `/help` | `public/Help` |
| `/community` | `public/Community` |
| `/api` | `public/ApiReference` |
| `/status` | `public/Status` |
| `/privacy` `/terms` `/security` `/gdpr` `/cookies` | `public/LegalPage` (keyed by `docKey`) |

### Live — pilot funnel
| Path | Behaviour |
|------|-----------|
| `/join` | `PilotSignup` |
| `/welcome` | `ComingSoon` |
| `/login`, `/register`, `/contact` | `Navigate → /join` |
| `/app/*`, `/agent/*` | `Navigate → /welcome` |
| `*` | `NotFound` (styled 404) |

### Dormant (built, not routed)
Customer `/app/*`, Admin `/admin/*`, Live Agent `/agent/*`, and `/app/chatbots/:id/flow`
(the full-screen flow builder).

---

## 9. Public / Marketing Pages

### Landing (`/`) — [`pages/Landing.jsx`](src/pages/Landing.jsx)
Section order (all in `components/landing/`):
1. **Ambience** — fixed background color fields + grain
2. **Navbar** — sticky; links: Features, How it works, Integrations, Pricing, FAQ, About
3. **Hero** — rotating headline (converts/replies/qualifies/sells) + live widget preview + trust logos
4. **ProductShowcase** — browser-frame mockup of the dashboard
5. **Stats** — 4 metrics (12k+ businesses, 8M+ conversations, 42% load reduced, <15 min to live)
6. **Features** — 9 feature cards + a featured rule→response card
7. **HowItWorks** — 3 steps with mini mockups
8. **Integrations** — 8 platform logos (WordPress, Shopify, Webflow, Wix, Slack, Zapier, HubSpot, Squarespace)
9. **Pricing** — billing-term toggle + 3 plan cards (INR)
10. **Comparison** — VartaBot vs typical tools
11. **FAQ** — 6-question accordion
12. **CTASpotlight** (exported as the CTA) — gradient banner
13. **Footer** — newsletter + Product/Company/Resources/Legal columns + socials

> A `Testimonials` dataset exists in `mockData.js` but is **not currently rendered** on the
> landing page. `TrustLogos` and `Reveal` are helper components used by the sections above.

### Other public pages
| Page | File | Shows |
|------|------|-------|
| **Pricing** | `public/PricingPage.jsx` | 3 plans + toggle, per-plan feature matrix, money-back banner, FAQs |
| **Features** | `public/FeaturesPage.jsx` | 6 detailed feature sections + extras |
| **About** | `pages/About.jsx` | Mission hero, 4 stats, 4 values |
| **Blog** | `public/Blog.jsx`, `BlogPost.jsx` | Featured + grid; full article reader |
| **Roadmap** | `public/Roadmap.jsx` | Now / Next / Later columns |
| **Docs** | `public/Docs.jsx`, `DocArticle.jsx` | Categorised hub + article with sidebar nav |
| **Help** | `public/Help.jsx` | Search + popular questions linked to docs |
| **Community** | `public/Community.jsx` | Discord / GitHub / X / Newsletter cards |
| **API Reference** | `public/ApiReference.jsx` | Auth snippet + sample endpoints |
| **Status** | `public/Status.jsx` | System uptimes |
| **Legal** | `public/LegalPage.jsx` | Privacy/Terms/Security/GDPR/Cookies from `legalContent.js` |

---

## 10. The Pilot Funnel

- **`PilotSignup.jsx`** (`/join`) — "Become a pilot customer". Captures an email, calls
  `saveLead()` from [`src/lib/waitlist.js`](src/lib/waitlist.js) (POST `/api/lead`), then
  navigates to `/welcome`.
- **`ComingSoon.jsx`** (`/welcome`) — "You're in 🎉" confirmation listing what's coming
  (no-code builder, lead tracking, live agent inbox, analytics/rules/flow builder).
- The **AI assistant** can also capture a visitor's email directly in chat (see §12).

---

## 11. Serverless API Layer

Two Vercel functions in [`api/`](api/), independent of the SPA bundle.

### `api/lead.js`
- Receives a pilot signup `{ source, name, email, company }`.
- If `DATABASE_URL` is set: ensures a `pilot_signups` table exists and inserts the row
  (connection pooled, `max: 3`, SSL).
- If `RESEND_API_KEY` + `NOTIFY_EMAIL` are set: sends an email alert (best-effort).
- Validates a basic email; returns `{ ok }`.

### `api/assistant.js`
See §12.

---

## 12. The "Ask AI" Assistant

[`api/assistant.js`](api/assistant.js) powers the floating **"Ask AI"** widget
([`src/components/AIAssistant.jsx`](src/components/AIAssistant.jsx)) on public pages.

- Calls **Anthropic's Claude Messages API**; the `ANTHROPIC_API_KEY` stays server-side.
- Model from `ANTHROPIC_MODEL`, default **`claude-haiku-4-5`** (cheapest).
- **System prompt** scopes it strictly to VartaBot (product, pricing in INR, setup,
  integrations, security), replies in 1–2 short sentences, English or Hindi/Hinglish, and
  **welcomes capturing the visitor's email/phone** in chat.
- **Guardrails:** POST-only, **same-origin check**, per-IP **rate limit** (30 req/min),
  history trimmed to the last 8 turns, `max_tokens: 160`. Returns `{ ok, reply }`.

---

## 13. The Portal System (dormant)

The multi-portal UI is driven by [`src/config/portals.js`](src/config/portals.js) — one
config object per portal, consumed by a single generic `PortalLayout`.

```js
portals = {
  admin:    { id:'admin',    name:'Super Admin', label:'Platform',  basePath:'/admin', home:'/admin/dashboard', user: adminUser,   nav:[…] },
  customer: { id:'customer', name:'Customer',    label:'Workspace', basePath:'/app',   home:'/app/dashboard',   user: currentUser, nav:[…] },
  agent:    { id:'agent',    name:'Live Agent',  label:'Support',   basePath:'/agent', home:'/agent/dashboard', user: agentUser,   nav:[…] },
}
```

Mock identities: Customer = **Harpreet Sachdev / The Sachdev Group**; Admin = **Alex Morgan**;
Agent = **Sam Rivera**.

- **`PortalLayout`** renders `<Sidebar>` + `<Topbar>` + `<Outlet>` (customer portal also gets
  an upgrade card).
- **`Sidebar`** renders the portal's `nav` array (label + icon + route).
- **`Topbar`** has search, theme toggle (no-op while dark mode is disabled), notifications,
  profile menu.

> None of these are routed today — re-add their `<Route>`s to bring them back.

---

## 14. Customer / Admin / Agent Portals

All pages exist and render against mock data.

**Customer** (`/app`, nav: Dashboard, Chatbots, Rules, Conversations, Leads, Agents,
Analytics, Install Widget, Settings) — dashboard with stats + chart, chatbot CRUD (backed by
`ChatbotsContext` → `localStorage`), rule builder, conversation transcripts, lead table with
CSV export UI, agent management, analytics, embed-snippet install page, settings tabs, and the
per-chatbot flow builder.

**Super Admin** (`/admin`, nav: Dashboard, Customers, Subscriptions, Chatbot Monitoring,
Agent Monitoring, Platform Analytics, Settings) — platform KPIs, customer management,
subscriptions/billing, platform-wide chatbot & agent health, revenue/plan charts.

**Live Agent** (`/agent`, nav: Dashboard, Live Inbox, Performance, Profile) — the **Live Inbox**
is the centerpiece: chat list, message window, customer/lead panel, quick responses, and
transfer/escalate/close actions.

---

## 15. The Visual Flow Builder (dormant)

A per-chatbot, full-screen, lazy-loaded **flow builder** (`/app/chatbots/:id/flow`) built on
React Flow. Components in [`src/components/flow/`](src/components/flow/):

| File | Role |
|------|------|
| `flowNodes.js` (in `data/`) | `flowCatalog`, categories, `rfTypeFor()`, `nodeSummary()`, seed flow |
| `nodes.jsx` | Custom node components (Start / Flow / Condition / Options) with edit/delete + "+" add-next |
| `edges.jsx` | `DeletableEdge` — bezier edge with a midpoint disconnect button |
| `NodePalette.jsx` | Left palette (click or drag to add), grouped & searchable |
| `NodePicker.jsx` | "Add next block" popup listing all modules |
| `NodeProperties.jsx` | Right-side panel that edits the selected node |
| `NodeFields.jsx` | Shared field renderer (text/textarea/number/select/tags) |
| `StepsBuilder.jsx` | Classic linear "steps" view |
| `FlowPlayground.jsx` | Interpreter that runs the flow as a live chat |
| `flowContext.js` | `FlowActionsContext` exposing edit/delete/add/disconnect to nodes |

**Module catalog** (`flowCatalog`):
- **Messages** — send message · ask question · buttons · list · condition · goto
- **Operations** — subscribe · unsubscribe · update attribute · set tags · assign team · assign user · trigger chatbot · update chat status · template · time delay · WhatsApp flows · *(ai_assist exists but is hidden — product is rule-based)*
- **Integrations** — webhook · google spreadsheet · catalog · sets · product

---

## 16. Reusable UI Component Library

All in [`src/components/ui/`](src/components/ui/).

| Component | Notes |
|-----------|-------|
| **Button** | `variant` (primary/secondary/ghost/danger/outline/success), `size`, `loading`, polymorphic `as` |
| **Card** | `Card`, `CardHeader`, `CardBody`, `CardTitle` |
| **Badge** | tone-based status pills |
| **Input** | `Input` (with `icon`), `Textarea`, `Select`, `Label`, `Field` |
| **Modal** | `open`/`onClose`/`title`/`footer`/`size`, esc-to-close, scroll lock |
| **Avatar** | initials fallback |
| **Toggle** | accessible switch |
| **Spinner** | + `LoadingBlock`, `Skeleton` |
| **EmptyState** | icon/title/description/action |
| **StatCard** | dashboard metric |
| **PageHeader** | title row |
| **Charts** | dependency-free SVG: `BarChart`, `LineChart`, `DonutChart`, `Sparkline`, `ProgressBar` |

Helper: [`utils/cn.js`](src/utils/cn.js) joins class names. (Note: chart components default to a
`#6366f1` stroke; pages pass the brand color explicitly where it matters.)

---

## 17. The Chat Widget

[`components/widget/ChatWidget.jsx`](src/components/widget/ChatWidget.jsx) — a self-contained,
interactive chatbot preview.
- **`mode="floating"`** — launcher button + pop-up panel
- **`mode="inline"`** — always-open panel for preview cards
- Props: `themeColor`, `botName`, `welcomeMessage`, `quickReplies`, `startOpen`
- Includes a small mock rule engine so the preview feels alive.

Used on the Hero and (in the dormant portal) the Create Chatbot and Widget Install pages.
This is distinct from `AIAssistant.jsx`, which is the Claude-backed site assistant.

---

## 18. Design System & Theming

### Colors — [`tailwind.config.js`](tailwind.config.js)
- **`brand`** (50–950): deep navy, primary `brand-600 = #284b7d`
- **`accent`** (50–950): warm orange, `accent-400 = #e9853d`
- **`surface`** (50–950): cool slate neutral scale
- Custom **shadows** (`soft`, `card`, `glow`) and **animations** (`fade-in`, `fade-in-up`,
  `scale-in`, `slide-up`, `bounce-subtle`), plus `tailwindcss-animate`.

### Typography
- **Outfit** for display/headings, **Plus Jakarta Sans** for body — loaded in `index.html`.

### Theme (light only)
- `ThemeContext.jsx` **removes** the `dark` class on mount and does not persist a choice,
  so the app is effectively **light-only** and `dark:` utilities are inert. The dark
  variants remain in the markup for a future re-enable. There is **no `localStorage` theme
  key** (the previous `botforge-theme`/no-flash script is gone).

### Base styles — [`index.css`](src/index.css)
Tailwind layers plus utilities: `.container-page`, `.text-gradient-brand`, `.glass`,
`.aurora`, `.skeleton` shimmer, branded scrollbar, caret-blink for the typewriter, focus rings.

---

## 19. SEO & Metadata

- [`components/Seo.jsx`](src/components/Seo.jsx) — **dependency-free** head manager (no
  react-helmet). Updates `document.title`, description, canonical, Open Graph, Twitter, and
  robots tags on route change. Base URL `https://vartabot.in`, default OG image `/og-image.svg`.
- `index.html` — title "VartaBot — No-Code Chatbot Platform", `theme-color #284b7d`, Open
  Graph + Twitter tags, and JSON-LD (Organization, WebSite, SoftwareApplication).
- `public/robots.txt` disallows `/app/`, `/admin/`, `/agent/`, `/login`, `/register`.
- `public/sitemap.xml` lists the public URLs.

---

## 20. Legal & Privacy

Legal copy lives in [`src/pages/public/legalContent.js`](src/pages/public/legalContent.js) and
is rendered by `LegalPage.jsx` (keyed by `docKey`): **privacy, terms, security, gdpr, cookies**.

The content is a **thorough, professionally-structured starting point** covering, for Privacy:
who we are (controller/processor split), data collected, how it's used, GDPR legal bases,
sharing & sub-processors, international transfers, retention, security, your rights, cookies,
children's privacy, changes, and contact. Terms, Security, GDPR, and Cookies are expanded to
match.

> ⚠️ **Not legal advice.** Have a qualified lawyer review and adapt this copy for your
> jurisdiction(s) and your real data flows before launch. Keep each "Last updated" date
> accurate when you change the text. Contact addresses used: `privacy@vartabot.in`,
> `security@vartabot.in`, `legal@vartabot.in`, `support@vartabot.in`.

---

## 21. Mock Data Layer

All sample data lives in `src/data/` — swap for real API calls later.

| File | Contains |
|------|----------|
| **`mockData.js`** | `currentUser`, `dashboardStats`, `conversationsSeries`, `recentActivity`, `chatbots`, `rules`, `conversations`, `leads`, landing content (`features`, `howItWorks`, `comparison`, `integrations`, `trustLogos`, `brandStats`, `testimonials`, `faqs`), `billingTerms`, `pricingPlans` (INR), `lifetimeDeal`, widget preview config, `embedSnippet` |
| **`portalData.js`** | `adminUser`, `agentUser`, `platformStats`, `customers`, `billingOverview`, `monitoredChatbots`, `adminSeries`, `agents`, `agentDashboardStats`, `agentPerformance`, `quickResponses`, `agentInbox`, `ruleCategories`, `customerAnalytics` |
| **`flowNodes.js`** | `flowCatalog`, `flowCategories`, `categoryAccent`, helpers, seed flow |
| **`blogPosts.js`** | `blogPosts` (slug, title, excerpt, category, author, body sections) |
| **`docsContent.js`** | `docCategories`, `docs` (articles) |

---

## 22. State Management

- **No global store.** State is local per page via `useState`.
- **Theme** is global context (light-only).
- **Chatbots** are global context (`ChatbotsContext`) and persist to `localStorage` under
  **`vartabot-chatbots`** — add/edit/delete/clone/toggle survive refresh.
- The flow builder uses React Flow's `useNodesState`/`useEdgesState` + a small
  `FlowActionsContext`.

When a real backend lands, replace the seed-into-state pattern with data fetching + mutations
and centralise access behind a `src/services/api.js`.

---

## 23. Deployment (Vercel)

- [`vercel.json`](vercel.json): `framework: vite`, `buildCommand: npm run build`,
  `outputDirectory: dist`, and a catch-all rewrite to `/index.html` for SPA routing.
- The `api/` directory is auto-detected as serverless functions.
- [`vite.config.js`](vite.config.js) splits vendors into `vendor-motion`, `vendor-flow`,
  `vendor-icons`, and `vendor-react` chunks (chunk-size warning limit 900 KB) for better
  caching and Core Web Vitals.
- Set the environment variables from §5 in the Vercel project settings.

---

## 24. Roadmap

**Now — public pilot (done ✅)**
- Marketing site, resources, docs, blog, legal, pricing (INR)
- Pilot signup → Postgres; Claude "Ask AI" assistant
- Portals + flow builder fully built (kept dormant)

**Next — open the portals**
- Re-route `/app`, `/admin`, `/agent`; add real auth + `<ProtectedRoute>`
- Persist chatbots/rules/flows/leads to a real backend (`services/api.js` layer)

**Later — go live & monetize**
- Widget runtime (embed script) + rule engine, real lead capture
- Live agent real-time chat (WebSockets)
- Subscriptions & billing, integrations, real analytics

---

*VartaBot — built to feel like a real commercial SaaS product. Public pilot live; portals backend-ready by design.*
