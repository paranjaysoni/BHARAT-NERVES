import type { ImpactCalculationResult, ImpactRiskLevel } from "./impact-engine.types.js";
import type { InfrastructureNode } from "./node.types.js";
import type { RouteCostMode, RouteRecoveryResult } from "./route-graph.types.js";
import type { CorridorRoute } from "./route.types.js";
import type { ScenarioResult } from "./scenario-engine.types.js";

export type SimulationStatus = "COMPLETED";
export type SimulationOverlayStatus =
  | "OPERATIONAL"
  | "WARNING"
  | "AT_RISK"
  | "BLOCKED"
  | "DISRUPTED"
  | "RECOVERY";
export type RecommendedStepPriority = "HIGH" | "CRITICAL";

export interface SimulationRunRequest {
  scenarioId: string;
  sourceNodeId?: string;
  destinationNodeId?: string;
  costMode?: RouteCostMode;
}

export interface SimulationDigitalTwin {
  nodes: InfrastructureNode[];
  routes: CorridorRoute[];
  affectedNodeIds: string[];
  affectedRouteIds: string[];
  blockedRouteIds: string[];
  recoveredRouteIds: string[];
  statusOverlay: {
    nodes: Record<string, SimulationOverlayStatus>;
    routes: Record<string, SimulationOverlayStatus>;
  };
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

export interface RecommendedNextStep {
  label: string;
  route: string;
  priority: RecommendedStepPriority;
}

export interface SimulationResult {
  simulationId: string;
  status: SimulationStatus;
  scenario: ScenarioResult;
  routeRecovery: RouteRecoveryResult;
  impact: ImpactCalculationResult;
  digitalTwin: SimulationDigitalTwin;
  dashboard: SimulationDashboardSummary;
  recommendedNextSteps: RecommendedNextStep[];
  summary: string;
  generatedAt: string;
}

export interface SimulationTarget {
  sourceNodeId: string;
  destinationNodeId: string;
}

export class SimulationValidationError extends Error {
  constructor(
    public readonly code:
      | "SIMULATION_SCENARIO_NOT_FOUND"
      | "INVALID_SIMULATION_SOURCE"
      | "INVALID_SIMULATION_DESTINATION",
    message: string,
    public readonly statusCode: number
  ) {
    super(message);
    this.name = "SimulationValidationError";
  }
}

