# Backend Architecture

The backend is an Express and TypeScript API. Issue #55 adds a static data layer only.

## Request Flow

1. `src/index.ts` starts the Express app on `env.PORT`.
2. `src/app.ts` installs middleware and registers API routers.
3. Route modules in `src/routes` map HTTP paths to controllers.
4. Controllers in `src/controllers` call static data services.
5. Services in `src/services/data` read typed JSON datasets from `src/data`.
6. Scenario Engine services in `src/services/scenario-engine` resolve scenario references into structured simulation results.
7. Route Graph Engine services in `src/services/route-graph` build the corridor graph and calculate route recovery paths.
8. `src/utils/response.ts` formats success and error responses.

## Registered Static Routers

| Base Path | Router |
| --- | --- |
| `/api/nodes` | `src/routes/nodes.routes.ts` |
| `/api/route-graph` | `src/routes/route-graph.routes.ts` |
| `/api/routes` | `src/routes/routes.routes.ts` |
| `/api/scenarios` | `src/routes/scenario-engine.routes.ts` |
| `/api/scenarios` | `src/routes/scenarios.routes.ts` |
| `/api/resources` | `src/routes/resources.routes.ts` |
| `/api/agents` | `src/routes/agents.routes.ts` |

The Scenario Engine router is mounted before the static scenarios router so `POST /api/scenarios/:id/run` and `POST /api/scenarios/international/:id/run` are handled before any generic scenario ID route. `/api/scenarios/international` is registered inside the scenarios router before `/:id` so it is not shadowed by the local scenario ID route.

## Scenario Engine

Issue #56 adds a deterministic Scenario Engine.

Files:

- `src/types/scenario-engine.types.ts`
- `src/services/scenario-engine/scenario-engine.service.ts`
- `src/services/scenario-engine/scenario-result.builder.ts`
- `src/controllers/scenario-engine.controller.ts`
- `src/routes/scenario-engine.routes.ts`

The engine:

- Looks up local or international scenarios from the static data layer.
- Resolves affected node IDs into full infrastructure node objects.
- Resolves affected route IDs into full corridor route objects.
- Resolves blocked route IDs into full corridor route objects.
- Returns scenario metadata, expected impacts, an operational summary, a recommended action, and a timestamp.

It does not calculate alternate routes, mutate global state, run impact formulas, connect frontend workflows, or call AI systems.

## Route Graph Engine

Issue #57 adds a deterministic Route Graph Engine.

Files:

- `src/types/route-graph.types.ts`
- `src/services/route-graph/route-graph.builder.ts`
- `src/services/route-graph/shortest-path.service.ts`
- `src/services/route-graph/route-recovery.service.ts`
- `src/services/route-graph/route-graph.service.ts`
- `src/controllers/route-graph.controller.ts`
- `src/routes/route-graph.routes.ts`

The engine:

- Builds an in-memory bidirectional graph from static nodes and routes.
- Excludes blocked, disrupted, and caller-supplied blocked routes.
- Runs a simple TypeScript Dijkstra implementation.
- Supports `distance`, `time`, and `risk` cost modes.
- Returns graph health, shortest path results, and route recovery results.
- Returns standard validation errors for invalid nodes, blocked routes, or cost modes.

It does not mutate node/route status, calculate impact, connect frontend maps, call AI systems, or create commander plans.

## Out of Scope

This layer intentionally does not include an impact engine, database persistence, AI orchestration, or frontend integration.
