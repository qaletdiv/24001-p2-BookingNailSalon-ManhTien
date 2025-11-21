import DateTime from "@/components/booking/datetime/DateTime";
import { fetchAppointmentData } from "@/functions/fetchAppointmentData";
import { fetchServicesData } from "@/functions/fetchServicesData";
import { fetchStaffData } from "@/functions/fetchStaffData";
import DataHydrator from "@/components/datahydrator/DataHyrator";
export default async function DatetimePage() {
  const appointments = await fetchAppointmentData();
  return (
    <>
      <h1 className="text-xl font-bold text-center  w-1/2 mx-auto  text-neutral-900 px-4 py-2 border-b border-gray-400">
        Date and Time
      </h1>
      <DateTime appointmentData={appointments} />
    </>
  );
}
