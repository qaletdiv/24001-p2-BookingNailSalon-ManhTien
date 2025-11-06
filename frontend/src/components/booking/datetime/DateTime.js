"use client";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const DateTime = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <Calendar
        className="w-full"
        mode="single"
        selected={date}
        onSelect={setDate}
        initialFocus
      />
    </div>
  );
};

export default DateTime;
