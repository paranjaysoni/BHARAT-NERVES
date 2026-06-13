import { Anchor, Boxes, ExternalLink, LocateFixed, Minus, Plus, Warehouse } from "lucide-react";
import { SectionCard } from "@/components/shared";

const routes = [
  { d: "M115 250 C170 208 224 184 282 144", status: "high" },
  { d: "M115 250 C144 306 188 342 254 344", status: "high" },
  { d: "M282 144 C348 162 410 208 468 244", status: "low" },
  { d: "M282 144 C292 214 286 280 254 344", status: "high" },
  { d: "M254 344 C338 344 428 318 516 284", status: "medium" },
  { d: "M468 244 C488 260 506 272 516 284", status: "disrupted" },
  { d: "M516 284 C524 342 514 398 490 454", status: "medium" },
  { d: "M254 344 C326 418 402 456 490 454", status: "medium" },
  { d: "M490 454 C432 432 360 402 254 344", status: "low" },
  { d: "M332 382 C392 342 438 310 468 244", status: "disrupted" },
  { d: "M178 398 C210 382 232 364 254 344", status: "high" }
];

const nodes = [
  { label: "Delhi NCR", x: 282, y: 144, type: "warehouse", tone: "success" },
  { label: "Mundra Port", x: 115, y: 250, type: "port", tone: "info" },
  { label: "Mumbai", x: 178, y: 398, type: "port", tone: "info" },
  { label: "JNPT", x: 154, y: 364, type: "port", tone: "success" },
  { label: "Nagpur", x: 254, y: 344, type: "warehouse", tone: "success" },
  { label: "Kolkata Port", x: 516, y: 284, type: "port", tone: "info" },
  { label: "Paradip Port", x: 490, y: 454, type: "port", tone: "info" },
  { label: "Vizag Port", x: 414, y: 406, type: "port", tone: "info" },
  { label: "Chennai Port", x: 332, y: 518, type: "port", tone: "info" },
  { label: "Cochin Port", x: 252, y: 552, type: "port", tone: "success" },
  { label: "Low Flow", x: 468, y: 244, type: "junction", tone: "warning" },
  { label: "Disrupted", x: 410, y: 324, type: "junction", tone: "danger" }
];

const routeClass = {
  disrupted: "stroke-danger",
  high: "stroke-success",
  low: "stroke-warning",
  medium: "stroke-info"
};

const nodeClass = {
  danger: "bg-danger text-danger-foreground ring-danger/35",
  info: "bg-info text-primary-foreground ring-info/35",
  success: "bg-success text-primary-foreground ring-success/35",
  warning: "bg-warning text-primary-foreground ring-warning/35"
};

export function TradeNetworkOverview() {
  return (
    <SectionCard
      title="Trade Flow Map"
      action={
        <div className="hidden items-center gap-3 text-xs text-muted-foreground md:flex">
          <LegendDot label="High Flow" tone="bg-success" />
          <LegendDot label="Medium" tone="bg-info" />
          <LegendDot label="Low" tone="bg-warning" />
          <LegendDot label="Disrupted" tone="bg-danger" />
        </div>
      }
      className="overflow-hidden p-0 lg:p-0"
    >
      <div className="relative min-h-[430px] overflow-hidden border-t border-border/70 bg-slate-950 text-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_72%_58%,rgba(249,115,22,0.13),transparent_30%)]" />
        <div className="absolute inset-0 opacity-[0.17] [background-image:linear-gradient(rgba(96,165,250,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.28)_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="absolute left-4 top-4 z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">
            India Trade Network
          </p>
          <p className="mt-1 max-w-xs text-xs text-slate-300">
            Mock port and corridor intelligence with live-data-ready visual hierarchy.
          </p>
        </div>

        <div className="absolute bottom-4 left-4 z-10 flex overflow-hidden rounded-md border border-slate-600/70 bg-slate-950/70 backdrop-blur">
          <button className="flex h-9 w-9 items-center justify-center border-r border-slate-600/70 text-slate-200" aria-label="Zoom in">
            <Plus className="h-4 w-4" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center border-r border-slate-600/70 text-slate-200" aria-label="Zoom out">
            <Minus className="h-4 w-4" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center text-slate-200" aria-label="Locate network">
            <LocateFixed className="h-4 w-4" />
          </button>
        </div>

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <path
            d="M278 76 L314 88 L338 122 L394 130 L446 170 L500 204 L548 274 L528 340 L508 400 L490 482 L450 538 L392 560 L332 548 L282 574 L242 532 L212 478 L166 430 L126 368 L92 300 L122 238 L146 184 L206 150 Z"
            fill="rgba(14,165,233,0.10)"
            stroke="rgba(56,189,248,0.45)"
            strokeWidth="1.4"
          />
          <path
            d="M308 92 C292 148 302 198 292 248 C282 300 258 344 266 394 C276 448 312 504 334 548"
            stroke="rgba(148,163,184,0.18)"
            strokeWidth="1.2"
          />
          {routes.map((route) => (
            <path
              key={route.d}
              d={route.d}
              className={routeClass[route.status as keyof typeof routeClass]}
              fill="none"
              strokeWidth="3"
              strokeDasharray={route.status === "disrupted" || route.status === "low" ? "9 7" : undefined}
              strokeLinecap="round"
              opacity="0.92"
            />
          ))}
          {routes.map((route) => (
            <path
              key={`${route.d}-glow`}
              d={route.d}
              className={routeClass[route.status as keyof typeof routeClass]}
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.12"
            />
          ))}
        </svg>

        {nodes.map((node) => (
          <div
            key={node.label}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(node.x / 640) * 100}%`, top: `${(node.y / 600) * 100}%` }}
          >
            <div className={`grid h-8 w-8 place-items-center rounded-full shadow-lg ring-4 ${nodeClass[node.tone as keyof typeof nodeClass]}`}>
              {node.type === "port" ? <Anchor className="h-4 w-4" /> : node.type === "warehouse" ? <Warehouse className="h-4 w-4" /> : <span className="h-2.5 w-2.5 rounded-full bg-current" />}
            </div>
            <span className="absolute left-1/2 top-9 whitespace-nowrap rounded bg-slate-950/80 px-1.5 py-0.5 text-[10px] font-semibold text-slate-100 shadow -translate-x-1/2">
              {node.label}
            </span>
          </div>
        ))}

        <div className="absolute bottom-4 right-4 z-10 hidden rounded-md border border-slate-600/70 bg-slate-950/75 p-3 text-xs text-slate-200 backdrop-blur sm:block">
          <div className="grid grid-cols-2 gap-x-5 gap-y-2">
            <MapStat label="Ports" value="07" />
            <MapStat label="Routes" value="18" />
            <MapStat label="Stressed" value="04" />
            <MapStat label="Volume" value="₹12.4 Cr" />
          </div>
        </div>

        <button className="btn btn-secondary absolute bottom-4 left-36 z-10 hidden border-slate-600/70 bg-slate-950/70 text-sky-300 hover:bg-slate-900 md:flex">
          View Full Network
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </SectionCard>
  );
}

function LegendDot({ label, tone }: { label: string; tone: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${tone}`} />
      {label}
    </span>
  );
}

function MapStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.12em] text-slate-400">{label}</p>
      <p className="mt-0.5 font-semibold text-slate-100">{value}</p>
    </div>
  );
}
