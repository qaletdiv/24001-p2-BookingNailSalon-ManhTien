"use client";
import { useSelector } from "react-redux";
import { setStep } from "@/redux/slices/bookingSlice";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { useState, useEffect } from "react";
import CancelModal from "./cancelModal/CancelModal";
const ReviewList = () => {
  const [mounted, setMounted] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // Set mounted to true after component mounts on client---------------------------------
  useEffect(() => {
    setMounted(true);
  }, []);
  // Get current selected from redux --------------------->
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentSelected } = useSelector(
    (state) => state.booking.currentBooking
  );
  const { selectedDate, selectedTimeSlot } = useSelector(
    (state) => state.booking.currentBooking
  );
  // Handle back to date & time
  const handleBackToDateTime = () => {
    dispatch(setStep("datetime"));
    router.push("/booking/datetime");
  };
  // handle continue to customer
  const handleContinueToCustomer = () => {
    dispatch(setStep("customer"));
    router.push("/booking/customer");
  };
  // handle cancel
  const handleCancel = () => {
    setIsCancelModalOpen(true);
  };
  // Render the review list ------------------------------->
  return (
    <>
      <div className="flex justify-center w-full items-center">
        <button
          onClick={handleBackToDateTime}
          className="text-blue-500 hover:text-blue-600 cursor-pointer flex items-center justify-center"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />{" "}
          <span>Back to date & time</span>
        </button>
      </div>
      <div className="my-4 lg:w-1/2 md:w-[500px] mx-auto text-center">
        <p className="text-center text-lg font-bold ">
          Review your selections below.
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        {mounted &&
          currentSelected.map((selected) => (
            <div
              key={selected.id}
              className="lg:w-3/4 md:w-[500px] w-full mx-auto shadow-md flex  justify-between items-center bg-white border border-gray-300 text-neutral-900 p-4 rounded-lg"
            >
              <div className="flex flex-col justify-between items-start">
                <span className="font-bold text-2xl ">
                  {selected.ServiceName}
                </span>
                <span className="text-lg text-gray-700">
                  Technician: {selected.StaffName}
                </span>
              </div>
            </div>
          ))}
        <div className="lg:w-3/4 md:w-[500px] w-full mx-auto shadow-md flex flex-col  justify-start items-start bg-white border border-gray-300 text-neutral-900 p-4 rounded-lg">
          {" "}
          <span className="text-lg text-gray-700">
            <span className="font-bold">Date:</span>{" "}
            {mounted &&
              new Date(selectedDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </span>
          <span className="text-lg text-gray-700">
            <span className="font-bold">Time:</span>{" "}
            {mounted && selectedTimeSlot}
          </span>
        </div>
        <div className="flex justify-center items-center gap-4 mt-4 lg:w-3/4  md:w-[80%] w-full mx-auto">
          <button
            onClick={handleCancel}
            className="shadow-lg bg-white text-base md:text-xl w-1/2 md:w-3/4 font-bold text-neutral-900 px-4 py-2 rounded-full "
          >
            Cancel
          </button>
          <button
            onClick={handleContinueToCustomer}
            className="shadow-lg bg-foreground text-base md:text-xl w-1/2 md:w-3/4 font-bold text-neutral-900 px-4 py-2 rounded-full "
          >
            Continue
          </button>
        </div>
      </div>
      <CancelModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
      />
    </>
  );
};

export default ReviewList;
