import { ExternalLink } from "lucide-react";
import { SectionCard } from "@/components/shared";

const activities = [
  {
    detail: "Steel · 4,200 MT",
    label: "Export consignment cleared",
    time: "11:39 AM",
    tone: "bg-success"
  },
  {
    detail: "Chennai → Delhi NCR · Electronics",
    label: "New shipment dispatched",
    time: "11:28 AM",
    tone: "bg-info"
  },
  {
    detail: "Heavy congestion reported",
    label: "Delay detected on NH-16",
    time: "11:17 AM",
    tone: "bg-warning"
  },
  {
    detail: "Kolkata Port · Machinery",
    label: "Import container arrived",
    time: "11:05 AM",
    tone: "bg-success"
  },
  {
    detail: "Delhi NCR → Mumbai",
    label: "Route optimization completed",
    time: "10:52 AM",
    tone: "bg-info"
  }
];

export function TradeRecentActivity() {
  return (
    <SectionCard title="Recent Activity" className="h-full">
      <div className="relative space-y-3 before:absolute before:left-[72px] before:top-1 before:h-[calc(100%-0.5rem)] before:w-px before:bg-border">
        {activities.map((activity) => (
          <div key={`${activity.time}-${activity.label}`} className="grid grid-cols-[56px_16px_minmax(0,1fr)] gap-3">
            <p className="pt-0.5 text-xs text-muted-foreground">{activity.time}</p>
            <span className={`relative z-10 mt-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-card ${activity.tone}`} />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-card-foreground">{activity.label}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{activity.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-secondary mt-4 w-full justify-center">
        View Full Activity Log
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </SectionCard>
  );
}
