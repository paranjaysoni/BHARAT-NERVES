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
| `GET` | `/api/routes` | List corridor routes. |
| `GET` | `/api/routes/:id` | Get one corridor route by ID. |
| `GET` | `/api/scenarios` | List local scenarios. |
| `GET` | `/api/scenarios/:id` | Get one local scenario by ID. |
| `GET` | `/api/scenarios/international` | List international scenarios. |
| `GET` | `/api/scenarios/international/:id` | Get one international scenario by ID. |
| `GET` | `/api/resources` | List resources. |
| `GET` | `/api/resources/:id` | Get one resource by ID. |
| `GET` | `/api/agents` | List AI Parliament agents. |
| `GET` | `/api/agents/:id` | Get one AI Parliament agent by ID. |

Missing IDs return HTTP `404` with `code: "NOT_FOUND"`.

