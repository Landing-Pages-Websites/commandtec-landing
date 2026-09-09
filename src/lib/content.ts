// Site-wide content + config for CommandTec — ISO & CMMI certification consulting LP.
// Single source of truth for copy, phone, form options, and tracking IDs.

export const PHONE = "877-797-3414";
export const PHONE_HREF = "tel:8777973414";

export const CTA = {
  primary: "Request your free consultation",
  contactAnchor: "#contact",
  phoneLabel: PHONE,
};

export const BRAND = {
  company: "CommandTec",
  legal: "CommandTec, LLC",
  tagline: "Empower Your Process",
  signature: "Building Trust. Delivering Excellence.",
  yearsInBusiness: 20,
  clients: "260+",
};

export const CURRENT_YEAR = new Date().getFullYear();

// ─── Hero ───────────────────────────────────────────────────────────────────
export const HERO = {
  eyebrow: "ISO & CMMI certification consulting",
  h1Lead: "ISO & CMMI Certification",
  h1Accent: "Consulting",
  subhead:
    "From gap analysis and documentation to staff training and independent audit or appraisal coordination, CommandTec manages your consulting engagement from start to finish.",
  proofLine: "20 years · 260+ commercial clients · never lost a client",
  chips: [
    "US-based practitioners",
    "Cradle-to-grave delivery",
    "Nationwide, remote",
    "Competitive pricing",
  ],
};

// ─── Credentials bar ──────────────────────────────────────────────────────────
export const CREDENTIALS = {
  eyebrow: "We hold the certifications we consult on",
  intro:
    "We don't just consult on certification. We've achieved it ourselves, so we know what it takes to get you there. We do the same work we prepare you for.",
  chips: [
    "ISO 9001:2015",
    "ISO/IEC 27001:2022",
    "ISO/IEC 20000-1:2018",
    "CMMI SVC ML3",
    "CMMC 2.0 Level 2 (C3PAO-assessed)",
  ],
  stats: [
    { value: "20", label: "Years in business" },
    { value: "260+", label: "Commercial clients served" },
    { value: "Never", label: "Lost a client" },
    { value: "US-based", label: "Practitioners, in-house" },
  ],
};

// ─── Why certification (Problem + Agitate) ────────────────────────────────────
export const WHY_CERT = {
  eyebrow: "Why the standard is on the table",
  headline: "Meet customer requirements. Prepare for your next audit.",
  lead: "Manufacturers and businesses across industries need ISO certification to meet customer and supplier requirements. Organizations also pursue CMMI to improve processes and meet contract requirements. Government contractors are one of the audiences CommandTec supports.",
  points: [
    {
      icon: "clock",
      title: "Plan around your deadline",
      body: "We scope the documentation, operating evidence, training, and audit or appraisal coordination around your customer, bid, or recertification deadline.",
    },
    {
      icon: "alert",
      title: "Keep your team focused on the business",
      body: "Our practitioners build the documentation and processes with your team, identify gaps, and prepare you for the independent audit or appraisal.",
    },
    {
      icon: "target",
      title: "Build a system your business can use",
      body: "The work supports your day-to-day operations as well as certification readiness, whether you serve commercial customers, government customers, or both.",
    },
  ],
};

// ─── ISO block ────────────────────────────────────────────────────────────────
export const ISO = {
  eyebrow: "ISO certification consulting",
  headline: "ISO management systems, prepared and coordinated to audit.",
  lead: "We build the management system the standard requires, run the internal audits that prove it works, and coordinate the certification audit with an independent registrar. We prepare and manage the process — we are not the registrar.",
  standards: [
    {
      code: "ISO 9001:2015",
      name: "Quality Management Systems",
      summary:
        "The quality standard most contracts name first — we take your QMS from documentation to a clean certification audit.",
      bullets: [
        "Quality manual, procedures, and records",
        "Operations mapped to every clause",
        "Internal audit and management review",
      ],
    },
    {
      code: "ISO/IEC 27001:2022",
      name: "Information Security Management Systems",
      summary:
        "The information-security standard for organizations handling sensitive data or proving security maturity to a customer.",
      bullets: [
        "ISMS scope and risk assessment",
        "Statement of Applicability, 2022 controls",
        "Internal audits confirm controls operate",
      ],
    },
    {
      code: "ISO/IEC 20000-1:2018",
      name: "IT Service Management Systems",
      summary:
        "The service-management standard for organizations delivering IT services under contract.",
      bullets: [
        "Service delivery and incident processes",
        "Change management and continual improvement",
        "Ready for initial and surveillance audits",
      ],
    },
    {
      code: "ISO 14001",
      name: "Environmental Management Systems",
      summary:
        "The environmental-management standard for organizations proving environmental responsibility to win or keep work.",
      bullets: [
        "Environmental aspects and impacts identified",
        "Objectives, documentation, and evidence",
        "Audit coordinated with an independent registrar",
      ],
    },
  ],
  extra: {
    icon: "refresh",
    title: "Recertification & surveillance-audit support",
    body: "Already certified? We keep your system current, close prior findings, and carry you through recertification so a hard-won credential never quietly expires.",
  },
};

// ─── CMMI block ───────────────────────────────────────────────────────────────
export const CMMI = {
  eyebrow: "CMMI appraisal consulting",
  headline: "CMMI maturity across every domain, built as a real process system — then appraised.",
  lead: "An appraiser measures; we build. CommandTec prepares organizations for CMMI maturity across every domain and level — building the process system, proving it out with your teams, then coordinating the formal appraisal with a certified lead appraiser. We're all practitioners.",
  standards: [
    {
      code: "CMMI — all domains",
      name: "All maturity levels",
      summary:
        "We scope to the domain and level your contract requires, close the gap, and coordinate the appraisal.",
      bullets: [
        "Development, Services, and other domains",
        "Assessed against the practice areas",
        "Teams trained to run it for real",
      ],
    },
    {
      code: "CMMI AIM",
      name: "AI capability at scale",
      summary:
        "The integrated model for improving AI capability across teams. We build the governance and processes, then coordinate the appraisal with a CMMI Partner.",
      bullets: [
        "Integrated AI governance and processes",
        "Standardized practices across teams",
        "Prepared for a Partner appraisal",
      ],
    },
    {
      code: "CMMI high maturity (ML4 / ML5)",
      name: "Quantitative process management",
      summary:
        "High maturity is earned through data — statistical management at ML4, optimization and defect prevention at ML5.",
      bullets: [
        "Measurement framework and baselines",
        "Process-performance models built",
        "Teams prepared to defend them",
      ],
    },
    {
      code: "Multi-model coverage",
      name: "Combined appraisals",
      summary:
        "Operate across more than one CMMI domain? We build one combined process system so you prepare once and appraise once.",
      bullets: [
        "One system for every applicable domain",
        "Prepare once, not twice",
        "Coordinated with a lead appraiser",
      ],
    },
  ],
  extra: {
    icon: "badge",
    title: "Led by a Certified CMMI Professional",
    body: "Founder and CEO Lori Diaz holds the CCP credential. We never promise a maturity-level outcome — we prepare you until the process system is real, then coordinate the formal appraisal.",
  },
};

// ─── How it works (cradle to grave) ──────────────────────────────────────────
export const HOW_IT_WORKS = {
  eyebrow: "Cradle to grave",
  headline: "One engagement, start to finish.",
  lead: "You don't hand off between vendors or assemble the program yourself. We run all six stages while you keep doing the work your business actually does.",
  steps: [
    {
      icon: "chat",
      title: "Free consultation & scoping",
      body: "We identify which standard your opportunity requires — no cost, no obligation.",
    },
    {
      icon: "search",
      title: "Gap analysis",
      body: "We map your operations against every clause or practice area and show exactly what's missing.",
    },
    {
      icon: "file",
      title: "Documentation & process build",
      body: "We develop the documentation, policies, and processes the standard requires — the heavy lifting is ours.",
    },
    {
      icon: "users",
      title: "Staff training",
      body: "We train your team on the requirements and what auditors and appraisers actually look for.",
    },
    {
      icon: "clipboardCheck",
      title: "Internal audit & readiness review",
      body: "We run the internal audit, surface findings while there's time to fix them, and confirm you're ready.",
    },
    {
      icon: "award",
      title: "Third-party audit or formal appraisal",
      body: "We coordinate the audit or appraisal with your registrar or lead appraiser and stand with you throughout.",
    },
  ],
};

// ─── Why CommandTec ───────────────────────────────────────────────────────────
export const WHY_US = {
  eyebrow: "Why CommandTec",
  headline: "Practitioners who hold the standards they prepare you for.",
  lead: "We're not resellers or template shops. CommandTec is certified to ISO 9001:2015, ISO/IEC 27001:2022, and ISO/IEC 20000-1:2018, appraised at CMMI SVC ML3, and assessed at CMMC 2.0 Level 2 — we consult on the standards we live under.",
  points: [
    {
      icon: "shield",
      title: "260+ clients, never lost one",
      body: "Over 20 years we've carried 260+ clients through ISO and CMMI certification and never lost one — a track record, not a guarantee.",
    },
    {
      icon: "users",
      title: "US-based practitioners",
      body: "Every engagement is run by US-based practitioners who've done this work, delivered remotely to all 50 states. Never an offshore queue.",
    },
    {
      icon: "badge",
      title: "Led by a CCP-credentialed founder",
      body: "Founder and CEO Lori Diaz has helped 150+ small businesses reach their quality standards and holds the CCP, CISM, and CEH credentials.",
    },
    {
      icon: "scale",
      title: "Competitive pricing, full service",
      body: "Cradle-to-grave delivery at competitive pricing — one engagement from gap analysis through appraisal, not a stack of change orders.",
    },
  ],
  socioIntro: "Socioeconomic credentials — supporting corroboration:",
  socio: [
    "8(a)",
    "EDWOSB",
    "WOSB",
    "SDVOSB",
    "HUBZone",
    "HIRE Vets Gold Medallion 2025",
  ],
};

// ─── Testimonials (six, verbatim; sourced from the client services page) ─────
export const TESTIMONIALS = {
  eyebrow: "In our clients' words",
  headline: "The outcomes speak plainly.",
  quotes: [
    {
      quote:
        "Many kudos to Lori and team. We are very grateful for their expertise and support in getting us thoroughly prepared for our audit. Lori was very responsive to our questions and concerns. She was very helpful in our company achieving ISO 9001:2015 certification.",
      name: "Dee T.",
      role: "QA Manager, SoftDev, Inc.",
      place: "Raleigh, North Carolina",
    },
    {
      quote:
        "In my experience with CommandTec, they set the example for outstanding service and exceeded expectations during our ISO 9001 Surveillance Audit. Great company and staff.",
      name: "Lee L.",
      role: "Information System Security Officer (ISSO), Silotech Group, Inc.",
      place: "San Antonio, Texas",
    },
    {
      quote:
        "Our expectations were met above and beyond! CommandTec was quick, knowledgeable, and a true pleasure to work with!",
      name: "Kelsey B.",
      role: "GRSi",
      place: "Frederick, Maryland",
    },
    {
      quote:
        "The CommandTec team was responsive and provided clarifications on the appraisal process, which allowed us to plan and prepare for the appraisal-related upcoming activities.",
      name: "Lisa C.",
      role: "Precise Software Solutions, Inc.",
      place: "",
    },
    {
      quote: "Amazing organization to work with.",
      name: "Christopher H.",
      role: "V3Gate",
      place: "",
    },
    {
      quote: "All around a great experience.",
      name: "Kathy D.",
      role: "Neil Hoosier & Associates",
      place: "",
    },
  ],
};

// ─── Offers ───────────────────────────────────────────────────────────────────
export const OFFERS = {
  eyebrow: "How to start",
  headline: "Two ways to begin with CommandTec.",
  items: [
    {
      icon: "chat",
      title: "Free consultation for first-time clients",
      body: "New to CommandTec? Your first consultation is free — we identify the standard your opportunity requires and scope the engagement, with no obligation.",
    },
    {
      icon: "badge",
      title: "First-engagement discount for service-disabled veteran-owned companies",
      body: "Service-disabled veteran-owned companies receive a discount on their first engagement. As an SDVOSB and 2025 HIRE Vets Gold Medallion recipient, standing with veteran-owned businesses is who we are.",
    },
  ],
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const FAQ = [
  {
    q: "Which standard does my business need?",
    a: "The right standard depends on your business, customer requirements, and certification goals. In your free consultation, we review those requirements and identify the standard and scope of consulting support.",
  },
  {
    q: "How long does certification take?",
    a: "It depends on the standard, your organization, and how much preparation is already complete. We map a realistic schedule against your customer, bid, or recertification deadline during the consultation.",
  },
  {
    q: "What does it cost?",
    a: "Cost is driven by scope — which standard, which level, and how much system you already have. Rather than quote a sticker that won't fit, we scope the engagement in the free consultation and give you real numbers.",
  },
  {
    q: "Do you guarantee certification?",
    a: "No consultant honestly can — the registrar or appraiser decides independently. What we can say: we prepare you until you're genuinely ready, and in 20+ years and 260+ clients we've never lost a client.",
  },
  {
    q: "Who performs the actual audit or appraisal?",
    a: "An independent third party — a registrar for ISO, a certified lead appraiser for CMMI. CommandTec is not the registrar or appraisal authority; we prepare you and coordinate the audit or appraisal with that party.",
  },
  {
    q: "Do you work with companies outside Huntsville?",
    a: "Yes. CommandTec is a national practice delivered remotely across all 50 states. We're headquartered in Huntsville, Alabama, with offices in San Antonio, Texas and Puerto Rico — your location doesn't change how we work.",
  },
];

// ─── Final CTA / contact ──────────────────────────────────────────────────────
export const CONTACT = {
  eyebrow: "Start your certification",
  headline: "Get the standard handled — end to end.",
  lead: "Tell us your certification goal and we will scope the consulting support your business needs. Your first consultation is free.",
};

// ─── Footer ───────────────────────────────────────────────────────────────────
export const FOOTER = {
  tagline: BRAND.tagline,
  practice:
    "A national practice, delivered remotely across all 50 states. Headquartered in Huntsville, Alabama, with additional offices in San Antonio, Texas and Puerto Rico.",
  disclaimer:
    "CommandTec prepares organizations for certification and coordinates the audit or appraisal with an independent registrar or certified lead appraiser. CommandTec is not a registrar, certifying body, or appraisal authority.",
};

// ─── Form select options (wired exactly to the FormCard contract) ─────────────
export const CERTIFICATION_OPTIONS = ["ISO", "CMMI", "Not sure yet"];
export const BUDGET_OPTIONS = [
  "Under $15,000",
  "$15,000 - $28,000",
  "$28,000 or more",
];

// ─── Mega tracking — real CommandTec IDs. NO Meta Pixel (customer declined). ──
export const TRACKING = {
  siteKey: "5wy9d5dgo29fm8ix",
  siteId: "1cbb187b-20ca-495c-85fe-f30bdc5e9abe",
  gtmId: "GTM-WSCKDRKJ",
};

// Mega submission API expects snake_case keys: customer_id, site_id, source_provider
export const FORM = {
  customerId: "4c26713e-28f9-4dab-97e7-886952a4891b",
  siteId: "1cbb187b-20ca-495c-85fe-f30bdc5e9abe",
  sourceProvider: "commandtec-landing",
};
