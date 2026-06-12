export type CorridorStatus = "operational" | "watch" | "stressed" | "critical";

export interface Corridor {
  id: string;
  name: string;
  region: string;
  status: CorridorStatus;
  primaryRisk: string;
  activeNodes: number;
}
