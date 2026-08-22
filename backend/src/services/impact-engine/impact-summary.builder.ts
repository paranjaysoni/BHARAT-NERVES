import type {
  EconomicImpact,
  ImpactCalculationResult,
  ImpactRiskLevel,
  InfrastructureImpact,
} from "../../types/impact-engine.types.js";
import type { Scenario } from "../../types/scenario.types.js";
import { env } from "../../config/env.js";

import type { RiskConfigInput } from "../config/config.service.js";

export function buildExecutiveImpactSummary({
  economic,
  infrastructure,
  riskLevel,
  scenario,
}: {
  economic: EconomicImpact;
  infrastructure: InfrastructureImpact;
  riskLevel: ImpactRiskLevel;
  scenario: Scenario;
}): string {
  const savingsText = economic.savingsCr > 0
    ? `, but alternate routing reduces projected loss by ₹${economic.savingsCr} Cr`
    : "";

  return `${scenario.name} creates ${riskLevel.toLowerCase()} logistics and population risk across ${infrastructure.affectedNodes} nodes and ${infrastructure.affectedRoutes} routes${savingsText}.`;
}

export function buildImpactScore(
  result: Omit<ImpactCalculationResult, "score" | "summary" | "generatedAt">,
  config: RiskConfigInput
): ImpactCalculationResult["score"] {
  const economicSeverity = normalize(result.economic.estimatedLossCr, 1_000);
  const populationSeverity = normalize(result.population.affected, 2_500_000);
  const infrastructureSeverity = normalize(
    result.infrastructure.affectedNodes * 8 + result.infrastructure.affectedRoutes * 5 + result.infrastructure.blockedRoutes * 12,
    100
  );
  const delaySeverity = normalize(result.delay.finalDelayHours, 72);

  const impactScore = Math.min(
    100,
    Math.round(
      economicSeverity * 0.3 +
        populationSeverity * 0.3 +
        infrastructureSeverity * 0.2 +
        delaySeverity * 0.2
    )
  );

  return {
    impactScore,
    riskLevel: getScoreRiskLevel(impactScore, config),
    confidence: 0.86,
  };
}

export function getInfrastructureRiskLevel({
  affectedNodes,
  affectedRoutes,
  blockedRoutes,
}: {
  affectedNodes: number;
  affectedRoutes: number;
  blockedRoutes: number;
}): ImpactRiskLevel {
  const weighted = affectedNodes * 2 + affectedRoutes + blockedRoutes * 3;
  if (weighted >= 30) return "CRITICAL";
  if (weighted >= 14) return "HIGH";
  if (weighted >= 7) return "MEDIUM";
  return "LOW";
}

function normalize(value: number, max: number): number {
  return Math.min(100, (value / max) * 100);
}

function getScoreRiskLevel(score: number, config: RiskConfigInput): ImpactRiskLevel {
  if (score >= config.critical) return "CRITICAL";
  if (score >= config.high) return "HIGH";
  if (score >= config.medium) return "MEDIUM";
  return "LOW";
}
