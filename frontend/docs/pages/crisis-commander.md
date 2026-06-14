# Crisis Commander

## Purpose

Crisis Commander is the executive national emergency command center for Bharat Nerves. It presents the current crisis posture, incident map, response actions, operational summaries, and communications feed in one high-density command view.

The current implementation is a static MVP UI refinement that matches the approved Crisis Commander reference image. It does not call APIs, execute response plans, or connect to live GIS systems.

## Layout Hierarchy

The page is implemented in `frontend/src/app/crisis-commander/page.tsx` and follows this structure:

1. Page header: `CRISIS COMMANDER` with `Executive Decision Support & Real-time Crisis Management`.
2. Top KPI strip: six executive situation cards.
3. Middle row: `CRISIS MAP`, `ACTIVE INCIDENTS`, and `RESPONSE ACTIONS`.
4. Bottom row: `SITUATION OVERVIEW`, `RESOURCE DEPLOYMENT`, `IMPACT SUMMARY`, and `COMMUNICATIONS LOG`.

No legacy workflow sections are rendered.

## Component Hierarchy

The page uses local page-level components:

- `KpiStrip`
- `ReadinessRing`
- `CrisisMap`
- `ThreatMarker`
- `MapControl`
- `ActiveIncidentsPanel`
- `ResponseActionsPanel`
- `SituationOverviewPanel`
- `ResourceDeploymentPanel`
- `ImpactSummaryPanel`
- `CommunicationsLogPanel`
- `CommandPanel`
- `PanelLink`

Shared shell components remain unchanged:

- `PageHeader`
- App sidebar
- App top navigation
- Bharat Nerves typography, surface, border, and color tokens

## Removed Sections

The refinement removed the older MVP/workflow sections:

- Recommended Action Plan
- Resource Inventory cards
- Approval Status
- Response Matrix
- Action Checklist
- Command Timeline section
- Executive Brief cards
- Situation Overview detail boxes
- Large tables
- Long below-fold operational lists

## Added Sections

The final command-center page includes:

- Six-card KPI strip
- Static India crisis map with threat markers
- Map controls and threat legend
- Active incidents panel
- Response actions panel
- Four compact lower operational summary panels

## KPI Strip

Cards shown:

- Overall Situation: `High Risk`
- Affected Population: `12.4 Lakh`
- Economic Exposure: `₹ 12.4 Cr`
- Recovery Time (Est.): `8-12 Days`
- Active Incidents: `05`
- Response Readiness: `85%`

Response Readiness uses a circular SVG progress indicator.

## Crisis Map

The map is a static SVG command-center visual with:

- India-style outline
- State-boundary strokes
- Threat zones
- City labels
- Threat markers
- Zoom/layer controls
- Legend for Critical, High, Medium, Low, Normal, and No Data

It is a visual mock only; no GIS engine is connected.

## Active Incidents

The Active Incidents panel displays five compact incident rows:

- Cyclone Landfall
- Port Disruption
- NH-16 Corridor Blockage
- Power Outage
- Flood Warning

Each row includes icon, title, location, description, severity, and timestamp.

## Response Actions

The Response Actions panel displays:

- NDRF Teams Deployed
- Evacuation Initiated
- Port Operations
- Traffic Diversion
- Power Restoration

Statuses include `In Progress`, `Partial`, and `Completed`.

## Lower Dashboard Grid

The lower row includes:

- Situation Overview: affected states, districts, people at risk, evacuated, shelters, relief camps.
- Resource Deployment: circular deployment chart and resource counts.
- Impact Summary: economic, infrastructure, agriculture, and trade impact.
- Communications Log: operational feed with timestamps, department labels, and status dots.

## Mock Data Structures

Reference-specific mock data is page-local:

- `kpis`
- `incidents`
- `responseActions`
- `situationRows`
- `deploymentRows`
- `impactRows`
- `communications`

Centralized mock data in `frontend/src/data/crisis-commander.ts` remains available for future integration, but the refined page keeps display data local to preserve the reference layout.

## Future Integration Notes

Future versions should connect this page to:

- Live incident feeds
- GIS map layers
- Resource deployment APIs
- Crisis Commander decision workflows
- AI Parliament recommendations
- Human approval/audit logs
- Communications center events
- Impact Dashboard outputs

The first integration step should define a typed command-center view model that maps directly to the current panels.

## Design Decisions

- The crisis map is the visual centerpiece.
- The page prioritizes executive situational awareness over workflow forms.
- Information density is tuned for MacBook-class screens.
- Colors stay within Bharat Nerves dark navy and semantic accent tokens.
- All cards use existing `surface-card`, border, radius, and typography language.

## Responsive Behavior

The layout is optimized for:

- 1440x900
- 1512x982
- MacBook screens

Large screens use a three-panel middle row and four-panel lower grid. Smaller screens collapse naturally while preserving the reference section order.

## Known MVP Limitations

- Static mock data only.
- No backend API calls.
- No real GIS map.
- No operational command execution.
- No live incident updates.
- No approval workflow.
- Action buttons are visual affordances only.
