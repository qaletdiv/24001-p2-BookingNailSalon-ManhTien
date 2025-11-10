import ServiceSelection from "@/components/booking/ServiceSelection/ServiceSelection";
import { fetchServicesData } from "@/functions/fetchServicesData";
import { fetchStaffData } from "@/functions/fetchStaffData";
import { redirect } from "next/navigation";

export default async function BookingPage() {
  // const servicesData = await fetchServicesData();

  // const staffData = await fetchStaffData();
  // return <ServiceSelection servicesData={servicesData} staffData={staffData} />;
  redirect("/booking/services");
}
