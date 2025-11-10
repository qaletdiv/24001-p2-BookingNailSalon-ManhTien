import { fetchStaffData } from "@/functions/fetchStaffData";
import StaffList from "@/components/booking/ServiceSelection/StaffList";
export default async function StaffPage() {
  const staffData = await fetchStaffData();
  return (
    <>
      <h1 className="text-xl font-bold text-center  w-1/2 mx-auto  text-neutral-900 px-4 py-2 border-b border-gray-400">
        Staff
      </h1>
      <StaffList staffData={staffData} />
    </>
  );
}
