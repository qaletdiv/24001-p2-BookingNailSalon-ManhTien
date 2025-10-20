"use client";

import Link from "next/link";
import Image from "next/image";
import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPage = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed w-full shadow-2xs bg-black opacity-90 md:px-12 px-2 py-0 flex justify-between items-center text-neutral-100 z-50">
        <Link href={"/"} className="">
          <div className="relative w-24 h-24">
            <Image
              src={"/LuxeNailLogo.png"}
              alt="logo"
              fill
              className="contain"
              priority
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </Link>
        <nav className="hidden gap-8 justify-between lg:flex text-xl">
          <Link
            href={"/"}
            className={`px-2 py-1 ${
              currentPage === "/"
                ? "text-[#dfba9f] border-b-foreground border-b-2"
                : ""
            }`}
          >
            Home
          </Link>
          <Link
            href={"/about"}
            className={`px-2 py-1 ${
              currentPage === "/about"
                ? "text-[#dfba9f] border-b-foreground border-b-2"
                : ""
            }`}
          >
            About Us
          </Link>
          <Link
            href={"/services"}
            className={`px-2 py-1 ${
              currentPage === "/services"
                ? "text-[#dfba9f] border-b-foreground border-b-2"
                : ""
            }`}
          >
            Services
          </Link>
          <Link
            href={"/gallery"}
            className={`px-2 py-1 ${
              currentPage === "/gallery"
                ? "text-[#dfba9f] border-b-foreground border-b-2"
                : ""
            }`}
          >
            Gallery
          </Link>
          <Link
            href={"/contact"}
            className={`px-2 py-1 ${
              currentPage === "/contact"
                ? "text-[#dfba9f] border-b-foreground border-b-2"
                : ""
            }`}
          >
            Contact Us
          </Link>
          <Link
            href={"/booking"}
            className={`px-2 py-1 bg-foreground text-neutral-900 rounded-md`}
          >
            Booking Now
          </Link>
        </nav>
        <button onClick={toggleMenu} className="z-50 lg:hidden">
          <MenuIcon className="size-12" />
        </button>
      </header>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        />
      )}

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-black text-neutral-100 z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-6">
          <button onClick={closeMenu}>
            <X className="size-10" />
          </button>
        </div>
        <nav className="flex flex-col gap-8 px-8 text-2xl">
          <Link
            href={"/"}
            onClick={closeMenu}
            className="hover:text-neutral-300 transition-colors"
          >
            Home
          </Link>
          <Link
            href={"/about"}
            onClick={closeMenu}
            className="hover:text-neutral-300 transition-colors"
          >
            About Us
          </Link>
          <Link
            href={"/services"}
            onClick={closeMenu}
            className="hover:text-neutral-300 transition-colors"
          >
            Services
          </Link>
          <Link
            href={"/gallery"}
            onClick={closeMenu}
            className="hover:text-neutral-300 transition-colors"
          >
            Gallery
          </Link>
          <Link
            href={"/contact"}
            onClick={closeMenu}
            className="hover:text-neutral-300 transition-colors"
          >
            Contact Us
          </Link>
          <Link
            href={"/booking"}
            onClick={closeMenu}
            className=" w-3/4 text-center py-2 bg-foreground text-neutral-900 rounded-md"
          >
            Booking Now
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Header;
