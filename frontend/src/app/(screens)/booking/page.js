import { Tangerine } from "next/font/google";
import ServiceSelection from "@/components/booking/ServiceSelection/ServiceSelection";
import { fetchServicesData } from "@/functions/fetchServicesData";
import { fetchStaffData } from "@/functions/fetchStaffData";
const tangerine = Tangerine({
  weight: ["400", "700"],
  variable: "--font-tangerine",
  subsets: ["latin"],
});

export default async function BookingPage() {
  const servicesData = await fetchServicesData();

  const staffData = await fetchStaffData();
  return <ServiceSelection servicesData={servicesData} staffData={staffData} />;
}
