"use client";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { setTime, setSelectedDate } from "@/redux/slices/bookingSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useSelector } from "react-redux";
import { setStep } from "@/redux/slices/bookingSlice";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
// Helper function to convert time string to minutes since midnight
const timeToMinutes = (timeStr) => {
  const [time, period] = timeStr.split(" ");
  const [hours, minutes] = time.split(":").map(Number);
  let totalMinutes = hours * 60 + minutes;
  if (period === "PM" && hours !== 12) {
    totalMinutes += 12 * 60; // Add 12 hours for PM
  }
  if (period === "AM" && hours === 12) {
    totalMinutes -= 12 * 60; // Subtract 12 hours for 12 AM
  }
  return totalMinutes;
};
// Helper function to convert minutes to time string
const minutesToTime = (minutes) => {
  const endHours24 = Math.floor(minutes / 60) % 24;
  const endMinutes = minutes % 60;

  // Convert to 12-hour format with AM/PM
  let endHours = endHours24;
  let endPeriod = "AM";
  if (endHours24 === 0) {
    endHours = 12;
    endPeriod = "AM";
  } else if (endHours24 === 12) {
    endHours = 12;
    endPeriod = "PM";
  } else if (endHours24 > 12) {
    endHours = endHours24 - 12;
    endPeriod = "PM";
  } else {
    endPeriod = "AM";
  }

  return `${endHours}:${endMinutes.toString().padStart(2, "0")} ${endPeriod}`;
};
const DateTime = ({ appointmentData }) => {
  const arrTimeSlot = [
    "9:00 AM",
    "9:15 AM",
    "9:30 AM",
    "9:45 AM",
    "10:00 AM",
    "10:15 AM",
    "10:30 AM",
    "10:45 AM",
    "11:00 AM",
    "11:15 AM",
    "11:30 AM",
    "11:45 AM",
    "12:00 PM",
    "12:15 PM",
    "12:30 PM",
    "12:45 PM",
    "1:00 PM",
    "1:15 PM",
    "1:30 PM",
    "1:45 PM",
    "2:00 PM",
    "2:15 PM",
    "2:30 PM",
    "2:45 PM",
    "3:00 PM",
    "3:15 PM",
    "3:30 PM",
    "3:45 PM",
    "4:00 PM",
    "4:15 PM",
    "4:30 PM",
    "4:45 PM",
    "5:00 PM",
    "5:15 PM",
    "5:30 PM",
    "5:45 PM",
    "6:00 PM",
    "6:15 PM",
    "6:30 PM",
  ];
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [date, setDate] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const staffData = useSelector((state) => state.staff.staff);
  const [showNextButton, setShowNextButton] = useState(false);
  const { currentSelected } = useSelector(
    (state) => state.booking.currentBooking
  );
  const selectedTime = useSelector(
    (state) => state.booking.currentBooking.selectedTimeSlot
  );
  // Set mounted to true after component mounts on client
  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  //--------------------------------- Filter data ---------------------------------
  // Get current selected staff id
  const currentSelectedStaffId = currentSelected.map(
    (selected) => selected.StaffId
  );

  // Filter staff data based on current selected staff id
  const filteredStaffData = staffData.find((staff) =>
    currentSelectedStaffId.includes(staff.id)
  );
  // Filter appointment data based on current selected staff
  const filteredAppointmentData = appointmentData.filter((appointment) =>
    currentSelectedStaffId.includes(appointment.staff.id)
  );

  // Filter appointment data based on date
  const filteredAppointmentByCurrentDate = filteredAppointmentData.filter(
    (appointment) => {
      const curDate = new Date(date);
      const formated = `${curDate.getFullYear()}-${
        curDate.getMonth() + 1
      }-${curDate.getDate()}`;
      return appointment?.date === formated;
    }
  );

  //----------------------------schedule--------------------------
  const curDay = new Date(date)
    .toLocaleDateString("en-US", {
      weekday: "long",
    })
    .toLowerCase();
  const scheduleByCurrentStaff = filteredStaffData?.schedule;
  const scheduleByCurrentDay =
    scheduleByCurrentStaff && scheduleByCurrentStaff[curDay];

  //--------------------------------- available time slots ---------------------------------

  //booked time slots
  const bookedTimeSlots = filteredAppointmentByCurrentDate.reduce(
    (acc, appointment) => {
      const startTime = appointment.timeSlot;
      const convertEndTime = (startTime, duration) => {
        // Split time and period (AM/PM)
        const totalMinutes = timeToMinutes(startTime) + duration;

        return minutesToTime(totalMinutes);
      };
      const endTime = convertEndTime(startTime, appointment.totalDuration);
      let bookedTime = [];
      const fifteenMinutes = 15;
      for (
        let i = timeToMinutes(startTime);
        i <= timeToMinutes(endTime);
        i += fifteenMinutes
      ) {
        bookedTime.push(minutesToTime(i));
      }
      acc.push({ bookedTime: bookedTime });
      return acc;
    },
    []
  );
  //available time slots before booked--------------------------------------------------------
  const availableTimeSlots = arrTimeSlot.filter((time) => {
    if (!scheduleByCurrentDay || scheduleByCurrentDay.length < 2) {
      return false; // Return no available slots if schedule is invalid
    }
    const startTime = scheduleByCurrentDay[0];
    const endTime = scheduleByCurrentDay[1];

    if (startTime === "Off") {
      return false;
    } else {
      const timeMinutes = timeToMinutes(time);
      const startMinutes = timeToMinutes(startTime);
      const endMinutes = timeToMinutes(endTime);
      if (timeMinutes >= startMinutes && timeMinutes <= endMinutes) {
        return true;
      }
    }
  });

  //all booked time
  const allBookedTime = bookedTimeSlots.reduce((acc, bookedTime) => {
    return acc.concat(bookedTime.bookedTime);
  }, []);

  //available time slots after booked--------------------------------------------------------
  const availableTimeSlotsAfterBooked = availableTimeSlots.filter((time) => {
    return !allBookedTime.includes(time);
  });

  //active time slots--------------------------------------------------------
  const activeTime = arrTimeSlot.map((time) => {
    return availableTimeSlotsAfterBooked.includes(time);
  });

  // Check if the date is disabled --------------------------------- ------------------------

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const handleTimeSelection = (time) => {
    if (selectedTime === time) {
      dispatch(setTime(null));
    } else {
      dispatch(setTime(time));
    }
  };
  useEffect(() => {
    // Set mounted to true after component mounts on client---------------------------------
    setMounted(true);
    // Set selected date--------------------------------------------------------
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
    setDate(date);
  };
  // Handle next
  // Handle animation for next button
  useEffect(() => {
    if (selectedTime) {
      // Small delay to trigger animation
      const timer = setTimeout(() => {
        setShowNextButton(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setShowNextButton(false);
    }
  }, [selectedTime]);
  const handleNext = () => {
    dispatch(setStep("review"));
    router.push("/booking/review");
  };
  const handleBackToOptions = () => {
    dispatch(setStep("options"));
    router.push("/booking/options");
  };
  return (
    <>
      <div className="flex justify-center w-full items-center">
        <button
          onClick={handleBackToOptions}
          className="text-blue-500 hover:text-blue-600 cursor-pointer flex items-center justify-center"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />{" "}
          <span>Back to options</span>
        </button>
      </div>
      <div>Current Selected Staff: {mounted && filteredStaffData?.name}</div>
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
              {mounted &&
                arrTimeSlot.map((time, idx) => {
                  if (activeTime[idx] && /^(9|10|11):/.test(time)) {
                    return (
                      <button
                        key={idx}
                        disabled={false}
                        className={`cursor-pointer transition-all duration-300 py-2 md:w-[78px] w-full text-center rounded-md ${
                          selectedTime === time
                            ? "bg-black text-neutral-100"
                            : "bg-foreground text-neutral-900"
                        }`}
                        onClick={() => handleTimeSelection(time)}
                      >
                        {time}
                      </button>
                    );
                  } else if (!activeTime[idx] & /^(9|10|11):/.test(time)) {
                    return (
                      <button
                        key={idx}
                        disabled={true}
                        className="bg-neutral-300 py-2 md:w-[78px] w-full text-center rounded-md text-neutral-900"
                        onClick={() => handleTimeSelection(time)}
                      >
                        {time}
                      </button>
                    );
                  }
                })}
            </div>
          </div>
          <div id="afternoon-slots" className="flex flex-col gap-4">
            <h3 className="text-xl md:text-md  md:text-left text-center">
              Afternoon{" "}
            </h3>
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-1">
              {mounted &&
                arrTimeSlot.map((time, idx) => {
                  if (activeTime[idx] && /^(12|1|2|3):/.test(time)) {
                    return (
                      <button
                        key={idx}
                        disabled={false}
                        className={`cursor-pointer transition-all duration-300 py-2 md:w-[78px] w-full text-center rounded-md ${
                          selectedTime === time
                            ? "bg-black text-neutral-100"
                            : "bg-foreground text-neutral-900"
                        }`}
                        onClick={() => handleTimeSelection(time)}
                      >
                        {time}
                      </button>
                    );
                  } else if (!activeTime[idx] && /^(12|1|2|3):/.test(time)) {
                    return (
                      <button
                        key={idx}
                        disabled={true}
                        className="bg-neutral-300 py-2 md:w-[78px] w-full text-center rounded-md text-neutral-900"
                        onClick={() => handleTimeSelection(time)}
                      >
                        {time}
                      </button>
                    );
                  }
                })}
            </div>
          </div>
          <div id="evening-slots" className="flex flex-col gap-4">
            <h3 className="text-xl md:text-md  md:text-left text-center">
              Evening{" "}
            </h3>
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-1">
              {mounted &&
                arrTimeSlot.map((time, idx) => {
                  if (activeTime[idx] && /^(4|5|6):/.test(time)) {
                    return (
                      <button
                        key={idx}
                        disabled={false}
                        className={`cursor-pointer transition-all duration-300 py-2 md:w-[78px] w-full text-center rounded-md ${
                          selectedTime === time
                            ? "bg-black text-neutral-100"
                            : "bg-foreground text-neutral-900"
                        }`}
                        onClick={() => handleTimeSelection(time)}
                      >
                        {time}
                      </button>
                    );
                  } else if (!activeTime[idx] && /^(4|5|6):/.test(time)) {
                    return (
                      <button
                        key={idx}
                        disabled={true}
                        className="bg-neutral-300 py-2 md:w-[78px] w-full text-center rounded-md text-neutral-900"
                        onClick={() => handleTimeSelection(time)}
                      >
                        {time}
                      </button>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </div>
      {selectedTime && mounted && (
        <div
          className={`flex w-full md:w-3/4 z-50 fixed bottom-[10%] left-[50%] translate-x-[-50%] justify-center items-center mt-4 transition-all duration-500 ease-out ${
            showNextButton
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <button
            key="next"
            onClick={handleNext}
            className="bg-black text-white transition-all duration-300 md:text-xl w-3/4 md:w-3/4 font-bold px-4 py-2 rounded-full hover:scale-105 active:scale-95"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default DateTime;
