export const BOOKING_STEPS = [
  { key: "services", path: "/booking/services", label: "Services" },
  { key: "staff", path: "/booking/staff", label: "Staff" },
  { key: "options", path: "/booking/options", label: "Options" },
  { key: "datetime", path: "/booking/datetime", label: "Date & Time" },
  { key: "review", path: "/booking/review", label: "Review" },
  { key: "customer", path: "/booking/customer", label: "Your Info" },
  { key: "summary", path: "/booking/summary", label: "Summary" },
];

export const STEP_BY_KEY = Object.fromEntries(
  BOOKING_STEPS.map((step, index) => [step.key, { ...step, index }])
);
