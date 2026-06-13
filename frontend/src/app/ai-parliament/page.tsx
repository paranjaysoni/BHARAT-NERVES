import {
  AgentGrid,
  AgentRecommendationMatrix,
  AgentTimeline,
  ConsensusPanel,
  FinalRecommendationPreview,
  ParliamentSessionSummary,
  PriorityBreakdown
} from "@/components/agents";
import { PageHeader, SectionCard, StatusBadge } from "@/components/shared";
import { aiParliamentPage } from "@/data";

export default function AiParliamentPage() {
  return (
    <div className="app-page-stack">
      <PageHeader
        title={aiParliamentPage.title}
        description={aiParliamentPage.description}
        actions={<StatusBadge label="Deliberation Ready" variant="success" />}
      />

      <section className="app-section-grid xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
        <div className="app-column-stack">
          <ParliamentSessionSummary />
          <AgentGrid />
          <AgentTimeline />
        </div>

        <aside className="app-column-stack">
          <ConsensusPanel />
          <PriorityBreakdown />
          <FinalRecommendationPreview />
        </aside>
      </section>

      <AgentRecommendationMatrix />

      <SectionCard
        title="Current Limitations / Future AI Integration"
        description="This staged implementation uses structured mock recommendations."
      >
        Future versions will connect Gemini or OpenAI APIs with strict JSON output
        for live multi-agent reasoning, validation, and human-reviewed Crisis
        Commander handoff. The current page is intentionally frontend-only and
        keeps all agent responses in centralized mock data.
      </SectionCard>
    </div>
  );
}
