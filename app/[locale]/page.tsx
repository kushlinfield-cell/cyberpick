"use client";

import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import Button from "@/components/Button";
import { ArrowRightIcon, CheckIcon, DashIcon, NodeIcon, LockIcon } from "@/components/Icons";
import { providers, serviceOfferings, confirmedServiceCount, SERVICE_TAG_ORDER, getProvider } from "@/lib/mock-data";
import { useI18n } from "@/context/I18nContext";

const FEATURED_SLUGS = ["truesec", "mnemonic", "csis-security-group"];
const FEATURED_TAGS = SERVICE_TAG_ORDER.slice(0, 4);

export default function HomePage() {
  const { locale, dict, country, fmt } = useI18n();
  const featured = FEATURED_SLUGS.map((slug) => getProvider(slug)).filter(Boolean) as typeof providers;

  return (
    <>
      <SiteNav />

      {/* Hero — dark */}
      <section className="bg-bgdark">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:py-28">
          <div className="flex flex-col gap-7">
            <h1 className="text-[42px] font-semibold leading-[1.12] tracking-tight text-white sm:text-[52px]">
              {dict.home.heroLine1}
              <br />
              {dict.home.heroLine2}
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-white/70">{dict.home.heroSubcopy}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href={`/${locale}/questionnaire`}>
                {dict.home.heroCtaPrimary}
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
              <Button href={`/${locale}/providers`} variant="secondary-dark">
                {dict.home.heroCtaSecondary}
              </Button>
            </div>
            <p className="eyebrow-light pt-2">{dict.home.trustLine}</p>
          </div>

          <HeroProductVisual />
        </div>
      </section>

      {/* Problem section */}
      <section className="bg-white">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,480px)_1fr]">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ink">{dict.home.problemHeadline}</h2>
            <div className="flex flex-col gap-6">
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {dict.home.problems.map((p) => (
                  <li key={p} className="flex items-start gap-3 rounded-md border border-border bg-bg-light px-4 py-3.5 text-[15px] text-ink">
                    <DashIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="text-[15px] leading-relaxed text-muted">{dict.home.problemClosing}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works — a second, cooler tint gives this section its own character */}
      <section id="how-it-works" className="border-y border-tint-border bg-tint">
        <div className="mx-auto max-w-content px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">{dict.home.howItWorksHeading}</h2>
          <div className="relative mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            <div
              className="pointer-events-none absolute left-0 right-0 top-[13px] hidden h-px bg-tint-border md:block"
              aria-hidden="true"
            />
            {dict.home.steps.map((step, i) => (
              <div key={step.title} className="relative flex flex-col gap-3">
                <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-accent bg-tint font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0").slice(1)}
                </span>
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Procurement example — real providers */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="mb-10 flex flex-col gap-2">
            <span className="label-muted">{dict.home.procurementEyebrow}</span>
            <h2 className="text-3xl font-semibold tracking-tight text-ink">{dict.home.procurementHeading}</h2>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,340px)_1fr]">
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-bg-light p-6">
              <span className="label-muted">{dict.home.reqCardLabel}</span>
              <ReqBlock title={dict.home.reqCompanyLabel}>
                {dict.home.reqCompanyValue.split("\n").map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </ReqBlock>
              <ReqBlock title={dict.home.reqEnvironmentLabel}>{dict.home.reqEnvironmentValue}</ReqBlock>
              <ReqBlock title={dict.home.reqRequiredLabel}>
                {dict.home.reqRequiredValue.split("\n").map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </ReqBlock>
            </div>

            <div className="flex flex-col gap-3">
              <span className="label-muted">{dict.home.matchedProvidersLabel}</span>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {featured.map((provider) => {
                  const { met, total } = confirmedServiceCount(provider);
                  return (
                    <div key={provider.slug} className="flex flex-col gap-4 rounded-lg border border-border bg-white p-6">
                      <div>
                        <h3 className="text-base font-semibold text-ink">{provider.name}</h3>
                        <span className="text-xs text-muted">
                          {provider.hqCity ? `${provider.hqCity}, ` : ""}
                          {country(provider.hqCountry)}
                        </span>
                      </div>
                      <span className="w-fit rounded bg-bg-light px-2 py-1 font-mono text-xs text-ink">
                        {fmt(dict.home.confirmedServicesFmt, { met, total })}
                      </span>
                      <dl className="flex flex-col border-t border-border">
                        {FEATURED_TAGS.map((tag) => (
                          <div key={tag} className="flex items-center justify-between gap-2 border-b border-border py-2 text-[13px] last:border-b-0">
                            <span className="text-ink">{dict.serviceTags[tag]}</span>
                            {provider.confirmedServices.includes(tag) ? (
                              <CheckIcon className="h-3.5 w-3.5 text-success" />
                            ) : (
                              <DashIcon className="h-3.5 w-3.5 text-muted" />
                            )}
                          </div>
                        ))}
                      </dl>
                      <a href={`/${locale}/providers/${provider.slug}`} className="font-mono text-xs font-medium text-accent">
                        {dict.home.viewProvider}
                      </a>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-muted">{dict.home.demoNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-border bg-bg-light">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="mb-12 flex flex-col gap-2">
            <span className="label-muted">{dict.home.servicesEyebrow}</span>
            <h2 className="text-3xl font-semibold tracking-tight text-ink">{dict.home.servicesHeading}</h2>
            <p className="max-w-xl text-[15px] text-muted">{dict.home.servicesSubcopy}</p>
          </div>
          {(() => {
            const featured = serviceOfferings.find((o) => o.guidedQuestionnaire);
            const rest = serviceOfferings.filter((o) => !o.guidedQuestionnaire);
            return (
              <div className="flex flex-col gap-4">
                {featured && (
                  <div className="flex flex-col gap-5 rounded-lg border border-accent bg-white p-7 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <NodeIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <div className="flex flex-col gap-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-base font-semibold text-ink">{dict.serviceTags[featured.tag]}</span>
                          <span className="w-fit rounded bg-success-tint px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.04em] text-success">
                            {dict.home.guidedAvailable}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-muted">
                          {fmt(dict.home.confirmedProvidersFmt, { count: featured.providerCount })}
                        </span>
                      </div>
                    </div>
                    <Button href={`/${locale}/questionnaire`} size="sm" className="shrink-0 self-start sm:self-center">
                      {dict.home.heroCtaPrimary}
                    </Button>
                  </div>
                )}

                <div className="flex flex-col gap-3 rounded-lg border border-border bg-white p-7">
                  <span className="label-muted">{dict.home.directoryOnly}</span>
                  <div className="flex flex-wrap gap-2">
                    {rest.map((offering) => (
                      <Link
                        key={offering.tag}
                        href={`/${locale}/providers?service=${offering.tag}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-bg-light px-3.5 py-1.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
                      >
                        {dict.serviceTags[offering.tag]}
                        <span className="font-mono text-[11px] text-muted">{offering.providerCount}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Buyer-first */}
      <section id="buyer-first" className="border-t border-white/10 bg-bgdark">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="mb-12 flex max-w-2xl flex-col gap-4">
            <span className="eyebrow-light flex items-center gap-2">
              <LockIcon className="h-3.5 w-3.5" /> {dict.home.buyerEyebrow}
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-white">{dict.home.buyerHeading}</h2>
            <p className="text-[15px] leading-relaxed text-white/70">{dict.home.buyerSubcopy}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dict.home.principles.map((p) => (
              <div key={p.title} className="flex flex-col gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                <p className="text-[13px] leading-relaxed text-white/60">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto flex max-w-content flex-col items-center gap-6 px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">{dict.home.closingHeading}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href={`/${locale}/questionnaire`}>
              {dict.home.heroCtaPrimary}
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
            <Button href={`/${locale}/providers`} variant="secondary">
              {dict.home.heroCtaSecondary}
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-bg-light">
        <div className="mx-auto flex max-w-content flex-col gap-2 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-bold text-ink">
            Cyber<span className="text-accent">Pick</span>
          </span>
          <span className="label-muted">{dict.home.footerTagline}</span>
        </div>
      </footer>
    </>
  );
}

function ReqBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-t border-border pt-4 first:border-t-0 first:pt-0">
      <span className="text-xs font-medium uppercase tracking-[0.04em] text-muted">{title}</span>
      <span className="text-sm text-ink">{children}</span>
    </div>
  );
}

function HeroProductVisual() {
  const { dict } = useI18n();
  return (
    <div className="rounded-lg border border-white/10 bg-navy p-1.5 shadow-panel">
      <div className="rounded-md bg-white p-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <span className="label-muted">{dict.home.visualServiceLabel}</span>
          <span className="rounded bg-success-tint px-2 py-0.5 font-mono text-[11px] text-success">{dict.home.visualLiveBrief}</span>
        </div>

        <div className="flex flex-col gap-4 pt-4">
          <VisualRow label={dict.home.visualCompanyLabel}>{dict.home.visualCompanyValue}</VisualRow>
          <div className="flex flex-col gap-1.5 border-t border-border pt-3">
            <span className="text-xs font-medium uppercase tracking-[0.04em] text-muted">{dict.home.visualEnvironmentLabel}</span>
            <div className="flex flex-wrap gap-1.5">
              <span className="mono-tag">Microsoft 365</span>
              <span className="mono-tag">Azure</span>
              <span className="mono-tag">Microsoft Defender</span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 border-t border-border pt-3">
            <span className="text-xs font-medium uppercase tracking-[0.04em] text-muted">{dict.home.visualRequirementsLabel}</span>
            <div className="flex flex-col gap-1.5">
              <RequirementRow>{dict.home.visualReq1}</RequirementRow>
              <RequirementRow>{dict.home.visualReq2}</RequirementRow>
              <RequirementRow>{dict.home.visualReq3}</RequirementRow>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between rounded-md bg-accent-soft px-4 py-3">
          <span className="text-xs font-medium uppercase tracking-[0.04em] text-ink">{dict.home.visualStatusLabel}</span>
          <span className="font-mono text-sm font-medium text-ink">{dict.home.visualStatusValue}</span>
        </div>
      </div>
    </div>
  );
}

function VisualRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium uppercase tracking-[0.04em] text-muted">{label}</span>
      <span className="text-sm text-ink">{children}</span>
    </div>
  );
}

function RequirementRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm text-ink">
      <CheckIcon className="h-3.5 w-3.5 text-success" />
      {children}
    </div>
  );
}
