# AI Parliament Mock Intelligence API

## Purpose

The AI Parliament Mock Intelligence API generates deterministic multi-agent recommendations for a scenario or simulation context. It is designed to feel like a structured AI deliberation while remaining fully offline and rule-based for the MVP.

This issue does not call OpenAI, Gemini, or any external model provider.

## Multi-Agent Model

The API uses the 8 static agents from `src/data/agents.json`.

Each session:

1. Runs the Unified Simulation API logic for the supplied scenario.
2. Builds scenario-aware positions for all agents.
3. Calculates confidence and conflict levels.
4. Computes consensus.
5. Builds a final recommendation.
6. Returns timeline events, key insights, and recommendation matrix rows.

## Agent Roles

| Agent | Domain | Role |
| --- | --- | --- |
| Infrastructure Guardian | `INFRASTRUCTURE` | Protect critical infrastructure and route redundancy. |
| Environment Sentinel | `ENVIRONMENT` | Monitor climate and environmental impact. |
| Humanitarian Advocate | `HUMANITARIAN` | Protect citizens, hospitals, and vulnerable populations. |
| Economic Strategist | `ECONOMIC` | Reduce economic loss and preserve trade flow. |
| Logistics Optimizer | `LOGISTICS` | Optimize routing and resource movement. |
| Risk Analyst | `RISK` | Identify cascading risks. |
| Technology Advisor | `TECHNOLOGY` | Improve visibility through sensors, drones, and communications. |
| Policy Advisor | `POLICY` | Coordinate lawful inter-agency response. |

## Consensus Logic

The consensus engine uses:

- Average agent confidence.
- Scenario severity adjustment.
- Conflict penalty.

For MVP:

- Critical scenarios generally produce `GOOD_AGREEMENT` with `MODERATE` conflict.
- High scenarios require human review.
- Medium and low scenarios tend toward lower conflict.

Human review is required for `CRITICAL` and `HIGH` scenarios.

## Recommendation Matrix

The matrix returns one row per agent:

```json
{
  "agent": "Infrastructure Guardian",
  "priority": "Protect critical nodes",
  "recommendation": "Restore inland road redundancy and protect Paradip-Cuttack logistics continuity.",
  "confidence": 93,
  "conflictLevel": "LOW",
  "status": "PREPARED"
}
```

Set `includeFullMatrix` to `false` to omit matrix rows.

## API Contract

```http
POST /api/ai-parliament/session
```

Request:

```json
{
  "scenarioId": "odisha_cyclone"
}
```

Optional:

```json
{
  "scenarioId": "odisha_cyclone",
  "simulationId": "sim_demo",
  "includeFullMatrix": true
}
```

## Example Response

```json
{
  "success": true,
  "data": {
    "sessionId": "parl_1781440590781",
    "scenarioId": "odisha_cyclone_corridor",
    "scenarioName": "Odisha Cyclone Corridor",
    "status": "COMPLETED",
    "currentQuestion": "Which routes and resources should be prioritized?",
    "participants": 8,
    "consensus": {
      "score": 77,
      "level": "GOOD_AGREEMENT",
      "conflictLevel": "MODERATE",
      "humanReviewRequired": true
    },
    "agents": [
      {
        "agentId": "infrastructure_guardian",
        "name": "Infrastructure Guardian",
        "role": "Critical infrastructure protection and continuity agent",
        "position": "Prioritize coastal evacuation and protect critical route redundancy.",
        "priority": "Protect critical nodes",
        "confidence": 93,
        "status": "PREPARED",
        "riskConcern": "NH-16 and Paradip corridor exposure"
      }
    ],
    "recommendation": {
      "title": "Execute phased coastal logistics protection plan",
      "summary": "Prioritize vulnerable districts, preserve medical supply movement, activate alternate inland routing, and delay low-priority industrial cargo.",
      "priorityActions": [],
      "sendToCrisisCommander": true
    },
    "timeline": [],
    "insights": [],
    "matrix": [],
    "generatedAt": "ISO_DATE"
  },
  "message": "AI Parliament session completed"
}
```

## Validation

Invalid scenario:

```json
{
  "success": false,
  "error": {
    "code": "AI_PARLIAMENT_SCENARIO_NOT_FOUND",
    "message": "AI Parliament scenario not found"
  }
}
```

Missing agents:

```json
{
  "success": false,
  "error": {
    "code": "AI_PARLIAMENT_AGENTS_NOT_FOUND",
    "message": "AI Parliament agents not found"
  }
}
```

## MVP Limitations

- Rule-based mock intelligence only.
- No OpenAI/Gemini call.
- No prompt execution.
- No session persistence.
- No frontend connection.
- No Crisis Commander plan generation.
- No authentication.

## Future Gemini/OpenAI Integration Plan

Future AI integration should keep this response contract stable and replace rule-based deliberation with model-generated structured JSON.

Recommended approach:

1. Preserve deterministic fallback responses.
2. Send scenario, simulation, route recovery, and impact context to the model.
3. Require strict JSON schema output.
4. Validate all model output before returning it.
5. Store or audit sessions only after a database/auth layer exists.

