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
      imageSrc="/images/iso-standards.jpg"
      imageAlt="Line diagram of three overlapping ruled document outlines joined by a fine path to a circular checkmark, on deep green."
    />
  );
}
