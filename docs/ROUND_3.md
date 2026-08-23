# ROUND_3.md

## One‑Paragraph Overview
Project **AEGIS** is a web‑based disaster‑impact simulation and decision‑support platform that combines deterministic infrastructure modelling with Google Gemini‑generated natural‑language synthesis to help emergency planners explore scenarios, evaluate impacts, and produce actionable response plans.

## Problem Statement (Round 3)
The original Round 1 prototype used static JSON data and rule‑based logic, limiting realism and extensibility. Round 2 introduced a persistent PostgreSQL store, a full deterministic simulation orchestrator, and Gemini‑assisted AI Parliament & Crisis Commander, but the documentation lagged behind the code. Round 3’s objective is to deliver a **complete, judge‑ready documentation suite** that accurately reflects the current implementation without altering any source code.

## Evolution Summary
| Round | Key Change | Reason |
|------|------------|--------|
| 1 | Static JSON assets, no DB, no LLM | Minimal MVP for rapid demo. |
| 2 | PostgreSQL + Prisma, deterministic simulation engine, Gemini integration, Zustand global store. | Enables realistic, reproducible simulations and natural‑language executive reasoning. |
| 3 | Full documentation overhaul (this repository). | Provides a single source of truth for judges and engineers. |

## Architecture Overview
```mermaid
flowchart TD
    subgraph FE[Frontend (Next.js)]
        UI[UI Pages & Components]
        Store[useSimulationStore (Zustand)]
    end
    subgraph BE[Backend (Express)]
        API[REST API]
        Sim[Simulation Orchestrator]
        Impact[Impact Engine]
        RG[Route‑Graph Service]
        AI[AI Parliament & Crisis Commander]
        DB[PostgreSQL via Prisma]
    end
    Gemini[Google Gemini (LLM)]
    UI -->|fetch| API --> Sim --> DB
    Sim --> Impact --> DB
    Sim --> RG --> DB
    AI -->|LLM calls| Gemini
    AI --> DB
    Store -->|reads/writes| API
    Store -->|holds| SimulationResult
```
*All arrows correspond to code that exists in the repository.*

## Data Pipeline (Golden Path)
1. **Login** – POST `/api/auth/login` validates `DEMO_AUTH_USERNAME`/`DEMO_AUTH_PASSWORD` (server‑side env) and sets an HTTP‑only cookie.
2. **Load Scenarios** – GET `/api/scenarios` pulls persisted scenarios from PostgreSQL.
3. **Run Simulation** – POST `/api/simulations/run` triggers:
   - Scenario Engine → affected nodes/routes.
   - Route‑Graph → shortest‑path & recovery routes.
   - Impact Engine → deterministic economic, population, carbon, resilience metrics.
   - Results persisted in the DB.
4. **Store Update** – Backend returns the result; the frontend stores it in `useSimulationStore`.
5. **Digital Twin Rendering** – UI components consume the store to render maps, dashboards, and KPI charts.
6. **AI Parliament** – POST `/api/ai-parliament/session` sends deterministic simulation outputs to Gemini (via `ai-parliament.service`) which returns a narrative and recommendations.
7. **Crisis Commander** – POST `/api/crisis-commander/plan` builds an executive response plan using deterministic logic plus Gemini‑generated executive summary.
8. **Export** – Client‑side CSV export of simulation results (no server PDF).

## Status Matrix
| Component | Implementation Status |
|-----------|----------------------|
| PostgreSQL + Prisma | 🟢 **LIVE** – data persisted and queried by all services. |
| Simulation Orchestrator | 🟢 **LIVE** – deterministic, unit‑tested. |
| Impact Engine | 🟢 **LIVE** – deterministic calculations. |
| Route‑Graph Service | 🟢 **LIVE** – deterministic pathfinding. |
| AI Parliament | 🟢 **LIVE** – Gemini calls verified in code. |
| Crisis Commander | 🟢 **LIVE** – deterministic plan builder + Gemini summary. |
| UI Maps & Charts | 🟡 **PARTIAL** – derived from client store, no real‑time feeds. |
| Report Export | 🔵 **STATIC** – client‑side CSV only. |
| Real‑time weather / AIS | ⚪ **UNMODELED** – not present in the repo. |

## Engineering Rationale for Limitations
- **Deterministic core** – Critical safety‑critical calculations remain algorithmic for auditability and reproducibility.
- **LLM only for synthesis** – Gemini is used where natural language adds value; numeric logic stays deterministic.
- **No live external feeds** – Adding weather/AIS would require third‑party APIs, increase cost, and break deterministic demo guarantees.
- **Export limited to CSV** – Sufficient for judges to inspect results; PDF generation is out of scope for the hackathon deadline.

## Extensibility Path
- Replace static seed JSON with richer domain models in PostgreSQL.
- Plug‑in additional LLM providers or custom prompts.
- Add streaming adapters for weather or sensor data behind a deterministic preprocessing layer.
- Extend the UI with new dashboards without touching the backend core.

---

*All documentation reflects the actual repository state as of this commit. No source code, configuration, or secret values have been changed.*
