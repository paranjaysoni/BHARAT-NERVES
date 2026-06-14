import { ParliamentPageClient } from "@/components/agents/ParliamentPageClient";
import {
  AgentGrid,
  AgentTimeline,
  ConsensusPanel,
  FinalRecommendationPreview,
  KeyDiscussionInsights,
  KeyMetrics,
  ParliamentSessionSummary,
  ParliamentSessionTabs
} from "@/components/agents";

export default function AiParliamentPage() {
  return (
    <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden">
      <ParliamentSessionTabs />

      {/* Live backend-driven parliament session (shown when simulation is complete) */}
      <ParliamentPageClient />

      {/* Static demo view — always visible as reference / fallback */}
      <div className="grid min-h-0 flex-1 gap-3 xl:grid-cols-[minmax(0,1fr)_350px]">
        <div className="grid min-h-0 grid-rows-[118px_minmax(0,1fr)_250px] gap-3">
          <ParliamentSessionSummary />
          <AgentGrid />
          <div className="grid min-h-0 gap-3 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1fr)]">
            <FinalRecommendationPreview />
            <KeyDiscussionInsights />
          </div>
        </div>

        <aside className="grid min-h-0 grid-rows-[250px_minmax(0,1fr)_190px] gap-3">
          <ConsensusPanel />
          <AgentTimeline />
          <KeyMetrics />
        </aside>
      </div>
    </div>
  );
}
