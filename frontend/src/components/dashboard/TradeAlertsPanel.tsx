import { AlertCard, SectionCard } from "@/components/shared";
import { tradeAlerts } from "@/data";

export function TradeAlertsPanel() {
  return (
    <SectionCard
      title="Active Trade Alerts"
      description="Mock trade intelligence alerts for corridor monitoring."
    >
      <div className="space-y-3">
        {tradeAlerts.map((alert) => (
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
