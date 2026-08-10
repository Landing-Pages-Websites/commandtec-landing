import { StandardsBlock } from "@/components/StandardsBlock";
import { ISO } from "@/lib/content";

export function IsoCertification(): React.ReactElement {
  return (
    <StandardsBlock
      id="iso-certification"
      eyebrow={ISO.eyebrow}
      headline={ISO.headline}
      lead={ISO.lead}
      standards={ISO.standards}
      extra={ISO.extra}
      imageSrc="/images/audit-readiness.jpg"
      imageAlt="A consultant reviewing a printed procedures document beside an open binder and a laptop in a bright conference room, preparing for a certification audit."
    />
  );
}
