# Project AEGIS Frontend

<div align="center">

## A Self‑Healing Digital Nervous System – Frontend

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?logo=tailwindcss)](https://tailwindcss.com)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-brightgreen)](https://leafletjs.com)

</div>

---

## 1️⃣ Frontend Overview

The frontend is a **Next.js 16** application that provides the mission‑control interface for the AEGIS simulation platform. It renders the digital twin map, dashboards, AI Parliament & Crisis Commander UI, and orchestrates the end‑to‑end simulation flow through a shared client‑side state store (`useSimulationStore`). All data displayed originates from the backend APIs; the UI does **not** perform any core simulation or AI calculations.

---

## 2️⃣ Technology Stack (verified)

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Next.js | 16.2.9 |
| UI Library | React | 19.2.7 |
| Language | TypeScript | 6.0.3 |
| Styling | Tailwind CSS | 3.4.17 |
| State | Zustand | – (store lives in `src/hooks/use-simulation-store.ts`) |
| Maps | Leaflet + React‑Leaflet | 1.9.4 / 5.0.0 |
| Charts | Recharts | 3.8.1 |
| Icons | Lucide React | 1.18.0 |

---

## 3️⃣ Architecture Highlights

* **App Router** – All user‑facing pages live under `src/app/(app)/*`; the public landing page lives under `src/app/(public)`.
* **Global State** – `useSimulationStore` (Zustand) stores the latest `SimulationResult`, AI Parliament output, Crisis Commander plan, and UI flags. The store persists to `localStorage` (`project-aegis-simulation-state`).
* **API Layer** – Frontend communicates with the backend via the REST API defined in `docs/API_REFERENCE.md` (e.g., `GET /api/scenarios`, `POST /api/simulations/run`). The base URL is injected via `NEXT_PUBLIC_API_URL`.
* **Authentication** – Server‑side demo credentials (`DEMO_AUTH_USERNAME`, `DEMO_AUTH_PASSWORD`) are validated by the Next.js route `/api/auth/login`. On success an HTTP‑only session cookie is set; the client never sees the password.

---

## 4️⃣ Page / Route Matrix (live & static)

| Route | Purpose | Main Components | Data Source | Status |
|-------|---------|----------------|------------|--------|
| `/` | Landing page – marketing overview | `LandingNavbar`, `HeroSection`, `MetricsStrip` | Static markdown & mock data | 🟢 LIVE |
| `/control-room` | National Control Room dashboard | `ControlRoomHeader`, `DigitalTwinMap`, `SystemStatus` | Backend `/api/nodes`, `/api/routes` | 🟢 LIVE |
| `/scenario-simulator` | Choose scenario & run simulation | `ScenarioSelector`, `SimulationControls`, `ResultPreview` | Backend `/api/scenarios`, `/api/simulations/run` | 🟢 LIVE |
| `/trade-sentinel` | Trade corridor monitoring | `TradeMap`, `ShipmentTable` | Backend `/api/trade` (mock) | 🟡 PARTIAL (mock data) |
| `/ai-parliament` | Multi‑agent deliberation UI | `ParliamentCards`, `ConsensusGauge` | Backend `/api/ai-parliament/session` | 🟢 GEMINI (LLM) |
| `/crisis-commander` | Executive response plan UI | `PlanTimeline`, `ResourceMap` | Backend `/api/crisis-commander/plan` | 🟢 GEMINI |
| `/impact-dashboard` | Impact KPIs & heatmaps | `ImpactCharts`, `HeatmapLayer` | Backend `/api/impact/calculate` | 🟢 LIVE |
| `/resources` | Reference material & documentation links | `ResourceList`, `DetailPanel` | Static JSON (`/api/resources`) | 🟡 STATIC |
| `/reports` | CSV report generation (client‑side) | `ReportSelector`, `CsvExportButton` | Client‑side only | 🟡 STATIC |
| `/settings` | Theme & UI preferences | `ThemeToggle`, `SettingsForm` | Local storage | 🟢 CLIENT‑DERIVED |

---

## 5️⃣ State Management – `useSimulationStore`

```ts
interface SimulationStore {
  simulationId?: string;
  status: "idle" | "running" | "paused" | "completed" | "error";
  result?: SimulationResult; // deterministic payload from backend
  parliament?: AIParliamentSession; // Gemini narrative
  plan?: CrisisPlan; // Gemini executive plan
  // UI flags
  showSettings: boolean;
  showReports: boolean;
  // actions
  startSimulation: (scenarioId: string) => Promise<void>;
  pauseSimulation: () => void;
  resumeSimulation: () => void;
  reset: () => void;
  loadResult: (result: SimulationResult) => void;
}
```
* The store is imported by **every** page (see `grep` output in the audit). Changing its shape would break many components, confirming its central role.
* Persistence is handled via `localStorage` – the state survives page reloads but is cleared on explicit reset.

---

## 6️⃣ API Integration (selected endpoints)

| Method | Endpoint | Used By | Description |
|--------|----------|---------|-------------|
| `GET` | `/api/health` | Health check page | Returns `{status: "ok"}` |
| `GET` | `/api/scenarios` | Scenario Simulator | List of disaster scenarios (PostgreSQL) |
| `POST` | `/api/simulations/run` | Scenario Simulator | Orchestrates Scenario → Route‑Graph → Impact engines |
| `POST` | `/api/ai-parliament/session` | AI Parliament page | Sends deterministic result to Gemini, receives narrative |
| `POST` | `/api/crisis-commander/plan` | Crisis Commander page | Gemini‑generated executive plan |
| `GET` | `/api/nodes` | Digital Twin map | Static node catalogue (JSON) |
| `GET` | `/api/routes` | Digital Twin map | Static route catalogue (JSON) |

All endpoints are documented in `docs/API_REFERENCE.md`.

---

## 7️⃣ Authentication Flow

1. User enters username/password on the login page.
2. `POST /api/auth/login` (Next.js route) validates against server‑side env vars `DEMO_AUTH_USERNAME` / `DEMO_AUTH_PASSWORD`.
3. On success an **HTTP‑only** session cookie (`auth-token`) is set.
4. Subsequent API calls include the cookie automatically; the backend checks it for protected routes.

No credentials ever appear in client‑side JavaScript or `NEXT_PUBLIC_*` variables.

---

## 8️⃣ Local Development (verified commands)
```bash
# From the repository root
cd frontend
npm install
# Provide the backend URL for the dev server
echo "NEXT_PUBLIC_API_URL=http://localhost:4000" > .env.local
npm run dev   # → http://localhost:3000
```
The frontend uses hot‑module reloading; the Docker‑compose stack already runs the backend on port 4000.

---

## 9️⃣ Production Build & Deployment
```bash
npm run build   # creates an optimized static bundle
npm start       # runs the production server (used by Vercel)
```
The production deployment is hosted on **Vercel** (verified via `vercel.json` in the repo). The build artifact is automatically deployed on push to `main`.

---

## 🔟 Limitations (frontend specific)
| Limitation | Why | Trade‑off | Future Work |
|------------|-----|----------|------------|
| Maps use static node/route JSON; no live GIS queries. | Simplicity & deterministic demo. | No real‑time traffic or weather overlay. | Integrate MapLibre GL with PostGIS for dynamic spatial queries. |
| Reports are CSV generated client‑side. | Avoid server‑side PDF generation complexity. | No styled PDFs for judges. | Add a server‑side PDF service (e.g., puppeteer). |
| Theme toggle is limited to light/dark via CSS class. | Minimal UI polish for hackathon. | No dynamic theming per user. | Implement a full ThemeProvider with user preferences stored in the store. |

---

## 📚 Documentation Links
* Full technical docs: `docs/README.md`
* Architecture diagram: `docs/ARCHITECTURE.md`
* API reference: `docs/API_REFERENCE.md`
* State management guide: `docs/FRONTEND_STATE.md`

---

*All information above is derived from the current `main` branch; no source code has been modified.*
