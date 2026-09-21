import SiteNav from "@/components/SiteNav";
import ProcurementStepper from "@/components/ProcurementStepper";
import Button from "@/components/Button";
import { organisation, environment, coreRequirements, operational, providerResponseFields } from "@/lib/mock-data";

export default function RequirementsPage() {
  return (
    <>
      <SiteNav />
      <ProcurementStepper />

      <main className="flex justify-center bg-bg-light px-6 py-16">
        <div className="flex w-full max-w-2xl flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="label-muted">Procurement brief</span>
            <h1 className="text-3xl font-semibold tracking-tight text-ink">Your MDR requirements</h1>
            <p className="text-[15px] leading-relaxed text-muted">
              We&apos;ve turned your answers into a structured procurement brief.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-white">
            <BriefSection title="Organisation">
              <span className="text-sm text-ink">
                {organisation.country} · {organisation.industry} · {organisation.employees}
              </span>
            </BriefSection>
            <BriefSection title="Environment">
              <TagRow items={environment} />
            </BriefSection>
            <BriefSection title="Core requirements">
              <TagRow items={coreRequirements} />
            </BriefSection>
            <BriefSection title="Operational" last>
              <TagRow items={operational} />
            </BriefSection>
          </div>

          <div className="flex flex-col gap-4 rounded-lg border border-border bg-navy p-7">
            <span className="eyebrow-light">What providers should respond with</span>
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
            <Button href="/questionnaire" variant="secondary">
              Edit requirements
            </Button>
            <Button href="/matches">Find matching providers</Button>
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
