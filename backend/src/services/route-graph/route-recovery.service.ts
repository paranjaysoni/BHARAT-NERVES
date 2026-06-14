import type {
  RouteCostMode,
  RouteGraph,
  RouteRecoveryPath,
  RouteRecoveryResult,
  ShortestPathResult,
} from "../../types/route-graph.types.js";
import { findShortestPath } from "./shortest-path.service.js";

export function recoverRoute({
  blockedRouteIds,
  costMode,
  destinationNodeId,
  graph,
  recoveryGraph,
  sourceNodeId,
}: {
  blockedRouteIds: string[];
  costMode: RouteCostMode;
  destinationNodeId: string;
  graph: RouteGraph;
  recoveryGraph: RouteGraph;
  sourceNodeId: string;
}): RouteRecoveryResult {
  const original = findShortestPath(graph, sourceNodeId, destinationNodeId, costMode);
  const recovered = findShortestPath(recoveryGraph, sourceNodeId, destinationNodeId, costMode);

  const originalRoute = toRecoveryPath(original);
  const recoveredRoute = toRecoveryPath(recovered);

  const hasDisruption = blockedRouteIds.length > 0;
  const recoveryStatus = getRecoveryStatus(hasDisruption, originalRoute, recoveredRoute);

  return {
    sourceNodeId,
    destinationNodeId,
    blockedRouteIds,
    costMode,
    originalRoute,
    recoveredRoute,
    extraDistanceKm: recoveredRoute.status === "FOUND" && originalRoute.status === "FOUND"
      ? Math.max(0, recoveredRoute.totalDistanceKm - originalRoute.totalDistanceKm)
      : 0,
    extraDelayMinutes: recoveredRoute.status === "FOUND" && originalRoute.status === "FOUND"
      ? Math.max(0, recoveredRoute.totalTravelTimeMinutes - originalRoute.totalTravelTimeMinutes)
      : 0,
    recoveryStatus,
    summary: buildRecoverySummary(recoveryStatus, recovered),
  };
}

function toRecoveryPath(path: ShortestPathResult): RouteRecoveryPath {
  return {
    pathNodeIds: path.pathNodeIds,
    routeIds: path.routeIds,
    totalDistanceKm: path.totalDistanceKm,
    totalTravelTimeMinutes: path.totalTravelTimeMinutes,
    totalCost: path.totalCost,
    status: path.status,
  };
}

function getRecoveryStatus(
  hasDisruption: boolean,
  originalRoute: RouteRecoveryPath,
  recoveredRoute: RouteRecoveryPath
): RouteRecoveryResult["recoveryStatus"] {
  if (!hasDisruption) return "NO_DISRUPTION";
  if (originalRoute.status === "NOT_FOUND" && recoveredRoute.status === "NOT_FOUND") {
    return "NO_ALTERNATE_ROUTE";
  }
  if (recoveredRoute.status === "NOT_FOUND") return "NO_ALTERNATE_ROUTE";
  return "RECOVERED";
}

function buildRecoverySummary(
  recoveryStatus: RouteRecoveryResult["recoveryStatus"],
  recovered: ShortestPathResult
): string {
  if (recoveryStatus === "NO_DISRUPTION") {
    return "No blocked routes were supplied; the original route remains available.";
  }
  if (recoveryStatus === "NO_ALTERNATE_ROUTE") {
    return "No alternate route exists with the supplied blocked routes excluded.";
  }

  const viaNode = recovered.pathNodes[1]?.name;
  return viaNode
    ? `Alternate route found through ${viaNode}.`
    : "Alternate route found.";
}

