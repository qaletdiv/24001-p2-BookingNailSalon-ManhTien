"use client";
import { useSelector } from "react-redux";
import { bookAppointment } from "@/redux/slices/bookingSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { resetBooking } from "@/redux/slices/bookingSlice";
import CancelModal from "@/components/booking/cancelmodal/CancelModal";
// Helper function to format date to YYYY-MM-DD -------------------------------------------------------->
const formatDateToYYYYMMDD = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export default function Summary() {
  // Get current booking from redux
  const currentBooking = useSelector((state) => state.booking.currentBooking);
  const currentSelected = currentBooking.currentSelected;
  const services = currentSelected.map((selected) => selected.ServiceName);
  const technicians = currentBooking.staff;
  const date = currentBooking.selectedDate;
  const time = currentBooking.selectedTimeSlot;
  const customerName = currentBooking.customer.fullName;
  const customerPhone = currentBooking.customer.phoneNumber;
  const [mounted, setMounted] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  // Set mounted to true after component mounts on client---------------------------------
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle confirm booking ---------------------------------------------------------
  // Prepare services data
  const servicesData = currentSelected.map((selected) => ({
    id: selected.ServiceId,
    name: selected.ServiceName,
    duration: selected.duration,
    price: selected.price,
  }));
  const totalDuration = currentSelected.reduce(
    (acc, selected) => acc + selected.duration,
    0
  );
  const totalPrice = currentSelected.reduce(
    (acc, selected) => acc + selected.price,
    0
  );

  const handleConfirmBooking = async () => {
    // Prepare booking data
    const bookingData = {
      customer: {
        name: currentBooking.customer.fullName,
        phone: currentBooking.customer.phoneNumber,
        email: currentBooking.customer.email || "",
      },
      services: servicesData,
      staff: technicians,
      date: formatDateToYYYYMMDD(currentBooking.selectedDate),
      totalDuration: totalDuration,
      totalPrice: totalPrice,
      timeSlot: currentBooking.selectedTimeSlot,
      notes: currentBooking.customer.notes || "",
    };

    try {
      const result = await dispatch(bookAppointment(bookingData)).unwrap();
      console.log("Appointment created successfully:", result);
      // Navigate to confirmation page or show success message
      // router.push("/booking/confirmed");
    } catch (error) {
      console.error("Failed to create appointment:", error);
      // Show error message to user
    }
    dispatch(resetBooking());
    router.push("/");
  };

  return (
    mounted && (
      <>
        <p className="text-lg w-full md:3/4 mx-auto">Your appointment</p>
        <div className="flex justify-center flex-col items-center gap-4 mt-4 lg:w-3/4  md:w-[80%] w-full mx-auto">
          <div className="flex flex-col justify-center items-center gap-4 w-full md:3/4 mx-auto border-2 bg-white border-gray-300 rounded-lg p-4">
            <div className="flex flex-col justify-start items-start gap-4">
              <p className="text-lg">
                Your name:{" "}
                <span className="font-bold text-blue-500">{customerName}</span>
              </p>
              <p className="text-lg">
                Your Phone:{" "}
                <span className="font-bold text-blue-500">{customerPhone}</span>
              </p>
              <p className="text-lg">
                Services:{" "}
                <span className="font-bold text-blue-500">
                  {services.join(", ")}
                </span>
              </p>
              <p className="text-lg">
                Technicians:{" "}
                <span className="font-bold text-blue-500">
                  {technicians.name || "Any available staff"}
                </span>
              </p>
              <p className="text-lg">
                Date: <span className="font-bold text-blue-500">{date}</span>
              </p>
              <p className="text-lg">
                Time: <span className="font-bold text-blue-500">{time}</span>
              </p>
            </div>
          </div>
          <div className="flex justify-center flex-col items-center gap-4 mt-4 lg:w-3/4   w-full mx-auto">
            {/* <div className="flex justify-center items-center gap-4 w-full">
              <button className="shadow-lg bg-white text-base md:text-xl w-full font-bold text-neutral-900 px-4 py-2 rounded-full ">
                Book Another Appointment
              </button>
            </div> */}
            <div className="w-full flex justify-center items-center gap-4">
              <button
                onClick={() => setIsCancelModalOpen(true)}
                className="shadow-lg bg-white text-base md:text-xl w-1/2 md:w-3/4 font-bold text-neutral-900 px-4 py-2 rounded-full "
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="shadow-lg bg-foreground text-base md:text-xl w-1/2 md:w-3/4 font-bold text-neutral-900 px-4 py-2 rounded-full "
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
        <CancelModal
          isOpen={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
        />
      </>
    )
  );
}
