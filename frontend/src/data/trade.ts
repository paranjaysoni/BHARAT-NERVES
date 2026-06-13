import type {
  CommodityStatus,
  FutureRiskIndicator,
  PortStatus,
  TradeAlert,
  TradeCorridorHealth,
  TradeFlowTrendPoint,
  TradeKpi
} from "@/types";

export const tradeKpis: TradeKpi[] = [
  {
    id: "trade-flow-index",
    title: "Trade Flow Index",
    value: "87",
    subtitle: "Healthy",
    status: "success"
  },
  {
    id: "supply-chain-stress",
    title: "Supply Chain Stress",
    value: "65",
    subtitle: "Moderate",
    status: "warning"
  },
  {
    id: "transit-delay",
    title: "Avg. Transit Delay",
    value: "1.8 Days",
    subtitle: "0.3 vs yesterday",
    status: "success"
  },
  {
    id: "active-bottlenecks",
    title: "Critical Bottlenecks",
    value: "04",
    subtitle: "High Priority",
    status: "danger"
  },
  {
    id: "trade-volume",
    title: "Trade Volume",
    value: "₹12.4 Cr",
    subtitle: "8.6% vs yesterday",
    status: "info"
  }
];

export const tradeAlerts: TradeAlert[] = [
  {
    id: "trade-alert-paradip-congestion",
    title: "Paradip Port congestion rising",
    description:
      "Outbound freight dwell time is increasing as coastal weather pressure builds.",
    severity: "warning",
    timestamp: "2024-11-28T11:20:00+05:30"
  },
  {
    id: "trade-alert-coastal-delay",
    title: "Coastal corridor delay expected",
    description:
      "East coast logistics lanes may see extended transit windows over the next 24 hours.",
    severity: "warning",
    timestamp: "2024-11-28T10:55:00+05:30"
  },
  {
    id: "trade-alert-highway-pressure",
    title: "Highway freight pressure increasing",
    description:
      "Khurda-Puri movement is under watch due to freight diversion and road saturation.",
    severity: "danger",
    timestamp: "2024-11-28T10:30:00+05:30"
  },
  {
    id: "trade-alert-medical-lane",
    title: "Medical supply lane under stress",
    description:
      "Priority medical shipments are delayed between coastal staging and hospital nodes.",
    severity: "critical",
    timestamp: "2024-11-28T09:50:00+05:30"
  }
];

export const portStatuses: PortStatus[] = [
  {
    id: "port-paradip",
    name: "Paradip Port",
    status: "congested",
    congestionLevel: "78%",
    delay: "+12 hrs",
    riskLevel: "high"
  },
  {
    id: "port-kolkata",
    name: "Kolkata Port",
    status: "watch",
    congestionLevel: "54%",
    delay: "+4 hrs",
    riskLevel: "medium"
  },
  {
    id: "port-visakhapatnam",
    name: "Visakhapatnam Port",
    status: "normal",
    congestionLevel: "32%",
    delay: "+1 hr",
    riskLevel: "low"
  },
  {
    id: "port-chennai",
    name: "Chennai Port",
    status: "watch",
    congestionLevel: "49%",
    delay: "+3 hrs",
    riskLevel: "medium"
  }
];

export const futureRiskIndicators: FutureRiskIndicator[] = [
  {
    id: "risk-24h",
    horizon: "24h",
    summary: "Moderate congestion risk",
    riskLevel: "medium"
  },
  {
    id: "risk-48h",
    horizon: "48h",
    summary: "Cyclone-linked coastal logistics pressure",
    riskLevel: "high"
  },
  {
    id: "risk-7d",
    horizon: "7-day",
    summary: "Recovery expected with alternate routing",
    riskLevel: "low"
  }
];

export const commodityBreakdown: CommodityStatus[] = [
  {
    id: "commodity-medical",
    name: "Medical Supplies",
    volume: "18.4K units",
    riskStatus: "high",
    delayStatus: "+9 hrs"
  },
  {
    id: "commodity-food",
    name: "Food",
    volume: "42.8K tonnes",
    riskStatus: "medium",
    delayStatus: "+5 hrs"
  },
  {
    id: "commodity-fuel",
    name: "Fuel",
    volume: "12.6M litres",
    riskStatus: "medium",
    delayStatus: "+3 hrs"
  },
  {
    id: "commodity-industrial",
    name: "Industrial Cargo",
    volume: "74.2K tonnes",
    riskStatus: "high",
    delayStatus: "+12 hrs"
  },
  {
    id: "commodity-relief",
    name: "Relief Kits",
    volume: "26.1K kits",
    riskStatus: "critical",
    delayStatus: "+8 hrs"
  }
];

export const tradeCorridorHealth: TradeCorridorHealth[] = [
  {
    id: "corridor-odisha-cyclone-trade",
    name: "Odisha Cyclone Corridor",
    health: 72,
    riskLevel: "high",
    activeAlerts: 4
  },
  {
    id: "corridor-east-coast-freight",
    name: "East Coast Freight Corridor",
    health: 81,
    riskLevel: "medium",
    activeAlerts: 2
  },
  {
    id: "corridor-medical-relief",
    name: "Medical Relief Corridor",
    health: 76,
    riskLevel: "medium",
    activeAlerts: 3
  },
  {
    id: "corridor-port-warehouse",
    name: "Port-to-Warehouse Corridor",
    health: 68,
    riskLevel: "high",
    activeAlerts: 5
  }
];

export const tradeFlowTrend: TradeFlowTrendPoint[] = [
  { id: "trend-mon", label: "Mon", value: 91 },
  { id: "trend-tue", label: "Tue", value: 88 },
  { id: "trend-wed", label: "Wed", value: 86 },
  { id: "trend-thu", label: "Thu", value: 84 },
  { id: "trend-fri", label: "Fri", value: 79 },
  { id: "trend-sat", label: "Sat", value: 82 },
  { id: "trend-sun", label: "Sun", value: 85 }
];
