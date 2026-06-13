"use client";

import { Bell, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { alerts, currentUser, selectedCorridor, settings } from "@/data";

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 px-4 py-2 backdrop-blur sm:px-5 lg:px-6">
      <div className="flex min-h-9 flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {currentUser.organization}
          </p>
          <h1 className="text-base font-semibold leading-5 text-foreground">
            National Control Room
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm font-medium text-card-foreground transition-colors hover:bg-secondary">
            {selectedCorridor.name}
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>

          <button
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-card-foreground transition-colors hover:bg-secondary"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-xs font-semibold text-primary-foreground">
              {alerts.length}
            </span>
          </button>

          <div className="rounded-md border border-border bg-card px-3 py-1.5 text-right">
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
