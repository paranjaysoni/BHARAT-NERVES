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

          <div className="min-w-0 text-center">
            <div className="flex items-center justify-center gap-8">
              <span className="hidden h-px w-24 bg-gradient-to-r from-transparent via-primary/70 to-transparent xl:block" />
              <h1 className="truncate text-xl font-semibold uppercase leading-7 tracking-[0.08em] text-primary sm:text-2xl">
                National Control Room
              </h1>
              <span className="hidden h-px w-24 bg-gradient-to-r from-transparent via-primary/70 to-transparent xl:block" />
            </div>
            <p className="mt-1 truncate text-sm leading-5 text-muted-foreground">
              Self-Healing Digital Nervous System for Trade, Logistics &amp; Disaster Resilience
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 xl:justify-end">
            <GlobalSimulationIndicator />

            <button className="btn btn-secondary max-w-full justify-between sm:min-w-40">
              <span className="truncate">India (All Corridors)</span>
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
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

            <div className="surface-card hidden rounded-md px-3 py-1.5 text-right sm:block">
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
          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold uppercase leading-7 tracking-[0.05em] text-foreground sm:text-2xl">
              Scenario Simulator
            </h1>
            <p className="mt-1 truncate text-sm leading-5 text-muted-foreground">
              Simulate disruptions and assess impacts before they happen
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <GlobalSimulationIndicator />

            <button className="btn btn-secondary max-w-full justify-between sm:min-w-40">
              <span className="truncate">India (All Corridors)</span>
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
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

            <div className="surface-card hidden rounded-md px-3 py-1.5 text-right sm:block">
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
          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold uppercase leading-7 tracking-[0.05em] text-foreground sm:text-2xl">
              AI Parliament
            </h1>
            <p className="mt-0.5 truncate text-sm leading-5 text-muted-foreground">
              Multi-Agent Deliberation &amp; Consensus Engine
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <GlobalSimulationIndicator />

            <button className="btn btn-secondary max-w-full justify-between sm:min-w-40">
              <span className="truncate">India (All Corridors)</span>
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
            </button>

            <button className="btn btn-secondary btn-icon relative" aria-label="Notifications">
              <Bell className="h-4 w-4" aria-hidden="true" />
              <span className="animate-badge-pulse absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-xs font-semibold text-primary-foreground">
                {alerts.length}
              </span>
            </button>

            <div className="surface-card hidden rounded-md px-3 py-1.5 text-right sm:block">
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
          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold uppercase leading-7 tracking-[0.05em] text-foreground sm:text-2xl">
              Trade Sentinel
            </h1>
            <p className="mt-1 truncate text-sm leading-5 text-muted-foreground">
              Real-time trade and supply chain intelligence
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <GlobalSimulationIndicator />

            <button className="btn btn-secondary max-w-full justify-between sm:min-w-40">
              <span className="truncate">India (All Corridors)</span>
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
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

            <div className="surface-card hidden rounded-md px-3 py-1.5 text-right sm:block">
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
        <div className="min-w-0">
          <p className="type-micro-label truncate">
            {currentUser.organization}
          </p>
          <h1 className="truncate text-base font-semibold leading-5 text-foreground">
            National Control Room
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <GlobalSimulationIndicator />

          <button className="btn btn-secondary max-w-full justify-between">
            <span className="truncate">{selectedCorridor.name}</span>
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
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

          <div className="surface-card hidden rounded-md px-3 py-1.5 text-right sm:block">
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
