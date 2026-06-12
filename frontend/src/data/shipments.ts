import type { Shipment } from "@/types";

export const shipments: Shipment[] = [
  {
    id: "SHP-OD-1048",
    origin: "Paradip Port",
    destination: "Bhubaneswar Warehouse",
    priority: "critical",
    delay: "+12 hrs",
    status: "delayed"
  },
  {
    id: "SHP-OD-1052",
    origin: "Dhamra Port",
    destination: "Cuttack Warehouse",
    priority: "high",
    delay: "+5 hrs",
    status: "at-risk"
  },
  {
    id: "SHP-OD-1061",
    origin: "Kolkata Port",
    destination: "Balasore Hub",
    priority: "medium",
    delay: "+2 hrs",
    status: "rerouted"
  },
  {
    id: "SHP-OD-1067",
    origin: "Visakhapatnam Port",
    destination: "Gopalpur Logistics Yard",
    priority: "low",
    delay: "0 hrs",
    status: "on-time"
  },
  {
    id: "SHP-OD-1074",
    origin: "Chennai Port",
    destination: "AIIMS Bhubaneswar",
    priority: "critical",
    delay: "+9 hrs",
    status: "delayed"
  }
];
