import Link from "next/link";

const capabilities = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Real-time Monitoring",
    description:
      "Continuous surveillance of 550+ critical infrastructure nodes across trade corridors, logistics hubs, and disaster-prone zones — updated every 30 seconds.",
    link: "/control-room"
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "AI-Powered Analysis",
    description:
      "45+ specialized AI agents work in consensus to detect anomalies, correlate signals across domains, and surface actionable intelligence before crises escalate.",
    link: "/ai-parliament"
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Scenario Simulation",
    description:
      "Run high-fidelity what-if simulations for natural disasters, supply chain disruptions, and geopolitical events. Understand cascading impacts before they happen.",
    link: "/scenario-simulator"
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Impact Assessment",
    description:
      "Quantify economic, human, and infrastructure impacts with precision. From port closures to cyclone landfalls — every event has a measurable national cost.",
    link: "/impact-dashboard"
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Crisis Response",
    description:
      "Coordinate rapid response across agencies with automated playbooks, priority queuing, and real-time inter-agency communication — reducing response lag from hours to minutes.",
    link: "/crisis-commander"
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Resilience Building",
    description:
      "Generate long-range resilience reports, identify systemic vulnerabilities, and track recovery trajectories to strengthen Bharat's critical infrastructure over time.",
    link: "/reports"
  }
];

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
            Platform Capabilities
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Intelligence. Integration. Impact.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            A unified platform spanning real-time data, AI inference, simulation, and coordinated response — engineered for national-scale resilience.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="group surface-card interactive-card flex flex-col gap-4 rounded-xl p-6 hover:shadow-blue-500/10"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 transition-colors group-hover:bg-blue-500/20">
                {cap.icon}
              </div>
              <div className="flex-1">
                <h3 className="mb-2 font-semibold text-foreground">{cap.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{cap.description}</p>
              </div>
              <Link
                href={cap.link}
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-500 transition-colors hover:text-blue-400"
              >
                Explore
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
