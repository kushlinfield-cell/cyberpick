# CyberPick — cybersecurity procurement prototype

A high-fidelity prototype for **CyberPick**, a platform that helps Nordic
buyers (CIO / CISO / CTO / IT Manager, 50–1,000 employee companies) turn
security requirements into a structured procurement brief and compare
**real** MDR/SOC providers — using only information those providers have
published about themselves.

```
Homepage → Questionnaire (6 steps) → Requirements (brief) → Matches
  (cards / compare, shortlist) → Provider profile → Request proposals
```

Providers can also be browsed directly via a filterable **Provider
directory**, independent of the questionnaire flow.

## Real provider data — and its limits

The 10 providers in this prototype (WithSecure, Truesec, mnemonic, CSIS
Security Group, Sentor, DNV Cyber/Nixu, Advania, Orange Cyberdefense,
Netsecurity and Telia Security) are real companies. Every fact shown about
them — headquarters, confirmed office locations, confirmed service areas,
notable facts — is drawn from that provider's own public website or a
public news source, cited with a link on their profile page.

Nothing is invented. Where a provider does not publicly state something
(exact SLAs, pricing, contract terms, or precise data-residency
guarantees), it is simply left out rather than guessed — the profile pages
say so explicitly. A provider's "confirmed services" badge (e.g. "5 of 9")
means we found public evidence for that many of the 9 tracked service
categories; it is not a claim that the provider lacks the others, and it
is not a fit assessment against your specific requirements. All of this
was last checked in September 2026 and may have changed — always confirm
directly with the provider.

The buyer scenario (the Finnish 250–500 employee manufacturing company
used throughout the questionnaire/requirements/matches flow) is the
prototype's fictional demonstration persona, not a real company.

One deliberate design choice worth calling out: **country of operation is
treated as informational, not a security-capability requirement.** It's a
"Presence" filter in the provider directory, separate from the confirmed
service-area comparison — because where a provider is legally
headquartered doesn't by itself predict SOC quality, data handling, or
language support, all of which are shown as their own dimensions.

## Localization

The site is available in 5 languages: English (`en`), Finnish (`fi`),
Danish (`da`), Norwegian Bokmål (`no`) and Swedish (`sv`). Every page lives
under a locale-prefixed route (e.g. `/en/matches`, `/sv/matches`); visiting
`/` redirects to `/en`. A language switcher lives in the top nav.

All interface copy (navigation, buttons, headings, questionnaire labels,
disclaimers) is translated per locale in `lib/i18n/dictionaries/`. Provider
facts (company overviews, notable facts) are presented in English only —
they're sourced, paraphrased summaries of English-language source
material, and translating them further risked introducing inaccuracy we
couldn't verify. Generic service-category labels (e.g. "Incident
response", "Threat hunting") are translated; specific product/service
names (e.g. "Managed Detection & Response", "Microsoft Sentinel") are kept
in their original form, consistent with how the industry uses them across
the Nordics.

**The translations were produced by this assistant, not reviewed by a
native speaker of each language.** They should read as solid, professional
Nordic business language, but if this ever ships for real, have a native
speaker in each market review the copy in `lib/i18n/dictionaries/` before
launch.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it will redirect to `/en`. Switch languages
with the selector in the top-right of the nav, or go directly to a locale,
e.g. http://localhost:3000/sv.

Click "Find providers" to start the guided journey, or "Providers" in the
nav to browse the directory directly.

To verify a production build:

```bash
npm run build
npm run start
```

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS, with a small design-token system (`tailwind.config.ts`)
- A locale-prefixed route structure (`app/[locale]/...`) with a
  `proxy.ts` (Next's routing-middleware convention) redirecting unprefixed
  paths to the default locale
- A lightweight, hand-rolled i18n layer (`lib/i18n/`) — a typed
  `Dictionary` interface, one file per locale, and an `I18nProvider`
  React context (`context/I18nContext.tsx`) exposing a `useI18n()` hook.
  No external i18n library; this is a small enough surface that a
  dependency wasn't worth it.
- Self-hosted Inter (UI/body) and IBM Plex Mono (data/labels/technical
  tokens) via `@fontsource`, so the page renders correctly with no
  external font CDN dependency
- React Context + `localStorage` for shortlist / request-sent state — no
  backend, no database, by design (this is a visual prototype)

## Structure

```
app/
  [locale]/
    layout.tsx                — fonts, metadata, ShortlistProvider, I18nProvider
    page.tsx                   — homepage
    questionnaire/page.tsx      — 6-step guided requirements wizard
    requirements/page.tsx       — generated procurement brief
    matches/page.tsx            — matched providers: cards / compare table + shortlist
    providers/page.tsx          — provider directory (filterable, standalone)
    providers/[slug]/page.tsx   — provider profile (real data + sources)
    request-proposals/page.tsx  — standardized proposal request + mocked send
  globals.css
proxy.ts                        — locale-prefix routing

components/  — Button, SiteNav (incl. language switcher), ProcurementStepper,
               BriefSummaryBar, ShortlistTray, ProviderCard, CapabilityList,
               PillToggle, Icons

context/
  ShortlistContext.tsx — shortlist selection + request-sent state, localStorage-backed
  I18nContext.tsx      — current locale + dictionary, via useI18n()

lib/
  mock-data.ts — organisation/environment/requirements (fictional buyer),
                 the 10 real providers with sourced facts, service-tag model,
                 provider-directory filter options
  i18n/
    config.ts            — locales list, default locale
    dictionary.ts         — the Dictionary TypeScript interface
    dictionaries/*.ts     — en / fi / da / no / sv translations
    dictionaries/index.ts — getDictionary() + a {token} interpolation helper

tailwind.config.ts — design tokens (color, type, spacing, radius, shadow)
```

## Design system

- **Colors** — dark navy hero/footer surfaces (`#07111F` / `#0B1728`),
  light neutral working surfaces (`#F5F7FA`), a single desaturated cyan
  accent (`#19B8E6`) used sparingly for actions and emphasis, and a
  restrained teal/green (`#1F8A70`) reserved for confirmation states.
- **Typography** — Inter for UI and body text; IBM Plex Mono used sparingly
  for data labels, capability chips, and technical tokens.
- **Matching model** — providers are shown against a fixed, named set of 9
  service-area tags (e.g. "Managed Detection & Response," "Incident
  response") and marked "confirmed" only where their own public materials
  say so — never an opaque percentage, AI-style match score, or a claim
  that an unconfirmed tag means "no."
- Deliberately avoided: shield/lock iconography, neon green, glassmorphism,
  glowing gradients, large rounded "pill" cards, fake logos/testimonials/
  stats, and any score without a visible, sourced basis.

## Product direction this build reflects

The requirements → matches → shortlist → request-proposals sequence exists
to make CyberPick read as a procurement workflow, not a provider directory:
every shortlisted provider is asked to respond to the same requirement set,
so responses stay genuinely comparable. The provider directory exists
alongside this as a lighter-weight way to browse and filter real providers
without going through the full questionnaire.

Deferred for now: real proposal intake/inbox, accounts and saved sessions,
real RFQ editing, and native-speaker review of the translated copy.
