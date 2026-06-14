# AEGIS: Bharat Nerves — Architecture

---

## Overview

AEGIS is a client-server application with a stateless backend and browser-local state management. The architecture is designed for:

- **Deterministic reproducibility** — identical inputs always produce identical simulation outputs
- **Stateless backend** — no database required; all state lives in the client or JSON files
- **Progressive intelligence** — each layer (Simulation → Parliament → Commander) builds on the previous
- **Drop-in extensibility** — AI Parliament and live data layers have defined interfaces ready for LLM/API replacement

---

## Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│  CLIENT (Browser)                                                     │
│                                                                      │
│  ┌──────────────┐  ┌──────────────────────────────────────────────┐ │
│  │  Sidebar Nav  │  │  Page Content                               │ │
│  │  AppShell     │  │                                             │ │
│  │  Topbar       │  │  ┌────────────┐  ┌─────────────────────┐  │ │
│  └──────────────┘  │  │ Static Data│  │ Dynamic Data (API)  │  │ │
│                    │  │ (TypeScript│  │ SimulationResult    │  │ │
│  ┌──────────────┐  │  │  /data/)   │  │ ParliamentResult    │  │ │
│  │  LocalStorage│  │  └────────────┘  │ CommanderResult     │  │ │
│  │  ─────────── │  │                  └─────────────────────┘  │ │
│  │  simulation  │  │  ┌───────────────────────────────────────┐ │ │
│  │  parliament  │◀─┼──│ simulation-store.ts (read/write)      │ │ │
│  │  commander   │  │  └───────────────────────────────────────┘ │ │
│  └──────────────┘  └──────────────────────────────────────────────┘ │
└──────────────────────────────────────────┬───────────────────────────┘
                                           │ HTTP REST (CORS)
                                           │
┌──────────────────────────────────────────▼───────────────────────────┐
│  BACKEND  (Node.js / Express / TypeScript)                           │
│                                                                      │
│  ┌──────────────────┐                                               │
│  │  REST API Layer  │  ← CORS, JSON middleware, route registration  │
│  └────────┬─────────┘                                               │
│           │                                                          │
│     ┌─────┴──────────────────────────────────────────────┐         │
│     │                                                     │         │
│  ┌──▼──────────┐  ┌──────────────┐  ┌───────────────┐  │         │
│  │  Scenario   │  │ Route Graph  │  │    Impact     │  │         │
│  │  Engine     │  │ Engine       │  │    Engine     │  │         │
│  │             │  │              │  │               │  │         │
│  │ loads from  │  │ Dijkstra on  │  │ formula-based │  │         │
│  │ JSON files  │  │ in-memory    │  │ calculation   │  │         │
│  │ resolves    │  │ graph        │  │ economic      │  │         │
│  │ affected    │  │ shortest-    │  │ carbon        │  │         │
│  │ nodes/routes│  │ path +       │  │ population    │  │         │
│  └──────┬──────┘  │ recovery     │  │ resilience    │  │         │
│         │         └──────┬───────┘  └───────┬───────┘  │         │
│         └────────────────┼──────────────────┘          │         │
│                          ▼                              │         │
│              ┌───────────────────────┐                 │         │
│              │  Simulation           │                 │         │
│              │  Orchestrator         │                 │         │
│              │  (chains all three)   │                 │         │
│              └───────────┬───────────┘                 │         │
│                          │                             │         │
│              ┌───────────▼───────────┐                 │         │
│              │  AI Parliament        │                 │         │
│              │  Service              │                 │         │
│              │  (rule-based, 8       │                 │         │
│              │  agent templates)     │                 │         │
│              └───────────┬───────────┘                 │         │
│                          │                             │         │
│              ┌───────────▼───────────┐                 │         │
│              │  Crisis Commander     │                 │         │
│              │  Service              │                 │         │
│              │  (action selection    │                 │         │
│              │   + plan assembly)    │                 │         │
│              └───────────────────────┘                 │         │
│                                                        │         │
│  ┌────────────────────────────────────────────────────┘         │
│  │  Static Data Layer                                            │
│  │  nodes.json · routes.json · scenarios.json                   │
│  │  international-scenarios.json · agents.json · resources.json │
│  └───────────────────────────────────────────────────────────── │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Technology
- **Next.js 16** with App Router — enables server components, client components, and static generation
- **React 19** — component model with hooks
- **TypeScript 6** — full type safety across components and data contracts
- **Tailwind CSS 3.4** — utility-first styling with CSS variable theming

### Directory Structure

```
frontend/src/
├── app/
│   ├── layout.tsx                 # Root layout: metadata, global CSS, theme init
│   ├── globals.css                # CSS variables (light/dark), Tailwind base, animation keyframes
│   ├── (public)/
│   │   └── page.tsx               # Landing page (server component)
│   └── (app)/                     # App shell with sidebar + topbar
│       ├── layout.tsx             # AppShell wrapper
│       ├── control-room/page.tsx
│       ├── scenario-simulator/page.tsx
│       ├── trade-sentinel/page.tsx
│       ├── ai-parliament/page.tsx
│       ├── crisis-commander/page.tsx
│       ├── impact-dashboard/page.tsx
│       ├── reports/page.tsx
│       ├── resources/page.tsx
│       └── settings/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx           # Sidebar + topbar wrapper
│   │   ├── Sidebar.tsx            # Navigation sidebar with logo
│   │   ├── Topbar.tsx             # Per-page top bar (5 variants)
│   │   └── ThemeToggle.tsx        # Dark/light toggle with localStorage sync
│   ├── shared/
│   │   ├── AppLogo.tsx            # SVG logo component (mark + full variants)
│   │   ├── MetricCard.tsx         # KPI display card
│   │   ├── AlertCard.tsx          # Alert/incident card
│   │   ├── DataTable.tsx          # Generic sortable table
│   │   ├── PageHeader.tsx         # Consistent page header
│   │   ├── SectionCard.tsx        # Panel wrapper
│   │   ├── StatusBadge.tsx        # Severity/status pill
│   │   ├── RiskPill.tsx           # Risk level indicator
│   │   └── ChartCard.tsx          # Chart wrapper with header
│   ├── maps/
│   │   ├── AegisMap.tsx           # Server wrapper (dynamic import SSR-off)
│   │   ├── AegisMapClient.tsx     # Leaflet map client component
│   │   ├── NodeMarker.tsx         # Infrastructure node markers
│   │   ├── RouteLayer.tsx         # Corridor route polylines
│   │   └── HeatmapLayer.tsx       # Impact heatmap overlay
│   ├── dashboard/                 # Control Room sub-panels
│   ├── scenario/                  # Scenario Simulator sub-panels
│   ├── agents/                    # AI Parliament agent cards
│   ├── commander/                 # Crisis Commander panels
│   └── landing/                   # Landing page sections
│
├── data/                          # Frontend TypeScript data files
│   ├── control-room.ts
│   ├── scenario-simulator.ts
│   ├── trade.ts · shipments.ts · corridors.ts
│   ├── parliament.ts · agents.ts
│   ├── crisis-commander.ts
│   ├── impact.ts · metrics.ts
│   ├── alerts.ts · nodes.ts · routes.ts · scenarios.ts
│   ├── reports.ts · resources.ts
│   ├── navigation.ts · user.ts · system-status.ts
│   └── settings.ts
│
└── lib/
    └── simulation-store.ts        # Global simulation state (localStorage)
```

### State Management

No Redux or Zustand. State management is handled by a module-level store in `simulation-store.ts`:

```typescript
// Writes on simulation completion
setSimulationState(result: SimulationResult): void

// Reads on page load
getSimulationState(): SimulationResult | null

// Clears on new simulation
clearSimulationState(): void
```

Persistence: `localStorage` key `"project-aegis-simulation-state"`.

Pages that consume simulation state:
- `Scenario Simulator` — writes
- `AI Parliament` — reads
- `Crisis Commander` — reads
- `Impact Dashboard` — reads

### Map Architecture

Maps are SSR-disabled via `next/dynamic`:

```typescript
// AegisMap.tsx
const AegisMapClient = dynamic(() => import("./AegisMapClient"), { ssr: false });
```

**Why:** Leaflet accesses `window` on load, which is unavailable in Node.js SSR.

**Map data flow:**
```
GET /api/nodes → NodeMarker components → rendered on Leaflet map
GET /api/routes → RouteLayer component → polylines on Leaflet map
Simulation result → disrupted nodes highlighted red, recovery routes blue
```

### Theme System

Light/dark theme via CSS custom properties:

```css
:root { --background: 210 36% 97%; --primary: 221 83% 48%; ... }
.dark { --background: 222 44% 8%; --primary: 217 91% 62%; ... }
```

Theme toggled by adding/removing `.dark` class on `<html>`. State persisted to `localStorage["project-aegis-theme"]` and sync'd across tabs via `storage` event.

---

## Backend Architecture

### Technology
- **Node.js 18+** — runtime
- **Express 4.19** — REST API framework
- **TypeScript 5.4** — type safety
- **No database** — all data from static JSON files loaded at startup

### Request Flow

```
HTTP Request
    │
    ▼
Express Router
    │
    ├── Middleware: CORS, JSON body parser, request logging
    │
    ▼
Route Handler
    │
    ├── Validates request body/params
    ├── Calls service(s)
    └── Returns JSON response (200 / 400 / 404 / 500)
    │
    ▼
Service Layer
    │
    ├── Scenario Engine Service
    ├── Route Graph Service
    ├── Impact Engine Service
    ├── Simulation Orchestrator Service
    ├── AI Parliament Service
    └── Crisis Commander Service
    │
    ▼
Data Layer
    │
    └── JSON files (loaded at startup, cached in memory)
```

### Service Architecture

**Scenario Engine** (`src/services/scenario-engine/`)
- Loads `scenarios.json` or `international-scenarios.json`
- Computes node proximity to epicentre
- Returns `AffectedInfrastructure` object

**Route Graph Engine** (`src/services/route-graph/`)
- Builds `Map<nodeId, Map<nodeId, EdgeWeight>>` from nodes + routes
- Implements Dijkstra with priority queue
- Supports node exclusion for disruption modelling
- Returns `RecoveryRoute[]` with path, distance, and capacity score

**Impact Engine** (`src/services/impact-engine/`)
- Pure functions — no side effects
- Formula-based calculation of all four impact dimensions
- Returns `ImpactResult` with economic, population, carbon, resilience fields

**Simulation Orchestrator** (`src/services/simulation/`)
- Calls Scenario Engine → Route Graph Engine → Impact Engine in sequence
- Assembles unified `SimulationResult`
- Single entry point for the full pipeline

**AI Parliament Service** (`src/services/ai-parliament/`)
- Loads agent definitions from `agents.json`
- Scores each agent's domain relevance
- Selects position/recommendation templates
- Calculates weighted consensus
- Returns `ParliamentSession`

**Crisis Commander Service** (`src/services/crisis-commander/`)
- Reads `SimulationResult` + `ParliamentSession`
- Selects action items from embedded action library
- Assigns phases, owners, priorities
- Returns `CommanderPlan`

---

## Data Flow

```
Static Files (boot)
    nodes.json ──────────────────────────────┐
    routes.json ─────────────────────────────┤
    scenarios.json ──────────────────────────┤
    international-scenarios.json ────────────┤──▶ In-memory cache
    agents.json ─────────────────────────────┤
    resources.json ──────────────────────────┘

API Request (runtime)
    POST /api/simulations/run
        → reads from cache (no disk I/O)
        → executes computation
        → returns JSON
        → no writes anywhere
```

The backend is fully stateless. Two concurrent requests with the same input always return the same output.

---

## Deployment Architecture

### Current (Hackathon MVP)

```
┌─────────────────────┐     ┌─────────────────────────┐
│  Vercel              │     │  Render / Railway        │
│  ─────────────────  │     │  ─────────────────────── │
│  Next.js frontend   │────▶│  Express backend          │
│  Static generation  │     │  Node.js 18+              │
│  Edge CDN           │     │  Single instance          │
└─────────────────────┘     └─────────────────────────┘
```

### Target (Production)

```
┌──────────────────────────────────────────────────────┐
│  CDN (Cloudflare / AWS CloudFront)                   │
│  → Next.js static assets                             │
└─────────────────────────────┬────────────────────────┘
                              │
┌─────────────────────────────▼────────────────────────┐
│  Application Load Balancer                            │
└─────────┬──────────────────────────────┬─────────────┘
          │                              │
┌─────────▼──────────┐      ┌───────────▼────────────┐
│  Frontend (Vercel)  │      │  Backend (ECS / K8s)   │
│  Next.js 16 App    │      │  Express API            │
│  SSG + ISR         │      │  Horizontal scaling     │
└────────────────────┘      └───────────┬─────────────┘
                                        │
                            ┌───────────▼─────────────┐
                            │  PostgreSQL + PostGIS    │
                            │  (replaces static JSON)  │
                            └─────────────────────────┘
```

---

## Security Considerations (MVP)

| Area | Current State | Production Requirement |
|---|---|---|
| Authentication | None | JWT / OAuth 2.0 |
| Authorization | None | Role-based (RBAC) |
| API rate limiting | None | Rate limiter middleware |
| Input validation | Basic | Zod schema validation |
| CORS | Configured (localhost + prod origin) | Allowlist by environment |
| HTTPS | Via hosting platform | Required |
| Data sensitivity | Static JSON only | Encrypted at rest + in transit |
