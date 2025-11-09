"use client";
import { useState } from "react";
import { Check, Clock10Icon } from "lucide-react";
import { addService } from "@/redux/slices/bookingSlice";
import { useAppDispatch } from "@/redux/hooks";
import { removeService } from "@/redux/slices/bookingSlice";
import { useRouter } from "next/navigation";

import { setStep } from "@/redux/slices/bookingSlice";
const ServiceList = ({ servicesData, handleAddService }) => {
  // Selected services: id -> boolean

  return (
    <ul className="overflow-hidden">
      {servicesData.map((service) => {
        return (
          <li
            key={service.id}
            className="flex justify-between border-b border-gray-300 py-2"
          >
            <div className="flex flex-col items-start">
              <span>{service.name}</span>
              <span className="flex gap-2 items-center">
                <Clock10Icon size={18} />{" "}
                <span>{service.duration} minutes</span>
              </span>
            </div>

            {/* <label
              htmlFor={inputId}
              className="inline-flex items-center cursor-pointer select-none rounded-full"
            > */}
            {/* <input
                id={inputId}
                type="checkbox"
                className="sr-only"
                checked={isSelected}
                onChange={() => {
                  if (isSelected) {
                    dispatch(removeService({ id: service.id }));
                  } else {
                    handleAddService(service.id, service.name, service.duration,service.price);
                  }
                  toggle(service.id);
                }}
                aria-label={`Select ${service.name}`}
              /> */}
            <button
              onClick={handleAddService}
              className="bg-foreground text-neutral-900 px-4 py-2 rounded-full"
            >
              Book Service
            </button>
            {/* <span
                aria-hidden
                className={`grid place-items-center h-6 w-6 rounded-full border-2 border-foreground transition-colors ${
                  isSelected ? "bg-neutral-900" : ""
                }`}
              >
                <Check
                  className={`h-4 w-4 text-white transition-opacity ${
                    isSelected ? "opacity-100" : "opacity-0"
                  }`}
                  strokeWidth={3}
                />
              </span>
            </label> */}
          </li>
        );
      })}
    </ul>
  );
};

export default ServiceList;
