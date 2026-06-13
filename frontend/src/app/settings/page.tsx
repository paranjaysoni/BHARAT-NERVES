"use client";

import {
  AIConfiguration,
  AppearanceSettings,
  DataSourceSettings,
  DevelopmentSettings,
  FutureIntegrations,
  IntegrationSettings,
  NotificationSettings,
  PlatformInformation,
  SecurityOverview,
  SettingsKpiRow,
  SystemHealth
} from "@/components/settings";
import { PageHeader, StatusBadge } from "@/components/shared";
import {
  aiConfiguration,
  dataSources,
  devSettings,
  futureIntegrations,
  integrations,
  notificationChannels,
  platformInfo,
  securityItems,
  settingsKpis,
  systemHealth
} from "@/data";

export default function SettingsPage() {
  return (
    <div className="app-page-stack">
      <PageHeader
        title="Settings"
        description="Platform administration and configuration center for Project Aegis — Bharat Nerves Platform."
        actions={<StatusBadge label="Configuration Center" variant="info" />}
      />

      <SettingsKpiRow
        connectedSources={settingsKpis.connectedSources}
        activeIntegrations={settingsKpis.activeIntegrations}
        notificationChannels={settingsKpis.notificationChannels}
        aiProviders={settingsKpis.aiProviders}
        securityStatus={settingsKpis.securityStatus}
        systemVersion={settingsKpis.systemVersion}
      />

      <div className="app-section-grid xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="app-column-stack">
          <AppearanceSettings />
          <NotificationSettings channels={notificationChannels} />
          <DataSourceSettings sources={dataSources} />
          <IntegrationSettings integrations={integrations} />
        </div>

        <aside className="app-column-stack">
          <AIConfiguration
            primaryModel={aiConfiguration.primaryModel}
            backupModel={aiConfiguration.backupModel}
            agentCount={aiConfiguration.agentCount}
            responseFormat={aiConfiguration.responseFormat}
            aiStatus={aiConfiguration.aiStatus}
            note={aiConfiguration.note}
          />
          <SecurityOverview items={securityItems} />
          <PlatformInformation info={platformInfo} />
          <SystemHealth items={systemHealth} />
        </aside>
      </div>

      <FutureIntegrations items={futureIntegrations} />

      <DevelopmentSettings items={devSettings} />
    </div>
  );
}
