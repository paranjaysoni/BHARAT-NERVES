"use client";

const metrics = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    value: "550+",
    label: "Critical Nodes Monitored",
    sub: "Across 28 states & 8 UTs"
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    value: "45+",
    label: "AI & Analytics Agents",
    sub: "Running in consensus"
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
    value: "120+",
    label: "Data Sources Integrated",
    sub: "Live feeds, APIs & sensors"
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    value: "98.7%",
    label: "System Uptime",
    sub: "Mission-critical reliability"
  }
];

export function MetricsStrip() {
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-card/50">
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/[0.03] via-transparent to-cyan-500/[0.03]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-y divide-border/60 lg:grid-cols-4 lg:divide-y-0">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="flex flex-col items-center gap-3 px-6 py-10 text-center sm:flex-row sm:text-left"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20">
                {m.icon}
              </div>
              <div>
                <p className="text-3xl font-bold tracking-tight text-foreground">{m.value}</p>
                <p className="text-sm font-medium text-foreground/80">{m.label}</p>
                <p className="text-xs text-muted-foreground">{m.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
