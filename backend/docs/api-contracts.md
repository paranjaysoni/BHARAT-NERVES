# API Contracts

All static data endpoints return JSON through the shared response helpers in `src/utils/response.ts`.

## Success Response

```json
{
  "success": true,
  "data": [],
  "message": "optional summary"
}
```

## Error Response

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

## Static Data Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/nodes` | List infrastructure nodes. |
| `GET` | `/api/nodes/:id` | Get one infrastructure node by ID. |
| `GET` | `/api/route-graph/health` | Return graph connectivity and route availability health. |
| `POST` | `/api/route-graph/shortest-path` | Find the shortest route between two nodes. |
| `POST` | `/api/route-graph/recover` | Find an alternate route with supplied routes excluded. |
| `GET` | `/api/routes` | List corridor routes. |
| `GET` | `/api/routes/:id` | Get one corridor route by ID. |
| `GET` | `/api/scenarios` | List local scenarios. |
| `GET` | `/api/scenarios/:id` | Get one local scenario by ID. |
| `GET` | `/api/scenarios/international` | List international scenarios. |
| `GET` | `/api/scenarios/international/:id` | Get one international scenario by ID. |
| `POST` | `/api/scenarios/:id/run` | Execute one local scenario and return a structured scenario result. |
| `POST` | `/api/scenarios/international/:id/run` | Execute one international scenario and return a structured scenario result. |
| `GET` | `/api/resources` | List resources. |
| `GET` | `/api/resources/:id` | Get one resource by ID. |
| `GET` | `/api/agents` | List AI Parliament agents. |
| `GET` | `/api/agents/:id` | Get one AI Parliament agent by ID. |

Missing static data IDs return HTTP `404` with `code: "NOT_FOUND"`.
Missing scenario engine IDs return HTTP `404` with `code: "SCENARIO_NOT_FOUND"`.

## Scenario Engine Result

`POST /api/scenarios/:id/run` and `POST /api/scenarios/international/:id/run` accept an optional body:

```json
{
  "mode": "demo",
  "intensity": "standard"
}
```

## Route Graph Requests

Shortest path:

```json
{
  "sourceNodeId": "paradip_port",
  "destinationNodeId": "aiims_bhubaneswar",
  "costMode": "time"
}
```

Route recovery:

```json
{
  "sourceNodeId": "paradip_port",
  "destinationNodeId": "aiims_bhubaneswar",
  "blockedRouteIds": ["route_paradip_bhubaneswar"],
  "costMode": "time"
}
```

Validation errors return HTTP `400` with one of:

- `INVALID_SOURCE_NODE`
- `INVALID_DESTINATION_NODE`
- `INVALID_BLOCKED_ROUTE`
- `INVALID_COST_MODE`

Successful scenario runs return:

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
    "operationalSummary": "Summary text",
    "recommendedAction": "Open Crisis Commander",
    "recommendedNextPage": "/crisis-commander",
    "generatedAt": "ISO_DATE"
  },
  "message": "Scenario simulated"
}
```
