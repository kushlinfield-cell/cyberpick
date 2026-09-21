import type { Provider } from "@/lib/mock-data";
import { CAPABILITY_ORDER, CAPABILITY_LABELS } from "@/lib/mock-data";
import { CheckIcon, DashIcon } from "./Icons";

export default function CapabilityList({ provider }: { provider: Provider }) {
  return (
    <dl className="flex flex-col border-t border-border">
      {CAPABILITY_ORDER.map((key) => {
        const isMet = provider.capabilities[key];
        return (
          <div
            key={key}
            className="flex items-center justify-between gap-3 border-b border-border py-2.5 text-sm last:border-b-0"
          >
            <span className="text-ink">{CAPABILITY_LABELS[key]}</span>
            {isMet ? (
              <span className="flex items-center gap-1.5 font-mono text-xs text-success">
                <CheckIcon className="h-4 w-4" /> Yes
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
                <DashIcon className="h-4 w-4" /> No
              </span>
            )}
          </div>
        );
      })}
    </dl>
  );
}
