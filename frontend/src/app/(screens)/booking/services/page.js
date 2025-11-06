import ServiceCategories from "@/components/booking/ServiceSelection/ServiceCategories";
import { fetchServicesData } from "@/functions/fetchServicesData";
import Link from "next/link";
export default async function ServicesPage() {
  const servicesData = await fetchServicesData();
  const categories = Array.from(
    servicesData
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
    <>
      <h1 className="text-xl font-bold text-center  w-1/2 mx-auto  text-neutral-900 px-4 py-2 border-b border-gray-400">
        Services
      </h1>
      <ServiceCategories servicesData={categories} />
    </>
  );
}
