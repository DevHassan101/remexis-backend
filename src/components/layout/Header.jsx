"use client";
import { useState } from "react";
import logo from "../../../public/assets/logo/logo.png";
import { Icon } from "@iconify/react";
import Navbar from "./Navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const location = usePathname();

  return (
    <header className="">
      <div className="bg-[#D16D31] lg:block hidden">
        <div className="container mx-auto w-full flex items-center justify-between px-2 lg:px-4 py-1 lg:py-1.5">
          <p className="text-white text-sm font-medium leading-[26px] ">
            New members: get your first 7 days of turitor Premium for free!
            Unlock discount now!
          </p>
          <div className="flex items-center gap-2 text-white divide-x divide-white">
            <span className="pr-2">
              <Icon width={"16px"} height={"16px"} icon={"ri:facebook-fill"} />
            </span>
            <span className="pr-2">
              <Icon
                width={"16px"}
                height={"16px"}
                icon={"akar-icons:twitter-fill"}
              />
            </span>
            <span className="pr-2">
              <Icon width={"16px"} height={"16px"} icon={"ri:linkedin-fill"} />
            </span>
            <span className="pr-2">
              <Icon width={"16px"} height={"16px"} icon={"la:google-plus-g"} />
            </span>
          </div>
        </div>
      </div>
      {/* Desktop Header Start */}
      <div
        className={`container mx-auto w-full hidden px-4 py-2 lg:flex items-center justify-between  transition duration-300 ease-in-out z-[999999999999999]`}
      >
        <Link href="/">
          <Image
            width={90}
            height={90}
            className={`w-[80px] h-[80px] 2xl:w-[90px] 2xl:h-[90px] object-contain`}
            src={logo}
            alt="Remexis logo"
          />
        </Link>
        <Navbar />
        <div className="items-center gap-4 lg:flex">
          <Link
            href="/login"
            className={` text-[#1B2A52] font-semibold text-sm leading-[26px] transition duration-200 ease-in-out flex items-center gap-1 cursor-pointer rounded-md px-4 py-1`}
          >
            Login
          </Link>
          <button
            className={` bg-[#D16D31] text-white font-semibold text-sm 2xl:leading-[40px] transition duration-200 ease-in-out flex items-center gap-1 cursor-pointer px-5 2xl:px-7 py-1.5 2xl:py-1 rounded-full`}
          >
            Join AI
          </button>
        </div>
      </div>
      {/* Desktop Header Start */}

      {/* Responsive Header Start */}
      <nav
        className={`lg:hidden flex justify-between px-2 py-2 items-center w-full bg-transparent z-[999999999999999]`}
      >
        <Link href="/" className="flex items-center item">
          <Image
            width={80}
            height={50}
            className="w-12 sm:w-20"
            src={logo}
            alt="Remexis logo"
          />
        </Link>

        <div
          className={`flex items-center px-2 gap-5 ${
            location === "/" ? "" : "!text-gray-700"
          }`}
        >
          <Icon
            onClick={() => setSidebar(true)}
            className="w-6 h-6 "
            icon="ion:menu-outline"
          />
        </div>
      </nav>
      {/* Responsive Header End*/}
      {/* Sidebar start */}
      <aside
        className={`fixed top-0 left-0 w-64 h-screen transition-transform bg-secondary-main z-[1000000000000] ${
          sidebar ? "-translate-x-0" : "-translate-x-full"
        }  `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto ">
          <h4 className="flex justify-end px-2 py-3 text-xl font-bold">
            {/* Categories{" "} */}
            <Icon
              icon={"charm:cross"}
              className="cursor-pointer"
              onClick={() => setSidebar(false)}
            />
          </h4>
          <div className="flex flex-col gap-4">
            <div className="relative group">
              <Link
                href="/"
                className={`${
                  location === "/" ? "text-primary-main" : "text-[#313131]"
                } text-lg font-semibold group-hover:text-shadow-none group-hover:text-primary-500 transition duration-200 ease-in-out flex items-center gap-1 cursor-pointer`}
              >
                Home
              </Link>
            </div>
            <div className="relative group">
              <Link
                href="/about"
                className={`${
                  location === "/about" ? "text-primary-main" : "text-[#313131]"
                } text-lg font-semibold group-hover:text-primary-500 transition duration-200 ease-in-out flex items-center gap-1 cursor-pointer`}
              >
                About
              </Link>
            </div>
            <div className="relative group">
              <Link
                href="/articles"
                className={`${
                  location === "/articles"
                    ? "text-primary-main"
                    : "text-[#313131]"
                } text-lg font-semibold group-hover:text-primary-500 transition duration-200 ease-in-out flex items-center gap-1 cursor-pointer`}
              >
                Articles
              </Link>
            </div>
            <div className="relative group">
              <Link
                href="/faqs"
                className={`${
                  location === "/faqs" ? "text-primary-main" : "text-[#313131]"
                } text-lg font-semibold group-hover:text-primary-500 transition duration-200 ease-in-out flex items-center gap-1 cursor-pointer`}
              >
                FAQs
              </Link>
            </div>
            <div className="relative group">
              <Link
                href="/contact"
                className={`${
                  location === "/contact"
                    ? "text-primary-main"
                    : "text-[#313131]"
                } text-lg font-semibold group-hover:text-primary-500 transition duration-200 ease-in-out flex items-center gap-1 cursor-pointer`}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </aside>
      {/* Sidebar end */}
    </header>
  );
};

export default Header;
