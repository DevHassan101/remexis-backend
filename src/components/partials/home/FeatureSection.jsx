"use client";

import { Icon } from "@iconify/react";

export default function FeatureSection() {
  const features = [
    {
      title: "24/7 Customer Support",
      desc: "Always available to assist customers, resolve issues, and provide information at any time.",
      icon: "iconamoon:star-thin",
    },
    {
      title: "Integrations",
      desc: "Connect with existing tools, including medical records and eCommerce platforms.",
      icon: "mdi-light:file-plus",
    },
    {
      title: "Auto-Refills",
      desc: "Improve re-buying from user interactions according to relevance, schedules, or real-time responses.",
      icon: "ri:loop-left-fill",
    },
    {
      title: "Privacy & Security",
      desc: "Ensure extensive data safety with integrations and compliance with data regulations.",
      icon: "bi:lock",
    },
    {
      title: "Whitelist Options",
      desc: "Prescreen user queries fully without third-party branding distractions.",
      icon: "ep:collection-tag",
    },
    {
      title: "Multiple Data Sources",
      desc: "Incorporate results from peer-reviewed literature to provide accurate answers.",
      icon: "icon-park-outline:data",
    },
    {
      title: "Flexible Customization",
      desc: "Adjust everything from the features to your clinic’s tone/identity.",
      icon: "fluent:paint-brush-sparkle-20-regular",
    },
    {
      title: "80+ Languages",
      desc: "Communicate effectively with customers worldwide, breaking language barriers.",
      icon: "ion:earth-outline",
    },
  ];

  return (
    <section className="bg-primary-main text-white py-20 px-4">
      <div className="w-full container mx-auto text-center mb-12">
        <span className="text-sm font-medium bg-transparent border border-white px-4 py-1.5 rounded-full inline-block mb-4">
          KEY FEATURES
        </span>
        <h2 className="md:w-[680px] text-xl sm:text-3xl lg:text-4xl lg:leading-[40px] xl:text-[2.513rem] 2xl:text-5xl font-medium 2xl:leading-[58px] mb-2.5 mx-auto">
          Support Your Patients Through Evidence-Based AI
        </h2>
        <p className=" text-base sm:text-lg text-white/60 max-w-xl 2xl:max-w-3xl mx-auto">
          Explore the advanced capabilities that make our natural-medicine
          assistant indispensable for busy healthcare professionals.
        </p>
      </div>

      <div className="w-full container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 2xl:gap-x-8 gap-y-4">
        {features.map((item, i) => (
          <div
            key={i}
            className="bg-white/5 p-6 2xl:px-10 2xl:py-8 rounded-xl h-full"
          >
            <span className="w-[66px] h-[66px] bg-white/10 rounded-xl flex items-center justify-center mb-4 2xl:mb-6">
              <Icon icon={item.icon} className="text-white w-6 h-6" />
            </span>
            <h4 className="text-lg font-medium leading-[26px] mb-2">
              {item.title}
            </h4>
            <p className=" leading-[28px] text-white/60">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
