# AEGIS: Bharat Nerves — Judge Guide

> Estimated reading time: 3 minutes. Estimated demo time: 5 minutes.

---

## What This Project Solves

When a cyclone hits Odisha's coast, it doesn't just destroy property — it severs port connections, collapses highway corridors, disrupts medical supply chains, and creates cascading trade losses worth thousands of crores. India has no unified digital system to see, simulate, and respond to this in real time.

**AEGIS** is that system. It is a self-healing national intelligence platform that:

1. Accepts a disaster scenario as input
2. Runs it through a multi-stage simulation pipeline (route graph + impact engine)
3. Surfaces multi-domain AI recommendations (AI Parliament)
4. Generates an executable crisis response plan (Crisis Commander)
5. Presents decision-ready intelligence to commanders and policy makers

---

## What to Click First — Recommended 5-Minute Flow

### 1. Land on the Control Room (30 seconds)
The command dashboard. Notice the Digital Twin Map — 20 real infrastructure nodes across Odisha and eastern India: ports, highways, hospitals, logistics hubs, command centers. All connected by trade corridors. This is the baseline before any disruption.

### 2. Go to Scenario Simulator (90 seconds)
This is where the simulation pipeline begins.

- Select **Cyclone Fani** from the scenario list
- Notice the scenario metadata: affected area, severity, estimated disruption
- Click **Run Simulation**

Watch the pipeline execute:
- Affected nodes are highlighted on the map (red = disrupted)
- Recovery routes are computed via Dijkstra's algorithm (blue = alternative path)
- Impact metrics appear: economic loss, population affected, carbon delta, resilience score

### 3. Go to AI Parliament (60 seconds)
Eight AI agents — representing Infrastructure, Environment, Humanitarian, Economic, Logistics, Risk, Technology, and Policy domains — each present their analysis of the crisis.

- Read the consensus score at the top (0–100)
- Review each agent's priority recommendation
- Notice how agents with conflicting priorities (e.g., Economic vs. Humanitarian) are weighted and reconciled

### 4. Go to Crisis Commander (60 seconds)
The executive layer. A phased response plan is automatically generated:

- **Immediate (0–48 hours):** Evacuation, emergency route activation
- **Short-term (2–14 days):** Supply chain rerouting, port operations
- **Long-term (2–12 weeks):** Infrastructure repair, economic recovery

Review the resource deployment map and operational readiness panel.

### 5. Go to Impact Dashboard (60 seconds)
- State-level impact heatmap
- Sector-by-sector economic breakdown
- Recovery trajectory comparison: baseline vs. disrupted vs. recovery-routed
- Resilience score over time

---

## Key Innovations

### 1. Unified Simulation Pipeline
A single API call (`POST /api/simulations/run`) orchestrates three independent engines in sequence: Scenario Engine → Route Graph Engine → Impact Engine. The result is a consistent, reproducible simulation state that flows across all five intelligence modules without re-computation.

### 2. Real Route Optimization
The Route Graph Engine implements **Dijkstra's algorithm** on a bidirectional graph of 20 infrastructure nodes and 25+ trade corridors. When a scenario disrupts nodes, the engine automatically computes alternative recovery paths weighted by distance, capacity, and disruption cost. This is real graph computation, not a lookup table.

### 3. Multi-Domain AI Deliberation (AI Parliament)
Eight agents with distinct domain priorities and confidence weights deliberate over the simulation output. Each agent's recommendation is scored against the crisis parameters. A weighted consensus score is computed. This architecture is designed to be replaced with real LLM agents (Gemini / GPT-4o via LangGraph) in production — the interface contract is already defined.

### 4. Persistent Simulation State
Simulation results are stored in browser-local state and automatically consumed by AI Parliament, Crisis Commander, and Impact Dashboard — without any additional API calls. This creates a coherent intelligence flow across the entire application from a single simulation run.

### 5. Full-Stack TypeScript
Frontend (Next.js 16 + React 19) and Backend (Express + TypeScript) share a consistent data model, making the architecture immediately extensible. No database dependency — the system runs entirely on static JSON + in-memory computation.

---

## Expected Outputs from the Demo

After running the *Cyclone Fani* simulation, you should see:

| Metric | Example Output |
|---|---|
| Affected nodes | 6 infrastructure nodes |
| Disrupted routes | 4 primary corridors |
| Recovery routes found | 2–3 alternative paths |
| Economic loss estimate | ₹3,800–5,200 Cr |
| Population affected | 2.1–2.8M |
| Carbon delta | +16,000–22,000 tCO₂ |
| Resilience score | 58–68 / 100 |
| Parliament consensus | 65–78 / 100 |
| Action items generated | 12–18 across three phases |

---

## Honest Capability Assessment

| Capability | Status |
|---|---|
| Route graph computation (Dijkstra) | Real algorithm |
| Impact quantification | Formula-based (not ML) |
| Scenario engine | Real — resolves nodes/routes from JSON data |
| AI Parliament deliberation | Rule-based — not LLM-powered |
| Crisis Commander plans | Deterministic template engine |
| Maps | Real OpenStreetMap via Leaflet |
| Data | Static JSON — no live feeds |

This is an honest, production-architected MVP. The hard parts (graph engine, simulation orchestration, impact calculation) are fully implemented. The AI layer is a well-designed rule engine ready for LLM integration.

---

## Architecture in One Sentence

A Next.js frontend calls an Express backend that chains a Scenario Engine → Dijkstra Route Graph → Impact Engine into a single simulation API, then feeds the result into a rule-based AI Parliament and Crisis Commander, with all state persisted locally for cross-module coherence.

---

*For full system documentation: [ARCHITECTURE.md](ARCHITECTURE.md) · [SYSTEM_FLOW.md](SYSTEM_FLOW.md) · [API_REFERENCE.md](API_REFERENCE.md)*
