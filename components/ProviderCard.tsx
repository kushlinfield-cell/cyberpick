"use client";

import Link from "next/link";
import clsx from "clsx";
import type { Provider } from "@/lib/mock-data";
import { CAPABILITY_ORDER, CAPABILITY_LABELS, capabilityScore } from "@/lib/mock-data";
import { useShortlist } from "@/context/ShortlistContext";
import { CheckIcon, DashIcon } from "./Icons";

export default function ProviderCard({ provider }: { provider: Provider }) {
  const { isShortlisted, toggleShortlist } = useShortlist();
  const shortlisted = isShortlisted(provider.slug);
  const { met, total } = capabilityScore(provider);
  const isFullMatch = met === total;

  return (
    <div
      className={clsx(
        "flex flex-col gap-5 rounded-lg border bg-white p-7",
        shortlisted ? "border-accent" : "border-border"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-ink">{provider.name}</h3>
          <span className="text-sm text-muted">
            {provider.city}, {provider.country}
          </span>
        </div>
        <span
          className={clsx(
            "whitespace-nowrap rounded px-2.5 py-1 font-mono text-xs",
            isFullMatch ? "bg-success-tint text-success" : "bg-bg-light text-ink"
          )}
        >
          {met} / {total} capabilities
        </span>
      </div>

      <dl className="flex flex-col border-t border-border">
        {CAPABILITY_ORDER.map((key) => {
          const isMet = provider.capabilities[key];
          return (
            <div
              key={key}
              className="flex items-center justify-between gap-3 border-b border-border py-2.5 text-[13px] last:border-b-0"
            >
              <span className="text-ink">{CAPABILITY_LABELS[key]}</span>
              {isMet ? (
                <CheckIcon className="h-4 w-4 text-success" />
              ) : (
                <DashIcon className="h-4 w-4 text-muted" />
              )}
            </div>
          );
        })}
      </dl>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => toggleShortlist(provider.slug)}
          className={clsx(
            "inline-flex w-full items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors",
            shortlisted
              ? "border-accent bg-accent-soft text-ink"
              : "border-border-strong bg-white text-ink hover:bg-bg-light"
          )}
          aria-pressed={shortlisted}
        >
          {shortlisted && <CheckIcon className="h-4 w-4 text-accent" />}
          {shortlisted ? "Added to shortlist" : "Add to shortlist"}
        </button>
        <Link href={`/providers/${provider.slug}`} className="text-center font-mono text-xs font-medium text-accent">
          View provider →
        </Link>
      </div>
    </div>
  );
}
