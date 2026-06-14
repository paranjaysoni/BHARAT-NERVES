// ─── Simulation request ──────────────────────────────────────────────────────

export interface SimulationRunRequest {
  scenarioId: string;
  sourceNodeId?: string;
  destinationNodeId?: string;
  costMode?: "TIME" | "DISTANCE" | "CARBON" | "COST";
}

// ─── Simulation result shapes (mirror actual backend response) ────────────────

export type SimulationOverlayStatus =
  | "OPERATIONAL"
  | "WARNING"
  | "AT_RISK"
  | "BLOCKED"
  | "DISRUPTED"
  | "RECOVERY";

export type ImpactRiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

// backend: impact.economic.*
export interface EconomicImpact {
  estimatedLossCr: number;
  lossAfterRecoveryCr: number;
  savingsCr: number;
  lossReductionPercent: number;
}

// backend: impact.carbon.*
export interface CarbonImpact {
  baselineCarbonTons: number;
  extraCarbonTons: number;
  finalCarbonTons: number;
  carbonIncreasePercent: number;
}

// backend: impact.population.*
export interface PopulationImpact {
  affected: number;
  protectedAfterRecovery: number;
  riskLevel: ImpactRiskLevel;
}

// backend: impact.infrastructure.*
export interface InfrastructureImpact {
  affectedNodes: number;
  affectedRoutes: number;
  blockedRoutes: number;
  riskLevel: ImpactRiskLevel;
}

// backend: impact.resilience.*
export interface ResilienceImpact {
  before: number;
  after: number;
  improvement: number;
  status: string;
}

// backend: impact.delay.*
export interface DelayImpact {
  baselineDelayHours: number;
  extraDelayMinutes: number;
  finalDelayHours: number;
  recoveryTimeDays: string;
}

// backend: impact.score.*
export interface ImpactScore {
  impactScore: number;
  riskLevel: ImpactRiskLevel;
  confidence: number;
}

// backend: impact.resources.*
export interface ResourceStressImpact {
  medicalStress: string;
  fuelStress: string;
  shelterStress: string;
  logisticsStress: string;
}

// backend: impact (nested object — actual shape)
export interface ImpactCalculationResult {
  scenarioId: string;
  scenarioName: string;
  severity: string;
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

export interface SimulationDashboardSummary {
  resilienceScore: number;
  activeAlerts: number;
  atRiskNodes: number;
  disruptedRoutes: number;
  economicExposureCr: number;
  populationAffected: number;
  carbonImpactTons: number;
  recoveryTime: string;
  riskLevel: ImpactRiskLevel;
}

export interface SimulationDigitalTwin {
  nodes: unknown[];
  routes: unknown[];
  affectedNodeIds: string[];
  affectedRouteIds: string[];
  blockedRouteIds: string[];
  recoveredRouteIds: string[];
  statusOverlay: {
    nodes: Record<string, SimulationOverlayStatus>;
    routes: Record<string, SimulationOverlayStatus>;
  };
}

export interface RouteRecoveryResult {
  sourceNodeId: string;
  destinationNodeId: string;
  recoveryStatus: string;
  extraDistanceKm: number;
  extraDelayMinutes: number;
  recoveredRoute: { routeIds: string[] };
  hasAlternative: boolean;
  costMode: string;
}

export interface ScenarioResultSummary {
  scenarioId: string;
  scenarioName: string;
  category: string;
  severity: string;
  region: string;
  affectedNodeIds: string[];
  affectedRouteIds: string[];
  blockedRouteIds: string[];
}

export interface RecommendedNextStep {
  label: string;
  route: string;
  priority: "HIGH" | "CRITICAL";
}

export interface SimulationResult {
  simulationId: string;
  status: "COMPLETED";
  scenario: ScenarioResultSummary;
  routeRecovery: RouteRecoveryResult;
  impact: ImpactCalculationResult;
  digitalTwin: SimulationDigitalTwin;
  dashboard: SimulationDashboardSummary;
  recommendedNextSteps: RecommendedNextStep[];
  summary: string;
  generatedAt: string;
}

// ─── UI state ────────────────────────────────────────────────────────────────

export type SimulationUIState =
  | { phase: "idle" }
  | { phase: "running" }
  | { phase: "done"; result: SimulationResult }
  | { phase: "error"; message: string };
