# FRONTEND_STATE.md

## `useSimulationStore` Overview

The frontend maintains a single source of truth for the active simulation via a **Zustand** store defined in `frontend/src/hooks/use-simulation-store.ts`.

### Store Shape
```ts
interface SimulationStore {
  simulationId?: string;
  status: 'idle' | 'running' | 'paused' | 'completed' | 'error';
  result?: SimulationResult; // deterministic payload from backend
  plan?: CrisisPlan; // from Crisis Commander
  parliament?: AIParliamentSession; // from AI Parliament
  // UI‑only flags
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

### Lifecycle
1. **Idle** – Store is empty; UI shows the landing page.
2. **Running** – `startSimulation` posts to `/api/simulations/run`; on success `loadResult` stores the payload and sets `status='running'`.
3. **Paused / Resumed** – UI playback controls toggle `status` without additional backend calls (client‑side playback).
4. **Completed** – Backend returns a final result; `status='completed'`.
5. **Reset** – Clears all fields, returns to **Idle**.

### Why This Exists
- Prevents multiple components from issuing duplicate API calls.
- Enables deterministic UI playback (speed slider, scrubbing) based on stored result.
- Provides a hook for AI‑generated data (parliament, plan) to be merged into the same state.

### Verification
- The store is imported in every page under `frontend/src/app/(app)/*` (see `grep` output). Changing its shape would break many components, confirming its central role.

---

*All information is taken from the source file; no assumptions were made.*
