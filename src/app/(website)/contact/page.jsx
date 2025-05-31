"use client";

import TopSection from "../../components/ui/TopSection";
import Image from "next/image";
import ContactForm from "../../components/partials/contact/ContactForm";
import FAQSection from "../../components/partials/home/FAQSection";

export default function Contact() {
  return (
    <>
      <section className="px-4 pt-5 sm:px-5 sm:pt-6 bg-white">
        <TopSection top={"Contact Us"} />

        <div className="container mx-auto bg-white pt-20">
          <div className="w-full flex flex-col lg:flex-row gap-20">
            {/* Left Side Image */}
            <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center items-center">
              <Image
                src={"/assets/icons/contact.png"}
                alt="Happy user"
                width={560}
                height={460}
                className="object-cover"
              />
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-1/2">
              <span className="text-primary-main mb-4 sm:mb-6 leading-[26px] text-xs sm:text-sm md:text-base items-center gap-2 bg-[#f4f4fe] font-semibold px-3 py-1 rounded-full inline-flex">
                <span className="leading-[0px] mt-1.5 text-2xl sm:text-3xl">
                  *
                </span>{" "}
                Connect with Us
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl xl:leading-[60px] font-bold text-[#333349] mb-2 sm:mb-6">
                We're Here to <span className="text-primary-main">Help</span>{" "}
                You!
              </h2>
              <p className="text-[#64647C] text-sm sm:text-lg lg:text-xl xl:text-[22px] xl:leading-[33px] mb-4 sm:mb-6">
                Our dedicated support team is ready to assist you with anything
                you need regarding our AI Photo Editor.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <FAQSection />
    </>
  );
}
