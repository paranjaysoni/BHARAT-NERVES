"use client";

import { Bell, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { alerts, currentUser, selectedCorridor, settings } from "@/data";

export function Topbar() {
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
          <button className="btn btn-secondary">
            {selectedCorridor.name}
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>

          <button
            className="btn btn-secondary btn-icon relative"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-xs font-semibold text-primary-foreground">
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
