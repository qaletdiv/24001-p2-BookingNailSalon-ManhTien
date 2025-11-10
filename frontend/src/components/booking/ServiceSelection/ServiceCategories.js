"use client";

import { useState } from "react";
import { ChevronLeft, Check, Clock10Icon } from "lucide-react";
import ServiceList from "@/components/layout/booking/ServiceList";
import { addService } from "@/redux/slices/bookingSlice";
import { setStep } from "@/redux/slices/bookingSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
const ServiceCategories = ({ servicesData }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // Category open state: category name -> boolean
  const [openCats, setOpenCats] = useState({});
  // Toggle category open state
  const toggleCat = (name) => {
    setOpenCats((prev) => ({ ...prev, [name]: !prev[name] }));
  };
  // Handle add service
  const handleAddService = (id, name, duration, price) => {
    dispatch(addService({ id, name, duration, price: Number(price) }));
    dispatch(setStep("staff"));
    router.push("/booking/staff");
  };
  return (
    <div className="mt-8">
      {servicesData.map((cat) => {
        const isOpen = !!openCats[cat.name]; // closed by default
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

            {/* Smooth expand/collapse instead of conditional unmount */}
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
