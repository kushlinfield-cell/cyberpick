"use client";

import type { Provider } from "@/lib/mock-data";
import { SERVICE_TAG_ORDER, confirmedServiceCount } from "@/lib/mock-data";
import { useShortlist } from "@/context/ShortlistContext";
import { CheckIcon, DashIcon } from "./Icons";
import Button from "./Button";
import { useI18n } from "@/context/I18nContext";

export default function ProviderCard({ provider }: { provider: Provider }) {
  const { isShortlisted, toggleShortlist } = useShortlist();
  const { locale, dict, country, fmt } = useI18n();
  const shortlisted = isShortlisted(provider.slug);
  const { met, total } = confirmedServiceCount(provider);

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-ink">{provider.name}</h3>
          <span className="text-xs text-muted">
            {provider.hqCity ? `${provider.hqCity}, ` : ""}
            {country(provider.hqCountry)}
          </span>
        </div>
        <span className="shrink-0 rounded bg-bg-light px-2 py-0.5 font-mono text-[11px] text-ink">
          {fmt(dict.providerCard.confirmedFmt, { met, total })}
        </span>
      </div>

      <dl className="flex flex-col border-t border-border">
        {SERVICE_TAG_ORDER.map((tag) => {
          const confirmed = provider.confirmedServices.includes(tag);
          return (
            <div key={tag} className="flex items-center justify-between gap-2 border-b border-border py-2 text-[13px] last:border-b-0">
              <span className="text-ink">{dict.serviceTags[tag]}</span>
              {confirmed ? (
                <CheckIcon className="h-3.5 w-3.5 text-success" />
              ) : (
                <DashIcon className="h-3.5 w-3.5 text-muted" />
              )}
            </div>
          );
        })}
      </dl>

      <button
        type="button"
        onClick={() => toggleShortlist(provider.slug)}
        aria-pressed={shortlisted}
        className={
          shortlisted
            ? "inline-flex w-full items-center justify-center gap-2 rounded-md border border-accent bg-accent-soft px-4 py-2.5 text-sm font-medium text-ink"
            : "inline-flex w-full items-center justify-center gap-2 rounded-md border border-accent bg-accent px-4 py-2.5 text-sm font-medium text-ink hover:bg-accent-hover"
        }
      >
        {shortlisted && <CheckIcon className="h-4 w-4" />}
        {shortlisted ? dict.providerCard.added : dict.providerCard.addToShortlist}
      </button>
      <Button href={`/${locale}/providers/${provider.slug}`} variant="ghost" size="sm" className="self-start !px-0">
        {dict.providerCard.viewProvider}
      </Button>
    </div>
  );
}
