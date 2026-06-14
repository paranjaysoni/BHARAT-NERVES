# AEGIS: Bharat Nerves — API Reference

Base URL (local): `http://localhost:4000`  
Content-Type: `application/json`

---

## Health

### `GET /api/health`

Service health check.

**Response `200`:**
```json
{
  "status": "ok",
  "timestamp": "2024-11-28T10:30:00.000Z",
  "version": "1.0.0"
}
```

---

## Infrastructure Data

### `GET /api/nodes`

Returns all infrastructure nodes.

**Response `200`:**
```json
[
  {
    "id": "paradip-port",
    "name": "Paradip Port",
    "type": "port",
    "lat": 20.316,
    "lng": 86.609,
    "capacity": 85000,
    "status": "operational",
    "coverage_population": 420000,
    "daily_trade_value_cr": 280
  },
  {
    "id": "bhubaneswar-hub",
    "name": "Bhubaneswar Logistics Hub",
    "type": "logistics_hub",
    "lat": 20.296,
    "lng": 85.824,
    "capacity": 12000,
    "status": "operational",
    "coverage_population": 980000,
    "daily_trade_value_cr": 95
  }
]
```

**Node types:** `port` · `logistics_hub` · `highway_hub` · `hospital` · `supply_depot` · `command_center`

---

### `GET /api/nodes/:id`

Single node by ID.

**Response `200`:** Single node object (same schema as above)  
**Response `404`:** `{ "error": "Node not found" }`

---

### `GET /api/routes`

Returns all corridor routes.

**Response `200`:**
```json
[
  {
    "id": "nh-16-bhubaneswar-paradip",
    "name": "NH-16 Bhubaneswar–Paradip",
    "source": "bhubaneswar-hub",
    "target": "paradip-port",
    "distance_km": 68,
    "capacity_tons_per_day": 8500,
    "type": "highway",
    "daily_trade_value_cr": 185,
    "status": "operational",
    "risk_score": 0.22
  }
]
```

**Route types:** `highway` · `railway` · `coastal` · `inland_waterway`

---

### `GET /api/routes/:id`

Single route by ID.

**Response `200`:** Single route object  
**Response `404`:** `{ "error": "Route not found" }`

---

### `GET /api/agents`

Returns all AI Parliament agent definitions.

**Response `200`:**
```json
[
  {
    "id": "infrastructure-guardian",
    "name": "Infrastructure Guardian",
    "domain": "Infrastructure",
    "description": "Specialized in physical infrastructure resilience and repair prioritization",
    "avatar": "shield",
    "weight": 1.2,
    "domain_weights": {
      "cyclone": 0.9, "port_shutdown": 0.85, "highway_blockage": 0.88,
      "warehouse_fire": 0.6, "medical_shortage": 0.4
    }
  }
]
```

---

### `GET /api/resources`

Returns the resource catalogue.

**Response `200`:** Array of resource objects with `id`, `name`, `type`, `quantity`, `location`, `status`

---

## Scenario Engine

### `GET /api/scenarios`

Returns all local disaster scenarios.

**Response `200`:**
```json
[
  {
    "id": "cyclone-fani",
    "name": "Cyclone Fani",
    "type": "cyclone",
    "description": "Severe cyclonic storm making landfall near Puri, Odisha",
    "epicentre": { "lat": 19.8, "lng": 86.0 },
    "defaultSeverity": "high",
    "defaultRadius": 80,
    "estimatedDurationDays": 14,
    "historicalReference": "May 2019 — Category 5 equivalent"
  }
]
```

**Scenario types:** `cyclone` · `port_shutdown` · `highway_blockage` · `warehouse_fire` · `medical_shortage`

---

### `GET /api/scenarios/:id`

Single scenario by ID.

---

### `POST /api/scenarios/:id/run`

Execute the scenario engine for a local scenario.

**Request:**
```json
{
  "severity": "high",
  "radius": 80,
  "duration": 14
}
```

**Response `200`:**
```json
{
  "scenarioId": "cyclone-fani",
  "scenario": {
    "id": "cyclone-fani",
    "name": "Cyclone Fani",
    "type": "cyclone",
    "severity": "high"
  },
  "affectedNodes": [
    { "id": "paradip-port", "name": "Paradip Port", "type": "port", "disruptionLevel": 0.92 },
    { "id": "jagatsinghpur-depot", "name": "Jagatsinghpur Depot", "type": "supply_depot", "disruptionLevel": 0.74 }
  ],
  "disruptedRoutes": [
    { "id": "nh-16-bhubaneswar-paradip", "name": "NH-16 Bhubaneswar–Paradip", "disruptionLevel": 0.88 }
  ],
  "affectedNodeCount": 6,
  "disruptedRouteCount": 4,
  "epicentre": { "lat": 19.8, "lng": 86.0 },
  "affectedRadius": 80
}
```

**Response `404`:** `{ "error": "Scenario not found" }`

---

### `GET /api/scenarios/international`

Returns all international disaster scenarios.

---

### `POST /api/scenarios/international/:id/run`

Execute the scenario engine for an international scenario. Same request/response schema as local scenario run.

---

## Route Graph Engine

### `GET /api/route-graph/health`

Route graph service status.

**Response `200`:**
```json
{
  "status": "healthy",
  "nodeCount": 20,
  "edgeCount": 52,
  "graphConnected": true,
  "lastBuiltAt": "2024-11-28T08:00:00.000Z"
}
```

---

### `POST /api/route-graph/shortest-path`

Compute the shortest path between two nodes using Dijkstra's algorithm.

**Request:**
```json
{
  "sourceId": "bhubaneswar-hub",
  "targetId": "kolkata-hub",
  "excludeNodes": []
}
```

**Response `200`:**
```json
{
  "found": true,
  "path": ["bhubaneswar-hub", "cuttack-hub", "balasore-hub", "kolkata-hub"],
  "totalDistance": 482,
  "estimatedDurationHours": 8.4,
  "hops": 3,
  "capacityScore": 0.81
}
```

**Response `200` (no path):**
```json
{
  "found": false,
  "path": [],
  "reason": "No connected path exists between source and target with current exclusions"
}
```

---

### `POST /api/route-graph/recover`

Find recovery routes around a set of disrupted nodes.

**Request:**
```json
{
  "disruptedNodes": ["paradip-port", "jagatsinghpur-depot"],
  "disruptedRoutes": ["nh-16-bhubaneswar-paradip"],
  "priorityPairs": [
    { "source": "bhubaneswar-hub", "target": "paradip-port" }
  ]
}
```

**Response `200`:**
```json
{
  "recoveryRoutes": [
    {
      "id": "recovery-1",
      "originalPair": { "source": "bhubaneswar-hub", "target": "paradip-port" },
      "path": ["bhubaneswar-hub", "puri-hub", "konark-depot", "paradip-port-alt"],
      "totalDistance": 142,
      "capacityScore": 0.68,
      "disruptionCost": 0.24,
      "label": "Southern Coastal Bypass"
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

## Impact Engine

### `POST /api/impact/calculate`

Calculate all impact dimensions for a disruption scenario.

**Request:**
```json
{
  "affectedNodes": [
    { "id": "paradip-port", "type": "port", "disruptionLevel": 0.92 }
  ],
  "disruptedRoutes": [
    { "id": "nh-16-bhubaneswar-paradip", "disruptionLevel": 0.88 }
  ],
  "recoveryRoutes": [
    { "id": "recovery-1", "totalDistance": 142, "capacityScore": 0.68 }
  ],
  "scenario": {
    "type": "cyclone",
    "severity": "high",
    "estimatedDurationDays": 14
  }
}
```

**Response `200`:**
```json
{
  "economic": {
    "lossEstimateCr": 4200,
    "revenueAtRisk": 680,
    "recoveryTimelineDays": 28,
    "sectorBreakdown": {
      "trade": 1800,
      "agriculture": 900,
      "manufacturing": 850,
      "energy": 420,
      "healthcare": 230
    }
  },
  "population": {
    "affected": 2300000,
    "displaced": 185000,
    "atRisk": 420000
  },
  "carbon": {
    "deltaTCO2": 18400,
    "reroutingDistanceKm": 2100,
    "carbonCostCr": 92
  },
  "resilience": {
    "score": 62,
    "grade": "Moderate",
    "recoveryHorizonDays": 28,
    "byDimension": {
      "infrastructure": 58,
      "logistics": 67,
      "humanitarian": 61,
      "economic": 63
    }
  }
}
```

---

## Simulation Orchestrator

### `POST /api/simulations/run`

Execute the complete simulation pipeline: Scenario Engine → Route Graph Engine → Impact Engine.

**Request:**
```json
{
  "scenarioId": "cyclone-fani",
  "severity": "high",
  "radius": 80,
  "duration": 14
}
```

**Response `200`:**
```json
{
  "simulationId": "sim-cyclone-fani-1701165000",
  "timestamp": "2024-11-28T10:30:00.000Z",
  "scenario": {
    "id": "cyclone-fani",
    "name": "Cyclone Fani",
    "type": "cyclone",
    "severity": "high"
  },
  "affectedNodes": [...],
  "disruptedRoutes": [...],
  "recoveryRoutes": [
    {
      "id": "recovery-1",
      "path": ["bhubaneswar-hub", "puri-hub", "paradip-port-alt"],
      "totalDistance": 142,
      "capacityScore": 0.68,
      "label": "Southern Coastal Bypass"
    }
  ],
  "impact": {
    "economic": { "lossEstimateCr": 4200, "revenueAtRisk": 680, ... },
    "population": { "affected": 2300000, "displaced": 185000, ... },
    "carbon": { "deltaTCO2": 18400, ... },
    "resilience": { "score": 62, "grade": "Moderate", ... }
  },
  "graphMetrics": {
    "totalNodes": 20,
    "availableNodes": 14,
    "connectivityScore": 0.71
  }
}
```

**Response `404`:** `{ "error": "Scenario not found", "scenarioId": "..." }`  
**Response `400`:** `{ "error": "Invalid severity level" }`

---

## AI Parliament

### `POST /api/ai-parliament/session`

Run multi-agent deliberation on a simulation result.

**Request:**
```json
{
  "simulationId": "sim-cyclone-fani-1701165000",
  "scenarioType": "cyclone",
  "severity": "high",
  "impact": {
    "economic": { "lossEstimateCr": 4200 },
    "population": { "affected": 2300000 },
    "resilience": { "score": 62 }
  }
}
```

**Response `200`:**
```json
{
  "sessionId": "parliament-sim-cyclone-fani-1701165000",
  "simulationId": "sim-cyclone-fani-1701165000",
  "timestamp": "2024-11-28T10:30:05.000Z",
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
      "position": "Cyclone Fani poses critical risk to coastal port infrastructure. Paradip Port requires immediate pre-emptive closure and cargo rerouting to inland depots.",
      "recommendation": "Activate route BR-4 (Bhubaneswar–Dhamra) as primary freight bypass. Pre-position repair crews at Paradip entry road.",
      "estimatedImpact": "Reduce logistics disruption by 34% vs. no intervention"
    },
    {
      "id": "humanitarian-advocate",
      "name": "Humanitarian Advocate",
      "domain": "Humanitarian",
      "confidence": 0.91,
      "position": "2.3M affected population requires immediate humanitarian logistics prioritization over commercial freight.",
      "recommendation": "Reserve 40% of alternative route capacity for humanitarian aid convoys. Activate 6 relief distribution nodes.",
      "estimatedImpact": "Reduce displacement-related mortality risk by 28%"
    }
  ]
}
```

---

## Crisis Commander

### `POST /api/crisis-commander/plan`

Generate an executive response plan from simulation and parliament outputs.

**Request:**
```json
{
  "simulationId": "sim-cyclone-fani-1701165000",
  "scenarioType": "cyclone",
  "severity": "high",
  "affectedNodes": ["paradip-port", "jagatsinghpur-depot"],
  "recoveryRoutes": [{ "id": "recovery-1", "label": "Southern Coastal Bypass" }],
  "parliamentConsensusScore": 71,
  "priorityActions": [
    "Activate emergency coastal evacuation corridors",
    "Pre-position medical supplies at Bhubaneswar hub"
  ]
}
```

**Response `200`:**
```json
{
  "planId": "cmd-plan-cyclone-fani-1701165000",
  "simulationId": "sim-cyclone-fani-1701165000",
  "timestamp": "2024-11-28T10:30:08.000Z",
  "phases": [
    {
      "id": "immediate",
      "label": "Immediate Response",
      "duration": "0–48 hours",
      "actions": [
        {
          "id": "action-001",
          "action": "Activate Odisha SDRF rapid response units",
          "owner": "OSDMA",
          "priority": "critical",
          "estimatedCompletion": "6 hours"
        },
        {
          "id": "action-002",
          "action": "Open emergency coastal evacuation routes NH-16B and NH-203",
          "owner": "NHAI",
          "priority": "critical",
          "estimatedCompletion": "4 hours"
        }
      ]
    },
    {
      "id": "short-term",
      "label": "Short-term Stabilization",
      "duration": "2–14 days",
      "actions": [
        {
          "id": "action-010",
          "action": "Reroute Paradip Port cargo operations to Dhamra and Gopalpur",
          "owner": "Indian Ports Association",
          "priority": "high",
          "estimatedCompletion": "3 days"
        }
      ]
    },
    {
      "id": "long-term",
      "label": "Recovery and Restoration",
      "duration": "2–12 weeks",
      "actions": [
        {
          "id": "action-020",
          "action": "Infrastructure damage assessment and repair prioritization",
          "owner": "PWD Odisha",
          "priority": "medium",
          "estimatedCompletion": "4 weeks"
        }
      ]
    }
  ],
  "resources": {
    "deployed": [
      { "type": "NDRF Teams", "count": 8, "location": "Paradip Port Area" },
      { "type": "Medical Teams", "count": 12, "location": "Bhubaneswar Hub" },
      { "type": "Disaster Relief Kits", "count": 25000, "location": "Cuttack Distribution Centre" }
    ],
    "totalCostCr": 38
  },
  "operationalReadiness": {
    "overall": 0.78,
    "byAgency": {
      "OSDMA": 0.88,
      "NDRF": 0.82,
      "Indian Railways": 0.74,
      "NHAI": 0.71,
      "Indian Ports Association": 0.64
    }
  },
  "timeline": {
    "t0": "Cyclone landfall",
    "t6h": "SDRF units activated",
    "t24h": "Evacuation corridors operational",
    "t72h": "Alternative freight routes active",
    "t14d": "Short-term stabilization complete",
    "t12w": "Full infrastructure restoration"
  }
}
```

---

## Error Codes

| HTTP Status | Meaning |
|---|---|
| `200` | Success |
| `400` | Invalid request body or parameters |
| `404` | Resource not found |
| `500` | Internal server error (simulation pipeline failure) |

All error responses follow:
```json
{
  "error": "Human-readable error message",
  "code": "MACHINE_READABLE_CODE"
}
```
