import {
  getInternationalScenarioById,
  getScenarioById,
} from "../data/scenarios.service.js";
import { getAllNodes } from "../data/nodes.service.js";
import { getAllRoutes } from "../data/routes.service.js";
import type { ScenarioRunRequest, ScenarioResult } from "../../types/scenario-engine.types.js";
import type { InternationalScenario, Scenario } from "../../types/scenario.types.js";
import { buildScenarioResult } from "./scenario-result.builder.js";

export class ScenarioNotFoundError extends Error {
  constructor(id: string) {
    super(`Scenario not found: ${id}`);
    this.name = "ScenarioNotFoundError";
  }
}

export async function runLocalScenario(
  scenarioId: string,
  request: ScenarioRunRequest = {}
): Promise<ScenarioResult> {
  const scenario = await getScenarioById(scenarioId);
  if (!scenario) throw new ScenarioNotFoundError(scenarioId);
  return runScenario(scenario, "LOCAL", request);
}

export async function runInternationalScenario(
  scenarioId: string,
  request: ScenarioRunRequest = {}
): Promise<ScenarioResult> {
  const scenario = await getInternationalScenarioById(scenarioId);
  if (!scenario) throw new ScenarioNotFoundError(scenarioId);
  return runScenario(scenario, "INTERNATIONAL", request);
}

async function runScenario(
  scenario: Scenario | InternationalScenario,
  scope: "LOCAL" | "INTERNATIONAL",
  request: ScenarioRunRequest
): Promise<ScenarioResult> {
  const allNodes = await getAllNodes();
  const allRoutes = await getAllRoutes();
  const nodesById = new Map(allNodes.map((node) => [node.id, node]));
  const routesById = new Map(allRoutes.map((route) => [route.id, route]));

  const affectedNodes = scenario.affectedNodeIds
    .map((nodeId) => nodesById.get(nodeId))
    .filter((node): node is NonNullable<typeof node> => Boolean(node));

  const affectedRoutes = scenario.affectedRouteIds
    .map((routeId) => routesById.get(routeId))
    .filter((route): route is NonNullable<typeof route> => Boolean(route));

  const blockedRoutes = scenario.blockedRouteIds
    .map((routeId) => routesById.get(routeId))
    .filter((route): route is NonNullable<typeof route> => Boolean(route));

  return buildScenarioResult({
    scenario,
    scope,
    affectedNodes,
    affectedRoutes,
    blockedRoutes,
    request,
  });
}

