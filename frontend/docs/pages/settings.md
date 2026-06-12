# Settings Page

## Page Purpose

The Settings page (`/settings`) is the platform administration and configuration center for Project Aegis — Bharat Nerves Platform. It provides a structured view of all platform configuration, connected systems, AI setup, security status, and future integration roadmap.

This page is designed as a mission-control configuration panel — professional, organized, and executive-readable.

---

## Settings Categories

| Category | Description |
|---|---|
| Appearance | Theme selection (Light / Dark / System) with live switching |
| Notifications | Toggle-based notification channel configuration |
| Data Sources | Status cards for all platform data feeds |
| Integrations | External system connection status and readiness |
| AI Configuration | Model selection, agent count, and current mode |
| Security Overview | Authentication, encryption, audit, access control status |
| Platform Information | Project metadata, version, environment, region |
| System Health | Uptime, modules, data sources, build status |
| Future Integrations | Phase 2/3 integration roadmap |
| Development Settings | MVP mode configuration reference |

---

## Layout Structure

### Top Section
- `PageHeader` — title, description
- `StatusBadge` — "Configuration Center"

### KPI Row
Six `MetricCard` components:
- Connected Sources (0)
- Active Integrations (0)
- Notification Channels (6)
- AI Providers (2)
- Security Status (Demo)
- Version (1.0.0 MVP)

### Main Two-Column Layout (`xl:grid-cols-[1fr_360px]`)

**Left / Main Column:**
- `AppearanceSettings` — 3 theme option cards with active state and live apply
- `NotificationSettings` — 6 toggle rows
- `DataSourceSettings` — 6 source cards (2-column grid)
- `IntegrationSettings` — 6 integration cards (2-column grid)

**Right / Sidebar (360px):**
- `AIConfiguration` — model table + warning note
- `SecurityOverview` — 5 security status rows
- `PlatformInformation` — 7-row metadata table
- `SystemHealth` — 6 metric cards (2-column grid)

### Bottom Section
- `FutureIntegrations` — 8 roadmap cards (4-column grid)
- `DevelopmentSettings` — configuration note + 6-row dev mode table

---

## Components Used

| Component | Source |
|---|---|
| `PageHeader` | `src/components/shared` |
| `StatusBadge` | `src/components/shared` |
| `MetricCard` | `src/components/shared` |
| `SectionCard` | `src/components/shared` |
| `SettingsKpiRow` | `src/components/settings` |
| `AppearanceSettings` | `src/components/settings` |
| `NotificationSettings` | `src/components/settings` |
| `DataSourceSettings` | `src/components/settings` |
| `IntegrationSettings` | `src/components/settings` |
| `AIConfiguration` | `src/components/settings` |
| `SecurityOverview` | `src/components/settings` |
| `PlatformInformation` | `src/components/settings` |
| `SystemHealth` | `src/components/settings` |
| `FutureIntegrations` | `src/components/settings` |
| `DevelopmentSettings` | `src/components/settings` |

---

## Theme System Usage

The Settings page `AppearanceSettings` component provides a three-way theme selector:

- **Light** — forces light mode
- **Dark** — forces dark mode
- **System** — follows OS `prefers-color-scheme`

The selector writes the choice to `localStorage` under the key `project-aegis-theme` and immediately applies the `.dark` class to `document.documentElement`. This is the same key and mechanism used by the `ThemeToggle` in the Topbar — both components stay consistent on page reload because `ThemeToggle` reads from `localStorage` on mount via a `useEffect`.

The theme switching is fully functional without a theme provider or React context. It relies on the CSS variable strategy defined in `src/app/globals.css`.

---

## Current Limitations

- No backend persistence for any setting
- Notification toggles are visual only — no delivery
- Theme selection is browser-local — does not sync across devices
- Security settings are read-only demo values
- AI configuration is descriptive only — no provider connections
- Data source statuses are static mock
- No user account management
- No role-based access control
- No API key management
- No audit log

---

## Future Platform Configuration Roadmap

| Feature | Phase |
|---|---|
| Real weather API integration | Phase 2 |
| Port AIS feed integration | Phase 2 |
| Traffic and road API integration | Phase 2 |
| Railway freight API integration | Phase 2 |
| Authentication and user management | Phase 2 |
| Audit logging | Phase 2 |
| Satellite data integration | Phase 3 |
| Government data exchange | Phase 3 |
| Drone system telemetry | Phase 3 |
| Carbon accounting engine | Phase 3 |
| Multi-user access control | Phase 3 |
| AI provider live connections | Phase 2 |
