import Image from "next/image";
import localFont from "next/font/local";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const leckerliOne = localFont({
  src: "../../../public/assets/fonts/Leckerli_One/LeckerliOne-Regular.ttf",
  variable: "--font-leckerli-one",
});

export default function HomeComponent() {
  const t = useTranslations("home");

  return (
    <div
      className={`w-full min-h-screen flex flex-col-reverse md:flex-row items-center justify-between px-6 py-12 ${leckerliOne.variable}`}
    >
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h1
          className="text-5xl md:text-6xl font-bold text-gray-900"
          style={{ fontFamily: "var(--font-leckerli-one)" }}
        >
          {t("title")}
        </h1>
        <p className="text-lg text-gray-700 max-w-md mx-auto md:mx-0">
          {t("about")}
        </p>
        <Button className="from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 font-semibold py-3 px-8 rounded-2xl shadow-lg transition-transform transform hover:-translate-y-1">
          {t("button")}
        </Button>
      </div>

      <div className="md:w-1/2 flex justify-center md:justify-end mb-8 md:mb-0">
        <div className="relative w-full h-64 sm:h-80 md:h-[500px] lg:h-[600px] ">
          <Image
            src="/assets/images/home/banner.png"
            alt="Banner Image"
            fill
            className="object-cover"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
}
