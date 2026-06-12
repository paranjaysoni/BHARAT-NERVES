# AI Parliament

AI Parliament is the multi-stakeholder decision support interface for Project Aegis / Bharat Nerves Platform.

## Page Purpose

The page presents a structured, mock multi-agent deliberation for a crisis scenario. It shows participating agents, their priorities, recommendations, consensus score, conflict level, stakeholder priorities, and a final recommendation ready for Crisis Commander.

No real AI calls run in this issue.

## AI Parliament Role

Inside Project Aegis, AI Parliament is planned as the reasoning layer between scenario analysis and crisis command. It will later help convert corridor stress, humanitarian priorities, trade risk, and policy constraints into structured recommendations.

## Agent List

- Infrastructure Guardian: Protect critical infrastructure and restore routes.
- Environment Sentinel: Reduce emissions and environmental damage.
- Humanitarian Advocate: Protect citizens, hospitals, and vulnerable populations.
- Economic Strategist: Reduce economic losses and trade disruption.
- Logistics Optimizer: Find fastest and safest recovery routes.
- Risk Analyst: Identify cascading failures and future risks.
- Tech Innovator: Suggest digital, autonomous, and predictive solutions.
- Policy Advisor: Convert recommendations into governance-ready actions.

## Layout Structure

- Top section: `PageHeader` with `Deliberation Ready` status.
- Main left section: active session summary, agent cards grid, and recommendation timeline.
- Right section: consensus score, stakeholder priority breakdown, and final recommendation preview.
- Bottom section: agent recommendation matrix and staged implementation note.

The layout is responsive:

- Desktop: agent grid and timeline beside decision panels.
- Tablet: stacked sections.
- Mobile: single-column layout.

## Components Used

- `PageHeader`
- `AgentCard`
- `SectionCard`
- `MetricCard`
- `ProgressBar`
- `StatusBadge`
- `TimelineItem`
- `DataTable`

Agent-specific composition components live in `src/components/agents/`:

- `ParliamentSessionSummary`
- `AgentGrid`
- `ConsensusPanel`
- `PriorityBreakdown`
- `AgentTimeline`
- `FinalRecommendationPreview`
- `AgentRecommendationMatrix`

## Data Sources Used

The page consumes centralized mock data from `src/data/`:

- `agents`
- `parliamentSession`
- `agentRecommendations`
- `parliamentConsensus`
- `stakeholderPriorities`
- `parliamentTimeline`
- `finalRecommendation`

## Current Limitations

- No real AI calls.
- No Gemini/OpenAI API integration.
- No backend APIs.
- No agent orchestration.
- No real decision engine.
- No simulation logic.
- No live data fetching.

## Future Real AI Integration Plan

Future versions should connect Gemini or OpenAI APIs through a backend boundary and require strict structured JSON output. The UI should keep the current typed data contracts where possible so mock recommendations can be replaced with validated live multi-agent responses.

Planned integration path:

1. Define strict agent response schemas.
2. Add backend orchestration endpoints.
3. Validate model output before rendering.
4. Preserve human review before Crisis Commander activation.
5. Keep mock data available for demos and offline development.
