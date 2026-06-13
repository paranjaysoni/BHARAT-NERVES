import {
  Anchor,
  Building2,
  Cross,
  Home,
  MapPin,
  Plane,
  Warehouse
} from "lucide-react";
import type { ReactNode } from "react";
import clsx from "clsx";
import { nodes, routes } from "@/data";
import type { AegisNodeStatus, AegisNodeType, AegisRouteStatus } from "@/types";

type NodePoint = {
  id: string;
  x: number;
  y: number;
  label?: string;
};

const nodePoints: NodePoint[] = [
  { id: "node-balasore-hub", x: 66, y: 24, label: "Balasore" },
  { id: "node-bhadrak-hub", x: 70, y: 34, label: "Bhadrak" },
  { id: "node-dhamra-port", x: 78, y: 31, label: "Dhamra" },
  { id: "node-kendrapara-hub", x: 73, y: 45, label: "Kendrapara" },
  { id: "node-relief-alpha", x: 80, y: 45 },
  { id: "node-paradip-port", x: 76, y: 58, label: "Paradip" },
  { id: "node-jajpur-road-junction", x: 58, y: 43 },
  { id: "node-cuttack-warehouse", x: 60, y: 55, label: "Cuttack" },
  { id: "node-scb-medical-college", x: 64, y: 53 },
  { id: "node-bhubaneswar-warehouse", x: 53, y: 66, label: "Bhubaneswar" },
  { id: "node-aiims-bhubaneswar", x: 49, y: 69 },
  { id: "node-khurda-road-junction", x: 44, y: 71 },
  { id: "node-puri-hub", x: 61, y: 82, label: "Puri" },
  { id: "node-relief-bravo", x: 68, y: 84 },
  { id: "node-talcher-power-station", x: 36, y: 46, label: "Talcher" },
  { id: "node-gopalpur-logistics-yard", x: 38, y: 91, label: "Gopalpur" }
];

const pointById = new Map(nodePoints.map((point) => [point.id, point]));

const statusTone: Record<AegisNodeStatus, string> = {
  disrupted: "border-danger bg-danger text-white",
  operational: "border-success bg-success text-white",
  stressed: "border-warning bg-warning text-slate-950",
  watch: "border-info bg-info text-slate-950"
};

const routeStroke: Record<AegisRouteStatus, string> = {
  blocked: "stroke-danger",
  clear: "stroke-success",
  congested: "stroke-warning",
  rerouted: "stroke-info",
  watch: "stroke-warning"
};

const iconByType: Record<AegisNodeType, typeof MapPin> = {
  "district-hub": Building2,
  hospital: Cross,
  port: Anchor,
  "power-station": MapPin,
  "relief-center": Home,
  "transport-junction": Plane,
  warehouse: Warehouse
};

export function DigitalTwinOverview() {
  return (
    <section className="surface-card relative overflow-hidden rounded-md p-4 text-card-foreground">
      <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold uppercase tracking-wide text-foreground">
            India Digital Twin
          </h2>
          <p className="type-body mt-0.5">Live Network Overview</p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <LegendDot className="bg-success" label="Operational" />
          <LegendDot className="bg-warning" label="At Risk" />
          <LegendDot className="bg-danger" label="Disrupted" />
          <LegendDot className="bg-muted-foreground" label="Unknown" />
        </div>
      </div>

      <div className="relative min-h-[520px] overflow-hidden rounded-md border border-border bg-slate-950 shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_45%,rgba(29,78,216,0.30),transparent_18rem),radial-gradient(circle_at_70%_40%,rgba(20,184,166,0.12),transparent_14rem),linear-gradient(135deg,rgba(2,6,23,0.94),rgba(15,23,42,0.88))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.08)_1px,transparent_1px)] bg-[size:38px_38px]" />
        <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_18%_30%,rgba(245,158,11,0.7)_0_1px,transparent_1px),radial-gradient(circle_at_42%_52%,rgba(245,158,11,0.6)_0_1px,transparent_1px),radial-gradient(circle_at_67%_36%,rgba(245,158,11,0.55)_0_1px,transparent_1px),radial-gradient(circle_at_73%_68%,rgba(245,158,11,0.45)_0_1px,transparent_1px)]" />

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          role="img"
          aria-label="India digital twin command map with operational nodes and logistics routes"
        >
          <path
            d="M36 6 L49 8 L60 13 L69 23 L73 37 L70 49 L78 60 L69 70 L63 87 L51 96 L43 85 L36 78 L30 64 L20 48 L24 31 Z"
            className="fill-primary/10 stroke-primary/45"
            strokeWidth="0.7"
          />
          <path
            d="M55 20 L73 29 L84 44 L81 60 L67 86 L54 70 L51 49 Z"
            className="fill-info/10 stroke-info/50"
            strokeWidth="0.75"
          />
          <path
            d="M14 62 C28 79 52 88 85 68"
            className="fill-none stroke-primary/50"
            strokeDasharray="1.5 2.5"
            strokeWidth="0.55"
          />
          <path
            d="M16 70 C39 93 63 96 92 74"
            className="fill-none stroke-primary/35"
            strokeDasharray="1.5 2.5"
            strokeWidth="0.5"
          />
          {routes.map((route) => {
            const source = pointById.get(route.source);
            const destination = pointById.get(route.destination);
            if (!source || !destination) return null;

            return (
              <line
                key={route.id}
                x1={source.x}
                y1={source.y}
                x2={destination.x}
                y2={destination.y}
                className={clsx("opacity-90", routeStroke[route.status])}
                strokeWidth={route.status === "clear" ? 0.6 : 0.9}
                strokeDasharray={route.status === "rerouted" || route.status === "watch" ? "2 2" : undefined}
              />
            );
          })}
        </svg>

        <div className="absolute left-5 top-5 flex flex-col gap-2 rounded-md border border-white/10 bg-slate-950/70 p-2 shadow-lg backdrop-blur">
          <button type="button" className="flex h-8 w-8 items-center justify-center rounded border border-white/10 text-lg text-white/80">
            +
          </button>
          <button type="button" className="flex h-8 w-8 items-center justify-center rounded border border-white/10 text-lg text-white/80">
            -
          </button>
          <button type="button" className="flex h-8 w-8 items-center justify-center rounded border border-white/10 text-white/80">
            ⊙
          </button>
        </div>

        {nodes.map((node) => {
          const point = pointById.get(node.id);
          if (!point) return null;
          const Icon = iconByType[node.type];
          const isRisk = node.status === "watch" || node.status === "stressed";

          return (
            <div
              key={node.id}
              className="absolute"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              {isRisk ? (
                <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-warning/30" />
              ) : null}
              <span
                className={clsx(
                  "relative flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 shadow-lg",
                  statusTone[node.status]
                )}
                title={`${node.name} · ${node.status}`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              {point.label ? (
                <span className="absolute left-3 top-2 whitespace-nowrap rounded bg-slate-950/75 px-1.5 py-0.5 text-[0.65rem] font-medium text-white shadow-sm">
                  {point.label}
                </span>
              ) : null}
            </div>
          );
        })}

        <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 rounded-md border border-white/10 bg-slate-950/75 px-4 py-2 text-xs text-white/85 shadow-lg backdrop-blur">
          <LegendIcon icon={<Anchor className="h-4 w-4" />} label="Port" />
          <LegendIcon icon={<Warehouse className="h-4 w-4" />} label="Warehouse" />
          <LegendIcon icon={<Plane className="h-4 w-4" />} label="Junction" />
          <LegendIcon icon={<Cross className="h-4 w-4" />} label="Relief Center" />
          <LegendIcon icon={<Building2 className="h-4 w-4" />} label="District Hub" />
        </div>
      </div>
    </section>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${className}`} />
      {label}
    </span>
  );
}

function LegendIcon({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="text-primary">{icon}</span>
      {label}
    </span>
  );
}
