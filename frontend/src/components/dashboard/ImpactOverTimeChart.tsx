"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { ChartCard } from "@/components/shared";
import { impactOverTime } from "@/data";

export function ImpactOverTimeChart() {
  return (
    <ChartCard
      title="Impact Over Time"
      description="Mock expected impact trajectory with recovery action benefit."
    >
      <div className="w-full overflow-x-auto">
        <LineChart width={720} height={288} data={impactOverTime} margin={{ left: 8, right: 8, top: 12, bottom: 8 }}>
          <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
          <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              color: "hsl(var(--foreground))"
            }}
          />
          <Line type="monotone" dataKey="expectedImpact" stroke="hsl(var(--danger))" strokeWidth={2} dot={false} name="Expected Impact" />
          <Line type="monotone" dataKey="recoveredImpact" stroke="hsl(var(--success))" strokeWidth={2} dot={false} name="After Recovery" />
        </LineChart>
      </div>
    </ChartCard>
  );
}
