import type { ReactNode } from "react";
import {
  Activity,
  Bell,
  ChevronDown,
  ChevronRight,
  Clock3,
  Database,
  Download,
  FileText,
  Gauge,
  Globe2,
  KeyRound,
  LockKeyhole,
  Mail,
  MapPin,
  MonitorCog,
  PenLine,
  RadioTower,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  Wrench
} from "lucide-react";
import clsx from "clsx";
import { PageHeader } from "@/components/shared";

const profileFields = [
  ["Full Name", "Amit Sharma"],
  ["Email Address", "amit.sharma@bharatnerves.gov.in"],
  ["Role", "National Security Analyst"],
  ["Organization", "Bharat Nerves Platform"],
  ["Timezone", "Asia/Kolkata (IST)", "select"]
] as const;

const notifications = [
  ["Critical Alerts", "High priority system alerts and threats", true, "danger"],
  ["Risk Updates", "Risk score changes and assessments", true, "warning"],
  ["Report Notifications", "New reports and briefing updates", true, "success"],
  ["System Updates", "Platform updates and maintenance", false, "info"],
  ["Email Digest", "Daily summary of key activities", true, "purple"]
] as const;

const securityItems = [
  ["Password", "********", LockKeyhole, "default"],
  ["Two-Factor Authentication", "Enabled", ShieldCheck, "success"],
  ["Session Management", "3 active sessions", MonitorCog, "info"],
  ["Login Activity", "View recent activity", Activity, "info"],
  ["API Access Tokens", "2 active tokens", KeyRound, "info"]
] as const;

const platformPreferences = [
  ["Default Dashboard", "Select your default landing page", "Control Room", MonitorCog],
  ["Theme", "Choose your preferred theme", "Dark", Gauge],
  ["Data Refresh Rate", "Auto-refresh interval for live data", "5 minutes", RadioTower],
  ["Language", "Select your preferred language", "English", Globe2],
  ["Time Format", "Choose your time display format", "12 Hour (AM/PM)", Clock3]
] as const;

const privacyItems = [
  ["Data Sharing", "Control data sharing preferences", Database, "info"],
  ["Privacy Settings", "Manage your privacy preferences", LockKeyhole, "info"],
  ["Data Retention", "Configure data retention policies", Trash2, "info"],
  ["Export My Data", "Download your data and reports", Download, "info"],
  ["Delete Account", "Permanently delete your account", Trash2, "danger"]
] as const;

const systemItems = [
  ["Alert Thresholds", "Configure alert thresholds", SlidersHorizontal],
  ["Geographic Settings", "Manage map and location preferences", MapPin],
  ["Integration Settings", "Manage third-party integrations", RadioTower],
  ["Performance Settings", "Configure system performance", Gauge],
  ["Maintenance Window", "Schedule maintenance notifications", Wrench]
] as const;

const aboutLinks = [
  ["Documentation", FileText],
  ["Support", MapPin],
  ["Privacy Policy", LockKeyhole],
  ["Terms of Service", Download]
] as const;

const panelClass = "surface-card rounded-md p-4 text-card-foreground lg:p-5";

export default function SettingsPage() {
  return (
    <div className="space-y-3.5">
      <PageHeader
        title="SETTINGS"
        description="Manage your account, preferences, security and system configuration"
      />

      <section className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-3">
        <ProfileSettings />
        <NotificationPreferences />
        <SecuritySettings />
        <PlatformPreferences />
        <DataPrivacy />
        <SystemPreferences />
      </section>

      <AboutProjectAegis />
    </div>
  );
}

function ProfileSettings() {
  return (
    <SettingsCard
      title="PROFILE SETTINGS"
      description="Manage your personal information and profile preferences"
    >
      <div className="grid gap-5 sm:grid-cols-[128px_minmax(0,1fr)]">
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-border bg-secondary/45 text-4xl font-medium text-muted-foreground shadow-inner shadow-slate-950/20">
              AS
            </div>
            <button className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-primary/20 text-primary">
              <PenLine className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {profileFields.map(([label, value, mode]) => (
            <div key={label} className="rounded-md border border-border bg-background/55 px-3 py-2">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[0.68rem] leading-4 text-muted-foreground">{label}</p>
                  <p className="truncate text-sm font-medium leading-5 text-foreground">{value}</p>
                </div>
                {mode === "select" ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      <CardButton label="Save Changes" />
    </SettingsCard>
  );
}

function NotificationPreferences() {
  return (
    <SettingsCard
      title="NOTIFICATION PREFERENCES"
      description="Configure how and when you receive notifications"
    >
      <div className="space-y-2">
        {notifications.map(([title, description, enabled, tone]) => (
          <div
            key={title}
            className="grid grid-cols-[36px_1fr_auto] items-center gap-3 rounded-md border border-border bg-background/55 p-3"
          >
            <span className={clsx("flex h-8 w-8 items-center justify-center rounded-md border", toneClasses[tone])}>
              {title === "Email Digest" ? <Mail className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-foreground">{title}</span>
              <span className="block truncate text-xs text-muted-foreground">{description}</span>
            </span>
            <Toggle enabled={enabled} />
          </div>
        ))}
      </div>
      <CardButton label="Save Preferences" />
    </SettingsCard>
  );
}

function SecuritySettings() {
  return (
    <SettingsCard
      title="SECURITY SETTINGS"
      description="Manage your account security and access"
    >
      <div className="space-y-2">
        {securityItems.map(([label, value, Icon, tone]) => (
          <ActionRow
            key={label}
            icon={<Icon className="h-4 w-4" />}
            label={label}
            value={value}
            valueTone={tone}
          />
        ))}
      </div>
      <CardButton label="Manage Security" />
    </SettingsCard>
  );
}

function PlatformPreferences() {
  return (
    <SettingsCard
      title="PLATFORM PREFERENCES"
      description="Customize your platform experience"
    >
      <div className="space-y-2">
        {platformPreferences.map(([label, description, value, Icon]) => (
          <div
            key={label}
            className="grid grid-cols-[34px_1fr_auto] items-center gap-3 rounded-md border border-border bg-background/55 p-3"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
              <Icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-foreground">{label}</span>
              <span className="block truncate text-xs text-muted-foreground">{description}</span>
            </span>
            <button className="flex h-8 items-center gap-2 rounded-md border border-border bg-card px-3 text-xs text-foreground">
              {value}
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>
      <CardButton label="Save Preferences" />
    </SettingsCard>
  );
}

function DataPrivacy() {
  return (
    <SettingsCard
      title="DATA & PRIVACY"
      description="Manage your data preferences and privacy settings"
    >
      <div className="space-y-2">
        {privacyItems.map(([label, description, Icon, tone]) => (
          <ActionRow
            key={label}
            icon={<Icon className="h-4 w-4" />}
            label={label}
            description={description}
            valueTone={tone}
            danger={tone === "danger"}
          />
        ))}
      </div>
      <CardButton label="Manage Data" />
    </SettingsCard>
  );
}

function SystemPreferences() {
  return (
    <SettingsCard
      title="SYSTEM PREFERENCES"
      description="Configure system behavior and alerts"
    >
      <div className="space-y-2">
        {systemItems.map(([label, description, Icon]) => (
          <ActionRow
            key={label}
            icon={<Icon className="h-4 w-4" />}
            label={label}
            description={description}
            valueTone="info"
          />
        ))}
      </div>
      <CardButton label="System Configuration" />
    </SettingsCard>
  );
}

function AboutProjectAegis() {
  return (
    <section className={clsx(panelClass, "grid items-center gap-4 md:grid-cols-[1fr_auto]")}>
      <div>
        <h2 className="text-sm font-semibold uppercase leading-5 text-foreground">
          ABOUT PROJECT AEGIS
        </h2>
        <p className="mt-2 text-sm leading-5 text-muted-foreground">
          Bharat Nerves Platform - AI Powered National Security & Economic Intelligence System
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Version 1.0.0 <span className="mx-3 text-border-strong">|</span> Build 2024.11.28.1142
        </p>
      </div>
      <div className="flex flex-wrap gap-x-9 gap-y-3">
        {aboutLinks.map(([label, Icon]) => (
          <button key={label} className="flex items-center gap-2 text-sm font-medium text-primary">
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}

function SettingsCard({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className={panelClass}>
      <div className="mb-5">
        <h2 className="text-base font-semibold uppercase leading-6 text-info">{title}</h2>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  );
}

function ActionRow({
  icon,
  label,
  description,
  value,
  valueTone,
  danger
}: {
  icon: ReactNode;
  label: string;
  description?: string;
  value?: string;
  valueTone: keyof typeof valueToneClasses;
  danger?: boolean;
}) {
  return (
    <button className="grid w-full grid-cols-[34px_1fr_auto] items-center gap-3 rounded-md border border-border bg-background/55 p-3 text-left">
      <span className={clsx("flex h-8 w-8 items-center justify-center rounded-md border", danger ? toneClasses.danger : toneClasses.info)}>
        {icon}
      </span>
      <span className="min-w-0">
        <span className={clsx("block truncate text-sm font-medium", danger ? "text-danger" : "text-foreground")}>
          {label}
        </span>
        {description ? (
          <span className="block truncate text-xs text-muted-foreground">{description}</span>
        ) : null}
      </span>
      <span className="flex items-center gap-3">
        {value ? (
          <span className={clsx("whitespace-nowrap text-sm", valueToneClasses[valueTone])}>
            {value}
          </span>
        ) : null}
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </span>
    </button>
  );
}

function Toggle({ enabled }: { enabled: boolean }) {
  return (
    <span
      className={clsx(
        "relative h-5 w-10 rounded-full border transition-colors",
        enabled ? "border-primary bg-primary" : "border-border-strong bg-secondary"
      )}
    >
      <span
        className={clsx(
          "absolute top-0.5 h-4 w-4 rounded-full bg-foreground transition-transform",
          enabled ? "translate-x-[20px]" : "translate-x-0.5"
        )}
      />
    </span>
  );
}

function CardButton({ label }: { label: string }) {
  return (
    <button className="mt-4 flex h-9 w-full items-center justify-center rounded-md border border-border bg-background/60 text-sm font-medium text-primary hover:bg-secondary">
      {label}
    </button>
  );
}

const toneClasses = {
  danger: "border-danger/30 bg-danger/15 text-danger",
  warning: "border-warning/30 bg-warning/15 text-warning",
  success: "border-success/30 bg-success/15 text-success",
  info: "border-primary/30 bg-primary/15 text-primary",
  purple: "border-violet-500/30 bg-violet-500/15 text-violet-300"
} as const;

const valueToneClasses = {
  default: "text-muted-foreground",
  success: "text-success",
  info: "text-primary",
  danger: "text-danger"
} as const;
