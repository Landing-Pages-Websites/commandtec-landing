import type { JSX, SVGProps } from "react";

// Single icon family — lucide-style stroked SVGs (24×24, currentColor).
// Never emoji. Keys map to the `icon` strings used in content.ts.

type IconPaths = JSX.Element;

const PATHS: Record<string, IconPaths> = {
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  alert: (
    <>
      <path d="M10.3 3.6 2.5 17a1.9 1.9 0 0 0 1.7 2.9h15.6a1.9 1.9 0 0 0 1.7-2.9L13.7 3.6a1.9 1.9 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  refresh: (
    <>
      <path d="M21 8a8 8 0 0 0-14.9-2M3 5v4h4" />
      <path d="M3 16a8 8 0 0 0 14.9 2M21 19v-4h-4" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-4 4V5Z" />
      <path d="M8 8h8M8 11.5h5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-3.8-3.8" />
    </>
  ),
  file: (
    <>
      <path d="M6 3h7l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M13 3v5h5M8 13h8M8 17h6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 6.1M17 20a6 6 0 0 0-3-5.2" />
    </>
  ),
  clipboardCheck: (
    <>
      <rect x="8" y="3" width="8" height="4" rx="1" />
      <path d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <path d="m9 14 2 2 4-4" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5.2" />
      <path d="m8.4 13.4-1.6 7.1L12 18l5.2 2.5-1.6-7.1" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.3 2.9 7.5 7 9 4.1-1.5 7-4.7 7-9V6Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  badge: (
    <>
      <path d="M12 2.5 14.4 5l3.4-.4.5 3.4 2.7 2.1-1.6 3 1.6 3-2.7 2.1-.5 3.4-3.4-.4L12 21.5 9.6 19l-3.4.4-.5-3.4L3 13.9l1.6-3L3 7.9l2.7-2.1.5-3.4L9.6 5Z" />
      <path d="m9.5 12 1.8 1.8L15 10" />
    </>
  ),
  scale: (
    <>
      <path d="M12 3v18M7 21h10" />
      <path d="M6 6h12M6 6 3 12a3 3 0 0 0 6 0ZM18 6l-3 6a3 3 0 0 0 6 0Z" />
    </>
  ),
  phone: (
    <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.272.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
  ),
  arrow: <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />,
  check: <path d="m4.5 12.75 6 6 9-13.5" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 4.5v15m7.5-7.5h-15" />,
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: keyof typeof PATHS | string;
}

// Default size class so a caller that omits one can't blow the icon up to the
// SVG's intrinsic size.
const HAS_SIZE = /(?:^|\s)(?:w-|h-|size-)/;

export function Icon({
  name,
  className,
  ...rest
}: IconProps): JSX.Element | null {
  const path = PATHS[name];
  if (!path) return null;
  const sizeCls = className && HAS_SIZE.test(className) ? "" : "w-6 h-6";
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`${sizeCls} ${className ?? ""}`.trim()}
      {...rest}
    >
      {path}
    </svg>
  );
}
