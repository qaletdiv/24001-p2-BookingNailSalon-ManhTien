"use client";
import { useSelector } from "react-redux";
import { clearStaff } from "@/redux/slices/bookingSlice";
import { clearServices } from "@/redux/slices/bookingSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
const ReviewList = () => {
  const dispatch = useAppDispatch();
  const { currentSelected } = useSelector(
    (state) => state.booking.currentBooking
  );
  useEffect(() => {
    dispatch(clearServices());
    dispatch(clearStaff());
  }, [dispatch]);
  return (
    <>
      <div className="my-4 lg:w-1/2 md:w-[500px] mx-auto text-center">
        <p className="text-center text-lg font-bold ">
          Review your selections below.
        </p>
        <p className=" text-sm text-gray-700">
          Your can add more services by clicking the Add Service button.
        </p>
      </div>
      {currentSelected.map((selected, idx) => (
        <div
          key={idx}
          className="lg:w-1/2 md:w-[500px] mx-auto shadow-md flex  justify-between items-center bg-white border border-gray-300 text-neutral-900 p-4 rounded-lg"
        >
          <div className="flex flex-col justify-between items-start">
            <span className="font-bold text-2xl">{selected.ServiceName}</span>
            <span className="text-lg text-gray-700">
              Technician: {selected.StaffName}
            </span>
            <span className="text-lg text-gray-700">
              Duration: {selected.duration} minutes
            </span>
            <span className="text-lg text-gray-700">
              Price: ${selected.price}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <button className="bg-foreground text-neutral-900 px-4 py-2 rounded-full">
              Change Service
            </button>
            <button className="bg-foreground text-neutral-900 px-4 py-2 rounded-full">
              Change Technician
            </button>
            <button className="bg-foreground text-neutral-900 px-4 py-2 rounded-full">
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ReviewList;
