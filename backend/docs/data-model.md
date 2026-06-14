# Static Data Model

Issue #55 provides a read-only static data layer for the Project Aegis backend. JSON datasets live in `src/data`, TypeScript contracts live in `src/types`, and service modules in `src/services/data` expose typed lookup functions.

## Datasets

| Dataset | File | Expected Count | Purpose |
| --- | --- | ---: | --- |
| Nodes | `src/data/nodes.json` | 15-20 | Infrastructure locations such as ports, hubs, hospitals, shelters, depots, and command centers. |
| Routes | `src/data/routes.json` | 20-25 | Corridor links between infrastructure nodes. |
| Local scenarios | `src/data/scenarios.json` | 5 | India-focused disruption scenarios. |
| International scenarios | `src/data/international-scenarios.json` | 4 | Global disruption scenarios with trade and geopolitical context. |
| Resources | `src/data/resources.json` | variable | Response assets located at infrastructure nodes. |
| Agents | `src/data/agents.json` | 8 | AI Parliament agent definitions. |

## Type Contracts

| Type File | Primary Export |
| --- | --- |
| `src/types/node.types.ts` | `InfrastructureNode` |
| `src/types/route.types.ts` | `CorridorRoute` |
| `src/types/scenario.types.ts` | `Scenario`, `InternationalScenario` |
| `src/types/resource.types.ts` | `Resource` |
| `src/types/agent.types.ts` | `AIAgent` |

## Data Access

Static services return in-memory JSON data and simple filtered lookups. They do not perform graph traversal, scenario simulation, impact scoring, persistence, or frontend integration.

