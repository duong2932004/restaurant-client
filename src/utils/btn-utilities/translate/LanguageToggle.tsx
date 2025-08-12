"use client";

import clsx from "clsx";
import { useTransition } from "react";
import { Locale, locales } from "@/i18n/config";
import { setUserLocale } from "@/lib/locale";
import { useLocale } from "next-intl";

export default function LanguageToggle() {
  const [isPending, startTransition] = useTransition();
  const currentLocale = useLocale() as Locale;

  function toggleLanguage() {
    const currentIndex = locales.indexOf(currentLocale);
    const nextIndex = (currentIndex + 1) % locales.length;
    const nextLocale = locales[nextIndex];

    startTransition(() => {
      setUserLocale(nextLocale);
    });
  }

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      aria-label="Đổi ngôn ngữ"
      className={clsx(
        "rounded-sm p-2 transition-colors hover:bg-slate-200 select-none",
        isPending && "pointer-events-none opacity-60"
      )}
    >
      <span className="text-sm font-medium text-slate-700">
        {currentLocale.toUpperCase()}
      </span>
    </button>
  );
}
