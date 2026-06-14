export interface AppLogoProps {
  size?: number;
  variant?: "mark" | "full";
  className?: string;
}

export function AppLogo({ size = 36, variant = "mark", className = "" }: AppLogoProps) {
  const mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      {/* ── Bold ink-brush C-stroke (open right side, like the original) ── */}
      {/* Main thick sweep — starts top-right, arcs counter-clockwise, ends bottom-right */}
      <path
        d="M78 14
           C 60 2, 24 4, 10 28
           C -2 50, 6 76, 24 90
           C 38 100, 58 100, 72 92"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Slightly offset inner echo — gives the brush the "dual stroke" ink feel */}
      <path
        d="M74 18
           C 58 8, 28 10, 16 32
           C 6 52, 12 74, 28 88"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        opacity="0.22"
      />
      {/* Tapering tail at end of stroke */}
      <path
        d="M72 92 C 78 88, 82 84, 80 80"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />

      {/* ── Wave lines (bottom, inside the C arc) ── */}
      <path
        d="M20 80 C 30 76, 40 83, 52 79 C 62 75, 72 82, 80 78"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.65"
      />
      <path
        d="M16 88 C 28 84, 40 91, 54 87 C 66 83, 76 89, 84 86"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.42"
      />

      {/* ── Lighthouse (centred inside the arc, more prominent) ── */}
      {/* Base */}
      <rect x="44" y="84" width="14" height="3" rx="1.2" fill="currentColor" opacity="0.82" />
      {/* Tower */}
      <path d="M46 64 L46 84 L56 84 L56 64 Z" fill="currentColor" opacity="0.82" />
      {/* Slight taper at top of tower */}
      <path d="M46 64 L47 58 L55 58 L56 64 Z" fill="currentColor" opacity="0.82" />
      {/* Lantern room box */}
      <rect x="45" y="51" width="12" height="8" rx="1.2" fill="currentColor" opacity="0.88" />
      {/* Peaked cap */}
      <polygon points="51,43 44,51 58,51" fill="currentColor" opacity="0.9" />
      {/* Light glint — small bright dot */}
      <circle cx="51" cy="55" r="2" fill="#DC2626" opacity="0.9" />

      {/* ── Rising sun — positioned upper-right, clearly inside arc opening ── */}
      <circle cx="80" cy="30" r="11" fill="#DC2626" />

      {/* ── Ink splatter micro-dots near top of brush stroke ── */}
      <circle cx="88" cy="48" r="1.4" fill="currentColor" opacity="0.3" />
      <circle cx="91" cy="42" r="0.9" fill="currentColor" opacity="0.22" />
      <circle cx="86" cy="56" r="0.7" fill="currentColor" opacity="0.18" />
    </svg>
  );

  if (variant === "mark") {
    return <span className={className}>{mark}</span>;
  }

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      {mark}
      <span className="min-w-0 leading-none">
        <span className="block truncate font-bold tracking-[0.2em] uppercase" style={{ fontSize: "0.8rem" }}>
          PROJECT AEGIS
        </span>
        <span className="block truncate font-semibold tracking-[0.12em] uppercase text-blue-500" style={{ fontSize: "0.58rem" }}>
          BHARAT NERVES PLATFORM
        </span>
      </span>
    </span>
  );
}
