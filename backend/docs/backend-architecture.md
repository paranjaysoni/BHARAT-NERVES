# Backend Architecture

The backend is an Express and TypeScript API. Issue #55 adds a static data layer only.

## Request Flow

1. `src/index.ts` starts the Express app on `env.PORT`.
2. `src/app.ts` installs middleware and registers API routers.
3. Route modules in `src/routes` map HTTP paths to controllers.
4. Controllers in `src/controllers` call static data services.
5. Services in `src/services/data` read typed JSON datasets from `src/data`.
6. Scenario Engine services in `src/services/scenario-engine` resolve scenario references into structured simulation results.
7. `src/utils/response.ts` formats success and error responses.

## Registered Static Routers

| Base Path | Router |
| --- | --- |
| `/api/nodes` | `src/routes/nodes.routes.ts` |
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

## Out of Scope

This layer intentionally does not include a route graph engine, impact engine, database persistence, AI orchestration, or frontend integration.
