# Project Aegis Backend

Express and TypeScript API backend for the Project Aegis / Bharat Nerves platform.

## Stack

- Node.js
- Express
- TypeScript
- Static JSON data layer

## Scripts

```bash
npm run dev
npm run build
npm run typecheck
```

## Static Data Endpoints

- `GET /api/nodes`
- `GET /api/nodes/:id`
- `GET /api/routes`
- `GET /api/routes/:id`
- `GET /api/scenarios`
- `GET /api/scenarios/:id`
- `GET /api/scenarios/international`
- `GET /api/scenarios/international/:id`
- `GET /api/resources`
- `GET /api/resources/:id`
- `GET /api/agents`
- `GET /api/agents/:id`

See `docs/data-model.md`, `docs/api-contracts.md`, and `docs/backend-architecture.md` for the Issue #55 static data layer details.
