import type { ImpactCalculationResult } from "../../types/impact-engine.types.js";
import type { RouteRecoveryResult } from "../../types/route-graph.types.js";
import type { ScenarioResult } from "../../types/scenario-engine.types.js";
import type {
  RecommendedNextStep,
  SimulationDashboardSummary,
  SimulationDigitalTwin,
} from "../../types/simulation.types.js";

export const recommendedNextSteps: RecommendedNextStep[] = [
  {
    label: "Review AI Parliament",
    route: "/ai-parliament",
    priority: "HIGH",
  },
  {
    label: "Open Crisis Commander",
    route: "/crisis-commander",
    priority: "CRITICAL",
  },
  {
    label: "Inspect Impact Dashboard",
    route: "/impact-dashboard",
    priority: "HIGH",
  },
];

export function buildSimulationSummary({
  impact,
  routeRecovery,
  scenario,
}: {
  impact: ImpactCalculationResult;
  routeRecovery: RouteRecoveryResult;
  scenario: ScenarioResult;
}): string {
  return `${scenario.scenarioName} simulation completed with ${impact.score.riskLevel.toLowerCase()} impact risk. Route recovery status is ${routeRecovery.recoveryStatus.toLowerCase().replace(/_/g, " ")} and projected economic exposure is ₹${impact.economic.lossAfterRecoveryCr} Cr.`;
}

export function buildDashboardSummary(impact: ImpactCalculationResult): SimulationDashboardSummary {
  return {
    resilienceScore: impact.resilience.after,
    activeAlerts: impact.infrastructure.blockedRoutes + 1,
    atRiskNodes: impact.infrastructure.affectedNodes,
    disruptedRoutes: impact.infrastructure.blockedRoutes,
    economicExposureCr: impact.economic.lossAfterRecoveryCr,
    populationAffected: impact.population.affected,
    carbonImpactTons: impact.carbon.finalCarbonTons,
    recoveryTime: impact.delay.recoveryTimeDays,
    riskLevel: impact.score.riskLevel,
  };
}

export function buildDigitalTwinOverlay({
  routeRecovery,
  scenario,
}: {
  routeRecovery: RouteRecoveryResult;
  scenario: ScenarioResult;
}): SimulationDigitalTwin {
  const affectedNodeIds = scenario.affectedNodes.map((node) => node.id);
  const affectedRouteIds = scenario.affectedRoutes.map((route) => route.id);
  const blockedRouteIds = scenario.blockedRoutes.map((route) => route.id);
  const recoveredRouteIds = routeRecovery.recoveredRoute.routeIds;
  const nodeOverlay: SimulationDigitalTwin["statusOverlay"]["nodes"] = {};
  const routeOverlay: SimulationDigitalTwin["statusOverlay"]["routes"] = {};

  for (const nodeId of affectedNodeIds) nodeOverlay[nodeId] = "AT_RISK";
  for (const routeId of affectedRouteIds) routeOverlay[routeId] = "AT_RISK";
  for (const routeId of blockedRouteIds) routeOverlay[routeId] = "BLOCKED";
  for (const routeId of recoveredRouteIds) {
    if (!blockedRouteIds.includes(routeId)) routeOverlay[routeId] = "RECOVERY";
  }

  for (const route of scenario.blockedRoutes) {
    nodeOverlay[route.sourceNodeId] = "DISRUPTED";
    nodeOverlay[route.destinationNodeId] = "DISRUPTED";
  }

  return {
    nodes: scenario.affectedNodes,
    routes: scenario.affectedRoutes,
    affectedNodeIds,
    affectedRouteIds,
    blockedRouteIds,
    recoveredRouteIds,
    statusOverlay: {
      nodes: nodeOverlay,
      routes: routeOverlay,
    },
  };
}

