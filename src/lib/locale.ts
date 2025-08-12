"use server";

import { cookies } from "next/headers";
import { Locale, defaultLocale, locales } from "@/i18n/config";

const COOKIE_NAME = process.env.NEXT_LOCALE || "RESTAURANT_LOCALE";

export async function getUserLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(COOKIE_NAME)?.value;

  if (!cookieValue || !locales.includes(cookieValue as Locale)) {
    return defaultLocale;
  }

  return cookieValue as Locale;
}

export async function setUserLocale(locale: Locale) {
  if (!locales.includes(locale)) {
    console.error(`Invalid locale: ${locale}`);
    return;
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, locale);
}
