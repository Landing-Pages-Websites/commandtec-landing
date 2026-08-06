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
  h1Lead: "ISO and CMMI certification,",
  h1Accent: "run end to end.",
  subhead:
    "A contract or a prime's flow-down clause named a standard you don't hold yet. We take it from start to finish — developing the documentation, policies, and processes, training your team on audit requirements, and coordinating the audit or appraisal. US-based practitioners, cradle to grave.",
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
    "Our Quality Management System is certified by the International Organization for Standardization (ISO) 9001:2015. We do the work we prepare you for.",
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
  headline: "The certification is the price of admission to the contract.",
  lead: "ISO and CMMI certifications are often required to compete for and be awarded point-based contracts — IDIQs, MATOCs, and BPAs — and to satisfy the flow-down requirements a prime pushes down to its subcontractors. Without the credential, you can't bid, or you bid and score short.",
  points: [
    {
      icon: "clock",
      title: "The clock is the standard's, not a salesperson's",
      body: "An ISO management system needs months of operating evidence before an audit can happen. A CMMI appraisal has to be scheduled with a certified lead appraiser well in advance. The only real deadline is your own bid date or recertification window — and it is usually closer than the standard allows for.",
    },
    {
      icon: "alert",
      title: "The DIY path is where bids get missed",
      body: "Teams try to write the documentation themselves between their day jobs. Months disappear, an audit fails on a gap nobody caught, or the bid window closes before the certificate is in hand. The standard is unforgiving of guesswork.",
    },
    {
      icon: "target",
      title: "Certification makes you competitive, not just compliant",
      body: "We help organizations get ready to do business with the government and become more competitive for IDIQs and multiple-award vehicles. The certificate is the entry ticket; a real management system is what keeps you winning re-competes.",
    },
  ],
};

// ─── ISO block ────────────────────────────────────────────────────────────────
export const ISO = {
  eyebrow: "ISO certification consulting",
  headline: "ISO management systems, prepared and coordinated to audit.",
  lead: "We build the management system the standard requires, run the internal audits that prove it works, and coordinate the certification audit with an independent registrar. CommandTec prepares you and manages the process — the registrar performs the audit and issues the certificate. We are not the registrar.",
  standards: [
    {
      code: "ISO 9001:2015",
      name: "Quality Management Systems",
      body: "The quality standard most contracts name first. We develop your quality manual, procedures, and records, map your existing operations to the clauses, and generate the operating evidence an auditor expects to see. Then we run a full internal audit and management review so nothing is a surprise on audit day. Typical need: any organization whose customers or solicitations require a certified QMS. We support both first-time certification and ongoing compliance.",
    },
    {
      code: "ISO/IEC 27001:2022",
      name: "Information Security Management Systems",
      body: "The information-security standard for organizations that handle sensitive data or must prove security maturity to a customer. We define the ISMS scope, run the risk assessment and treatment plan, build the Statement of Applicability against the current 2022 control set, and conduct internal audits to confirm the controls actually operate. We take you to certification readiness and coordinate the certification audit.",
    },
    {
      code: "ISO/IEC 20000-1:2018",
      name: "IT Service Management Systems",
      body: "The service-management standard for organizations delivering IT services under contract. We build the service management system — the processes for service delivery, incident and change management, and continual improvement — and prepare you for both initial certification and the surveillance audits that follow. Existing certificate holders use us to keep the system audit-ready year over year.",
    },
    {
      code: "ISO 14001",
      name: "Environmental Management Systems",
      body: "The environmental-management standard for organizations that need to demonstrate environmental responsibility to win or keep work. We establish the environmental management system, identify aspects and impacts, set objectives, and prepare the documentation and evidence for certification. As with every ISO engagement, we coordinate the audit with an independent registrar rather than perform it ourselves.",
    },
  ],
  extra: {
    icon: "refresh",
    title: "Recertification & surveillance-audit support",
    body: "Already certified? Certificates lapse and surveillance audits recur. We keep your management system current, close findings from prior audits, and carry you through recertification so a credential you fought for never quietly expires.",
  },
};

// ─── CMMI block ───────────────────────────────────────────────────────────────
export const CMMI = {
  eyebrow: "CMMI appraisal consulting",
  headline: "CMMI maturity, built as a real process system — then appraised.",
  lead: "An appraiser measures. We build. CommandTec develops the process system that earns the maturity level, proves it out with your teams, and then coordinates the formal appraisal with a certified lead appraiser. We're all practitioners — the people preparing you have run these engagements, not just read the model.",
  standards: [
    {
      code: "CMMI for Development (DEV)",
      name: "All maturity levels",
      body: "For organizations that build software or systems and must demonstrate development maturity to win or keep contracts. We assess where you are against the DEV practice areas, build the processes and artifacts that close the gap, and train your engineers to run them for real — because an appraisal team looks for lived practice, not shelfware. We prepare you for the level your opportunity requires and coordinate the appraisal.",
    },
    {
      code: "CMMI for Services (SVC)",
      name: "All maturity levels",
      body: "For organizations delivering services under contract. We build the service-establishment and delivery processes the SVC model expects and ready your teams for appraisal. CommandTec itself is appraised at CMMI SVC Maturity Level 3 — this is a model we operate under, not one we only advise on. That practitioner footing is the difference between a binder and a working system.",
    },
    {
      code: "CMMI high maturity (ML4 / ML5)",
      name: "Quantitative process management",
      body: "High maturity is a different discipline: statistical and quantitative management of your processes at ML4, and process optimization and defect prevention at ML5. We help you stand up the measurement framework, baselines, and process-performance models that high-maturity appraisals demand, and prepare your teams to defend them. High maturity is earned through data — we help you build the data.",
    },
    {
      code: "Multi-model DEV-SVC",
      name: "Combined appraisals",
      body: "Many organizations do both development and services under the same roof and need coverage across both. We scope and build a combined process system that satisfies DEV and SVC together, so you prepare once and appraise once rather than running two disconnected programs. We coordinate the multi-model appraisal with a certified lead appraiser.",
    },
  ],
  extra: {
    icon: "badge",
    title: "Led by a Certified CMMI Professional",
    body: "Lori Diaz, our founder and CEO, holds the CCP (Certified CMMI Professional) credential. We never promise a specific maturity-level outcome — no honest consultant can. We prepare you until the process system is real and defensible, then coordinate the formal appraisal with a certified lead appraiser.",
  },
};

// ─── How it works (cradle to grave) ──────────────────────────────────────────
export const HOW_IT_WORKS = {
  eyebrow: "Cradle to grave",
  headline: "One engagement, start to finish.",
  lead: "You don't hand off between vendors and you don't assemble the program yourself. We run all six stages — you keep doing the work your business actually does.",
  steps: [
    {
      icon: "chat",
      title: "Free consultation & scoping",
      body: "We start by identifying which standard your opportunity actually requires — the solicitation or flow-down clause usually names it, and if it doesn't, we work it out with you. No cost, no obligation.",
    },
    {
      icon: "search",
      title: "Gap analysis",
      body: "We assess your current operations against every clause or practice area of the target standard and give you an honest map of what exists, what's missing, and what has to change.",
    },
    {
      icon: "file",
      title: "Documentation & process build",
      body: "We develop the documentation, policies, and processes the standard requires — and improve efficiency while we're in there. This is the heavy lifting, and it is ours to carry.",
    },
    {
      icon: "users",
      title: "Staff training",
      body: "We train your organization on the requirements and on what auditors and appraisers actually look for, so your people can run the system and speak to it with confidence on the day.",
    },
    {
      icon: "clipboardCheck",
      title: "Internal audit & readiness review",
      body: "We run the internal audit and a full readiness review, surface findings while there's still time to fix them, and confirm you are genuinely ready before anyone external arrives.",
    },
    {
      icon: "award",
      title: "Third-party audit or formal appraisal",
      body: "We coordinate the certification audit or the formal appraisal with your registrar or certified lead appraiser and stand with you through it. They assess and certify; we make sure you're prepared for it.",
    },
  ],
};

// ─── Why CommandTec ───────────────────────────────────────────────────────────
export const WHY_US = {
  eyebrow: "Why CommandTec",
  headline: "Practitioners who hold the standards they prepare you for.",
  lead: "We are not resellers or template shops. CommandTec is certified to ISO 9001:2015, ISO/IEC 27001:2022, and ISO/IEC 20000-1:2018, appraised at CMMI SVC ML3, and assessed at CMMC 2.0 Level 2. We consult on the standards we live under.",
  points: [
    {
      icon: "shield",
      title: "260+ clients, never lost one",
      body: "Over 20 years we have supported more than 260 commercial clients through ISO and CMMI certification, and we have never lost a client. That is the proof we stand on — not a guarantee, a track record.",
    },
    {
      icon: "users",
      title: "US-based practitioners",
      body: "Every engagement is run by US-based practitioners who have done this work, delivered remotely to organizations in all 50 states. You are never handed to an offshore queue or a junior generalist.",
    },
    {
      icon: "badge",
      title: "Led by a CCP-credentialed founder",
      body: "Founder and CEO Lori Diaz has personally helped over 150 small businesses achieve their quality standards and holds the CCP (Certified CMMI Professional), CISM, and CEH credentials. The expertise at the top is real and hands-on.",
    },
    {
      icon: "scale",
      title: "Competitive pricing, full service",
      body: "Cradle-to-grave delivery at competitive pricing — one engagement covering gap analysis through appraisal, not a stack of change orders. You know what you're getting and who is doing it.",
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
      body: "New to CommandTec? Your first consultation is free. We identify the standard your opportunity requires, scope the engagement honestly, and give you a clear path forward — with no cost and no obligation to proceed.",
    },
    {
      icon: "badge",
      title: "First-engagement discount for service-disabled veteran-owned companies",
      body: "Service-disabled veteran-owned companies receive a discount on their first engagement with us. As an SDVOSB ourselves and a 2025 HIRE Vets Gold Medallion recipient, standing with veteran-owned businesses is who we are, not a promotion.",
    },
  ],
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const FAQ = [
  {
    q: "Which standard does my contract require?",
    a: "Usually the solicitation or the prime's flow-down clause names it directly. If it doesn't, that's exactly what the free consultation is for — we read the requirement with you and identify the standard and level your opportunity actually calls for before you commit to anything.",
  },
  {
    q: "How long does certification take?",
    a: "It depends on the standard and the size of your organization. ISO management systems need a period of operating evidence before an audit can take place, and CMMI appraisals must be scheduled with a certified lead appraiser in advance. We can't quote a single timeline honestly — but in the consultation we'll map a realistic schedule against your actual bid or recertification date.",
  },
  {
    q: "What does it cost?",
    a: "Cost is driven by scope: which standard, which maturity level, the size and complexity of your organization, and how much of a management system you already have in place. Rather than quote a sticker that won't fit your situation, we scope the engagement in the free consultation and give you real numbers for your organization.",
  },
  {
    q: "Do you guarantee certification?",
    a: "No consultant can honestly guarantee a certification or a specific maturity level — the registrar or appraiser makes that determination independently. What we can tell you is that we prepare you until you are genuinely ready, and in over 20 years and 260+ clients we have never lost a client.",
  },
  {
    q: "Who performs the actual audit or appraisal?",
    a: "An independent third party — a registrar for ISO certification, or a certified lead appraiser for CMMI. CommandTec is not the registrar, auditor, or appraisal authority. We prepare your organization and coordinate the audit or appraisal with that independent party.",
  },
  {
    q: "Do you work with companies outside Huntsville?",
    a: "Yes. CommandTec is a national practice delivered remotely to organizations across all 50 states. Our headquarters is in Huntsville, Alabama, with additional offices in San Antonio, Texas and Puerto Rico, but where you are located does not change how we work with you.",
  },
];

// ─── Final CTA / contact ──────────────────────────────────────────────────────
export const CONTACT = {
  eyebrow: "Start your certification",
  headline: "Get the standard handled — end to end.",
  lead: "Tell us which certification your opportunity requires and we'll take it from there. 20 years · 260+ clients · never lost a client. Your first consultation is free.",
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
