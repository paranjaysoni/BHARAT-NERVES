export interface SystemStatus {
  status: "Operational" | "Degraded" | "Maintenance";
  uptime: string;
  activeCorridors: number;
  nodesMonitored: number;
  version: string;
}

export const systemStatus: SystemStatus = {
  status: "Operational",
  uptime: "99.98%",
  activeCorridors: 12,
  nodesMonitored: 245,
  version: "Project Aegis v1.0.0"
};
