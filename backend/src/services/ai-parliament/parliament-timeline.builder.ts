import type { ParliamentTimelineEvent } from "../../types/ai-parliament.types.js";

const timelineLabels = [
  "Session Started",
  "Scenario Briefed to Agents",
  "Agents Submitted Initial Views",
  "Round 1 Deliberation Complete",
  "Consensus Building",
  "Final Decision Prepared",
] as const;

export function buildParliamentTimeline(generatedAt = new Date()): ParliamentTimelineEvent[] {
  return timelineLabels.map((label, index) => ({
    id: `timeline-${index + 1}`,
    label,
    status: "COMPLETED",
    timestamp: new Date(generatedAt.getTime() + index * 60_000).toISOString(),
  }));
}

