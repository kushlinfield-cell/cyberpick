"use client";

import { useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import Button from "@/components/Button";
import PillToggle from "@/components/PillToggle";

const COUNTRIES = ["Finland", "Sweden", "Norway", "Denmark"];
const INDUSTRIES = ["Manufacturing", "Technology", "Financial services", "Healthcare", "Retail", "Other"];
const EMPLOYEE_BANDS = ["50–250 employees", "250–500 employees", "500–1,000 employees"];

const SERVICE_ACTIVE = "Managed Detection & Response";
const SERVICES_SOON = ["SOC Services", "Penetration Testing", "Incident Response", "vCISO", "ISO 27001", "NIS2", "Cloud Security"];

const ENVIRONMENT_OPTIONS = ["Microsoft 365", "Azure", "AWS", "Google Cloud", "Microsoft Defender", "CrowdStrike", "Other"];

const CAPABILITY_OPTIONS = [
  "24/7 monitoring",
  "Threat detection and triage",
  "Incident response",
  "Threat hunting",
  "Vulnerability management",
  "Monthly reporting",
  "Named service manager",
];

const TIMELINE_OPTIONS = ["Within 1 month", "Within 3 months", "Within 6 months", "Flexible"];

const STEP_LABELS = [
  "Your organisation",
  "What do you need?",
  "Your environment",
  "Required capabilities",
  "Operational requirements",
  "Review",
];

export default function QuestionnairePage() {
  const [step, setStep] = useState(1);

  const [country, setCountry] = useState("Finland");
  const [industry, setIndustry] = useState("Manufacturing");
  const [employees, setEmployees] = useState("250–500 employees");

  const [environment, setEnvironment] = useState<Record<string, boolean>>({
    "Microsoft 365": true,
    Azure: true,
    "Microsoft Defender": true,
  });

  const [capabilities, setCapabilities] = useState<Record<string, boolean>>({
    "24/7 monitoring": true,
    "Threat detection and triage": true,
    "Incident response": true,
    "Threat hunting": true,
  });

  const [euEea, setEuEea] = useState(true);
  const [englishService, setEnglishService] = useState(true);
  const [localLanguage, setLocalLanguage] = useState(false);
  const [timeline, setTimeline] = useState("Within 3 months");

  const toggle = (setter: typeof setEnvironment, key: string) =>
    setter((prev) => ({ ...prev, [key]: !prev[key] }));

  const selectedEnvironment = ENVIRONMENT_OPTIONS.filter((o) => environment[o]);
  const selectedCapabilities = CAPABILITY_OPTIONS.filter((o) => capabilities[o]);

  const next = () => setStep((s) => Math.min(6, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  return (
    <>
      <SiteNav />

      <div className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
          <Link href="/" className="font-mono text-xs text-muted">
            ← Cancel
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-muted">
              Step {step} of 6 · {STEP_LABELS[step - 1]}
            </span>
            <div className="h-1 w-32 overflow-hidden rounded-full bg-border">
              <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${(step / 6) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      <main className="flex justify-center bg-bg-light px-6 py-16">
        <div className="w-full max-w-2xl rounded-lg border border-border bg-white p-9">
          {step === 1 && (
            <StepShell n={1} title="Your organisation" desc="A few basics so we can scope your requirements correctly.">
              <Field label="Country">
                <PillGroup options={COUNTRIES} value={country} onChange={setCountry} />
              </Field>
              <Field label="Industry">
                <PillGroup options={INDUSTRIES} value={industry} onChange={setIndustry} />
              </Field>
              <Field label="Employees">
                <PillGroup options={EMPLOYEE_BANDS} value={employees} onChange={setEmployees} />
              </Field>
            </StepShell>
          )}

          {step === 2 && (
            <StepShell n={2} title="What do you need?" desc="CyberPick currently matches for Managed Detection & Response.">
              <Field label="Service">
                <div className="flex flex-wrap gap-2.5">
                  <PillToggle label={SERVICE_ACTIVE} selected />
                  {SERVICES_SOON.map((s) => (
                    <PillToggle key={s} label={`${s} — coming soon`} selected={false} disabled />
                  ))}
                </div>
              </Field>
            </StepShell>
          )}

          {step === 3 && (
            <StepShell n={3} title="Your environment" desc="Select every platform and tool currently in use.">
              <Field label="Environment — select all that apply">
                <div className="flex flex-wrap gap-2.5">
                  {ENVIRONMENT_OPTIONS.map((opt) => (
                    <PillToggle
                      key={opt}
                      label={opt}
                      selected={!!environment[opt]}
                      onClick={() => toggle(setEnvironment, opt)}
                    />
                  ))}
                </div>
              </Field>
            </StepShell>
          )}

          {step === 4 && (
            <StepShell n={4} title="Required capabilities" desc="Select the capabilities providers must offer.">
              <Field label="Capabilities — select all that apply">
                <div className="flex flex-wrap gap-2.5">
                  {CAPABILITY_OPTIONS.map((opt) => (
                    <PillToggle
                      key={opt}
                      label={opt}
                      selected={!!capabilities[opt]}
                      onClick={() => toggle(setCapabilities, opt)}
                    />
                  ))}
                </div>
              </Field>
            </StepShell>
          )}

          {step === 5 && (
            <StepShell n={5} title="Operational requirements" desc="Data handling, language and timeline expectations.">
              <Field label="Data handling">
                <PillToggle label="EU/EEA data handling required" selected={euEea} onClick={() => setEuEea((v) => !v)} />
              </Field>
              <Field label="Language">
                <div className="flex flex-wrap gap-2.5">
                  <PillToggle label="English-language service" selected={englishService} onClick={() => setEnglishService((v) => !v)} />
                  <PillToggle label="Local-language service" selected={localLanguage} onClick={() => setLocalLanguage((v) => !v)} />
                </div>
              </Field>
              <Field label="Implementation timeline">
                <PillGroup options={TIMELINE_OPTIONS} value={timeline} onChange={setTimeline} />
              </Field>
            </StepShell>
          )}

          {step === 6 && (
            <StepShell n={6} title="Review" desc="Confirm your answers before we generate your requirements brief.">
              <ReviewRow label="Country" value={country} onEdit={() => setStep(1)} />
              <ReviewRow label="Industry" value={industry} onEdit={() => setStep(1)} />
              <ReviewRow label="Employees" value={employees} onEdit={() => setStep(1)} />
              <ReviewRow label="Service" value={SERVICE_ACTIVE} onEdit={() => setStep(2)} />
              <ReviewRow label="Environment" value={selectedEnvironment.join(", ") || "—"} onEdit={() => setStep(3)} />
              <ReviewRow label="Capabilities" value={selectedCapabilities.join(", ") || "—"} onEdit={() => setStep(4)} />
              <ReviewRow
                label="Operational"
                value={[
                  euEea ? "EU/EEA data handling" : null,
                  englishService ? "English" : null,
                  localLanguage ? "Local language" : null,
                  timeline,
                ]
                  .filter(Boolean)
                  .join(", ")}
                onEdit={() => setStep(5)}
              />
            </StepShell>
          )}

          <div className="mt-9 flex items-center justify-between border-t border-border pt-6">
            {step > 1 ? (
              <Button variant="secondary" onClick={back}>
                Back
              </Button>
            ) : (
              <span />
            )}
            {step < 6 ? (
              <Button onClick={next}>Continue</Button>
            ) : (
              <Button href="/requirements">Generate my requirements</Button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

function StepShell({
  n,
  title,
  desc,
  children,
}: {
  n: number;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
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
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => (
        <PillToggle key={opt} label={opt} selected={value === opt} onClick={() => onChange(opt)} />
      ))}
    </div>
  );
}

function ReviewRow({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-border py-4 last:border-b-0">
      <div className="flex flex-col gap-1">
        <span className="label-muted">{label}</span>
        <span className="text-sm text-ink">{value}</span>
      </div>
      <button type="button" onClick={onEdit} className="shrink-0 font-mono text-xs text-accent">
        Edit
      </button>
    </div>
  );
}
