import {
  getInternationalScenarioById,
  getScenarioById,
} from "../data/scenarios.service.js";
import type {
  ImpactCalculationRequest,
  ImpactCalculationResult,
  ImpactRecoveryRouteInput,
  ImpactValidationError as ImpactValidationErrorType,
  InfrastructureImpact,
} from "../../types/impact-engine.types.js";
import { ImpactValidationError } from "../../types/impact-engine.types.js";
import type { InternationalScenario, Scenario } from "../../types/scenario.types.js";
import type { RecoveryStatus } from "../../types/route-graph.types.js";
import { calculateCarbonImpact } from "./carbon-impact.service.js";
import { calculateEconomicImpact } from "./economic-impact.service.js";
import {
  buildExecutiveImpactSummary,
  buildImpactScore,
  getInfrastructureRiskLevel,
} from "./impact-summary.builder.js";
import { calculatePopulationImpact } from "./population-impact.service.js";
import { calculateResilienceImpact } from "./resilience-impact.service.js";
import { calculateResourceStress } from "./resource-stress.service.js";

const scenarioAliases: Record<string, string> = {
  odisha_cyclone: "odisha_cyclone_corridor",
};

const validRecoveryStatuses = new Set<RecoveryStatus>([
  "RECOVERED",
  "NO_ALTERNATE_ROUTE",
  "NO_DISRUPTION",
  "INVALID_NODES",
]);

export function calculateImpact(request: ImpactCalculationRequest): ImpactCalculationResult {
  const scenario = findScenario(request.scenarioId);
  if (!scenario) {
    throw new ImpactValidationError(
      "IMPACT_SCENARIO_NOT_FOUND",
      "Impact scenario not found",
      404
    );
  }

  validateRecoveryRoute(request.recoveryRoute);

  const delay = {
    baselineDelayHours: scenario.expectedImpacts.delayHours,
    extraDelayMinutes: request.recoveryRoute?.extraDelayMinutes ?? 0,
    finalDelayHours: round(
      scenario.expectedImpacts.delayHours +
        (request.recoveryRoute?.extraDelayMinutes ?? 0) / 60
    ),
    recoveryTimeDays: formatRecoveryDays(scenario.expectedImpacts.recoveryDays),
  };
  const economic = calculateEconomicImpact(
    scenario.expectedImpacts.economicLossCr,
    request.recoveryRoute
  );
  const carbon = calculateCarbonImpact(
    scenario.expectedImpacts.carbonIncreasePercent,
    request.recoveryRoute
  );
  const population = calculatePopulationImpact(
    scenario.expectedImpacts.populationAffected,
    request.recoveryRoute
  );
  const infrastructure: InfrastructureImpact = {
    affectedNodes: scenario.affectedNodeIds.length,
    affectedRoutes: scenario.affectedRouteIds.length,
    blockedRoutes: scenario.blockedRouteIds.length,
    riskLevel: getInfrastructureRiskLevel({
      affectedNodes: scenario.affectedNodeIds.length,
      affectedRoutes: scenario.affectedRouteIds.length,
      blockedRoutes: scenario.blockedRouteIds.length,
    }),
  };
  const resources = calculateResourceStress(scenario);
  const resilience = calculateResilienceImpact(
    scenario.expectedImpacts.resilienceBefore,
    scenario.expectedImpacts.resilienceAfter
  );

  const baseResult = {
    scenarioId: scenario.id,
    scenarioName: scenario.name,
    severity: scenario.severity,
    delay,
    economic,
    carbon,
    population,
    infrastructure,
    resources,
    resilience,
  };
  const score = buildImpactScore(baseResult);
  const summary = buildExecutiveImpactSummary({
    economic,
    infrastructure,
    riskLevel: score.riskLevel,
    scenario,
  });

  return {
    ...baseResult,
    score,
    summary,
    generatedAt: new Date().toISOString(),
  };
}

function findScenario(id: string): Scenario | InternationalScenario | null {
  const resolvedId = scenarioAliases[id] ?? id;
  return getScenarioById(resolvedId) ?? getInternationalScenarioById(resolvedId);
}

function validateRecoveryRoute(recoveryRoute?: ImpactRecoveryRouteInput): void {
  if (!recoveryRoute) return;

  if (
    recoveryRoute.extraDistanceKm !== undefined &&
    (!Number.isFinite(recoveryRoute.extraDistanceKm) || recoveryRoute.extraDistanceKm < 0)
  ) {
    throwInvalidRecoveryRoute();
  }

  if (
    recoveryRoute.extraDelayMinutes !== undefined &&
    (!Number.isFinite(recoveryRoute.extraDelayMinutes) || recoveryRoute.extraDelayMinutes < 0)
  ) {
    throwInvalidRecoveryRoute();
  }

  if (
    recoveryRoute.recoveryStatus !== undefined &&
    !validRecoveryStatuses.has(recoveryRoute.recoveryStatus)
  ) {
    throwInvalidRecoveryRoute();
  }
}

function throwInvalidRecoveryRoute(): never {
  throw new ImpactValidationError("INVALID_RECOVERY_ROUTE", "Invalid recovery route", 400);
}

function formatRecoveryDays(days: number): string {
  if (days <= 2) return "1-2 Days";
  if (days <= 4) return "3-4 Days";
  if (days <= 6) return "4-6 Days";
  return `${days} Days`;
}

function round(value: number): number {
  return Number(value.toFixed(2));
}

export function isImpactValidationError(error: unknown): error is ImpactValidationErrorType {
  return error instanceof ImpactValidationError;
}

