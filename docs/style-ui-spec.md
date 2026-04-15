# Luxe Nail Studio — UI Style Specification

## Fonts

| Font | Role | CSS Variable | Weights |
|---|---|---|---|
| **Montserrat** | Primary sans-serif — body text, UI labels | `--font-montserrat-mono` | 100–900 |
| **Tangerine** | Display / decorative cursive — section headings | `--font-tangerine` | 400, 700 |
| **Roboto** | Secondary fallback sans-serif | — | — |

---

## Color Palette

### Brand Colors (Custom)

| Name | Hex | Usage |
|---|---|---|
| Dust Rose / Warm Taupe | `#dfba9f` | Primary brand accent — buttons, active states, highlights (`--foreground`) |
| Cream | `#f9f1ec` | Page background (`--background`) |
| Near-Black | `#0b0b0b` | Footer background |
| Gold | `#d4af37` | Decorative accents (footer hexagon pattern) |
| Brown-Gold Dark | `#c38a20` / `#8b5a08` | Gradient tones — scrollbar, metallic effects |

### Shadcn / CSS Design Tokens

#### Light Mode (default)
| Token | Value | Usage |
|---|---|---|
| `--background` | `#f9f1ec` | Page background |
| `--foreground` | `#dfba9f` | Primary brand accent |
| `--primary` | `oklch(0.208 0.042 265.755)` | UI primary (dark blue-tone) |
| `--primary-foreground` | `oklch(0.984 0.003 247.858)` | Text on primary |
| `--secondary` | `oklch(0.968 0.007 247.896)` | Subtle background |
| `--muted` | `oklch(0.968 0.007 247.896)` | Muted surfaces |
| `--accent` | `oklch(0.968 0.007 247.896)` | Accent surfaces |
| `--border` | `oklch(0.929 0.013 255.508)` | Light gray borders |
| `--card` | `#ffffff` | Card / surface white |

#### Dark Mode
| Token | Value |
|---|---|
| `--background` | `oklch(0.129 0.042 264.695)` |
| `--foreground` | `oklch(0.984 0.003 247.858)` |
| `--primary` | `oklch(0.929 0.013 255.508)` |
| `--secondary` | `oklch(0.279 0.041 260.031)` |

---

## Border Radius

| Variable | Value | Tailwind Equivalent | Usage |
|---|---|---|---|
| `--radius` (base) | `0.625rem` (10 px) | `rounded-lg` | Default radius |
| `--radius-sm` | `0.375rem` (6 px) | `rounded-md` | Input fields, small cards |
| `--radius-md` | `0.5rem` (8 px) | `rounded-md` | Service cards |
| `--radius-lg` | `0.625rem` (10 px) | `rounded-lg` | Staff selection cards |
| `--radius-xl` | `0.875rem` (14 px) | `rounded-xl` | Buttons |
| — | `100px` | `rounded-[100px]` | Pill / CTA buttons |
| — | `9999px` | `rounded-full` | Circular icon buttons |
| — | `1rem` (16 px) | `rounded-2xl` | Feature containers |

---

## Common UI Patterns

### Buttons
```
Primary:   bg-foreground (#dfba9f) · text-neutral-900 · px-8 py-4 · rounded-xl
Pill CTA:  rounded-[100px] or rounded-full
Hover:     hover:bg-neutral-900 hover:text-foreground · transition-colors duration-300
```

### Header
```
Background: bg-black opacity-90
Text:       text-white / text-neutral-100
Active nav: text-[#dfba9f]
```

### Cards / Containers
```
Surface:    bg-white · shadow-md or shadow-lg
Accent:     bg-foreground (#dfba9f)
Dark:       bg-black or bg-[#0b0b0b]
Border:     border-2 border-gray-300 or border-2 border-foreground
```

### Gradients
```
Hero title:   Gold → Brown linear gradient (Hero.module.css)
Scrollbar:    linear-gradient(180deg, #050503, #c48b00)
Footer gold:  SVG linearGradient with opacity transitions
```

---

## Transitions & Animations

| Purpose | Class |
|---|---|
| Color change | `transition-colors duration-300` |
| General / layout | `transition-all duration-1000 ease-out` |
| Carousel slide | `transition-transform duration-500 ease-out` |
| Mobile menu slide | `transition-transform duration-300 ease-in-out` |
| Visual feedback scale | `scale-100` ↔ `scale-95` |
