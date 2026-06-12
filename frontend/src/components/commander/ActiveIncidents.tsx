import { AlertCard, SectionCard } from "@/components/shared";
import { alerts, tradeAlerts } from "@/data";

export function ActiveIncidents() {
  const incidentAlerts = [...alerts.slice(0, 2), ...tradeAlerts.slice(0, 2)];

  return (
    <SectionCard
      title="Active Incidents"
      description="Current alert context surfaced from Control Room and Trade Sentinel."
    >
      <div className="space-y-3">
        {incidentAlerts.map((alert) => (
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
