import Link from "next/link";

export function FinalCTA() {
  return (
    <section id="cta" className="relative overflow-hidden py-24 lg:py-32">
      {/* Multi-layer background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.06] blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/[0.04] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-indigo-500/[0.04] blur-3xl" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-blue-500">
            National Resilience Platform
          </span>
        </div>

        <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Ready to Strengthen <br />
          <span className="text-blue-500">Bharat&apos;s Resilience?</span>
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-muted-foreground">
          Join government agencies, industry leaders, and partners building a safer, stronger, and more resilient nation. Project Aegis is engineered for national-scale impact.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/control-room"
            className="btn btn-primary h-12 px-8 text-sm font-semibold"
          >
            Access Command Center
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <button className="btn btn-outline h-12 px-8 text-sm font-semibold">
            Request Access
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {[
            "AI-Powered Intelligence",
            "National-Scale Infrastructure",
            "Real-Time Situational Awareness",
            "Multi-Agency Coordination"
          ].map((item) => (
            <div key={item} className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
              <svg className="h-3.5 w-3.5 text-blue-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
