"use client";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import logo from "../../../public/assets/logo/logo-footer.png";

const Footer = () => {
  return (
    <footer className="bg-[#ECEDDF]">
      <div className="container mx-auto pt-[68px] pb-28 px-2">
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-8 text-[#000000]">
          {/* Contact Us Section */}
          <div className=" gap-4 pt-10 text-center lg:text-left flex flex-col items-center lg:items-start lg:justify-start justify-center">
            <h3 className="leading-[26px] font-medium text-[25px]">
              Contact Us
            </h3>
            <div className="space-y-2">
              <p className=" text-sm">
                1234 Willow Cove Dr.
                <br />
                Springfield, IL 62704
              </p>
              <div className="pt-4 ">
                <h4 className="leading-[26px] font-medium text-[25px] mb-6">
                  Need help? Call us
                </h4>
                <a href="tel:+1(888)555-0147" className="block">
                  +1 (888) 555-0147
                </a>
                <a href="mailto:support@gmail.com" className="block">
                  support@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Center Logo Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="mb-3">
              <Image
                src={logo}
                alt="Natremed AI Logo"
                width={120}
                height={121}
                className="object-contain"
              />
            </div>
            <p className="text-center leading-[23px] max-w-[401px] mb-4">
              Natremed AI is dedicated to empowering clinicians with fast,
              evidence-based natural-medicine guidance—anytime, anywhere.
            </p>

            <div className="">
              <h4 className="text-[25px] leading-[24px] text-center font-semibold mb-7">
                Follow Us
              </h4>
              <div className="flex items-center justify-center gap-3">
                <a href="#" className="text-primary-main">
                  <Icon icon="ic:baseline-facebook" width={20} height={20} />
                </a>
                <a href="#" className="text-primary-main">
                  <Icon icon="akar-icons:youtube-fill" width={20} height={14} />
                </a>
                <a href="#" className="text-primary-main">
                  <Icon icon="fa6-brands:github" width={20} height={19} />
                </a>
                <a href="#" className="text-primary-main">
                  <Icon icon="pajamas:twitter" width={20} height={20} />
                </a>
                <a href="#" className="text-primary-main">
                  <Icon icon="uil:linkedin" width={20} height={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4 pt-10 ">
            <h3 className="font-bold text-lg text-center lg:text-right">
              NEWSLETTER
            </h3>
            <div className="flex justify-center lg:justify-end space-y-2">
              <p className="max-w-[343px] text-sm text-center lg:text-right">
                Stay in the loop with feature updates, clinical tips, and early
                access to premium tools.
              </p>
              {/* <div className="flex mt-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 p-2 text-sm border border-gray-300 focus:outline-none"
                />
                <button className="bg-[#D16D31] text-white px-4 py-2">
                  <Icon
                    icon="material-symbols:arrow-forward"
                    width={20}
                    height={20}
                  />
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-[#D16D31] py-2 px-4">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-2 text-white">
          <div className="text-xs sm:text-sm">
            Copyright © {new Date().getFullYear()}
          </div>
          <div className="flex items-center gap-2 divide-x divide-white text-xs sm:text-sm">
            <Link href="/terms" className="hover:underline pr-2">
              Terms of use
            </Link>

            <Link href="/privacy" className="hover:underline">
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
