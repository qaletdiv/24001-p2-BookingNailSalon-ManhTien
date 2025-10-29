"use client";
import { useState } from "react";
import { Tangerine } from "next/font/google";
import ServiceSelection from "@/components/booking/ServiceSelection/ServiceSelection";
const tangerine = Tangerine({
  weight: ["400", "700"],
  variable: "--font-tangerine",
  subsets: ["latin"],
});

export default function BookingPage() {
  return (
    <section className="pt-36 h-full flex justify-center  elegant-swirl-pattern">
      <div className="text-center flex flex-col gap-4">
        <h1 className={`${tangerine.className} md:text-7xl text-5xl font-bold`}>
          Book your appointment
        </h1>
        <ServiceSelection />
      </div>
    </section>
  );
}
