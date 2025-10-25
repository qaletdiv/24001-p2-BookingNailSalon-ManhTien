import Link from "next/link";
import { Tangerine } from "next/font/google";
import { tangerine } from "@/app/layout";
const Footer = () => {
  return (
    <footer className="bg-black text-background px-4 md:px-[10%] py-12">
      <div>
        <h1 className={`${tangerine.className} text-6xl`}>Menu &mdash; </h1>
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/about"}>About Us</Link>
          </li>
          <li>
            <Link href={"/services"}>Services</Link>
          </li>
          <li>
            <Link href={"/gallery"}>Gallery</Link>
          </li>
          <li>
            <Link href={"/contact"}>Contact Us</Link>
          </li>
          <li>
            <Link href={"/booking"}>Booking Now</Link>
          </li>
        </ul>
      </div>
      <div className="pt-8 text-sm text-center">
        &copy; {new Date().getFullYear()} Your Company Name. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
