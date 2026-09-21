"use client";

import clsx from "clsx";
import { CheckIcon } from "./Icons";

export default function PillToggle({
  label,
  selected,
  onClick,
  disabled,
}: {
  label: string;
  selected: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors",
        selected
          ? "border-accent bg-accent-soft text-ink"
          : "border-border-strong bg-white text-ink hover:bg-bg-light",
        disabled && "cursor-default border-border bg-bg-light text-muted opacity-70 hover:bg-bg-light"
      )}
    >
      {selected && !disabled && <CheckIcon className="h-4 w-4 text-accent" />}
      {label}
    </button>
  );
}
