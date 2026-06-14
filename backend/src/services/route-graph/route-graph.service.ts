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

export function getRouteGraphHealth(): RouteGraphHealth {
  const nodes = getAllNodes();
  const routes = getAllRoutes();
  const graph = buildRouteGraph();
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

export function getShortestPath(request: ShortestPathRequest): ShortestPathResult {
  const costMode = normalizeCostMode(request.costMode);
  validateNodes(request.sourceNodeId, request.destinationNodeId);

  const graph = buildRouteGraph();
  return findShortestPath(
    graph,
    request.sourceNodeId,
    request.destinationNodeId,
    costMode
  );
}

export function getRecoveredRoute(request: RouteRecoveryRequest): RouteRecoveryResult {
  const costMode = normalizeCostMode(request.costMode);
  const blockedRouteIds = request.blockedRouteIds ?? [];
  validateNodes(request.sourceNodeId, request.destinationNodeId);
  validateBlockedRoutes(blockedRouteIds);

  const graph = buildRouteGraph();
  const recoveryGraph = buildRouteGraph(blockedRouteIds);

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

function validateNodes(sourceNodeId: string, destinationNodeId: string): void {
  const nodeIds = new Set(getAllNodes().map((node) => node.id));

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

function validateBlockedRoutes(blockedRouteIds: string[]): void {
  const routeIds = new Set(getAllRoutes().map((route) => route.id));
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

