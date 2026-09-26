"use client";

import { createContext, useContext, useMemo } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { format } from "@/lib/i18n/dictionaries";

type I18nContextValue = {
  locale: Locale;
  dict: Dictionary;
  /** Localize a country name that appears in provider data (falls back to the raw value). */
  country: (name: string) => string;
  /** Interpolate a format-string dictionary value, e.g. dict.matches.confirmedFmt with {met,total}. */
  fmt: (template: string, values: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dict,
      country: (name: string) => dict.countries[name] ?? name,
      fmt: format,
    }),
    [locale, dict]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
