"use client";
import { useState } from "react";
import { Tangerine } from "next/font/google";

const tangerine = Tangerine({
  weight: ["400", "700"],
  variable: "--font-tangerine",
  subsets: ["latin"],
});

export default function BookingPage() {
  const [selected, setSelected] = useState("services");
  
  return (
    <section className="pt-36 flex justify-center h-screen elegant-swirl-pattern">
      <div className="text-center flex flex-col gap-4">
        <h1 className={`${tangerine.className} text-7xl font-bold`}>
          Book your appointment
        </h1>
        <div className="flex gap-4 justify-center">
          <button 
            className={`${
              selected === "services" 
                ? "bg-neutral-900 text-foreground" 
                : "bg-foreground text-neutral-900"
            } font-bold rounded-[100px] px-4 py-2 w-44 cursor-pointer hover:bg-neutral-900 hover:text-foreground transition-colors`} 
            onClick={() => setSelected("services")}
          >
            Services
          </button>
          <button 
            className={`${
              selected === "staff" 
                ? "bg-neutral-900 text-foreground" 
                : "bg-foreground text-neutral-900"
            } font-bold rounded-[100px] px-4 py-2 w-44 cursor-pointer hover:bg-neutral-900 hover:text-foreground transition-colors`} 
            onClick={() => setSelected("staff")}
          >
            Staff
          </button>
        </div>
      </div>
    </section>
  );
}