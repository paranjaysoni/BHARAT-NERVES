# Backend Architecture (Round 3)

> **Purpose** – Provide a concise, accurate view of the **actual** backend implementation as of the final Round 3 submission. This replaces the previous stale description that referenced a deterministic mock AI Parliament.

## Overview
The backend is a **Node.js 18+** + **Express 4.19** service written in **TypeScript 5.4**. It exposes a set of **REST API** endpoints that drive the full simulation pipeline and the Gemini‑backed AI services.

### Core Layers
```mermaid
flowchart TB
    subgraph BE["Backend – Express + TypeScript"]
        API[REST API Layer]
        SE[Scenario Engine]
        RG[Route‑Graph Engine]
        IE[Impact Engine]
        SIM[Unified Simulation Orchestrator]
        AIP[AI Parliament Service (Gemini)]
        CCS[Crisis Commander Service (Gemini)]
        DB[Prisma → PostgreSQL]
    end
    API --> SE
    API --> RG
    API --> IE
    API --> SIM
    SIM --> SE
    SIM --> RG
    SIM --> IE
    AIP -->|LLM calls| GEM[Google Gemini]
    CCS -->|LLM calls| GEM
    AIP --> DB
    CCS --> DB
```
* **Static Data Layer** – Nodes, routes, scenarios, agents, and resources are stored as JSON files under `src/data/` and served via simple read‑only endpoints (e.g., `/api/nodes`).
* **Prisma** – The only persistent layer is a PostgreSQL database used for **user authentication** and **future extensibility**; the simulation itself remains deterministic and does **not** write to the DB.
* **Gemini Integration** – Both AI Parliament and Crisis Commander call the **Google Gemini** API (`@google/genai`). The API key lives in `backend/.env` as `GOOGLE_GEMINI_API_KEY` and is never exposed client‑side.

## Request Flow (verified)
1. **Health** – `GET /api/health`
2. **Static data** – `GET /api/nodes`, `GET /api/routes`, `GET /api/scenarios`, etc.
3. **Unified Simulation** – `POST /api/simulations/run` orchestrates the three deterministic engines and returns a full `SimulationResult`.
4. **AI Parliament** – `POST /api/ai-parliament/session` receives the simulation result, builds a prompt, calls Gemini, and returns a structured JSON with consensus, actions, and narrative.
5. **Crisis Commander** – `POST /api/crisis-commander/plan` builds on the Parliament output to request a higher‑level executive plan from Gemini.

## Status Classification
| Component | Implementation | Data/Logic Type | Status |
|-----------|----------------|----------------|--------|
| Scenario Engine | `src/services/scenario-engine` | Deterministic | 🟢 LIVE |
| Route‑Graph Engine | `src/services/route-graph` | Deterministic (Dijkstra) | 🟢 LIVE |
| Impact Engine | `src/services/impact-engine` | Deterministic | 🟢 LIVE |
| Unified Simulation API | `POST /api/simulations/run` | Orchestrates deterministic engines | 🟢 LIVE |
| AI Parliament API | `POST /api/ai-parliament/session` | Gemini LLM synthesis | 🟢 GEMINI |
| Crisis Commander API | `POST /api/crisis-commander/plan` | Gemini LLM synthesis | 🟢 GEMINI |
| Auth (demo) | `POST /api/auth/login` (server‑side env vars) | Server‑side only | 🟢 LIVE |
| Database (PostgreSQL) | Prisma models – currently only for auth | Persistent | 🟢 DATABASE‑BACKED |

## Limitations (backend)
- No live external data feeds (weather, AIS).  
- AI services are **synthesis only** – they never affect the deterministic calculation.  
- The backend does not persist simulation results; they are returned to the client for local storage.
- PDF generation is not implemented – reports are client‑side CSV.

---

*All statements are derived from the current `main` branch code and the updated `docs/` suite.*
