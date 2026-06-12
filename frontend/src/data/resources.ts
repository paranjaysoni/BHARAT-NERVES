import type { Resource } from "@/types";

export interface ResourceCategory {
  id: string;
  name: string;
  description: string;
  status: "ready" | "mocked" | "planned" | "static";
}

export interface StorageOverview {
  storageUsed: string;
  totalCapacity: string;
  datasetCount: number;
  documentCount: number;
  mapLayers: number;
  lastSync: string;
}

export interface ResourceUpdate {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: "success" | "warning" | "danger" | "info" | "neutral";
}

export interface DataSourceHealthItem {
  id: string;
  source: string;
  status: "mocked" | "planned" | "static";
}

export interface MvpDataPackItem {
  id: string;
  label: string;
  value: string;
}

export interface FutureResourceIntegration {
  id: string;
  name: string;
  description: string;
  status: "planned";
}

export const resources: Resource[] = [
  {
    id: "resource-odisha-node-dataset",
    title: "Odisha Cyclone Corridor Dataset",
    type: "dataset",
    category: "Datasets",
    owner: "Digital Twin Team",
    source: "Project Aegis Demo Data",
    updatedDate: "2024-11-28",
    format: "JSON",
    status: "mocked",
    description: "Primary MVP node dataset for Odisha ports, warehouses, hospitals, relief centers and hubs.",
    featured: true
  },
  {
    id: "resource-route-network",
    title: "Emergency Relief Routing Matrix",
    type: "dataset",
    category: "Simulation Assets",
    owner: "Scenario Simulator Team",
    source: "Project Aegis Demo Data",
    updatedDate: "2024-11-28",
    format: "JSON",
    status: "mocked",
    description: "Mock route network connecting ports, warehouses, hospitals and relief nodes.",
    featured: true
  },
  {
    id: "resource-district-risk-map",
    title: "Odisha Coastal District Risk Map",
    type: "map",
    category: "Maps",
    owner: "Geospatial Desk",
    source: "State GIS Reference",
    updatedDate: "2024-11-25",
    format: "GeoJSON",
    status: "static",
    description: "Reference layer for coastal districts and cyclone exposure zones."
  },
  {
    id: "resource-port-congestion-feed",
    title: "Port Congestion Mock Feed",
    type: "dataset",
    category: "Data Sources",
    owner: "Trade Sentinel Team",
    source: "Mock Port Operations Feed",
    updatedDate: "2024-11-28",
    format: "JSON",
    status: "mocked",
    description: "Static feed representing port congestion and delay posture for dashboard demos.",
    featured: true
  },
  {
    id: "resource-hospital-priority-nodes",
    title: "Hospital Priority Nodes",
    type: "dataset",
    category: "Datasets",
    owner: "Humanitarian Desk",
    source: "Health Systems Desk",
    updatedDate: "2024-11-24",
    format: "CSV",
    status: "mocked",
    description: "Priority hospital node register for medical supply routing.",
    featured: true
  },
  {
    id: "resource-scenario-trigger-config",
    title: "Scenario Trigger Config",
    type: "document",
    category: "Simulation Assets",
    owner: "Scenario Simulator Team",
    source: "Project Aegis Demo Data",
    updatedDate: "2024-11-27",
    format: "YAML",
    status: "mocked",
    description: "Mock trigger settings for cyclone, port shutdown, highway blockage and warehouse fire scenarios.",
    featured: true
  },
  {
    id: "resource-carbon-factor-reference",
    title: "Carbon Factor Reference Table",
    type: "dataset",
    category: "Carbon References",
    owner: "Environment Sentinel",
    source: "Climate Logistics Lab",
    updatedDate: "2024-11-22",
    format: "CSV",
    status: "static",
    description: "Reference values for future logistics carbon impact modeling.",
    featured: true
  },
  {
    id: "resource-port-layout-map",
    title: "Paradip Port Layout Reference",
    type: "map",
    category: "Maps",
    owner: "Port Resilience Cell",
    source: "Port Operations Reference",
    updatedDate: "2024-11-22",
    format: "PDF",
    status: "static",
    description: "Static port layout reference for future operational overlays."
  },
  {
    id: "resource-cyclone-guidelines",
    title: "Cyclone Preparedness Guidelines",
    type: "government-guideline",
    category: "Emergency Guidelines",
    owner: "Policy Desk",
    source: "Disaster Management Authority",
    updatedDate: "2024-10-15",
    format: "PDF",
    status: "ready",
    description: "Guideline reference for cyclone preparedness and response coordination."
  },
  {
    id: "resource-relief-sop",
    title: "Relief Center Operating SOP",
    type: "document",
    category: "Emergency Guidelines",
    owner: "Emergency Operations Cell",
    source: "Emergency Operations Cell",
    updatedDate: "2024-10-21",
    format: "DOCX",
    status: "ready",
    description: "Operating procedures for relief center activation and resource staging."
  },
  {
    id: "resource-hospital-capacity",
    title: "Hospital Surge Capacity Register",
    type: "dataset",
    category: "Datasets",
    owner: "Health Systems Desk",
    source: "Health Systems Desk",
    updatedDate: "2024-11-20",
    format: "CSV",
    status: "mocked",
    description: "Static capacity register for hospitals used in demo prioritization."
  },
  {
    id: "resource-warehouse-inventory",
    title: "Warehouse Inventory Baseline",
    type: "dataset",
    category: "Datasets",
    owner: "Logistics Desk",
    source: "Logistics Operations Desk",
    updatedDate: "2024-11-19",
    format: "XLSX",
    status: "mocked",
    description: "Mock inventory baseline for warehousing and supply allocation demos."
  },
  {
    id: "resource-carbon-methodology",
    title: "Carbon Impact Estimation Methodology",
    type: "research-paper",
    category: "Carbon References",
    owner: "Environment Sentinel",
    source: "Climate Logistics Lab",
    updatedDate: "2024-09-30",
    format: "PDF",
    status: "static",
    description: "Methodology note for future carbon impact calculations."
  },
  {
    id: "resource-trade-flow-study",
    title: "Eastern India Trade Flow Study",
    type: "research-paper",
    category: "Trade Documents",
    owner: "Trade Sentinel Team",
    source: "Trade Resilience Institute",
    updatedDate: "2024-08-18",
    format: "PDF",
    status: "static",
    description: "Reference study for future freight and trade flow assumptions."
  },
  {
    id: "resource-road-closure-protocol",
    title: "Road Closure Coordination Protocol",
    type: "government-guideline",
    category: "Policies",
    owner: "Transport Coordination Cell",
    source: "Transport Coordination Cell",
    updatedDate: "2024-10-05",
    format: "PDF",
    status: "ready",
    description: "Policy reference for coordinated route closure and reopening."
  },
  {
    id: "resource-medical-triage",
    title: "Emergency Medical Triage Guide",
    type: "document",
    category: "Emergency Guidelines",
    owner: "Public Health Response Unit",
    source: "Public Health Response Unit",
    updatedDate: "2024-09-12",
    format: "PDF",
    status: "ready",
    description: "Medical triage reference for emergency response teams."
  },
  {
    id: "resource-evacuation-zones",
    title: "Evacuation Zone Reference",
    type: "map",
    category: "Maps",
    owner: "District Planning Office",
    source: "District Planning Office",
    updatedDate: "2024-11-02",
    format: "GeoJSON",
    status: "static",
    description: "Static evacuation zone reference for future map overlays."
  },
  {
    id: "resource-flood-depth-reference",
    title: "Flood Depth Reference Layers",
    type: "dataset",
    category: "Maps",
    owner: "Hydrology Desk",
    source: "Hydrology Desk",
    updatedDate: "2024-10-28",
    format: "GeoTIFF",
    status: "static",
    description: "Reference flood-depth layers for future impact modeling."
  },
  {
    id: "resource-power-restoration",
    title: "Power Restoration Priority Guide",
    type: "government-guideline",
    category: "Policies",
    owner: "Infrastructure Response Cell",
    source: "Infrastructure Response Cell",
    updatedDate: "2024-09-20",
    format: "PDF",
    status: "ready",
    description: "Priority guide for power restoration during disruptions."
  },
  {
    id: "resource-public-alert-template",
    title: "Public Alert Message Templates",
    type: "document",
    category: "Policies",
    owner: "Communications Desk",
    source: "Communications Desk",
    updatedDate: "2024-10-11",
    format: "DOCX",
    status: "ready",
    description: "Message templates for public warnings and response advisories."
  },
  {
    id: "resource-shelter-capacity",
    title: "Shelter Capacity Dataset",
    type: "dataset",
    category: "Datasets",
    owner: "Relief Operations Desk",
    source: "Relief Operations Desk",
    updatedDate: "2024-11-17",
    format: "CSV",
    status: "mocked",
    description: "Static shelter capacity records for relief coverage planning."
  },
  {
    id: "resource-port-disruption-playbook",
    title: "Port Disruption Playbook",
    type: "document",
    category: "Trade Documents",
    owner: "Port Resilience Cell",
    source: "Port Resilience Cell",
    updatedDate: "2024-10-27",
    format: "PDF",
    status: "ready",
    description: "Playbook for managing disruption at coastal port nodes."
  },
  {
    id: "resource-logistics-mutual-aid",
    title: "Logistics Mutual Aid Directory",
    type: "dataset",
    category: "Trade Documents",
    owner: "Supply Chain Coordination Desk",
    source: "Supply Chain Coordination Desk",
    updatedDate: "2024-11-12",
    format: "XLSX",
    status: "mocked",
    description: "Mock directory of logistics support partners and mutual aid resources."
  },
  {
    id: "resource-cyclone-impact-literature",
    title: "Cyclone Impact Literature Pack",
    type: "research-paper",
    category: "Reports",
    owner: "Resilience Research Library",
    source: "Resilience Research Library",
    updatedDate: "2024-08-05",
    format: "ZIP",
    status: "static",
    description: "Reference literature pack for cyclone impact assumptions."
  }
];

export const resourceCategories: ResourceCategory[] = [
  { id: "category-datasets", name: "Datasets", description: "Structured files powering mock nodes, routes and capacity views.", status: "mocked" },
  { id: "category-maps", name: "Maps", description: "Geospatial references for districts, evacuation zones and layers.", status: "static" },
  { id: "category-reports", name: "Reports", description: "Research and impact documents for planning context.", status: "ready" },
  { id: "category-policies", name: "Policies", description: "Governance and coordination references.", status: "ready" },
  { id: "category-guidelines", name: "Emergency Guidelines", description: "Preparedness and response procedures.", status: "ready" },
  { id: "category-trade-documents", name: "Trade Documents", description: "Port, freight and trade resilience materials.", status: "mocked" },
  { id: "category-carbon", name: "Carbon References", description: "Carbon factor and methodology references.", status: "static" },
  { id: "category-simulation-assets", name: "Simulation Assets", description: "Scenario triggers and routing inputs for MVP demos.", status: "mocked" }
];

export const storageOverview: StorageOverview = {
  storageUsed: "4.8 GB",
  totalCapacity: "20 GB",
  datasetCount: 9,
  documentCount: 7,
  mapLayers: 4,
  lastSync: "28 Nov 2024, 11:42 AM"
};

export const recentResourceUpdates: ResourceUpdate[] = [
  { id: "update-nodes", title: "Odisha corridor nodes updated", description: "Node dataset refreshed for the MVP demo pack.", timestamp: "11:42 AM", status: "success" },
  { id: "update-scenarios", title: "Scenario configuration revised", description: "Cyclone, port shutdown and highway blockage triggers updated.", timestamp: "10:55 AM", status: "info" },
  { id: "update-trade-feed", title: "Trade Sentinel mock feed added", description: "Port congestion mock feed linked to resources library.", timestamp: "10:20 AM", status: "success" },
  { id: "update-carbon", title: "Carbon reference table updated", description: "Static emission factor reference added for future impact modeling.", timestamp: "09:50 AM", status: "warning" },
  { id: "update-guideline", title: "Emergency guideline linked", description: "Cyclone preparedness guideline associated with the MVP data pack.", timestamp: "09:10 AM", status: "info" }
];

export const dataSourceHealth: DataSourceHealthItem[] = [
  { id: "source-weather", source: "Weather Feed", status: "mocked" },
  { id: "source-traffic", source: "Traffic Feed", status: "planned" },
  { id: "source-port", source: "Port Feed", status: "mocked" },
  { id: "source-railway", source: "Railway Feed", status: "planned" },
  { id: "source-hospital", source: "Hospital Feed", status: "mocked" },
  { id: "source-carbon", source: "Carbon Dataset", status: "static" }
];

export const mvpDataPackItems: MvpDataPackItem[] = [
  { id: "pack-nodes", label: "Nodes", value: "15-20" },
  { id: "pack-routes", label: "Routes", value: "20+" },
  { id: "pack-scenarios", label: "Scenarios", value: "4" },
  { id: "pack-agents", label: "AI Agents", value: "8" },
  { id: "pack-impact", label: "Impact Metrics", value: "Ready" },
  { id: "pack-resources", label: "Resources", value: "20+" },
  { id: "pack-reports", label: "Reports", value: "20+" }
];

export const futureResourcePipeline: FutureResourceIntegration[] = [
  { id: "pipeline-weather", name: "Real weather APIs", description: "Cyclone and rainfall feeds for live monitoring.", status: "planned" },
  { id: "pipeline-traffic", name: "Traffic APIs", description: "Road congestion and blockage signals.", status: "planned" },
  { id: "pipeline-port", name: "Port APIs", description: "Berth, yard and cargo movement integrations.", status: "planned" },
  { id: "pipeline-railway", name: "Railway APIs", description: "Rail freight capacity and disruption data.", status: "planned" },
  { id: "pipeline-satellite", name: "Satellite feeds", description: "Remote sensing layers for floods and damage.", status: "planned" },
  { id: "pipeline-logistics", name: "Logistics provider feeds", description: "Shipment and fleet status integrations.", status: "planned" },
  { id: "pipeline-government", name: "Government disaster datasets", description: "Authoritative hazard, relief and district data.", status: "planned" },
  { id: "pipeline-carbon", name: "Carbon emissions databases", description: "Validated emissions factors and assumptions.", status: "planned" }
];
