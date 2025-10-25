import Link from "next/link";

import { tangerine } from "@/app/layout";
const Footer = () => {
  return (
    <footer className="relative bottom-0 w-full overflow-hidden bg-[#0b0b0b] text-white py-16 px-4 md:px-[10%]">
      {/* Content container */}
      <div className=" z-10 grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {/* Menu */}
        <div>
          <h1
            className={`${tangerine.className} text-foreground text-6xl md:text-4xl`}
          >
            Menu &mdash;{" "}
          </h1>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center gap-3">
              <svg
                className="w-4 h-4 text-foreground flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 5l8 7-8 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link href={"/"}>Home</Link>
            </li>
            <li className="flex items-center gap-3">
              <svg
                className="w-4 h-4 text-foreground flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 5l8 7-8 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link href={"/about"}>About Us</Link>
            </li>
            <li className="flex items-center gap-3">
              <svg
                className="w-4 h-4 text-foreground flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 5l8 7-8 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link href={"/services"}>Services</Link>
            </li>
            <li className="flex items-center gap-3">
              <svg
                className="w-4 h-4 text-foreground flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 5l8 7-8 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link href={"/gallery"}>Gallery</Link>
            </li>
            <li className="flex items-center gap-3">
              <svg
                className="w-4 h-4 text-foreground flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 5l8 7-8 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link href={"/contact"}>Contact Us</Link>
            </li>
          </ul>
        </div>
        {/* addrees */}
        <div>
          <h1
            className={`${tangerine.className} text-foreground text-6xl md:text-4xl `}
          >
            Address &mdash;{" "}
          </h1>
          <p className="mt-4">
            123 Elegance St., Suite 456
            <br />
            Glamour City, GC 78910
          </p>
        </div>
        {/* open hours*/}
        <div>
          <h1
            className={`${tangerine.className} text-foreground text-6xl md:text-4xl `}
          >
            Open Hours &mdash;{" "}
          </h1>
          <p className="mt-4">
            Monday - Friday: 9:00 AM - 7:00 PM
            <br />
            Saturday: 10:00 AM - 5:00 PM
            <br />
            Sunday: Closed
          </p>
        </div>
      </div>
      <div className="pt-8 text-sm text-center">
        &copy; {new Date().getFullYear()} Your Company Name. All rights
        reserved.
      </div>

      {/* Soft Gold Hexagon Background */}
      <svg
        className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 300"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Hexagon pattern */}
          <pattern
            id="hexGold"
            width="86"
            height="74"
            patternUnits="userSpaceOnUse"
          >
            <polygon
              points="43,0 86,21 86,53 43,74 0,53 0,21"
              fill="none"
              stroke="#d4af37"
              strokeWidth="0.8"
              opacity="0.2"
            />
          </pattern>

          {/* Gradient overlay */}
          <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#bfa14a" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Base hex pattern */}
        <rect width="100%" height="100%" fill="url(#hexGold)" />

        {/* Gradient overlay for subtle lighting */}
        <rect width="100%" height="100%" fill="url(#goldGrad)" opacity="0.5" />
      </svg>
    </footer>
  );
};

export default Footer;
