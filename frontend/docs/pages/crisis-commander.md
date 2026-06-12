# Crisis Commander

Crisis Commander is the executive command center for Project Aegis / Bharat Nerves Platform.

## Page Purpose

The page presents the final operational response plan for a disruption. It brings together mock insights from Control Room, Scenario Simulator, Trade Sentinel, and AI Parliament into an executive mission-control view.

It answers:

- What is happening?
- What is the severity?
- What should we do?
- Which resources should be deployed?
- What is the expected outcome?
- What are the next actions?

## Role Inside Project Aegis

Crisis Commander is the highest-level decision page in the platform. It is intended to translate monitoring, scenario preview, trade intelligence, and multi-agent recommendations into a response plan that can be reviewed by human decision makers.

## Layout Structure

- Top section: `PageHeader` with `Command Active` status.
- KPI row: crisis severity, readiness, population risk, economic exposure, and recovery confidence.
- Main left section: situation overview, action plan, resource deployment, and command timeline.
- Right section: executive summary, active incidents, risk assessment, and approval status.
- Bottom section: response matrix, expected outcomes, and action checklist.

The layout is responsive:

- Desktop: main response plan beside executive side panel.
- Tablet: stacked command sections.
- Mobile: single-column layout.

## Components Used

- `PageHeader`
- `MetricCard`
- `AlertCard`
- `TimelineItem`
- `DataTable`
- `ProgressBar`
- `RiskPill`
- `StatusBadge`
- `SectionCard`

Commander-specific composition components live in `src/components/commander/`:

- `CrisisKpiRow`
- `SituationOverview`
- `ActionPlan`
- `ResourceDeployment`
- `ExecutiveSummary`
- `ActiveIncidents`
- `RiskAssessment`
- `ApprovalStatus`
- `CommandTimeline`
- `ResponseMatrix`
- `ExpectedOutcomes`
- `ActionChecklist`

## Data Sources Used

The page consumes centralized mock data from `src/data/`:

- `crisisKpis`
- `situationOverview`
- `commanderActions`
- `resourceDeployments`
- `executiveSummary`
- `alerts`
- `tradeAlerts`
- `crisisRiskItems`
- `approvalStatus`
- `commandTimeline`
- `expectedOutcomes`
- `commanderChecklist`

## Current Limitations

- No backend APIs.
- No real AI calls.
- No real decision engine.
- No simulation execution.
- No live data fetching.
- No resource optimization algorithms.
- No report generation backend.

## Future AI Integration Plan

Future versions should receive validated, structured outputs from AI Parliament and combine them with live Control Room, Scenario Simulator, and Trade Sentinel data. Any AI-generated action plan should remain human-reviewed before execution.

Recommended path:

1. Add backend command-plan endpoints.
2. Validate AI Parliament recommendations with strict schemas.
3. Connect live incident and resource feeds.
4. Add human approval workflows.
5. Generate auditable response reports.
