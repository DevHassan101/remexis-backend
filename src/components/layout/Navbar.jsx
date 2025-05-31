"use client";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = ({ isScrolled }) => {
  const location = usePathname();

  return (
    <nav className="flex items-center gap-3 xl:gap-4">
      <div className="relative group">
        <Link
          href="/"
          className={`${
            location === "/" ? "text-primary-main" : ""
          } text-[#313131] font-semibold group-hover:text-primary-500 transition duration-200 ease-in-out flex items-center gap-1 cursor-pointer`}
        >
          Home
        </Link>
      </div>
      <div className="relative group">
        <Link
          href="/about"
          className={`${
            location === "/about" ? "text-primary-main" : ""
          } text-[#313131] font-semibold group-hover:text-primary-500 transition duration-200 ease-in-out flex items-center gap-1 cursor-pointer`}
        >
          About
        </Link>
      </div>
      <div className="relative group">
        <Link
          href="/articles"
          className={`${
            location === "/articles" ? "text-primary-main" : ""
          } text-[#313131] font-semibold group-hover:text-primary-500 transition duration-200 ease-in-out flex items-center gap-1 cursor-pointer`}
        >
          Articles
        </Link>
      </div>
      <div className="relative group">
        <Link
          href="/faqs"
          className={`${
            location === "/faqs" ? "text-primary-main" : ""
          } text-[#313131] font-semibold group-hover:text-primary-500 transition duration-200 ease-in-out flex items-center gap-1 cursor-pointer`}
        >
          FAQs
        </Link>
      </div>
      <div className="relative group">
        <Link
          href="/contact"
          className={`${
            location === "/contact" ? "text-primary-main" : ""
          } text-[#313131] font-semibold group-hover:text-primary-500 transition duration-200 ease-in-out flex items-center gap-1 cursor-pointer`}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
