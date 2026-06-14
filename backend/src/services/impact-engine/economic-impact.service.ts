import type { EconomicImpact, ImpactRecoveryRouteInput } from "../../types/impact-engine.types.js";

export function calculateEconomicImpact(
  baseLossCr: number,
  recoveryRoute?: ImpactRecoveryRouteInput
): EconomicImpact {
  const recovered = recoveryRoute?.recoveryStatus === "RECOVERED";
  const lossAfterRecoveryCr = recovered ? baseLossCr * 0.65 : baseLossCr;
  const savingsCr = baseLossCr - lossAfterRecoveryCr;

  return {
    estimatedLossCr: round(baseLossCr),
    lossAfterRecoveryCr: round(lossAfterRecoveryCr),
    savingsCr: round(savingsCr),
    lossReductionPercent: recovered ? 35 : 0,
  };
}

function round(value: number): number {
  return Number(value.toFixed(2));
}

