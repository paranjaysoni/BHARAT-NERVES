# Route Graph Engine

## Purpose

The Route Graph Engine models the Project Aegis logistics corridor network as a small in-memory graph. It can find shortest paths, exclude blocked routes, and return deterministic alternate route recommendations for MVP self-healing route intelligence.

This issue is backend-only. It does not mutate route state, connect the frontend, calculate economic impact, run AI systems, or create Crisis Commander plans.

## Graph Structure

The graph is built from static Issue #55 data:

- Nodes: `src/data/nodes.json`
- Routes: `src/data/routes.json`

Routes are treated as bidirectional edges for the MVP.

## Node And Edge Model

Graph nodes use existing infrastructure node IDs.

Graph edges include:

- `routeId`
- `sourceNodeId`
- `destinationNodeId`
- `distanceKm`
- `travelTimeMinutes`
- `routeType`
- `status`
- `riskLevel`

Routes with `BLOCKED` status, `DISRUPTED` status, or caller-supplied blocked route IDs are excluded from pathfinding.

## Cost Modes

Supported `costMode` values:

- `distance`: cost is `distanceKm`
- `time`: cost is `travelTimeMinutes`
- `risk`: cost is `travelTimeMinutes + risk penalty`

Default cost mode: `time`

Risk penalties:

| Risk | Penalty |
| --- | ---: |
| `LOW` | 0 |
| `MEDIUM` | 20 |
| `HIGH` | 60 |
| `CRITICAL` | 120 |

## Dijkstra Approach

`shortest-path.service.ts` implements a simple Dijkstra algorithm:

1. Initialize all node distances to infinity.
2. Set the source node distance to zero.
3. Visit the unvisited node with the lowest known distance.
4. Relax each available outgoing edge.
5. Track the previous node and route used for reconstruction.
6. Reconstruct node IDs, full node objects, route IDs, full route objects, and totals.

The graph is small, so a simple `Set` scan is sufficient for the MVP.

## Route Recovery Flow

`route-recovery.service.ts` compares:

1. The original shortest path on the baseline graph.
2. The recovered shortest path on a graph rebuilt with supplied `blockedRouteIds` excluded.

Recovery statuses:

- `RECOVERED`
- `NO_ALTERNATE_ROUTE`
- `NO_DISRUPTION`
- `INVALID_NODES`

Validation errors are returned as standard API errors before recovery is attempted.

## API Contracts

### Health

```http
GET /api/route-graph/health
```

### Shortest Path

```http
POST /api/route-graph/shortest-path
```

Request:

```json
{
  "sourceNodeId": "paradip_port",
  "destinationNodeId": "aiims_bhubaneswar",
  "costMode": "time"
}
```

### Route Recovery

```http
POST /api/route-graph/recover
```

Request:

```json
{
  "sourceNodeId": "paradip_port",
  "destinationNodeId": "aiims_bhubaneswar",
  "blockedRouteIds": ["route_paradip_bhubaneswar"],
  "costMode": "time"
}
```

## Example Responses

Shortest path:

```json
{
  "success": true,
  "data": {
    "sourceNodeId": "paradip_port",
    "destinationNodeId": "aiims_bhubaneswar",
    "costMode": "time",
    "pathNodeIds": [
      "paradip_port",
      "bhubaneswar_command",
      "bhubaneswar_relief_warehouse",
      "aiims_bhubaneswar"
    ],
    "routeIds": [
      "route_paradip_bhubaneswar",
      "route_bhubaneswar_command_warehouse",
      "route_bhubaneswar_warehouse_aiims"
    ],
    "totalDistanceKm": 130,
    "totalTravelTimeMinutes": 157,
    "status": "FOUND"
  }
}
```

Recovery:

```json
{
  "success": true,
  "data": {
    "sourceNodeId": "paradip_port",
    "destinationNodeId": "aiims_bhubaneswar",
    "blockedRouteIds": ["route_paradip_bhubaneswar"],
    "originalRoute": {
      "routeIds": [
        "route_paradip_bhubaneswar",
        "route_bhubaneswar_command_warehouse",
        "route_bhubaneswar_warehouse_aiims"
      ],
      "totalDistanceKm": 130,
      "totalTravelTimeMinutes": 157,
      "status": "FOUND"
    },
    "recoveredRoute": {
      "routeIds": [
        "route_paradip_cuttack",
        "route_bhubaneswar_cuttack",
        "route_bhubaneswar_command_warehouse",
        "route_bhubaneswar_warehouse_aiims"
      ],
      "totalDistanceKm": 143,
      "totalTravelTimeMinutes": 182,
      "status": "FOUND"
    },
    "extraDistanceKm": 13,
    "extraDelayMinutes": 25,
    "recoveryStatus": "RECOVERED",
    "summary": "Alternate route found through Cuttack Logistics Hub."
  }
}
```

## Validation

Invalid request errors:

- `INVALID_SOURCE_NODE`
- `INVALID_DESTINATION_NODE`
- `INVALID_BLOCKED_ROUTE`
- `INVALID_COST_MODE`

Disconnected valid requests return `success: true` with `status: "NOT_FOUND"` instead of a 500.

## MVP Limitations

- No directed routing rules.
- No turn-by-turn route geometry.
- No live traffic, weather, or port feeds.
- No persistent route status mutation.
- No economic or carbon impact calculation.
- No frontend map connection yet.

## Future Improvements

- Directed route support.
- True geospatial route geometries.
- Scenario-driven blocked route extraction.
- Capacity-aware route selection.
- Multi-commodity cost modes.
- Integration with the future impact calculation engine.
- Integration with Crisis Commander response planning.

