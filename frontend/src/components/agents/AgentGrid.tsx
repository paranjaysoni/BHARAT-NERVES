import {
  BarChart3,
  Brain,
  Building2,
  Cpu,
  Leaf,
  Scale,
  ShieldAlert,
  Truck,
  Users
} from "lucide-react";
import type { ReactNode } from "react";
import { agentRecommendations, agents } from "@/data";
import type { ParliamentAgentStatus } from "@/types";

type Accent = { circle: string; text: string; bar: string };

const ACCENTS: Record<string, Accent> = {
  "agent-infrastructure-guardian": { circle: "bg-blue-500/20 border-blue-400/40 text-blue-500 dark:text-blue-400",     text: "text-blue-500 dark:text-blue-400",    bar: "bg-blue-500"    },
  "agent-environment-sentinel":    { circle: "bg-emerald-500/20 border-emerald-400/40 text-emerald-600 dark:text-emerald-400", text: "text-emerald-600 dark:text-emerald-400", bar: "bg-emerald-500" },
  "agent-humanitarian-advocate":   { circle: "bg-violet-500/20 border-violet-400/40 text-violet-600 dark:text-violet-400", text: "text-violet-600 dark:text-violet-400", bar: "bg-violet-500"  },
  "agent-economic-strategist":     { circle: "bg-amber-500/20 border-amber-400/40 text-amber-600 dark:text-amber-400",  text: "text-amber-600 dark:text-amber-400",  bar: "bg-amber-500"   },
  "agent-logistics-optimizer":     { circle: "bg-cyan-500/20 border-cyan-400/40 text-cyan-600 dark:text-cyan-400",      text: "text-cyan-600 dark:text-cyan-400",    bar: "bg-cyan-500"    },
  "agent-risk-analyst":            { circle: "bg-red-500/20 border-red-400/40 text-red-500 dark:text-red-400",          text: "text-red-500 dark:text-red-400",      bar: "bg-red-500"     },
  "agent-tech-innovator":          { circle: "bg-indigo-500/20 border-indigo-400/40 text-indigo-500 dark:text-indigo-400", text: "text-indigo-500 dark:text-indigo-400", bar: "bg-indigo-500" },
  "agent-policy-advisor":          { circle: "bg-orange-500/20 border-orange-400/40 text-orange-500 dark:text-orange-400", text: "text-orange-500 dark:text-orange-400", bar: "bg-orange-500" },
};
const FALLBACK: Accent = { circle: "bg-primary/10 border-primary/20 text-primary", text: "text-primary", bar: "bg-primary" };

const ICONS: Record<string, ReactNode> = {
  "agent-infrastructure-guardian": <Building2  className="h-5 w-5" />,
  "agent-environment-sentinel":    <Leaf       className="h-5 w-5" />,
  "agent-humanitarian-advocate":   <Users      className="h-5 w-5" />,
  "agent-economic-strategist":     <BarChart3  className="h-5 w-5" />,
  "agent-logistics-optimizer":     <Truck      className="h-5 w-5" />,
  "agent-risk-analyst":            <ShieldAlert className="h-5 w-5" />,
  "agent-tech-innovator":          <Cpu        className="h-5 w-5" />,
  "agent-policy-advisor":          <Scale      className="h-5 w-5" />,
};

export function AgentGrid() {
  return (
    <section className="surface-card flex h-full min-h-0 flex-col rounded-md p-3.5 text-card-foreground">
      {/* Section label */}
      <p className="mb-2.5 shrink-0 text-[0.68rem] font-semibold uppercase tracking-widest text-muted-foreground">
        AI Agents in Session
      </p>

      {/* 4 × 2 grid */}
      <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-4 gap-3 lg:grid-cols-4 lg:grid-rows-2">
        {agents.map((agent) => {
          const rec    = agentRecommendations.find((r) => r.agentId === agent.id);
          const accent = ACCENTS[agent.id] ?? FALLBACK;
          const icon   = ICONS[agent.id] ?? <Brain className="h-4 w-4" />;
          const conf   = rec?.confidence ?? 80;
          const status = rec?.status ?? "prepared";

          return (
            <article
              key={agent.id}
              className="flex min-h-0 flex-col rounded-md border border-border bg-card p-3 transition-all hover:shadow-sm"
            >
              {/* Icon circle + name + live dot */}
              <div className="flex items-start gap-2.5">
                {/* Circular icon avatar */}
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${accent.circle}`}>
                  {icon}
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-center gap-1.5">
                    <LiveDot status={status} />
                    <p className="truncate text-[0.78rem] font-semibold leading-none text-foreground">
                      {agent.name}
                    </p>
                  </div>
                  <p className="mt-1 truncate text-[0.62rem] text-muted-foreground">
                    Focus: {agent.role}
                  </p>
                </div>
              </div>

              {/* Position */}
              <div className="mt-2.5">
                <p className="text-[0.57rem] font-semibold uppercase tracking-wide text-muted-foreground/60">
                  Position
                </p>
                <p className={`mt-1 text-[0.74rem] font-semibold leading-tight ${accent.text}`}>
                  {rec?.position ?? agent.priority}
                </p>
              </div>

              {/* Confidence */}
              <div className="mt-2">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[0.57rem] text-muted-foreground">Confidence</span>
                  <span className={`text-[0.62rem] font-bold tabular-nums ${accent.text}`}>{conf}%</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-secondary">
                  <div className={`h-full rounded-full ${accent.bar}`} style={{ width: `${conf}%` }} />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Centered bottom link */}
      <div className="mt-3 flex items-center justify-center border-t border-border pt-2.5">
        <button className="flex items-center gap-1.5 text-[0.72rem] font-medium text-primary hover:text-primary/75">
          View All Agent Discussions
          <span>→</span>
        </button>
      </div>
    </section>
  );
}

function LiveDot({ status }: { status: ParliamentAgentStatus }) {
  if (status === "aligned") return (
    <span className="relative flex h-2 w-2 shrink-0">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
    </span>
  );
  if (status === "reviewing") return (
    <span className="relative flex h-2 w-2 shrink-0">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warning opacity-50" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-warning" />
    </span>
  );
  return <span className="h-2 w-2 shrink-0 rounded-full bg-info" />;
}
