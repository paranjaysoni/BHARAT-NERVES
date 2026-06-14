# AEGIS: Bharat Nerves — User Guide

A complete walkthrough of the AEGIS prototype. This guide covers every page in the recommended usage order.

---

## Before You Begin

AEGIS is a simulation-driven platform. The workflow is:

1. Run a simulation in **Scenario Simulator**
2. All other intelligence pages (AI Parliament, Crisis Commander, Impact Dashboard) automatically read the simulation result

You do not need to log in. State persists in your browser for the session.

---

## 1. Landing Page

The landing page introduces the platform and its capabilities.

**What you see:**
- Hero section with platform tagline and live system status
- Capabilities overview (Digital Twin, Scenario Simulation, Route Recovery, AI Parliament, Crisis Commander)
- Scenario showcase — example disasters and their impacts
- Metrics strip — aggregate platform statistics

**What to do:**
- Click **Enter Control Room** or use the sidebar navigation to proceed into the platform

---

## 2. Control Room

**Purpose:** The national command dashboard — your real-time situational awareness view.

**What you see:**
- **KPI strip** — Active alerts, operational corridors, economic exposure, system uptime
- **Digital Twin Map** — All 20 infrastructure nodes rendered on OpenStreetMap. Nodes are color-coded by type (port, highway hub, hospital, logistics depot, command center)
- **Corridor status panel** — Health of each major trade corridor
- **Active alerts feed** — Live incident notifications with severity and affected zones
- **Analytics row** — Trade flow, incident response, cargo throughput trends

**How to use:**
- Hover nodes on the map to see infrastructure details (name, type, capacity, current status)
- Click a corridor in the status panel to see route-level health
- Use the top bar to filter by corridor (All Corridors / specific zone)

**What it represents:**
The baseline state of Odisha's infrastructure network before any simulated disruption. This is your reference point.

---

## 3. Scenario Simulator

**Purpose:** The entry point for the simulation pipeline. Everything downstream depends on what you run here.

### Running a Simulation

**Step 1 — Select a Scenario**

Choose from the scenario grid:

| Scenario | Type | Affected Zone |
|---|---|---|
| Cyclone Fani | Meteorological | Odisha Coast |
| Paradip Port Shutdown | Infrastructure | Paradip Port |
| NH-16 Highway Blockage | Logistics | Bhubaneswar–Kolkata Corridor |
| Cuttack Warehouse Fire | Supply Chain | Cuttack Hub |
| Medical Supply Shortage | Humanitarian | Eastern Odisha |
| Thailand Floods | International | Bangkok Logistics Zone |
| Pakistan Earthquake | International | Karachi Port |
| Philippines Typhoon | International | Manila Corridor |
| Yemen Crisis | International | Gulf of Aden |

**Step 2 — Configure Parameters**
- **Severity:** Low / Medium / High / Critical
- **Radius:** Affected area in km
- **Duration:** Estimated disruption period

**Step 3 — Run Simulation**

Click **Run Simulation**. The backend pipeline executes:
1. Scenario Engine identifies affected nodes and routes
2. Route Graph Engine computes alternative corridors
3. Impact Engine calculates economic, carbon, and population impacts

**What you see after simulation:**
- **Map update** — Disrupted nodes turn red, alternative routes appear in blue
- **Impact metrics panel** — Economic loss, population affected, carbon delta, resilience score
- **Affected infrastructure list** — Every disrupted node and route with status
- **Recovery routes panel** — Alternative paths with distance and capacity scores

**Step 4 — Proceed to Intelligence Modules**

Once the simulation runs, navigate to AI Parliament, Crisis Commander, or Impact Dashboard. They all automatically read the simulation result.

### Overview Panel
Below the simulator, the Overview section shows:
- Active scenario count
- Simulation history
- Aggregate impact across all runs
- System load indicators

---

## 4. Trade Sentinel

**Purpose:** Trade corridor monitoring and freight intelligence.

**What you see:**
- **Trade Network Map** — Corridor routes with real-time health overlays
- **Corridor performance table** — Risk score, throughput, delay index per corridor
- **Active shipments** — Live shipment tracking with ETA and risk flags
- **Port capacity** — Utilization percentage per port (Paradip, Dhamra, Gopalpur)
- **Trade flow trends** — Volume and value over time per corridor

**How to use:**
- Filter by corridor using the top bar selector
- Click a shipment row to expand details (origin, destination, cargo type, current risk)
- Use the port capacity panel to identify congestion before routing decisions

---

## 5. AI Parliament

**Purpose:** Multi-domain AI deliberation on the active simulation.

> Requires a completed simulation from Scenario Simulator.

**What you see:**
- **Consensus score** (0–100) — Weighted agreement across all agents
- **Priority action list** — Top recommendations from the deliberation
- **8 Agent cards:**

| Agent | Domain |
|---|---|
| Infrastructure Guardian | Physical infrastructure resilience |
| Environment Sentinel | Carbon and environmental impact |
| Humanitarian Advocate | Population welfare and aid |
| Economic Strategist | Trade and GDP recovery |
| Logistics Optimizer | Supply chain and routing |
| Risk Analyst | Threat assessment and mitigation |
| Technology Advisor | Digital systems and data |
| Policy Advisor | Regulatory and governance |

**Each agent card shows:**
- Agent name and specialization
- Confidence level (based on how much the scenario affects their domain)
- Position statement — their analysis of the crisis
- Recommended action — their priority intervention
- Estimated impact — projected outcome of their recommendation

**How to use:**
1. Read the consensus score and priority actions at the top
2. Scroll through individual agent cards to understand domain-specific perspectives
3. Notice where agents agree (Infrastructure + Logistics on rerouting) vs. conflict (Economic vs. Humanitarian on resource allocation priority)
4. Use the deliberation output to inform the Crisis Commander plan

---

## 6. Crisis Commander

**Purpose:** Executive response planning derived from simulation and parliament output.

> Requires a completed simulation from Scenario Simulator.

**What you see:**
- **Phased action plan:**
  - **Phase 1 — Immediate (0–48 hours):** Emergency actions — evacuation corridors, emergency route activation, resource pre-positioning
  - **Phase 2 — Short-term (2–14 days):** Operational continuity — supply chain rerouting, port operations, interagency coordination
  - **Phase 3 — Long-term (2–12 weeks):** Recovery — infrastructure repair, economic stabilization, lessons-learned capture
- **Resource deployment map** — Where resources are allocated geographically
- **Operational readiness panel** — Readiness status by agency/function
- **Timeline view** — Gantt-style action sequence

**How to use:**
1. Review Phase 1 actions first — these are time-critical
2. Check the resource deployment map for geographic coverage gaps
3. Use the operational readiness panel to identify which agencies need activation
4. Export the plan (Reports page) for briefing documents

---

## 7. Impact Dashboard

**Purpose:** Quantified impact analysis across economic, humanitarian, and environmental dimensions.

**What you see:**
- **KPI strip** — Economic loss, revenue at risk, population displaced, carbon delta, resilience score, recovery horizon
- **State-level heatmap** — Impact intensity by state (Odisha, West Bengal, Andhra Pradesh, etc.)
- **Sector breakdown** — Which economic sectors are most affected (Agriculture, Manufacturing, Trade, Energy, Healthcare)
- **Impact by infrastructure type** — Ports vs. highways vs. hubs
- **Recovery comparison chart** — Three trajectories:
  - Baseline (pre-disruption)
  - Disrupted (no intervention)
  - Recovery-routed (with AEGIS recommendations)
- **Carbon impact** — Rerouting emissions cost in tCO₂ and financial terms

**How to use:**
- Compare the disrupted vs. recovery-routed trajectories to see the value of AEGIS recommendations
- Use the state heatmap to identify which geographies need the most resource attention
- Sector breakdown helps prioritize intervention by economic impact

---

## 8. Reports

**Purpose:** Intelligence report library and generation.

**What you see:**
- **Report library** — 22 pre-generated reports across categories (Situation Reports, Economic Assessments, Infrastructure Audits, Recovery Plans)
- **Report viewer** — Full executive summary, key findings, recommendations
- **Metadata panel** — Author, classification, date, affected zones
- **Generation pipeline** — Status of automated report generation

**How to use:**
- Filter by category, date, or classification level
- Click any report to open in the viewer panel
- Use the export button (PDF/Excel) to download for briefing use

---

## 9. Resources

**Purpose:** Reference library for response planning.

**What you see:**
- **Featured resources** — High-priority reference documents and datasets
- **Category grid** — Organized by type (Datasets, Tools, Reports, Guidelines, Intelligence)
- **Recently added** — Latest additions including datasets with visual previews
- **Quick links** — Fast access to frequently referenced materials

---

## 10. Settings

**Purpose:** Platform configuration.

**Options available:**
- Profile settings (name, role, organization, timezone)
- Notification preferences (alerts, risk updates, reports, system updates)
- Security settings (password, 2FA, session management)
- Platform preferences (default dashboard, theme, data refresh rate, language)
- Data & privacy controls
- System preferences (alert thresholds, geographic settings, integrations)

---

## Navigation Tips

- The **sidebar** is your primary navigation. It shows all 8 platform modules.
- The **topbar** shows the current corridor context and a live system status indicator (pulsing dot when a simulation is active).
- The **theme toggle** (top-right) switches between dark and light mode.
- **Simulation state** is preserved across browser refreshes — you can close and reopen the tab and the last simulation result will still be available.

---

*For technical architecture details: [ARCHITECTURE.md](ARCHITECTURE.md)*
*For API documentation: [API_REFERENCE.md](API_REFERENCE.md)*
