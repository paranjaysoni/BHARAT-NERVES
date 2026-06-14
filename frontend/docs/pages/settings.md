# Settings Dashboard

## Purpose

The Settings Dashboard is the clean account-preferences and configuration center for Bharat Nerves. It focuses on user profile, notifications, security, platform preferences, privacy, system preferences, and product information.

The current implementation is a static MVP UI refinement that matches the approved Settings reference image. It does not persist settings, authenticate users, or connect to backend configuration services.

## Layout Hierarchy

The page is implemented in `frontend/src/app/settings/page.tsx` and follows this structure:

1. Page header: `SETTINGS` with `Manage your account, preferences, security and system configuration`.
2. Row 1: `PROFILE SETTINGS`, `NOTIFICATION PREFERENCES`, `SECURITY SETTINGS`.
3. Row 2: `PLATFORM PREFERENCES`, `DATA & PRIVACY`, `SYSTEM PREFERENCES`.
4. Bottom full-width panel: `ABOUT PROJECT AEGIS`.

No KPI row, right sidebar, admin dashboard, provider architecture, feed cards, or infrastructure widgets are rendered.

## Profile Settings

The Profile Settings card displays:

- Avatar with initials: `AS`
- Full Name: `Amit Sharma`
- Email Address: `amit.sharma@bharatnerves.gov.in`
- Role: `National Security Analyst`
- Organization: `Bharat Nerves Platform`
- Timezone: `Asia/Kolkata (IST)`
- Button: `Save Changes`

The avatar edit button and field rows are visual-only controls.

## Notification Preferences

The Notification Preferences card contains toggle rows:

- Critical Alerts: on
- Risk Updates: on
- Report Notifications: on
- System Updates: off
- Email Digest: on

Button: `Save Preferences`

Toggles are static visual controls in the MVP.

## Security Settings

The Security Settings card contains:

- Password: `********`
- Two-Factor Authentication: `Enabled`
- Session Management: `3 active sessions`
- Login Activity: `View recent activity`
- API Access Tokens: `2 active tokens`
- Button: `Manage Security`

All rows are visual navigation affordances only.

## Platform Preferences

The Platform Preferences card contains:

- Default Dashboard: `Control Room`
- Theme: `Dark`
- Data Refresh Rate: `5 minutes`
- Language: `English`
- Time Format: `12 Hour (AM/PM)`
- Button: `Save Preferences`

Selectors are static visual controls in the MVP.

## Data & Privacy

The Data & Privacy card contains:

- Data Sharing
- Privacy Settings
- Data Retention
- Export My Data
- Delete Account
- Button: `Manage Data`

Delete Account is styled with the danger semantic token.

## System Preferences

The System Preferences card contains:

- Alert Thresholds
- Geographic Settings
- Integration Settings
- Performance Settings
- Maintenance Window
- Button: `System Configuration`

These rows are visual navigation affordances only.

## About Section

The About Project Aegis footer panel displays:

- `Bharat Nerves Platform - AI Powered National Security & Economic Intelligence System`
- Version: `1.0.0`
- Build: `2024.11.28.1142`
- Links: Documentation, Support, Privacy Policy, Terms of Service

Links are visual-only controls.

## Mock Data Structure

Reference-specific mock data is page-local:

- `profileFields`
- `notifications`
- `securityItems`
- `platformPreferences`
- `privacyItems`
- `systemItems`
- `aboutLinks`

Centralized mock data in `frontend/src/data/settings.ts` remains available for future integration, but the refined page keeps display data local to preserve the reference layout.

## Removed Sections

The refined Settings page intentionally removes prior admin/infrastructure sections:

- Connected Sources KPI
- Integrations KPI
- Notifications KPI
- AI Providers KPI
- Security KPI
- Version KPI
- AI Configuration panel
- Security Overview panel
- Platform Information panel
- System Health panel
- Data Sources section
- Integrations section
- Future Integrations section
- Development Settings section
- Mock API/feed cards
- Provider architecture sections
- Infrastructure/admin widgets

## Component Architecture

The page uses local page-level components:

- `ProfileSettings`
- `NotificationPreferences`
- `SecuritySettings`
- `PlatformPreferences`
- `DataPrivacy`
- `SystemPreferences`
- `AboutProjectAegis`
- `SettingsCard`
- `ActionRow`
- `Toggle`
- `CardButton`

Shared shell components remain unchanged:

- `PageHeader`
- App sidebar
- App top navigation
- Bharat Nerves typography, surface, border, and semantic color tokens

## Responsive Behavior

The layout is optimized for:

- 1440x900
- 1512x982
- MacBook screens

Large screens render a three-column card grid. Smaller screens collapse naturally through CSS grid behavior while preserving section order and avoiding horizontal overflow.

## Design Decisions

- The page is a professional user settings center, not a platform administration console.
- No top KPI row is rendered because the reference page contains none.
- No right sidebar is rendered; all content uses a full-width grid.
- Cards use consistent padding, soft borders, and dark navy Bharat Nerves surfaces.
- Destructive account actions use the existing danger token.
- Buttons and rows are visual affordances only in the MVP.

## Future Integrations

Future versions should connect the page to:

- User profile APIs
- Authentication and session management
- Two-factor authentication settings
- Notification delivery preferences
- Role and organization metadata
- Privacy and data export workflows
- Real system preference persistence
- Account deletion workflows with confirmation and audit logging

## Known MVP Limitations

- Static mock data only.
- No backend API calls.
- No save functionality.
- Toggles do not persist.
- Selectors do not open menus.
- Security rows do not navigate.
- About links do not navigate.
- Delete Account is not functional.
