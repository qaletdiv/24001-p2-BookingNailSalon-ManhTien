"use client";
import { tangerine } from "@/app/layout";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
const AboutHomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    // copy ref to local variable so cleanup uses the same node
    const node = aboutRef.current;
    if (!node) return;
    // 1. Create the observer
    const observer = new IntersectionObserver(
      // 2. Callback function - runs when visibility changes
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: Stop observing after first trigger
          // observer.unobserve(entry.target);
        }
      },
      // 3. Options
      {
        root: null, // Use viewport as root
        rootMargin: "0px 0px -100px 0px", // Trigger 100px before element enters
        threshold: 0.1, // Trigger when 10% of element is visible
      }
    );

    // 4. Start observing the element
    observer.observe(node);

    // 5. Cleanup function - stop observing when component unmounts
    return () => {
      if (node) {
        observer.unobserve(node);
        observer.disconnect();
      }
    };
  }, []); // Empty dependency array = run once on mount

  return (
    <section className="my-8 md:px-[5%] overflow-hidden">
      {/* ABout Container */}
      <div
        id="about-container"
        ref={aboutRef}
        className={`bg-white mx-4 opacity-0 px-6 py-8 rounded-2xl transition-all duration-1000 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-95"
        }`}
      >
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
