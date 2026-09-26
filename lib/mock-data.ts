// ─────────────────────────────────────────────────────────────────────────
// PROVIDER DATA — real companies, public information only.
//
// Every fact below (headquarters, confirmed office locations, service
// tags, notable facts) is drawn from that provider's own public website
// or a public news source, cited in `sources`. Nothing about SLAs,
// pricing, contract terms, or exact compliance posture is invented —
// where a provider does not publicly state something (e.g. exact
// incident-response SLA, pricing model, EU/EEA-only data residency),
// it is simply left out rather than guessed. Overview text is our own
// paraphrase of what each provider publishes about itself, not the
// provider's official marketing copy, and was last checked in
// September 2026. Provider information may change — always confirm
// directly with the provider before relying on any of this.
//
// The BUYER scenario below (organisation/environment/requirements) is
// the prototype's fictional demonstration persona and is not a real
// company.
// ─────────────────────────────────────────────────────────────────────────

export const organisation = {
  country: "Finland",
  industry: "Manufacturing",
  employees: "250–500 employees",
};

export const environment = ["Microsoft 365", "Azure", "Microsoft Defender"];

export const coreRequirements = [
  "24/7 monitoring (SOC)",
  "Incident response",
  "Threat hunting",
  "Threat intelligence",
];

export const operational = [
  "EU/EEA data handling",
  "English-language service",
  "Implementation within 3 months",
];

export const briefChips = [
  "Finland · Manufacturing",
  "250–500 employees",
  "MDR",
  "24/7 monitoring",
  "EU/EEA data",
  "English",
];

export const briefSections = [
  { title: "Organisation", rows: [organisation.country, organisation.industry, organisation.employees] },
  { title: "Environment", rows: environment },
  { title: "Core requirements", rows: coreRequirements },
  { title: "Operational", rows: operational },
];

export const providerResponseFields = [
  "SOC location(s)",
  "Monitoring model (24/7 confirmation)",
  "Supported technologies / SIEM-EDR stack",
  "Incident response SLA",
  "Included IR hours or scope",
  "Onboarding process & timeline",
  "Data residency / hosting location",
  "Monthly recurring price",
  "Setup cost",
  "Minimum contract term",
  "Relevant references",
];

export const proposalRequestFields = [
  "Service model",
  "SOC location(s)",
  "Technology compatibility",
  "Incident response SLA",
  "Data residency",
  "Implementation timeline",
  "Monthly price",
  "Setup cost",
  "Contract term",
  "References",
];

// ─────────────────────────────────────────────────────────────────────────
// Confirmed service tags — only assigned where a provider's own public
// materials explicitly describe that capability. Absence of a tag means
// "not publicly confirmed by our research," not "the provider doesn't
// offer this."
// ─────────────────────────────────────────────────────────────────────────

export type ServiceTag =
  | "mdr"
  | "soc"
  | "incidentResponse"
  | "threatHunting"
  | "threatIntelligence"
  | "otSecurity"
  | "penetrationTesting"
  | "microsoftSentinel"
  | "advisoryCompliance";

export const SERVICE_TAG_ORDER: ServiceTag[] = [
  "mdr",
  "soc",
  "incidentResponse",
  "threatHunting",
  "threatIntelligence",
  "otSecurity",
  "penetrationTesting",
  "microsoftSentinel",
  "advisoryCompliance",
];

export const SERVICE_TAG_LABELS: Record<ServiceTag, string> = {
  mdr: "Managed Detection & Response",
  soc: "SOC / continuous monitoring",
  incidentResponse: "Incident response",
  threatHunting: "Threat hunting",
  threatIntelligence: "Threat intelligence",
  otSecurity: "OT / industrial security",
  penetrationTesting: "Penetration testing / red team",
  microsoftSentinel: "Microsoft Sentinel integration",
  advisoryCompliance: "Advisory & compliance",
};

export type Provider = {
  slug: string;
  name: string;
  hqCity?: string;
  hqCountry: string;
  otherCountries: string[];
  founded?: string;
  parentOrg?: string;
  tagline: string;
  overview: string;
  confirmedServices: ServiceTag[];
  notableFacts: string[];
  languagesConfirmed: string[];
  sources: { label: string; url: string }[];
};

export const providers: Provider[] = [
  {
    slug: "withsecure",
    name: "WithSecure",
    hqCity: "Helsinki",
    hqCountry: "Finland",
    otherCountries: [],
    parentOrg: undefined,
    tagline: "Finnish cybersecurity vendor, formerly F-Secure Business",
    overview:
      "WithSecure is a Finnish cybersecurity company (the former enterprise business of F-Secure, renamed WithSecure in 2022) that publishes a dedicated Managed Detection & Response product and a broader \"Co-Security\" managed-services offering. We could not confirm presence outside Finland in this research pass — WithSecure operates internationally, but we did not verify specific country offices, so none are listed here.",
    confirmedServices: ["mdr"],
    notableFacts: ["Formerly F-Secure's business security division, renamed WithSecure in 2022."],
    languagesConfirmed: ["English", "Finnish"],
    sources: [
      { label: "WithSecure — Managed Detection and Response", url: "https://www.withsecure.com/fi/solutions/managed-services/withsecure-managed-detection-and-response" },
      { label: "WithSecure — Co-Security Services", url: "https://www.withsecure.com/en/for-business/platform/co-security/" },
      { label: "WithSecure — About us", url: "https://www.withsecure.com/en/about-us/" },
    ],
  },
  {
    slug: "truesec",
    name: "Truesec",
    hqCity: "Stockholm",
    hqCountry: "Sweden",
    otherCountries: ["Denmark", "Finland", "Germany"],
    tagline: "Nordic MDR and incident-response specialist",
    overview:
      "Truesec describes its MDR offering as including 24/7 expert SOC monitoring, an incident-response team, custom detection logic across EDR/SIEM/NDR, threat intelligence, and dedicated OT (industrial systems) protection. Truesec states it operates offices in Stockholm and Malmö (Sweden), Copenhagen and Aarhus (Denmark), Espoo (Finland), and Munich (Germany), and describes itself as operating \"the largest and most advanced Security Operations Center (SOC) in the Nordic region.\"",
    confirmedServices: ["mdr", "soc", "incidentResponse", "threatIntelligence", "otSecurity"],
    notableFacts: ['Self-described as operating "the largest and most advanced SOC in the Nordic region."'],
    languagesConfirmed: ["English", "Swedish", "Danish", "Finnish", "German"],
    sources: [{ label: "Truesec — Managed Detection and Response", url: "https://www.truesec.com/service/managed-detection-and-response" }],
  },
  {
    slug: "mnemonic",
    name: "mnemonic",
    hqCity: "Oslo",
    hqCountry: "Norway",
    otherCountries: ["Sweden", "Denmark", "Netherlands", "United Kingdom"],
    founded: "2000",
    tagline: "Independent Norwegian SOC and incident-response provider",
    overview:
      "mnemonic is an independent Norwegian security company founded in 2000, with offices in Oslo, Stavanger and Trondheim (Norway), Kista (Sweden), Copenhagen (Denmark), Utrecht (Netherlands) and London (UK). It publicly describes its services as 24/7 threat detection and response, threat intelligence, incident response and ethical hacking (MDR sold under the \"Argus Managed Defence\" name), and states it serves as an advisor to Europol.",
    confirmedServices: ["mdr", "soc", "incidentResponse", "threatIntelligence", "penetrationTesting"],
    notableFacts: ["Advisor to Europol.", "Approx. 450 employees (as of 2025)."],
    languagesConfirmed: ["English"],
    sources: [
      { label: "mnemonic — Managed Detection and Response", url: "https://www.mnemonic.io/solutions/managed-detection-and-response/" },
      { label: "Wikipedia — mnemonic (company)", url: "https://en.wikipedia.org/wiki/Mnemonic_(company)" },
    ],
  },
  {
    slug: "csis-security-group",
    name: "CSIS Security Group",
    hqCity: "Copenhagen",
    hqCountry: "Denmark",
    otherCountries: [],
    parentOrg: "Part of Allurity, a Nordic cybersecurity group (acquired 2024)",
    tagline: "Danish threat-intelligence-led MDR provider",
    overview:
      "CSIS Security Group is a Danish cybersecurity company, now part of the Nordic cybersecurity group Allurity. CSIS publicly describes tiered MDR packages (Base / Pro / Elite) including 24/7 monitoring and response, incident response, threat hunting (Pro and Elite tiers), integrated and enhanced threat intelligence, and \"150+ custom rules for Microsoft Sentinel\" built by its research and incident-response teams. We did not find explicit confirmation of office locations beyond Denmark on CSIS's own site — its parent group, Allurity, operates more broadly across the Nordics, but that is a fact about the parent group, not confirmed for CSIS specifically.",
    confirmedServices: ["mdr", "soc", "incidentResponse", "threatHunting", "threatIntelligence", "microsoftSentinel"],
    notableFacts: ["Acquired by Allurity in 2024.", "Publishes 150+ custom detection rules for Microsoft Sentinel."],
    languagesConfirmed: ["English"],
    sources: [
      { label: "CSIS — Managed Detection and Response", url: "https://www.csis.com/managed-detection-and-response/" },
      { label: "Allurity acquires CSIS Security Group", url: "https://www.csis.com/whats-new/csis-s-latest-news-and-announcements/allurity-acquires-csis-security-group" },
    ],
  },
  {
    slug: "sentor",
    name: "Sentor",
    hqCity: "Stockholm",
    hqCountry: "Sweden",
    otherCountries: [],
    parentOrg: "Part of Accenture (acquired 2021)",
    tagline: "Swedish SOC and offensive/defensive security specialist",
    overview:
      "Sentor is a Swedish security services company, acquired by Accenture in 2021 to strengthen its Nordic cyber-defense practice. Sentor publicly organises its services into four areas: advisory (risk assessments, compliance, ISMS, privacy, employee training), detection & response (RedSOC red-team operations and BlueSOC 24/7 monitoring, managed SIEM, network monitoring and EDR), security testing (it describes itself as running \"Sweden's largest group of ethical hackers,\" covering red-team, penetration, application and cloud testing, code review and social engineering assessments), and support services (CISO-as-a-service, data-protection management, forensics and incident response). It lists offices in Stockholm, Gothenburg and Malmö, all in Sweden.",
    confirmedServices: ["soc", "incidentResponse", "penetrationTesting", "advisoryCompliance"],
    notableFacts: ['Describes itself as running "Sweden\'s largest group of ethical hackers."'],
    languagesConfirmed: ["English", "Swedish"],
    sources: [
      { label: "Sentor — Our services", url: "https://www.sentorsecurity.com/services/" },
      { label: "Accenture acquires Sentor", url: "https://newsroom.accenture.com/news/2021/accenture-acquires-sentor-enhancing-its-cyber-defense-and-managed-security-services-in-sweden" },
    ],
  },
  {
    slug: "dnv-cyber-nixu",
    name: "DNV Cyber (formerly Nixu)",
    hqCity: "Espoo",
    hqCountry: "Finland",
    otherCountries: ["Norway", "Sweden", "Denmark", "Netherlands", "Germany", "Romania", "United Kingdom", "France", "Greece", "Singapore"],
    parentOrg: "Part of DNV, following a 2024 merger with Applied Risk",
    tagline: "Finnish-founded SOC/consulting brand, now part of DNV Cyber",
    overview:
      "Nixu is a Finnish security company that served customers \"in Finland and across the Nordics\" for three decades before merging with Applied Risk and DNV in 2024 to form DNV Cyber, described as \"the fastest growing European cybersecurity services business.\" DNV Cyber's materials reference a security operations centre (SOC) in Espoo (near Helsinki) and describe IT and OT (industrial) cybersecurity solutions delivered across a wide European and international footprint. Because this is now a merged, larger entity, the country list below reflects DNV Cyber's broader footprint rather than Nixu's historical Finland/Nordics-only presence.",
    confirmedServices: ["soc", "otSecurity"],
    notableFacts: ["Formed in 2024 from the merger of Nixu, Applied Risk and DNV."],
    languagesConfirmed: ["English"],
    sources: [{ label: "DNV — Nixu is DNV Cyber", url: "https://www.dnv.com/cyber/about/nixu/" }],
  },
  {
    slug: "advania",
    name: "Advania",
    hqCity: "Reykjavik",
    hqCountry: "Iceland",
    otherCountries: ["Sweden", "Norway", "Denmark", "Finland", "United Kingdom"],
    tagline: "Pan-Nordic IT services group with a dedicated Cyber Defense Center",
    overview:
      "Advania is a Nordic IT services group headquartered in Reykjavik, Iceland, with subsidiaries across Sweden, Norway, Denmark, Finland and the UK. Its Norwegian SOC offering, the Advania Cyber Defense Center (ACDC), publicly describes round-the-clock (\"døgnkontinuerlig\") monitoring of infrastructure and services, an integrated incident-response team (IRT), intelligence assessments and periodic reviews, and mentions collaboration with Norwegian national security authorities. We reviewed Advania's Norway-specific SOC page; capability details may vary by country subsidiary.",
    confirmedServices: ["soc", "incidentResponse"],
    notableFacts: ["Publicly references collaboration with Norwegian national security authorities on its Norway SOC page."],
    languagesConfirmed: ["English", "Norwegian"],
    sources: [{ label: "Advania Norway — SOC", url: "https://www.advania.no/produkter-tjenester/it-sikkerhet/soc" }],
  },
  {
    slug: "orange-cyberdefense",
    name: "Orange Cyberdefense",
    hqCity: "Paris (La Défense)",
    hqCountry: "France",
    otherCountries: ["Sweden", "Norway", "Denmark"],
    parentOrg: "Business unit of the Orange Group",
    tagline: "Pan-European MSSP with dedicated Nordic operations",
    overview:
      "Orange Cyberdefense is the cybersecurity business unit of the French Orange Group, headquartered in Paris. It publicly states it runs 18 SOCs worldwide with sales and services support in 160 countries, and maintains dedicated country pages/operations for Sweden, Norway and Denmark specifically. Its services are organised around five stages: anticipate (threat intelligence, dark-web surveillance), identify (assessments, ethical hacking), protect (network/app/data/endpoint/identity security), detect (managed threat detection, 24/7 \"CyberSOC\" service) and respond (incident response, forensics, cyber resilience).",
    confirmedServices: ["mdr", "soc", "incidentResponse", "threatIntelligence", "penetrationTesting"],
    notableFacts: ["States it operates 18 SOCs worldwide with support in 160 countries."],
    languagesConfirmed: ["English"],
    sources: [{ label: "Orange Cyberdefense — Global", url: "https://www.orangecyberdefense.com/global/" }],
  },
  {
    slug: "netsecurity",
    name: "Netsecurity",
    hqCountry: "Norway",
    otherCountries: [],
    tagline: "Norway-focused MDR and OT-security provider",
    overview:
      "Netsecurity is a Norwegian cybersecurity company serving private companies, municipalities and critical-infrastructure operators. It publicly lists Managed Detection & Response (for private sector, municipal sector and OT/industrial systems), penetration testing, backup and patch-management services, incident response (which it states is approved by the Norwegian National Security Authority, NSM), strategic advisory, OT/industrial cybersecurity, and red-team services. It also states it is Palo Alto Networks' largest partner in Norway and the first European partner to reach Palo Alto's Diamond Partner tier.",
    confirmedServices: ["mdr", "otSecurity", "penetrationTesting", "incidentResponse"],
    notableFacts: [
      "States its incident response is approved by the Norwegian National Security Authority (NSM).",
      "Palo Alto Networks' largest partner in Norway; first European Diamond Partner.",
    ],
    languagesConfirmed: ["English", "Norwegian"],
    sources: [{ label: "Netsecurity — home", url: "https://www.netsecurity.no/en/" }],
  },
  {
    slug: "telia-security",
    name: "Telia Security",
    hqCity: "Stockholm",
    hqCountry: "Sweden",
    otherCountries: [],
    parentOrg: "Telia Company (publicly listed Nordic telecom operator)",
    tagline: "Security Operations Center run by the Nordic telecom incumbent",
    overview:
      "Telia Security is offered by Telia Company, the publicly listed Nordic telecom operator headquartered in Stockholm/Solna, Sweden. Telia publishes a \"Security Operations Center\" enterprise service as part of its broader offering; the public page describing it is JavaScript-rendered and we were unable to confirm specific service inclusions, so this listing is intentionally limited to what we could verify: that the service exists and who runs it. Confirm scope and delivery details directly with Telia.",
    confirmedServices: ["soc"],
    notableFacts: ["Telia Company is a publicly listed telecom operator, not a security-only specialist."],
    languagesConfirmed: ["English"],
    sources: [
      { label: "Telia — Security Operations Center", url: "https://www.teliacompany.com/en/solutions/global/security-operations-center" },
      { label: "Wikipedia — Telia Company", url: "https://en.wikipedia.org/wiki/Telia_Company" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// What we show on the homepage's "services" grid is derived directly from
// real, sourced provider data above — not a separate, hand-authored list.
// Every tag in SERVICE_TAG_ORDER already has at least one confirmed real
// provider behind it, so all 9 are shown; none are placeholders. Only MDR
// has a dedicated guided questionnaire today — the rest are comparable
// through the provider directory's service-tag filter.
// ─────────────────────────────────────────────────────────────────────────

export type ServiceOffering = {
  tag: ServiceTag;
  guidedQuestionnaire: boolean;
  providerCount: number;
};

export const serviceOfferings: ServiceOffering[] = SERVICE_TAG_ORDER.map((tag) => ({
  tag,
  guidedQuestionnaire: tag === "mdr",
  providerCount: providers.filter((p) => p.confirmedServices.includes(tag)).length,
}));

export function getProvider(slug: string): Provider | undefined {
  return providers.find((p) => p.slug === slug);
}

export function confirmedServiceCount(provider: Provider): { met: number; total: number } {
  return { met: provider.confirmedServices.length, total: SERVICE_TAG_ORDER.length };
}

export function allPresenceCountries(provider: Provider): string[] {
  return Array.from(new Set([provider.hqCountry, ...provider.otherCountries]));
}

// Filter option sets for the provider directory. "presenceCountries" is a
// soft, informational filter (see conversation note: country of operation
// is not treated as a pass/fail security-capability requirement).
export const filterOptions = {
  hqCountry: Array.from(new Set(providers.map((p) => p.hqCountry))),
  presenceCountry: Array.from(new Set(providers.flatMap((p) => allPresenceCountries(p)))).sort(),
  serviceTag: SERVICE_TAG_ORDER,
};
