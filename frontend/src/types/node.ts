export type AegisNodeType =
  | "port"
  | "warehouse"
  | "hospital"
  | "relief-center"
  | "district-hub"
  | "transport-junction"
  | "power-station";

export type AegisNodeStatus =
  | "operational"
  | "watch"
  | "stressed"
  | "disrupted";

export interface AegisNode {
  id: string;
  name: string;
  type: AegisNodeType;
  lat: number;
  lng: number;
  status: AegisNodeStatus;
  district: string;
}
