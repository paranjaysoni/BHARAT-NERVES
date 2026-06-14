import { Activity, Bot, GitBranch, Timer } from "lucide-react";
import { parliamentMetrics } from "@/data";

const ICONS = [
  { icon: <Bot className="h-5 w-5" />,        bg: "bg-gradient-to-br from-amber-500/80 to-amber-600/50 border-amber-500/30 text-white" },
  { icon: <Activity className="h-5 w-5" />,   bg: "bg-gradient-to-br from-emerald-500/80 to-emerald-600/50 border-emerald-500/30 text-white" },
  { icon: <GitBranch className="h-5 w-5" />,  bg: "bg-gradient-to-br from-blue-500/80 to-blue-600/50 border-blue-500/30 text-white" },
  { icon: <Timer className="h-5 w-5" />,      bg: "bg-gradient-to-br from-purple-500/80 to-purple-600/50 border-purple-500/30 text-white" },
];

export function KeyMetrics() {
  return (
    <section className="surface-card flex h-full min-h-0 flex-col rounded-md p-4 text-card-foreground">
      <p className="mb-3 shrink-0 text-[0.62rem] font-semibold uppercase tracking-widest text-muted-foreground">
        Key Metrics
      </p>
      <div className="grid min-h-0 flex-1 grid-cols-4 items-center gap-2">
        {parliamentMetrics.map((metric, i) => (
          <div key={metric.id} className="flex flex-col items-center gap-1.5 text-center">
            <div className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-sm ${ICONS[i].bg}`}>
              {ICONS[i].icon}
            </div>
            <p className="text-[1.15rem] font-bold tabular-nums leading-none text-foreground">
              {metric.value}
            </p>
            <p className="text-[0.58rem] leading-tight text-muted-foreground">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
