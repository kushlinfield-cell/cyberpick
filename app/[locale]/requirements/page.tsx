"use client";

import SiteNav from "@/components/SiteNav";
import ProcurementStepper from "@/components/ProcurementStepper";
import Button from "@/components/Button";
import { organisation, environment, coreRequirements, operational, providerResponseFields } from "@/lib/mock-data";
import { useI18n } from "@/context/I18nContext";

export default function RequirementsPage() {
  const { locale, dict, country } = useI18n();
  const r = dict.requirements;

  return (
    <>
      <SiteNav />
      <ProcurementStepper />

      <main className="flex justify-center bg-bg-light px-6 py-16">
        <div className="flex w-full max-w-2xl flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="label-muted">{r.eyebrow}</span>
            <h1 className="text-3xl font-semibold tracking-tight text-ink">{r.title}</h1>
            <p className="text-[15px] leading-relaxed text-muted">{r.subcopy}</p>
          </div>

          <div className="rounded-lg border border-border bg-white">
            <BriefSection title={r.sectionOrganisation}>
              <span className="text-sm text-ink">
                {country(organisation.country)} · {organisation.industry} · {organisation.employees}
              </span>
            </BriefSection>
            <BriefSection title={r.sectionEnvironment}>
              <TagRow items={environment} />
            </BriefSection>
            <BriefSection title={r.sectionCoreRequirements}>
              <TagRow items={coreRequirements} />
            </BriefSection>
            <BriefSection title={r.sectionOperational} last>
              <TagRow items={operational} />
            </BriefSection>
          </div>

          <div className="flex flex-col gap-4 rounded-lg border border-border bg-navy p-7">
            <span className="eyebrow-light">{r.providerAsk}</span>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {providerResponseFields.map((field) => (
                <li key={field} className="flex items-center gap-2.5 text-sm text-white/85">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  {field}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end gap-3 border-t border-border pt-6">
            <Button href={`/${locale}/questionnaire`} variant="secondary">
              {r.editRequirements}
            </Button>
            <Button href={`/${locale}/matches`}>{r.findProviders}</Button>
          </div>
        </div>
      </main>
    </>
  );
}

function BriefSection({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={`flex flex-col gap-2.5 px-7 py-5 ${last ? "" : "border-b border-border"}`}>
      <span className="label-muted">{title}</span>
      {children}
    </div>
  );
}

function TagRow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="mono-tag">
          {item}
        </span>
      ))}
    </div>
  );
}
