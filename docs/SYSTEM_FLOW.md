# AEGIS: Bharat Nerves — System Flow

End-to-end data flow from user action to decision output.

---

## High-Level Flow

```
USER
  │
  ▼
Scenario Simulator (Frontend)
  │  selects scenario + parameters
  ▼
POST /api/simulations/run (Backend)
  │
  ├──▶ Scenario Engine
  │      loads scenario from scenarios.json
  │      resolves affected nodes (by proximity + scenario metadata)
  │      resolves disrupted routes
  │      returns: { scenario, affectedNodes[], disruptedRoutes[] }
  │
  ├──▶ Route Graph Engine
  │      builds bidirectional weighted graph (nodes.json + routes.json)
  │      marks disrupted nodes as unavailable
  │      runs Dijkstra for each broken route pair
  │      returns: { recoveryRoutes[], shortestPaths[], graphMetrics }
  │
  └──▶ Impact Engine
         calculates economic loss (₹ Cr)
         calculates population affected
         calculates carbon delta (tCO₂)
         calculates resilience score (0–100)
         returns: { economic, population, carbon, resilience }

SimulationResult assembled and returned to frontend
  │
  ▼
LocalStorage State (Frontend)
  │  stores: SimulationResult
  │  key: "project-aegis-simulation-state"
  │
  ├──▶ Impact Dashboard  (reads: economic, population, carbon, resilience)
  │
  ├──▶ POST /api/ai-parliament/session
  │      input: SimulationResult
  │      AI Parliament Service:
  │        loads 8 agents from agents.json
  │        scores each agent's domain relevance to the scenario
  │        selects agent position/recommendation from templates
  │        calculates weighted consensus score
  │      returns: { agents[], consensusScore, priorityActions[] }
  │      stored in LocalStorage: "aegis-parliament-state"
  │
  └──▶ POST /api/crisis-commander/plan
         input: SimulationResult + ParliamentResult
         Crisis Commander Service:
           selects action items by scenario type + severity
           assigns to phase (Immediate / Short-term / Long-term)
           calculates resource deployment from node count + population
           builds timeline from severity level
         returns: { phases[], resources[], timeline, readiness }
         stored in LocalStorage: "aegis-commander-state"
```

---

## Detailed Stage Breakdown

### Stage 1: Scenario Engine

**Input:**
```json
{
  "scenarioId": "cyclone-fani",
  "severity": "high",
  "radius": 80
}
```

**Process:**
1. Load scenario from `scenarios.json`
2. Load all nodes from `nodes.json`
3. For each node: calculate distance from scenario epicentre
4. Nodes within `radius` km → affected
5. Load all routes from `routes.json`
6. Routes where source or target is in affected nodes → disrupted

**Output:**
```json
{
  "scenario": { "id": "cyclone-fani", "name": "Cyclone Fani", "severity": "high" },
  "affectedNodes": ["paradip-port", "cuttack-hub", "jagatsinghpur-depot"],
  "disruptedRoutes": ["nh-16-paradip", "paradip-coastal-highway"],
  "epicentre": { "lat": 19.8, "lng": 86.0 },
  "affectedRadius": 80
}
```

---

### Stage 2: Route Graph Engine

**Input:** `affectedNodes[]`, `disruptedRoutes[]`, source/target pairs

**Graph Construction:**
```
nodes.json → 20 Node objects
routes.json → 25+ Route objects

For each route:
  add_edge(sourceNode, targetNode, weight=distance)
  add_edge(targetNode, sourceNode, weight=distance)  // bidirectional

For each affectedNode:
  mark_unavailable(node)
```

**Dijkstra Execution:**
```
For each disrupted (source, target) pair:
  run_dijkstra(
    graph=filteredGraph,
    source=source,
    target=target,
    excluded=affectedNodes
  )
  → returns: path[], totalDistance, hops, capacityScore
```

**Output:**
```json
{
  "recoveryRoutes": [
    {
      "id": "recovery-1",
      "path": ["bhubaneswar-hub", "puri-hub", "berhampur-hub"],
      "totalDistance": 142,
      "capacityScore": 0.74,
      "disruptionCost": 0.18
    }
  ],
  "graphMetrics": {
    "totalNodes": 20,
    "availableNodes": 14,
    "disruptedNodes": 6,
    "connectivityScore": 0.71
  }
}
```

---

### Stage 3: Impact Engine

**Input:** `affectedNodes[]`, `disruptedRoutes[]`, `recoveryRoutes[]`, `scenario`

**Economic Loss Calculation:**
```
base_daily_loss = sum(route.daily_trade_value for route in disruptedRoutes)
disruption_days = scenario.estimated_duration_days
severity_multiplier = { low: 0.6, medium: 0.8, high: 1.0, critical: 1.4 }[severity]
recovery_factor = 1 - (len(recoveryRoutes) × 0.15)

economic_loss_cr = base_daily_loss × disruption_days × severity_multiplier × recovery_factor
```

**Population Calculation:**
```
population_affected = sum(node.coverage_population for node in affectedNodes)
```

**Carbon Delta:**
```
rerouted_distance = sum(route.totalDistance - original_distance for route in recoveryRoutes)
carbon_delta_tCO2 = rerouted_distance × FREIGHT_EMISSION_FACTOR_tCO2_per_km
```

**Resilience Score:**
```
disruption_component = (len(affectedNodes) / total_nodes) × 40
recovery_component = (1 - len(recoveryRoutes) / max_possible_recovery) × 30
severity_component = severity_weights[severity] × 30

resilience = 100 - (disruption_component + recovery_component + severity_component)
```

**Output:**
```json
{
  "economic": {
    "lossEstimateCr": 4200,
    "revenueAtRisk": 680,
    "sectorBreakdown": {
      "trade": 1800, "agriculture": 900, "manufacturing": 850,
      "energy": 420, "healthcare": 230
    }
  },
  "population": {
    "affected": 2300000,
    "displaced": 185000,
    "atRisk": 420000
  },
  "carbon": {
    "deltaT CO2": 18400,
    "rerouting_km": 2100
  },
  "resilience": {
    "score": 62,
    "grade": "Moderate",
    "recoveryHorizonDays": 28
  }
}
```

---

### Stage 4: AI Parliament

**Input:** `SimulationResult`

**Agent Scoring:**
```
For each agent in agents.json:
  domain_relevance = agent.domain_weights[scenario.type]  // 0.0–1.0
  impact_severity = simulation.resilience.score / 100
  confidence = domain_relevance × (1 - impact_severity) + base_confidence

  // Select position template
  template_key = f"{agent.domain}_{scenario.type}_{severity_band}"
  position = POSITION_TEMPLATES[template_key]
  recommendation = RECOMMENDATION_TEMPLATES[template_key]
```

**Consensus Calculation:**
```
weighted_confidence = sum(agent.weight × agent.confidence for agent in agents)
total_weight = sum(agent.weight for agent in agents)
consensus_score = (weighted_confidence / total_weight) × 100
```

**Output:**
```json
{
  "sessionId": "session-2024-cyclone-fani",
  "scenario": "cyclone-fani",
  "consensusScore": 71,
  "priorityActions": [
    "Activate emergency coastal evacuation corridors NH-16B and NH-203",
    "Pre-position 48 hours of medical supplies at Bhubaneswar command hub",
    "Reroute Paradip export cargo via Dhamra and Gopalpur ports"
  ],
  "agents": [
    {
      "id": "infrastructure-guardian",
      "name": "Infrastructure Guardian",
      "domain": "Infrastructure",
      "confidence": 0.82,
      "position": "Cyclone Fani poses critical risk to coastal port infrastructure...",
      "recommendation": "Immediate pre-emptive closure of Paradip Port and activation of inland route BR-4..."
    }
  ]
}
```

---

### Stage 5: Crisis Commander

**Input:** `SimulationResult` + `ParliamentResult`

**Plan Generation:**
```
scenario_type = simulation.scenario.type
severity = simulation.scenario.severity
affected_infrastructure = simulation.affectedNodes.map(n => n.type)

// Select action items from action library
phase_1_actions = ACTION_LIBRARY.filter(
  a => a.phase == "immediate" &&
  a.scenario_types.includes(scenario_type) &&
  a.triggers.some(t => affected_infrastructure.includes(t))
)

// Scale resource deployment
resource_units = ceil(simulation.population.displaced / 5000)
deployment_map = allocate_resources(resource_units, affectedNodes)
```

**Output:**
```json
{
  "planId": "plan-cyclone-fani-2024",
  "phases": [
    {
      "id": "immediate",
      "label": "Immediate Response",
      "duration": "0–48 hours",
      "actions": [
        { "action": "Activate Odisha SDRF units", "owner": "OSDMA", "priority": "critical" },
        { "action": "Open emergency coastal evacuation routes", "owner": "NHAI", "priority": "critical" }
      ]
    }
  ],
  "resources": {
    "deployed": [
      { "type": "Medical Teams", "count": 12, "location": "Bhubaneswar Hub" }
    ]
  },
  "operationalReadiness": {
    "overall": 0.78,
    "byAgency": { "OSDMA": 0.88, "NDRF": 0.82, "Railways": 0.64 }
  }
}
```

---

## State Persistence Flow

```
SimulationResult
    │
    ├── localStorage["project-aegis-simulation-state"]
    │       read by: Scenario Simulator, Impact Dashboard, AI Parliament, Crisis Commander
    │
    ├── localStorage["aegis-parliament-state"]
    │       written by: AI Parliament (after API call)
    │       read by: AI Parliament display, Crisis Commander
    │
    └── localStorage["aegis-commander-state"]
            written by: Crisis Commander (after API call)
            read by: Crisis Commander display
```

---

## Frontend Data Flow

```
Page Load
    │
    ├── Static data (TypeScript files in /data/) → rendered immediately
    │   (corridors, KPIs, alerts, agent profiles, chart data)
    │
    └── Dynamic data (API calls)
        │
        ├── Control Room → GET /api/nodes + GET /api/routes
        │   → AegisMap renders nodes and routes on Leaflet map
        │
        ├── Scenario Simulator → POST /api/simulations/run
        │   → results stored to localStorage
        │   → map updates with disrupted/recovery overlays
        │
        ├── AI Parliament → POST /api/ai-parliament/session
        │   → reads simulation from localStorage
        │   → agent cards rendered with deliberation output
        │
        └── Crisis Commander → POST /api/crisis-commander/plan
            → reads simulation + parliament from localStorage
            → phases, resources, timeline rendered
```

---

## Error Handling

| Scenario | Behaviour |
|---|---|
| Backend unavailable | Frontend falls back to static data; simulation features show error toast |
| No simulation run yet | AI Parliament and Crisis Commander show "Run a simulation first" empty state |
| Invalid scenario ID | Scenario Engine returns 404; frontend shows error card |
| Route graph disconnected | If no recovery route exists, returns empty `recoveryRoutes[]` with `connectivity: false` |
| Impact calculation overflow | Clamped to maximum impact ceiling values |
