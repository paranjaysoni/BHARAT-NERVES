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
import { sectorImpactBreakdown } from "@/data";

export function SectorImpactBreakdown() {
  return (
    <ChartCard
      title="Sector Impact Breakdown"
      description="Mock distribution across healthcare, logistics, trade, environment, and infrastructure."
    >
      <div className="w-full overflow-x-auto">
        <BarChart width={720} height={288} data={sectorImpactBreakdown} layout="vertical" margin={{ left: 20, right: 8, top: 12, bottom: 8 }}>
          <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
          <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis dataKey="sector" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={92} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              color: "hsl(var(--foreground))"
            }}
          />
          <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Impact Share" />
        </BarChart>
      </div>
    </ChartCard>
  );
}
