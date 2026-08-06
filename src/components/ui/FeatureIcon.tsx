import { Icon } from "@/components/icons";

interface FeatureIconProps {
  name: string;
  onDark?: boolean;
  className?: string;
}

// Outline icon drawn inside a filled circle — the client's own creative motif.
export function FeatureIcon({
  name,
  onDark = false,
  className = "",
}: FeatureIconProps): React.ReactElement {
  const circle = onDark
    ? "bg-white/[0.06] ring-1 ring-white/10"
    : "bg-[var(--color-primary)]";
  const stroke = onDark
    ? "text-[var(--color-accent-dark)]"
    : "text-white";
  return (
    <span
      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${circle} ${className}`}
    >
      <Icon name={name} className={`h-6 w-6 ${stroke}`} strokeWidth={1.75} />
    </span>
  );
}
