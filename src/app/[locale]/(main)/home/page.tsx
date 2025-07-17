import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("common");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">{t("welcome")}</h1>
      <p className="text-lg">{t("scanQR")}</p>
    </div>
  );
}
