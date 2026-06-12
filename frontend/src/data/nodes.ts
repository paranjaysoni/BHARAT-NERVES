import type { AegisNode } from "@/types";

export const nodes: AegisNode[] = [
  {
    id: "node-paradip-port",
    name: "Paradip Port",
    type: "port",
    lat: 20.3166,
    lng: 86.6114,
    status: "watch",
    district: "Jagatsinghpur"
  },
  {
    id: "node-dhamra-port",
    name: "Dhamra Port",
    type: "port",
    lat: 20.7901,
    lng: 86.9496,
    status: "operational",
    district: "Bhadrak"
  },
  {
    id: "node-bhubaneswar-warehouse",
    name: "Bhubaneswar Warehouse",
    type: "warehouse",
    lat: 20.2961,
    lng: 85.8245,
    status: "operational",
    district: "Khordha"
  },
  {
    id: "node-cuttack-warehouse",
    name: "Cuttack Warehouse",
    type: "warehouse",
    lat: 20.4625,
    lng: 85.883,
    status: "stressed",
    district: "Cuttack"
  },
  {
    id: "node-aiims-bhubaneswar",
    name: "AIIMS Bhubaneswar",
    type: "hospital",
    lat: 20.2304,
    lng: 85.7752,
    status: "operational",
    district: "Khordha"
  },
  {
    id: "node-scb-medical-college",
    name: "SCB Medical College",
    type: "hospital",
    lat: 20.4737,
    lng: 85.8891,
    status: "watch",
    district: "Cuttack"
  },
  {
    id: "node-relief-alpha",
    name: "Relief Center Alpha",
    type: "relief-center",
    lat: 20.8457,
    lng: 86.3377,
    status: "operational",
    district: "Kendrapara"
  },
  {
    id: "node-relief-bravo",
    name: "Relief Center Bravo",
    type: "relief-center",
    lat: 19.8135,
    lng: 85.8312,
    status: "watch",
    district: "Puri"
  },
  {
    id: "node-balasore-hub",
    name: "Balasore Hub",
    type: "district-hub",
    lat: 21.4934,
    lng: 86.9135,
    status: "operational",
    district: "Balasore"
  },
  {
    id: "node-puri-hub",
    name: "Puri Hub",
    type: "district-hub",
    lat: 19.8135,
    lng: 85.8312,
    status: "stressed",
    district: "Puri"
  },
  {
    id: "node-bhadrak-hub",
    name: "Bhadrak Hub",
    type: "district-hub",
    lat: 21.0583,
    lng: 86.4958,
    status: "watch",
    district: "Bhadrak"
  },
  {
    id: "node-kendrapara-hub",
    name: "Kendrapara Hub",
    type: "district-hub",
    lat: 20.5007,
    lng: 86.4225,
    status: "watch",
    district: "Kendrapara"
  },
  {
    id: "node-khurda-road-junction",
    name: "Khurda Road Junction",
    type: "transport-junction",
    lat: 20.1861,
    lng: 85.6225,
    status: "operational",
    district: "Khordha"
  },
  {
    id: "node-jajpur-road-junction",
    name: "Jajpur Road Junction",
    type: "transport-junction",
    lat: 20.8506,
    lng: 86.3373,
    status: "stressed",
    district: "Jajpur"
  },
  {
    id: "node-talcher-power-station",
    name: "Talcher Power Station",
    type: "power-station",
    lat: 20.9517,
    lng: 85.2157,
    status: "operational",
    district: "Angul"
  },
  {
    id: "node-gopalpur-logistics-yard",
    name: "Gopalpur Logistics Yard",
    type: "warehouse",
    lat: 19.2667,
    lng: 84.9167,
    status: "operational",
    district: "Ganjam"
  }
];
