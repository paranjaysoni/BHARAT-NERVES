import { ShieldCheck } from "lucide-react";
import { parliamentConsensus } from "@/data";

export function ConsensusPanel() {
  const {
    consensusScore,
    agreePercent,
    partialPercent,
    disagreePercent,
    neutralPercent,
    topAgreedPriority,
  } = parliamentConsensus;

  return (
    <section className="surface-card flex h-full min-h-0 flex-col rounded-md p-4 text-card-foreground">
      <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-widest text-muted-foreground">
        Consensus Summary
      </p>

      {/* Gauge + legend */}
      <div className="flex items-center gap-4 border-b border-border pb-3">
        <GaugeSVG score={consensusScore} />
        <div className="flex flex-1 flex-col gap-2">
          <LegendRow dot="bg-success"         label="Agree"    value={agreePercent} />
          <LegendRow dot="bg-warning"          label="Partial"  value={partialPercent} />
          <LegendRow dot="bg-danger"           label="Disagree" value={disagreePercent} />
          <LegendRow dot="bg-muted-foreground" label="Neutral"  value={neutralPercent} />
        </div>
      </div>

      {/* Top agreed priority */}
      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_58px] gap-3">
        <div>
          <p className="text-[0.57rem] font-bold uppercase tracking-wide text-muted-foreground">
            Top Agreed Priority
          </p>
          <p className="mt-1 text-[0.72rem] font-semibold leading-[1.4] text-foreground">
            {topAgreedPriority}
          </p>
        </div>
        <div className="flex h-[58px] w-[58px] items-center justify-center rounded-md border border-success/25 bg-success/10 text-success">
          <ShieldCheck className="h-6 w-6" />
        </div>
      </div>

      <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[0.62rem] font-semibold text-success">
        <span className="h-1.5 w-1.5 rounded-full bg-success" />
        Good Agreement
      </span>
    </section>
  );
}

function GaugeSVG({ score }: { score: number }) {
  // Semi-circle: center (70,68), radius 50, arc from (20,68) to (120,68)
  const cx = 70, cy = 68, r = 50;
  const totalArc = Math.PI * r;                     // half-circle arc length ≈ 157
  const filledArc = (score / 100) * totalArc;

  const successColor = "hsl(var(--success))";
  const dangerColor  = "hsl(var(--danger))";

  // The gauge is split: green portion, then a red tip near 72%
  // For simplicity: just render the green arc up to score
  return (
    <div className="relative shrink-0" style={{ width: 158, height: 94 }}>
      <svg width="158" height="94" viewBox="0 0 140 76" aria-hidden="true">
        {/* Background track */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Red warning section — last ~15% */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={dangerColor}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${totalArc * 0.15} ${totalArc}`}
          strokeDashoffset={-(totalArc * 0.85)}
          opacity={0.5}
        />
        {/* Green filled arc */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={successColor}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${filledArc} ${totalArc}`}
        />
      </svg>
      {/* Centered text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
        <p className="text-[1.8rem] font-bold tabular-nums leading-none text-foreground">{score}%</p>
        <p className="mt-0.5 text-[0.6rem] font-semibold text-success">Consensus Score</p>
      </div>
    </div>
  );
}

function LegendRow({ dot, label, value }: { dot: string; label: string; value: number }) {
  return (
    <div className="grid grid-cols-[10px_minmax(0,1fr)_38px] items-center gap-2">
      <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
      <span className="text-[0.7rem] text-muted-foreground">{label}</span>
      <span className="text-right text-[0.72rem] font-bold tabular-nums text-foreground">{value}%</span>
    </div>
  );
}
