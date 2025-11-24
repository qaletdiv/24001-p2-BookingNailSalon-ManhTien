"use client";
import { useSelector } from "react-redux";
export default function Summary() {
  const currentBooking = useSelector((state) => state.booking.currentBooking);
  const currentSelected = currentBooking.currentSelected;
  const services = currentSelected.map((selected) => selected.ServiceName);
  const technicians = currentSelected.map((selected) => selected.StaffName);
  const date = currentBooking.selectedDate;
  const time = currentBooking.selectedTimeSlot;
  const customerName = currentBooking.customer.fullName;
  const customerPhone = currentBooking.customer.phoneNumber;

  return (
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
                {technicians.join(", ")}
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
          <div className="flex justify-center items-center gap-4 w-full">
            <button className="shadow-lg bg-white text-base md:text-xl w-full font-bold text-neutral-900 px-4 py-2 rounded-full ">
              Book Another Appointment
            </button>
          </div>
          <div className="w-full flex justify-center items-center gap-4">
            <button className="shadow-lg bg-white text-base md:text-xl w-1/2 md:w-3/4 font-bold text-neutral-900 px-4 py-2 rounded-full ">
              Cancel
            </button>
            <button className="shadow-lg bg-foreground text-base md:text-xl w-1/2 md:w-3/4 font-bold text-neutral-900 px-4 py-2 rounded-full ">
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
