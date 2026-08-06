import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { CtaRow } from "@/components/ui/CtaRow";
import { WHY_CERT } from "@/lib/content";

export function WhyCertification(): React.ReactElement {
  return (
    <section
      id="why-certification"
      className="arc-motif relative overflow-hidden bg-[var(--color-deep)] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionEyebrow onDark>{WHY_CERT.eyebrow}</SectionEyebrow>
              <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.04] text-white">
                {WHY_CERT.headline}
              </h2>
              <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/80">
                {WHY_CERT.lead}
              </p>
            </Reveal>

            <div className="mt-10 space-y-7">
              {WHY_CERT.points.map((point, i) => (
                <Reveal key={point.title} delay={i * 60}>
                  <div className="flex gap-4">
                    <FeatureIcon name={point.icon} onDark />
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white">
                        {point.title}
                      </h3>
                      <p className="mt-1.5 max-w-lg text-[15px] leading-relaxed text-white/75">
                        {point.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={80}>
              <CtaRow onDark className="mt-10" />
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pt-4">
            <Reveal delay={120}>
              <div className="relative overflow-hidden rounded-xl ring-1 ring-white/10">
                <Image
                  src="/images/contract-scoring.jpg"
                  alt="Line diagram of a shield beside four horizontal contract-scoring bars of differing lengths, each ending in an open circle."
                  width={720}
                  height={720}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
