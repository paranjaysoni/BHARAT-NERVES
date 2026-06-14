export type RouteType = "ROAD" | "RAIL" | "PORT_LINK" | "EMERGENCY";

export type RouteStatus = "ACTIVE" | "DELAYED" | "BLOCKED" | "AT_RISK";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface CorridorRoute {
  id: string;
  name: string;
  sourceNodeId: string;
  destinationNodeId: string;
  distanceKm: number;
  travelTimeMinutes: number;
  routeType: RouteType;
  highway?: string;
  status: RouteStatus;
  corridor: string;
  riskLevel: RiskLevel;
  baselineCarbonKg: number;
  baselineCostInr: number;
  description: string;
}
