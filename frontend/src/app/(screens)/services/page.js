import { Tangerine } from "next/font/google";
import { fetchServicesData } from "@/functions/fetchServicesData";
import ServicesList from "../../../components/ServicesPage/ServicesList";
const tangerine = Tangerine({
  weight: ["400", "700"],
  variable: "--font-tangerine",
  subsets: ["latin"],
});
const ServicesPage = async () => {
  const servicesData = await fetchServicesData();
  return (
    <main className="p-4 bg-background pt-24">
      <h1
        className={`${tangerine.className} text-center pt-12  text-6xl font-bold text-neutral-900`}
      >
        <em>Services</em>
      </h1>
      <ServicesList servicesData={servicesData} />
    </main>
  );
};

export default ServicesPage;
