export type MetricTrend = "up" | "down" | "stable";

export interface Metric {
  id: string;
  label: string;
  value: string;
  unit?: string;
  trend: MetricTrend;
  description: string;
}
