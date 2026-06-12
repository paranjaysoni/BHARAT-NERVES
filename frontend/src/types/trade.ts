export type TradeRiskLevel = "low" | "medium" | "high" | "critical";
export type PortOperatingStatus = "normal" | "watch" | "congested" | "disrupted";

export interface TradeKpi {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  status: "success" | "warning" | "danger" | "info" | "neutral";
}

export interface PortStatus {
  id: string;
  name: string;
  status: PortOperatingStatus;
  congestionLevel: string;
  delay: string;
  riskLevel: TradeRiskLevel;
}

export interface FutureRiskIndicator {
  id: string;
  horizon: string;
  summary: string;
  riskLevel: TradeRiskLevel;
}

export interface CommodityStatus {
  id: string;
  name: string;
  volume: string;
  riskStatus: TradeRiskLevel;
  delayStatus: string;
}

export interface TradeCorridorHealth {
  id: string;
  name: string;
  health: number;
  riskLevel: TradeRiskLevel;
  activeAlerts: number;
}

export interface TradeAlert {
  id: string;
  title: string;
  description: string;
  severity: "info" | "warning" | "danger" | "critical";
  timestamp: string;
}

export interface TradeFlowTrendPoint {
  id: string;
  label: string;
  value: number;
}
