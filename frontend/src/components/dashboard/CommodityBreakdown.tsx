import { Boxes, Droplets, Fuel, Package, Wheat } from "lucide-react";
import { SectionCard } from "@/components/shared";

const commodities = [
  { icon: <Boxes className="h-3.5 w-3.5" />, label: "Steel", tone: "bg-info", value: 28 },
  { icon: <Package className="h-3.5 w-3.5" />, label: "Coal", tone: "bg-sky-400", value: 22 },
  { icon: <Fuel className="h-3.5 w-3.5" />, label: "Petroleum", tone: "bg-success", value: 18 },
  { icon: <Droplets className="h-3.5 w-3.5" />, label: "Fertilizers", tone: "bg-warning", value: 12 },
  { icon: <Wheat className="h-3.5 w-3.5" />, label: "Food Grains", tone: "bg-violet-500", value: 11 },
  { icon: <Boxes className="h-3.5 w-3.5" />, label: "Others", tone: "bg-muted-foreground", value: 9 }
];

export function CommodityBreakdown() {
  return (
    <SectionCard
      title="Commodity Flow"
      action={<span className="type-caption">By Volume</span>}
      className="h-full"
    >
      <div className="space-y-3">
        {commodities.map((commodity) => (
          <div key={commodity.label} className="grid grid-cols-[108px_minmax(0,1fr)_38px] items-center gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-secondary text-primary">
                {commodity.icon}
              </span>
              <span className="truncate text-sm font-medium text-card-foreground">{commodity.label}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div className={`h-full rounded-full ${commodity.tone}`} style={{ width: `${commodity.value * 2.35}%` }} />
            </div>
            <p className="text-right text-sm font-semibold text-card-foreground">{commodity.value}%</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
