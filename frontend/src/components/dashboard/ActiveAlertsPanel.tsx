import { AlertCard, SectionCard } from "@/components/shared";
import { alerts } from "@/data";

export function ActiveAlertsPanel() {
  return (
    <SectionCard
      title="Active Alerts"
      description="Current mock watchlist for the national control room."
    >
      <div className="app-scroll-region space-y-2.5 pr-1">
        {alerts.slice(0, 4).map((alert) => (
          <AlertCard
            key={alert.id}
            title={alert.title}
            description={alert.description}
            severity={alert.severity}
            timestamp={alert.timestamp}
          />
        ))}
      </div>
    </SectionCard>
  );
}
