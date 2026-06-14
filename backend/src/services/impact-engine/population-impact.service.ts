import type {
  ImpactRecoveryRouteInput,
  ImpactRiskLevel,
  PopulationImpact,
} from "../../types/impact-engine.types.js";

export function calculatePopulationImpact(
  affected: number,
  recoveryRoute?: ImpactRecoveryRouteInput
): PopulationImpact {
  const recovered = recoveryRoute?.recoveryStatus === "RECOVERED";

  return {
    affected,
    protectedAfterRecovery: recovered ? Math.round(affected * 0.74) : 0,
    riskLevel: getPopulationRiskLevel(affected),
  };
}

export function getPopulationRiskLevel(affected: number): ImpactRiskLevel {
  if (affected > 1_000_000) return "HIGH";
  if (affected > 500_000) return "MEDIUM";
  return "LOW";
}

