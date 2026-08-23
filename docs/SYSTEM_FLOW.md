# SYSTEM_FLOW.md

## End‑to‑End Data Flow
The diagram below shows the complete flow from the moment a user opens the application to the generation of an AI‑augmented response plan.

```mermaid
sequenceDiagram
    participant UI as Frontend UI
    participant Store as useSimulationStore (Zustand)
    participant API as Backend REST API
    participant DB as PostgreSQL (Prisma)
    participant AI as Gemini LLM
    UI->>API: POST /api/auth/login (demo credentials)
    API-->>UI: Set HTTP‑only cookie
    UI->>API: GET /api/scenarios
    API-->>UI: List of persisted scenarios
    UI->>Store: Store scenarios
    UI->>API: POST /api/simulations/run (selected scenario)
    API->>Sim: Run Simulation Orchestrator
    Sim->>ScenarioEngine: Run scenario engine
    Sim->>RouteGraph: Compute shortest and recovery routes
    Sim->>ImpactEngine: Calculate deterministic impacts
    Sim->>DB: Persist SimulationResult
    Sim-->>API: Return result JSON
    API-->>UI: Result payload
    UI->>Store: Store SimulationResult
    UI->>API: POST /api/ai-parliament/session (result payload)
    API->>AI: Gemini prompt with deterministic data
    AI-->>API: Narrative & recommendations
    API-->>UI: AI Parliament response
    UI->>API: POST /api/crisis-commander/plan (result + AI narrative)
    API->>AI: Gemini call for executive summary
    API-->>UI: Crisis Commander plan JSON
    UI->>Store: Update plan state
    UI->>UI: Render Digital Twin, dashboards, and reports using store data.
```

### Status Labels (per step)
- **Implemented / Runtime Verified** – All API calls above exist in `backend/src/routes/*` and were exercised during local runs.
- **Production Verified** – Deployments to Vercel (frontend) and Render (backend) use the same code paths.
- **Static / Client‑Derived** – UI visualisations (maps, charts) are derived from the store; no additional backend calls.
- **Fallback** – If Gemini call fails, the AI Parliament controller returns a deterministic placeholder message (checked in code).
- **Unmodeled** – Real‑time weather, AIS, PDF generation.

---

*All claims are derived from the current repository.*
