# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A full-stack nail salon booking web app ("Luxe Nail Studio") built with **Next.js 15 (App Router)** on the frontend and **Express.js** on the backend. Despite the repo name suggesting React Native, this is a web application.

## Development Commands

### Frontend (`frontend/`)
```bash
npm run dev      # Start dev server with Turbopack (port 3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Backend (`backend/`)
```bash
npm start        # Start Express server (port 4000)
```

### Environment Variables
The frontend reads `NEXT_PUBLIC_API_SERVER` to point to the backend (e.g., `http://localhost:4000`).

## Architecture

### Frontend Structure (`frontend/src/`)

```
app/                         # Next.js App Router
  (screens)/booking/         # Multi-step booking pages (6 steps)
  layout.js                  # Root layout: Header, Footer, StoreProvider
  page.js                    # Home page (Server Component, fetches data)
  StoreProvider.js            # Client Component wrapping Redux Provider
components/
  booking/                   # Booking wizard step components
  layout/                    # Header, Footer, Hero, homepage sections
  ui/                        # Shadcn UI components (do not modify manually)
  datahydrator/              # Server data → Redux bridge (Client Component)
redux/
  store.js                   # Redux store; auto-persists to sessionStorage
  slices/                    # servicesSlice, staffSlice, bookingSlice, appointmentSlice
functions/                   # Server-side data fetching (fetchServicesData, etc.)
lib/utils.js                 # cn() utility for Tailwind class merging
```

### Data Flow

1. **Server Components** (page.js, booking layouts) call `functions/fetch*.js` server-side
2. Fetched data is passed to **DataHydrator** (Client Component) which dispatches to Redux
3. **Redux store** persists to `sessionStorage` (key: `"stateDate"`) to survive page reloads
4. **Booking flow** tracks state in `bookingSlice` across 6 URL steps:
   `/booking` → `/booking/staff` → `/booking/datetime` → `/booking/customer` → `/booking/review` → `/booking/summary`
5. Final submission: `bookAppointment` async thunk POSTs to backend `/api/appointments`

### Backend

Express.js server with in-memory mock data. Three endpoints:
- `GET /api/services`
- `GET /api/staff`
- `POST /api/appointments`

No database; all data resets on server restart.

## Key Patterns

- **Default to Server Components.** Only add `"use client"` to components that need browser APIs, event handlers, or Redux hooks.
- **Redux slices** follow the pattern `{ data: [], loading, error, initialized }` with `set*`, `setLoading`, `setError`, `clear*` actions.
- **Tailwind class merging** always goes through `cn()` from `@/lib/utils`.
- **Shadcn UI** components live in `src/components/ui/` — generate new ones with the Shadcn CLI rather than writing from scratch.
- **Path alias** `@/*` maps to `src/*` (configured in `jsconfig.json`).
- **Directory naming**: lowercase-dash (e.g., `customer-info/`, not `CustomerInfo/`).
- **No TypeScript** — the codebase uses `.js` files throughout despite Cursor rules referencing TS.
- **No enums** — use plain objects/maps instead.

## Coding Guidelines (from `.cursorrules`)

- Functional components only; no class components.
- Minimize `use client` — favor RSC and pass data as props.
- Use dynamic imports (`next/dynamic`) for non-critical or heavy components.
- Optimize for Core Web Vitals: use `next/image` with proper `sizes`, lazy-load below-fold content.
- Use Shadcn UI + Radix primitives + Tailwind for all UI — no inline styles.
