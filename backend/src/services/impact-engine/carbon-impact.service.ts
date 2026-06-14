import type { CarbonImpact, ImpactRecoveryRouteInput } from "../../types/impact-engine.types.js";

export function calculateCarbonImpact(
  carbonIncreasePercent: number,
  recoveryRoute?: ImpactRecoveryRouteInput
): CarbonImpact {
  const baselineCarbonTons = carbonIncreasePercent * 0.4;
  const extraCarbonTons = (recoveryRoute?.extraDistanceKm ?? 0) * 0.03;

  return {
    baselineCarbonTons: round(baselineCarbonTons),
    extraCarbonTons: round(extraCarbonTons),
    finalCarbonTons: round(baselineCarbonTons + extraCarbonTons),
    carbonIncreasePercent,
  };
}

function round(value: number): number {
  return Number(value.toFixed(2));
}

