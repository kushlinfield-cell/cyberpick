import SiteNav from "@/components/SiteNav";
import Button from "@/components/Button";
import { ArrowRightIcon, CheckIcon, DashIcon, NodeIcon, LockIcon } from "@/components/Icons";
import { providers, services, capabilityScore, CAPABILITY_ORDER, CAPABILITY_LABELS } from "@/lib/mock-data";

const TRUST_LINE = "Independent provider research · Structured requirements · Transparent matching";

const PROBLEMS = [
  "Providers describe services differently.",
  "Technical requirements are difficult to compare.",
  "Pricing structures differ.",
  "Not every provider fits every environment.",
];

const HOW_IT_WORKS = [
  {
    number: "01",
    title: "Define your requirements",
    description: "Tell us about your organisation, environment and security needs.",
  },
  {
    number: "02",
    title: "Find suitable providers",
    description: "We compare your requirements against structured provider capabilities.",
  },
  {
    number: "03",
    title: "Request proposals",
    description: "Shortlist providers and send the same procurement brief to each.",
  },
];

const PRINCIPLES = [
  {
    title: "Objective criteria",
    description: "Matches are based on stated environment, technology and coverage requirements.",
  },
  {
    title: "Transparent methodology",
    description: "How a provider qualifies is visible — capability by capability, not a hidden score.",
  },
  {
    title: "Provider verification",
    description: "Provider capability data is checked before it's shown to buyers.",
  },
  {
    title: "No pay-to-win rankings",
    description: "Commercial relationships with providers do not determine matching or ranking.",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteNav />

      {/* Hero — dark */}
      <section className="bg-bgdark">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:py-28">
          <div className="flex flex-col gap-7">
            <h1 className="text-[42px] font-semibold leading-[1.12] tracking-tight text-white sm:text-[52px]">
              Find the right
              <br />
              cybersecurity partner.
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-white/70">
              Turn your security requirements into a structured brief and discover Nordic providers that fit your
              environment.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/questionnaire">
                Find providers
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
              <Button href="/providers" variant="secondary-dark">
                Explore providers
              </Button>
            </div>
            <p className="eyebrow-light pt-2">{TRUST_LINE}</p>
          </div>

          <HeroProductVisual />
        </div>
      </section>

      {/* Problem section */}
      <section className="bg-white">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,480px)_1fr]">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ink">
              Cybersecurity procurement shouldn&apos;t start with 30 browser tabs.
            </h2>
            <div className="flex flex-col gap-6">
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {PROBLEMS.map((p) => (
                  <li key={p} className="flex items-start gap-3 rounded-md border border-border bg-bg-light px-4 py-3.5 text-[15px] text-ink">
                    <DashIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="text-[15px] leading-relaxed text-muted">
                CyberPick gives buyers a structured way to understand the market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-border bg-bg-light">
        <div className="mx-auto max-w-content px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">How it works</h2>
          <div className="relative mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            <div
              className="pointer-events-none absolute left-0 right-0 top-[13px] hidden h-px bg-border-strong md:block"
              aria-hidden="true"
            />
            {HOW_IT_WORKS.map((step) => (
              <div key={step.number} className="relative flex flex-col gap-3">
                <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-accent bg-bg-light font-mono text-xs text-accent">
                  {step.number.slice(1)}
                </span>
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Procurement example */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="mb-10 flex flex-col gap-2">
            <span className="label-muted">Demonstration data</span>
            <h2 className="text-3xl font-semibold tracking-tight text-ink">See the match in practice</h2>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,340px)_1fr]">
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-bg-light p-6">
              <span className="label-muted">Your requirements</span>
              <ReqBlock title="Company">
                Finnish manufacturing company
                <br />
                250–500 employees
              </ReqBlock>
              <ReqBlock title="Environment">Microsoft 365 · Azure · Microsoft Defender</ReqBlock>
              <ReqBlock title="Required">
                24/7 monitoring · Threat detection · Incident response
                <br />
                Threat hunting · EU/EEA data handling
              </ReqBlock>
            </div>

            <div className="flex flex-col gap-3">
              <span className="label-muted">Matched providers</span>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {providers.map((provider) => {
                  const { met, total } = capabilityScore(provider);
                  return (
                    <div key={provider.slug} className="flex flex-col gap-4 rounded-lg border border-border bg-white p-6">
                      <div>
                        <h3 className="text-base font-semibold text-ink">{provider.name}</h3>
                        <span className="text-xs text-muted">
                          {provider.city}, {provider.country}
                        </span>
                      </div>
                      <span className="w-fit rounded bg-bg-light px-2 py-1 font-mono text-xs text-ink">
                        {met} / {total} required capabilities
                      </span>
                      <dl className="flex flex-col border-t border-border">
                        {CAPABILITY_ORDER.slice(0, 4).map((key) => (
                          <div key={key} className="flex items-center justify-between gap-2 border-b border-border py-2 text-[13px] last:border-b-0">
                            <span className="text-ink">{CAPABILITY_LABELS[key]}</span>
                            {provider.capabilities[key] ? (
                              <CheckIcon className="h-3.5 w-3.5 text-success" />
                            ) : (
                              <DashIcon className="h-3.5 w-3.5 text-muted" />
                            )}
                          </div>
                        ))}
                      </dl>
                      <a href={`/providers/${provider.slug}`} className="font-mono text-xs font-medium text-accent">
                        View provider →
                      </a>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-muted">
                Provider information shown here is demonstration data, for illustration only.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-border bg-bg-light">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="mb-12 flex flex-col gap-2">
            <span className="label-muted">Coverage</span>
            <h2 className="text-3xl font-semibold tracking-tight text-ink">Cybersecurity services</h2>
            <p className="max-w-xl text-[15px] text-muted">
              CyberPick starts with Managed Detection &amp; Response. Additional service categories are planned.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.name}
                className={
                  service.status === "active"
                    ? "flex flex-col gap-3 rounded-lg border border-accent bg-white p-6"
                    : "flex flex-col gap-3 rounded-lg border border-border bg-white/60 p-6"
                }
              >
                <NodeIcon className={service.status === "active" ? "h-5 w-5 text-accent" : "h-5 w-5 text-muted"} />
                <span className={service.status === "active" ? "text-sm font-medium text-ink" : "text-sm font-medium text-muted"}>
                  {service.name}
                </span>
                <span
                  className={
                    service.status === "active"
                      ? "w-fit rounded bg-success-tint px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.04em] text-success"
                      : "w-fit rounded bg-bg-light px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.04em] text-muted"
                  }
                >
                  {service.status === "active" ? "Available now" : "Coming soon"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer-first */}
      <section id="buyer-first" className="border-t border-white/10 bg-bgdark">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="mb-12 flex max-w-2xl flex-col gap-4">
            <span className="eyebrow-light flex items-center gap-2">
              <LockIcon className="h-3.5 w-3.5" /> Methodology
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-white">Built for the buyer.</h2>
            <p className="text-[15px] leading-relaxed text-white/70">
              CyberPick helps buyers understand their requirements and identify providers based on fit. Commercial
              relationships do not determine provider matching.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p) => (
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
          <h2 className="text-3xl font-semibold tracking-tight text-ink">Ready to define your requirements?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/questionnaire">
              Find providers
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
            <Button href="/providers" variant="secondary">
              Explore providers
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-bg-light">
        <div className="mx-auto flex max-w-content flex-col gap-2 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-bold text-ink">
            Cyber<span className="text-accent">Pick</span>
          </span>
          <span className="label-muted">Prototype — providers and results shown are illustrative</span>
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
  return (
    <div className="rounded-lg border border-white/10 bg-navy p-1.5 shadow-panel">
      <div className="rounded-md bg-white p-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <span className="label-muted">Managed Detection &amp; Response</span>
          <span className="rounded bg-success-tint px-2 py-0.5 font-mono text-[11px] text-success">Live brief</span>
        </div>

        <div className="flex flex-col gap-4 pt-4">
          <VisualRow label="Company">250–500 employees</VisualRow>
          <div className="flex flex-col gap-1.5 border-t border-border pt-3">
            <span className="text-xs font-medium uppercase tracking-[0.04em] text-muted">Environment</span>
            <div className="flex flex-wrap gap-1.5">
              <span className="mono-tag">Microsoft 365</span>
              <span className="mono-tag">Azure</span>
              <span className="mono-tag">Microsoft Defender</span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 border-t border-border pt-3">
            <span className="text-xs font-medium uppercase tracking-[0.04em] text-muted">Requirements</span>
            <div className="flex flex-col gap-1.5">
              <RequirementRow>24/7 monitoring</RequirementRow>
              <RequirementRow>Incident response</RequirementRow>
              <RequirementRow>EU/EEA data handling</RequirementRow>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between rounded-md bg-accent-soft px-4 py-3">
          <span className="text-xs font-medium uppercase tracking-[0.04em] text-ink">Status</span>
          <span className="font-mono text-sm font-medium text-ink">12 potential providers</span>
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
