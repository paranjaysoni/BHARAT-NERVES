import Link from "next/link";

const scenarios = [
  {
    name: "Odisha Cyclone Fani",
    type: "Tropical Cyclone",
    risk: "CRITICAL",
    riskColor: "bg-red-500/20 text-red-400 border-red-500/30",
    gradient: "from-slate-900 via-blue-950 to-cyan-950",
    accent: "bg-cyan-500",
    metrics: { affected: "12.4M", economic: "₹14,200 Cr", recovery: "67%" },
    desc: "Category 5 landfall simulation with cascading power grid and supply chain disruption modeling."
  },
  {
    name: "California Wildfire",
    type: "Wildfire",
    risk: "HIGH",
    riskColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    gradient: "from-slate-900 via-orange-950 to-red-950",
    accent: "bg-orange-500",
    metrics: { affected: "3.1M", economic: "$8.6B", recovery: "42%" },
    desc: "Multi-vector wildfire propagation with real-time evacuation routing and air quality impact analysis."
  },
  {
    name: "Tokyo Earthquake M7.3",
    type: "Seismic Event",
    risk: "SEVERE",
    riskColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    gradient: "from-slate-900 via-purple-950 to-slate-900",
    accent: "bg-purple-500",
    metrics: { affected: "8.9M", economic: "¥22T", recovery: "31%" },
    desc: "Urban seismic event with port and logistics corridor disruption ripple analysis across Asia-Pacific."
  },
  {
    name: "Rotterdam Port Blockage",
    type: "Logistics Disruption",
    risk: "MODERATE",
    riskColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    gradient: "from-slate-900 via-teal-950 to-slate-900",
    accent: "bg-teal-400",
    metrics: { affected: "42 Nations", economic: "$1.2B/day", recovery: "89%" },
    desc: "Critical port closure scenario modeling trade rerouting, inventory drawdowns, and price spike propagation."
  }
];

export function ScenarioShowcase() {
  return (
    <section id="scenarios" className="py-20 lg:py-28 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left text */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
              Scenario Simulation Engine
            </p>
            <h2 className="mb-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Model Any Crisis. <br />
              <span className="text-blue-500">Plan Every Response.</span>
            </h2>
            <p className="mb-8 text-base leading-relaxed text-muted-foreground">
              Aegis simulates hundreds of crisis scenarios — from cyclone landfalls on India&apos;s eastern coast to global supply chain shocks — delivering precise impact maps, cascading failure trees, and actionable playbooks for decision-makers.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/scenario-simulator"
                className="btn btn-primary h-11 px-6 text-sm"
              >
                Explore Scenarios
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            {/* Feature list */}
            <ul className="mt-8 space-y-3">
              {[
                "Multi-hazard cascade modeling",
                "Economic impact quantification",
                "Real-time agent-driven recommendations",
                "Historical event replay & comparison"
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-500">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: scenario cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {scenarios.map((s) => (
              <div
                key={s.name}
                className={`group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br ${s.gradient} p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-[0_16px_32px_rgb(0_0_0/0.25)]`}
              >
                {/* Accent line */}
                <div className={`absolute inset-x-0 top-0 h-0.5 ${s.accent} opacity-70`} />

                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <p className="text-xs text-slate-400">{s.type}</p>
                    <h3 className="mt-0.5 text-sm font-semibold text-white">{s.name}</h3>
                  </div>
                  <span className={`rounded-full border px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide ${s.riskColor}`}>
                    {s.risk}
                  </span>
                </div>

                <p className="mb-4 text-xs leading-relaxed text-slate-400">{s.desc}</p>

                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-white/5 px-2 py-2 text-center">
                    <p className="text-[0.65rem] text-slate-500">Affected</p>
                    <p className="text-xs font-bold text-white">{s.metrics.affected}</p>
                  </div>
                  <div className="rounded-lg bg-white/5 px-2 py-2 text-center">
                    <p className="text-[0.65rem] text-slate-500">Impact</p>
                    <p className="text-xs font-bold text-white">{s.metrics.economic}</p>
                  </div>
                  <div className="rounded-lg bg-white/5 px-2 py-2 text-center">
                    <p className="text-[0.65rem] text-slate-500">Recovery</p>
                    <p className="text-xs font-bold text-white">{s.metrics.recovery}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
