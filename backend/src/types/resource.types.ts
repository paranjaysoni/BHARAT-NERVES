export type ResourceCategory =
  | "FOOD"
  | "WATER"
  | "MEDICAL"
  | "TRANSPORT"
  | "FUEL"
  | "POWER"
  | "COMMUNICATION"
  | "SHELTER"
  | "RESCUE";

export type ResourceStatus = "AVAILABLE" | "LIMITED" | "DEPLOYED" | "CRITICAL";

export type ResourcePriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Resource {
  id: string;
  name: string;
  category: ResourceCategory;
  quantity: number;
  unit: string;
  locationNodeId: string;
  status: ResourceStatus;
  priority: ResourcePriority;
  description: string;
}
