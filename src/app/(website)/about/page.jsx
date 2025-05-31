"use client";

import TopSection from "@/components/ui/TopSection";
import Image from "next/image";
import { Icon } from "@iconify/react";

export default function About() {
  return (
    <section className="px-4 pt-5 sm:px-5 sm:pt-6 bg-white">
      <TopSection top={"About"} />

      <div className="py-12 container mx-auto text-[#000000]">
        {/* Welcome Section */}
        <div className="mb-10 sm:mb-14 md:mb-20 xl:mb-32">
          <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-[25px] text-primary-main leading-[25px] mb-4">
            About Us - Remexis
          </h2>
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-[40px] mb-4">
            Welcome to Remexis
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl 2xl:text-[23px] 2xl:leading-[24px] mb-4">
            Welcome to Remexis - - the innovative AI-powered platform built to
            bridge the gap between conventional healthcare and the world of
            natural medicine. We understand the increasing demand for
            non-pharmacological options and the vital role of informed
            discussions between healthcare professionals and individuals seeking
            these solutions.
          </p>
          <p className="text-sm sm:text-lg lg:text-xl 2xl:text-[23px] 2xl:leading-[24px] mb-4">
            Remexis affords practitioners instant insight into the vast
            landscape of natural medicine – knowledge that can often take years
            of dedicated study to acquire. Our intuitive, AI-driven system
            delivers real-time, evidence-based information directly to your
            fingertips.
          </p>
          <p className="text-sm sm:text-lg lg:text-xl 2xl:text-[23px] 2xl:leading-[24px] mb-4">
            Now, you can confidently discuss a wider range of available options
            with your patients, all within the consultation room. No need for
            extensive research or to leave the patient's side. Remexis empowers
            you to enhance your practice, expand your treatment strategies, and
            foster a more holistic approach to patient care.
          </p>
        </div>

        {/* Our Mission Section */}
        <div className="flex flex-col items-start gap-8 xl:gap-12 mb-6 sm:mb-8 md:mb-20 xl:mb-32 lg:flex-row">
          {/* Text */}
          <div className="lg:w-1/2">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[40px] mb-2 sm:mb-4 xl:mb-6">
              Our Mission
            </h3>
            <p className="text-sm sm:text-lg xl:text-xl 2xl:text-[23px] 2xl:leading-[24px] mb-3 xl:mb-8">
              Our mission is to empower healthcare practitioners with the
              knowledge they need to confidently integrate natural medicine into
              their practice, ultimately enhancing patient well-being. We aim
              to:
            </p>

            <ul className="text-sm sm:text-base 2xl:text-[17px] 2xl:leading-[24px] space-y-2 xl:space-y-4 2xl:space-y-6 list-inside pr-4">
              <li className="flex gap-2 sm:gap-2.5 xl:gap-3 2xl:gap-3.5">
                <span className="text-primary-main pt-1 sm:pt-0.5">
                  <Icon
                    width={28}
                    height={28}
                    className="size-4 sm:size-5 2xl:size-7"
                    icon="healthicons:yes"
                  />
                </span>
                <span className="leading-[24px]">
                  Simplify Discovery: Eliminate the hours spent sifting through
                  countless studies and articles. Our intuitive search interface
                  allows you to find the information you need in seconds.
                </span>
              </li>
              <li className="flex gap-2 sm:gap-2.5 xl:gap-3 2xl:gap-3.5">
                <span className="text-primary-main pt-1 sm:pt-0.5">
                  <Icon
                    width={28}
                    height={28}
                    className="size-4 sm:size-5 2xl:size-7"
                    icon="healthicons:yes"
                  />
                </span>
                <span className="leading-[24px]">
                  Enhance Confidence: Provide access to a curated and
                  comprehensive database, helping you make informed decisions
                  based on the latest evidence and established practices.
                </span>
              </li>
              <li className="flex gap-2 sm:gap-2.5 xl:gap-3 2xl:gap-3.5">
                <span className="text-primary-main pt-1 sm:pt-0.5">
                  <Icon
                    width={28}
                    height={28}
                    className="size-4 sm:size-5 2xl:size-7"
                    icon="healthicons:yes"
                  />
                </span>
                <span className="leading-[24px]">
                  Save You Time: Reclaim valuable time by making research faster
                  and more efficient, allowing you to focus more on patient
                  interaction and care.
                </span>
              </li>
              <li className="flex gap-2 sm:gap-2.5 xl:gap-3 2xl:gap-3.5">
                <span className="text-primary-main pt-1 sm:pt-0.5">
                  <Icon
                    width={28}
                    height={28}
                    className="size-4 sm:size-5 2xl:size-7"
                    icon="healthicons:yes"
                  />
                </span>
                <span className="leading-[24px]">
                  Promote Holistic Care: Facilitate the integration of natural
                  medicine alongside conventional treatments for a more
                  comprehensive approach to patient health. Why Choose Remexis?
                </span>
              </li>
              <li className="flex gap-2 sm:gap-2.5 xl:gap-3 2xl:gap-3.5">
                <span className="text-primary-main pt-1 sm:pt-0.5">
                  <Icon
                    width={28}
                    height={28}
                    className="size-4 sm:size-5 2xl:size-7"
                    icon="healthicons:yes"
                  />
                </span>
                <span className="leading-[24px]">
                  AI-Powered Precision: Our intelligent search algorithms
                  understand the nuances of natural medicine terminology,
                  ensuring you find the most relevant information, even with
                  complex queries
                </span>
              </li>
              <li className="flex gap-2 sm:gap-2.5 xl:gap-3 2xl:gap-3.5">
                <span className="text-primary-main pt-1 sm:pt-0.5">
                  <Icon
                    width={28}
                    height={28}
                    className="size-4 sm:size-5 2xl:size-7"
                    icon="healthicons:yes"
                  />
                </span>
                <span className="leading-[24px]">
                  Practitioner-Focused: We understand the specific needs of
                  healthcare professionals and have designed our platform with
                  your workflow in mind.
                </span>
              </li>
              <li className="flex gap-2 sm:gap-2.5 xl:gap-3 2xl:gap-3.5">
                <span className="text-primary-main pt-1 sm:pt-0.5">
                  <Icon
                    width={28}
                    height={28}
                    className="size-4 sm:size-5 2xl:size-7"
                    icon="healthicons:yes"
                  />
                </span>
                <span className="leading-[24px]">
                  Evidence-Based Approach: While embracing traditional
                  knowledge, we prioritize access to scientific evidence to
                  support informed decision-making
                </span>
              </li>
            </ul>
          </div>

          {/* Image */}
          <div className="w-full flex justify-center lg:w-1/2">
            <Image
              src={"/assets/images/remex-team.png"}
              width={729}
              height={821}
              className="w-full h-full object-cover 2xl:[729px] 2xl:h-[821px] lg:rounded-2xl"
              alt="Remexis Team"
            />
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-12 text-sm sm:text-base md:text-lg lg:text-xl xl:text-[23px] xl:leading-[27px]">
          <p className="mb-1 sm:mb-1.5 md:mb-2 xl:mb-2.5">
            B- the data is often ignored as it is given short shrift as
            anecdotal even though users online have been giving their
            experiential testimonies on the studied effects. That is data, as
            some peer review analysts are slowly beginning to realize.
          </p>
          <p className="mb-1 sm:mb-1.5 md:mb-2 xl:mb-2.5">
            For example: if X animal study says that an ailment currently
            considered irreversible was reversed by Y natural ancient compound,
            and 1000 users in online forums attest to that result in their
            personal use over decades - Data!
          </p>
          <p className="mb-1 sm:mb-1.5 md:mb-2 xl:mb-2.5">
            Remexis intends to incorporate this data where available in the
            future for as many natural medicines as possible.
          </p>
          <p className="mt-6 font-semibold text-black">
            Remexis – Your intelligent resource for natural medicine.
          </p>
        </div>
      </div>
    </section>
  );
}
