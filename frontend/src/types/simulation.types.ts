// ─── Simulation request ──────────────────────────────────────────────────────

export interface SimulationRunRequest {
  scenarioId: string;
  sourceNodeId?: string;
  destinationNodeId?: string;
  costMode?: "TIME" | "DISTANCE" | "CARBON" | "COST";
}

// ─── Simulation result shapes (mirror backend) ───────────────────────────────

export type SimulationOverlayStatus =
  | "OPERATIONAL"
  | "WARNING"
  | "AT_RISK"
  | "BLOCKED"
  | "DISRUPTED"
  | "RECOVERY";

export type ImpactRiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

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

export interface ImpactCalculationResult {
  scenarioId: string;
  economicLossCr: number;
  economicSavingsCr: number;
  carbonIncreaseTons: number;
  carbonSavingsTons: number;
  populationAffected: number;
  resilienceScoreBefore: number;
  resilienceScoreAfter: number;
  resilienceImprovement: number;
  riskScore: number;
  riskLevel: ImpactRiskLevel;
  recoveryDays: number;
  resourceStressLevel: string;
}

export interface RouteRecoveryResult {
  scenarioId: string;
  source: string;
  destination: string;
  path: string[];
  totalDistanceKm: number;
  totalTimeMinutes: number;
  totalCarbonKg: number;
  totalCostInr: number;
  recoveredRouteIds: string[];
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
