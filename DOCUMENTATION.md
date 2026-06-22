# BotForge — Complete Project Documentation

> A premium, multi-tenant **no-code, rule-based chatbot SaaS platform** frontend.
> Built with React + Vite + Tailwind CSS. 100% frontend, mock-data driven (no backend yet).

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Tech Stack](#2-tech-stack)
3. [Getting Started (Setup & Run)](#3-getting-started-setup--run)
4. [High-Level Architecture](#4-high-level-architecture)
5. [Full Project Structure](#5-full-project-structure)
6. [Routing Map](#6-routing-map)
7. [The Portal System](#7-the-portal-system)
8. [Public / Marketing Pages](#8-public--marketing-pages)
9. [Authentication (Mock)](#9-authentication-mock)
10. [Customer Portal](#10-customer-portal)
11. [Super Admin Portal](#11-super-admin-portal)
12. [Live Agent Portal](#12-live-agent-portal)
13. [The Visual Flow Builder](#13-the-visual-flow-builder)
14. [Reusable UI Component Library](#14-reusable-ui-component-library)
15. [The Chat Widget](#15-the-chat-widget)
16. [Charts](#16-charts)
17. [Design System & Theming](#17-design-system--theming)
18. [Mock Data Layer](#18-mock-data-layer)
19. [State Management Approach](#19-state-management-approach)
20. [Backend Guidance (Future Phase)](#20-backend-guidance-future-phase)
21. [Suggested API Contract](#21-suggested-api-contract)
22. [Roadmap](#22-roadmap)
23. [File-by-File Reference](#23-file-by-file-reference)

---

## 1. Product Overview

**BotForge** lets businesses create, manage, and deploy **rule-based chatbots** on their
websites — *without writing code*. It is explicitly **not** an AI chatbot in this version:
the bot responds using **predefined rules, keywords, buttons, conditions, and conversation
flows** that the customer configures.

### What customers can do
- Create chatbots (name, welcome message, brand color, logo)
- Define rules (trigger → response) and full visual conversation flows
- Capture leads (name, email, phone) automatically
- Monitor conversations
- Hand off ("transfer") a conversation from the bot to a **live human agent**
- Deploy on any website via a one-line embed snippet

### Three separate interfaces (portals)
| Portal | Who | Purpose |
|--------|-----|---------|
| 🛡️ **Super Admin** | Platform owner (you) | Manage all customers, subscriptions, monitoring, platform analytics |
| 🤖 **Customer** | Businesses | Build & manage their chatbots, rules, flows, leads, agents |
| 🎧 **Live Agent** | Support staff | Handle conversations transferred from the bot |

### Visitor journey
```
Website visitor → Chatbot (rule-based) → answers / captures lead
                                       ↘ (if needed) transfer → Live Agent
```

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **React 18** |
| Build tool | **Vite 5** |
| Styling | **Tailwind CSS 3** (custom theme, dark mode via `class`) |
| Routing | **React Router 6** |
| Icons | **lucide-react** |
| Flow builder | **React Flow** (`@xyflow/react` v12) |
| Fonts | Inter (Google Fonts) |
| Data | Static mock data (no backend) |

There is **no backend, no API, no database, and no real authentication** — everything runs
on mock data so the UI/UX can be finalized and demoed first.

---

## 3. Getting Started (Setup & Run)

### Prerequisites
- **Node.js 18+** and npm

### Commands
```bash
npm install      # install dependencies
npm run dev      # start dev server → http://localhost:5173
npm run build    # production build → /dist
npm run preview  # preview the production build
```

> The project was generated on a machine where Node was installed via `winget`
> (`OpenJS.NodeJS.LTS`). In a fresh terminal `node`/`npm` are on PATH, so just
> `cd` into the project and run the commands above.

### Quick entry points (after `npm run dev`)
| URL | Page |
|-----|------|
| `/` | Landing page |
| `/about` | About / company page |
| `/login` | Customer / Live Agent login |
| `/admin/login` | Super Admin console login |
| `/register` | Sign up |
| `/app/dashboard` | Customer portal |
| `/admin/dashboard` | Super Admin portal |
| `/agent/inbox` | Live Agent inbox |

---

## 4. High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│ main.jsx → BrowserRouter → ThemeProvider → App.jsx        │
│                                                           │
│  App.jsx (Routes)                                         │
│   ├── Public: Landing, About, Login, AdminLogin, Register │
│   ├── /app/*   → PortalLayout(portals.customer) + pages   │
│   ├── /admin/* → PortalLayout(portals.admin)    + pages   │
│   ├── /agent/* → PortalLayout(portals.agent)    + pages   │
│   └── /app/chatbots/:id/flow → FlowBuilder (full screen)  │
└─────────────────────────────────────────────────────────┘
```

Key architectural ideas:
- **One generic layout** (`PortalLayout`) renders all three portals, driven by a config
  object in `src/config/portals.js` (nav items, identity, base path). Adding a nav item is
  a one-line change.
- **Theme** is a React context with no-flash hydration (applied before paint in `index.html`).
- **Reusable UI kit** in `components/ui/` keeps every page consistent.
- **Flow builder** is lazy-loaded (React Flow is heavy) and code-split into its own bundle.

---

## 5. Full Project Structure

```
Chatbot/
├── index.html                  # HTML shell + no-flash theme script + Inter font
├── package.json
├── vite.config.js
├── tailwind.config.js          # brand/surface colors, animations, shadows
├── postcss.config.js
├── .gitignore
├── README.md
├── DOCUMENTATION.md            # ← this file
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                # entry: Router + ThemeProvider
    ├── App.jsx                 # all routes
    ├── index.css               # Tailwind layers + base styles + skeleton shimmer
    │
    ├── context/
    │   └── ThemeContext.jsx    # light/dark theme provider + useTheme()
    │
    ├── config/
    │   └── portals.js          # the 3 portals: nav, user, basePath, icon
    │
    ├── utils/
    │   └── cn.js               # classNames joiner
    │
    ├── data/
    │   ├── mockData.js         # users, chatbots, rules, conversations, leads,
    │   │                       #   landing content, pricing, embed snippet
    │   ├── portalData.js       # admin (customers, subscriptions, monitoring),
    │   │                       #   agents, agent inbox, quick responses, analytics
    │   └── flowNodes.js        # flow builder node catalog + seed flow
    │
    ├── components/
    │   ├── ui/                 # design-system primitives (see §14)
    │   │   ├── Button.jsx
    │   │   ├── Card.jsx
    │   │   ├── Badge.jsx
    │   │   ├── Input.jsx
    │   │   ├── Modal.jsx
    │   │   ├── Avatar.jsx
    │   │   ├── Toggle.jsx
    │   │   ├── Spinner.jsx
    │   │   ├── EmptyState.jsx
    │   │   ├── StatCard.jsx
    │   │   ├── PageHeader.jsx
    │   │   └── Charts.jsx       # BarChart, LineChart, DonutChart, Sparkline, ProgressBar
    │   │
    │   ├── layout/
    │   │   ├── PortalLayout.jsx # generic shell (sidebar + topbar + outlet)
    │   │   ├── Sidebar.jsx      # config-driven nav
    │   │   ├── Topbar.jsx       # search, theme, notifications, profile menu
    │   │   ├── ThemeToggle.jsx
    │   │   └── AuthLayout.jsx   # two-pane login/register shell
    │   │
    │   ├── landing/
    │   │   ├── Navbar.jsx
    │   │   ├── Hero.jsx
    │   │   ├── Features.jsx
    │   │   ├── HowItWorks.jsx
    │   │   ├── Pricing.jsx
    │   │   ├── Testimonials.jsx
    │   │   ├── FAQ.jsx
    │   │   ├── CTA.jsx
    │   │   └── Footer.jsx
    │   │
    │   ├── widget/
    │   │   └── ChatWidget.jsx   # floating + inline interactive chat preview
    │   │
    │   └── flow/                # the visual flow builder (see §13)
    │       ├── flowContext.js   # FlowActionsContext (edit/delete/add/disconnect)
    │       ├── nodes.jsx        # Start / Flow / Condition / Options node components
    │       ├── edges.jsx        # DeletableEdge (disconnect button)
    │       ├── NodePalette.jsx  # left palette (click or drag to add)
    │       ├── NodePicker.jsx   # "add next block" popup (all modules)
    │       ├── NodeProperties.jsx # canvas side panel editor
    │       ├── NodeFields.jsx   # shared field renderer (text/textarea/select/tags…)
    │       ├── StepsBuilder.jsx # classic linear "steps" builder
    │       └── FlowPlayground.jsx # runs the flow as a chat (interpreter)
    │
    └── pages/
        ├── Landing.jsx
        ├── About.jsx
        ├── Login.jsx           # customer + agent
        ├── AdminLogin.jsx      # super admin (separate)
        ├── Register.jsx
        ├── NotFound.jsx
        ├── Dashboard.jsx       # customer
        ├── Chatbots.jsx
        ├── CreateChatbot.jsx
        ├── Rules.jsx
        ├── Conversations.jsx
        ├── Leads.jsx
        ├── Agents.jsx
        ├── Analytics.jsx
        ├── WidgetInstall.jsx
        ├── Settings.jsx
        ├── FlowBuilder.jsx     # per-chatbot flow editor (full screen, lazy)
        ├── admin/
        │   ├── AdminDashboard.jsx
        │   ├── Customers.jsx
        │   ├── Subscriptions.jsx
        │   ├── ChatbotMonitoring.jsx
        │   ├── AgentMonitoring.jsx
        │   ├── PlatformAnalytics.jsx
        │   └── AdminSettings.jsx
        └── agent/
            ├── AgentDashboard.jsx
            ├── LiveInbox.jsx
            ├── AgentPerformance.jsx
            └── AgentProfile.jsx
```

---

## 6. Routing Map

Defined in **`src/App.jsx`**.

### Public
| Path | Component |
|------|-----------|
| `/` | `Landing` |
| `/about` | `About` |
| `/login` | `Login` (Customer + Live Agent) |
| `/admin/login` | `AdminLogin` (Super Admin only) |
| `/register` | `Register` |
| `*` | `NotFound` (styled 404) |

### Customer portal — `/app/*` (wrapped in `PortalLayout`)
| Path | Component |
|------|-----------|
| `/app/dashboard` | `Dashboard` |
| `/app/chatbots` | `Chatbots` |
| `/app/chatbots/new` | `CreateChatbot` |
| `/app/rules` | `Rules` |
| `/app/conversations` | `Conversations` |
| `/app/leads` | `Leads` |
| `/app/agents` | `Agents` |
| `/app/analytics` | `Analytics` |
| `/app/install` | `WidgetInstall` |
| `/app/settings` | `Settings` |
| `/app/chatbots/:id/flow` | `FlowBuilder` (full-screen, lazy-loaded, outside the portal shell) |

### Super Admin portal — `/admin/*`
`dashboard`, `customers`, `subscriptions`, `chatbots`, `agents`, `analytics`, `settings`

### Live Agent portal — `/agent/*`
`dashboard`, `inbox`, `performance`, `profile`

---

## 7. The Portal System

The heart of the multi-tenant UI is **`src/config/portals.js`** — a single config object
describing each portal:

```js
portals = {
  admin:    { id, name, icon, basePath:'/admin', home:'/admin/dashboard', user, nav:[…] },
  customer: { id, name, icon, basePath:'/app',   home:'/app/dashboard',   user, nav:[…] },
  agent:    { id, name, icon, basePath:'/agent', home:'/agent/dashboard', user, nav:[…] },
}
```

- **`PortalLayout`** takes a portal and renders `<Sidebar>` + `<Topbar>` + `<Outlet>`.
- **`Sidebar`** renders the portal's `nav` array (label + icon + route). The active link is
  highlighted via `NavLink`. The customer portal also gets an "upgrade plan" card.
- **`Topbar`** shows search, theme toggle, notifications, and a profile dropdown. **Sign out**
  routes to the correct login (`/admin/login` for admin, `/login` otherwise).

> The earlier free "Switch Portal" dropdown was **removed** — each portal is now isolated and
> entered through its own login, which is the correct security model.

---

## 8. Public / Marketing Pages

### Landing (`/`) — `pages/Landing.jsx`
Composed of section components in `components/landing/`:
- **Navbar** — sticky, transparent→blurred on scroll, links (Features, How it works, Pricing, FAQ, **About**), Log in / Start free.
- **Hero** — headline, CTAs, a **live interactive widget preview**, trusted-by logos.
- **Features** — 6 feature cards.
- **HowItWorks** — 3 steps with a connector line.
- **Pricing** — 3 plans (Starter $29 / Growth $79 / Scale $199), "Most popular" highlight.
- **Testimonials** — 4 quotes + 4.9/5 rating.
- **FAQ** — accordion (one open at a time).
- **CTA** — gradient call-to-action.
- **Footer** — 4 link columns + socials.

### About (`/about`) — `pages/About.jsx`
Company page with hero, stats band, mission/story, values, team, and **Login + Sign up CTAs**
(also available in the navbar). Linked from the navbar "About" item.

---

## 9. Authentication (Mock)

There is **no real auth**. Login is simulated:

- **`/login`** (`Login.jsx`) — a role selector with **Customer** and **Live Agent**. Choosing a
  role and submitting navigates to that portal's home. Includes a "Platform owner? → Super Admin
  console" link.
- **`/admin/login`** (`AdminLogin.jsx`) — a **separate** Super Admin login with a restricted-access
  design; submitting goes to `/admin/dashboard`.
- **`/register`** (`Register.jsx`) — sign-up form; submitting enters the customer dashboard.
- **Two-pane shell** (`AuthLayout.jsx`) — form on the left, branded marketing panel on the right
  (admin login passes a custom `panel`).

To make this real later: add a `<ProtectedRoute>` wrapper around portal routes and replace the
mock navigation with real session checks.

---

## 10. Customer Portal

Base: `/app` · identity: *Harpreet Sachdev / The Sachdev Group* (mock).

| Page | File | What it does |
|------|------|--------------|
| **Dashboard** | `Dashboard.jsx` | 5 stat cards (Chatbots, Rules, Conversations, Leads, **Assigned Agents**), 14-day conversations bar chart, recent activity feed, quick chatbot list. |
| **Chatbots** | `Chatbots.jsx` | Grid of bots with search + status filter. Card menu: **Edit · Edit flow · Clone · Enable/Disable · Delete** (delete asks confirmation). Each card also has visible **Flow** & **Edit** buttons. |
| **Create Chatbot** | `CreateChatbot.jsx` | Form (name, description, welcome message, theme color presets + custom, logo upload placeholder) with a **live widget preview**. **"Save & build flow"** → redirects into that chatbot's flow builder. |
| **Rules** | `Rules.jsx` | Table (desktop) / cards (mobile) of rules. Add/Edit modal with **Trigger, Response, Type (keyword/button/fallback/flow), Category, Status**. Inline status toggle, search + type filter. |
| **Conversations** | `Conversations.jsx` | Master–detail: searchable conversation list + full transcript (bot/visitor bubbles), lead badge. |
| **Leads** | `Leads.jsx` | Table/cards of captured leads (Name, Email, Phone, Date, Source, Status), search + status filter, Export CSV button. |
| **Agents** | `Agents.jsx` | Add/remove agents, assign to chatbots, online/away/offline status. Add-agent modal. |
| **Analytics** | `Analytics.jsx` | Stat cards (Conversations, Leads, Response Rate, Agent Transfers), weekly bar chart, leads-by-bot donut, response-rate bars. |
| **Install Widget** | `WidgetInstall.jsx` | Embed snippet with **copy button**, step-by-step install guide, **live widget preview**, chatbot selector. |
| **Settings** | `Settings.jsx` | Tabs: **Profile · Workspace · Notifications · Billing** (plan, usage bars, payment method, plan comparison). |

---

## 11. Super Admin Portal

Base: `/admin` · identity: *Alex Morgan / BotForge, Inc.* (mock).

| Page | File | What it does |
|------|------|--------------|
| **Dashboard** | `admin/AdminDashboard.jsx` | 8 platform KPIs (Customers, Chatbots, Conversations, Agents, Leads, Revenue, Subscriptions, Churn), revenue line chart, plan-distribution donut, newest customers, chatbots needing attention. |
| **Customers** | `admin/Customers.jsx` | Searchable/filterable customer table; detail modal with mini-stats and **Activate / Suspend / Deactivate** controls. |
| **Subscriptions** | `admin/Subscriptions.jsx` | Plans & pricing, MRR stats, customer billing overview table (paid/overdue/failed), upgrade/downgrade controls. |
| **Chatbot Monitoring** | `admin/ChatbotMonitoring.jsx` | Platform-wide chatbot health (active/degraded/down/paused), health bars, search + filter. |
| **Agent Monitoring** | `admin/AgentMonitoring.jsx` | Agent availability cards (online/away/offline), chats handled, resolution rate. |
| **Platform Analytics** | `admin/PlatformAnalytics.jsx` | Daily conversations bar, monthly leads line, revenue line, plan donut. |
| **Settings** | `admin/AdminSettings.jsx` | Tabs: **Platform · Branding · Notifications**. |

---

## 12. Live Agent Portal

Base: `/agent` · identity: *Sam Rivera* (mock).

| Page | File | What it does |
|------|------|--------------|
| **Dashboard** | `agent/AgentDashboard.jsx` | Stats (Assigned, Active, Closed, Avg Response) + live queue list. |
| **Live Inbox** | `agent/LiveInbox.jsx` | The centerpiece: **chat list** (status filters: new/active/waiting/closed) · **message window** (bot/customer/agent/system bubbles, send replies) · **customer & lead info panel** · **quick responses** (slash-command saved replies) · **Transfer / Escalate / Close** actions. Responsive (mobile back button). |
| **Performance** | `agent/AgentPerformance.jsx` | Chats handled bar chart, resolution rate, CSAT sparkline. |
| **Profile** | `agent/AgentProfile.jsx` | Tabs: **Profile (with availability) · Password · Notifications**. |

---

## 13. The Visual Flow Builder

The flow builder is the most complex feature. It is **per-chatbot** (`/app/chatbots/:id/flow`),
opens **full-screen**, and is **lazy-loaded** (its own bundle, ~210 KB).

### Two views (toggle in the header)
| View | Description |
|------|-------------|
| **Steps** (default) | A classic **linear** builder — a bounded "Conversation steps" container. Add one module, then the next, top to bottom. Each step is a card with Edit / Delete / Move up / Move down. "+" between steps inserts there. |
| **Canvas** (advanced) | A **React Flow** node-graph. Drag/click blocks from the palette, connect handle-to-handle, branch with conditions and option nodes, pan/zoom/minimap. |

### Header actions
- **Steps ⇆ Canvas** toggle
- **Test** → opens the **Playground** (runs your flow as a live chat)
- **Save** (mock)
- **Publish** (green) → marks live, shows a "Live" badge + confirmation modal linking to install code
- Editable flow name; shows the chatbot it belongs to; "chatbot created" banner for new bots

### The module catalog — `src/data/flowNodes.js`
Every block is **one object** in `flowCatalog` (icon, category, default data, and the fields shown
in the editor). Categories:

**Messages**
- **Send a message** — message + optional quick-reply buttons (single output)
- **Ask a question** — question + saves the answer to a variable + expected input type
- **Buttons** — message + tappable buttons, **each button is its own branch (output)**
- **List** — titled menu of options, **each item is its own branch**
- **Set a condition** — variable + operator + value, branches **Yes / No**

**Operations**
- Subscribe · Unsubscribe · Update Attribute · Set tags · Assign Team · Assign User ·
  Trigger Chatbot · Update Chat Status · Template · Time Delay · WhatsApp Flows
- *(AI Assist node exists in code but is **hidden from the palette** — the product is rule-based only)*

**Integrations**
- Webhook · Google Spreadsheet · Catalog · Sets · Product

### Canvas building blocks (files in `components/flow/`)
| File | Role |
|------|------|
| `flowNodes.js` | Catalog, category list, `rfTypeFor()`, `nodeSummary()`, seed flow nodes/edges |
| `nodes.jsx` | Custom node components: `StartNode`, `FlowNode` (single out), `ConditionNode` (Yes/No), `OptionsNode` (per-option outputs). Each has a hover **Edit/Delete toolbar** and a **"+" add-next** button. |
| `edges.jsx` | `DeletableEdge` — bezier edge with a midpoint **disconnect (×)** button and optional label |
| `NodePalette.jsx` | Left palette, grouped & searchable. **Click to add** (centered) or **drag** onto canvas. |
| `NodePicker.jsx` | "Add next block" popup listing **all modules** (used by the "+" button and the Steps builder) |
| `NodeProperties.jsx` | Right-side panel that edits the selected canvas node |
| `NodeFields.jsx` | Shared field renderer (text, textarea, number, select, tag chips) used by the panel and the steps editor |
| `flowContext.js` | `FlowActionsContext` exposing `editNode`, `deleteNode`, `openAddMenu`, `deleteEdge` to nodes/edges |
| `StepsBuilder.jsx` | The classic linear container builder |
| `FlowPlayground.jsx` | **Interpreter** that runs the flow as a chat |

### Ways to add a block
1. **Click** a palette block → drops at canvas center (auto-selected)
2. **Drag** a palette block → precise placement
3. **"+" on a node** → opens the picker and **auto-connects** the chosen block
4. **Steps view** → "Add module" / "+" between steps

### Ways to edit / remove
- **Edit**: click a node (or its ✏️) → properties panel; in Steps view → edit modal
- **Delete a node**: 🗑 on the node toolbar or in the panel
- **Disconnect an edge**: the **×** button at the edge midpoint (or select + Delete key)

### The Playground (`FlowPlayground.jsx`)
A right-side chat drawer that **actually runs the graph you built**:
- `send_message` → bot bubble (+ tappable quick replies)
- `ask_question` → waits for input, stores the variable
- `buttons` / `list` → renders options; clicking follows that option's branch (`opt-N` edge)
- `condition` → evaluates the operator against collected variables, follows **Yes/No**
- operations/integrations → show a `⚙` step note and auto-advance
- **Restart** to replay; theme-color aware

In **Steps** view, the linear list is synthesized into a graph before running.

---

## 14. Reusable UI Component Library

All in `src/components/ui/`. These keep every page visually consistent.

| Component | Props / variants | Notes |
|-----------|------------------|-------|
| **Button** | `variant`: primary, secondary, ghost, danger, outline, **success**; `size`: sm/md/lg/icon; `loading`; `as` | Polymorphic (`as={Link}`) |
| **Card** | `hover`; sub-parts `CardHeader/CardBody/CardTitle` | Rounded, shadowed surface |
| **Badge** | `tone`: gray/brand/green/amber/red/blue; `dot`; `statusTone` map | Status pills |
| **Input** | `Input` (with `icon`), `Textarea`, `Select`, `Label`, `Field` | Form primitives |
| **Modal** | `open`, `onClose`, `title`, `description`, `footer`, `size` | Esc-to-close, backdrop, scroll-lock |
| **Avatar** | `name` (→ initials), `src`, `size` | Gradient fallback |
| **Toggle** | `checked`, `onChange`, `label`, `description` | Accessible switch |
| **Spinner** | `size`; also `LoadingBlock`, `Skeleton` | Loading states |
| **EmptyState** | `icon`, `title`, `description`, `action` | Empty screens |
| **StatCard** | `icon`, `label`, `value`, `delta`, `trend`, `period` | Dashboard metric |
| **PageHeader** | `title`, `subtitle`, children (actions) | Page title row |
| **Charts** | `BarChart`, `LineChart`, `DonutChart`, `Sparkline`, `ProgressBar` | Dependency-free SVG/CSS |

Helper: **`utils/cn.js`** — joins class names, filtering falsy values.

---

## 15. The Chat Widget

**`components/widget/ChatWidget.jsx`** — a self-contained, interactive chatbot widget preview.

- **`mode="floating"`** — launcher button + pop-up panel (like a real site widget)
- **`mode="inline"`** — always-open panel for embedding in preview cards
- Props: `themeColor`, `botName`, `welcomeMessage`, `quickReplies`, `startOpen`
- Features: welcome message, quick replies, typing indicator, a small **mock rule engine**
  (`mockReply`) so the preview feels alive, branded header with the chatbot's color.

Used on the Landing hero, Create Chatbot (live preview), and Widget Install pages.

---

## 16. Charts

**`components/ui/Charts.jsx`** — all charts are **dependency-free** (SVG + CSS), so there's no
charting library to ship. They are presentational placeholders driven by mock data and can be
swapped for Recharts/visx later if needed.

- `BarChart`, `LineChart` (with gradient fill), `DonutChart` (legend + %), `Sparkline`, `ProgressBar`.

---

## 17. Design System & Theming

### Colors — `tailwind.config.js`
- **`brand`** (50–950): indigo/violet identity (primary 600 = `#4f46e5`)
- **`surface`** (50–950): neutral slate scale for light + dark
- Custom **shadows** (`soft`, `card`, `glow`) and **animations** (`fade-in`, `fade-in-up`,
  `scale-in`, `slide-up`, `bounce-subtle`, shimmer)

### Dark mode
- Strategy: **`class`** (`<html class="dark">`)
- **`ThemeContext.jsx`** persists choice to `localStorage` (`botforge-theme`)
- **No-flash**: `index.html` applies the stored/system theme before React mounts
- Toggle via **`ThemeToggle.jsx`** (in topbar, navbar, auth header)

### Base styles — `index.css`
Tailwind layers, body defaults, branded scrollbar, focus rings, a `.container-page` utility, and a
`.skeleton` shimmer for loading states.

### Typography
Inter font, loaded in `index.html`.

---

## 18. Mock Data Layer

All sample data lives in `src/data/` — swap these for real API calls later.

| File | Contains |
|------|----------|
| **`mockData.js`** | `currentUser`, `dashboardStats`, `recentActivity`, `chatbots`, `rules`, `conversations`, `leads`, landing content (`features`, `howItWorks`, `pricingPlans`, `testimonials`, `faqs`), widget preview config, `embedSnippet` |
| **`portalData.js`** | `adminUser`, `agentUser`, `platformStats`, `customers`, `billingOverview`, `monitoredChatbots`, `adminSeries` (charts), `agents`, `agentDashboardStats`, `agentPerformance`, `quickResponses`, `agentInbox`, `ruleCategories`, `customerAnalytics` |
| **`flowNodes.js`** | `flowCatalog` (all modules), `flowCategories`, helpers, `initialFlowNodes/Edges` (seed flow) |

---

## 19. State Management Approach

- **No global store** (no Redux/Zustand). State is **local** to each page via `useState`.
- Lists (chatbots, rules, agents, customers, flow nodes/edges, steps) are seeded from mock data
  into component state, so add/edit/delete/clone work **in-session** (reset on refresh).
- **Theme** is the only global state (React context).
- The flow builder uses **React Flow's** `useNodesState` / `useEdgesState`, plus a small
  `FlowActionsContext` so custom node/edge components can call back into the builder.

> This is intentional for a frontend demo. When the backend lands, replace the seed-into-state
> pattern with data fetching + mutations (e.g. React Query) and persist changes.

---

## 20. Backend Guidance (Future Phase)

### When is a backend needed?
Frontend-only is fine for **demo / pitch / UX review**. A backend becomes necessary for:
1. Real login/signup & sessions
2. Persisting chatbots, rules, flows, leads (currently reset on refresh)
3. Multi-tenant data isolation (each customer sees only their data)
4. The actual website **widget runtime** (serve rules/flow + handle visitor messages)
5. Lead capture from real visitors
6. Live agent **real-time** chat (WebSockets)
7. Subscriptions & billing
8. Integrations (Webhook, Google Sheets)
9. Real analytics

### Recommended stack (rule-based, **no AI**)
```
Backend:   Node.js + TypeScript (NestJS/Express)   — OR —   Python + FastAPI
Database:  PostgreSQL (multi-tenant)  +  ORM (Prisma / SQLAlchemy)
Auth:      JWT (or Supabase Auth / Clerk)
Real-time: Socket.io (Node)  /  WebSockets + Redis (FastAPI)
Billing:   Stripe / Razorpay
Hosting:   Railway / Render / Fly.io  + Neon/Supabase (DB)
AI:        ❌ none — rules only
```

### Why the rule engine is light
Matching is just keyword/condition logic — no ML/AI, so hosting stays cheap:
```python
def match_rule(message, rules):
    text = message.lower()
    for rule in rules:
        if rule["status"] == "active" and any(k.strip() in text for k in rule["trigger"].split(",")):
            return rule["response"]
    return "Please choose an option below."
```

### Fastest path
Start with **Supabase** (Postgres + Auth + Realtime + Storage built-in) + a thin Node/FastAPI
service for the widget runtime, billing webhooks, and integrations.

---

## 21. Suggested API Contract

When wiring a backend, these endpoints map cleanly to the current UI:

```
# Auth
POST   /auth/register
POST   /auth/login
POST   /auth/admin/login
POST   /auth/logout
GET    /auth/me

# Chatbots
GET    /chatbots
POST   /chatbots
GET    /chatbots/:id
PATCH  /chatbots/:id            # rename, theme, status (enable/disable)
POST   /chatbots/:id/clone
DELETE /chatbots/:id

# Rules
GET    /chatbots/:id/rules
POST   /chatbots/:id/rules
PATCH  /rules/:ruleId
DELETE /rules/:ruleId

# Flows
GET    /chatbots/:id/flow
PUT    /chatbots/:id/flow       # save nodes+edges (or steps)
POST   /chatbots/:id/flow/publish

# Conversations & Leads
GET    /conversations
GET    /conversations/:id
GET    /leads
GET    /leads/export            # CSV

# Agents (customer)
GET    /agents
POST   /agents
DELETE /agents/:id

# Live agent
WS     /agent/inbox             # real-time chat (Socket.io / WebSocket)
POST   /conversations/:id/transfer
POST   /conversations/:id/close

# Admin
GET    /admin/customers
PATCH  /admin/customers/:id     # activate/suspend/deactivate
GET    /admin/subscriptions
GET    /admin/monitoring/chatbots
GET    /admin/monitoring/agents
GET    /admin/analytics

# Widget runtime (public, used by the embed script)
GET    /widget/:widgetId/config
POST   /widget/:widgetId/message    # rule matching → response
POST   /widget/:widgetId/lead
```

To prepare the frontend, centralize all mock data access behind a `src/services/api.js` so only
that file changes when real endpoints arrive.

---

## 22. Roadmap

**Phase 1 — Frontend (done ✅)**
- 3 portals, all pages, design system, dark mode
- Rule manager + visual flow builder (Steps + Canvas) + playground
- Mock data throughout

**Phase 2 — Backend foundation**
- Auth + PostgreSQL + multi-tenant
- CRUD for chatbots/rules/flows/leads
- `services/api.js` layer in the frontend

**Phase 3 — Go live**
- Widget runtime (embed script) + rule engine
- Lead capture
- Live agent real-time chat (WebSockets)

**Phase 4 — Monetize & scale**
- Stripe billing & plan limits
- Integrations (Webhook, Google Sheets)
- Real analytics, notifications/emails

**Nice-to-haves**
- Flow JSON export/import, per-output "+" on branching nodes, flow persistence (localStorage),
  contact section on About, `<ProtectedRoute>` for portals.

---

## 23. File-by-File Reference

### Config / root
| File | Purpose |
|------|---------|
| `index.html` | HTML shell, Inter font, no-flash theme script, `#root` |
| `vite.config.js` | Vite + React plugin, dev server on port 5173 |
| `tailwind.config.js` | Theme: brand/surface colors, shadows, animations, dark mode `class` |
| `postcss.config.js` | Tailwind + autoprefixer |
| `package.json` | Deps & scripts |

### `src/` core
| File | Purpose |
|------|---------|
| `main.jsx` | Mounts `<BrowserRouter><ThemeProvider><App/>` |
| `App.jsx` | All routes; lazy-loads FlowBuilder |
| `index.css` | Tailwind layers + base + utilities |
| `context/ThemeContext.jsx` | Theme provider + `useTheme()` |
| `config/portals.js` | The 3 portals (nav/user/paths) |
| `utils/cn.js` | className joiner |

### `src/data`
`mockData.js`, `portalData.js`, `flowNodes.js` — see §18.

### `src/components/ui`
See §14 (Button, Card, Badge, Input, Modal, Avatar, Toggle, Spinner, EmptyState, StatCard,
PageHeader, Charts).

### `src/components/layout`
`PortalLayout`, `Sidebar`, `Topbar`, `ThemeToggle`, `AuthLayout` — see §7 & §9.

### `src/components/landing`
`Navbar`, `Hero`, `Features`, `HowItWorks`, `Pricing`, `Testimonials`, `FAQ`, `CTA`, `Footer` — see §8.

### `src/components/widget`
`ChatWidget` — see §15.

### `src/components/flow`
`flowContext`, `nodes`, `edges`, `NodePalette`, `NodePicker`, `NodeProperties`, `NodeFields`,
`StepsBuilder`, `FlowPlayground` — see §13.

### `src/pages`
All page components — see §8, §10, §11, §12.

---

*BotForge — built to feel like a real commercial SaaS product. Frontend complete; backend-ready by design.*
