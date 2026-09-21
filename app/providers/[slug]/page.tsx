"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import SiteNav from "@/components/SiteNav";
import { getProvider, capabilityScore } from "@/lib/mock-data";
import { useShortlist } from "@/context/ShortlistContext";
import { CheckIcon } from "@/components/Icons";
import CapabilityList from "@/components/CapabilityList";

export default function ProviderDetailPage() {
  const params = useParams<{ slug: string }>();
  const provider = getProvider(params.slug);
  const { isShortlisted, toggleShortlist } = useShortlist();

  if (!provider) {
    return (
      <>
        <SiteNav />
        <main className="mx-auto max-w-content px-6 py-20">
          <p className="text-sm text-muted">
            We couldn&apos;t find that provider.{" "}
            <Link href="/matches" className="text-accent">
              Back to matched providers
            </Link>
          </p>
        </main>
      </>
    );
  }

  const shortlisted = isShortlisted(provider.slug);
  const { met, total } = capabilityScore(provider);

  return (
    <>
      <SiteNav />

      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-content px-6 py-4">
          <Link href="/matches" className="font-mono text-xs text-muted">
            ← Back to results
          </Link>
        </div>
      </div>

      <main className="flex justify-center bg-bg-light px-6 py-14">
        <div className="flex w-full max-w-3xl flex-col">
          <div className="flex flex-col gap-4 rounded-t-lg border border-b-0 border-border bg-white p-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-2">
              <span className="w-fit rounded bg-bg-light px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.04em] text-muted">
                Demonstration provider
              </span>
              <h1 className="text-3xl font-semibold tracking-tight text-ink">{provider.name}</h1>
              <p className="text-[15px] text-muted">
                {provider.city}, {provider.country} · {provider.tagline}
              </p>
            </div>
            <span
              className={clsx(
                "whitespace-nowrap rounded px-3 py-1.5 font-mono text-xs",
                met === total ? "bg-success-tint text-success" : "bg-bg-light text-ink"
              )}
            >
              {met} / {total} required capabilities
            </span>
          </div>

          <div className="flex flex-col border border-border bg-white">
            <Section title="Overview">
              <p className="text-[15px] leading-relaxed text-ink">{provider.overview}</p>
            </Section>

            <Section title="Customer fit">
              <p className="text-sm leading-relaxed text-ink">{provider.customerFit}</p>
              <p className="mt-2 text-xs text-muted">Company size fit: {provider.companySizeFit}</p>
            </Section>

            <Section title="Services">
              <div className="flex flex-wrap gap-2">
                {provider.serviceList.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </Section>

            <Section title="Technology">
              <Row label="Primary detection stack" value={provider.technology.primary} />
              <div className="mt-3 flex flex-wrap gap-2">
                {provider.technology.supported.map((t) => (
                  <Chip key={t} mono>
                    {t}
                  </Chip>
                ))}
              </div>
            </Section>

            <Section title="Operations">
              <Row label="SOC location" value={provider.operations.socLocation} />
              <Row label="Monitoring model" value={provider.operations.monitoringModel} />
              <Row label="Incident response SLA" value={provider.operations.responseSla} />
              <Row label="Included IR hours" value={provider.operations.includedIrHours} />
              <Row label="Reporting" value={provider.operations.reporting} last />
            </Section>

            <Section title="Languages">
              <div className="flex flex-wrap gap-2">
                {provider.languages.map((l) => (
                  <Chip key={l}>{l}</Chip>
                ))}
              </div>
            </Section>

            <Section title="Data handling">
              <Row label="Data residency" value={provider.dataHandling.residency} />
              <Row label="Hosted in" value={provider.dataHandling.hostedIn} last />
              <p className="mt-3 text-[13px] leading-relaxed text-muted">{provider.dataHandling.note}</p>
            </Section>

            <Section title="Commercial information">
              <Row label="Pricing model" value={provider.commercial.pricingModel} />
              <Row label="Setup cost" value={provider.commercial.setupCost} />
              <Row label="Minimum contract term" value={provider.commercial.minimumTerm} />
              <Row label="Onboarding" value={provider.commercial.onboarding} last />
            </Section>

            <Section title="Your requirements" last>
              <CapabilityList provider={provider} />
            </Section>
          </div>

          <div className="flex flex-col gap-4 rounded-b-lg border border-t-0 border-border bg-white p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="max-w-sm text-xs text-muted">
                Shortlisted providers receive the same standardized request for proposals, built from your
                requirements brief.
              </p>
              <div className="flex shrink-0 gap-3">
                <Link href="/matches" className="inline-flex items-center rounded-md border border-border-strong bg-white px-5 py-3 text-sm font-medium text-ink hover:bg-bg-light">
                  Back to results
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
                  {shortlisted ? "Added to shortlist" : "Add to shortlist"}
                </button>
              </div>
            </div>
            <p className="border-t border-border pt-4 text-xs text-muted">
              Information shown in this prototype is fictional and for demonstration purposes only.
            </p>
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
      <span className="text-right font-mono text-[13px] text-ink">{value}</span>
    </div>
  );
}

function Chip({ children, mono }: { children: React.ReactNode; mono?: boolean }) {
  return (
    <span className={clsx("rounded border border-border bg-bg-light px-2.5 py-1 text-xs text-ink", mono && "font-mono")}>
      {children}
    </span>
  );
}
