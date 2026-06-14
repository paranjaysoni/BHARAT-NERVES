# Impact Calculation Engine

## Purpose

The Impact Calculation Engine converts scenario disruption data and optional route recovery data into deterministic impact metrics for dashboards, reports, AI Parliament, and Crisis Commander.

This MVP is backend-only and formula-based. It does not call external APIs, mutate global state, connect the frontend, create commander plans, or run AI systems.

## Calculation Model

Input:

- `scenarioId`
- Optional `recoveryRoute`

The engine resolves the scenario from the static scenario data layer, reads expected impacts, inspects affected nodes/routes/resources, and returns a structured impact result.

The alias `odisha_cyclone` maps to the static scenario ID `odisha_cyclone_corridor` for the documented curl examples.

## Economic Formula

Base:

```text
baseLoss = scenario.expectedImpacts.economicLossCr
```

If `recoveryStatus = RECOVERED`:

```text
lossAfterRecovery = baseLoss * 0.65
savings = baseLoss - lossAfterRecovery
lossReductionPercent = 35
```

Without recovery:

```text
lossAfterRecovery = baseLoss
savings = 0
lossReductionPercent = 0
```

## Carbon Formula

```text
baselineCarbonTons = scenario.expectedImpacts.carbonIncreasePercent * 0.4
extraCarbonTons = recoveryRoute.extraDistanceKm * 0.03
finalCarbonTons = baselineCarbonTons + extraCarbonTons
```

If no recovery route is supplied, `extraCarbonTons` is zero.

## Population Formula

```text
affected = scenario.expectedImpacts.populationAffected
protectedAfterRecovery = affected * 0.74 when recovered
```

Risk levels:

- `HIGH`: affected population greater than 1,000,000
- `MEDIUM`: affected population greater than 500,000
- `LOW`: all other cases

## Resilience Formula

```text
before = scenario.expectedImpacts.resilienceBefore
after = scenario.expectedImpacts.resilienceAfter
improvement = after - before
```

Status:

- `RECOVERING`: improvement is positive
- `STABLE`: improvement is zero
- `DEGRADED`: improvement is negative

## Score Formula

Impact score is a weighted 0-100 score:

```text
score =
  economicSeverity * 0.30 +
  populationSeverity * 0.30 +
  infrastructureSeverity * 0.20 +
  delaySeverity * 0.20
```

Risk levels:

- `CRITICAL`: score >= 85
- `HIGH`: score >= 60
- `MEDIUM`: score >= 35
- `LOW`: score < 35

Confidence is deterministic for this MVP: `0.86`.

## API Contract

```http
POST /api/impact/calculate
```

Request:

```json
{
  "scenarioId": "odisha_cyclone",
  "recoveryRoute": {
    "extraDistanceKm": 13,
    "extraDelayMinutes": 25,
    "recoveryStatus": "RECOVERED"
  }
}
```

`recoveryRoute` is optional.

## Example Response

```json
{
  "success": true,
  "data": {
    "scenarioId": "odisha_cyclone_corridor",
    "scenarioName": "Odisha Cyclone Corridor",
    "severity": "CRITICAL",
    "delay": {
      "baselineDelayHours": 36,
      "extraDelayMinutes": 25,
      "finalDelayHours": 36.42,
      "recoveryTimeDays": "14 Days"
    },
    "economic": {
      "estimatedLossCr": 1240,
      "lossAfterRecoveryCr": 806,
      "savingsCr": 434,
      "lossReductionPercent": 35
    },
    "carbon": {
      "baselineCarbonTons": 11.2,
      "extraCarbonTons": 0.39,
      "finalCarbonTons": 11.59,
      "carbonIncreasePercent": 28
    },
    "population": {
      "affected": 2480000,
      "protectedAfterRecovery": 1835200,
      "riskLevel": "HIGH"
    },
    "infrastructure": {
      "affectedNodes": 7,
      "affectedRoutes": 9,
      "blockedRoutes": 3,
      "riskLevel": "CRITICAL"
    },
    "resources": {
      "medicalStress": "HIGH",
      "fuelStress": "HIGH",
      "shelterStress": "LOW",
      "logisticsStress": "HIGH"
    },
    "resilience": {
      "before": 38,
      "after": 76,
      "improvement": 38,
      "status": "RECOVERING"
    },
    "score": {
      "impactScore": 90,
      "riskLevel": "CRITICAL",
      "confidence": 0.86
    },
    "summary": "Odisha Cyclone Corridor creates critical logistics and population risk across 7 nodes and 9 routes, but alternate routing reduces projected loss by ₹434 Cr.",
    "generatedAt": "ISO_DATE"
  },
  "message": "Impact calculated"
}
```

## Validation

Invalid scenario:

```json
{
  "success": false,
  "error": {
    "code": "IMPACT_SCENARIO_NOT_FOUND",
    "message": "Impact scenario not found"
  }
}
```

Invalid recovery route:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_RECOVERY_ROUTE",
    "message": "Invalid recovery route"
  }
}
```

## MVP Limitations

- Deterministic formulas only.
- No live traffic, weather, port, or population feeds.
- No database persistence.
- No frontend connection.
- No unified simulation API.
- No AI-generated analysis.
- No Crisis Commander plan generation.

## Future Improvements

- Feed route recovery output directly from the Route Graph Engine.
- Replace static expected impacts with live or model-derived impact estimates.
- Add commodity-specific economic formulas.
- Add route-level carbon intensity.
- Add resource burn-rate modeling.
- Add confidence bands and scenario comparisons.
- Expose impact results through the future unified simulation API.

