# AEGIS: Bharat Nerves — MVP Capabilities

This document provides an honest, precise breakdown of what is implemented, what is mocked with deterministic logic, and what is planned for future development.

---

## Implemented

These capabilities are fully built, run real computation, and produce correct outputs.

### Frontend

| Capability | Details |
|---|---|
| **9 product pages** | Landing, Control Room, Scenario Simulator, Trade Sentinel, AI Parliament, Crisis Commander, Impact Dashboard, Reports, Resources |
| **Settings page** | Profile, notifications, security, platform preferences, data & privacy, system configuration |
| **Digital Twin Map** | Leaflet + OpenStreetMap with 20 rendered nodes, route overlays, popup details, zoom/pan |
| **Responsive design** | Fully responsive at 1440px, 1280px, 1024px, 768px — no horizontal scroll, graceful grid collapse |
| **Dark/light theme** | CSS variable-based theming, persisted to localStorage, sync'd across tabs |
| **Simulation state persistence** | localStorage-based store — simulation results survive browser refresh and flow to all intelligence pages |
| **Global simulation indicator** | Topbar shows active scenario name and status across all pages |
| **Data visualizations** | Recharts bar, line, area charts — trade flow, impact trends, recovery comparison, sector breakdown |
| **Design system** | Consistent typography, spacing, colour tokens, surface hierarchy, animation |

### Backend APIs

| Endpoint | Capability |
|---|---|
| `GET /api/health` | Health probe |
| `GET /api/nodes` | Returns all 20 infrastructure nodes from JSON |
| `GET /api/nodes/:id` | Single node lookup |
| `GET /api/routes` | Returns all 25+ corridor routes |
| `GET /api/routes/:id` | Single route lookup |
| `GET /api/scenarios` | 5 local disaster scenarios |
| `GET /api/scenarios/:id` | Single scenario |
| `GET /api/scenarios/international` | 4 international scenarios |
| `GET /api/scenarios/international/:id` | Single international scenario |
| `GET /api/agents` | 8 AI Parliament agent definitions |
| `GET /api/resources` | Response resource catalogue |
| `POST /api/scenarios/:id/run` | Scenario engine execution |
| `POST /api/scenarios/international/:id/run` | International scenario execution |
| `GET /api/route-graph/health` | Route graph service status |
| `POST /api/route-graph/shortest-path` | Dijkstra shortest path (real algorithm) |
| `POST /api/route-graph/recover` | Disruption-aware recovery routing |
| `POST /api/impact/calculate` | Multi-dimension impact calculation |
| `POST /api/simulations/run` | Full orchestrated pipeline |
| `POST /api/ai-parliament/session` | Agent deliberation (deterministic) |
| `POST /api/crisis-commander/plan` | Response plan generation (deterministic) |

### Computation Engines

**Route Graph Engine** — TypeScript implementation of:
- Bidirectional weighted graph construction from nodes.json + routes.json
- Dijkstra's algorithm for shortest-path between any two nodes
- Disruption-aware recovery routing — marks affected nodes as unavailable and finds alternative paths
- Path scoring by distance, capacity, and disruption cost

**Scenario Engine** — Resolves a scenario ID to:
- Affected infrastructure nodes (by proximity and scenario metadata)
- Disrupted routes
- Severity classification
- Estimated duration

**Impact Engine** — Formula-based calculation of:
- Economic loss (₹ Crore) — from disruption duration, node capacity, trade volume
- Population affected — from affected node coverage areas
- Carbon delta (tCO₂) — from rerouting distance multiplied by freight emission factors
- Resilience score (0–100) — composite of redundancy, recovery speed, and impact severity

**Simulation Orchestrator** — Chains:
1. Scenario Engine → gets affected nodes/routes
2. Route Graph Engine → computes recovery paths
3. Impact Engine → calculates all impact dimensions
Returns a single unified `SimulationResult` object.

---

## Mocked (Deterministic, Not Random, Not AI)

These features are fully functional and produce realistic outputs, but use deterministic rule engines rather than live data or AI/LLM calls. They are designed for LLM integration as a next step.

### AI Parliament

**What it does:** Generates a multi-agent deliberation output from a simulation result.

**How it actually works:**
- 8 agent profiles are loaded from `agents.json`
- Each agent has a domain weight vector (how much the scenario affects their domain)
- Agent position and recommendation text are selected from pre-written response templates based on scenario type and severity
- Confidence levels are computed from agent domain weight × scenario severity score
- Consensus score is a weighted average of agent confidence values

**What it does NOT do:**
- Call any LLM (Gemini, OpenAI, etc.)
- Generate novel text — all agent statements are pre-written templates
- Learn or adapt between runs

**Why this approach:** Provides a realistic, reviewable AI Parliament experience without LLM API costs or rate limits. The agent interface contract (`AgentSession` type) is designed to be a drop-in replacement when LLM integration is added.

### Crisis Commander

**What it does:** Generates a phased executive response plan from simulation + parliament output.

**How it actually works:**
- Action items are selected from a library of ~80 pre-defined response actions
- Actions are categorised by phase (Immediate / Short-term / Long-term)
- Selection is deterministic: scenario type + severity + affected infrastructure type → action set
- Resource deployment is calculated from affected node count and population impact
- Timeline durations scale with severity level

**What it does NOT do:**
- Generate novel plans
- Call any external planning service
- Learn from previous crisis plans

### Impact Forecasts

**What they are:** Formula-based estimates, not ML predictions.

**Formulas used:**
- Economic loss = `base_loss_per_day × disruption_days × severity_multiplier × affected_route_count`
- Population = `sum(node.coverage_area_population for disrupted nodes)`
- Carbon delta = `rerouted_distance_km × freight_emission_factor_tCO2_per_km`
- Resilience = `100 - (disruption_severity × 0.4 + recovery_time_factor × 0.3 + coverage_loss × 0.3)`

These are reasonable approximations for demonstration purposes, not calibrated against real historical data.

### Data Layer

All data is static JSON stored in `backend/src/data/`:

| File | Contents | Real? |
|---|---|---|
| `nodes.json` | 20 infrastructure nodes — real locations (Paradip Port, NH-16, Cuttack, etc.) | Locations real, capacity data illustrative |
| `routes.json` | 25+ corridor routes between nodes | Based on real highway/rail network topology |
| `scenarios.json` | 5 local disaster scenarios | Based on real historical events (Cyclone Fani 2019) |
| `international-scenarios.json` | 4 international scenarios | Based on real events |
| `agents.json` | 8 AI agent definitions | Fictional agent personas |
| `resources.json` | Response resource catalogue | Illustrative |

---

## Future Scope

Planned for post-hackathon development. Not implemented in this submission.

### AI/LLM Integration
- Replace the rule-based AI Parliament with real LLM agents using **LangGraph** multi-agent orchestration
- Each agent makes a live call to Gemini / GPT-4o with scenario context
- Enable inter-agent debate (agents respond to each other's positions)
- Add agent memory across scenarios

### Live Data Feeds
- **IMD (India Meteorological Department)** weather API — real cyclone tracking
- **Port AIS** vessel tracking — live ship positions at Paradip, Dhamra, Gopalpur
- **NHAI road sensors** — real-time highway blockage and congestion
- **NDMA situational reports** — disaster severity updates

### Database Layer
- PostgreSQL + PostGIS for spatial queries
- Historical simulation replay and scenario comparison
- Audit trail for crisis decisions
- Multi-user concurrent access

### Predictive Analytics
- ML-based impact forecasting using supply chain demand signals
- Weather-adjusted routing recommendations
- Predictive resilience scoring from historical incident data

### Authentication & Authorization
- Role-based access control (Field Commander / Analyst / Observer / Admin)
- Organization-level data segregation
- Audit logging per user action

### Satellite Integration
- SAR (Synthetic Aperture Radar) imagery for real-time damage assessment
- Integration with ISRO Bhuvan platform

### Government Data Integration
- NDMA real-time disaster reports
- Ministry of Shipping port status API
- NITI Aayog economic indicators
- Ministry of Road Transport highway status

### Mobile App
- React Native field commander companion
- Offline-capable mission briefing
- Real-time resource tracking

---

## Summary Table

| Capability | Status | Notes |
|---|---|---|
| Frontend UI (9 pages) | Implemented | Fully styled, responsive |
| Digital Twin Map | Implemented | Leaflet + OpenStreetMap |
| Route Graph (Dijkstra) | Implemented | Real algorithm, in-memory graph |
| Scenario Engine | Implemented | Resolves affected nodes/routes |
| Impact Calculation | Implemented (formula-based) | Not ML — deterministic formulas |
| Simulation Orchestration | Implemented | Chains all three engines |
| AI Parliament | Mocked (rule-based) | No LLM calls, template-driven |
| Crisis Commander | Mocked (deterministic) | Template-driven action selection |
| Data Layer | Mocked (static JSON) | No database, no live feeds |
| Authentication | Not implemented | Public prototype |
| LLM Integration | Not implemented | Planned: Gemini / LangGraph |
| Live Data Feeds | Not implemented | Planned: IMD, AIS, NHAI |
| Database | Not implemented | Planned: PostgreSQL + PostGIS |
| Satellite Imagery | Not implemented | Planned: ISRO Bhuvan |
