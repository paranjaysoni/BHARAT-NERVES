"use client";

import { type ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Database,
  Download,
  FileText,
  Gauge,
  Globe2,
  KeyRound,
  Loader2,
  LockKeyhole,
  Mail,
  MapPin,
  MonitorCog,
  PenLine,
  RadioTower,
  ShieldCheck,
  Trash2,
  Wrench
} from "lucide-react";
import clsx from "clsx";
import { PageHeader, Tooltip } from "@/components/shared";
import { BASE_URL } from "@/lib/api/client";

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
        <RiskThresholdConfiguration />
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
            <Tooltip label="Edit Avatar">
              <button
                type="button"
                aria-label="Edit Avatar"
                className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-primary/20 text-primary hover:bg-primary/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <PenLine className="h-4 w-4" />
              </button>
            </Tooltip>
          </div>
        </div>

        <div className="space-y-2">
          {profileFields.map(([label, value, mode]) => (
            <div key={label} className="rounded-md border border-border bg-background/55 px-3 py-2">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[0.68rem] leading-4 text-muted-foreground">{label}</p>
                  {mode === "select" ? (
                    <select
                      defaultValue={value}
                      aria-label={label}
                      className="w-full truncate text-sm font-medium leading-5 text-foreground bg-transparent appearance-none outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm cursor-pointer"
                    >
                      <option value={value}>{value}</option>
                      <option value="UTC">UTC</option>
                      <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                    </select>
                  ) : (
                    <p className="truncate text-sm font-medium leading-5 text-foreground">{value}</p>
                  )}
                </div>
                {mode === "select" ? <ChevronDown className="pointer-events-none h-4 w-4 shrink-0 text-muted-foreground" /> : null}
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
  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(notifications.map(n => [n[0], n[2] as boolean]))
  );

  return (
    <SettingsCard
      title="NOTIFICATION PREFERENCES"
      description="Configure how and when you receive notifications"
    >
      <div className="space-y-2">
        {notifications.map(([title, description, , tone]) => (
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
            <Toggle
              enabled={prefs[title] || false}
              onToggle={() => setPrefs(prev => ({ ...prev, [title]: !prev[title] }))}
              aria-label={`Toggle ${title}`}
            />
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
            <div className="relative">
              <select
                defaultValue={value}
                aria-label={label}
                className="flex h-8 appearance-none items-center gap-2 rounded-md border border-border bg-card pl-3 pr-8 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
              >
                <option value={value}>{value}</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            </div>
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
          <span
            key={label}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground opacity-70 cursor-not-allowed"
            title="Page unavailable in MVP"
          >
            <Icon className="h-4 w-4" />
            {label}
          </span>
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

function Toggle({ enabled, onToggle, "aria-label": ariaLabel }: { enabled: boolean; onToggle: () => void; "aria-label"?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={ariaLabel}
      onClick={onToggle}
      className={clsx(
        "relative h-5 w-10 shrink-0 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        enabled ? "border-primary bg-primary" : "border-border-strong bg-secondary"
      )}
    >
      <span
        className={clsx(
          "absolute top-0.5 h-4 w-4 rounded-full bg-foreground transition-transform",
          enabled ? "translate-x-[20px]" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

function CardButton({ label }: { label: string }) {
  return (
    <div className="mt-4">
      <Tooltip label="Backend integration pending">
        <button
          type="button"
          disabled
          className="flex h-9 w-full items-center justify-center rounded-md border border-border bg-background/60 text-sm font-medium text-muted-foreground opacity-60 cursor-not-allowed"
        >
          {label}
        </button>
      </Tooltip>
    </div>
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

function RiskThresholdConfiguration() {
  const router = useRouter();
  const [critical, setCritical] = useState<number>(85);
  const [high, setHigh] = useState<number>(60);
  const [medium, setMedium] = useState<number>(35);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch(`${BASE_URL}/api/config`);
        if (!res.ok) throw new Error("Failed to load config");
        const data = await res.json();
        setCritical(data.critical);
        setHigh(data.high);
        setMedium(data.medium);
      } catch (err) {
        console.error("Config load error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadConfig();
  }, []);

  // Validation
  const isInvalid = high >= critical || medium >= high;
  let validationMessage = "";
  if (high >= critical) validationMessage = "High threshold must be less than Critical.";
  else if (medium >= high) validationMessage = "Medium threshold must be less than High.";

  async function handleSave() {
    if (isInvalid) return;
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`${BASE_URL}/api/config`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ critical, high, medium }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to update configuration");
      }
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <SettingsCard
      title="RISK THRESHOLDS"
      description="Configure alert threshold levels for simulation"
    >
      {isLoading ? (
        <div className="flex h-32 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <ThresholdInput label="Critical" value={critical} onChange={setCritical} tone="danger" />
            <ThresholdInput label="High" value={high} onChange={setHigh} tone="warning" />
            <ThresholdInput label="Medium" value={medium} onChange={setMedium} tone="info" />
          </div>

          {(validationMessage || error) && (
            <div className="flex items-center gap-2 text-danger text-xs font-medium">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{validationMessage || error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 text-success text-xs font-medium">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Configuration saved successfully.</span>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={isSaving || isInvalid}
            className="mt-4 flex h-9 w-full items-center justify-center rounded-md border border-border bg-background/60 text-sm font-medium text-primary hover:bg-secondary disabled:opacity-60 disabled:hover:bg-background/60 transition-colors"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Configuration"}
          </button>

          {success && (
            <button
              onClick={() => router.push("/scenario-simulator")}
              className="mt-2 flex h-9 w-full items-center justify-between rounded-md border border-border bg-primary/10 px-3 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              <span>Run Scenario Simulator</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </SettingsCard>
  );
}

function ThresholdInput({
  label,
  value,
  onChange,
  tone
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  tone: keyof typeof toneClasses;
}) {
  return (
    <div className={clsx("rounded-md border p-2", toneClasses[tone])}>
      <label className="mb-1.5 block text-[0.68rem] font-semibold uppercase tracking-wider opacity-80">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full bg-transparent text-lg font-bold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
    </div>
  );
}

