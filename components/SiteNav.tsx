"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";
import { useI18n } from "@/context/I18nContext";
import { locales, localeLabels } from "@/lib/i18n/config";

/** Strip the leading /xx locale segment from a pathname, e.g. "/en/matches" -> "/matches". */
function stripLocale(pathname: string): string {
  const parts = pathname.split("/");
  if (parts.length > 1 && (locales as readonly string[]).includes(parts[1])) {
    return "/" + parts.slice(2).join("/");
  }
  return pathname;
}

export default function SiteNav() {
  const { locale, dict } = useI18n();
  const pathname = usePathname() || `/${locale}`;
  const rest = stripLocale(pathname);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { label: dict.nav.solutions, href: `/${locale}/#services` },
    { label: dict.nav.providers, href: `/${locale}/providers` },
    { label: dict.nav.howItWorks, href: `/${locale}/#how-it-works` },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 backdrop-blur supports-[backdrop-filter]:bg-navy/90">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="text-xl font-bold tracking-tight text-white">
          Cyber<span className="text-accent">Pick</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              aria-label={dict.common.languageSwitcherLabel}
              className="rounded-md border border-white/15 px-2.5 py-1.5 font-mono text-xs uppercase text-white/70 transition-colors hover:text-white"
            >
              {locale}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-md border border-border-strong bg-white shadow-panel">
                {locales.map((l) => (
                  <Link
                    key={l}
                    href={`/${l}${rest}`}
                    onClick={() => setLangOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 text-sm text-ink hover:bg-bg-light"
                  >
                    {localeLabels[l]}
                    <span className="font-mono text-[11px] uppercase text-muted">{l}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <a
            href="mailto:partners@cyberpick.io"
            className="hidden text-sm text-white/70 transition-colors hover:text-white sm:inline"
          >
            {dict.nav.forProviders}
          </a>
          <Button href={`/${locale}/questionnaire`} size="sm">
            {dict.nav.findProviders}
          </Button>
        </div>
      </div>
    </header>
  );
}
