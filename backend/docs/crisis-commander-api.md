# Crisis Commander API

## Purpose

The Crisis Commander API converts scenario execution, route recovery, impact metrics, AI Parliament consensus, and resource inventory into one executive response plan.

This is deterministic backend planning logic for the hackathon MVP. It does not call Gemini/OpenAI, persist decisions, generate PDFs, send notifications, or connect frontend state.

## Command Planning Flow

1. Validate `scenarioId` and optional `includeChecklist`.
2. Run the Unified Simulation API logic for scenario, route recovery, impact, digital twin overlay, and dashboard context.
3. Run AI Parliament logic for consensus and final recommendation context.
4. Read static resources from `resources.json`.
5. Build situation report, executive summary, active incidents, response actions, resource deployment, risk assessment, expected outcomes, checklist, approval state, and final recommendation.
6. Return the complete commander plan with a generated timestamp.

## SITREP Structure

The situation report is a compact operational snapshot:

```json
{
  "event": "Odisha Cyclone Corridor disruption across Eastern Odisha Coast.",
  "affectedRegions": ["Jagatsinghpur", "Bhadrak", "Puri", "Kendrapara"],
  "affectedNodes": 7,
  "affectedRoutes": 9,
  "blockedRoutes": 3,
  "estimatedDuration": "14 Days"
}
```

It is derived from the scenario result, affected node districts, affected routes, blocked routes, and expected recovery duration.

## Executive Summary Structure

The executive summary contains:

- `summary`: narrative commander-level context.
- `keyRecommendation`: immediate strategic recommendation.
- `estimatedBenefit`: projected loss reduction and population protection from impact output.

## Response Actions

The API returns 5-7 ready response actions. Each action includes an ID, title, priority, owner, status, and expected impact.

Typical actions include:

- Activate alternate inland route.
- Prioritize medical supply corridor.
- Deploy NDRF / ODRAF response teams.
- Open coastal shelters.
- Stage fuel reserves near Cuttack.
- Delay low-priority industrial cargo.
- Monitor Paradip and Kendrapara route exposure.

## Resource Deployment Model

The deployment plan uses static `resources.json` inventory. It maps resources to likely affected regions and priorities.

Each deployment item includes:

```json
{
  "resourceId": "food_kits_bhubaneswar",
  "name": "Emergency Food Kits",
  "quantity": 25000,
  "unit": "kits",
  "assignedRegion": "Puri / Kendrapara",
  "status": "ASSIGNED",
  "priority": "HIGH"
}
```

## Risk Assessment Model

Risk assessment returns compact commander-facing risk objects:

- Logistics Risk
- Medical Risk
- Trade Risk
- Infrastructure Risk
- Environmental Risk

Each object contains `label`, `score`, `level`, and `summary`.

## Checklist Model

When `includeChecklist` is true or omitted, the API returns a ready-action checklist:

- Confirm cyclone corridor status.
- Activate alternate route.
- Dispatch medical kits.
- Deploy response teams.
- Open shelters.
- Notify district command centers.
- Generate executive report.

When `includeChecklist` is false, `checklist` is an empty array.

## API Contract

```http
POST /api/crisis-commander/plan
Content-Type: application/json
```

Request:

```json
{
  "scenarioId": "odisha_cyclone",
  "simulationId": "sim_optional",
  "includeChecklist": true
}
```

Only `scenarioId` is required.

Validation errors:

- `CRISIS_SCENARIO_NOT_FOUND` with HTTP `404`
- `INVALID_CHECKLIST_FLAG` with HTTP `400`
- `CRISIS_COMMANDER_ERROR` with HTTP `500`

## Example Request

```bash
curl -X POST http://localhost:4000/api/crisis-commander/plan \
  -H "Content-Type: application/json" \
  -d '{
    "scenarioId": "odisha_cyclone",
    "includeChecklist": true
  }'
```

## Example Response

```json
{
  "success": true,
  "data": {
    "planId": "cmd_1790000000000",
    "scenarioId": "odisha_cyclone_corridor",
    "scenarioName": "Odisha Cyclone Corridor",
    "status": "READY_FOR_REVIEW",
    "severity": "CRITICAL",
    "situationReport": {
      "event": "Odisha Cyclone Corridor disruption across Eastern Odisha Coast.",
      "affectedRegions": ["Jagatsinghpur", "Bhadrak", "Puri", "Kendrapara"],
      "affectedNodes": 7,
      "affectedRoutes": 9,
      "blockedRoutes": 3,
      "estimatedDuration": "14 Days"
    },
    "executiveSummary": {
      "summary": "Odisha Cyclone Corridor creates critical logistics, population, and infrastructure risk.",
      "keyRecommendation": "Prioritize medical supply continuity and coastal evacuation while activating inland recovery routes.",
      "estimatedBenefit": "Projected loss reduction of ₹434 Cr and protection of 1.83M people."
    },
    "activeIncidents": [],
    "responseActions": [],
    "resourceDeployment": [],
    "riskAssessment": [],
    "expectedOutcomes": [],
    "checklist": [],
    "approval": {
      "aiParliamentConsensus": 77,
      "executiveReview": "PENDING",
      "humanApprovalRequired": true,
      "responseStatus": "READY_FOR_EXECUTION"
    },
    "finalRecommendation": "Execute phased coastal logistics protection plan",
    "generatedAt": "ISO_DATE"
  },
  "message": "Crisis commander plan ready"
}
```

## MVP Limitations

- Plans are deterministic and scenario-driven.
- No LLM narrative generation.
- No persisted approvals.
- No resource depletion or dispatch mutation.
- No live traffic, weather, port, or emergency service integrations.
- No PDF or notification generation.

## Future LLM/Gemini Narrative Integration

Future versions can use Gemini/OpenAI to refine executive narrative, generate role-specific briefings, prepare public communication drafts, and explain tradeoffs. The current structured response is intentionally stable so LLM-generated text can be added without changing the API surface.
