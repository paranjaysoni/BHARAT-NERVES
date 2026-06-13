import { ExternalLink } from "lucide-react";
import { SectionCard } from "@/components/shared";

const segments = [
  { label: "Healthy", tone: "bg-success", value: "35%" },
  { label: "Moderate", tone: "bg-warning", value: "35%" },
  { label: "At Risk", tone: "bg-danger", value: "20%" },
  { label: "Critical", tone: "bg-fuchsia-500", value: "10%" }
];

export function SupplyChainHealthPanel() {
  return (
    <SectionCard
      title="Supply Chain Health"
      action={<span className="type-caption">Overall Health</span>}
      className="h-full"
    >
      <div className="flex items-center justify-center gap-5">
        <div className="grid h-32 w-32 shrink-0 place-items-center rounded-full bg-[conic-gradient(hsl(var(--success))_0_35%,hsl(var(--warning))_35%_70%,hsl(var(--danger))_70%_90%,rgb(217_70_239)_90%_100%)] p-3 shadow-[0_0_34px_rgb(59_130_246/0.14)]">
          <div className="grid h-full w-full place-items-center rounded-full bg-card text-center">
            <div>
              <p className="text-3xl font-semibold leading-none text-warning">65</p>
              <p className="mt-1 text-xs font-semibold text-warning">Moderate</p>
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          {segments.map((segment) => (
            <div key={segment.label} className="flex items-center justify-between gap-3">
              <span className="flex min-w-0 items-center gap-2 text-sm text-card-foreground">
                <span className={`h-2.5 w-2.5 rounded-full ${segment.tone}`} />
                <span className="truncate">{segment.label}</span>
              </span>
              <span className="text-sm font-semibold text-card-foreground">{segment.value}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="btn btn-secondary mt-4 w-full justify-center">
        View Detailed Analysis
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </SectionCard>
  );
}
