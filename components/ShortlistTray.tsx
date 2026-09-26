"use client";

import { useShortlist } from "@/context/ShortlistContext";
import { providers } from "@/lib/mock-data";
import Button from "./Button";
import { useI18n } from "@/context/I18nContext";

export default function ShortlistTray() {
  const { shortlist } = useShortlist();
  const { locale, dict } = useI18n();

  if (shortlist.length === 0) return null;

  const names = shortlist
    .map((slug) => providers.find((p) => p.slug === slug)?.name)
    .filter(Boolean)
    .join(", ");

  const providerWord = shortlist.length === 1 ? dict.common.providerSingular : dict.common.providerPlural;

  return (
    <div className="sticky bottom-0 z-10 border-t border-white/10 bg-navy text-white">
      <div className="mx-auto flex max-w-content flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-white/60">
            {shortlist.length} {providerWord} {dict.common.selected}
          </span>
          <span className="text-sm">{names}</span>
        </div>
        <Button href={`/${locale}/request-proposals`} size="sm">
          {dict.requestProposals.requestBtn}
        </Button>
      </div>
    </div>
  );
}
