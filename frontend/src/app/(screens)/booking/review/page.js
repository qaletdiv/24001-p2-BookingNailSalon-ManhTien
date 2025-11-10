import ReviewList from "@/components/booking/ServiceSelection/ReviewList";
import DataHydrator from "@/components/datahydrator/DataHyrator";
import { fetchServicesData } from "@/functions/fetchServicesData";
import { fetchStaffData } from "@/functions/fetchStaffData";
export default async function ReviewPage() {
  const servicesData = await fetchServicesData();
  const staffData = await fetchStaffData();
  return (
    <>
      <h1 className="text-xl font-bold text-center  w-1/2 mx-auto  text-neutral-900 px-4 py-2 border-b border-gray-400">
        Review
      </h1>
      <DataHydrator services={servicesData} staff={staffData} />
      <ReviewList />
    </>
  );
}
