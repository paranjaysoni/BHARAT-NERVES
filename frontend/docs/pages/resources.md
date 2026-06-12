# Resources

The Resources page is the knowledge and data library for Project Aegis / Bharat Nerves Platform.

## Page Purpose

The page organizes supporting materials used by the platform:

- Datasets
- Maps
- Policy documents
- Reports
- Emergency guidelines
- Trade documents
- Carbon references
- Simulation assets

It answers:

- What data sources support the platform?
- Which resources are available?
- What type of resource is each item?
- Which resources were recently used or updated?
- What resources are connected to the MVP demo?

## Role Inside Project Aegis

Resources is the reference library layer. It gives teammates, judges, and future operators a clear view of the structured mock resources behind the Odisha Cyclone Corridor prototype.

## Resource Categories

- Datasets
- Maps
- Reports
- Policies
- Emergency Guidelines
- Trade Documents
- Carbon References
- Simulation Assets

## Layout Structure

- Top section: `PageHeader` with `Resource Library Ready` status.
- KPI row: total resources, datasets, documents, maps, reports, and connected sources.
- Main left section: resource categories, featured resources, and resources table.
- Right section: storage overview, recent updates, data source health, and MVP data pack.
- Bottom section: integration notes and future resource pipeline.

## Components Used

- `PageHeader`
- `MetricCard`
- `SectionCard`
- `StatusBadge`
- `TimelineItem`
- `DataTable`
- `ProgressBar`
- Resources-specific composition components in `src/components/resources/`

## Data Sources Used

The page consumes centralized mock data from `src/data/resources.ts`:

- `resources`
- `resourceCategories`
- `storageOverview`
- `recentResourceUpdates`
- `dataSourceHealth`
- `mvpDataPackItems`
- `futureResourcePipeline`

## Current MVP Limitations

- No backend APIs.
- No real uploads or downloads.
- No authentication.
- No cloud storage.
- No live data fetching.
- No document processing.
- No AI summarization.

## Future Real Resource Pipeline

Future versions can connect the resource library to real datasets, APIs, government sources, weather feeds, port systems, railway systems, logistics providers, satellite feeds, and carbon emissions databases.

Recommended path:

1. Define resource metadata and storage contracts.
2. Add backend endpoints for resource listing and access control.
3. Connect approved public datasets and operational APIs.
4. Add cloud storage for files while keeping metadata typed.
5. Add validation and provenance checks before resources are used in decision workflows.
