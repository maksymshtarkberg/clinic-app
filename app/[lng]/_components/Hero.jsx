"use client";
import { useTranslation } from "@/app/i18n/client";

function Hero({ lng }) {
  const { t } = useTranslation(lng, "second-page");

  return (
    <div className="flex items-center gap-3 flex-col justify-center pt-14 pb-7">
      <h2 className="font-bold text-[46px] text-center">
        Find Home
        <span className="text-primary"> Service/Repair</span>
        <p>{t("title")}</p>
        <br></br> Near You
      </h2>
      <h2 className="text-xl text-gray-400">
        Explore Best Home Service & Repair near you
      </h2>
    </div>
  );
}

export default Hero;
