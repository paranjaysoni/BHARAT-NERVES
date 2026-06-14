import { getAllNodes } from "../data/nodes.service.js";
import { getAllRoutes } from "../data/routes.service.js";
import type { CorridorRoute, RouteStatus } from "../../types/route.types.js";
import type { RouteGraph, RouteGraphEdge } from "../../types/route-graph.types.js";

const unavailableStatuses = new Set<RouteStatus | "DISRUPTED">(["BLOCKED", "DISRUPTED"]);

export function buildRouteGraph(blockedRouteIds: string[] = []): RouteGraph {
  const nodes = new Map(getAllNodes().map((node) => [node.id, node]));
  const routes = new Map(getAllRoutes().map((route) => [route.id, route]));
  const adjacency = new Map<string, RouteGraphEdge[]>(
    [...nodes.keys()].map((nodeId) => [nodeId, []])
  );
  const blockedRouteSet = new Set(blockedRouteIds);

  for (const route of routes.values()) {
    if (isRouteUnavailable(route, blockedRouteSet)) continue;
    if (!nodes.has(route.sourceNodeId) || !nodes.has(route.destinationNodeId)) continue;

    addBidirectionalEdge(adjacency, route);
  }

  return { nodes, routes, adjacency };
}

export function isRouteUnavailable(
  route: CorridorRoute,
  blockedRouteIds = new Set<string>()
): boolean {
  return blockedRouteIds.has(route.id) || unavailableStatuses.has(route.status);
}

function addBidirectionalEdge(
  adjacency: Map<string, RouteGraphEdge[]>,
  route: CorridorRoute
): void {
  const forwardEdge: RouteGraphEdge = {
    routeId: route.id,
    sourceNodeId: route.sourceNodeId,
    destinationNodeId: route.destinationNodeId,
    distanceKm: route.distanceKm,
    travelTimeMinutes: route.travelTimeMinutes,
    routeType: route.routeType,
    status: route.status,
    riskLevel: route.riskLevel,
  };
  const reverseEdge: RouteGraphEdge = {
    ...forwardEdge,
    sourceNodeId: route.destinationNodeId,
    destinationNodeId: route.sourceNodeId,
  };

  adjacency.get(route.sourceNodeId)?.push(forwardEdge);
  adjacency.get(route.destinationNodeId)?.push(reverseEdge);
}

