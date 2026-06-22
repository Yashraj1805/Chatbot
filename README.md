# BotForge — No-Code Chatbot SaaS (Frontend)

A premium, multi-tenant SaaS frontend for building, managing, and deploying
**rule-based** chatbots — no code required. Built with **React + Vite + Tailwind CSS**.

It ships **three separate portals** sharing one design system:

| Portal | Path | For |
| --- | --- | --- |
| 🛡️ **Super Admin** | `/admin` | Platform owner — customers, subscriptions, monitoring, analytics |
| 🤖 **Customer** | `/app` | Businesses — chatbots, rules, leads, agents, install |
| 🎧 **Live Agent** | `/agent` | Support agents — live inbox, transfers, performance |

Use the **portal switcher** in the top bar (or the role selector on the login page)
to jump between them — there's no real auth, so all three are open in the demo.

> ⚠️ **Frontend only.** There is no backend, API, database, or real auth. Everything
> runs on mock data in [`src/data/mockData.js`](src/data/mockData.js). This is the
> Phase 1 UI/UX deliverable, architected so a real backend can slot in later.

---

## ✨ What's included

| Area | Pages / Components |
| --- | --- |
| **Marketing** | Landing page — Hero, Features, How it works, Pricing, Testimonials, FAQ, CTA, Footer |
| **Auth** | Login, Register (two-pane branded layout) |
| **App** | Dashboard, Chatbots list, Create chatbot, Rules, Conversations, Leads, Widget install, Settings |
| **Widget** | Fully interactive floating chat widget preview (mock rule engine) |
| **System** | Dark mode, responsive layouts, loading/empty states, modals, toasts-ready UI kit |

### Design system
- **Brand palette** (indigo/violet) + neutral surface scale, defined in [`tailwind.config.js`](tailwind.config.js)
- **Dark mode** via `class` strategy with no-flash hydration (see [`index.html`](index.html))
- Reusable UI kit in [`src/components/ui/`](src/components/ui/): `Button`, `Card`, `Badge`,
  `Input`, `Modal`, `Avatar`, `Toggle`, `Spinner`, `EmptyState`, `StatCard`, `PageHeader`

---

## 🚀 Getting started

> **Prerequisite:** [Node.js](https://nodejs.org/) **18+** and npm. This machine did
> not have Node installed when the project was generated — install it first, then:

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (opens http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

---

## 🗺️ Routes

**Public**

| Path | Page |
| --- | --- |
| `/` | Landing page |
| `/login` | Login (with portal selector) |
| `/register` | Register |

**Customer portal** (`/app`)

| Path | Page |
| --- | --- |
| `/app/dashboard` | Dashboard (stats, activity, chart) |
| `/app/chatbots` | Chatbot list (search, filter, clone, enable/disable, delete) |
| `/app/chatbots/new` | Create chatbot (with live widget preview) |
| `/app/flow` | **Visual flow builder** — drag-and-drop chatbot workflow editor |
| `/app/rules` | Rule builder (trigger/response/category/status) |
| `/app/conversations` | Conversation history (master–detail transcript) |
| `/app/leads` | Captured leads (search, filter, export UI) |
| `/app/agents` | Live agents (add / remove / assign) |
| `/app/analytics` | Conversations, leads, response rate, transfers |
| `/app/install` | Widget installation (embed code + copy + preview) |
| `/app/settings` | Profile · Workspace · Notifications · Billing |

**Super Admin portal** (`/admin`)

| Path | Page |
| --- | --- |
| `/admin/dashboard` | Platform KPIs, revenue, health watch |
| `/admin/customers` | Customer list + detail (activate/suspend/deactivate) |
| `/admin/subscriptions` | Plans, pricing, billing overview, upgrade/downgrade |
| `/admin/chatbots` | Platform-wide chatbot health monitoring |
| `/admin/agents` | Agent availability & performance |
| `/admin/analytics` | Daily conversations, monthly leads, revenue, plans |
| `/admin/settings` | Platform · Branding · Notifications |

**Live Agent portal** (`/agent`)

| Path | Page |
| --- | --- |
| `/agent/dashboard` | Assigned / active / closed chats, queue |
| `/agent/inbox` | Live inbox: chat list · message window · customer & lead panel · quick responses · transfer / escalate / close |
| `/agent/performance` | Chats handled, resolution rate, CSAT |
| `/agent/profile` | Profile · Password · Notifications · Availability |

Any unknown route renders a styled **404** page.

> Auth is mocked: pick a portal on the login page (or use the top-bar **portal
> switcher**) to enter any of the three.

---

## 📁 Project structure

```
src/
├── main.jsx                # App entry — Router + ThemeProvider
├── App.jsx                 # Route definitions
├── index.css               # Tailwind layers + base styles
├── context/
│   └── ThemeContext.jsx    # Light/dark theme provider
├── data/
│   └── mockData.js         # ALL sample data lives here
├── utils/
│   └── cn.js               # classname helper
├── components/
│   ├── ui/                 # Reusable design-system primitives
│   ├── layout/             # DashboardLayout, Sidebar, Topbar, AuthLayout, ThemeToggle
│   ├── landing/            # Marketing page sections
│   └── widget/
│       └── ChatWidget.jsx  # Floating + inline chat widget
└── pages/                  # One file per route
```

---

## 🔌 Wiring up a real backend (later phases)

The UI is intentionally decoupled from data. To make it real:

1. Replace imports from `src/data/mockData.js` with API calls (e.g. React Query / fetch).
2. Add an auth layer and a `<ProtectedRoute>` wrapper around the `/app` routes in `App.jsx`.
3. Persist chatbot/rule/lead mutations (currently held in local component state).
4. Implement the real widget loader behind the embed snippet in the install page.

---

## 🔀 Visual flow builder

The customer portal includes a drag-and-drop chatbot **flow builder** (`/app/flow`,
or "Edit flow" on any chatbot) built on [React Flow](https://reactflow.dev/). Drag
blocks from the palette onto the canvas, connect them, and edit each block in the
properties panel. Blocks are grouped into three categories:

- **Messages** — Send a message · Ask a question (saves to a variable) · Set a condition (branches Yes/No)
- **Operations** — AI Assist (Beta) · Subscribe · Unsubscribe · Update Attribute · Set tags · Assign Team · Assign User · Trigger Chatbot · Update Chat Status · Template · Time Delay · WhatsApp Flows
- **Integrations** — Webhook · Google Spreadsheet · Catalog · Sets · Product

The whole node set lives in [`src/data/flowNodes.js`](src/data/flowNodes.js) — each
block declares its icon, color, default data, and which fields appear in the panel,
so adding a new block type is a single object. The builder is lazy-loaded so React
Flow never ships in the main bundle.

## 🧰 Tech stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** (dark mode, custom theme)
- **React Router 6**
- **React Flow** (`@xyflow/react`) — visual flow builder
- **lucide-react** icons

Built to feel like a real, commercial SaaS product. 🛠️
