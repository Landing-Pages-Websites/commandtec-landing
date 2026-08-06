"use client";

import { useTracking } from "@/hooks/useTracking";
import { QueryParamPersistence } from "@/components/QueryParamPersistence";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Credentials } from "@/components/Credentials";
import { WhyCertification } from "@/components/WhyCertification";
import { IsoCertification } from "@/components/IsoCertification";
import { CmmiCertification } from "@/components/CmmiCertification";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyCommandtec } from "@/components/WhyCommandtec";
import { Testimonials } from "@/components/Testimonials";
import { Offers } from "@/components/Offers";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingCTA } from "@/components/FloatingCTA";
import { TRACKING } from "@/lib/content";

export default function Page(): React.ReactElement {
  useTracking({
    siteKey: TRACKING.siteKey,
    siteId: TRACKING.siteId,
    gtmId: TRACKING.gtmId,
  });

  return (
    <main className="overflow-x-hidden bg-[var(--color-bg)]">
      <QueryParamPersistence />
      <Header />
      <Hero />
      <Credentials />
      <WhyCertification />
      <IsoCertification />
      <CmmiCertification />
      <HowItWorks />
      <WhyCommandtec />
      <Testimonials />
      <Offers />
      <Faq />
      <Contact />
      <SiteFooter />
      <FloatingCTA />
    </main>
  );
}
