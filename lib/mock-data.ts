// All data in this file is fictional and for demonstration purposes only.
// It represents the prototype's scripted scenario (a Finnish manufacturing
// company, 250–500 employees, evaluating MDR providers).

export const organisation = {
  country: "Finland",
  industry: "Manufacturing",
  employees: "250–500 employees",
};

export const environment = ["Microsoft 365", "Azure", "Microsoft Defender"];

export const coreRequirements = [
  "24/7 monitoring",
  "Threat detection and triage",
  "Incident response",
  "Threat hunting",
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
  "SOC location",
  "Monitoring model",
  "Supported technologies",
  "Incident response SLA",
  "Included IR hours",
  "Onboarding process",
  "Implementation timeline",
  "Monthly recurring price",
  "Setup cost",
  "Minimum contract term",
  "Relevant references",
];

export const proposalRequestFields = [
  "Service model",
  "SOC location",
  "Technology compatibility",
  "Incident response SLA",
  "Implementation",
  "Monthly price",
  "Setup cost",
  "Contract term",
  "References",
];

export type ServiceStatus = "active" | "soon";
export const services: { name: string; status: ServiceStatus }[] = [
  { name: "Managed Detection & Response", status: "active" },
  { name: "SOC Services", status: "soon" },
  { name: "Penetration Testing", status: "soon" },
  { name: "Incident Response", status: "soon" },
  { name: "vCISO", status: "soon" },
  { name: "ISO 27001", status: "soon" },
  { name: "NIS2", status: "soon" },
  { name: "Cloud Security", status: "soon" },
];

export type CapabilityKey =
  | "soc247"
  | "sentinel"
  | "defender"
  | "incidentResponse"
  | "threatHunting"
  | "euEeaData"
  | "englishSupport"
  | "customerFit";

export const CAPABILITY_LABELS: Record<CapabilityKey, string> = {
  soc247: "24/7 SOC",
  sentinel: "Microsoft Sentinel",
  defender: "Microsoft Defender",
  incidentResponse: "Incident response",
  threatHunting: "Threat hunting",
  euEeaData: "EU/EEA data handling",
  englishSupport: "English support",
  customerFit: "Customer-size fit",
};

export const CAPABILITY_ORDER: CapabilityKey[] = [
  "soc247",
  "sentinel",
  "defender",
  "incidentResponse",
  "threatHunting",
  "euEeaData",
  "englishSupport",
  "customerFit",
];

export type Provider = {
  slug: string;
  name: string;
  tagline: string;
  city: string;
  country: string;
  capabilities: Record<CapabilityKey, boolean>;
  overview: string;
  customerFit: string;
  serviceList: string[];
  technology: {
    primary: string;
    supported: string[];
  };
  operations: {
    socLocation: string;
    monitoringModel: string;
    responseSla: string;
    includedIrHours: string;
    reporting: string;
    serviceManager: string;
  };
  languages: string[];
  dataHandling: {
    residency: string;
    hostedIn: string;
    note: string;
  };
  commercial: {
    pricingModel: string;
    setupCost: string;
    minimumTerm: string;
    onboarding: string;
  };
  companySizeFit: string;
  sizeBand: "50–500 employees" | "500–2,000 employees" | "2,000+ employees";
};

export const providers: Provider[] = [
  {
    slug: "northshield-security",
    name: "NorthShield Security",
    tagline: "Nordic-native MDR & SOC",
    city: "Helsinki",
    country: "Finland",
    capabilities: {
      soc247: true,
      sentinel: true,
      defender: true,
      incidentResponse: true,
      threatHunting: true,
      euEeaData: true,
      englishSupport: true,
      customerFit: true,
    },
    overview:
      "NorthShield Security operates a Nordic-based SOC built around Microsoft Defender and Microsoft Sentinel, with a customer base concentrated in Finnish and Swedish mid-market companies. Monitoring, detection and incident response are delivered from Helsinki.",
    customerFit:
      "Built for mid-market companies (roughly 50–1,000 employees) with a Microsoft-centred environment — a close fit for a 250–500 employee manufacturing company running Microsoft 365, Azure and Defender.",
    serviceList: ["Managed Detection & Response", "SOC Services", "Incident Response"],
    technology: {
      primary: "Microsoft Defender XDR, Microsoft Sentinel",
      supported: ["Microsoft 365", "Azure AD / Entra ID", "Microsoft Defender", "Microsoft Sentinel"],
    },
    operations: {
      socLocation: "Helsinki, Finland",
      monitoringModel: "24/7/365, in-house SOC analysts",
      responseSla: "Under 15 minutes, critical severity",
      includedIrHours: "20 hours / month included",
      reporting: "Monthly reporting, named service manager",
      serviceManager: "Named service manager included",
    },
    languages: ["English", "Finnish", "Swedish"],
    dataHandling: {
      residency: "EU / EEA only",
      hostedIn: "Finland, Sweden",
      note: "All customer telemetry and logs are processed and stored within the EU/EEA by default.",
    },
    commercial: {
      pricingModel: "Per-endpoint, monthly — tiered by coverage level",
      setupCost: "One-time onboarding fee, scoped per environment",
      minimumTerm: "12 months",
      onboarding: "Typical onboarding: 4–6 weeks",
    },
    companySizeFit: "50–1,000 employees",
    sizeBand: "50–500 employees",
  },
  {
    slug: "arctic-defense-group",
    name: "Arctic Defense Group",
    tagline: "Pan-Nordic MDR provider",
    city: "Stockholm",
    country: "Sweden",
    capabilities: {
      soc247: true,
      sentinel: false,
      defender: true,
      incidentResponse: true,
      threatHunting: true,
      euEeaData: true,
      englishSupport: true,
      customerFit: true,
    },
    overview:
      "Arctic Defense Group runs a multi-vendor MDR service from Stockholm, covering the broader Nordic region. It supports Microsoft Defender directly but uses its own SIEM/XDR layer rather than Microsoft Sentinel.",
    customerFit:
      "Serves mid-market and larger companies across the Nordics. A workable fit for a 250–500 employee company, though its detection layer is not built natively on Microsoft Sentinel.",
    serviceList: ["Managed Detection & Response", "SOC Services"],
    technology: {
      primary: "Proprietary XDR with Microsoft Defender integration",
      supported: ["Microsoft 365", "Azure AD / Entra ID", "Microsoft Defender", "CrowdStrike"],
    },
    operations: {
      socLocation: "Stockholm, Sweden",
      monitoringModel: "24/7, SOC with on-call escalation tier",
      responseSla: "Under 30 minutes, critical severity",
      includedIrHours: "10 hours / month included",
      reporting: "Monthly reporting",
      serviceManager: "Named service manager on enterprise tier only",
    },
    languages: ["English", "Swedish"],
    dataHandling: {
      residency: "EU / EEA only",
      hostedIn: "Sweden",
      note: "Data is hosted in Sweden by default across all service tiers.",
    },
    commercial: {
      pricingModel: "Flat monthly retainer, tiered by employee count",
      setupCost: "One-time onboarding fee",
      minimumTerm: "12 months",
      onboarding: "Typical onboarding: 3–5 weeks",
    },
    companySizeFit: "100–2,000 employees",
    sizeBand: "500–2,000 employees",
  },
  {
    slug: "sentinel-harbor",
    name: "Sentinel Harbor",
    tagline: "Enterprise MDR & SOC",
    city: "Copenhagen",
    country: "Denmark",
    capabilities: {
      soc247: true,
      sentinel: true,
      defender: true,
      incidentResponse: true,
      threatHunting: true,
      euEeaData: false,
      englishSupport: true,
      customerFit: false,
    },
    overview:
      "Sentinel Harbor is a larger, enterprise-oriented MDR and SOC provider headquartered in Copenhagen, with a follow-the-sun operating model. EU/EEA-only data handling is available as an add-on rather than the default configuration.",
    customerFit:
      "Built primarily for larger enterprise estates. Workable for a 250–500 employee company, but pricing, onboarding and minimum commitments are scaled for bigger organisations.",
    serviceList: ["Managed Detection & Response", "SOC Services", "Incident Response"],
    technology: {
      primary: "Microsoft Sentinel, Microsoft Defender XDR",
      supported: ["Microsoft 365", "Azure AD / Entra ID", "Microsoft Defender", "Microsoft Sentinel", "AWS"],
    },
    operations: {
      socLocation: "Copenhagen, Denmark (follow-the-sun)",
      monitoringModel: "24/7, global SOC handoff model",
      responseSla: "Under 20 minutes, critical severity",
      includedIrHours: "15 hours / month included",
      reporting: "Monthly reporting, named service manager",
      serviceManager: "Named service manager included",
    },
    languages: ["English"],
    dataHandling: {
      residency: "EU/EEA available as an add-on, not default",
      hostedIn: "Primary hosting outside EU/EEA; EU/EEA add-on available",
      note: "Standard service does not guarantee EU/EEA-only handling — confirm this explicitly if required.",
    },
    commercial: {
      pricingModel: "Custom enterprise quote",
      setupCost: "Scoped per engagement, typically higher for smaller estates",
      minimumTerm: "24 months",
      onboarding: "Typical onboarding: 6–10 weeks",
    },
    companySizeFit: "500–5,000+ employees",
    sizeBand: "2,000+ employees",
  },
];

export function getProvider(slug: string): Provider | undefined {
  return providers.find((p) => p.slug === slug);
}

export function capabilityScore(provider: Provider): { met: number; total: number } {
  const total = CAPABILITY_ORDER.length;
  const met = CAPABILITY_ORDER.filter((k) => provider.capabilities[k]).length;
  return { met, total };
}

// Filter option sets for the provider directory
export const filterOptions = {
  country: Array.from(new Set(providers.map((p) => p.country))),
  service: ["Managed Detection & Response"],
  companySize: ["50–500 employees", "500–2,000 employees", "2,000+ employees"],
  technology: ["Microsoft 365", "Azure", "Microsoft Defender", "Microsoft Sentinel", "CrowdStrike", "AWS"],
  socLocation: Array.from(new Set(providers.map((p) => `${p.city}, ${p.country}`))),
  language: Array.from(new Set(providers.flatMap((p) => p.languages))),
};
