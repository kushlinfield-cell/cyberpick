"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import { providers, filterOptions, confirmedServiceCount, allPresenceCountries, SERVICE_TAG_ORDER, type ServiceTag } from "@/lib/mock-data";
import { CheckIcon } from "@/components/Icons";
import { useI18n } from "@/context/I18nContext";

export default function ProviderDirectoryPage() {
  const { locale, dict, country, fmt } = useI18n();
  const d = dict.providerDirectory;

  const [hqCountry, setHqCountry] = useState<Set<string>>(new Set());
  const [presenceCountry, setPresenceCountry] = useState<Set<string>>(new Set());
  const [serviceTag, setServiceTag] = useState<Set<ServiceTag>>(new Set());

  const toggleSet = <T,>(set: Set<T>, setter: (s: Set<T>) => void, value: T) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  };

  const filtered = useMemo(() => {
    return providers.filter((p) => {
      if (hqCountry.size > 0 && !hqCountry.has(p.hqCountry)) return false;
      if (presenceCountry.size > 0 && !allPresenceCountries(p).some((c) => presenceCountry.has(c))) return false;
      if (serviceTag.size > 0 && !p.confirmedServices.some((s) => serviceTag.has(s))) return false;
      return true;
    });
  }, [hqCountry, presenceCountry, serviceTag]);

  const activeFilterCount = hqCountry.size + presenceCountry.size + serviceTag.size;

  const clearAll = () => {
    setHqCountry(new Set());
    setPresenceCountry(new Set());
    setServiceTag(new Set());
  };

  return (
    <>
      <SiteNav />

      <div className="border-b border-white/10 bg-bgdark">
        <div className="mx-auto max-w-content px-6 py-14">
          <span className="eyebrow-light">{d.eyebrow}</span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">{d.title}</h1>
          <p className="mt-2 max-w-xl text-[15px] text-white/70">{d.subcopy}</p>
        </div>
      </div>

      <main className="bg-bg-light">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-[280px_1fr]">
          <aside className="flex flex-col gap-6 rounded-lg border border-border bg-white p-6 lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center justify-between">
              <span className="label-muted">{d.filtersLabel}</span>
              {activeFilterCount > 0 && (
                <button type="button" onClick={clearAll} className="font-mono text-xs text-accent">
                  {d.clearAll}
                </button>
              )}
            </div>

            <FilterGroup
              title={d.hqCountryLabel}
              options={filterOptions.hqCountry}
              labelFor={country}
              selected={hqCountry}
              onToggle={(v) => toggleSet(hqCountry, setHqCountry, v)}
            />
            <div className="flex flex-col gap-2.5 border-t border-border pt-5">
              <span className="label-muted">{d.presenceCountryLabel}</span>
              <p className="-mt-1 text-[11px] leading-snug text-muted">{d.presenceCountryHint}</p>
              <div className="flex flex-col gap-2">
                {filterOptions.presenceCountry.map((opt) => (
                  <label key={opt} className="flex items-center gap-2.5 text-sm text-ink">
                    <input
                      type="checkbox"
                      checked={presenceCountry.has(opt)}
                      onChange={() => toggleSet(presenceCountry, setPresenceCountry, opt)}
                      className="h-4 w-4 rounded border-border-strong text-accent focus:ring-accent"
                    />
                    {country(opt)}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2.5 border-t border-border pt-5">
              <span className="label-muted">{d.serviceTagLabel}</span>
              <div className="flex flex-col gap-2">
                {SERVICE_TAG_ORDER.map((tag) => (
                  <label key={tag} className="flex items-center gap-2.5 text-sm text-ink">
                    <input
                      type="checkbox"
                      checked={serviceTag.has(tag)}
                      onChange={() => toggleSet(serviceTag, setServiceTag, tag)}
                      className="h-4 w-4 rounded border-border-strong text-accent focus:ring-accent"
                    />
                    {dict.serviceTags[tag]}
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-5 text-xs text-muted">{d.scopeNote}</div>
          </aside>

          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">{fmt(d.resultsCountFmt, { count: filtered.length, total: providers.length })}</span>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border-strong bg-white px-7 py-14 text-center text-sm text-muted">
                {d.noMatches}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filtered.map((p) => {
                  const { met, total } = confirmedServiceCount(p);
                  return (
                    <div key={p.slug} className="flex flex-col gap-4 rounded-lg border border-border bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-base font-semibold text-ink">{p.name}</h3>
                          <span className="rounded bg-bg-light px-2 py-0.5 font-mono text-[11px] text-muted">
                            {p.hqCity ? `${p.hqCity}, ` : ""}
                            {country(p.hqCountry)}
                          </span>
                        </div>
                        <p className="max-w-xl text-sm text-muted">{p.tagline}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {p.confirmedServices.slice(0, 4).map((tag) => (
                            <span key={tag} className="mono-tag">
                              {dict.serviceTags[tag]}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                        <span className="flex items-center gap-1.5 rounded bg-success-tint px-2.5 py-1 font-mono text-xs text-success">
                          <CheckIcon className="h-3.5 w-3.5" />
                          {fmt(dict.providerCard.confirmedFmt, { met, total })}
                        </span>
                        <Link
                          href={`/${locale}/providers/${p.slug}`}
                          className="inline-flex items-center rounded-md border border-border-strong bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-bg-light"
                        >
                          {d.viewProvider}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <p className="text-xs text-muted">{d.disclaimer}</p>
          </div>
        </div>
      </main>
    </>
  );
}

function FilterGroup({
  title,
  options,
  labelFor,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  labelFor?: (v: string) => string;
  selected: Set<string>;
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5 border-t border-border pt-5 first:border-t-0 first:pt-0">
      <span className="label-muted">{title}</span>
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2.5 text-sm text-ink">
            <input
              type="checkbox"
              checked={selected.has(opt)}
              onChange={() => onToggle(opt)}
              className="h-4 w-4 rounded border-border-strong text-accent focus:ring-accent"
            />
            {labelFor ? labelFor(opt) : opt}
          </label>
        ))}
      </div>
    </div>
  );
}
