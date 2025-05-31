"use client";

import FAQSection from "../../components/partials/home/FAQSection";
import TopSection from "../../components/ui/TopSection";

export default function Faqs() {
  return (
    <section className="bg-white pt-6 px-5">
      <TopSection top={"FAQs"} />

      <div className="bg-white pt-12 pb-28">
        <FAQSection />
      </div>
    </section>
  );
}
