"use client";
import { useRouter } from "next/navigation";
const ServicesList = ({ servicesData }) => {
  const router = useRouter();
  console.log(servicesData);
  const manicureServices = servicesData.filter((service) => service.category === "Manicure");
  const pedicureServices = servicesData.filter((service) => service.category === "Pedicure");
  const enhancementServices = servicesData.filter((service) => service.category === "Enhancement");
  const otherServices = servicesData.filter((service) => service.category !== "Manicure" && service.category !== "Pedicure" && service.category !== "Enhancement");
  return (
    <section className="py-12 flex flex-col items-center justify-center gap-4 md:px-32 px-0">
      <div className="w-full">
        <h2 className="text-3xl font-bold border-b border-gray-300 pb-2">Manicure</h2>
        {manicureServices.map((service) => (
          <div key={service.id} className="p-2 flex flex-col justify-between">
            <h2 className="text-xl font-bold">{service.name}</h2>
            <p className="text-lg text-gray-700">{service.description}</p>
            <p className="text-lg text-gray-700">Prices: $ {service.price}</p>
            <p className="text-lg text-gray-700">Duration: {service.duration} minutes</p>
          </div>
        ))}
      </div>
      <div className="w-full">
        <h2 className="text-3xl font-bold border-b border-gray-300 pb-2">Pedicure</h2>
        {pedicureServices.map((service) => (
          <div key={service.id} className="p-2 flex flex-col justify-between">
            <h2 className="text-xl font-bold">{service.name}</h2>
            <p className="text-lg text-gray-700">{service.description}</p>
            <p className="text-lg text-gray-700">Prices: $ {service.price}</p>
            <p className="text-lg text-gray-700">Duration: {service.duration} minutes</p>
          </div>
        ))}
      </div>
      <div className="w-full">
        <h2 className="text-3xl font-bold border-b border-gray-300 pb-2">Enhancement</h2>
        {enhancementServices.map((service) => (
          <div key={service.id} className="p-2 flex flex-col justify-between">
            <h2 className="text-xl font-bold">{service.name}</h2>
            <p className="text-lg text-gray-700">{service.description}</p>
            <p className="text-lg text-gray-700">Prices: $ {service.price}</p>
            <p className="text-lg text-gray-700">Duration: {service.duration} minutes</p>
          </div>
        ))}
      </div>
      <div className="w-full">
        <h2 className="text-3xl font-bold border-b border-gray-300 pb-2">Other</h2>
        {otherServices.map((service) => (
          <div key={service.id} className="p-2 flex flex-col justify-between">
            <h2 className="text-xl font-bold">{service.name}</h2>
            <p className="text-lg text-gray-700">{service.description}</p>
            <p className="text-lg text-gray-700">Prices: $ {service.price}</p>
            <p className="text-lg text-gray-700">Duration: {service.duration} minutes</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default ServicesList;