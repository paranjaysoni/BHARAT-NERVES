import type { RecoveryStatus } from "./route-graph.types.js";
import type { ScenarioSeverity } from "./scenario.types.js";

export type ImpactRiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type ResourceStressLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type ResilienceStatus = "STABLE" | "RECOVERING" | "DEGRADED";

export interface ImpactRecoveryRouteInput {
  extraDistanceKm?: number;
  extraDelayMinutes?: number;
  recoveryStatus?: RecoveryStatus;
}

export interface ImpactCalculationRequest {
  scenarioId: string;
  recoveryRoute?: ImpactRecoveryRouteInput;
}

export interface DelayImpact {
  baselineDelayHours: number;
  extraDelayMinutes: number;
  finalDelayHours: number;
  recoveryTimeDays: string;
}

export interface EconomicImpact {
  estimatedLossCr: number;
  lossAfterRecoveryCr: number;
  savingsCr: number;
  lossReductionPercent: number;
}

export interface CarbonImpact {
  baselineCarbonTons: number;
  extraCarbonTons: number;
  finalCarbonTons: number;
  carbonIncreasePercent: number;
}

export interface PopulationImpact {
  affected: number;
  protectedAfterRecovery: number;
  riskLevel: ImpactRiskLevel;
}

export interface InfrastructureImpact {
  affectedNodes: number;
  affectedRoutes: number;
  blockedRoutes: number;
  riskLevel: ImpactRiskLevel;
}

export interface ResourceStressImpact {
  medicalStress: ResourceStressLevel;
  fuelStress: ResourceStressLevel;
  shelterStress: ResourceStressLevel;
  logisticsStress: ResourceStressLevel;
}

export interface ResilienceImpact {
  before: number;
  after: number;
  improvement: number;
  status: ResilienceStatus;
}

export interface ImpactScore {
  impactScore: number;
  riskLevel: ImpactRiskLevel;
  confidence: number;
}

export interface ImpactCalculationResult {
  scenarioId: string;
  scenarioName: string;
  severity: ScenarioSeverity;
  delay: DelayImpact;
  economic: EconomicImpact;
  carbon: CarbonImpact;
  population: PopulationImpact;
  infrastructure: InfrastructureImpact;
  resources: ResourceStressImpact;
  resilience: ResilienceImpact;
  score: ImpactScore;
  summary: string;
  generatedAt: string;
}

export class ImpactValidationError extends Error {
  constructor(
    public readonly code: "IMPACT_SCENARIO_NOT_FOUND" | "INVALID_RECOVERY_ROUTE",
    message: string,
    public readonly statusCode: number
  ) {
    super(message);
    this.name = "ImpactValidationError";
  }
}

