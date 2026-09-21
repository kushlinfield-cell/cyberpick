"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { CheckIcon } from "./Icons";

const STEPS = [
  { key: "requirements", label: "Requirements", href: "/requirements" },
  { key: "matches", label: "Matches", href: "/matches" },
  { key: "proposals", label: "Request proposals", href: "/request-proposals" },
] as const;

function pathToStepIndex(pathname: string): number {
  if (pathname.startsWith("/requirements")) return 0;
  if (pathname.startsWith("/matches") || pathname.startsWith("/providers/")) return 1;
  if (pathname.startsWith("/request-proposals")) return 2;
  return -1;
}

export default function ProcurementStepper() {
  const pathname = usePathname();
  const activeIndex = pathToStepIndex(pathname);

  if (activeIndex === -1) return null;

  return (
    <nav aria-label="Procurement progress" className="border-b border-border bg-bg-light">
      <div className="mx-auto flex max-w-content items-center gap-1 px-6 py-3">
        {STEPS.map((step, index) => {
          const isComplete = index < activeIndex;
          const isActive = index === activeIndex;
          return (
            <div key={step.key} className="flex items-center gap-1">
              {index > 0 && <span className="mx-2 h-px w-6 bg-border-strong" aria-hidden="true" />}
              <Link
                href={step.href}
                className={clsx(
                  "flex items-center gap-1.5 rounded px-2 py-1 font-mono text-xs font-medium uppercase tracking-[0.04em]",
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
