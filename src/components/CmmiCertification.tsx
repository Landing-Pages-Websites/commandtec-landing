import { StandardsBlock } from "@/components/StandardsBlock";
import { CMMI } from "@/lib/content";

export function CmmiCertification(): React.ReactElement {
  return (
    <StandardsBlock
      id="cmmi-certification"
      eyebrow={CMMI.eyebrow}
      headline={CMMI.headline}
      lead={CMMI.lead}
      standards={CMMI.standards}
      extra={CMMI.extra}
      imageSrc="/images/cmmi-maturity.jpg"
      imageAlt="Line diagram of three concentric circles around a center dot beside an ascending staircase of five bars, on deep green."
    />
  );
}
