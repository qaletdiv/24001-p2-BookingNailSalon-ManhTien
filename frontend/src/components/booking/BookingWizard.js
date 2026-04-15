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
    <BookingContext.Provider
      value={{
        goNext,
        goBack,
        openCancelModal: () => setIsCancelModalOpen(true),
        currentStep,
        stepIndex,
        totalSteps: BOOKING_STEPS.length,
        isFirstStep: stepIndex === 0,
        isLastStep: stepIndex === BOOKING_STEPS.length - 1,
      }}
    >
      {children}
      <CancelModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
      />
    </BookingContext.Provider>
  );
}
