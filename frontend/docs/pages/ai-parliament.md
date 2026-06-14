# AI Parliament

AI Parliament is the flagship multi-agent deliberation and consensus engine for Project Aegis / Bharat Nerves Platform. It is the most architecturally unique feature in the system.

## Concept

AI Parliament simulates a National Decision Council — 8 specialized AI expert agents debating and negotiating a crisis response plan. The page tells a deliberation story:

1. **Crisis arrives** — a scenario is loaded and briefed to all agents.
2. **Agents debate** — each agent submits its position based on its domain expertise.
3. **Agents disagree** — conflict levels and opposing positions are surfaced.
4. **Consensus emerges** — rounds of deliberation reduce conflict and build alignment.
5. **Recommendation is produced** — a governance-ready output is generated.
6. **Crisis Commander receives final plan** — the recommendation is handed off for human approval.

## Page Purpose

Present a live-feeling multi-agent deliberation experience that makes judges immediately understand this is a different kind of intelligence product — not a dashboard, not a table of cards. A strategic consensus platform.

## AI Parliament Role in Project Aegis

AI Parliament is the reasoning layer between Scenario Simulator and Crisis Commander. It converts corridor stress, humanitarian priorities, trade risk, and policy constraints into structured, consensus-backed recommendations ready for human review.

## Agent Roster

| Agent | Role | Focus |
|---|---|---|
| Infrastructure Guardian | Infrastructure Resilience | Ports, roads, power assets, logistics hubs |
| Environment Sentinel | Environmental Risk | Carbon exposure, floodplain risk, ecological sensitivity |
| Humanitarian Advocate | Citizen Safety | Hospitals, relief centers, evacuation access |
| Economic Strategist | Economic Continuity | Trade disruption, port downtime, recovery implications |
| Logistics Optimizer | Supply Chain Routing | Corridor alternatives, supply movement options |
| Risk Analyst | Risk Intelligence | Cascading risks across infrastructure and health systems |
| Tech Innovator | Digital Systems | Automation, data platforms, predictive tools |
| Policy Advisor | Governance | Administrative feasibility, compliance, coordination |

## Deliberation Workflow

```
Scenario Loaded
     ↓
All 8 Agents Briefed
     ↓
Agents Submit Initial Positions
     ↓
Round 1 Deliberation (cross-agent conflict detection)
     ↓
Consensus Building (alignment scoring)
     ↓
Final Recommendation Generated
     ↓
Crisis Commander Handoff
```

## Consensus Scoring

The consensus score (0–100%) measures agent alignment across all recommendations:

- **72%+** — Good Agreement (green gauge)
- **50–71%** — Partial Agreement (yellow gauge)
- **< 50%** — Low Agreement (red gauge)

Breakdown categories: Agree / Partial / Disagree / Neutral

## Layout Structure (Issue #20 Reference Design)

```
┌─────────────────────────────────────────────────────────┐
│  Parliament tabs + New Session action                   │
├──────────────────────────────┬──────────────────────────┤
│  Session Header              │  Consensus Summary       │
│  — scenario, session ID      │  — large gauge           │
│  — start time, participants  │  — agreement breakdown   │
│  — objectives, timer, brief  │  — agreed priority       │
├──────────────────────────────┼──────────────────────────┤
│  AI Agents Grid (8 cards)    │  Decision Timeline       │
│  — live position             │  — live indicator        │
│  — confidence bar            │  — time markers          │
│  — status dot (animated)     │  — connected live nodes  │
│  — View All Discussions btn  │  — status markers        │
│                              │  — step-by-step progress │
├─────────────────┬────────────────────┬──────────────────┤
│  Parliament     │  Key Discussion     │  Key Metrics     │
│  Recommendation │  Insights           │  — 4 compact KPIs│
│  — proposed     │  — 4 dense rows     │                  │
│  — priorities   │  — rail + icon      │                  │
│  — CTA button   │                    │                  │
└─────────────────────────────────────────────────────────┘
```

Single-screen hierarchy:

- Top navigation strip: `ParliamentSessionTabs`
- Left operational column: `ParliamentSessionSummary` above the 4-column × 2-row `AgentGrid`
- Right operational column: large `ConsensusPanel` above full-height `AgentTimeline`
- Bottom row: `FinalRecommendationPreview`, `KeyDiscussionInsights`, and `KeyMetrics`
- The route intentionally renders no below-fold sections and no page scrollbar

The screen is intentionally dense for 1440×900, 1512×982, and MacBook-class screens. AI Parliament follows the standard app theme system and must render cleanly in both light and dark modes.

Historical sidebar variant, now superseded:

```
┌─────────────────┬───────────────────────────────────────┐
│  Parliament     │  Key Discussion Insights              │
│  Recommendation │  — agree/debate/info insight cards    │
│  — proposed     │                                       │
│  — priorities   │                                       │
│  — CTA button   │                                       │
│                 │  Key Metrics were formerly sidebar    │
└─────────────────┴───────────────────────────────────────┘
```

## Components

Agent-specific components in `src/components/agents/`:

| Component | Purpose |
|---|---|
| `ParliamentSessionTabs` | Compact tab strip with New Session action |
| `ParliamentSessionSummary` | Compact session header with scenario, meta, timer, objectives, and View Brief |
| `AgentGrid` | 8 live deliberation cards with animated status dots |
| `ConsensusPanel` | SVG gauge + agree/partial/disagree breakdown |
| `AgentTimeline` | Step-by-step decision timeline with live indicator |
| `FinalRecommendationPreview` | Parliament recommendation with priority bars + CTA |
| `KeyDiscussionInsights` | Four dense insight rows with status icons and colored rails |
| `KeyMetrics` | Compact 4-metric command-center widget in the bottom-right slot |
| `PriorityBreakdown` | Stakeholder priority weight bars |
| `AgentRecommendationMatrix` | Detail table component retained for future detail surfaces; not rendered on AI Parliament |

Shared components are still available for lower-detail content, but the first-viewport AI Parliament widgets use direct `surface-card` compositions to control density and reference-image proportions.

## Data Sources

All mock data in `src/data/parliament.ts`:

- `parliamentSession` — scenario, session ID, start time, timer, objectives
- `agentRecommendations` — each agent's position, confidence, conflict level, status
- `parliamentConsensus` — score, agree/partial/disagree/neutral %, top priority
- `parliamentTimeline` — step-by-step deliberation milestones
- `finalRecommendation` — proposed decision, implementation priorities, CTA
- `keyDiscussionInsights` — insight cards with type (agree/debate/info)
- `parliamentMetrics` — 4 key metrics (agents, factors, rounds, response time)
- `stakeholderPriorities` — priority weight breakdown

## Removed Sections

The refined AI Parliament route intentionally removed earlier prototype elements that made the page feel like a generic dashboard:

- Dominant recommendation matrix table on the primary route
- Loose stacked cards below the fold
- Generic page header inside the content area
- Oversized sidebar widgets
- Repetitive explanation blocks
- Any long scrolling deliberation report

The matrix component remains available for future detail surfaces, but it is not rendered in the reference-matched command view.

## Added Sections

The current implementation adds the reference-matched intelligence workspace:

- Topbar-integrated `AI PARLIAMENT` title treatment
- Parliament session tabs
- Compact session summary
- Eight-agent live deliberation grid
- Consensus score gauge
- Decision timeline
- Parliament recommendation panel
- Key discussion insights
- Key metrics panel

## Responsive Behavior

The page is optimized for 1440x900, 1512x982, and MacBook-class screens. The current composition is intentionally dense and viewport-constrained so the session summary, agent grid, consensus panel, timeline, recommendation, insights, and metrics remain visible as a single command-center experience.

On smaller screens the grid can stack through CSS layout behavior, but the design target is the executive desktop command view.

## Visual Design Principles

- **Animated live dots**: pulsing green (aligned), pulsing yellow (reviewing), static blue (prepared)
- **Per-agent color accents**: each of the 8 agents has a distinct icon + color accent
- **SVG gauge**: semicircular arc showing consensus score with smooth transition
- **Colored insight cards**: green/yellow/blue borders matching insight type
- **Bottom-right metrics**: four icon KPIs placed beside recommendation and insights, not in the right sidebar
- **No page scrolling**: the complete AI Parliament route fits inside one viewport
- **No dominant table on the route**: the matrix is removed from this single-screen command view
- **Theme compatibility**: all widgets use CSS variable tokens and support both light and dark themes

## Current Implementation Notes

- Frontend-only. No real AI calls run.
- No Gemini/OpenAI/backend integration.
- All deliberation is structured mock data.
- The page intentionally looks live (status dots, timer, Live badge) to communicate the future real architecture.
- The route is viewport-constrained and hides overflow to preserve the reference command-center composition.

## Future Real AI Architecture

1. Define strict JSON response schemas per agent.
2. Backend orchestration endpoint handles multi-model calls in parallel.
3. Structured outputs validated before rendering.
4. Conflict detection run server-side.
5. Human review gate before Crisis Commander activation.
6. Mock data remains available for demos and offline dev.

## Issue History

- **Issue #20** — AI Parliament MVP Refinement: Full redesign from static card list to live deliberation storytelling page. Added gauge consensus, animated agent cards, decision timeline, discussion insights, key metrics. Reduced table dominance.
- **Issue #20 Full Rebuild Pass** — Complete ground-up rebuild targeting 95% visual parity with reference. Changes:
  - Session header made compact and horizontal: tabs above, scenario + Live badge + meta row + objectives + timer in one card
  - Agent grid moved to **4-column × 2-row** layout (all 8 visible simultaneously), compact `h-7` icon badges, per-agent color-coded confidence bars, smaller text scale, no `SectionCard` wrapper
  - ConsensusPanel redesigned: SVG gauge + agreement legend rendered side-by-side; shield icon + "Good Agreement" badge at bottom; removed status tile grid
  - AgentTimeline uses smaller dot-and-line structure with timestamps right-aligned; pending items dimmed; no `SectionCard` wrapper
  - FinalRecommendationPreview renamed to "Parliament Recommendation"; numbered priority bars replacing labeled grid; compact footer link + CTA
  - KeyDiscussionInsights simplified to plain icon+text vertical list — no colored backgrounds, cleaner contrast
  - KeyMetrics moved into right sidebar below timeline; uses distinct icon accent colors
  - Page layout: right sidebar = ConsensusPanel → AgentTimeline → KeyMetrics; bottom row = Recommendation left + Insights right (inside left column); matrix below fold
  - All `SectionCard` wrappers removed from agent-specific components to enable tighter density control via direct surface classes
  - Decision Timeline rebuilt with timestamp LEFT of avatar circles, gradient-fill circles with step numbers (01–05), vertical connecting lines
  - KeyMetrics uses full-circle gradient icon badges matching reference
  - Page layout: `space-y-3/4` throughout, `290px` fixed sidebar, left column flex-col with agent grid hero + bottom row
  - All components use consistent `0.62rem` micro-label style, tight `p-4` or `p-3` padding, no wasted vertical space
  - **Status: AI Parliament MVP Refinement Finalized — Full Reference Rebuild Complete**
- **Issue #20 Final Reference Pass** — Ground-up pixel parity rebuild:
  - Added `isAiParliament` topbar variant in `Topbar.tsx`: "AI PARLIAMENT" title + "Multi-Agent Deliberation & Consensus Engine" subtitle, same corridor selector + notification + time + theme toggle layout as other pages
  - Removed `PageHeader` from page entirely — title lives in topbar, matching reference exactly
  - Session card: 3-column layout with `divide-x divide-border` vertical separators between title/meta, objectives, timer
  - Agent grid: `rounded-full` circular icon avatars per-agent, centered "View All Agent Discussions →" link at bottom
  - Consensus SVG: green filled arc + red warning tip overlay, score centered in gauge with "Consensus Score" label
  - Decision Timeline: timestamp LEFT column (`w-[62px]`) → gradient avatar circles with domain icons (Globe/Brain/Users/Cpu/CheckCircle) → title + description
  - All gaps `gap-3` throughout, no `PageHeader` wrapper, fits within single viewport
  - Light and dark themes fully supported via CSS variable tokens (`hsl(var(--*))` throughout)
