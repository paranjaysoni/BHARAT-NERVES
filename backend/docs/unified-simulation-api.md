# Unified Simulation API

## Purpose

The Unified Simulation API is the main backend demo endpoint for Project Aegis. It orchestrates the existing Scenario Engine, Route Graph Engine, and Impact Calculation Engine into one response that future frontend pages can consume.

This issue is backend-only. It does not connect the frontend, mutate static data, add a database, call external APIs, build AI Parliament, or create Crisis Commander plans.

## Architecture

Files:

- `src/types/simulation.types.ts`
- `src/services/simulation/simulation.service.ts`
- `src/services/simulation/simulation-orchestrator.service.ts`
- `src/services/simulation/simulation-summary.builder.ts`
- `src/services/simulation/simulation-target-resolver.ts`
- `src/controllers/simulation.controller.ts`
- `src/routes/simulation.routes.ts`

Route:

```http
POST /api/simulations/run
```

## Engine Orchestration Flow

1. Validate and normalize `scenarioId`.
2. Run Scenario Engine.
3. Extract affected nodes, affected routes, and blocked routes.
4. Resolve source/destination:
   - Use request values when supplied.
   - Otherwise use `paradip_port` to `aiims_bhubaneswar`.
   - If defaults are unavailable, fall back from first port to first hospital.
5. Run Route Graph recovery with scenario blocked route IDs.
6. Run Impact Engine with route recovery metadata.
7. Build digital twin overlay.
8. Build frontend-ready dashboard summary.
9. Return recommended next steps and executive summary.

## Request Contract

Default request:

```json
{
  "scenarioId": "odisha_cyclone"
}
```

Explicit request:

```json
{
  "scenarioId": "odisha_cyclone",
  "sourceNodeId": "paradip_port",
  "destinationNodeId": "aiims_bhubaneswar",
  "costMode": "time"
}
```

The alias `odisha_cyclone` maps to `odisha_cyclone_corridor`.

## Response Contract

```json
{
  "success": true,
  "data": {
    "simulationId": "sim_...",
    "status": "COMPLETED",
    "scenario": {},
    "routeRecovery": {},
    "impact": {},
    "digitalTwin": {},
    "dashboard": {},
    "recommendedNextSteps": [],
    "summary": "...",
    "generatedAt": "ISO_DATE"
  },
  "message": "Simulation completed"
}
```

## Digital Twin Overlay

The digital twin overlay provides frontend-ready route and node status maps:

```json
{
  "statusOverlay": {
    "nodes": {
      "paradip_port": "DISRUPTED"
    },
    "routes": {
      "route_kendrapara_paradip": "BLOCKED",
      "route_paradip_bhubaneswar": "RECOVERY"
    }
  }
}
```

Status values:

- `OPERATIONAL`
- `WARNING`
- `AT_RISK`
- `BLOCKED`
- `DISRUPTED`
- `RECOVERY`

## Dashboard Summary

The dashboard object is intentionally compact and frontend-ready:

```json
{
  "resilienceScore": 76,
  "activeAlerts": 4,
  "atRiskNodes": 7,
  "disruptedRoutes": 3,
  "economicExposureCr": 806,
  "populationAffected": 2480000,
  "carbonImpactTons": 11.2,
  "recoveryTime": "14 Days",
  "riskLevel": "CRITICAL"
}
```

## Example Response

```json
{
  "success": true,
  "data": {
    "simulationId": "sim_1781440053485",
    "status": "COMPLETED",
    "scenario": {
      "scenarioId": "odisha_cyclone_corridor",
      "scenarioName": "Odisha Cyclone Corridor",
      "severity": "CRITICAL"
    },
    "routeRecovery": {
      "recoveryStatus": "RECOVERED",
      "recoveredRoute": {
        "routeIds": [
          "route_paradip_bhubaneswar",
          "route_bhubaneswar_command_warehouse",
          "route_bhubaneswar_warehouse_aiims"
        ]
      }
    },
    "impact": {
      "score": {
        "impactScore": 90,
        "riskLevel": "CRITICAL",
        "confidence": 0.86
      }
    },
    "recommendedNextSteps": [
      {
        "label": "Review AI Parliament",
        "route": "/ai-parliament",
        "priority": "HIGH"
      },
      {
        "label": "Open Crisis Commander",
        "route": "/crisis-commander",
        "priority": "CRITICAL"
      },
      {
        "label": "Inspect Impact Dashboard",
        "route": "/impact-dashboard",
        "priority": "HIGH"
      }
    ],
    "summary": "Odisha Cyclone Corridor simulation completed with critical impact risk. Route recovery status is recovered and projected economic exposure is ₹806 Cr.",
    "generatedAt": "ISO_DATE"
  }
}
```

## Error Handling

Invalid scenario:

```json
{
  "success": false,
  "error": {
    "code": "SIMULATION_SCENARIO_NOT_FOUND",
    "message": "Simulation scenario not found"
  }
}
```

Invalid source:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_SIMULATION_SOURCE",
    "message": "Simulation source node does not exist"
  }
}
```

Invalid destination:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_SIMULATION_DESTINATION",
    "message": "Simulation destination node does not exist"
  }
}
```

## MVP Limitations

- Deterministic orchestration only.
- No frontend connection.
- No AI Parliament execution.
- No Crisis Commander plan generation.
- No persistence.
- No live data.
- No static JSON mutation.

## Future AI Parliament Integration

AI Parliament can consume the unified response as a structured session input: scenario context, recovery state, impact metrics, dashboard summary, and digital twin overlay.

## Future Crisis Commander Integration

Crisis Commander can consume the same response to initialize command posture, recommended actions, resource priorities, and route recovery context.

