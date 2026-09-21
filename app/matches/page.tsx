"use client";

import { useState } from "react";
import clsx from "clsx";
import SiteNav from "@/components/SiteNav";
import ProcurementStepper from "@/components/ProcurementStepper";
import BriefSummaryBar from "@/components/BriefSummaryBar";
import ShortlistTray from "@/components/ShortlistTray";
import ProviderCard from "@/components/ProviderCard";
import { providers, CAPABILITY_ORDER, CAPABILITY_LABELS, capabilityScore } from "@/lib/mock-data";
import { CheckIcon, DashIcon } from "@/components/Icons";

export default function MatchesPage() {
  const [view, setView] = useState<"cards" | "compare">("cards");

  return (
    <>
      <SiteNav />
      <ProcurementStepper />
      <BriefSummaryBar />

      <main className="bg-bg-light px-6 py-14">
        <div className="mx-auto flex max-w-content flex-col gap-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-2">
              <span className="label-muted">Demonstration data</span>
              <h1 className="text-3xl font-semibold tracking-tight text-ink">
                Providers matching your requirements
              </h1>
              <p className="max-w-xl text-[15px] text-muted">
                Each provider below is measured against the same 8 capabilities from your brief. Matching is based
                on stated capabilities, not a paid ranking.
              </p>
            </div>

            <div className="flex shrink-0 gap-1 rounded-md border border-border-strong bg-white p-1">
              <ViewButton active={view === "cards"} onClick={() => setView("cards")}>
                Cards
              </ViewButton>
              <ViewButton active={view === "compare"} onClick={() => setView("compare")}>
                Compare
              </ViewButton>
            </div>
          </div>

          {view === "cards" ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {providers.map((provider) => (
                <ProviderCard key={provider.slug} provider={provider} />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border bg-white">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="label-muted border-b border-border px-6 py-4 text-left font-medium">
                      Capability
                    </th>
                    {providers.map((p) => {
                      const { met, total } = capabilityScore(p);
                      return (
                        <th key={p.slug} className="border-b border-border px-6 py-4 text-left">
                          <div className="text-sm font-semibold text-ink">{p.name}</div>
                          <div className="font-mono text-xs text-muted">
                            {met} / {total} capabilities
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {CAPABILITY_ORDER.map((key) => (
                    <tr key={key}>
                      <td className="label-muted border-b border-border px-6 py-4">{CAPABILITY_LABELS[key]}</td>
                      {providers.map((p) => (
                        <td key={p.slug} className="border-b border-border px-6 py-4">
                          {p.capabilities[key] ? (
                            <CheckIcon className="h-4 w-4 text-success" />
                          ) : (
                            <DashIcon className="h-4 w-4 text-muted" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <ShortlistTray />
    </>
  );
}

function ViewButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded px-3.5 py-1.5 text-sm font-medium transition-colors",
        active ? "bg-accent text-ink" : "text-muted hover:text-ink"
      )}
    >
      {children}
    </button>
  );
}
