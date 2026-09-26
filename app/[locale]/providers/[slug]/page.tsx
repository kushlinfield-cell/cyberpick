"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import SiteNav from "@/components/SiteNav";
import { getProvider, confirmedServiceCount, allPresenceCountries } from "@/lib/mock-data";
import { useShortlist } from "@/context/ShortlistContext";
import { CheckIcon } from "@/components/Icons";
import CapabilityList from "@/components/CapabilityList";
import { useI18n } from "@/context/I18nContext";

export default function ProviderDetailPage() {
  const params = useParams<{ slug: string }>();
  const provider = getProvider(params.slug);
  const { isShortlisted, toggleShortlist } = useShortlist();
  const { locale, dict, country, fmt } = useI18n();
  const p = dict.providerProfile;

  if (!provider) {
    return (
      <>
        <SiteNav />
        <main className="mx-auto max-w-content px-6 py-20">
          <p className="text-sm text-muted">
            {p.notFound}{" "}
            <Link href={`/${locale}/matches`} className="text-accent">
              {p.backToMatches}
            </Link>
          </p>
        </main>
      </>
    );
  }

  const shortlisted = isShortlisted(provider.slug);
  const { met, total } = confirmedServiceCount(provider);
  const otherCountries = allPresenceCountries(provider).filter((c) => c !== provider.hqCountry);

  return (
    <>
      <SiteNav />

      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-content px-6 py-4">
          <Link href={`/${locale}/matches`} className="font-mono text-xs text-muted">
            {p.backToResults}
          </Link>
        </div>
      </div>

      <main className="flex justify-center bg-bg-light px-6 py-14">
        <div className="flex w-full max-w-3xl flex-col">
          <div className="flex flex-col gap-4 rounded-t-lg border border-b-0 border-border bg-white p-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-2">
              <span className="w-fit rounded bg-bg-light px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.04em] text-muted">
                {p.realProviderLabel}
              </span>
              <h1 className="text-3xl font-semibold tracking-tight text-ink">{provider.name}</h1>
              <p className="text-[15px] text-muted">
                {provider.hqCity ? `${provider.hqCity}, ` : ""}
                {country(provider.hqCountry)} · {provider.tagline}
              </p>
            </div>
            <span
              className={clsx(
                "whitespace-nowrap rounded px-3 py-1.5 font-mono text-xs",
                met === total ? "bg-success-tint text-success" : "bg-bg-light text-ink"
              )}
            >
              {fmt(p.confirmedFmt, { met, total })}
            </span>
          </div>

          <div className="flex flex-col border border-border bg-white">
            <Section title={p.overview}>
              <p className="text-[15px] leading-relaxed text-ink">{provider.overview}</p>
            </Section>

            {provider.notableFacts.length > 0 && (
              <Section title={p.notableFacts}>
                <ul className="flex flex-col gap-1.5">
                  {provider.notableFacts.map((fact) => (
                    <li key={fact} className="flex items-start gap-2 text-sm leading-relaxed text-ink">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {fact}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <Section title={p.presence}>
              <Row label={p.hqLabel} value={`${provider.hqCity ? provider.hqCity + ", " : ""}${country(provider.hqCountry)}`} />
              {otherCountries.length > 0 && (
                <Row label={p.otherCountriesLabel} value={otherCountries.map((c) => country(c)).join(", ")} />
              )}
              {provider.founded && <Row label={p.foundedLabel} value={provider.founded} />}
              {provider.parentOrg && <Row label={p.parentOrgLabel} value={provider.parentOrg} last />}
            </Section>

            <Section title={p.confirmedServices}>
              <CapabilityList provider={provider} />
            </Section>

            <Section title={p.languagesLabel}>
              <div className="flex flex-wrap gap-2">
                {provider.languagesConfirmed.map((l) => (
                  <Chip key={l}>{l}</Chip>
                ))}
              </div>
            </Section>

            <Section title={p.sourcesLabel} last>
              <ul className="flex flex-col gap-1.5">
                {provider.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm text-accent underline underline-offset-2">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[11px] text-muted">{p.lastChecked}</p>
            </Section>
          </div>

          <div className="flex flex-col gap-4 rounded-b-lg border border-t-0 border-border bg-white p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="max-w-sm text-xs text-muted">{p.footerNote}</p>
              <div className="flex shrink-0 gap-3">
                <Link
                  href={`/${locale}/matches`}
                  className="inline-flex items-center rounded-md border border-border-strong bg-white px-5 py-3 text-sm font-medium text-ink hover:bg-bg-light"
                >
                  {p.backToMatches}
                </Link>
                <button
                  type="button"
                  onClick={() => toggleShortlist(provider.slug)}
                  aria-pressed={shortlisted}
                  className={clsx(
                    "inline-flex shrink-0 items-center gap-2 rounded-md border px-5 py-3 text-sm font-medium transition-colors",
                    shortlisted ? "border-accent bg-accent-soft text-ink" : "border-accent bg-accent text-ink hover:bg-accent-hover"
                  )}
                >
                  {shortlisted && <CheckIcon className="h-4 w-4" />}
                  {shortlisted ? p.added : p.addToShortlist}
                </button>
              </div>
            </div>
            <p className="border-t border-border pt-4 text-xs text-muted">{p.disclaimer}</p>
          </div>
        </div>
      </main>
    </>
  );
}

function Section({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={clsx("flex flex-col gap-3 px-8 py-7", !last && "border-b border-border")}>
      <span className="label-muted">{title}</span>
      {children}
    </div>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={clsx("flex items-baseline justify-between gap-6 py-2.5 text-sm", !last && "border-b border-border")}>
      <span className="text-muted">{label}</span>
      <span className="text-right text-[13px] text-ink">{value}</span>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rounded border border-border bg-bg-light px-2.5 py-1 text-xs text-ink">{children}</span>;
}
