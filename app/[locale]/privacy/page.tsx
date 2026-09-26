"use client";

import SiteNav from "@/components/SiteNav";
import { useI18n } from "@/context/I18nContext";
import Link from "next/link";

export default function PrivacyPage() {
  const { locale, dict } = useI18n();
  const l = dict.legal;

  return (
    <>
      <SiteNav />
      <main className="flex justify-center bg-bg-light px-6 py-16">
        <div className="flex w-full max-w-2xl flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="w-fit rounded bg-accent-soft px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.04em] text-ink">
              {l.draftBadge}
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-ink">{l.privacyTitle}</h1>
            <p className="text-[15px] leading-relaxed text-muted">{l.privacyIntro}</p>
          </div>

          <div className="rounded-lg border border-accent/30 bg-accent-soft/40 px-6 py-5">
            <p className="text-[13px] leading-relaxed text-ink">{l.draftWarning}</p>
          </div>

          <div className="flex flex-col rounded-lg border border-border bg-white">
            {l.sections.map((s, i) => (
              <div key={s.heading} className={`flex flex-col gap-2 px-8 py-6 ${i > 0 ? "border-t border-border" : ""}`}>
                <h2 className="text-sm font-semibold text-ink">{s.heading}</h2>
                <p className="text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>

          <Link href={`/${locale}`} className="self-start font-mono text-xs text-accent">
            {l.backHome}
          </Link>
        </div>
      </main>
    </>
  );
}
