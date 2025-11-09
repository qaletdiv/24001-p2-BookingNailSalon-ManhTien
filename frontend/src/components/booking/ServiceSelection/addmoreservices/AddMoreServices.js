"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ChevronLeft, Clock10Icon } from "lucide-react";

import { X } from "lucide-react";
import { removeService } from "@/redux/slices/bookingSlice";
import { useAppDispatch } from "@/redux/hooks";
import ServiceCategories from "../ServiceCategories";
import ServiceList from "../ServiceList";
import { addService } from "@/redux/slices/bookingSlice";
import { setStep } from "@/redux/slices/bookingSlice";
import { useRouter } from "next/navigation";
const AddMoreServices = ({ onClose }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // State for closing animation
  const [isClosing, setIsClosing] = useState(false);
  // Get services data from redux
  const servicesData = useSelector((state) => state.services.services);
  // Get current selected services from redux
  const { currentSelected } = useSelector(
    (state) => state.booking.currentBooking
  );
  // State for open categories
  const [openCats, setOpenCats] = useState({});
  // Toggle category open state
  const toggleCat = (name) => {
    setOpenCats((prev) => ({ ...prev, [name]: !prev[name] }));
  };
  // Filter out services that are already selected
  const filteredServices = servicesData.filter(
    (service) =>
      !currentSelected.some((selected) => selected.ServiceId === service.id)
  );
  // Create categories from filtered services
  const categories = Array.from(
    filteredServices
      .reduce((map, service) => {
        const raw = service.category ?? "Uncategorized";
        const key = raw.trim().toLowerCase();
        if (!map.has(key)) {
          map.set(key, { name: raw.trim(), items: [] });
        }
        map.get(key).items.push(service);
        return map;
      }, new Map())
      .values()
  );
  // Handle close
  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      onClose();
    }, 300); // Match the animation duration
  };

  // Close on overlay click
  const handleOverlayClick = (e) => {
    if (e.target.id === "overlay") {
      handleClose();
    }
  };

  // Handle add service
  const handleAddService = (id, name, duration, price) => {
    dispatch(addService({ id, name, duration, price: Number(price) }));
    dispatch(setStep("staff"));
    router.push("/booking/staff");
  };

  return (
    <>
      <div
        id="overlay"
        onClick={handleOverlayClick}
        className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10 transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-50"
        } ${!isClosing ? "animate-in fade-in" : "animate-out fade-out"}`}
      ></div>
      <div
        className={`pt-8 z-100 px-4 fixed bottom-0 left-0 w-full h-3/4 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${
          isClosing
            ? "animate-out slide-out-to-bottom"
            : "animate-in slide-in-from-bottom"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 z-20 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="size-8 text-gray-700" />
        </button>
        <h2 className="text-2xl font-bold">Select Services</h2>
        <div className="mt-8">
          {categories.map((cat) => {
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
      </div>
    </>
  );
};

export default AddMoreServices;
