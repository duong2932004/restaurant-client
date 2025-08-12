export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export const localeLabels: Record<Locale, string> = {
  vi: "Việt nam",
  en: "English",
};

export const localeOptions: { code: Locale; name: string }[] = locales.map(
  (code) => ({
    code,
    name: localeLabels[code],
  })
);
