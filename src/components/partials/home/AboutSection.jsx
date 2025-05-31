import Image from "next/image";
import icon1 from "../../../../public/assets/icons/ai-driven.png";
import icon2 from "../../../../public/assets/icons/verified.png";
import icon3 from "../../../../public/assets/icons/time.png";
import icon4 from "../../../../public/assets/icons/customize.png";
import image from "../../../../public/assets/images/happy-customer.png";

export default function AboutSection() {
  return (
    <section className="px-4 py-10 bg-white sm:py-20">
      <div className="container flex flex-col w-full gap-8 mx-auto lg:flex-row sm:gap-10 2xl:gap-20">
        {/* Left Side Image */}
        <div className="flex-shrink-0 w-full lg:w-1/2 pt-8 sm:pt-10 2xl:w-[690px]  flex justify-center items-end bg-primary-main rounded-lg">
          <Image
            src={image}
            alt="Happy user"
            width={480}
            height={680}
            className="w-[260px] lg:w-[400px] xl:w-[480px] object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="w-full space-y-4 lg:w-1/2 ">
          <span className="text-primary-main leading-[26px] items-center gap-2 bg-[#f4f4fe] font-semibold px-3 py-1 rounded-full inline-flex">
            <span className="leading-[0px] mt-1.5 text-xl sm:text-2xl lg:text-[1.75rem] xl:text-3xl">
              *
            </span>{" "}
            About Natural Medicine
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl lg:leading-[40px] xl:text-[2.213rem] 2xl:text-[38px] -tracking-[0.4px] 2xl:leading-[49px] font-bold text-[#333349]">
            Natural medicines often don't fit neatly into the drug paradigm
            because:
          </h2>
          <div className="text-sm sm:text-lg lg:text-xl lg:leading-[24px] 2xl:leading-[33px] text-[#64647C] space-y-1">
            <p>
              A- they are not new and many have been in therapeutic use by
              humans for hundreds and sometimes thousands of years.
            </p>
            <p>
              B- the data is often ignored as it is given short shrift as
              anecdotal even though users online have been giving their
              experiential testimonies on the studied effects. That is data, as
              some peer review analysts are slowly beginning to realize.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 gap-x-6 lg:gap-x-7 xl:gap-x-8 2xl:gap-x-10 gap-y-5 lg:gap-y-6 xl:gap-y-7 2xl:gap-y-8">
            {[
              {
                title: "AI-Driven Answers",
                desc: "AI-powered, research-based answers from GenAI and PubMed.",
                icon: icon1,
              },
              {
                title: "Verified Citations",
                desc: "Each answer offers peer-reviewed studies for clinical confidence.",
                icon: icon2,
              },
              {
                title: "Time-Saving Workflows",
                desc: "Slash search time from hours to minutes during consultations.",
                icon: icon3,
              },
              {
                title: "Customizable Output",
                desc: "Tailor depth, tone, and citation style to fit your documentation.",
                icon: icon4,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#f4f4fe] px-5 py-[22px] 2xl:px-6 2xl:py-[26px] rounded-lg"
              >
                <Image
                  src={item.icon}
                  alt={item.title + " icon"}
                  className="object-contain mb-3 lg:mb-3 xl:mb-4 2xl:mb-7"
                />
                <h4 className="text-sm sm:text-[0.938rem] xl:text-base font-semibold text-md text-[#333349] mb-2 2xl:mb-3">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#64647C]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="container grid grid-cols-2 gap-4 gap-6 mx-auto mt-6 text-center md:grid-cols-4 lg:gap-10 2xl:gap-29 sm:mt-8 md:mt-10 lg:mt-12 2xl:mt-16">
        {[
          { stat: "125K+", label: "Evidence-Based Answers Delivered" },
          { stat: "18K+", label: "Registered Clinicians" },
          { stat: "60+", label: "Supplement Databases Integrated" },
          { stat: "97%", label: "Practitioner Satisfaction Score" },
        ].map((item, i) => (
          <div
            className="2xl:px-6 px-3 py-5 sm:p-5 2xl:py-[22px] bg-[#f4f4fe] rounded-2xl"
            key={i}
          >
            <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.813rem] 2xl:text-5xl 2xl:leading-[52px] font-bold mb-1.5 sm:mb-3 text-primary-main">
              {item.stat}
            </p>
            <p className="text-xs sm:text-base lg:text-lg xl:text-xl 2xl:text-[1.437rem] sm:font-medium text-[#64647C]">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
