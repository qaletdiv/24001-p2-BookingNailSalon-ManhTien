"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import ServiceList from "@/components/layout/booking/ServiceList";
import { addService } from "@/redux/slices/bookingSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useBooking } from "@/context/BookingContext";

const ServiceCategories = ({ servicesData }) => {
  const dispatch = useAppDispatch();
  const { goNext } = useBooking();
  const [openCats, setOpenCats] = useState({});

  const toggleCat = (name) => {
    setOpenCats((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleAddService = (id, name, duration, price) => {
    dispatch(addService({ id, name, duration, price: Number(price) }));
    goNext();
  };

  return (
    <div className="mt-8">
      {servicesData.map((cat) => {
        const isOpen = !!openCats[cat.name];
        const panelId = `services-${cat.name
          .replace(/\s+/g, "-")
          .toLowerCase()}`;

        return (
          <div key={cat.name} className="mb-6 md:w-3/4 lg:w-1/2 mx-auto">
            <button
              onClick={() => toggleCat(cat.name)}
              className="flex justify-between items-center text-2xl font-bold mb-4 border-2 border-foreground w-full px-4 py-2 rounded-lg"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span>{cat.name}</span>
              <ChevronLeft
                className={`size-8 transition-transform ${
                  isOpen ? "-rotate-90" : "rotate-0"
                }`}
              />
            </button>

            <div
              id={panelId}
              className={`grid transition-all duration-300 ease-out motion-reduce:transition-none ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
              aria-hidden={!isOpen}
            >
              <ServiceList
                servicesData={cat.items}
                handleAddService={handleAddService}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceCategories;
