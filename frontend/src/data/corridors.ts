import type { Corridor } from "@/types";

export const corridors: Corridor[] = [
  {
    id: "corridor-odisha-cyclone",
    name: "Odisha Cyclone Corridor",
    region: "Eastern India",
    status: "watch",
    primaryRisk: "Cyclone and coastal flooding",
    activeNodes: 16
  },
  {
    id: "corridor-western-freight",
    name: "Western Freight Corridor",
    region: "Western India",
    status: "operational",
    primaryRisk: "Heat and freight congestion",
    activeNodes: 41
  },
  {
    id: "corridor-ganga-relief",
    name: "Ganga Relief Corridor",
    region: "Northern India",
    status: "operational",
    primaryRisk: "Floodplain disruption",
    activeNodes: 33
  }
];

export const selectedCorridor = corridors[0];
