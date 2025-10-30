"use client";
import { useState } from "react";
import { Check, Clock10Icon } from "lucide-react";
import { addService } from "@/redux/slices/bookingSlice";
import { useAppDispatch } from "@/redux/hooks";
const ServiceList = ({ servicesData }) => {
  const dispatch = useAppDispatch();
  // Selected services: id -> boolean
  const [selected, setSelected] = useState({});
  const toggle = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const handleAddService = (service) => {
    dispatch(addService());
  };
  return (
    <ul className="overflow-hidden">
      {servicesData.map((service) => {
        const isSelected = !!selected[service.id];
        const inputId = `service-${service.id}`;

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

            <label
              htmlFor={inputId}
              className="inline-flex items-center cursor-pointer select-none rounded-full"
            >
              <input
                id={inputId}
                type="checkbox"
                className="sr-only"
                checked={isSelected}
                onChange={() => toggle(service.id)}
                aria-label={`Select ${service.name}`}
                onClick={handleAddService(service.id)}
              />
              <span
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
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default ServiceList;
