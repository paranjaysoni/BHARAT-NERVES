# AI_ARCHITECTURE.md

## Gemini Integration Overview
Project AEGIS uses **Google Gemini** exclusively for natural‑language synthesis. The LLM is invoked only from two backend services:

1. **AI Parliament Service** (`backend/src/services/ai-parliament/ai-parliament.service.ts`)
   - Receives deterministic simulation results (affected nodes, routes, impact metrics).
   - Constructs a structured prompt that asks Gemini to generate a concise narrative, a risk assessment, and actionable recommendations.
   - Returns a JSON payload containing `consensusScore`, `priorityActions`, and per‑agent recommendations.
2. **Crisis Commander Service** (`backend/src/services/crisis-commander/crisis-commander.service.ts`)
   - Uses the same deterministic inputs plus the AI Parliament narrative.
   - Sends a prompt to Gemini asking for an executive summary and high‑level briefing.
   - Returns a plan object with `planId`, `phases`, and `resources`.

### Why Gemini is Used Only for Synthesis
- **Deterministic safety‑critical logic** (routing, impact calculations, risk scoring) remains purely algorithmic in TypeScript services. This guarantees reproducibility for the demo and simplifies testing.
- **LLM adds value** when converting raw numbers into human‑readable decision support (e.g., “Activate evacuation corridors”).
- **Fallback behavior** – If the Gemini call fails (network error or API limit), the AI Parliament controller catches the exception and returns a deterministic placeholder message (e.g., *"Gemini service unavailable – using cached recommendations"*). This fallback is coded in `ai-parliament.controller.ts`.

### Implementation Details
- The Gemini client is instantiated in `backend/src/services/llm-provider.service.ts` using the `GOOGLE_GEMINI_API_KEY` environment variable (server‑side only, never exposed to the browser).
- Prompts are stored as template strings in the service files; they are not dynamically constructed from user input, reducing injection risk.
- Responses are parsed and validated before being sent to the frontend.

### Status
- **Implemented / Live** – Gemini calls succeed when the `GOOGLE_GEMINI_API_KEY` is provided in the backend environment (checked via local Docker Compose). 
- **Not Verified** – No integration tests for varying LLM responses; only a basic success path is exercised.

---

*All LLM usage is documented here; no other part of the system calls Gemini.*
