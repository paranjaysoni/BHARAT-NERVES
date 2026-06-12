import {
  ActiveAlertsPanel,
  ControlRoomKpis,
  CorridorOverview,
  DigitalTwinOverview,
  QuickActions,
  RecentActivity,
  SystemHealthSummary
} from "@/components/dashboard";
import { PageHeader, StatusBadge } from "@/components/shared";
import { controlRoomPage, selectedCorridor, systemStatus } from "@/data";

export default function ControlRoomPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="National Control Room"
        description={controlRoomPage.description}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge label={systemStatus.status} variant="success" />
            <StatusBadge label={selectedCorridor.name} variant="info" />
          </div>
        }
      />

      <ControlRoomKpis />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(340px,0.8fr)]">
        <DigitalTwinOverview />
        <div className="space-y-6">
          <ActiveAlertsPanel />
          <SystemHealthSummary />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <CorridorOverview />
        <QuickActions />
      </section>

      <RecentActivity />
    </div>
  );
}
