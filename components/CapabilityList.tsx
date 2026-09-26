import type { Provider } from "@/lib/mock-data";
import { SERVICE_TAG_ORDER } from "@/lib/mock-data";
import { CheckIcon, DashIcon } from "./Icons";
import { useI18n } from "@/context/I18nContext";

/**
 * Shows every tracked service tag for a provider, marked as either
 * "confirmed" (the provider's own public materials state it) or
 * "not publicly confirmed" (we found no public statement either way —
 * this is not a claim that the provider lacks the capability).
 */
export default function CapabilityList({ provider }: { provider: Provider }) {
  const { dict } = useI18n();
  return (
    <dl className="flex flex-col border-t border-border">
      {SERVICE_TAG_ORDER.map((tag) => {
        const isConfirmed = provider.confirmedServices.includes(tag);
        return (
          <div
            key={tag}
            className="flex items-center justify-between gap-3 border-b border-border py-2.5 text-sm last:border-b-0"
          >
            <span className="text-ink">{dict.serviceTags[tag]}</span>
            {isConfirmed ? (
              <span className="flex items-center gap-1.5 font-mono text-xs text-success">
                <CheckIcon className="h-4 w-4" /> {dict.common.confirmed}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
                <DashIcon className="h-4 w-4" /> {dict.common.notPubliclyConfirmed}
              </span>
            )}
          </div>
        );
      })}
    </dl>
  );
}
