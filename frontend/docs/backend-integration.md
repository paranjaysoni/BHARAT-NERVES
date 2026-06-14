# Backend Intelligence Integration

## Overview

The frontend connects to the Project Aegis backend intelligence stack (running on `http://localhost:4000`) via three POST API calls triggered from the Scenario Simulator. The simulation result flows through a module-level store to all connected pages.

## Environment

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

Set in `.env.local`. Default falls back to `http://localhost:4000` if the variable is missing.

---

## Architecture

```
Scenario Simulator (user clicks "Run Simulation")
    │
    ▼
POST /api/simulations/run
    │
    ▼
simulation-store.ts  ← module-level singleton (no Zustand / Context)
    │
    ├──▶ Control Room       reads: dashboard.riskLevel, activeAlerts, atRiskNodes, disruptedRoutes
    ├──▶ Impact Dashboard   reads: impact.economicLossCr, populationAffected, carbonIncreaseTons
    ├──▶ AI Parliament      auto-calls POST /api/ai-parliament/session on completion
    └──▶ Crisis Commander   auto-calls POST /api/crisis-commander/plan on completion
```

---

## API Calls

### 1. Run Simulation

**Endpoint:** `POST /api/simulations/run`

**Request:**
```json
{
  "scenarioId": "odisha_cyclone_corridor",
  "sourceNodeId": "paradip_port",          // optional
  "destinationNodeId": "bhubaneswar_command", // optional
  "costMode": "TIME"                         // optional
}
```

**Response data:** `SimulationResult` — includes `dashboard`, `impact`, `digitalTwin`, `routeRecovery`, `scenario`, `recommendedNextSteps`, `summary`.

**File:** `src/lib/api/simulation.api.ts`

---

### 2. AI Parliament Session

**Endpoint:** `POST /api/ai-parliament/session`

**Request:**
```json
{
  "scenarioId": "odisha_cyclone_corridor",
  "simulationId": "sim_abc123",
  "includeFullMatrix": true
}
```

**Response data:** `AIParliamentSession` — includes `agents`, `consensus`, `recommendation`, `timeline`, `insights`, `matrix`.

**File:** `src/lib/api/ai-parliament.api.ts`

**Auto-trigger:** Called automatically when a simulation result is stored (via `useEffect` in `ParliamentPageClient`).

---

### 3. Crisis Commander Plan

**Endpoint:** `POST /api/crisis-commander/plan`

**Request:**
```json
{
  "scenarioId": "odisha_cyclone_corridor",
  "simulationId": "sim_abc123",
  "includeChecklist": true
}
```

**Response data:** `CrisisCommanderPlan` — includes `situationReport`, `executiveSummary`, `activeIncidents`, `responseActions`, `resourceDeployment`, `riskAssessment`, `checklist`, `approval`.

**File:** `src/lib/api/crisis-commander.api.ts`

**Auto-trigger:** Called automatically when a simulation result is stored (via `useEffect` in `CrisisCommanderClient`).

---

## Scenario ID Mapping

The frontend uses different scenario IDs than the backend. The mapping is defined in `ScenarioSimulatorDashboard.tsx`:

| Frontend ID | Backend ID |
|---|---|
| `scenario-cyclone-landfall` | `odisha_cyclone_corridor` |
| `scenario-port-shutdown` | `paradip_port_shutdown` |
| `scenario-highway-blockage` | `nh16_highway_blockage` |
| `scenario-warehouse-fire` | `warehouse_fire_cuttack` |

---

## State Flow

### `src/lib/simulation-store.ts`

A module-level singleton (not React Context, not Zustand). Stores:

```ts
{
  phase: "idle" | "running" | "done" | "error"
  activeScenarioId: string | null
  activeSimulationId: string | null
  result: SimulationResult | null
  parliament: AIParliamentSession | null
  commanderPlan: CrisisCommanderPlan | null
  error: string | null
}
```

Mutation functions: `setSimulationRunning`, `setSimulationDone`, `setSimulationError`, `setParliamentSession`, `setCommanderPlan`, `resetSimulation`.

### `src/hooks/use-simulation-store.ts`

React hook wrapping the store. Any component can subscribe:

```tsx
const store = useSimulationStore();
if (store.phase === "done") { /* use store.result */ }
```

---

## Pages Connected

| Page | What changes with simulation |
|---|---|
| **Scenario Simulator** | Run button calls backend; results shown in Results Preview panel |
| **Control Room** | Status banner with risk level, alerts, nodes, recovery time |
| **Impact Dashboard** | `LiveImpactKpis` replaces KPI strip with real values |
| **AI Parliament** | `ParliamentPageClient` renders full session from backend |
| **Crisis Commander** | `CrisisCommanderClient` renders full plan from backend |

---

## Loading States

- **Scenario Simulator:** `Loader2` spinner in Run button + "Running…" text in Results panel
- **AI Parliament:** Loading spinner with "Loading Parliament…" message
- **Crisis Commander:** Loading spinner with "Preparing Commander Plan…" message

## Error States

All three pages show:
- Red alert icon + error message
- Retry button (clears the `lastTriggeredSimId` ref to re-trigger)

---

## Files Created

```
src/types/simulation.types.ts
src/types/ai-parliament.types.ts
src/types/crisis-commander.types.ts

src/lib/api/client.ts
src/lib/api/simulation.api.ts
src/lib/api/ai-parliament.api.ts
src/lib/api/crisis-commander.api.ts

src/lib/simulation-store.ts
src/hooks/use-simulation-store.ts

src/components/agents/ParliamentPageClient.tsx
src/components/commander/CrisisCommanderClient.tsx
src/components/dashboard/SimulationStatusBanner.tsx
src/components/dashboard/LiveImpactKpis.tsx
```

## Files Modified

```
src/components/scenario/ScenarioSimulatorDashboard.tsx  — wired Run Simulation to backend
src/app/(app)/ai-parliament/page.tsx                    — added ParliamentPageClient
src/app/(app)/crisis-commander/page.tsx                 — added CrisisCommanderClient
src/app/(app)/control-room/page.tsx                     — added SimulationStatusBanner
src/app/(app)/impact-dashboard/page.tsx                 — added LiveImpactKpis
```
