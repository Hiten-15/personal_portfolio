# Design System — Portfolio UI

Use this checklist for new UI work. See [DESIGN_THEMING.md](DESIGN_THEMING.md) for color tokens.

## Typography

| Use case       | Tailwind              | Notes                          |
| -------------- | --------------------- | ------------------------------ |
| Hero headline  | `font-serif text-5xl` | Source Serif 4, weight 600–700 |
| Section titles | `font-serif text-3xl` | Serif headings                 |
| Eyebrow labels | `text-xs uppercase tracking-widest` | 11–12px, letter-spacing |
| Body           | `text-base`           | System sans (Helvetica stack)  |
| Meta / labels  | `text-sm text-muted`  | Secondary copy                 |

Headings use `font-serif`. Body and UI use the default sans stack.

## Spacing (8pt grid)

Prefer: `p-2` (8px) · `p-4` (16px) · `p-6` (24px) · `p-8` (32px) · `gap-4` · `gap-6`

Max content width: `max-w-content` (1160px), centered with `px-10`.

## Icons

- **Set**: `react-icons` only (e.g. `FaGithub`, `FaLinkedin`, `HiArrowUp`, `HiArrowTopRightOnSquare`).
- **Sizes**: `h-4 w-4` (16px), `h-5 w-5` (20px), or `h-6 w-6` (24px).
- Do not introduce a second icon library.

## Motion

- **Duration**: 150ms–250ms (`duration-150`, `duration-200`).
- **Easing**: `ease-out` or `ease-in-out`.
- **Keyframes** (in `frontend/src/index.css`): `fadeUp`, `pulse`, `floaty`, `marquee`.
- Respect `prefers-reduced-motion: reduce` — disable or shorten animations.

## Hover system

- **Cards**: `hover:-translate-y-1 hover:shadow-lg transition-all duration-200`
- **Buttons**: Use `Button` variants — do not add ad-hoc `hover:bg-gray-*`.
- **Links**: `hover:text-primary-dark` or underline on hover.

## Focus (accessibility)

- Use `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2` on interactive elements.
- Never remove focus styles without an equivalent.

## Component variants

Define variants centrally in `frontend/src/components/ui/`:

- **Button**: `primary`, `outline`, `ghost`
- **Card**: default surface card with border and radius
- **Pill**: tag chips and social link pills
- **Badge**: availability dot badge
- **SectionHeader**: `01 – About` numbered section pattern

## Elevation

- **Cards**: subtle border `border-border`, hover shadow on lift.
- **Nav**: `backdrop-blur-sm` with semi-transparent cream background; theme toggle (`ThemeToggle` / Flowbite `ToggleSwitch`) on the left.
- **Contact block**: blue gradient background, no card shadow.

## Layout patterns

- Single-page scroll with sticky nav and anchor links.
- Section order: Hero → Marquee → About → Experience → Projects → Skills → Contact.
- Grids: Hero 2-col · Projects 3-col · Skills 4-col · Experience stacked cards.
