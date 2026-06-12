import type { AegisRoute } from "@/types";

export const routes: AegisRoute[] = [
  {
    id: "route-paradip-cuttack",
    source: "node-paradip-port",
    destination: "node-cuttack-warehouse",
    distance: "88 km",
    estimatedTime: "2h 15m",
    status: "congested"
  },
  {
    id: "route-cuttack-bhubaneswar",
    source: "node-cuttack-warehouse",
    destination: "node-bhubaneswar-warehouse",
    distance: "28 km",
    estimatedTime: "55m",
    status: "clear"
  },
  {
    id: "route-bhubaneswar-aiims",
    source: "node-bhubaneswar-warehouse",
    destination: "node-aiims-bhubaneswar",
    distance: "14 km",
    estimatedTime: "35m",
    status: "clear"
  },
  {
    id: "route-cuttack-scb",
    source: "node-cuttack-warehouse",
    destination: "node-scb-medical-college",
    distance: "6 km",
    estimatedTime: "18m",
    status: "watch"
  },
  {
    id: "route-paradip-kendrapara",
    source: "node-paradip-port",
    destination: "node-kendrapara-hub",
    distance: "64 km",
    estimatedTime: "1h 45m",
    status: "watch"
  },
  {
    id: "route-kendrapara-relief-alpha",
    source: "node-kendrapara-hub",
    destination: "node-relief-alpha",
    distance: "42 km",
    estimatedTime: "1h 20m",
    status: "rerouted"
  },
  {
    id: "route-puri-relief-bravo",
    source: "node-puri-hub",
    destination: "node-relief-bravo",
    distance: "5 km",
    estimatedTime: "15m",
    status: "clear"
  },
  {
    id: "route-bhubaneswar-puri",
    source: "node-bhubaneswar-warehouse",
    destination: "node-puri-hub",
    distance: "61 km",
    estimatedTime: "1h 35m",
    status: "congested"
  },
  {
    id: "route-balasore-bhadrak",
    source: "node-balasore-hub",
    destination: "node-bhadrak-hub",
    distance: "72 km",
    estimatedTime: "1h 50m",
    status: "watch"
  },
  {
    id: "route-bhadrak-dhamra",
    source: "node-bhadrak-hub",
    destination: "node-dhamra-port",
    distance: "63 km",
    estimatedTime: "1h 40m",
    status: "clear"
  },
  {
    id: "route-dhamra-paradip",
    source: "node-dhamra-port",
    destination: "node-paradip-port",
    distance: "148 km",
    estimatedTime: "3h 45m",
    status: "watch"
  },
  {
    id: "route-jajpur-cuttack",
    source: "node-jajpur-road-junction",
    destination: "node-cuttack-warehouse",
    distance: "73 km",
    estimatedTime: "1h 55m",
    status: "congested"
  },
  {
    id: "route-talcher-cuttack",
    source: "node-talcher-power-station",
    destination: "node-cuttack-warehouse",
    distance: "126 km",
    estimatedTime: "3h 10m",
    status: "clear"
  },
  {
    id: "route-khurda-bhubaneswar",
    source: "node-khurda-road-junction",
    destination: "node-bhubaneswar-warehouse",
    distance: "27 km",
    estimatedTime: "45m",
    status: "clear"
  },
  {
    id: "route-khurda-puri",
    source: "node-khurda-road-junction",
    destination: "node-puri-hub",
    distance: "45 km",
    estimatedTime: "1h 15m",
    status: "watch"
  },
  {
    id: "route-gopalpur-bhubaneswar",
    source: "node-gopalpur-logistics-yard",
    destination: "node-bhubaneswar-warehouse",
    distance: "170 km",
    estimatedTime: "4h 20m",
    status: "clear"
  },
  {
    id: "route-gopalpur-puri",
    source: "node-gopalpur-logistics-yard",
    destination: "node-puri-hub",
    distance: "141 km",
    estimatedTime: "3h 35m",
    status: "rerouted"
  },
  {
    id: "route-balasore-dhamra",
    source: "node-balasore-hub",
    destination: "node-dhamra-port",
    distance: "96 km",
    estimatedTime: "2h 30m",
    status: "clear"
  }
];
