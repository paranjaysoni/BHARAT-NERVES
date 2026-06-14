import type {
  ScenarioExecutionContext,
  ScenarioResult,
} from "../../types/scenario-engine.types.js";
import type { ScenarioCategory, ScenarioSeverity } from "../../types/scenario.types.js";

const severityAction: Record<ScenarioSeverity, { action: string; page: string }> = {
  CRITICAL: {
    action: "Open Crisis Commander",
    page: "/crisis-commander",
  },
  HIGH: {
    action: "Open Crisis Commander",
    page: "/crisis-commander",
  },
  MEDIUM: {
    action: "Open Impact Dashboard",
    page: "/impact-dashboard",
  },
  LOW: {
    action: "Open Control Room",
    page: "/control-room",
  },
};

const categoryAction: Partial<Record<ScenarioCategory, { action: string; page: string }>> = {
  PORT_SHUTDOWN: {
    action: "Open Trade Sentinel",
    page: "/trade-sentinel",
  },
  TRADE_DISRUPTION: {
    action: "Open Trade Sentinel",
    page: "/trade-sentinel",
  },
  SEA_BLOCKADE: {
    action: "Open Trade Sentinel",
    page: "/trade-sentinel",
  },
};

export function buildScenarioResult(context: ScenarioExecutionContext): ScenarioResult {
  const { scenario, scope, affectedNodes, affectedRoutes, blockedRoutes, request } = context;
  const recommendation = categoryAction[scenario.category] ?? severityAction[scenario.severity];

  return {
    scenarioId: scenario.id,
    scenarioName: scenario.name,
    category: scenario.category,
    severity: scenario.severity,
    status: "SIMULATED",
    scope,
    mode: request.mode ?? "demo",
    intensity: request.intensity ?? "standard",
    region: scenario.region,
    country: scenario.country,
    affectedNodes,
    affectedRoutes,
    blockedRoutes,
    expectedImpacts: scenario.expectedImpacts,
    operationalSummary: buildOperationalSummary({
      affectedNodeCount: affectedNodes.length,
      affectedRouteCount: affectedRoutes.length,
      blockedRouteCount: blockedRoutes.length,
      scenarioName: scenario.name,
      severity: scenario.severity,
      region: scenario.region,
      scope,
    }),
    recommendedAction: recommendation.action,
    recommendedNextPage: recommendation.page,
    generatedAt: new Date().toISOString(),
  };
}

function buildOperationalSummary({
  affectedNodeCount,
  affectedRouteCount,
  blockedRouteCount,
  scenarioName,
  severity,
  region,
  scope,
}: {
  affectedNodeCount: number;
  affectedRouteCount: number;
  blockedRouteCount: number;
  scenarioName: string;
  severity: ScenarioSeverity;
  region: string;
  scope: "LOCAL" | "INTERNATIONAL";
}): string {
  const scopeLabel = scope === "INTERNATIONAL" ? "international" : "local";
  return `${scenarioName} has been simulated as a ${severity.toLowerCase()} ${scopeLabel} scenario for ${region}. The run resolves ${affectedNodeCount} affected nodes, ${affectedRouteCount} affected routes, and ${blockedRouteCount} blocked routes from the static data layer. No alternate routing, recovery planning, or impact recalculation has been executed.`;
}

