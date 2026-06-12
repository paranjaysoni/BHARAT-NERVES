# Theme System

Project Aegis supports both light and dark themes because Bharat Nerves is planned as a mission-control platform that may be used in different environments, lighting conditions, and presentation contexts. Future interfaces must remain readable and usable in both modes.

## CSS Variable Strategy

Theme values are defined as semantic CSS variables in `src/app/globals.css`.

- Light theme tokens live under `:root`.
- Dark theme tokens live under `.dark`.
- Tailwind maps color utilities to these variables in `tailwind.config.ts`.
- Future theme switching can be implemented by adding or removing the `dark` class on the document root.

The variables use HSL channel values so Tailwind utilities can reference them with `hsl(var(--token-name))`.

## Theme Tokens

- `background`
- `foreground`
- `card`
- `card-foreground`
- `border`
- `primary`
- `primary-foreground`
- `secondary`
- `secondary-foreground`
- `muted`
- `muted-foreground`
- `success`
- `warning`
- `danger`
- `info`

## Future Theme Toggle Plan

A later issue should add a small theme provider and user-facing toggle. The toggle should persist the selected theme, respect system preference where appropriate, and apply the `dark` class without changing component APIs.

`next-themes` may be added later if the project needs persisted theme state and hydration-safe switching.

## Developer Rules

- Do not hardcode colors in components when a semantic token exists.
- Use semantic tokens such as `bg-background`, `text-foreground`, `border-border`, and `text-muted-foreground`.
- Ensure every component works in both light and dark themes.
- Add new tokens only when the existing semantic set cannot describe the UI need.
- Keep visual styling restrained until the product layout and design system are defined.
