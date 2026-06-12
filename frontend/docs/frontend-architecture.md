# Frontend Architecture

The Project Aegis frontend uses Next.js with the App Router, TypeScript, Tailwind CSS, and a `src/` directory.

## App Router

The App Router lives in `src/app`.

- `layout.tsx` defines the root HTML shell and metadata.
- `page.tsx` defines the current homepage placeholder.
- `globals.css` defines Tailwind layers, base styles, and theme variables.

Future product routes should be added under `src/app` as the MVP screens are introduced.

## Folder Structure

- `src/app`: Next.js App Router files.
- `src/components`: Reusable UI components grouped by product area.
- `src/layouts`: Page and application layout compositions.
- `src/hooks`: Shared React hooks.
- `src/lib`: Shared client libraries and setup helpers.
- `src/services`: Frontend service clients and API integration wrappers.
- `src/data`: Static MVP JSON data and local fixtures.
- `src/types`: Shared TypeScript types.
- `src/constants`: Shared constants and configuration values.
- `src/styles`: Additional style modules if needed later.
- `src/utils`: Shared utility functions.

## Component Organization Plan

- `components/layout`: Shell, header, sidebar, and navigation components.
- `components/dashboard`: Dashboard-specific presentation components.
- `components/map`: Map-related presentation components.
- `components/scenario`: Scenario simulator components.
- `components/agents`: AI Parliament and agent-facing components.
- `components/commander`: Crisis Commander components.
- `components/shared`: Small reusable components used across product areas.

## Data Folder Purpose

The `data` folder will hold MVP JSON datasets and fixtures, including future Odisha Cyclone Corridor nodes, routes, stress indicators, and impact assumptions.

## Services Folder Purpose

The `services` folder will hold frontend clients for future backend APIs and external integrations. It should not contain business logic that belongs on the backend.

## Future Pages Planned

- Control Room
- Scenario Simulator
- Trade Sentinel
- AI Parliament
- Crisis Commander
- Impact Dashboard
- Resources
- Reports
- Settings
