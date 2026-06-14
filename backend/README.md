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

## Scenario Execution Endpoints

- `POST /api/scenarios/:id/run`
- `POST /api/scenarios/international/:id/run`

Example:

```bash
curl -X POST http://localhost:4000/api/scenarios/odisha_cyclone_corridor/run \
  -H "Content-Type: application/json" \
  -d '{"mode":"demo","intensity":"standard"}'
```

See `docs/data-model.md`, `docs/api-contracts.md`, `docs/backend-architecture.md`, and `docs/scenario-engine.md` for backend details.
