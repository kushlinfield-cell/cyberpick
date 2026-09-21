"use client";

import { useShortlist } from "@/context/ShortlistContext";
import { providers } from "@/lib/mock-data";
import Button from "./Button";

export default function ShortlistTray() {
  const { shortlist } = useShortlist();

  if (shortlist.length === 0) return null;

  const names = shortlist
    .map((slug) => providers.find((p) => p.slug === slug)?.name)
    .filter(Boolean)
    .join(", ");

  return (
    <div className="sticky bottom-0 z-10 border-t border-white/10 bg-navy text-white">
      <div className="mx-auto flex max-w-content flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-white/60">
            {shortlist.length} {shortlist.length === 1 ? "provider" : "providers"} selected
          </span>
          <span className="text-sm">{names}</span>
        </div>
        <Button href="/request-proposals" size="sm">
          Request proposals
        </Button>
      </div>
    </div>
  );
}
