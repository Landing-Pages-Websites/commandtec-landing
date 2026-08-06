interface CredentialChipProps {
  children: string;
  onDark?: boolean;
}

// Typographic credential pill — never a seal or emblem.
export function CredentialChip({
  children,
  onDark = false,
}: CredentialChipProps): React.ReactElement {
  const style = onDark
    ? "border-[var(--color-accent-dark)]/55 text-[var(--color-accent-dark)]"
    : "border-[var(--color-primary)] text-[var(--color-primary)]";
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border-[1.5px] px-3.5 py-1.5 text-[13px] font-semibold uppercase tracking-[0.06em] ${style}`}
    >
      {children}
    </span>
  );
}
