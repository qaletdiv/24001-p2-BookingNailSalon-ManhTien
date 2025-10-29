"use client";

import { useState } from "react";
import { ChevronLeft, Check, Clock10Icon } from "lucide-react";

const SelectServices = ({ servicesData }) => {
  // Selected services: id -> boolean
  const [selected, setSelected] = useState({});
  // Category open state: category name -> boolean
  const [openCats, setOpenCats] = useState({});

  const toggle = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCat = (name) => {
    setOpenCats((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="mt-8">
      {servicesData.map((cat) => {
        const isOpen = !!openCats[cat.name]; // closed by default
        const panelId = `services-${cat.name
          .replace(/\s+/g, "-")
          .toLowerCase()}`;

        return (
          <div key={cat.name} className="mb-6">
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
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
              aria-hidden={!isOpen}
            >
              <ul className="overflow-hidden">
                {cat.items.map((service) => {
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
                          onClick={() => {}}
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
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectServices;
