"use client";

const institutions = [
  { abbr: "NDRF", full: "National Disaster Response Force", icon: "🛡️" },
  { abbr: "IMD", full: "India Meteorological Department", icon: "🌦️" },
  { abbr: "MoS", full: "Ministry of Shipping", icon: "⚓" },
  { abbr: "AICTE", full: "All India Council for Technical Education", icon: "🎓" },
  { abbr: "NIC", full: "National Informatics Centre", icon: "💻" },
  { abbr: "ISRO", full: "Space Technology Partner", icon: "🛰️" },
  { abbr: "NIDM", full: "National Institute of Disaster Mgmt.", icon: "📊" },
  { abbr: "NHIDCL", full: "National Highways & Infrastructure Dev.", icon: "🛤️" }
];

export function TrustedInstitutions() {
  return (
    <section id="institutions" className="relative overflow-hidden py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
            Institutional Ecosystem
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Trusted by Institutions. Built for Impact.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Designed for institutions and mission-critical workflows involving national disaster management, infrastructure protection, and strategic intelligence.
          </p>
        </div>

        {/* Institution grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {institutions.map((inst) => (
            <div
              key={inst.abbr}
              className="group relative flex flex-col items-center gap-3 rounded-xl border border-border/60 bg-card px-4 py-6 text-center transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/[0.04] hover:shadow-[0_8px_24px_rgb(59_130_246/0.1)]"
            >
              <span className="text-2xl" role="img" aria-label={inst.full}>{inst.icon}</span>
              <div>
                <p className="text-base font-bold tracking-tight text-foreground group-hover:text-blue-500 transition-colors">
                  {inst.abbr}
                </p>
                <p className="mt-0.5 text-[0.62rem] leading-tight text-muted-foreground">
                  {inst.full}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Extended ecosystem note */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-5 py-2">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            <p className="text-xs text-muted-foreground">
              Also designed for workflows spanning SAIL, JNPT, AAI, DGCA, MHA, MoRTH, DRDO, and more
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
