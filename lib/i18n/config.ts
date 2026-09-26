export const locales = ["en", "fi", "da", "no", "sv"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fi: "Suomi",
  da: "Dansk",
  no: "Norsk",
  sv: "Svenska",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
