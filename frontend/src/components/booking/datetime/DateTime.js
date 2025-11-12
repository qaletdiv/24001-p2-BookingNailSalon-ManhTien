"use client";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { setTime, setSelectedDate } from "@/redux/slices/bookingSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useSelector } from "react-redux";
const DateTime = () => {
  const dispatch = useAppDispatch();
  const staffData = useSelector((state) => state.staff.staff);
  const { currentSelected } = useSelector(
    (state) => state.booking.currentBooking
  );
  console.log(staffData);
  console.log(currentSelected);
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };
  const [timeButtonSelected, setTimeButtonSelected] = useState(null);
  const handleTimeSelection = (time) => {
    setTimeButtonSelected(time);
    dispatch(setTime(time));
  };
  useEffect(() => {
    dispatch(
      setSelectedDate(
        new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      )
    );
  }, [dispatch, date]);
  // Handle date selection
  const handleDateSelection = (date) => {
    if (date) {
      setDate(date);
      dispatch(
        setSelectedDate(
          date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        )
      );
    }
  };
  return (
    <div className="flex md:flex-row w-full flex-col gap-4 justify-start items-start">
      <Calendar
        className="w-full md:w-1/2 "
        mode="single"
        selected={date}
        onSelect={(date) => handleDateSelection(date)}
        initialFocus
        disabled={isDateDisabled}
      />
      <div id="time" className="flex flex-col gap-4 md:w-1/2 w-full mt-4">
        <div id="morning-slots" className="flex flex-col gap-4">
          <h3 className="text-xl md:text-md md:text-left text-center">
            Morning
          </h3>
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-1">
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("9:00 AM")}
            >
              9:00 AM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("9:15 AM")}
            >
              9:15 AM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("9:30 AM")}
            >
              9:30 AM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("9:45 AM")}
            >
              9:45 AM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("10:00 AM")}
            >
              10:00 AM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("10:15 AM")}
            >
              10:15 AM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("10:30 AM")}
            >
              10:30 AM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("10:45 AM")}
            >
              10:45 AM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("11:00 AM")}
            >
              11:00 AM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("11:15 AM")}
            >
              11:15 AM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("11:30 AM")}
            >
              11:30 AM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("11:45 AM")}
            >
              11:45 AM
            </button>
          </div>
        </div>
        <div id="afternoon-slots" className="flex flex-col gap-4">
          <h3 className="text-xl md:text-md  md:text-left text-center">
            Afternoon{" "}
          </h3>
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-1">
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("12:00 PM")}
            >
              12:00 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("12:15 PM")}
            >
              12:15 PM
            </button>

            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("12:30 PM")}
            >
              12:30 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("12:45 PM")}
            >
              12:45 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("1:00 PM")}
            >
              1:00 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("1:15 PM")}
            >
              1:15 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("1:30 PM")}
            >
              1:30 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("1:45 PM")}
            >
              1:45 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("2:00 PM")}
            >
              2:00 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("2:15 PM")}
            >
              2:15 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("2:30 PM")}
            >
              2:30 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("2:45 PM")}
            >
              2:45 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("3:00 PM")}
            >
              3:00 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("3:15 PM")}
            >
              3:15 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("3:30 PM")}
            >
              3:30 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("3:45 PM")}
            >
              3:45 PM
            </button>
          </div>
        </div>
        <div id="evening-slots" className="flex flex-col gap-4">
          <h3 className="text-xl md:text-md  md:text-left text-center">
            Evening{" "}
          </h3>
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-2">
            <button
              className=" py-2 md:w-[78px] w-full  text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("4:00 PM")}
            >
              4:00 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full  text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("4:15 PM")}
            >
              4:15 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full  text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("4:30 PM")}
            >
              4:30 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full  text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("4:45 PM")}
            >
              4:45 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full  text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("5:00 PM")}
            >
              5:00 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full  text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("5:15 PM")}
            >
              5:15 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("5:30 PM")}
            >
              5:30 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full  text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("5:45 PM")}
            >
              5:45 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full  text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("6:00 PM")}
            >
              6:00 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full  text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("6:15 PM")}
            >
              6:15 PM
            </button>
            <button
              className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
              onClick={() => handleTimeSelection("6:30 PM")}
            >
              6:30 PM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTime;
