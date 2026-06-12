export type ShipmentPriority = "critical" | "high" | "medium" | "low";
export type ShipmentStatus = "on-time" | "delayed" | "rerouted" | "at-risk";

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  priority: ShipmentPriority;
  delay: string;
  status: ShipmentStatus;
}
