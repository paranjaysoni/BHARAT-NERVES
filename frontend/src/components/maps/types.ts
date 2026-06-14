"use client";

export type BackendNodeStatus =
  | "OPERATIONAL"
  | "WARNING"
  | "AT_RISK"
  | "DISRUPTED"
  | "OFFLINE";

export type BackendNodeType =
  | "PORT"
  | "CITY"
  | "WAREHOUSE"
  | "HOSPITAL"
  | "FUEL_DEPOT"
  | "RAIL_HUB"
  | "SHELTER"
  | "COMMAND_CENTER"
  | "RESPONSE_BASE"
  | "DISTRICT_HUB";

export type BackendRouteType = "ROAD" | "RAIL" | "PORT_LINK" | "EMERGENCY";
export type BackendRouteStatus = "ACTIVE" | "DELAYED" | "BLOCKED" | "AT_RISK";
export type BackendRiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface MapNode {
  id: string;
  name: string;
  type: BackendNodeType;
  latitude: number;
  longitude: number;
  district: string;
  state: string;
  status: BackendNodeStatus;
  importance: BackendRiskLevel;
  capacity: number;
  capacityUnit: string;
  description: string;
  tags: string[];
}

export interface MapRoute {
  id: string;
  name: string;
  sourceNodeId: string;
  destinationNodeId: string;
  distanceKm: number;
  travelTimeMinutes: number;
  routeType: BackendRouteType;
  highway?: string;
  status: BackendRouteStatus;
  corridor: string;
  riskLevel: BackendRiskLevel;
  baselineCarbonKg: number;
  baselineCostInr: number;
  description: string;
}

export type ImpactLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface HeatZone {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  level: ImpactLevel;
  radiusKm: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: {
    code: string;
    message: string;
  };
}

