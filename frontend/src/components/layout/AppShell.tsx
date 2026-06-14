"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isAiParliament = pathname === "/ai-parliament";

  return (
    <div className={isAiParliament ? "h-screen overflow-hidden bg-background text-foreground" : "min-h-screen bg-background text-foreground"}>
      <Sidebar />
      <div className={isAiParliament ? "h-screen overflow-hidden lg:pl-[220px]" : "min-h-screen lg:pl-[220px]"}>
        <Topbar />
        <main className={isAiParliament ? "box-border h-[calc(100vh-76px)] overflow-hidden px-4 py-3 sm:px-5 lg:px-6" : "animate-page-enter min-h-[calc(100vh-52px)] px-4 py-4 sm:px-5 lg:px-6 lg:py-5"}>
          {children}
        </main>
      </div>
    </div>
  );
}
