# Global Simulation State Flow

## Purpose

A single simulation run in the Scenario Simulator propagates its results across all connected pages — Control Room, Impact Dashboard, AI Parliament, and Crisis Commander — without requiring any global state library (Zustand, Redux, Context) or page reloads.

State persists across browser refreshes via `localStorage` so that navigating away and returning still shows the active simulation.

---

## State Fields

```ts
interface SimulationStore {
  phase: "idle" | "running" | "done" | "error";
  activeScenarioId: string | null;       // frontend scenario ID
  activeSimulationId: string | null;     // backend simulationId from result
  result: SimulationResult | null;       // full simulation result
  parliament: AIParliamentSession | null; // AI Parliament session
  commanderPlan: CrisisCommanderPlan | null; // Crisis Commander plan
  error: string | null;
  isParliamentLoading: boolean;          // parliament API in-flight
  isCommanderLoading: boolean;           // commander API in-flight
  lastUpdatedAt: string | null;          // ISO timestamp of last change
}
```

---

## localStorage Persistence

**Key:** `project-aegis-simulation-state`

**What is persisted:** `phase`, `activeScenarioId`, `activeSimulationId`, `result`, `parliament`, `commanderPlan`, `lastUpdatedAt`

**What is NOT persisted:** `isParliamentLoading`, `isCommanderLoading`, `error` — these are always reset to `false`/`null` on hydration.

**On page refresh:**
- The module-level store immediately reads from `localStorage` when the module loads (client-only).
- If a previous `running` phase is found, it is downgraded to `idle` since the in-flight request was lost.
- Components subscribing via `useSimulationStore` get the hydrated state on their first render.

**On reset:**
- `localStorage.removeItem("project-aegis-simulation-state")` clears persistence.
- All fields reset to their initial values.

---

## API Flow

```
User clicks "Run Simulation"
  ↓
setSimulationRunning(scenarioId)     → phase = "running", localStorage saved
  ↓
POST /api/simulations/run
  ↓
setSimulationDone(result)            → phase = "done", result saved
  ↓ (parallel, non-blocking)
POST /api/ai-parliament/session      → setParliamentLoading(true)
POST /api/crisis-commander/plan      → setCommanderLoading(true)
  ↓
setParliamentSession(session)        → parliament saved to localStorage
setCommanderPlan(plan)               → commanderPlan saved to localStorage
```

Parliament and Commander are fired in parallel immediately after the simulation resolves. They do not block the simulation success state from rendering.

---

## Page Consumption

| Page | How it uses the store |
|---|---|
| Scenario Simulator | Drives run/reset, shows results panel, next-step nav buttons |
| Control Room | `SimulationStatusBanner` shows phase, risk level, alerts, resilience |
| Impact Dashboard | `LiveImpactKpis` replaces static KPI strip with live economic/population data |
| AI Parliament | `ParliamentPageClient` shows stored session; "Generate" button if missing |
| Crisis Commander | `CrisisCommanderClient` shows stored plan; "Generate" button if missing |
| Topbar (all pages) | `GlobalSimulationIndicator` shows active scenario, risk level, last updated |

---

## No Auto-Spam Policy

Parliament and Commander are triggered **once** — automatically from `ScenarioSimulatorDashboard.handleRun()` after simulation succeeds. Pages that display the results (`ParliamentPageClient`, `CrisisCommanderClient`) read directly from the store. They do NOT re-call the APIs on mount/navigation.

A manual "Generate" button appears if the stored data is missing (e.g. the API failed during the run). Retrying via that button is always safe.

---

## Reset Behavior

`resetSimulation()` clears:
1. `localStorage` key removed
2. All store fields reset to `INITIAL_STATE`
3. All subscribers notified — every page returns to baseline

Reset is available from:
- `GlobalSimulationIndicator` reset button (topbar, all pages)
- Scenario selection change in `ScenarioSimulatorDashboard`

---

## Error Handling

| Error | Message | Recovery |
|---|---|---|
| Simulation API failed | "Simulation failed" | Retry "Run Simulation" button |
| AI Parliament API failed | "AI Parliament failed" | "Generate Parliament Session" button |
| Crisis Commander API failed | "Crisis Commander failed" | "Generate Commander Plan" button |
| Backend unavailable | `fetch` rejects → stored error message | Verify backend on port 4000, retry |

Errors are shown in:
- `ResultsPreviewPanel` on Scenario Simulator
- `ParliamentPageClient` inline error state
- `CrisisCommanderClient` inline error state
- `SimulationStatusBanner` on Control Room / Impact Dashboard

---

## MVP Limitations

- State is per-browser-tab; different tabs do not sync unless the page reloads.
- No TTL on cached simulation — state persists indefinitely until reset.
- Parliament and Commander loading flags (`isParliamentLoading`, `isCommanderLoading`) are not persisted; on refresh they show as `false` even if a request was in-flight before the reload.
- No WebSocket or server-sent event integration — all data is a one-shot API call.
