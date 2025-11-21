"use client";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { resetBooking } from "@/redux/slices/bookingSlice";
import { useRouter } from "next/navigation";

const CancelModal = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  // Handle opening animation
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      // Small delay to ensure DOM is ready before starting animation
      setTimeout(() => {
        setIsOpening(true);
      }, 10);
    } else {
      setIsOpening(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setIsOpening(false);
    setTimeout(() => {
      onClose();
    }, 300); // Match the animation duration
  };

  const handleConfirmCancel = () => {
    // Reset all booking state to initial
    dispatch(resetBooking());
    // Navigate back to booking page
    router.push("/booking");
    handleClose();
  };

  // Close on overlay click
  const handleOverlayClick = (e) => {
    if (e.target.id === "cancel-overlay") {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop/Overlay */}
      <div
        id="cancel-overlay"
        onClick={handleOverlayClick}
        className={`fixed top-0 left-0 w-full h-full bg-black z-50 transition-opacity duration-300 ${
          isClosing ? "opacity-0" : isOpening ? "opacity-50" : "opacity-0"
        }`}
      ></div>

      {/* Modal Content */}
      <div
        className={`fixed bottom-0 left-0 w-full h-1/2 bg-white rounded-t-3xl shadow-2xl z-50 transition-transform duration-300 ease-out ${
          isClosing || !isOpening ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              Cancel Booking?
            </h2>
            <p className="text-gray-700">
              Are you sure you want to cancel? All your selections will be lost.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 md:flex-row md:w-3/4 w-full mx-auto">
            <button
              onClick={handleConfirmCancel}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-4 py-3 rounded-full transition-colors"
            >
              Yes, Cancel Booking
            </button>
            <button
              onClick={handleClose}
              className="w-full bg-gray-200 hover:bg-gray-300 text-neutral-900 font-bold text-lg px-4 py-3 rounded-full transition-colors"
            >
              Keep Booking
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelModal;
