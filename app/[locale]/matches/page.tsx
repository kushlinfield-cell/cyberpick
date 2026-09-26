"use client";

import { useState } from "react";
import clsx from "clsx";
import SiteNav from "@/components/SiteNav";
import ProcurementStepper from "@/components/ProcurementStepper";
import BriefSummaryBar from "@/components/BriefSummaryBar";
import ShortlistTray from "@/components/ShortlistTray";
import ProviderCard from "@/components/ProviderCard";
import { providers, SERVICE_TAG_ORDER, confirmedServiceCount } from "@/lib/mock-data";
import { CheckIcon, DashIcon } from "@/components/Icons";
import { useI18n } from "@/context/I18nContext";

export default function MatchesPage() {
  const [view, setView] = useState<"cards" | "compare">("cards");
  const { dict, fmt } = useI18n();
  const m = dict.matches;

  return (
    <>
      <SiteNav />
      <ProcurementStepper />
      <BriefSummaryBar />

      <main className="bg-bg-light px-6 py-14">
        <div className="mx-auto flex max-w-content flex-col gap-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-2">
              <span className="label-muted">{m.eyebrow}</span>
              <h1 className="text-3xl font-semibold tracking-tight text-ink">{m.title}</h1>
              <p className="max-w-xl text-[15px] text-muted">{m.subcopy}</p>
            </div>

            <div className="flex shrink-0 gap-1 rounded-md border border-border-strong bg-white p-1">
              <ViewButton active={view === "cards"} onClick={() => setView("cards")}>
                {m.cardsBtn}
              </ViewButton>
              <ViewButton active={view === "compare"} onClick={() => setView("compare")}>
                {m.compareBtn}
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
              <table className="w-full min-w-[960px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="label-muted border-b border-border px-6 py-4 text-left font-medium">
                      {m.tableServiceHeader}
                    </th>
                    {providers.map((p) => {
                      const { met, total } = confirmedServiceCount(p);
                      return (
                        <th key={p.slug} className="border-b border-border px-6 py-4 text-left">
                          <div className="text-sm font-semibold text-ink">{p.name}</div>
                          <div className="font-mono text-xs text-muted">{fmt(m.confirmedFmt, { met, total })}</div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {SERVICE_TAG_ORDER.map((tag) => (
                    <tr key={tag}>
                      <td className="label-muted border-b border-border px-6 py-4">{dict.serviceTags[tag]}</td>
                      {providers.map((p) => (
                        <td key={p.slug} className="border-b border-border px-6 py-4">
                          {p.confirmedServices.includes(tag) ? (
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

          <p className="text-xs text-muted">{m.localPresenceNote}</p>
        </div>
      </main>

      <ShortlistTray />
    </>
  );
}

function ViewButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
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
