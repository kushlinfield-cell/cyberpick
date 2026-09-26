"use client";

import { useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import ProcurementStepper from "@/components/ProcurementStepper";
import Button from "@/components/Button";
import { briefChips, providers } from "@/lib/mock-data";
import { useShortlist } from "@/context/ShortlistContext";
import { CheckIcon } from "@/components/Icons";
import { useI18n } from "@/context/I18nContext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RequestProposalsPage() {
  const { shortlist, requestSent, sendRequest } = useShortlist();
  const { locale, dict, country, fmt } = useI18n();
  const t = dict.requestProposals;
  const shortlistedProviders = providers.filter((p) => shortlist.includes(p.slug));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [consentOperational, setConsentOperational] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [error, setError] = useState("");

  const isValid = name.trim().length > 0 && EMAIL_RE.test(email) && consentOperational;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentOperational) {
      setError(t.consentRequiredError);
      return;
    }
    if (!isValid) {
      setError(t.consentRequiredError);
      return;
    }
    setError("");
    setSubmittedName(name);
    setSubmittedEmail(email);
    sendRequest();
  };

  return (
    <>
      <SiteNav />
      <ProcurementStepper />

      <main className="flex justify-center bg-bg-light px-6 py-14">
        <div className="w-full max-w-2xl flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="label-muted">{t.finalStep}</span>
            <h1 className="text-3xl font-semibold tracking-tight text-ink">{t.title}</h1>
            <p className="text-[15px] leading-relaxed text-muted">{t.subcopy}</p>
          </div>

          {shortlistedProviders.length === 0 ? (
            <EmptyState locale={locale} msg={t.emptyMsg} backLabel={t.backToMatches} />
          ) : (
            <>
              <div className="flex flex-col gap-3">
                <span className="label-muted">{t.selectedProviders}</span>
                <div className="flex flex-col gap-2">
                  {shortlistedProviders.map((p) => (
                    <div key={p.slug} className="flex items-center justify-between rounded-md border border-border bg-white px-5 py-3.5">
                      <div>
                        <span className="text-sm font-medium text-ink">{p.name}</span>
                        <span className="ml-2 text-xs text-muted">
                          {p.hqCity ? `${p.hqCity}, ` : ""}
                          {country(p.hqCountry)}
                        </span>
                      </div>
                      <Link href={`/${locale}/providers/${p.slug}`} className="font-mono text-xs text-accent">
                        {t.viewProvider}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className="label-muted">{t.briefLabel}</span>
                <div className="flex flex-wrap gap-2 rounded-lg border border-border bg-white p-5">
                  {briefChips.map((chip) => (
                    <span key={chip} className="mono-tag">
                      {chip}
                    </span>
                  ))}
                </div>
                <Link href={`/${locale}/requirements`} className="self-start font-mono text-xs text-accent">
                  {t.viewFullBrief}
                </Link>
              </div>

              <div className="flex flex-col gap-3 rounded-lg border border-border bg-navy p-7">
                <span className="eyebrow-light">{t.asksLabel}</span>
                <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {t.asks.map((field) => (
                    <li key={field} className="flex items-center gap-2.5 text-sm text-white/85">
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      {field}
                    </li>
                  ))}
                </ul>
              </div>

              {!requestSent ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-lg border border-border bg-white p-7">
                  <span className="label-muted">{t.formHeading}</span>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextField label={t.nameLabel} value={name} onChange={setName} required />
                    <TextField label={t.emailLabel} value={email} onChange={setEmail} type="email" required />
                    <TextField label={`${t.companyLabel}`} value={company} onChange={setCompany} />
                    <TextField label={`${t.roleLabel} (${t.optional})`} value={role} onChange={setRole} />
                    <TextField label={`${t.phoneLabel} (${t.optional})`} value={phone} onChange={setPhone} type="tel" />
                  </div>

                  <div className="flex flex-col gap-3 border-t border-border pt-5">
                    <label className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink">
                      <input
                        type="checkbox"
                        checked={consentOperational}
                        onChange={(e) => setConsentOperational(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-border-strong text-accent focus:ring-accent"
                      />
                      {t.consentOperational}
                    </label>
                    <label className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink">
                      <input
                        type="checkbox"
                        checked={consentMarketing}
                        onChange={(e) => setConsentMarketing(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-border-strong text-accent focus:ring-accent"
                      />
                      {t.consentMarketing}
                    </label>
                    <Link href={`/${locale}/privacy`} className="self-start font-mono text-xs text-accent">
                      {t.privacyLinkText} →
                    </Link>
                  </div>

                  {error && <p className="text-[13px] text-red-600">{error}</p>}

                  <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
                    <p className="max-w-xs text-xs text-muted">{t.noteBeforeSend}</p>
                    <Button type="submit">{t.requestBtn}</Button>
                  </div>
                  <p className="border-t border-border pt-4 text-[11px] leading-relaxed text-muted">{t.demoBackendNote}</p>
                </form>
              ) : (
                <div className="flex flex-col gap-3 rounded-lg border border-success/25 bg-success-tint px-6 py-6">
                  <span className="flex items-center gap-2 font-mono text-sm text-success">
                    <CheckIcon className="h-4 w-4" />
                    {t.preparedLabel}
                  </span>
                  <p className="text-sm leading-relaxed text-ink">{t.preparedNote}</p>
                  {submittedName && submittedEmail && (
                    <p className="text-sm leading-relaxed text-ink">{fmt(t.preparedForFmt, { name: submittedName, email: submittedEmail })}</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="label-muted">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="rounded-md border border-border-strong bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-accent"
      />
    </label>
  );
}

function EmptyState({ locale, msg, backLabel }: { locale: string; msg: string; backLabel: string }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-dashed border-border-strong bg-white px-7 py-10 text-center">
      <p className="text-sm text-muted">{msg}</p>
      <Button href={`/${locale}/matches`} size="sm" className="self-center">
        {backLabel}
      </Button>
    </div>
  );
}
