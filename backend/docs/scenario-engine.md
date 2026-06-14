# Scenario Engine

## Purpose

The Scenario Engine executes predefined scenarios from the static data layer and returns a structured simulation result for downstream product pages.

This MVP is deterministic and read-only. It resolves scenario references into full node and route objects, builds an operational summary, and recommends the next page/action. It does not calculate alternate routes, mutate system state, call AI APIs, or run real impact formulas.

## Scenario Execution Flow

1. Receive a scenario run request.
2. Look up the scenario by ID from `src/data/scenarios.json` or `src/data/international-scenarios.json`.
3. Resolve `affectedNodeIds` against `src/data/nodes.json`.
4. Resolve `affectedRouteIds` against `src/data/routes.json`.
5. Resolve `blockedRouteIds` against `src/data/routes.json`.
6. Build a structured scenario result.
7. Return the result through the standard API response format.

## API Contract

### Run Local Scenario

```http
POST /api/scenarios/:id/run
```

Optional body:

```json
{
  "mode": "demo",
  "intensity": "standard"
}
```

### Run International Scenario

```http
POST /api/scenarios/international/:id/run
```

Optional body:

```json
{
  "mode": "demo",
  "intensity": "standard"
}
```

## Local Scenarios

Local scenarios are loaded from `src/data/scenarios.json`.

Examples:

- `odisha_cyclone_corridor`
- `paradip_port_shutdown`
- `nh16_highway_blockage`
- `warehouse_fire_cuttack`
- `medical_resource_shortage`

## International Scenarios

International scenarios are loaded from `src/data/international-scenarios.json`.

Examples:

- `tokyo_earthquake_m73`
- `california_wildfire_2025`
- `rotterdam_port_blockage`
- `red_sea_corridor_crisis`

## Response Structure

```json
{
  "success": true,
  "data": {
    "scenarioId": "odisha_cyclone_corridor",
    "scenarioName": "Odisha Cyclone Corridor",
    "category": "CYCLONE",
    "severity": "CRITICAL",
    "status": "SIMULATED",
    "scope": "LOCAL",
    "mode": "demo",
    "intensity": "standard",
    "region": "Eastern Odisha Coast",
    "country": "India",
    "affectedNodes": [],
    "affectedRoutes": [],
    "blockedRoutes": [],
    "expectedImpacts": {
      "delayHours": 36,
      "economicLossCr": 1240,
      "carbonIncreasePercent": 28,
      "populationAffected": 2480000,
      "resilienceBefore": 38,
      "resilienceAfter": 76,
      "recoveryDays": 14
    },
    "operationalSummary": "Deterministic summary text",
    "recommendedAction": "Open Crisis Commander",
    "recommendedNextPage": "/crisis-commander",
    "generatedAt": "2026-06-14T00:00:00.000Z"
  },
  "message": "Scenario simulated"
}
```

Missing scenarios return:

```json
{
  "success": false,
  "error": {
    "code": "SCENARIO_NOT_FOUND",
    "message": "Scenario not found"
  }
}
```

## Current MVP Limitations

- Deterministic output only.
- No alternate route calculation.
- No route recovery planning.
- No global state mutation.
- No live data sources.
- No AI-generated commander plan.
- No real impact formulas.

## Future Route Graph Integration

Issue #57 can add graph-aware route analysis around this engine by consuming the resolved nodes and routes and returning alternate route candidates, blocked segment analysis, and recovery options.

## Future Impact Engine Integration

A future impact engine can replace static `expectedImpacts` with computed impact values while keeping the scenario result response contract stable for downstream pages.

