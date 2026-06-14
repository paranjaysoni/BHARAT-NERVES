# Resources Dashboard

## Purpose

The Resources Dashboard is the executive knowledge repository for Bharat Nerves. It provides a search-first interface for critical datasets, documents, reports, maps, models, tools, and external knowledge sources.

The implementation is a static MVP UI refinement that matches the approved Resources reference image. It does not upload, download, index, or connect to real storage.

## Layout Hierarchy

The page is implemented in `frontend/src/app/resources/page.tsx` and follows this structure:

1. Page header: `RESOURCES` with `Access critical data, documents, datasets and knowledge assets`.
2. Search and filters bar.
3. Main two-column body:
   - Left column: Resource Categories, Featured Resources, Recently Added Resources.
   - Right column: Quick Access, Storage Overview, Data Sources.

No inventory-management sections are rendered.

## Component Breakdown

The page uses local page-level components:

- `SearchAndFilters`
- `ResourceCategories`
- `QuickAccess`
- `FeaturedResources`
- `RecentlyAdded`
- `StorageOverview`
- `DataSources`
- `Panel`
- `PanelLink`
- `ResourcePreview`
- `HeatmapPreview`
- `CyclonePreview`
- `NetworkPreview`
- `PortPreview`
- `GlobePreview`

Shared shell components remain unchanged:

- `PageHeader`
- App sidebar
- App top navigation
- Bharat Nerves typography, surface, border, and color tokens

## Search Architecture

The search bar is a static visual control for the MVP. It uses an input with the placeholder `Search resources, documents, datasets...` and a separate Filters button.

Future versions should connect the input to indexed resource metadata and support filtering by category, source, date, format, owner, geography, and permission scope.

## Resource Category Cards

The category strip contains five cards:

- Datasets: `1,248`
- Documents: `3,562`
- Reports & Briefs: `842`
- Maps & Geospatial: `426`
- Models & Tools: `128`

Each card shows an icon, large count, label, and update status. The layout is intentionally compact and reference-matched.

## Quick Access Panel

The right sidebar Quick Access panel contains:

- National Data Repository
- Global Indicators
- Geospatial Library
- Policy Documents
- Research Papers

Each item has an icon, title, description, and chevron affordance.

## Featured Resources Section

Featured Resources includes static tabs:

- Recent
- Popular
- Recommended
- Shared With Me

The table columns are:

- Name
- Category
- Source
- Last Updated
- Size
- Actions

Rows shown:

- India Infrastructure Dataset 2024
- Coastal Vulnerability Index Report
- Trade Flow Data - Oct 2024
- Monsoon Impact Analysis 2024
- India Administrative Boundaries

Actions are visual download and more-menu icons only.

## Recently Added Resources Gallery

The visual gallery includes five cards:

- Air Quality Index - Nov 2024
- Cyclone Landfall Tracker
- NH-16 Corridor Analysis
- Port Capacity Utilization
- Global Economic Outlook

Preview images are CSS/SVG-generated static visuals that resemble heatmap, cyclone, corridor network, port, and global outlook assets.

## Storage Overview

The Storage Overview panel shows:

- `2.48 TB / 10 TB`
- `24.8%` progress
- Datasets: `1.12 TB`
- Documents: `680 GB`
- Maps & Geospatial: `420 GB`
- Models & Tools: `260 GB`

The Manage Storage button is a visual affordance only.

## Data Sources Panel

The Data Sources panel shows:

- Connected Sources: `28 / 45`
- IMD
- DGFT
- World Bank
- UN
- `+24`

The View All Sources button is a visual affordance only.

## Mock Data Sources

Reference-specific mock data is currently page-local:

- `categories`
- `quickAccess`
- `featuredResources`
- `recentResources`
- `storageBreakdown`
- `sources`
- `tabs`

Existing centralized data in `frontend/src/data/resources.ts` remains available for future integration but is not used by the refined reference page.

## Future Real-World Integrations

Future versions should connect the dashboard to:

- Object storage for files
- Metadata APIs
- Search indexing
- Permission and role-based access
- Government datasets
- IMD and climate feeds
- DGFT and trade feeds
- World Bank, UN, and IMF indicators
- Geospatial tile services
- Document preview and summarization services

## Design Decisions

- Search is the primary interaction.
- The dashboard emphasizes discovery, not backend inventory management.
- The featured resource table is compact and executive-readable.
- Recently added resources are visual to make the repository feel high-value.
- Colors remain within Bharat Nerves dark navy and semantic accent tokens.
- All panels use existing `surface-card`, border, radius, and typography language.

## Responsive Behavior

The layout is optimized for:

- 1440x900
- 1512x982
- MacBook screens

Large screens use a wide content column plus a right sidebar. Smaller screens collapse naturally into a single-column flow while preserving the section order.

## Known MVP Limitations

- Static mock data only.
- Search and filters are not functional.
- Tabs do not switch datasets.
- Download and menu actions are visual only.
- No upload functionality.
- No real storage integration.
- No permissions model.
- No document preview or indexing.
