"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { tangerine } from "@/app/layout";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
const categories = ["pedicure", "manicure", "enhancement", "addon", "waxing"];
const ServicesHomePage = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef();
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % categories.length);
    }, 3000);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [index]);
  const handleLeftChevron = () => {
    setIndex((i) => (i - 1 + categories.length) % categories.length);
  };
  const handleRightChevron = () => {
    setIndex((i) => (i + 1) % categories.length);
  };
  return (
    <section className="px-4 md:px-[15%] md:py-16 ">
      <div className="text-center pb-8">
        <h1 className={`${tangerine.className} text-7xl font-extrabold`}>
          Our Services
        </h1>
        <p className="text-sm">
          Your nails are a blank canvas waiting for creattivity.
        </p>
        <Link href={"/services"} className="">
          READ MORE
        </Link>
      </div>
      {/* Slider Container */}
      <div className="h-96 relative w-full overflow-hidden ">
        {/* Navigation Buttons */}
        <button
          className="z-45 absolute left-[1%] top-[40%]"
          onClick={handleLeftChevron}
        >
          <ChevronLeft className="size-10" />
        </button>
        <button
          onClick={handleRightChevron}
          className="z-45 absolute right-[1%] top-[40%] "
        >
          <ChevronRight className="size-10" />
        </button>
        {/* Slides Container */}
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out "
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {categories.map((category, idx) => {
            return (
              <div
                key={idx}
                className="h-full min-w-full relative flex flex-col justify-between "
              >
                <div className="bg-foreground h-full ">image</div>
                <div className="bg-black text-center py-4">
                  <Link
                    href={`/services/#${category}}`}
                    className="text-white font-bold text-2xl"
                  >
                    {`${category.charAt(0).toUpperCase()}${category.slice(1)}`}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesHomePage;
