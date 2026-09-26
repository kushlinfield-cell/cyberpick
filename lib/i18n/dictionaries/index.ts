import type { Locale } from "../config";
import type { Dictionary } from "../dictionary";
import { en } from "./en";
import { fi } from "./fi";
import { da } from "./da";
import { no } from "./no";
import { sv } from "./sv";

const dictionaries: Record<Locale, Dictionary> = { en, fi, da, no, sv };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

// Tiny {token} interpolation helper for format strings like "{met} of {total}".
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? `{${key}}`));
}
