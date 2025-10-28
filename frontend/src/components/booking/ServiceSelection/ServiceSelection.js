"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
function ServiceSelection() {
  const [selected, setSelected] = useState("services");
  const services = useSelector((state) => state.services.services);
  const staff = useSelector((state) => state.staff.staff);
  const manicure = services.filter(
    (service) => service.category === "Manicure"
  );
  const penicure = services.filter(
    (service) => service.category === "Penicure"
  );
  const enhancement = services.filter(
    (service) => service.category === "Enhancement"
  );
  const waxing = services.filter((service) => service.category === "waxing");
  return (
    <div>
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
  );
}

export default ServiceSelection;
