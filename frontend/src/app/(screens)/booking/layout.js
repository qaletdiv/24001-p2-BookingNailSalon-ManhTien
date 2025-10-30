import { Tangerine } from "next/font/google";
const tangerine = Tangerine({
  weight: ["400", "700"],
  variable: "--font-tangerine",
  subsets: ["latin"],
});

const BookingLayout = ({ children }) => {
  return (
    <section className="pt-36 pb-12 h-full flex justify-center  elegant-swirl-pattern">
      <div className="text-center flex flex-col gap-4 md:w-3/4  ">
        <h1 className={`${tangerine.className} md:text-7xl text-5xl font-bold`}>
          Book your appointment
        </h1>
        {children}
      </div>
    </section>
  );
};

export default BookingLayout;
