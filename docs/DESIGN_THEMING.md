# Design & Theming

Light and dark themes for the portfolio. Toggle via Flowbite React `DarkThemeToggle` (top-left in the navbar).

## Token source of truth

- **CSS variables**: [`frontend/src/index.css`](../frontend/src/index.css) (`:root` + `.dark`)
- **Tailwind mapping**: [`frontend/tailwind.config.ts`](../frontend/tailwind.config.ts) (`darkMode: 'class'`)

## Theme switching

| Piece | Role |
| ----- | ---- |
| `ThemeToggle` / Flowbite `ToggleSwitch` | UI control (navbar, left of logo) |
| `initThemeMode({ version: 3 })` | Syncs mode in `main.tsx` (Tailwind v3 class strategy) |
| Inline script in `index.html` | Applies saved mode before paint (no flash) |
| `localStorage` key | `flowbite-theme-mode` |

## Color palette

| Token            | Light     | Dark      | Usage                          |
| ---------------- | --------- | --------- | ------------------------------ |
| `cream`          | `#f6f4ee` | `#141612` | Page background                |
| `surface`        | `#fffefb` | `#1e211b` | Cards, nav elevated surfaces   |
| `ink`            | `#21261f` | `#f0eee6` | Primary text                   |
| `muted`          | `#6e7567` | `#a8aea0` | Secondary text                 |
| `faint`          | `#9aa092` | `#7a8074` | Labels, meta                   |
| `primary`        | `#1a5dab` | same      | CTAs, accents, links           |
| `primary-dark`   | `#103f78` | same      | Stats, gradient start, hover   |
| `primary-light`  | `#4a8de0` | same      | Scroll bar end; dark-mode stats|
| `blue-tint`      | `#e8effa` | `#1e2a3a` | Badges, availability pill      |
| `border`         | `#e3dfd3` | `#2f332c` | Card borders                   |
| `border-blue`    | `#c9d6ea` | `#3a4a5e` | Photo frame, outline buttons   |
| `on-accent`      | `#fffefb` | same      | Text on primary / blue fills   |

Brand blues stay fixed across themes so buttons and the contact gradient keep contrast. Neutrals and tints adapt under `.dark`.

## Gradients

- Scroll progress: `linear-gradient(90deg, primary, primary-light)`
- Contact section: `linear-gradient(135deg, primary-dark, primary)`

## Typography

- **Headings**: Source Serif 4 (loaded from Google Fonts)
- **Body / UI**: system sans (`-apple-system`, `Helvetica Neue`, `Arial`)

## Using tokens in code

Prefer Tailwind utilities: `bg-cream`, `text-ink`, `text-primary`, `border-border`, `text-on-accent`.

For one-off values, use the Tailwind theme — avoid hardcoded hex in components.

Do not add per-component `dark:` color overrides for neutrals; change the CSS variables instead. Use `dark:` only for rare contrast fixes (e.g. stats).

## Accessibility

- **Contrast**: Primary blue on cream / on-accent on primary meets WCAG AA for large text and buttons.
- **Reduced motion**: `prefers-reduced-motion: reduce` in `index.css` disables marquee, float, and theme color transitions.
- **Focus**: `focus-visible` / `focus:ring-primary` on interactive elements, including the theme toggle.
