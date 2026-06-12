# Component System

The Project Aegis component system provides reusable dashboard building blocks for future product pages. These components are intentionally generic and presentation-only. They do not contain backend calls, AI logic, map integrations, simulation engines, or business calculations.

## Purpose

Shared components keep the Bharat Nerves Platform visually consistent across Control Room, Scenario Simulator, Trade Sentinel, AI Parliament, Crisis Commander, Impact Dashboard, Resources, Reports, and Settings.

They are designed for:

- Mission-control dashboard layouts
- Reusable KPI and status surfaces
- Placeholder-friendly page development
- Future composition into real product pages

## Component List

- `PageHeader`: Page title, description, and optional actions.
- `SectionCard`: Bordered card wrapper with optional title, description, action, and custom class.
- `MetricCard`: KPI card with value, optional icon, trend, and semantic status.
- `StatusBadge`: Reusable status pill with size and semantic variant.
- `RiskPill`: Risk-level pill for low, medium, high, and critical states.
- `ProgressBar`: Accessible progress indicator.
- `AlertCard`: Alert item display with severity, timestamp, and optional icon.
- `ScenarioCard`: Scenario simulator preview card with severity and optional action.
- `AgentCard`: AI Parliament agent profile card.
- `TimelineItem`: Activity log or decision timeline item.
- `ChartCard`: Wrapper for future chart components.
- `EmptyState`: Reusable no-data or not-started placeholder.
- `DataTable`: Simple typed table wrapper.
- `MapPlaceholder`: Digital twin placeholder before map integration.

## Props Overview

Each component exports a TypeScript props interface from its file and through `src/components/shared/index.ts`.

Example:

```tsx
import { MetricCard } from "@/components/shared";

<MetricCard
  title="Resilience Score"
  value="78"
  subtitle="Composite corridor readiness"
  trend="stable"
  trendDirection="neutral"
  status="success"
/>
```

`DataTable` is generic and expects typed columns:

```tsx
import { DataTable, type DataTableColumn } from "@/components/shared";
import type { Report } from "@/types";

const columns: DataTableColumn<Report>[] = [
  {
    key: "title",
    header: "Report",
    cell: (report) => report.title
  }
];
```

## Theme Rules

- Use semantic Tailwind tokens from the CSS variable system.
- Prefer `bg-background`, `bg-card`, `text-foreground`, `text-card-foreground`, `text-muted-foreground`, `border-border`, `text-primary`, and `bg-primary`.
- Use semantic accents such as `success`, `warning`, `danger`, and `info`.
- Do not hardcode one-theme-only colors.
- Check components in both light and dark mode using the app theme toggle.

## Shared vs Page-Specific Components

Create a shared component when:

- The pattern appears on multiple product pages.
- The component has reusable layout or visual behavior.
- The props can stay domain-light and composable.

Create a page-specific component when:

- The component exists for one workflow only.
- It contains page-specific data presentation.
- It would make the shared component API too broad or confusing.

## Component Preview Route

Use `/component-preview` during development to inspect the shared components with mock data.

This route is internal and should not be treated as a product page.

## Future Enhancement Notes

- Add formal visual regression checks when the UI stabilizes.
- Add keyboard and interaction tests for complex components.
- Replace `ChartCard` contents with Recharts only when chart work begins.
- Replace `MapPlaceholder` with map components only when map integration begins.
- Consider design tokens for radius, spacing, and elevation if the system grows.
