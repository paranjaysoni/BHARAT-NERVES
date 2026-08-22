import { getAllNodes } from "../data/nodes.service.js";
import { getAllRoutes } from "../data/routes.service.js";
import type { CorridorRoute, RouteStatus } from "../../types/route.types.js";
import {
  RouteGraphValidationError,
  type RouteCostMode,
  type RouteGraphHealth,
  type RouteRecoveryRequest,
  type RouteRecoveryResult,
  type ShortestPathRequest,
  type ShortestPathResult,
} from "../../types/route-graph.types.js";
import { buildRouteGraph, isRouteUnavailable } from "./route-graph.builder.js";
import { findShortestPath } from "./shortest-path.service.js";
import { recoverRoute } from "./route-recovery.service.js";

const validCostModes = new Set<RouteCostMode>(["distance", "time", "risk"]);
const unavailableStatuses = new Set<RouteStatus | "DISRUPTED">(["BLOCKED", "DISRUPTED"]);

export async function getRouteGraphHealth(): Promise<RouteGraphHealth> {
  const nodes = await getAllNodes();
  const routes = await getAllRoutes();
  const graph = await buildRouteGraph();
  const blockedRoutes = routes.filter((route) => unavailableStatuses.has(route.status)).length;
  const connectedComponents = countConnectedComponents(graph.adjacency);

  return {
    nodes: nodes.length,
    routes: routes.length,
    activeRoutes: routes.length - blockedRoutes,
    blockedRoutes,
    connectedComponents,
    status: connectedComponents === 1 ? "OPERATIONAL" : blockedRoutes > 0 ? "DEGRADED" : "DISCONNECTED",
  };
}

export async function getShortestPath(request: ShortestPathRequest): Promise<ShortestPathResult> {
  const costMode = normalizeCostMode(request.costMode);
  await validateNodes(request.sourceNodeId, request.destinationNodeId);

  const graph = await buildRouteGraph();
  return findShortestPath(
    graph,
    request.sourceNodeId,
    request.destinationNodeId,
    costMode
  );
}

export async function getRecoveredRoute(request: RouteRecoveryRequest): Promise<RouteRecoveryResult> {
  const costMode = normalizeCostMode(request.costMode);
  const blockedRouteIds = request.blockedRouteIds ?? [];
  await validateNodes(request.sourceNodeId, request.destinationNodeId);
  await validateBlockedRoutes(blockedRouteIds);

  const graph = await buildRouteGraph();
  const recoveryGraph = await buildRouteGraph(blockedRouteIds);

  return recoverRoute({
    blockedRouteIds,
    costMode,
    destinationNodeId: request.destinationNodeId,
    graph,
    recoveryGraph,
    sourceNodeId: request.sourceNodeId,
  });
}

function normalizeCostMode(costMode: RouteCostMode | undefined): RouteCostMode {
  const normalized = costMode ?? "time";
  if (!validCostModes.has(normalized)) {
    throw new RouteGraphValidationError("INVALID_COST_MODE", "Cost mode is invalid");
  }
  return normalized;
}

async function validateNodes(sourceNodeId: string, destinationNodeId: string): Promise<void> {
  const allNodes = await getAllNodes();
  const nodeIds = new Set(allNodes.map((node) => node.id));

  if (!nodeIds.has(sourceNodeId)) {
    throw new RouteGraphValidationError("INVALID_SOURCE_NODE", "Source node does not exist");
  }
  if (!nodeIds.has(destinationNodeId)) {
    throw new RouteGraphValidationError(
      "INVALID_DESTINATION_NODE",
      "Destination node does not exist"
    );
  }
}

async function validateBlockedRoutes(blockedRouteIds: string[]): Promise<void> {
  const allRoutes = await getAllRoutes();
  const routeIds = new Set(allRoutes.map((route) => route.id));
  const invalidRouteId = blockedRouteIds.find((routeId) => !routeIds.has(routeId));

  if (invalidRouteId) {
    throw new RouteGraphValidationError(
      "INVALID_BLOCKED_ROUTE",
      `Blocked route does not exist: ${invalidRouteId}`
    );
  }
}

function countConnectedComponents(adjacency: Map<string, Array<{ destinationNodeId: string }>>): number {
  const visited = new Set<string>();
  let components = 0;

  for (const nodeId of adjacency.keys()) {
    if (visited.has(nodeId)) continue;

    components += 1;
    const stack = [nodeId];
    visited.add(nodeId);

    while (stack.length > 0) {
      const currentNodeId = stack.pop();
      if (!currentNodeId) continue;

      for (const edge of adjacency.get(currentNodeId) ?? []) {
        if (visited.has(edge.destinationNodeId)) continue;
        visited.add(edge.destinationNodeId);
        stack.push(edge.destinationNodeId);
      }
    }
  }

  return components;
}

export function routeIsUnavailable(route: CorridorRoute): boolean {
  return isRouteUnavailable(route);
}

