"use client";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { setTime, setSelectedDate } from "@/redux/slices/bookingSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useSelector } from "react-redux";
const DateTime = ({ appointmentData }) => {
  const ArrTimeSlot = [
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
  const dispatch = useAppDispatch();
  const [date, setDate] = useState(new Date().toDateString());
  const [timeButtonSelected, setTimeButtonSelected] = useState(null);
  const staffData = useSelector((state) => state.staff.staff);
  const { currentSelected } = useSelector(
    (state) => state.booking.currentBooking
  );

  //--------------------------------- Filter data ---------------------------------
  // Get current selected staff id
  const currentSelectedStaffId = currentSelected.map(
    (selected) => selected.StaffId
  );
  console.log("current selected staff id:", currentSelectedStaffId);
  
  // Filter staff data based on current selected staff id
  const filteredStaffData = staffData.filter((staff) =>
    currentSelectedStaffId.includes(staff.id)
  );
  console.log("filtered staff data:", filteredStaffData);
  // Filter appointment data based on current selected staff
  const filteredAppointmentData = appointmentData.filter((appointment) =>
    currentSelectedStaffId.includes(appointment.staff.id )
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

  console.log(
    "filtered appointment by current date:",
    filteredAppointmentByCurrentDate
  );

  //----------------------------schedule--------------------------
  const curDay = new Date(date)
    .toLocaleDateString("en-US", {
      weekday: "long",
    })
    .toLowerCase();
  console.log("ngay hien tai:", curDay);
  const scheduleByCurrentStaff = filteredStaffData[0].schedule;
  const scheduleByCurrentDay = scheduleByCurrentStaff[curDay];
  console.log("schedule by current day:", scheduleByCurrentDay);
  // Check if the date is disabled
  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

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
    setDate(date);
  };
  return (
    <>
      <div>
        Current Selected Staff:{" "}
        {filteredStaffData.map((staff) => staff.name).join(", ")}
      </div>
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
              {ArrTimeSlot.map((time, idx) => {
                if (/^(9|10|11):/.test(time)) {
                  return (
                    <button
                      key={idx}
                      className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
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
              {ArrTimeSlot.map((time, idx) => {
                if (/^(12|1|2|3):/.test(time)) {
                  return (
                    <button
                      key={idx}
                      className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
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
              {ArrTimeSlot.map((time, idx) => {
                if (/^(4|5|6):/.test(time)) {
                  return (
                    <button
                      key={idx}
                      className=" py-2 md:w-[78px] w-full text-center rounded-md bg-foreground text-neutral-900"
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
    </>
  );
};

export default DateTime;
