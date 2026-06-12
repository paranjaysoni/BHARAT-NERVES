export type ThemePreference = "light" | "dark" | "system";
export type IntegrationStatus = "connected" | "mocked" | "planned";
export type DataSourceStatus = "connected" | "mocked" | "planned";
export type SecurityStatus = "active" | "inactive" | "partial";

export interface PlatformSettings {
  theme: ThemePreference;
  language: string;
  timezone: string;
  notifications: NotificationSettings;
  integrations: Record<string, IntegrationStatus>;
  displayTime: string;
  displayDate: string;
}

export interface NotificationSettings {
  alerts: boolean;
  reports: boolean;
  scenarioUpdates: boolean;
}

export interface NotificationChannel {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export interface DataSourceItem {
  id: string;
  name: string;
  description: string;
  status: DataSourceStatus;
  lastSync: string;
}

export interface IntegrationItem {
  id: string;
  name: string;
  category: string;
  status: IntegrationStatus;
  readiness: string;
  note: string;
}

export interface SecurityItem {
  id: string;
  label: string;
  status: SecurityStatus;
  value: string;
}

export interface PlatformInfo {
  project: string;
  platform: string;
  version: string;
  build: string;
  environment: string;
  region: string;
  releaseDate: string;
}

export interface SystemHealthItem {
  id: string;
  label: string;
  value: string;
  subtitle: string;
  status: "success" | "warning" | "danger" | "info" | "neutral";
}

export interface FutureIntegrationItem {
  id: string;
  name: string;
  description: string;
  status: "planned";
  priority: "high" | "medium" | "low";
}

export interface DevSettingItem {
  id: string;
  label: string;
  value: string;
  enabled: boolean;
}
