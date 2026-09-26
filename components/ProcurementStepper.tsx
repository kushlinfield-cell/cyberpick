"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { CheckIcon } from "./Icons";
import { useI18n } from "@/context/I18nContext";
import { locales } from "@/lib/i18n/config";

function stripLocale(pathname: string): string {
  const parts = pathname.split("/");
  if (parts.length > 1 && (locales as readonly string[]).includes(parts[1])) {
    return "/" + parts.slice(2).join("/");
  }
  return pathname;
}

function pathToStepIndex(pathname: string): number {
  if (pathname.startsWith("/requirements")) return 0;
  if (pathname.startsWith("/matches") || pathname.startsWith("/providers/")) return 1;
  if (pathname.startsWith("/request-proposals")) return 2;
  return -1;
}

export default function ProcurementStepper() {
  const { locale, dict } = useI18n();
  const pathname = usePathname() || "";
  const rest = stripLocale(pathname);
  const activeIndex = pathToStepIndex(rest);

  if (activeIndex === -1) return null;

  const steps = [
    { key: "requirements", label: dict.common.stepRequirements, href: `/${locale}/requirements` },
    { key: "matches", label: dict.common.stepMatches, href: `/${locale}/matches` },
    { key: "proposals", label: dict.common.stepProposals, href: `/${locale}/request-proposals` },
  ];

  return (
    <nav aria-label="Procurement progress" className="border-b border-border bg-bg-light">
      <div className="mx-auto flex max-w-content items-center gap-1 overflow-x-auto px-6 py-3">
        {steps.map((step, index) => {
          const isComplete = index < activeIndex;
          const isActive = index === activeIndex;
          return (
            <div key={step.key} className="flex shrink-0 items-center gap-1">
              {index > 0 && <span className="mx-2 h-px w-6 bg-border-strong" aria-hidden="true" />}
              <Link
                href={step.href}
                className={clsx(
                  "flex items-center gap-1.5 whitespace-nowrap rounded px-2 py-1 font-mono text-xs font-medium uppercase tracking-[0.04em]",
                  isActive && "text-accent",
                  isComplete && "text-ink",
                  !isActive && !isComplete && "text-muted"
                )}
              >
                {isComplete ? <CheckIcon className="h-3.5 w-3.5" /> : <span>{index + 1}</span>}
                {step.label}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
