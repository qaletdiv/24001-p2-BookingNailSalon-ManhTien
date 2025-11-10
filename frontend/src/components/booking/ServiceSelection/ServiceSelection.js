"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import ServiceCategories from "./ServiceCategories";
import StaffList from "./StaffList";
function ServiceSelection({ servicesData, staffData }) {
  const [selected, setSelected] = useState("services");
  const services = servicesData;
  const staff = staffData;

  const categories = Array.from(
    services
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

  return (
    <div className="h-full">
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
      {selected === "services" ? (
        <ServiceCategories servicesData={categories} />
      ) : (
        <StaffList staffData={staff} />
      )}
    </div>
  );
}

export default ServiceSelection;
