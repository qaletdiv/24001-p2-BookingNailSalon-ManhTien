"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
function ServiceSelection() {
  const [selected, setSelected] = useState("services");
  const services = useSelector((state) => state.services.services);
  const staff = useSelector((state) => state.staff.staff);

  // const category = services.reduce((acc, service) => {
  //   const existingCategory = acc.find((cat) => cat.name === service.category);
  //   if (existingCategory) {
  //     existingCategory.items.push(service);
  //   } else {
  //     acc.push({ name: service.category, items: [service] });
  //   }
  //   return acc;
  // }, []);
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
      {selected === "services" ? (
        <div className="mt-8">
          {categories.map((cat) => (
            <div key={cat.name} className="mb-6">
              <div className="flex text-2xl font-bold mb-4 border-2 border-foreground w-full px-4 py-2 rounded-lg">
                <span>{cat.name}</span>
                <span></span>
              </div>
              <ul>
                {cat.items.map((service) => (
                  <li
                    key={service.id}
                    className="flex justify-between border-b border-gray-300 py-2"
                  >
                    <span>{service.name}</span>
                    <span>${service.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Staff Members</h2>
        </div>
      )}
    </div>
  );
}

export default ServiceSelection;
