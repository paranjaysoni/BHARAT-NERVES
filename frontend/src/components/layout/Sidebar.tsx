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
    <aside className="border-border bg-card text-card-foreground shadow-[1px_0_2px_rgb(15_23_42/0.04)] lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-[220px] lg:flex-col lg:border-r">
      <div className="flex h-full flex-col">
        <div className="border-border flex items-center gap-2.5 border-b px-4 py-3.5">
          <div className="bg-primary text-primary-foreground flex h-9 w-9 items-center justify-center rounded-md shadow-sm">
            <Bell className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-wide">PROJECT AEGIS</p>
            <p className="text-xs text-muted-foreground">
              Bharat Nerves Platform
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 px-2.5 py-3" aria-label="Primary">
          {navigationItems.map((item) => {
            const Icon = iconMap[item.iconName];
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "focus-ring group relative flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-[background-color,color,box-shadow,transform] duration-200 ease-out hover:translate-x-0.5",
                  isActive
                    ? "bg-primary/15 text-primary shadow-[inset_3px_0_0_hsl(var(--primary))]"
                    : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-border border-t p-3">
          <div className="surface-inset rounded-md p-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  System Status
                </p>
                <p className="text-sm font-semibold">
                  {systemStatus.status}
                </p>
              </div>
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {systemStatus.version}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
