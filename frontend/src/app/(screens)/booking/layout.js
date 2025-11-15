import { Tangerine } from "next/font/google";
import BookingStep from "@/components/booking/bookingstep/BookingStep";
import DataHydrator from "@/components/datahydrator/DataHyrator";
import { fetchServicesData } from "@/functions/fetchServicesData";
import { fetchStaffData } from "@/functions/fetchStaffData";
import { fetchAppointmentData } from "@/functions/fetchAppointmentData";
const tangerine = Tangerine({
  weight: ["400", "700"],
  variable: "--font-tangerine",
  subsets: ["latin"],
});

const BookingLayout = async ({ children }) => {
  // const services = await fetchServicesData();
  // const staff = await fetchStaffData();
  // const appointments = await fetchAppointmentData();
  return (
    <>  
    {/* <DataHydrator services={services} staff={staff} appointments={appointments} /> */}
    {/* <BookingStep /> */}

    <section className="pt-28 pb-12 h-full flex justify-center  elegant-swirl-pattern">
      <div className="text-center flex flex-col gap-2  md:w-3/4 items-stretch w-full px-4 ">
        <h1 className={`${tangerine.className} md:text-7xl text-5xl font-bold`}>
          Luxe Nail Studio
        </h1>
        <div className="flex justify-center flex-col items-center ">
          <p>(321) 800 9445</p>

          <p>123 Main St, Anytown, USA</p>
        </div>
        {children}
      </div>
    </section>
    </>
  );
};

export default BookingLayout;
