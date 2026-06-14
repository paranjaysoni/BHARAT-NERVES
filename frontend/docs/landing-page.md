# Project Aegis — Landing Page Documentation

## Purpose

The landing page at `/` serves as the public-facing marketing and onboarding entry point for Project Aegis. It communicates the platform's value proposition to government stakeholders, institutional decision-makers, and administrators before they log in.

---

## Routing Architecture

### Route Groups (Next.js App Router)

| Group | Path | Layout |
|-------|------|--------|
| `(public)` | `/` | No sidebar, no AppShell — clean public layout |
| `(app)` | `/control-room`, `/scenario-simulator`, etc. | Full AppShell (Sidebar + Topbar) |

### How it works

```
src/app/
  layout.tsx                    ← Minimal root: html/body only, no AppShell
  (public)/
    layout.tsx                  ← Public layout wrapper (passthrough)
    page.tsx                    ← Landing page at /
  (app)/
    layout.tsx                  ← AppShell injected here for all dashboard routes
    control-room/page.tsx
    scenario-simulator/page.tsx
    ai-parliament/page.tsx
    crisis-commander/page.tsx
    impact-dashboard/page.tsx
    trade-sentinel/page.tsx
    reports/page.tsx
    resources/page.tsx
    settings/page.tsx
    component-preview/page.tsx
    loading.tsx
```

Route groups `(public)` and `(app)` are transparent to URL resolution — the parentheses are never part of the URL. `(public)/page.tsx` resolves to `/` and `(app)/control-room/page.tsx` resolves to `/control-room`.

---

## Sections & Components

All components live in `/src/components/landing/`.

| Component | Section | Notes |
|-----------|---------|-------|
| `LandingNavbar.tsx` | Navigation | Sticky, scroll-aware, mobile hamburger menu |
| `HeroSection.tsx` | Hero | Imports `ProductPreview`, uses `animate-page-enter` |
| `ProductPreview.tsx` | Hero (right panel) | CSS dashboard mockup with SVG dot map, animated float |
| `MetricsStrip.tsx` | Metrics | 4 KPI tiles with icons |
| `CapabilitiesSection.tsx` | Platform capabilities | 6 capability cards with links to dashboard routes |
| `ScenarioShowcase.tsx` | Scenarios | Left text + 4 scenario cards with gradient backgrounds |
| `TrustedInstitutions.tsx` | Institutions | NDRF, IMD, MoS, AICTE, NIC, ISRO, etc. |
| `TestimonialsSection.tsx` | Social proof | 3 fictional/neutral testimonials |
| `FinalCTA.tsx` | Bottom CTA | Routes to `/control-room` |
| `LandingFooter.tsx` | Footer | Logo, links, copyright |

---

## CTA Routing

| CTA | Destination |
|-----|-------------|
| "Access Command Center" (hero) | `/control-room` |
| "Login" (navbar) | `/control-room` |
| "Explore Scenarios" | `/scenario-simulator` |
| Capability card "Explore →" links | Various dashboard routes |
| "Access Command Center" (final CTA) | `/control-room` |

---

## Theme Support

The landing page uses only semantic CSS custom property tokens:

- `bg-background`, `text-foreground` — root surface and text
- `bg-card`, `border-border` — card surfaces
- `text-muted-foreground` — secondary text
- `text-blue-500`, `text-cyan-400` — accent (Tailwind utility, works in both themes)
- `bg-primary`, `text-primary-foreground` — primary buttons

Dark mode tokens are defined in `globals.css` under `.dark {}`. The page works in both light and dark themes without any hardcoded color values.

**Exception:** `ProductPreview.tsx` uses hardcoded `slate-*` and `white` colors intentionally — the dashboard mockup is always rendered in dark style as a design choice (it represents a dark-themed command interface).

---

## Animations

| Animation | Source | Applied to |
|-----------|--------|------------|
| `animate-page-enter` | `globals.css` keyframe | Hero left panel |
| `animate-card-in` | `globals.css` keyframe | Hero right panel (ProductPreview) |
| `hero-float` | Inline `<style>` in `ProductPreview.tsx` | ProductPreview floating |
| `scan-line` | Inline `<style>` in `ProductPreview.tsx` | India map scan effect |
| `pulse-dot` | Inline `<style>` in `ProductPreview.tsx` | Alert dots |
| `scroll-bob` | Inline `<style>` in `HeroSection.tsx` | Scroll indicator |
| `prefers-reduced-motion` | `globals.css` | All animations disabled |

---

## Responsiveness

| Breakpoint | Behavior |
|-----------|----------|
| Mobile (<640px) | Hero stacks vertically, single-column cards, hamburger menu |
| Tablet (640–1023px) | 2-column grids, full navbar |
| Desktop (1024px+) | Full 2-column hero, 3-column capability grid, sticky navbar |

---

## MVP Limitations

- "Request Access" button has no form/modal behind it yet
- "Watch Platform Overview" button has no video modal
- Testimonials are fictional/representative
- Institution logos are text-based (no real official logos)
- No analytics/tracking integrated
- No i18n (English only)
- `ProductPreview` is a static CSS mockup, not a live iframe

---

## Future Improvements

- Add a "Request Access" modal with email form (Supabase or form backend)
- Add scroll-based reveal animations (Intersection Observer)
- Add real institution partnership logos once partnerships are formalized
- Add video modal for platform overview
- Add animated metric counters (count up on scroll-into-view)
- Add i18n support (Hindi, regional languages)
- SEO: add OpenGraph metadata, structured data
- Add A/B test variants for hero headline
