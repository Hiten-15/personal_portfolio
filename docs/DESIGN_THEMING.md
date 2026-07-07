# Design & Theming

Single light theme for the portfolio. No dark mode in v1.

## Token source of truth

- **Tailwind config**: [`frontend/tailwind.config.ts`](../frontend/tailwind.config.ts)
- **CSS variables**: [`frontend/src/index.css`](../frontend/src/index.css)

## Color palette

| Token            | Hex       | Usage                          |
| ---------------- | --------- | ------------------------------ |
| `cream`          | `#f6f4ee` | Page background                |
| `surface`        | `#fffefb` | Cards, nav background          |
| `ink`            | `#21261f` | Primary text                   |
| `muted`          | `#6e7567` | Secondary text                 |
| `faint`          | `#9aa092` | Labels, meta                   |
| `primary`        | `#1a5dab` | CTAs, accents, links           |
| `primary-dark`   | `#103f78` | Stats, gradient start, hover   |
| `primary-light`  | `#4a8de0` | Scroll bar gradient end        |
| `blue-tint`      | `#e8effa` | Badges, availability pill      |
| `border`         | `#e3dfd3` | Card borders                   |
| `border-blue`    | `#c9d6ea` | Photo frame, outline buttons   |

## Gradients

- Scroll progress: `linear-gradient(90deg, #1a5dab, #4a8de0)`
- Contact section: `linear-gradient(135deg, #103f78, #1a5dab)`

## Typography

- **Headings**: Source Serif 4 (loaded from Google Fonts)
- **Body / UI**: system sans (`-apple-system`, `Helvetica Neue`, `Arial`)

## Using tokens in code

Prefer Tailwind utilities: `bg-cream`, `text-ink`, `text-primary`, `border-border`.

For one-off values, use the Tailwind theme — avoid hardcoded hex in components.

## Accessibility

- **Contrast**: Primary blue on cream meets WCAG AA for large text and buttons.
- **Reduced motion**: `prefers-reduced-motion: reduce` in `index.css` disables marquee and float animations.
- **Focus**: `focus-visible:ring-primary` on all interactive elements.
