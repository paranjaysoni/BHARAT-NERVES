import type { InfrastructureNode } from "./node.types.js";
import type { CorridorRoute, RiskLevel, RouteStatus, RouteType } from "./route.types.js";

export type RouteCostMode = "distance" | "time" | "risk";
export type PathStatus = "FOUND" | "NOT_FOUND";
export type RouteGraphHealthStatus = "OPERATIONAL" | "DEGRADED" | "DISCONNECTED";
export type RecoveryStatus =
  | "RECOVERED"
  | "NO_ALTERNATE_ROUTE"
  | "NO_DISRUPTION"
  | "INVALID_NODES";

export interface RouteGraphEdge {
  routeId: string;
  sourceNodeId: string;
  destinationNodeId: string;
  distanceKm: number;
  travelTimeMinutes: number;
  routeType: RouteType;
  status: RouteStatus;
  riskLevel: RiskLevel;
}

export interface RouteGraph {
  nodes: Map<string, InfrastructureNode>;
  routes: Map<string, CorridorRoute>;
  adjacency: Map<string, RouteGraphEdge[]>;
}

export interface RouteGraphHealth {
  nodes: number;
  routes: number;
  activeRoutes: number;
  blockedRoutes: number;
  connectedComponents: number;
  status: RouteGraphHealthStatus;
}

export interface ShortestPathRequest {
  sourceNodeId: string;
  destinationNodeId: string;
  costMode?: RouteCostMode;
}

export interface ShortestPathResult {
  sourceNodeId: string;
  destinationNodeId: string;
  costMode: RouteCostMode;
  pathNodeIds: string[];
  pathNodes: InfrastructureNode[];
  routeIds: string[];
  routes: CorridorRoute[];
  totalDistanceKm: number;
  totalTravelTimeMinutes: number;
  totalCost: number;
  status: PathStatus;
}

export interface RouteRecoveryRequest extends ShortestPathRequest {
  blockedRouteIds?: string[];
}

export interface RouteRecoveryPath {
  pathNodeIds: string[];
  routeIds: string[];
  totalDistanceKm: number;
  totalTravelTimeMinutes: number;
  totalCost: number;
  status: PathStatus;
}

export interface RouteRecoveryResult {
  sourceNodeId: string;
  destinationNodeId: string;
  blockedRouteIds: string[];
  costMode: RouteCostMode;
  originalRoute: RouteRecoveryPath;
  recoveredRoute: RouteRecoveryPath;
  extraDistanceKm: number;
  extraDelayMinutes: number;
  recoveryStatus: RecoveryStatus;
  summary: string;
}

export class RouteGraphValidationError extends Error {
  constructor(
    public readonly code:
      | "INVALID_SOURCE_NODE"
      | "INVALID_DESTINATION_NODE"
      | "INVALID_BLOCKED_ROUTE"
      | "INVALID_COST_MODE",
    message: string
  ) {
    super(message);
    this.name = "RouteGraphValidationError";
  }
}

