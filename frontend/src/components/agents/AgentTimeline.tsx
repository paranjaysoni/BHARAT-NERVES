import { Brain, CheckCircle, ChevronDown, Cpu, Globe, Users } from "lucide-react";
import { parliamentTimeline } from "@/data";
import type { ParliamentTimelineItem } from "@/types";

/* Avatar icon + color per step — matches reference gradient circles */
const STEP_META: Array<{
  icon: React.ReactNode;
  avatarBg: string;
}> = [
  { icon: <Globe   className="h-3.5 w-3.5" />, avatarBg: "bg-gradient-to-br from-blue-500 to-blue-700 text-white border-blue-500/40"    },
  { icon: <Brain   className="h-3.5 w-3.5" />, avatarBg: "bg-gradient-to-br from-violet-500 to-violet-700 text-white border-violet-500/40" },
  { icon: <Users   className="h-3.5 w-3.5" />, avatarBg: "bg-gradient-to-br from-amber-500 to-amber-700 text-white border-amber-500/40"   },
  { icon: <Cpu     className="h-3.5 w-3.5" />, avatarBg: "bg-gradient-to-br from-emerald-500 to-emerald-700 text-white border-emerald-500/40" },
  { icon: <CheckCircle className="h-3.5 w-3.5" />, avatarBg: "bg-secondary border-border text-muted-foreground"                           },
];

const lineColor: Record<ParliamentTimelineItem["status"], string> = {
  success: "bg-success/30",
  warning: "bg-warning/30",
  info:    "bg-info/20",
  danger:  "bg-danger/30",
  neutral: "bg-border",
};

export function AgentTimeline() {
  return (
    <section className="surface-card flex h-full min-h-0 flex-col rounded-md p-4 text-card-foreground">
      {/* Header */}
      <div className="mb-3 flex shrink-0 items-center justify-between">
        <p className="text-[0.68rem] font-bold uppercase tracking-widest text-muted-foreground">
          Decision Timeline
        </p>
        <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[0.58rem] font-bold text-primary">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Live
        </span>
      </div>

      {/* Items */}
      <div className="flex min-h-0 flex-1 flex-col justify-between">
        {parliamentTimeline.map((item, i) => {
          const isLast    = i === parliamentTimeline.length - 1;
          const isPending = item.status === "neutral";
          const meta      = STEP_META[i] ?? STEP_META[0];

          return (
            <div key={item.id} className="flex items-start gap-0">
              {/* Timestamp — fixed left column */}
              <div className="w-[62px] shrink-0 pt-1.5 text-right pr-2.5">
                <span className={`text-[0.58rem] tabular-nums font-medium ${isPending ? "text-muted-foreground/35" : "text-muted-foreground"}`}>
                  {item.timestamp}
                </span>
              </div>

              {/* Avatar + line */}
              <div className="flex flex-col items-center">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border shadow-sm ${meta.avatarBg} ${isPending ? "opacity-40" : ""}`}>
                  {meta.icon}
                </div>
                {!isLast && (
                  <div className={`w-0.5 flex-1 ${lineColor[item.status]}`} style={{ minHeight: "1.25rem" }} />
                )}
              </div>

              {/* Content */}
              <div className={`min-w-0 flex-1 pl-2.5 ${isLast ? "pb-0" : "pb-3"}`}>
                <p className={`text-[0.7rem] font-semibold leading-tight ${isPending ? "text-muted-foreground/40" : "text-foreground"}`}>
                  {item.title}
                </p>
                <p className={`mt-0.5 text-[0.62rem] leading-[1.3] ${isPending ? "text-muted-foreground/30" : "text-muted-foreground"}`}>
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2.5 flex shrink-0 items-center justify-between border-t border-border pt-2">
        <button className="text-[0.63rem] font-medium text-primary hover:text-primary/75">
          View Full Timeline →
        </button>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
    </section>
  );
}
