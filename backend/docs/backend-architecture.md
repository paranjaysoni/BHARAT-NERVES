# Backend Architecture

The backend is an Express and TypeScript API. Issue #55 adds a static data layer only.

## Request Flow

1. `src/index.ts` starts the Express app on `env.PORT`.
2. `src/app.ts` installs middleware and registers API routers.
3. Route modules in `src/routes` map HTTP paths to controllers.
4. Controllers in `src/controllers` call static data services.
5. Services in `src/services/data` read typed JSON datasets from `src/data`.
6. `src/utils/response.ts` formats success and error responses.

## Registered Static Routers

| Base Path | Router |
| --- | --- |
| `/api/nodes` | `src/routes/nodes.routes.ts` |
| `/api/routes` | `src/routes/routes.routes.ts` |
| `/api/scenarios` | `src/routes/scenarios.routes.ts` |
| `/api/resources` | `src/routes/resources.routes.ts` |
| `/api/agents` | `src/routes/agents.routes.ts` |

`/api/scenarios/international` is registered inside the scenarios router before `/:id` so it is not shadowed by the local scenario ID route.

## Out of Scope

This layer intentionally does not include a scenario engine, route graph engine, impact engine, database persistence, or frontend integration.

