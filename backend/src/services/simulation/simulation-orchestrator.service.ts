import { calculateImpact } from "../impact-engine/impact-engine.service.js";
import { getRecoveredRoute } from "../route-graph/route-graph.service.js";
import {
  runInternationalScenario,
  runLocalScenario,
  ScenarioNotFoundError,
} from "../scenario-engine/scenario-engine.service.js";
import { getScenarioById } from "../data/scenarios.service.js";
import type { RouteCostMode } from "../../types/route-graph.types.js";
import type { ScenarioResult } from "../../types/scenario-engine.types.js";
import type { SimulationResult, SimulationRunRequest } from "../../types/simulation.types.js";
import { SimulationValidationError } from "../../types/simulation.types.js";
import {
  buildDashboardSummary,
  buildDigitalTwinOverlay,
  buildSimulationSummary,
  recommendedNextSteps,
} from "./simulation-summary.builder.js";
import { resolveSimulationTarget } from "./simulation-target-resolver.js";

const scenarioAliases: Record<string, string> = {
  odisha_cyclone: "odisha_cyclone_corridor",
};

export function runSimulation(request: SimulationRunRequest): SimulationResult {
  const scenarioId = scenarioAliases[request.scenarioId] ?? request.scenarioId;
  const scenario = runScenarioForSimulation(scenarioId);
  const target = resolveSimulationTarget(request);
  const costMode: RouteCostMode = request.costMode ?? "time";
  const blockedRouteIds = scenario.blockedRoutes.map((route) => route.id);
  const routeRecovery = getRecoveredRoute({
    sourceNodeId: target.sourceNodeId,
    destinationNodeId: target.destinationNodeId,
    blockedRouteIds,
    costMode,
  });
  const impact = calculateImpact({
    scenarioId,
    recoveryRoute: {
      extraDistanceKm: routeRecovery.extraDistanceKm,
      extraDelayMinutes: routeRecovery.extraDelayMinutes,
      recoveryStatus: routeRecovery.recoveryStatus,
    },
  });

  return {
    simulationId: `sim_${Date.now()}`,
    status: "COMPLETED",
    scenario,
    routeRecovery,
    impact,
    digitalTwin: buildDigitalTwinOverlay({ routeRecovery, scenario }),
    dashboard: buildDashboardSummary(impact),
    recommendedNextSteps,
    summary: buildSimulationSummary({ impact, routeRecovery, scenario }),
    generatedAt: new Date().toISOString(),
  };
}

function runScenarioForSimulation(scenarioId: string): ScenarioResult {
  try {
    if (getScenarioById(scenarioId)) return runLocalScenario(scenarioId);
    return runInternationalScenario(scenarioId);
  } catch (error) {
    if (error instanceof ScenarioNotFoundError) {
      throw new SimulationValidationError(
        "SIMULATION_SCENARIO_NOT_FOUND",
        "Simulation scenario not found",
        404
      );
    }
    throw error;
  }
}

