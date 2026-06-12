import type { AegisAlert } from "@/types";

export const alerts: AegisAlert[] = [
  {
    id: "alert-cyclone-warning",
    title: "Cyclone Warning",
    severity: "critical",
    timestamp: "2024-11-28T11:15:00+05:30",
    description:
      "Coastal wind bands expected to intensify near Paradip and Kendrapara within the next operating window.",
    affectedArea: "Jagatsinghpur, Kendrapara, Puri"
  },
  {
    id: "alert-port-congestion",
    title: "Port Congestion",
    severity: "warning",
    timestamp: "2024-11-28T10:40:00+05:30",
    description:
      "Paradip Port yard utilization is elevated as outbound cargo movement slows.",
    affectedArea: "Paradip Port"
  },
  {
    id: "alert-road-blockage",
    title: "Road Blockage",
    severity: "danger",
    timestamp: "2024-11-28T09:55:00+05:30",
    description:
      "Waterlogging reported on a Puri approach segment; relief traffic should use approved alternates.",
    affectedArea: "Puri Corridor"
  },
  {
    id: "alert-supply-delay",
    title: "Supply Delay",
    severity: "warning",
    timestamp: "2024-11-28T09:20:00+05:30",
    description:
      "Medical supply dispatches to coastal relief centers are delayed due to staging congestion.",
    affectedArea: "Bhubaneswar, Cuttack, Puri"
  }
];
