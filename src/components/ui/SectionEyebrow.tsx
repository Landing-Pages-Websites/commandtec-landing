interface SectionEyebrowProps {
  children: string;
  onDark?: boolean;
  className?: string;
}

// Small uppercase label preceded by a 24px accent rule.
export function SectionEyebrow({
  children,
  onDark = false,
  className = "",
}: SectionEyebrowProps): React.ReactElement {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        aria-hidden="true"
        className="h-[2px] w-6 shrink-0 rounded-full bg-[var(--color-accent)]"
      />
      <span
        className={`eyebrow ${onDark ? "text-[var(--color-accent-dark)]" : ""}`}
      >
        {children}
      </span>
    </div>
  );
}
