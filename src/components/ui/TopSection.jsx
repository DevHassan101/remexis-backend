import { Icon } from "@iconify/react";
import Image from "next/image";
import rings from "../../../public/assets/images/shadow-rings.png";
import blob from "../../../public/assets/images/shadow-blob.png";

export default function TopSection({ top }) {
  return (
    <div className="w-full relative h-[200px] sm:h-[250px] md:h-[290px] lg:h-[372px] flex flex-col items-center justify-center overflow-hidden bg-secondary-main rounded-3xl">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[72px] font-bold text-[#3b3b3b] mb-2">
        {top}
      </h1>
      <div className="flex items-center gap-2.5 text-sm sm:text-base lg:text-[17px] leading-[25px]">
        <Icon icon="heroicons:home" width="19" height="17" />
        <span>Home</span>
        <span className="text-primary-main">•</span>
        <span className="text-primary-main">{top}</span>
      </div>
      <Image
        src={rings}
        width={389}
        height={296}
        alt="rings background"
        className="absolute lg:block hidden lg:w-[280px] lg:h-[209px] xl:w-[339px] xl:h-[249px] 2xl:w-[389px] 2xl:h-[296px] bottom-0 right-0 object-contain"
      />
      <Image
        src={blob}
        width={608}
        height={342}
        alt="blob background"
        className="absolute lg:block hidden lg:w-[360px] lg:h-[209px] xl:w-[458px] xl:h-[260px] 2xl:w-[608] 2xl:h-[342px] bottom-0 left-0 object-contain"
      />
    </div>
  );
}
