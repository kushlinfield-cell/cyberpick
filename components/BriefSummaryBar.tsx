"use client";

import Link from "next/link";
import { briefChips } from "@/lib/mock-data";
import { useI18n } from "@/context/I18nContext";

export default function BriefSummaryBar() {
  const { locale, dict } = useI18n();
  return (
    <div className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-content flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="label-muted mr-1">{dict.common.yourBrief}</span>
          {briefChips.map((chip) => (
            <span key={chip} className="mono-tag">
              {chip}
            </span>
          ))}
        </div>
        <Link href={`/${locale}/requirements`} className="font-mono text-xs font-medium text-accent whitespace-nowrap">
          {dict.requestProposals.viewFullBrief}
        </Link>
      </div>
    </div>
  );
}
