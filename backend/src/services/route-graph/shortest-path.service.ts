import type { CorridorRoute, RiskLevel } from "../../types/route.types.js";
import type {
  RouteCostMode,
  RouteGraph,
  RouteGraphEdge,
  ShortestPathResult,
} from "../../types/route-graph.types.js";

const riskPenalty: Record<RiskLevel, number> = {
  CRITICAL: 120,
  HIGH: 60,
  LOW: 0,
  MEDIUM: 20,
};

type PreviousStep = {
  previousNodeId: string;
  routeId: string;
};

export function findShortestPath(
  graph: RouteGraph,
  sourceNodeId: string,
  destinationNodeId: string,
  costMode: RouteCostMode = "time"
): ShortestPathResult {
  const distances = new Map<string, number>();
  const previous = new Map<string, PreviousStep>();
  const unvisited = new Set(graph.nodes.keys());

  for (const nodeId of graph.nodes.keys()) distances.set(nodeId, Number.POSITIVE_INFINITY);
  distances.set(sourceNodeId, 0);

  while (unvisited.size > 0) {
    const currentNodeId = getLowestDistanceNode(unvisited, distances);
    if (!currentNodeId) break;
    if (currentNodeId === destinationNodeId) break;

    unvisited.delete(currentNodeId);
    const currentDistance = distances.get(currentNodeId) ?? Number.POSITIVE_INFINITY;
    if (!Number.isFinite(currentDistance)) break;

    for (const edge of graph.adjacency.get(currentNodeId) ?? []) {
      if (!unvisited.has(edge.destinationNodeId)) continue;

      const nextDistance = currentDistance + getEdgeCost(edge, costMode);
      if (nextDistance < (distances.get(edge.destinationNodeId) ?? Number.POSITIVE_INFINITY)) {
        distances.set(edge.destinationNodeId, nextDistance);
        previous.set(edge.destinationNodeId, {
          previousNodeId: currentNodeId,
          routeId: edge.routeId,
        });
      }
    }
  }

  const totalCost = distances.get(destinationNodeId) ?? Number.POSITIVE_INFINITY;
  if (!Number.isFinite(totalCost)) {
    return emptyPathResult(sourceNodeId, destinationNodeId, costMode);
  }

  return buildPathResult(graph, sourceNodeId, destinationNodeId, costMode, previous, totalCost);
}

function getLowestDistanceNode(
  nodeIds: Set<string>,
  distances: Map<string, number>
): string | null {
  let selectedNodeId: string | null = null;
  let selectedDistance = Number.POSITIVE_INFINITY;

  for (const nodeId of nodeIds) {
    const distance = distances.get(nodeId) ?? Number.POSITIVE_INFINITY;
    if (distance < selectedDistance) {
      selectedDistance = distance;
      selectedNodeId = nodeId;
    }
  }

  return selectedNodeId;
}

function getEdgeCost(edge: RouteGraphEdge, costMode: RouteCostMode): number {
  if (costMode === "distance") return edge.distanceKm;
  if (costMode === "risk") return edge.travelTimeMinutes + riskPenalty[edge.riskLevel];
  return edge.travelTimeMinutes;
}

function buildPathResult(
  graph: RouteGraph,
  sourceNodeId: string,
  destinationNodeId: string,
  costMode: RouteCostMode,
  previous: Map<string, PreviousStep>,
  totalCost: number
): ShortestPathResult {
  const pathNodeIds = [destinationNodeId];
  const routeIds: string[] = [];
  let cursor = destinationNodeId;

  while (cursor !== sourceNodeId) {
    const step = previous.get(cursor);
    if (!step) return emptyPathResult(sourceNodeId, destinationNodeId, costMode);
    routeIds.unshift(step.routeId);
    pathNodeIds.unshift(step.previousNodeId);
    cursor = step.previousNodeId;
  }

  const routes = routeIds
    .map((routeId) => graph.routes.get(routeId))
    .filter((route): route is CorridorRoute => Boolean(route));

  return {
    sourceNodeId,
    destinationNodeId,
    costMode,
    pathNodeIds,
    pathNodes: pathNodeIds
      .map((nodeId) => graph.nodes.get(nodeId))
      .filter((node): node is NonNullable<typeof node> => Boolean(node)),
    routeIds,
    routes,
    totalDistanceKm: sum(routes, "distanceKm"),
    totalTravelTimeMinutes: sum(routes, "travelTimeMinutes"),
    totalCost,
    status: "FOUND",
  };
}

export function emptyPathResult(
  sourceNodeId: string,
  destinationNodeId: string,
  costMode: RouteCostMode
): ShortestPathResult {
  return {
    sourceNodeId,
    destinationNodeId,
    costMode,
    pathNodeIds: [],
    pathNodes: [],
    routeIds: [],
    routes: [],
    totalDistanceKm: 0,
    totalTravelTimeMinutes: 0,
    totalCost: 0,
    status: "NOT_FOUND",
  };
}

function sum(routes: CorridorRoute[], key: "distanceKm" | "travelTimeMinutes"): number {
  return routes.reduce((total, route) => total + route[key], 0);
}

