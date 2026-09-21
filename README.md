# CyberPick — cybersecurity procurement prototype

A high-fidelity visual prototype for **CyberPick**, a platform that helps
Nordic buyers (CIO / CISO / CTO / IT Manager, 50–1,000 employee companies)
turn security requirements into a structured procurement brief, match with
suitable MDR/SOC providers, and request comparable proposals — instead of
starting from 30 browser tabs and cold outreach.

This is a prototype: all providers, capability data, and proposals are
fictional and clearly labelled as demonstration data. There is no backend,
database, authentication, or real API integration by design.

```
Homepage → Questionnaire (6 steps) → Requirements (brief) → Matches
  (cards / compare, shortlist) → Provider profile → Request proposals
```

Providers can also be browsed directly via a filterable **Provider
directory**, independent of the questionnaire flow.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 and click "Find providers" to start the guided
journey, or "Explore providers" / the "Providers" nav link to browse the
directory directly.

The questionnaire is scripted to a fixed scenario (a 250–500 employee
Finnish manufacturing company on Microsoft 365 / Azure / Defender, needing
24/7 MDR with EU/EEA data residency and English-language support) — your
answers don't change the outcome, but shortlisting and the proposal request
flow are fully interactive and persist across pages (via `localStorage`)
for the length of your session.

To verify a production build:

```bash
npm run build
npm run start
```

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS, with a small design-token system (`tailwind.config.ts`)
- Self-hosted Inter (UI/body) and IBM Plex Mono (data/labels/technical
  tokens) via `@fontsource`, so the page renders correctly with no external
  font CDN dependency
- React Context + `localStorage` for shortlist / request-sent state — no
  backend, no database, by design (this is a visual prototype)

## Structure

```
app/
  layout.tsx                — fonts, metadata, wraps app in ShortlistProvider
  page.tsx                   — homepage
  questionnaire/page.tsx      — 6-step guided requirements wizard
  requirements/page.tsx       — generated procurement brief
  matches/page.tsx            — matched providers: cards / compare table + shortlist
  providers/page.tsx          — provider directory (filterable, standalone)
  providers/[slug]/page.tsx   — normalized provider profile
  request-proposals/page.tsx  — standardized proposal request + mocked send
  globals.css

components/
  Button.tsx              — primary / secondary / ghost variants, renders as <a> or <button>
  SiteNav.tsx              — wordmark + primary nav + CTA
  ProcurementStepper.tsx   — Requirements → Matches → Request proposals progress nav
  BriefSummaryBar.tsx      — persistent requirement chips, shown from Matches onward
  ShortlistTray.tsx        — sticky shortlist summary + "Request proposals" CTA
  ProviderCard.tsx          — match card with capability checklist + shortlist toggle
  CapabilityList.tsx        — reusable Yes/No capability checklist (used on provider profile)
  PillToggle.tsx            — selectable chip used in the questionnaire and filters
  Icons.tsx                 — small inline SVG icon set

context/
  ShortlistContext.tsx — shortlist selection + request-sent state, localStorage-backed

lib/
  mock-data.ts — organisation/environment/requirements, 3 fictional providers,
                 capability model, and provider-directory filter options

tailwind.config.ts — design tokens (color, type, spacing, radius, shadow)
```

## Design system

- **Colors** — dark navy hero/footer surfaces (`#07111F` / `#0B1728`),
  light neutral working surfaces (`#F5F7FA`), a single desaturated cyan
  accent (`#19B8E6`) used sparingly for actions and emphasis, and a
  restrained teal/green (`#1F8A70`) reserved for confirmation states.
- **Typography** — Inter for UI and body text; IBM Plex Mono used sparingly
  for data labels, capability chips, and technical tokens (SLAs, tech
  stack, filter values) to signal "this is structured data," not for
  general copy.
- **Matching model** — providers are scored against a fixed, named set of
  8 capabilities (e.g. "24/7 SOC," "EU/EEA data handling") and shown as
  "X / 8 required capabilities met," never as an opaque percentage or
  AI-style match score.
- Deliberately avoided: shield/lock iconography, neon green, glassmorphism,
  glowing gradients, large rounded "pill" cards, fake logos/testimonials/
  stats, and any score without a visible, factual basis.

## Product direction this build reflects

The requirements → matches → shortlist → request-proposals sequence exists
to make CyberPick read as a procurement workflow, not a provider directory:
every shortlisted provider is asked to respond to the same requirement set,
so responses stay genuinely comparable. The provider directory exists
alongside this as a lighter-weight way to browse and filter providers
without going through the full questionnaire.

Deferred for now: real proposal intake/inbox, accounts and saved sessions,
real RFQ editing, and any real verification/accreditation data — all data
in this prototype is fictional and for demonstration purposes only.
