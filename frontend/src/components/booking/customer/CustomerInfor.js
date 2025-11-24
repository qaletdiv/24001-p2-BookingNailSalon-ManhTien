"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import CancelModal from "@/components/booking/cancelmodal/CancelModal";
import { setCustomer, setStep } from "@/redux/slices/bookingSlice";
import { useAppDispatch } from "@/redux/hooks";
export default function CustomerInfor() {
  const dispatch = useAppDispatch();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [touched, setTouched] = useState(false);
  // State for cancel modal -------------------------------------------------------->
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  // Router -------------------------------------------------------->
  const router = useRouter();
  // Handle cancel -------------------------------------------------------->
  const handleCancel = () => {
    setIsCancelModalOpen(true);
  };
  // Handle back to review -------------------------------------------------------->
  const handleBackToReview = () => {
    router.push("/booking/review");
  };
  // Handle book appointment -------------------------------------------------------->
  const handleBookAppointment = (e) => {
    e.preventDefault();
    setTouched(true);
    if (fullName === "" || phoneNumber === "") {
      return;
    }
    if (phoneNumber.length !== 10 || !/^\d{10}$/.test(phoneNumber)) {
      return;
    }
    dispatch(setCustomer({ fullName, phoneNumber, email, notes }));
    dispatch(setStep("summary"));
    router.push("/booking/summary");
  };
  return (
    <>
      <div className="flex justify-center w-full items-center">
        <button
          onClick={handleBackToReview}
          className="text-blue-500 hover:text-blue-600 cursor-pointer flex items-center justify-center"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" /> <span>Back to review</span>
        </button>
      </div>
      <div>
        <p className="text-lg w-full md:3/4 mx-auto">
          Your name and phone number will be used to send you appointment
          confirmations and reminders. We’ll also be able to call or text you if
          anything changes.
        </p>
      </div>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Full Name (*)"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="focus:outline-1 bg-gray-200 w-full md:w-3/4 mx-auto text-neutral-900 px-4 py-2  rounded-md"
        />
        {touched && fullName === "" && (
          <p className="text-sm text-red-500">Full Name is required</p>
        )}
        <input
          type="tel"
          placeholder="Phone Number (*)"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="focus:outline-1 bg-gray-200 w-full md:w-3/4 mx-auto text-neutral-900 px-4 py-2  rounded-md"
        />
        {touched && phoneNumber === "" && (
          <p className="text-sm  text-red-500">Phone Number is required</p>
        )}
        {touched &&
          (phoneNumber.length !== 10 || !/^\d{10}$/.test(phoneNumber)) &&
          phoneNumber !== "" && (
            <p className="text-sm text-red-500">
              Phone Number must be 10 digits
            </p>
          )}
        <input
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="focus:outline-1 bg-gray-200 w-full md:w-3/4 mx-auto text-neutral-900 px-4 py-2  rounded-md"
        />

        <textarea
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="focus:outline-1 bg-gray-200 w-full h-36 md:w-3/4 mx-auto text-neutral-900 px-4 py-2  rounded-md"
        />
        <p className="text-sm text-blue-500">
          (*) is required. Please check your input before submit.
        </p>
        <div className="flex justify-center items-center gap-4 mt-4 lg:w-3/4  md:w-[80%] w-full mx-auto">
          <button
            type="button"
            onClick={handleCancel}
            className="shadow-lg bg-white text-base w-1/2 md:w-3/4 font-bold text-neutral-900 px-4 py-2 rounded-full "
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleBookAppointment}
            className="shadow-lg bg-foreground text-base  w-1/2 md:w-3/4 font-bold text-neutral-900 px-4 py-2 rounded-full "
          >
            Book Appointment
          </button>
        </div>
      </form>
      <CancelModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
      />
    </>
  );
}
