import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="min-h-screen lg:pl-[220px]">
        <Topbar />
        <main className="min-h-[calc(100vh-52px)] px-4 py-4 sm:px-5 lg:px-6 lg:py-5">
          {children}
        </main>
      </div>
    </div>
  );
}
