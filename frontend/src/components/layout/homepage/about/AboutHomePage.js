import { tangerine } from "@/app/layout";
import Image from "next/image";
import Link from "next/link";
const AboutHomePage = () => {
  return (
    <section className="my-8 md:px-[5%]">
      <div className="bg-white mx-4 px-6 py-8 rounded-2xl">
        <div className="">
          <h1
            className={`${tangerine.className} text-center text-6xl font-extrabold`}
          >
            Luxe Nail Studio
          </h1>
          <p className="text-center text-sm">
            Professional Nail Care for Ladies and Gents
          </p>
        </div>
        <div className="md:px-12">
          <p className="py-4">
            Gem Nail Bar is a top-notch nail salon and spa in Crawfordville, FL
            32327. We are the ideal destination for you to immerse yourself in a
            luxury environment.
          </p>
          <p className="pb-4">
            We guarantee to provide excellent services, especially catching up
            with new trends in nail & beauty care services. Our nail salon
            offers many services such as Manicures, Pedicures, and Nail
            Enhancement. Our staff & technicians are always there to serve you
            with the best services. They are all careful in working and
            comprehensive all your needs. We assure you that you would have a
            memorable time with us!
          </p>
          <Link href={"/about"}>READ MORE &mdash;&mdash;</Link>
        </div>
      </div>
    </section>
  );
};

export default AboutHomePage;
