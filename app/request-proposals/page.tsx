"use client";

import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import ProcurementStepper from "@/components/ProcurementStepper";
import Button from "@/components/Button";
import { briefChips, proposalRequestFields, providers } from "@/lib/mock-data";
import { useShortlist } from "@/context/ShortlistContext";
import { CheckIcon } from "@/components/Icons";

export default function RequestProposalsPage() {
  const { shortlist, requestSent, sendRequest } = useShortlist();
  const shortlistedProviders = providers.filter((p) => shortlist.includes(p.slug));

  return (
    <>
      <SiteNav />
      <ProcurementStepper />

      <main className="flex justify-center bg-bg-light px-6 py-14">
        <div className="w-full max-w-2xl flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="label-muted">Final step</span>
            <h1 className="text-3xl font-semibold tracking-tight text-ink">Request comparable proposals</h1>
            <p className="text-[15px] leading-relaxed text-muted">
              Each provider receives the same core requirements, making responses easier to evaluate.
            </p>
          </div>

          {shortlistedProviders.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="flex flex-col gap-3">
                <span className="label-muted">Selected providers</span>
                <div className="flex flex-col gap-2">
                  {shortlistedProviders.map((p) => (
                    <div key={p.slug} className="flex items-center justify-between rounded-md border border-border bg-white px-5 py-3.5">
                      <div>
                        <span className="text-sm font-medium text-ink">{p.name}</span>
                        <span className="ml-2 text-xs text-muted">
                          {p.city}, {p.country}
                        </span>
                      </div>
                      <Link href={`/providers/${p.slug}`} className="font-mono text-xs text-accent">
                        View provider
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className="label-muted">Procurement brief</span>
                <div className="flex flex-wrap gap-2 rounded-lg border border-border bg-white p-5">
                  {briefChips.map((chip) => (
                    <span key={chip} className="mono-tag">
                      {chip}
                    </span>
                  ))}
                </div>
                <Link href="/requirements" className="self-start font-mono text-xs text-accent">
                  View full brief →
                </Link>
              </div>

              <div className="flex flex-col gap-3 rounded-lg border border-border bg-navy p-7">
                <span className="eyebrow-light">Providers are asked to respond with</span>
                <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {proposalRequestFields.map((field) => (
                    <li key={field} className="flex items-center gap-2.5 text-sm text-white/85">
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      {field}
                    </li>
                  ))}
                </ul>
              </div>

              {!requestSent ? (
                <div className="flex items-center justify-between gap-4 border-t border-border pt-6">
                  <p className="max-w-xs text-xs text-muted">
                    This is a prototype — clicking below prepares the request but does not send anything.
                  </p>
                  <Button onClick={sendRequest}>Request proposals</Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 rounded-lg border border-success/25 bg-success-tint px-6 py-6">
                  <span className="flex items-center gap-2 font-mono text-sm text-success">
                    <CheckIcon className="h-4 w-4" />
                    Request prepared
                  </span>
                  <p className="text-sm leading-relaxed text-ink">
                    In the live service, your procurement brief would now be shared with the selected providers.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-dashed border-border-strong bg-white px-7 py-10 text-center">
      <p className="text-sm text-muted">
        No providers selected yet. Add at least one provider to your shortlist from your matches first.
      </p>
      <Button href="/matches" size="sm" className="self-center">
        Back to matches
      </Button>
    </div>
  );
}
