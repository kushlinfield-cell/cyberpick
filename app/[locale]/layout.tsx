import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "../globals.css";
import { ShortlistProvider } from "@/context/ShortlistContext";
import { I18nProvider } from "@/context/I18nContext";
import { locales, isLocale, defaultLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const metadata: Metadata = {
  title: "CyberPick — Find the right cybersecurity partner",
  description:
    "CyberPick helps Nordic buyers turn security requirements into a structured procurement brief and compare real MDR/SOC providers using only publicly available information.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-paper font-sans text-ink antialiased">
        <I18nProvider locale={locale} dict={dict}>
          <ShortlistProvider>{children}</ShortlistProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
