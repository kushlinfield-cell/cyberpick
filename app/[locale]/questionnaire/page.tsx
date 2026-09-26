"use client";

import { useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import Button from "@/components/Button";
import PillToggle from "@/components/PillToggle";
import { useI18n } from "@/context/I18nContext";

const COUNTRIES = ["Finland", "Sweden", "Norway", "Denmark"];

export default function QuestionnairePage() {
  const { locale, dict } = useI18n();
  const q = dict.questionnaire;
  const [step, setStep] = useState(1);

  const [country, setCountry] = useState("Finland");
  const [industry, setIndustry] = useState(q.industries[0]);
  const [employees, setEmployees] = useState(q.employeeBands[1]);

  const [environment, setEnvironment] = useState<Record<string, boolean>>({
    "Microsoft 365": true,
    Azure: true,
    "Microsoft Defender": true,
  });

  const [capabilities, setCapabilities] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    q.capabilityOptions.slice(0, 4).forEach((c) => (initial[c] = true));
    return initial;
  });

  const [euEea, setEuEea] = useState(true);
  const [englishService, setEnglishService] = useState(true);
  const [localLanguage, setLocalLanguage] = useState(false);
  const [timeline, setTimeline] = useState(q.timelineOptions[1]);

  const toggle = (setter: typeof setEnvironment, key: string) =>
    setter((prev) => ({ ...prev, [key]: !prev[key] }));

  const selectedEnvironment = q.environmentOptions.filter((o) => environment[o]);
  const selectedCapabilities = q.capabilityOptions.filter((o) => capabilities[o]);

  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  return (
    <>
      <SiteNav />

      <div className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
          <Link href={`/${locale}`} className="font-mono text-xs text-muted">
            {q.cancel}
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-muted">
              {q.stepOfFmt.replace("{n}", String(step)).replace("{label}", q.stepLabels[step - 1])}
            </span>
            <div className="h-1 w-32 overflow-hidden rounded-full bg-border">
              <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${(step / 5) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      <main className="flex justify-center bg-bg-light px-6 py-16">
        <div className="w-full max-w-2xl rounded-lg border border-border bg-white p-9">
          {step === 1 && (
            <StepShell n={1} title={q.step1Title} desc={q.step1Desc}>
              <Field label={q.countryLabel}>
                <PillGroup options={COUNTRIES} labels={dict.countries} value={country} onChange={setCountry} />
              </Field>
              <Field label={q.industryLabel}>
                <PillGroup options={q.industries} value={industry} onChange={setIndustry} />
              </Field>
              <Field label={q.employeesLabel}>
                <PillGroup options={q.employeeBands} value={employees} onChange={setEmployees} />
              </Field>
            </StepShell>
          )}

          {step === 2 && (
            <StepShell n={2} title={q.step3Title} desc={q.step3Desc}>
              <Field label={q.environmentLabel}>
                <div className="flex flex-wrap gap-2.5">
                  {q.environmentOptions.map((opt) => (
                    <PillToggle key={opt} label={opt} selected={!!environment[opt]} onClick={() => toggle(setEnvironment, opt)} />
                  ))}
                </div>
              </Field>
            </StepShell>
          )}

          {step === 3 && (
            <StepShell n={3} title={q.step4Title} desc={q.step4Desc}>
              <Field label={q.capabilitiesLabel}>
                <div className="flex flex-wrap gap-2.5">
                  {q.capabilityOptions.map((opt) => (
                    <PillToggle key={opt} label={opt} selected={!!capabilities[opt]} onClick={() => toggle(setCapabilities, opt)} />
                  ))}
                </div>
              </Field>
            </StepShell>
          )}

          {step === 4 && (
            <StepShell n={4} title={q.step5Title} desc={q.step5Desc}>
              <Field label={q.dataHandlingLabel}>
                <PillToggle label={q.euEeaLabel} selected={euEea} onClick={() => setEuEea((v) => !v)} />
              </Field>
              <Field label={q.languageLabel}>
                <div className="flex flex-wrap gap-2.5">
                  <PillToggle label={q.englishLabel} selected={englishService} onClick={() => setEnglishService((v) => !v)} />
                  <PillToggle label={q.localLanguageLabel} selected={localLanguage} onClick={() => setLocalLanguage((v) => !v)} />
                </div>
              </Field>
              <Field label={q.timelineLabel}>
                <PillGroup options={q.timelineOptions} value={timeline} onChange={setTimeline} />
              </Field>
            </StepShell>
          )}

          {step === 5 && (
            <StepShell n={5} title={q.step6Title} desc={q.step6Desc}>
              <ReviewRow label={q.reviewCountry} value={dict.countries[country] ?? country} onEdit={() => setStep(1)} editLabel={q.edit} />
              <ReviewRow label={q.reviewIndustry} value={industry} onEdit={() => setStep(1)} editLabel={q.edit} />
              <ReviewRow label={q.reviewEmployees} value={employees} onEdit={() => setStep(1)} editLabel={q.edit} />
              <ReviewRow label={q.reviewService} value="Managed Detection & Response" />
              <ReviewRow label={q.reviewEnvironment} value={selectedEnvironment.join(", ") || "—"} onEdit={() => setStep(2)} editLabel={q.edit} />
              <ReviewRow label={q.reviewCapabilities} value={selectedCapabilities.join(", ") || "—"} onEdit={() => setStep(3)} editLabel={q.edit} />
              <ReviewRow
                label={q.reviewOperational}
                value={[euEea ? q.euEeaLabel : null, englishService ? q.englishLabel : null, localLanguage ? q.localLanguageLabel : null, timeline]
                  .filter(Boolean)
                  .join(", ")}
                onEdit={() => setStep(4)}
                editLabel={q.edit}
              />
            </StepShell>
          )}

          <div className="mt-9 flex items-center justify-between border-t border-border pt-6">
            {step > 1 ? (
              <Button variant="secondary" onClick={back}>
                {q.back}
              </Button>
            ) : (
              <span />
            )}
            {step < 5 ? (
              <Button onClick={next}>{q.continue}</Button>
            ) : (
              <Button href={`/${locale}/requirements`}>{q.generate}</Button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

function StepShell({ n, title, desc, children }: { n: number; title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="label-muted">Step {n}</span>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{title}</h1>
        <p className="text-[15px] text-muted">{desc}</p>
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="label-muted">{label}</label>
      {children}
    </div>
  );
}

function PillGroup({
  options,
  labels,
  value,
  onChange,
}: {
  options: string[];
  labels?: Record<string, string>;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => (
        <PillToggle key={opt} label={labels?.[opt] ?? opt} selected={value === opt} onClick={() => onChange(opt)} />
      ))}
    </div>
  );
}

function ReviewRow({
  label,
  value,
  onEdit,
  editLabel,
}: {
  label: string;
  value: string;
  onEdit?: () => void;
  editLabel?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-border py-4 last:border-b-0">
      <div className="flex flex-col gap-1">
        <span className="label-muted">{label}</span>
        <span className="text-sm text-ink">{value}</span>
      </div>
      {onEdit && (
        <button type="button" onClick={onEdit} className="shrink-0 font-mono text-xs text-accent">
          {editLabel}
        </button>
      )}
    </div>
  );
}
