import { MetricCard } from "@/components/shared";
import { Database, Puzzle, Bell, Brain, ShieldCheck, Tag } from "lucide-react";

interface SettingsKpiRowProps {
  connectedSources: number;
  activeIntegrations: number;
  notificationChannels: number;
  aiProviders: number;
  securityStatus: string;
  systemVersion: string;
}

export function SettingsKpiRow({
  connectedSources,
  activeIntegrations,
  notificationChannels,
  aiProviders,
  securityStatus,
  systemVersion
}: SettingsKpiRowProps) {
  return (
    <div className="app-kpi-grid lg:grid-cols-3 xl:grid-cols-6">
      <MetricCard
        title="Connected Sources"
        value={String(connectedSources)}
        subtitle="Live data feeds"
        icon={<Database className="h-4 w-4" />}
        status="neutral"
      />
      <MetricCard
        title="Integrations"
        value={String(activeIntegrations)}
        subtitle="Active connections"
        icon={<Puzzle className="h-4 w-4" />}
        status="neutral"
      />
      <MetricCard
        title="Notifications"
        value={String(notificationChannels)}
        subtitle="Configured channels"
        icon={<Bell className="h-4 w-4" />}
        status="info"
      />
      <MetricCard
        title="AI Providers"
        value={String(aiProviders)}
        subtitle="Configured providers"
        icon={<Brain className="h-4 w-4" />}
        status="info"
      />
      <MetricCard
        title="Security"
        value={securityStatus}
        subtitle="Current mode"
        icon={<ShieldCheck className="h-4 w-4" />}
        status="warning"
      />
      <MetricCard
        title="Version"
        value={systemVersion}
        subtitle="Platform release"
        icon={<Tag className="h-4 w-4" />}
        status="neutral"
      />
    </div>
  );
}
