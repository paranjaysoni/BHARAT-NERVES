"use client";

import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { parliamentSession } from "@/data";

const TABS = ["Parliament Session", "Agent Directory", "Decision History", "Knowledge Base"] as const;

export function ParliamentSessionTabs() {
  const [activeTab, setActiveTab] = useState<string>("Parliament Session");

  return (
    <div className="flex h-11 shrink-0 items-end gap-0 rounded-md border border-border bg-card/70 px-3 pt-2">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={
            activeTab === tab
              ? "mr-5 border-b-[2px] border-primary pb-2.5 text-xs font-semibold text-primary"
              : "mr-5 pb-2.5 text-xs font-medium text-muted-foreground hover:text-foreground"
          }
        >
          {tab}
        </button>
      ))}
      <div className="ml-auto pb-2">
        <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-primary/40 bg-primary/10 px-3 text-[0.7rem] font-semibold text-primary hover:bg-primary/15">
          <span className="text-sm font-bold leading-none">+</span>
          New Session
        </button>
      </div>
    </div>
  );
}

export function ParliamentSessionSummary() {
  return (
    <section className="surface-card h-full rounded-md text-card-foreground">
      <div className="flex h-full items-stretch divide-x divide-border">

        {/* Left: scenario title + meta */}
        <div className="flex-1 px-5 py-3.5">
          <p className="text-[0.6rem] font-bold uppercase tracking-widest text-muted-foreground">
            Current Session
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2.5">
            <h2 className="text-[1.1rem] font-bold leading-snug text-foreground">
              {parliamentSession.currentScenario}
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-danger/40 bg-danger/15 px-2 py-0.5 text-[0.62rem] font-bold text-danger">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-danger" />
              Live
            </span>
          </div>
          <p className="mt-1.5 flex flex-wrap gap-x-2.5 gap-y-0.5 text-[0.65rem] text-muted-foreground">
            <span>Session ID: <span className="font-medium text-foreground">{parliamentSession.sessionId}</span></span>
            <span className="select-none text-border">|</span>
            <span>Started at: <span className="font-medium text-foreground">{parliamentSession.startedAt}</span></span>
            <span className="select-none text-border">|</span>
            <span>Participants: <span className="font-medium text-foreground">{parliamentSession.participatingAgents} AI Agents</span></span>
          </p>
        </div>

        {/* Center: objectives */}
        <div className="hidden w-[280px] shrink-0 px-5 py-3.5 xl:block">
          <p className="text-[0.6rem] font-bold uppercase tracking-widest text-muted-foreground">
            Objectives
          </p>
          <p className="mt-1.5 text-[0.68rem] leading-[1.5] text-muted-foreground">
            {parliamentSession.objectives}
          </p>
        </div>

        {/* Right: timer + button */}
        <div className="flex shrink-0 flex-col items-end justify-between px-5 py-3.5">
          <div className="text-right">
            <p className="text-[0.6rem] font-bold uppercase tracking-widest text-muted-foreground">
              Time Remaining
            </p>
            <div className="mt-1.5 flex items-center justify-end gap-2">
              <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-[1.35rem] font-bold tabular-nums leading-none text-foreground">
                {parliamentSession.timeRemaining}
              </span>
            </div>
          </div>
          <button className="mt-3 h-7 rounded-md border border-border bg-secondary px-3 text-[0.68rem] font-semibold text-foreground hover:border-border-strong hover:bg-secondary/80">
            View Brief
          </button>
        </div>

      </div>
    </section>
  );
}
