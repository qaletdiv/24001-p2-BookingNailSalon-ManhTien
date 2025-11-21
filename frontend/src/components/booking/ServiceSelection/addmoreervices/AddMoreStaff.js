"use client";
import { addStaff, setCurrentSelected } from "@/redux/slices/bookingSlice";
import { useAppDispatch } from "@/redux/hooks";
import { X } from "lucide-react";

import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
const AddMoreStaff = ({ onClose }) => {
  const dispatch = useAppDispatch();
  // Get services data from redux
  const { services } = useSelector((state) => state.booking.currentBooking);
  // Get staff data from redux
  const staffData = useSelector((state) => state.staff.staff);
  // filter staff data that is currently selected from the current selected array
  const { currentSelected } = useSelector(
    (state) => state.booking.currentBooking
  );

  // Filter staff data based on current selected
  let filteredStaffData = [];
  if(currentSelected.length > 0 && currentSelected[0].StaffId === "any"){
    filteredStaffData = staffData;  
  }else{
    filteredStaffData = staffData.filter((staff) => {
      return (
        currentSelected.some((selected) => selected.StaffId === staff.id) &&
        staff.id !== "any"
      );
    });
  }
  // const filteredStaffData = staffData.filter((staff) => {
  //   return (
  //     currentSelected.some((selected) => selected.StaffId === staff.id) &&
  //     staff.id !== "any"
  //   );
  // });
  // State for closing animation
  const [isClosing, setIsClosing] = useState(false);
  // Handle close
  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      onClose();
    }, 300); // Match the animation duration
  };
  // Close on overlay click
  const handleOverlayClick = (e) => {
    if (e.target.id === "overlay") {
      handleClose();
    }
  };
  // Handle add staff
  const handleAddStaff = (staff) => {
    dispatch(
      setCurrentSelected({
        id: uuidv4(),
        ServiceId: services.id,
        ServiceName: services.name,
        StaffId: staff.id,
        StaffName: staff.name,
        duration: services.duration,
        price: services.price,
      })
    );
    onClose();
  };
  // Handle book any staff
  const handleBookAnyStaff = () => {
    dispatch(
      setCurrentSelected({
        id: uuidv4(),
        ServiceId: services.id,
        ServiceName: services.name,
        StaffId: "any",
        StaffName: "Any available staff",
        duration: services.duration,
        price: services.price,
      })
    );
    onClose();
  };

  return (
    <>
      <div
        id="overlay"
        onClick={handleOverlayClick}
        className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10 transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-50"
        } ${!isClosing ? "animate-in fade-in" : "animate-out fade-out"}`}
      ></div>
      <div
        className={`pt-8 z-100 px-4 fixed bottom-0 left-0 w-full h-3/4 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${
          isClosing
            ? "animate-out slide-out-to-bottom"
            : "animate-in slide-in-from-bottom"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 z-20 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="size-8 text-gray-700" />
        </button>
        <h2 className="text-2xl font-bold">Select Staff</h2>
        <div className="overflow-hidden grid lg:w-3/4 md:w-[500px] w-full mx-auto grid-cols-1 md:grid-cols-2  gap-4 mt-8">
          <div className="shadow-md flex justify-between items-center bg-foreground text-neutral-900 p-4 rounded-lg">
            <span>Any available staff</span>
            <button
              onClick={handleBookAnyStaff}
              className="bg-neutral-900 text-foreground px-4 py-2 rounded-full"
            >
              Book
            </button>
          </div>
          {filteredStaffData.map((staff) => {
            return (
              <div
                key={staff.id}
                className="flex shadow-md justify-between items-center bg-foreground text-neutral-900 p-4 rounded-lg"
              >
                <span>{staff.name}</span>
                <button
                  onClick={() => handleAddStaff(staff)}
                  className="bg-neutral-900 text-foreground px-4 py-2 rounded-full"
                >
                  Book
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AddMoreStaff;
