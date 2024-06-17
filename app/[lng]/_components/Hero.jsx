"use client";
import { useTranslation } from "@/app/i18n/client";

function Hero({ lng }) {
  const { t } = useTranslation(lng, "translation");

  return (
    <div className="flex items-center flex-col justify-center pt-14 pb-7">
      <h1 className="text-[25px]">{t("title")}</h1>
      <div className="flex gap-2 items-center">
        <h2 className="font-bold text-[46px] text-center">{t("title_main")}</h2>
        <span className=" text-[46px] text-primary"> {t("title_sec")}</span>
      </div>
      <h2 className="text-xl text-gray-400">
        Explore Best Home Service & Repair near you
      </h2>
    </div>
  );
}

export default Hero;
