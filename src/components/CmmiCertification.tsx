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
      imageSrc="/images/process-build.jpg"
      imageAlt="Two colleagues at a standing desk reviewing a process-flow diagram on a laptop by a bright office window, building a CMMI process system together."
    />
  );
}
