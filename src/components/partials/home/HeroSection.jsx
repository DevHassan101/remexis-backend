import Image from "next/image";
import heroImg from "../../../../public/assets/images/hero-img.png";
import image1 from "../../../../public/assets/images/remex-grey.png";
import image2 from "../../../../public/assets/images/remex-orange.png";
import image3 from "../../../../public/assets/images/remex-blue.png";

export default function HeroSection() {
  return (
    <div className="container mx-auto mt-6 lg:mt-8 2xl:mt-12 mb-10 lg:mb-14 2xl:mb-16 py-8 lg:py-16 2xl:py-20 px-4 flex flex-col lg:flex-row items-start justify-between">
      {/* Left Side Content */}
      <div className="text-center lg:text-left w-full lg:w-[56%] 2xl:w-[52%] 2xl:max-w-[834px]">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl lg:leading-[52px] xl:text-6xl xl:leading-[66px] 2xl:text-[67px] font-bold 2xl:leading-[77px] text-[#292929]">
          Empowering <span className="text-primary-main">Healthcare</span>{" "}
          Professionals
        </h1>
        <p className="text-lg 2xl:leading-[28px] text-[#1b2a52] mt-6">
          Discover Natural Remedy Insights with Remexis.
        </p>
        <p className="text-lg 2xl:leading-[28px] text-[#1b2a52] mt-2 2xl:mt-4">
          Welcome to Remexis - - the innovative AI-powered platform built to
          bridge the gap between conventional healthcare and the world of
          natural medicine. We understand the increasing demand for
          non-pharmacological options and the vital role of informed discussions
          between healthcare professionals and individuals seeking these
          solutions.
        </p>
        <p className="text-lg 2xl:leading-[28px] text-[#1b2a52] mt-2 2xl:mt-4">
          Find relevant information on natural therapies quickly and easily with
          Remexis, your trusted resource for integrating natural remedy
          knowledge into your practice.
        </p>
        {/* Logos */}
        <div className="flex justify-center lg:justify-start items-center gap-4 mt-4 2xl:mt-6">
          <Image
            src={image1}
            alt="The natural world at your fingertips logo 1."
            className="w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] md:w-[80px] md:h-[80px] lg:w-[86px] lg:h-[86px] xl:w-[90px] xl:h-[90px] 2xl:w-[98px] 2xl:h-[98px]"
            width={98}
            height={98}
          />
          <Image
            src={image2}
            alt="The natural world at your fingertips logo 1."
            className="w-[77px] h-[77px] sm:w-[100px] sm:h-[100px] md:w-[112px] md:h-[112px] lg:w-[120px] lg:h-[120px] xl:w-[140px] xl:h-[140px] 2xl:w-[154px] 2xl:h-[154px]"
            width={154}
            height={154}
          />
          <Image
            src={image3}
            alt="The natural world at your fingertips logo 1."
            className="w-[75px] h-[43px] sm:w-[100px] sm:h-[58px] md:w-[112px] md:h-[70px] lg:w-[120px] lg:h-[72px] xl:w-[136px] xl:h-[80px] 2xl:w-[151px] 2xl:h-[86px]"
            width={151}
            height={86}
          />
        </div>
        {/* CTA Button */}
        <button className="mt-4 2xl:mt-6 bg-primary-main text-white text-[14px] px-6 py-3 rounded-full w-[185px] hover:bg-primary-500 transition">
          Get Started For Free
        </button>
      </div>

      {/* Right Side Image */}
      <div className="w-full lg:w-[44%] 2xl:w-[48%] flex-1 h-max mt-12 lg:mt-0 lg:pl-8 xl:pl-16 2xl:pl-24">
        <Image
          src={heroImg}
          alt="Healthcare Professionals"
          className="w-full mx-auto md:w-2/3 lg:w-full h-full object-contain lg:object-cover"
        />
      </div>
    </div>
  );
}
