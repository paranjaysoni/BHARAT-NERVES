import type {
  DataSourceItem,
  DevSettingItem,
  FutureIntegrationItem,
  IntegrationItem,
  NotificationChannel,
  PlatformInfo,
  PlatformSettings,
  SecurityItem,
  SystemHealthItem
} from "@/types/settings";

export const settings: PlatformSettings = {
  theme: "light",
  language: "en-IN",
  timezone: "Asia/Kolkata",
  notifications: {
    alerts: true,
    reports: true,
    scenarioUpdates: true
  },
  integrations: {
    weatherFeed: "planned",
    logisticsFeed: "planned",
    governmentDataExchange: "planned"
  },
  displayTime: "11:42 AM",
  displayDate: "28 Nov 2024"
};

export const notificationChannels: NotificationChannel[] = [
  {
    id: "notif-critical-alerts",
    label: "Critical Alerts",
    description: "Cyclone warnings, critical node failures, and emergency level events.",
    enabled: true
  },
  {
    id: "notif-trade-alerts",
    label: "Trade Alerts",
    description: "Port disruptions, shipment delays, and corridor congestion notifications.",
    enabled: true
  },
  {
    id: "notif-scenario",
    label: "Scenario Notifications",
    description: "Scenario state changes, simulation completions, and impact updates.",
    enabled: true
  },
  {
    id: "notif-parliament",
    label: "AI Parliament Updates",
    description: "Session completions, consensus changes, and recommendation readiness.",
    enabled: false
  },
  {
    id: "notif-commander",
    label: "Crisis Commander Updates",
    description: "Action plan changes, approval requests, and response status updates.",
    enabled: true
  },
  {
    id: "notif-reports",
    label: "Weekly Reports",
    description: "Scheduled weekly intelligence briefings and corridor health reports.",
    enabled: false
  }
];

export const dataSources: DataSourceItem[] = [
  {
    id: "ds-weather",
    name: "Weather Feed",
    description: "IMD cyclone track, rainfall, and coastal wind band data.",
    status: "mocked",
    lastSync: "Demo data only"
  },
  {
    id: "ds-port",
    name: "Port Feed",
    description: "Vessel AIS, berth utilization, and congestion data from major ports.",
    status: "mocked",
    lastSync: "Demo data only"
  },
  {
    id: "ds-railway",
    name: "Railway Feed",
    description: "Indian Railways freight corridor status and emergency slot data.",
    status: "planned",
    lastSync: "Not connected"
  },
  {
    id: "ds-traffic",
    name: "Traffic Feed",
    description: "NH road segment congestion, junction status, and travel time estimates.",
    status: "planned",
    lastSync: "Not connected"
  },
  {
    id: "ds-carbon",
    name: "Carbon Dataset",
    description: "Freight emission factors, vehicle load profiles, and carbon offset references.",
    status: "mocked",
    lastSync: "Demo data only"
  },
  {
    id: "ds-hospital",
    name: "Hospital Dataset",
    description: "Bed availability, supply buffer, and district hospital capacity data.",
    status: "mocked",
    lastSync: "Demo data only"
  }
];

export const integrations: IntegrationItem[] = [
  {
    id: "int-weather-api",
    name: "Weather APIs",
    category: "Data",
    status: "planned",
    readiness: "Schema ready",
    note: "IMD API integration planned for Phase 2. Mock weather data serves all current screens."
  },
  {
    id: "int-gis",
    name: "GIS Services",
    category: "Maps",
    status: "planned",
    readiness: "Architecture defined",
    note: "MapLibre GL / Leaflet integration planned. MapPlaceholder components hold all map positions."
  },
  {
    id: "int-port",
    name: "Port Systems",
    category: "Trade",
    status: "planned",
    readiness: "Data model ready",
    note: "Paradip Port Trust AIS feed and berth management API integration planned for Phase 2."
  },
  {
    id: "int-logistics",
    name: "Logistics Providers",
    category: "Trade",
    status: "planned",
    readiness: "Schema defined",
    note: "CONCOR and 3PL freight tracking APIs planned for Phase 2."
  },
  {
    id: "int-govt-data",
    name: "Government Data Sources",
    category: "Data",
    status: "planned",
    readiness: "Scope defined",
    note: "NDMA, State DMA, and district collector data exchange planned for Phase 3."
  },
  {
    id: "int-ai",
    name: "AI Providers",
    category: "AI",
    status: "mocked",
    readiness: "Prompts drafted",
    note: "Gemini 2.5 and OpenAI integration architecture ready. All current AI outputs are mock structured data."
  }
];

export const securityItems: SecurityItem[] = [
  {
    id: "sec-auth",
    label: "Authentication",
    status: "inactive",
    value: "Not configured — demo mode"
  },
  {
    id: "sec-encryption",
    label: "Data Encryption",
    status: "partial",
    value: "HTTPS only — no at-rest encryption"
  },
  {
    id: "sec-audit",
    label: "Audit Logging",
    status: "inactive",
    value: "Disabled — planned for Phase 2"
  },
  {
    id: "sec-access",
    label: "Access Control",
    status: "inactive",
    value: "Not configured — single user demo"
  },
  {
    id: "sec-api",
    label: "API Security",
    status: "inactive",
    value: "No API layer — frontend only"
  }
];

export const platformInfo: PlatformInfo = {
  project: "Project Aegis",
  platform: "Bharat Nerves Platform",
  version: "1.0.0 MVP",
  build: "Hackathon Prototype",
  environment: "Demo",
  region: "India",
  releaseDate: "November 2024"
};

export const systemHealth: SystemHealthItem[] = [
  {
    id: "health-uptime",
    label: "Uptime",
    value: "100%",
    subtitle: "Session uptime",
    status: "success"
  },
  {
    id: "health-modules",
    label: "Active Modules",
    value: "9 / 9",
    subtitle: "All pages operational",
    status: "success"
  },
  {
    id: "health-data-sources",
    label: "Data Sources",
    value: "4 mocked",
    subtitle: "2 planned",
    status: "warning"
  },
  {
    id: "health-last-sync",
    label: "Last Sync",
    value: "Static",
    subtitle: "Mock data layer",
    status: "neutral"
  },
  {
    id: "health-score",
    label: "Health Score",
    value: "92 / 100",
    subtitle: "Demo environment",
    status: "success"
  },
  {
    id: "health-build",
    label: "Build Status",
    value: "Passing",
    subtitle: "TypeScript clean",
    status: "success"
  }
];

export const futureIntegrations: FutureIntegrationItem[] = [
  {
    id: "future-weather-api",
    name: "Real Weather APIs",
    description: "Live IMD cyclone track, wind band data, and rainfall forecasts via official APIs.",
    status: "planned",
    priority: "high"
  },
  {
    id: "future-traffic",
    name: "Traffic APIs",
    description: "Real-time NH road congestion, junction status, and travel time data.",
    status: "planned",
    priority: "high"
  },
  {
    id: "future-port",
    name: "Port APIs",
    description: "Live AIS vessel tracking, berth occupancy, and port operational status feeds.",
    status: "planned",
    priority: "high"
  },
  {
    id: "future-railway",
    name: "Railway APIs",
    description: "Indian Railways FOIS freight tracking and emergency slot reservation APIs.",
    status: "planned",
    priority: "medium"
  },
  {
    id: "future-satellite",
    name: "Satellite Data",
    description: "ISRO and commercial SAR/optical imagery for flood mapping and damage assessment.",
    status: "planned",
    priority: "medium"
  },
  {
    id: "future-drone",
    name: "Drone Systems",
    description: "UAV telemetry integration for real-time corridor surveillance and damage reporting.",
    status: "planned",
    priority: "low"
  },
  {
    id: "future-carbon",
    name: "Carbon Engines",
    description: "Validated carbon accounting engine with live emission factor datasets.",
    status: "planned",
    priority: "medium"
  },
  {
    id: "future-govt-dashboards",
    name: "Government Dashboards",
    description: "NDMA, State DMA, and Ministry of Shipping direct data exchange and reporting APIs.",
    status: "planned",
    priority: "high"
  }
];

export const devSettings: DevSettingItem[] = [
  {
    id: "dev-mock-mode",
    label: "Mock Mode",
    value: "Enabled",
    enabled: true
  },
  {
    id: "dev-api-layer",
    label: "API Layer",
    value: "Disabled",
    enabled: false
  },
  {
    id: "dev-ai-layer",
    label: "AI Layer",
    value: "Disabled — mock responses only",
    enabled: false
  },
  {
    id: "dev-simulation",
    label: "Simulation Engine",
    value: "Disabled — static scenario data",
    enabled: false
  },
  {
    id: "dev-data-source-mode",
    label: "Data Source Mode",
    value: "Static",
    enabled: false
  },
  {
    id: "dev-auth",
    label: "Authentication",
    value: "Disabled — demo mode",
    enabled: false
  }
];

export const aiConfiguration = {
  primaryModel: "Gemini 2.5",
  backupModel: "OpenAI GPT-4",
  agentCount: 8,
  responseFormat: "Structured JSON",
  aiStatus: "Mock Mode",
  note: "Current MVP uses mock AI responses. All agent outputs are pre-authored structured data. Live provider connections are planned for Phase 2."
};

export const settingsKpis = {
  connectedSources: 0,
  activeIntegrations: 0,
  notificationChannels: 6,
  aiProviders: 2,
  securityStatus: "Demo",
  systemVersion: "1.0.0 MVP"
};
