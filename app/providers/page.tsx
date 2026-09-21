"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import { providers, filterOptions, capabilityScore } from "@/lib/mock-data";
import { CheckIcon } from "@/components/Icons";

export default function ProviderDirectoryPage() {
  const [country, setCountry] = useState<Set<string>>(new Set());
  const [sizeBand, setSizeBand] = useState<Set<string>>(new Set());
  const [technology, setTechnology] = useState<Set<string>>(new Set());
  const [socLocation, setSocLocation] = useState<Set<string>>(new Set());
  const [language, setLanguage] = useState<Set<string>>(new Set());
  const [only247, setOnly247] = useState(false);

  const toggleSet = (set: Set<string>, setter: (s: Set<string>) => void, value: string) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  };

  const filtered = useMemo(() => {
    return providers.filter((p) => {
      if (country.size > 0 && !country.has(p.country)) return false;
      if (sizeBand.size > 0 && !sizeBand.has(p.sizeBand)) return false;
      if (technology.size > 0 && !p.technology.supported.some((t) => technology.has(t))) return false;
      if (socLocation.size > 0 && !socLocation.has(`${p.city}, ${p.country}`)) return false;
      if (language.size > 0 && !p.languages.some((l) => language.has(l))) return false;
      if (only247 && !p.capabilities.soc247) return false;
      return true;
    });
  }, [country, sizeBand, technology, socLocation, language, only247]);

  const activeFilterCount =
    country.size + sizeBand.size + technology.size + socLocation.size + language.size + (only247 ? 1 : 0);

  const clearAll = () => {
    setCountry(new Set());
    setSizeBand(new Set());
    setTechnology(new Set());
    setSocLocation(new Set());
    setLanguage(new Set());
    setOnly247(false);
  };

  return (
    <>
      <SiteNav />

      <div className="border-b border-white/10 bg-bgdark">
        <div className="mx-auto max-w-content px-6 py-14">
          <span className="eyebrow-light">Provider research</span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">Cybersecurity providers</h1>
          <p className="mt-2 max-w-xl text-[15px] text-white/70">
            Structured, comparable profiles of MDR providers serving the Nordic market — demonstration data for this
            prototype.
          </p>
        </div>
      </div>

      <main className="bg-bg-light">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-[260px_1fr]">
          <aside className="flex flex-col gap-6 rounded-lg border border-border bg-white p-6 lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center justify-between">
              <span className="label-muted">Filters</span>
              {activeFilterCount > 0 && (
                <button type="button" onClick={clearAll} className="font-mono text-xs text-accent">
                  Clear all
                </button>
              )}
            </div>

            <FilterGroup title="Country" options={filterOptions.country} selected={country} onToggle={(v) => toggleSet(country, setCountry, v)} />
            <FilterGroup
              title="Company size"
              options={filterOptions.companySize}
              selected={sizeBand}
              onToggle={(v) => toggleSet(sizeBand, setSizeBand, v)}
            />
            <FilterGroup
              title="Technology"
              options={filterOptions.technology}
              selected={technology}
              onToggle={(v) => toggleSet(technology, setTechnology, v)}
            />
            <FilterGroup
              title="SOC location"
              options={filterOptions.socLocation}
              selected={socLocation}
              onToggle={(v) => toggleSet(socLocation, setSocLocation, v)}
            />
            <FilterGroup
              title="Language"
              options={filterOptions.language}
              selected={language}
              onToggle={(v) => toggleSet(language, setLanguage, v)}
            />

            <div className="flex flex-col gap-2 border-t border-border pt-5">
              <span className="label-muted">Coverage</span>
              <label className="flex items-center gap-2.5 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={only247}
                  onChange={() => setOnly247((v) => !v)}
                  className="h-4 w-4 rounded border-border-strong text-accent focus:ring-accent"
                />
                24/7 service only
              </label>
            </div>

            <div className="border-t border-border pt-5 text-xs text-muted">
              Service: <span className="font-mono text-ink">Managed Detection &amp; Response</span>
              <br />
              Additional service categories coming soon.
            </div>
          </aside>

          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">
                {filtered.length} of {providers.length} providers
              </span>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border-strong bg-white px-7 py-14 text-center text-sm text-muted">
                No providers match the selected filters.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filtered.map((p) => {
                  const { met, total } = capabilityScore(p);
                  return (
                    <div key={p.slug} className="flex flex-col gap-4 rounded-lg border border-border bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-base font-semibold text-ink">{p.name}</h3>
                          <span className="rounded bg-bg-light px-2 py-0.5 font-mono text-[11px] text-muted">
                            {p.city}, {p.country}
                          </span>
                        </div>
                        <p className="max-w-xl text-sm text-muted">{p.tagline}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {p.technology.supported.slice(0, 4).map((t) => (
                            <span key={t} className="mono-tag">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                        <span className="flex items-center gap-1.5 rounded bg-success-tint px-2.5 py-1 font-mono text-xs text-success">
                          <CheckIcon className="h-3.5 w-3.5" />
                          {met} / {total} capabilities
                        </span>
                        <Link
                          href={`/providers/${p.slug}`}
                          className="inline-flex items-center rounded-md border border-border-strong bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-bg-light"
                        >
                          View provider
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <p className="text-xs text-muted">
              Provider information shown in this directory is fictional and for demonstration purposes only.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
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
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
