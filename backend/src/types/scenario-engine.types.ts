import type { InfrastructureNode } from "./node.types.js";
import type { CorridorRoute } from "./route.types.js";
import type {
  InternationalScenario,
  Scenario,
  ScenarioCategory,
  ScenarioImpacts,
  ScenarioSeverity,
} from "./scenario.types.js";

export type ScenarioRunMode = "demo";
export type ScenarioRunIntensity = "standard";
export type ScenarioRunStatus = "SIMULATED";
export type ScenarioScope = "LOCAL" | "INTERNATIONAL";

export interface ScenarioRunRequest {
  mode?: ScenarioRunMode;
  intensity?: ScenarioRunIntensity;
}

export interface ScenarioExecutionContext {
  scenario: Scenario | InternationalScenario;
  scope: ScenarioScope;
  affectedNodes: InfrastructureNode[];
  affectedRoutes: CorridorRoute[];
  blockedRoutes: CorridorRoute[];
  request: ScenarioRunRequest;
}

export interface ScenarioResult {
  scenarioId: string;
  scenarioName: string;
  category: ScenarioCategory;
  severity: ScenarioSeverity;
  status: ScenarioRunStatus;
  scope: ScenarioScope;
  mode: ScenarioRunMode;
  intensity: ScenarioRunIntensity;
  region: string;
  country: string;
  affectedNodes: InfrastructureNode[];
  affectedRoutes: CorridorRoute[];
  blockedRoutes: CorridorRoute[];
  expectedImpacts: ScenarioImpacts;
  operationalSummary: string;
  recommendedAction: string;
  recommendedNextPage: string;
  generatedAt: string;
}

