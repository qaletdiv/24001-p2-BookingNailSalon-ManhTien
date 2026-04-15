# Refactor: BookingWizard Higher-Order Component

## Why This Refactor

The booking flow currently has navigation logic duplicated across 7 step components. Each one independently calls `dispatch(setStep(...))` + `router.push(...)` and manages its own `CancelModal` state. This plan consolidates all of that into a single `BookingWizard` HOC and a shared `BookingContext`.

---

## Current Architecture (Before)

```
app/(screens)/booking/
├── layout.js          ← shared layout (header, salon info)
├── page.js            ← renders <BookingStep /> (router hub)
├── services/page.js   ← server component → <ServiceCategories>
├── staff/page.js      ← server component → <StaffList>
├── options/page.js    ← server component → <OptionsList> + <DataHydrator>
├── datetime/page.js   ← server component → <DateTime> + <DataHydrator>
├── review/page.js     ← server component → <ReviewList>
├── customer/page.js   ← server component → <CustomerInfor>
└── summary/page.js    ← server component → <Summary>

components/booking/
├── bookingstep/BookingStep.js    ← watches Redux step → router.push (being deleted)
├── ServiceSelection/
│   ├── ServiceCategories.js     ← dispatch(setStep) + router.push inside
│   ├── StaffList.js             ← dispatch(setStep) + router.push inside
│   └── OptionsList.js           ← dispatch(setStep) + router.push inside
├── datetime/DateTime.js          ← dispatch(setStep) + router.push inside
├── review/ReviewList.js          ← dispatch(setStep) + router.push + own CancelModal
├── customer/CustomerInfor.js     ← dispatch(setStep) + router.push + own CancelModal
└── summary/Summary.js            ← dispatch(setStep) + router.push + own CancelModal
```

**Problems:**
- `setStep + router.push` duplicated in 7 components
- `CancelModal` state managed independently in 3 components
- No single place defines the step order — changing order requires editing many files

---

## New Architecture (After)

### New Files

#### `src/config/bookingSteps.js`
Single source of truth for step order and paths. Adding or reordering steps only requires editing this array.

```js
export const BOOKING_STEPS = [
  { key: "services",  path: "/booking/services",  label: "Services"    },
  { key: "staff",     path: "/booking/staff",      label: "Staff"       },
  { key: "options",   path: "/booking/options",    label: "Options"     },
  { key: "datetime",  path: "/booking/datetime",   label: "Date & Time" },
  { key: "review",    path: "/booking/review",     label: "Review"      },
  { key: "customer",  path: "/booking/customer",   label: "Your Info"   },
  { key: "summary",   path: "/booking/summary",    label: "Summary"     },
];

export const STEP_BY_KEY = Object.fromEntries(
  BOOKING_STEPS.map((step, index) => [step.key, { ...step, index }])
);
```

#### `src/context/BookingContext.js`
React context providing navigation functions to all step components via `useBooking()`.

```js
"use client";
import { createContext, useContext } from "react";
export const BookingContext = createContext(null);
export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingWizard");
  return ctx;
}
```

Context value exposed to step components:
```js
{
  goNext: () => void,          // advance one step
  goBack: () => void,          // go back one step
  openCancelModal: () => void, // open the shared CancelModal
  currentStep: string,
  stepIndex: number,
  totalSteps: number,
  isFirstStep: boolean,
  isLastStep: boolean,
}
```

#### `src/components/booking/BookingWizard.js`
The HOC. Owns URL sync, provides `BookingContext`, and renders `CancelModal` once. Replaces `BookingStep.js`.

```js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { setStep } from "@/redux/slices/bookingSlice";
import { BOOKING_STEPS, STEP_BY_KEY } from "@/config/bookingSteps";
import { BookingContext } from "@/context/BookingContext";
import CancelModal from "@/components/booking/cancelmodal/CancelModal";

export default function BookingWizard({ children }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentStep = useSelector((s) => s.booking.currentBooking.step);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // Sync URL with Redux step (replaces BookingStep.js)
  useEffect(() => {
    const stepConfig = STEP_BY_KEY[currentStep];
    if (stepConfig) router.push(stepConfig.path);
  }, [currentStep, router]);

  const stepIndex = STEP_BY_KEY[currentStep]?.index ?? 0;

  const goNext = () => {
    const next = BOOKING_STEPS[stepIndex + 1];
    if (!next) return;
    dispatch(setStep(next.key));
    router.push(next.path);
  };

  const goBack = () => {
    const prev = BOOKING_STEPS[stepIndex - 1];
    if (!prev) return;
    dispatch(setStep(prev.key));
    router.push(prev.path);
  };

  return (
    <BookingContext.Provider value={{
      goNext, goBack,
      openCancelModal: () => setIsCancelModalOpen(true),
      currentStep, stepIndex,
      totalSteps: BOOKING_STEPS.length,
      isFirstStep: stepIndex === 0,
      isLastStep: stepIndex === BOOKING_STEPS.length - 1,
    }}>
      {children}
      <CancelModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
      />
    </BookingContext.Provider>
  );
}
```

---

## Modified Files

### `booking/layout.js`
- Restore all three server-side fetches (`fetchServicesData`, `fetchStaffData`, `fetchAppointmentData`)
- Add `<DataHydrator services={services} staff={staff} appointments={appointments} />`
- Replace `<BookingStep />` with `<BookingWizard>{children}</BookingWizard>`

### `booking/page.js`
- Return `null` — `BookingWizard`'s `useEffect` handles the initial redirect

### `booking/options/page.js`
- Remove local `fetchServicesData()` / `fetchStaffData()` calls (layout handles them)
- Remove the `<DataHydrator>` render

### `booking/datetime/page.js`
- Keep `fetchAppointmentData()` as a prop for `<DateTime>` (its internal filtering uses it directly)
- Remove the `<DataHydrator>` render (layout already hydrates appointments)

### Step components — universal change pattern

```js
// REMOVE from each:
import { setStep } from "@/redux/slices/bookingSlice";
import { useRouter } from "next/navigation";
const router = useRouter();
// any useEffect watching `step` to call router.push
// <CancelModal> JSX + isCancelModalOpen state (ReviewList, CustomerInfor, Summary only)

// ADD to each:
import { useBooking } from "@/context/BookingContext";
const { goNext, goBack, openCancelModal } = useBooking();

// REPLACE in handlers:
// dispatch(setStep("x")); router.push("/booking/x") → goNext() or goBack()
// setIsCancelModalOpen(true) → openCancelModal()
```

**Special case — `Summary.js`:** Keep `useRouter` for `router.push("/")` after booking confirmation (exits the flow entirely, not a step navigation). Only remove `CancelModal` and replace cancel handler with `openCancelModal()`.

**Special case — `OptionsList.js`:** Keep the `router.push("/booking/services")` guard inside the `useEffect` that fires when `currentSelected.length === 0` — this is a data-integrity guard, not step navigation.

---

## Deleted Files

- `src/components/booking/bookingstep/BookingStep.js` — fully superseded by `BookingWizard`

---

## Data Fetching Strategy

| Data | Before | After |
|---|---|---|
| `services` | Fetched in `services/page.js` + `options/page.js` | Fetched once in `layout.js`, hydrated via `DataHydrator` |
| `staff` | Fetched in `staff/page.js` + `options/page.js` | Fetched once in `layout.js`, hydrated via `DataHydrator` |
| `appointments` | Fetched in `datetime/page.js` only | Fetched in `layout.js` (Redux) + `datetime/page.js` (prop) — Next.js deduplicates the network call |

---

## Implementation Order

1. `src/config/bookingSteps.js` — no deps
2. `src/context/BookingContext.js` — no deps
3. `src/components/booking/BookingWizard.js` — depends on 1 + 2
4. `booking/layout.js` — mount BookingWizard + DataHydrator
5. `booking/page.js` — return null
6. `booking/options/page.js` — remove duplicate fetches
7. `booking/datetime/page.js` — remove DataHydrator
8. Step components (any order): ServiceCategories, StaffList, OptionsList, DateTime, ReviewList, CustomerInfor, Summary
9. Delete `BookingStep.js`

---

## Verification

1. `/booking` → auto-redirects to `/booking/services`
2. Full forward flow works end-to-end: services → staff → options → datetime → review → customer → summary → confirm → home
3. Back navigation works on all steps
4. Cancel modal appears once in DOM, works from all steps
5. Refresh mid-flow → sessionStorage restores state → redirects to correct step
6. "Add more services" modal still shows full service list (reads `state.services.services` from Redux)
7. Network tab: only 1 request each to `/api/services` and `/api/staff`
