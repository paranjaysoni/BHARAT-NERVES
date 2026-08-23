# ARCHITECTURE.md

## High‑Level Architecture

Project **AEGIS** is built as a clear separation of concerns between a **Next.js (React) frontend**, an **Express/TypeScript backend**, and a **PostgreSQL** database accessed through **Prisma**. The system uses **Google Gemini** as an LLM‑only for natural‑language synthesis (AI Parliament & Crisis Commander). All deterministic calculations (simulation, impact, routing) are performed server‑side.

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

### Layer Descriptions
| Layer | Responsibility | Implementation | Verification |
|-------|----------------|----------------|--------------|
| **Frontend** | UI, client‑side state, map visualisation, interaction handling. Implemented with React, TypeScript, Tailwind‑free CSS, Zustand store. Verified by running the Next.js dev server and exercising pages. |
| **Backend** | HTTP API, deterministic simulation, routing, impact calculations, LLM orchestration, auth. Implemented with Express, TypeScript, Joi validation, Prisma client. Verified by unit tests and manual API calls (curl/Postman). |
| **Database** | Persistent storage for nodes, routes, scenarios, risk configs, simulation results. Implemented with PostgreSQL, schema defined in `backend/prisma/schema.prisma`. Verified by `docker compose up` and successful queries. |
| **LLM Integration** | Gemini used only for narrative generation (AI Parliament) and executive summary (Crisis Commander). Implemented in `backend/src/services/ai-parliament` and `backend/src/services/crisis-commander`. Verified by successful API calls that return a `sessionId` and narrative. |
| **Auth** | Demo‑only username/password stored in server‑side env (`DEMO_AUTH_USERNAME`, `DEMO_AUTH_PASSWORD`). Implemented in `frontend/src/app/api/auth/login/route.ts`. Uses HTTP‑only cookies. Verified by login page working locally. |

### Not‑Implemented / Unmodeled
- Real‑time weather or AIS feeds.
- PDF report generation (only client‑side CSV).
- Production‑grade identity provider (e.g., OAuth).
- Persistent UI settings beyond session storage.

The diagram above reflects **only** connections that exist in the current codebase; any component not drawn is intentionally absent.
