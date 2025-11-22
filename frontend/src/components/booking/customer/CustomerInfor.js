"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import CancelModal from "@/components/booking/cancelmodal/CancelModal";
export default function CustomerInfor() {
    // State for cancel modal -------------------------------------------------------->
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    // Router -------------------------------------------------------->
    const router = useRouter();
    // Handle cancel -------------------------------------------------------->
    const handleCancel = () => {
        setIsCancelModalOpen(true);
    }
    // Handle back to review -------------------------------------------------------->
    const handleBackToReview = () => {
        router.push("/booking/review");
    }
  return (
    <>
    <div className="flex justify-center w-full items-center">
        <button
          onClick={handleBackToReview}
          className="text-blue-500 hover:text-blue-600 cursor-pointer flex items-center justify-center"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />{" "}
          <span>Back to review</span>
        </button>
      </div>
    <div>
      <p className="text-lg w-full md:3/4 mx-auto">Your name and phone number will be used to send you appointment confirmations and reminders. We’ll also be able to call or text you if anything changes.</p>
    </div>
    <div className="flex flex-col gap-4">
        <input type="text" placeholder="Full Name (*)" required className="focus:outline-1 bg-gray-200 w-full md:w-3/4 mx-auto text-neutral-900 px-4 py-2  rounded-md" />
        <input type="tel" placeholder="Phone Number (*)" required className="focus:outline-1 bg-gray-200 w-full md:w-3/4 mx-auto text-neutral-900 px-4 py-2  rounded-md" />
        <input type="email" placeholder="Email (optional)" className="focus:outline-1 bg-gray-200 w-full md:w-3/4 mx-auto text-neutral-900 px-4 py-2  rounded-md" />
        <p className="text-sm text-blue-500">(*) is required. Please check your input before submit.</p>
        <textarea placeholder="Notes (optional)" className="focus:outline-1 bg-gray-200 w-full h-36 md:w-3/4 mx-auto text-neutral-900 px-4 py-2  rounded-md" />
        <div className="flex justify-center items-center gap-4 mt-4 lg:w-3/4  md:w-[80%] w-full mx-auto">
          <button
            onClick={handleCancel}
            className="shadow-lg bg-white text-base md:text-xl w-1/2 md:w-3/4 font-bold text-neutral-900 px-4 py-2 rounded-full "
          >
            Cancel
          </button>
          <button
            className="shadow-lg bg-foreground text-base md:text-xl w-1/2 md:w-3/4 font-bold text-neutral-900 px-4 py-2 rounded-full "
          >
            Book Appointment
          </button>
        </div>
    </div>
    <CancelModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
      />
    </>
  );
}