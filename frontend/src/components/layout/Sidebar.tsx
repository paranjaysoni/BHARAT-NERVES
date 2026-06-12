"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Bell,
  Brain,
  Database,
  FileText,
  Home,
  Network,
  Settings,
  ShieldAlert
} from "lucide-react";
import clsx from "clsx";
import { navigationItems, systemStatus } from "@/data";
import type { NavigationIconName } from "@/data";

const iconMap: Record<NavigationIconName, typeof Home> = {
  Activity,
  BarChart3,
  Brain,
  Database,
  FileText,
  Home,
  Network,
  Settings,
  ShieldAlert
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-border bg-card text-card-foreground lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-72 lg:flex-col lg:border-r">
      <div className="flex h-full flex-col">
        <div className="border-border flex items-center gap-3 border-b px-6 py-5">
          <div className="bg-primary text-primary-foreground flex h-11 w-11 items-center justify-center rounded-lg">
            <Bell className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide">PROJECT AEGIS</p>
            <p className="text-xs text-muted-foreground">
              Bharat Nerves Platform
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Primary">
          {navigationItems.map((item) => {
            const Icon = iconMap[item.iconName];
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-border border-t p-4">
          <div className="rounded-lg border border-border bg-background p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  System Status
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {systemStatus.status}
                </p>
              </div>
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-success" />
              </span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {systemStatus.version}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
