import {
  ActiveAlertsPanel,
  ControlRoomAnalyticsRow,
  ControlRoomKpis,
  DigitalTwinOverview
} from "@/components/dashboard";
import { systemStatus } from "@/data";

export default function ControlRoomPage() {
  return (
    <div className="space-y-4 xl:max-h-[calc(100vh-92px)] xl:overflow-hidden">
      <section className="grid gap-4 xl:grid-cols-[minmax(0,2.35fr)_minmax(340px,0.92fr)]">
        <DigitalTwinOverview />
        <aside className="grid gap-4 xl:grid-rows-[auto_minmax(0,1fr)]">
          <ControlRoomKpis />
          <ActiveAlertsPanel />
        </aside>
      </section>

      <ControlRoomAnalyticsRow />

      <footer className="flex flex-wrap items-center justify-between gap-3 px-1 text-xs text-muted-foreground">
        <span>Project Aegis v1.0.0</span>
        <span>Building a Resilient Bharat</span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-success" />
          All Systems {systemStatus.status}
        </span>
      </footer>
    </div>
  );
}
