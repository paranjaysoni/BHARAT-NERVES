export type NodeType =
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

export type NodeStatus =
  | "OPERATIONAL"
  | "WARNING"
  | "AT_RISK"
  | "DISRUPTED"
  | "OFFLINE";

export type NodeImportance = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface InfrastructureNode {
  id: string;
  name: string;
  type: NodeType;
  latitude: number;
  longitude: number;
  district: string;
  state: string;
  status: NodeStatus;
  importance: NodeImportance;
  capacity: number;
  capacityUnit: string;
  description: string;
  tags: string[];
}
