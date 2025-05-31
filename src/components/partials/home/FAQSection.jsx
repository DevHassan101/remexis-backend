import { useState } from "react";

export default function FAQSection() {
  // FAQ data array
  const faqs = [
    {
      id: 1,
      question: "How long does it take to publish my first article?",
      answer:
        "We aim to expedite articles and ensure a quick turnaround. Our team begins working so you fast track yours. We ensure high-quality content, tailored to your needs, and we aim to have it 3 to 5 business days. Our priority is balancing between expedient delivery and ensuring your satisfaction with your first delivery.",
    },
    {
      id: 2,
      question: "How often is new content added to the feed?",
      answer:
        "We regularly update our content feed with new articles. New content is typically added on a weekly basis to ensure our readers always have access to the latest evidence-based information on herbs, supplements, and integrative health practices.",
    },
    {
      id: 3,
      question: "Are all articles reviewed by healthcare professionals?",
      answer:
        "Yes, all of our articles undergo a rigorous review process by qualified healthcare professionals before publication. This ensures that the information provided is accurate, evidence-based, and clinically relevant for practicing clinicians.",
    },
    {
      id: 4,
      question: "Can I choose specific natural remedies to be covered?",
      answer:
        "Yes, we welcome suggestions for specific natural remedies or integrative health topics. If you have particular interests or areas you'd like to see covered, please let us know and our team will consider them for future articles.",
    },
    {
      id: 5,
      question: "Can I integrate these articles into my clinic website?",
      answer:
        "Yes, we offer options for integrating our content into clinic websites. Depending on your subscription level, you can embed articles, link to our content, or receive white-labeled content for your website. Please contact our support team for specific integration options.",
    },
  ];

  // State to track which FAQ is open
  const [openFaqId, setOpenFaqId] = useState(1); // Set the first FAQ open by default

  // Function to toggle FAQ open/closed
  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 w-full">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-xl sm:text-3xl lg:text-4xl lg:leading-[40px] xl:text-[2.513rem] 2xl:text-[44px] font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#64647c] max-w-[924px] mx-auto">
            Explore concise, evidence-based articles on herbs, supplements, and
            integrative health—regularly updated to keep clinicians informed and
            inspired.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="grid lg:grid-cols-2 lg:grid-rows-3 gap-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`${
                openFaqId === faq.id ? "row-span-2" : "row-span-1"
              } shadow-lg rounded-lg bg-white overflow-hidden`}
            >
              {/* Question (header) */}
              <button
                onClick={() => toggleFaq(faq.id)}
                className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full p-4 lg:p-5 text-left"
                aria-expanded={openFaqId === faq.id}
              >
                <span className="text-2xl">
                  {openFaqId === faq.id ? "−" : "+"}
                </span>
                <span className="font-medium text-gray-800">
                  {faq.question}
                </span>
              </button>

              {/* Answer (content) */}
              <div
                className={`px-4 sm:px-5 overflow-hidden transition-all duration-300 ease-in-out ${
                  openFaqId === faq.id ? "max-h-96 pb-5" : "max-h-0"
                }`}
              >
                <p className="text-sm sm:text-base text-gray-600">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
