"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { ChartCard } from "@/components/shared";
import { recoveryComparison } from "@/data";

export function RecoveryComparisonChart() {
  return (
    <ChartCard
      title="Before vs After Recovery"
      description="Mock comparison of impact before and after Project Aegis recovery actions."
    >
      <div className="w-full overflow-x-auto">
        <BarChart width={720} height={288} data={recoveryComparison} margin={{ left: 8, right: 8, top: 12, bottom: 8 }}>
          <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
          <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              color: "hsl(var(--foreground))"
            }}
          />
          <Bar dataKey="before" fill="hsl(var(--danger))" radius={[4, 4, 0, 0]} name="Before" />
          <Bar dataKey="after" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} name="After" />
        </BarChart>
      </div>
    </ChartCard>
  );
}
