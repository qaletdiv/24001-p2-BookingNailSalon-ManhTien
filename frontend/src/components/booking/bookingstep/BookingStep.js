"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

function BookingStep() {
  const router = useRouter();
  const { step } = useSelector((state) => state.booking.currentBooking);

  useEffect(() => {
    // Default to services if step is not set or doesn't match
    if (step === "services") {
      router.push("/booking/services");
      return;
    }
    if (step === "staff") {
      router.push("/booking/staff");
      return;
    }
    if (step === "datetime") {
      router.push("/booking/datetime");
      return;
    }
    if (step === "customer") {
      router.push("/booking/customer");
      return;
    }
    if (step === "options") {
      router.push("/booking/options");
      return;
    }
    if (step === "review") {
      router.push("/booking/review");
      return;
    }
    if (step === "confirmed") {
      router.push("/booking/confirmed");
      return;
    }
  }, [step, router]);

  return null;
}

export default BookingStep;
