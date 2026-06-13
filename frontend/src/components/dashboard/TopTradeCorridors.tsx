import { ArrowRight, ExternalLink } from "lucide-react";
import { SectionCard } from "@/components/shared";

const corridors = [
  { flow: "High Flow", name: "Delhi NCR", score: 92, status: "success", target: "Mumbai", via: "Via Nagpur" },
  { flow: "Medium Flow", name: "Kolkata", score: 74, status: "info", target: "Delhi NCR", via: "Via Patna, Kanpur" },
  { flow: "Medium Flow", name: "Chennai", score: 68, status: "info", target: "Northern Corridor", via: "Via Bengaluru, Nagpur" },
  { flow: "Low Flow", name: "Paradip", score: 52, status: "warning", target: "Delhi NCR", via: "Via Ranchi, Kanpur" },
  { flow: "Disrupted", name: "Vizag", score: 28, status: "danger", target: "Mumbai", via: "Via Hyderabad, Pune" }
];

const statusClass = {
  danger: "text-danger",
  info: "text-info",
  success: "text-success",
  warning: "text-warning"
};

const ringClass = {
  danger: "from-danger to-danger/15",
  info: "from-info to-info/15",
  success: "from-success to-success/15",
  warning: "from-warning to-warning/15"
};

export function TopTradeCorridors() {
  return (
    <SectionCard
      title="Top Trade Corridors"
      action={<span className="text-xs font-medium text-primary">Live Status</span>}
      className="h-full"
    >
      <div className="divide-y divide-border/70">
        {corridors.map((corridor, index) => (
          <div key={`${corridor.name}-${corridor.target}`} className="grid grid-cols-[24px_minmax(0,1fr)_76px_48px] items-center gap-3 py-3 first:pt-0 last:pb-0">
            <p className="text-sm font-semibold text-muted-foreground">{index + 1}</p>
            <div className="min-w-0">
              <p className="flex min-w-0 items-center gap-1.5 text-sm font-semibold text-card-foreground">
                <span className="truncate">{corridor.name}</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span className="truncate">{corridor.target}</span>
              </p>
              <p className="mt-1 truncate text-xs text-muted-foreground">{corridor.via}</p>
            </div>
            <p className={`text-right text-xs font-semibold ${statusClass[corridor.status as keyof typeof statusClass]}`}>
              {corridor.flow}
            </p>
            <div className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${ringClass[corridor.status as keyof typeof ringClass]} p-0.5`}>
              <div className="grid h-full w-full place-items-center rounded-full bg-card text-sm font-semibold text-card-foreground">
                {corridor.score}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-secondary mt-4 w-full justify-center">
        View All Corridors
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </SectionCard>
  );
}
