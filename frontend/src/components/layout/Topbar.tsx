"use client";

import { Bell, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { GlobalSimulationIndicator } from "@/components/layout/GlobalSimulationIndicator";
import { alerts, currentUser, selectedCorridor, settings } from "@/data";

export function Topbar() {
  const pathname = usePathname();
  const isControlRoom = pathname === "/control-room";
  const isScenarioSimulator = pathname === "/scenario-simulator";
  const isTradeSentinel = pathname === "/trade-sentinel";

  if (isControlRoom) {
    return (
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 px-4 py-3 shadow-[0_1px_2px_rgb(15_23_42/0.04)] backdrop-blur sm:px-5 lg:px-6">
        <div className="grid gap-3 xl:grid-cols-[260px_minmax(0,1fr)_390px] xl:items-center">
          <div className="hidden xl:block" />

          <div className="text-center">
            <div className="flex items-center justify-center gap-8">
              <span className="hidden h-px w-24 bg-gradient-to-r from-transparent via-primary/70 to-transparent xl:block" />
              <h1 className="text-2xl font-semibold uppercase leading-7 tracking-[0.08em] text-primary">
                National Control Room
              </h1>
              <span className="hidden h-px w-24 bg-gradient-to-r from-transparent via-primary/70 to-transparent xl:block" />
            </div>
            <p className="mt-1 text-sm leading-5 text-muted-foreground">
              Self-Healing Digital Nervous System for Trade, Logistics & Disaster Resilience
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 xl:justify-end">
            <GlobalSimulationIndicator />

            <button className="btn btn-secondary min-w-48 justify-between">
              India (All Corridors)
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>

            <button
              className="btn btn-secondary btn-icon relative"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" aria-hidden="true" />
              <span className="animate-badge-pulse absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-xs font-semibold text-primary-foreground">
                {alerts.length}
              </span>
            </button>

            <div className="surface-card rounded-md px-3 py-1.5 text-right">
              <p className="text-sm font-semibold leading-4 text-card-foreground">
                {settings.displayTime}
              </p>
              <p className="text-xs leading-4 text-muted-foreground">
                {settings.displayDate}
              </p>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </header>
    );
  }

  if (isScenarioSimulator) {
    return (
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 px-4 py-3 shadow-[0_1px_2px_rgb(15_23_42/0.04)] backdrop-blur sm:px-5 lg:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold uppercase leading-7 tracking-[0.05em] text-foreground">
              Scenario Simulator
            </h1>
            <p className="mt-1 text-sm leading-5 text-muted-foreground">
              Simulate disruptions and assess impacts before they happen
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <GlobalSimulationIndicator />

            <button className="btn btn-secondary min-w-48 justify-between">
              India (All Corridors)
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>

            <button
              className="btn btn-secondary btn-icon relative"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" aria-hidden="true" />
              <span className="animate-badge-pulse absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-xs font-semibold text-primary-foreground">
                {alerts.length}
              </span>
            </button>

            <div className="surface-card rounded-md px-3 py-1.5 text-right">
              <p className="text-sm font-semibold leading-4 text-card-foreground">
                {settings.displayTime}
              </p>
              <p className="text-xs leading-4 text-muted-foreground">
                {settings.displayDate}
              </p>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </header>
    );
  }

  const isAiParliament = pathname === "/ai-parliament";

  if (isAiParliament) {
    return (
      <header className="sticky top-0 z-30 h-[76px] border-b border-border bg-background/90 px-4 py-3 shadow-[0_1px_2px_rgb(15_23_42/0.04)] backdrop-blur sm:px-5 lg:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold uppercase leading-7 tracking-[0.05em] text-foreground">
              AI Parliament
            </h1>
            <p className="mt-0.5 text-sm leading-5 text-muted-foreground">
              Multi-Agent Deliberation &amp; Consensus Engine
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <GlobalSimulationIndicator />

            <button className="btn btn-secondary min-w-48 justify-between">
              India (All Corridors)
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>

            <button className="btn btn-secondary btn-icon relative" aria-label="Notifications">
              <Bell className="h-4 w-4" aria-hidden="true" />
              <span className="animate-badge-pulse absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-xs font-semibold text-primary-foreground">
                {alerts.length}
              </span>
            </button>

            <div className="surface-card rounded-md px-3 py-1.5 text-right">
              <p className="text-sm font-semibold leading-4 text-card-foreground">{settings.displayTime}</p>
              <p className="text-xs leading-4 text-muted-foreground">{settings.displayDate}</p>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </header>
    );
  }

  if (isTradeSentinel) {
    return (
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 px-4 py-3 shadow-[0_1px_2px_rgb(15_23_42/0.04)] backdrop-blur sm:px-5 lg:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold uppercase leading-7 tracking-[0.05em] text-foreground">
              Trade Sentinel
            </h1>
            <p className="mt-1 text-sm leading-5 text-muted-foreground">
              Real-time trade and supply chain intelligence
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <GlobalSimulationIndicator />

            <button className="btn btn-secondary min-w-48 justify-between">
              India (All Corridors)
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>

            <button
              className="btn btn-secondary btn-icon relative"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" aria-hidden="true" />
              <span className="animate-badge-pulse absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-xs font-semibold text-primary-foreground">
                {alerts.length}
              </span>
            </button>

            <div className="surface-card rounded-md px-3 py-1.5 text-right">
              <p className="text-sm font-semibold leading-4 text-card-foreground">
                {settings.displayTime}
              </p>
              <p className="text-xs leading-4 text-muted-foreground">
                {settings.displayDate}
              </p>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 px-4 py-2 shadow-[0_1px_2px_rgb(15_23_42/0.04)] backdrop-blur sm:px-5 lg:px-6">
      <div className="flex min-h-9 flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="type-micro-label">
            {currentUser.organization}
          </p>
          <h1 className="text-base font-semibold leading-5 text-foreground">
            National Control Room
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <GlobalSimulationIndicator />

          <button className="btn btn-secondary">
            {selectedCorridor.name}
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>

          <button
            className="btn btn-secondary btn-icon relative"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
            <span className="animate-badge-pulse absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-xs font-semibold text-primary-foreground">
              {alerts.length}
            </span>
          </button>

          <div className="surface-card rounded-md px-3 py-1.5 text-right">
            <p className="text-sm font-semibold leading-4 text-card-foreground">
              {settings.displayTime}
            </p>
            <p className="text-xs leading-4 text-muted-foreground">
              {settings.displayDate}
            </p>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
