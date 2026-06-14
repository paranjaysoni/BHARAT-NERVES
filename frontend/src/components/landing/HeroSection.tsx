"use client";

import Link from "next/link";
import { ProductPreview } from "./ProductPreview";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const pills = [
  "Real-time Intelligence",
  "AI Agent Consensus",
  "Scenario Simulation",
  "Rapid Response"
];

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-24">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.06] blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.04] blur-3xl" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left: text */}
          <div className="animate-page-enter">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-blue-500">
                AI-Powered National Security &amp; Economic Intelligence Platform
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              See Every Risk.
              <br />
              Understand Every Impact.
              <br />
              <span className="text-blue-500">Secure Every Future.</span>
            </h1>

            {/* Description */}
            <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Project Aegis is India&apos;s unified platform for real-time threat intelligence, AI-driven scenario simulation, and coordinated crisis response — protecting critical trade corridors, logistics networks, and disaster-prone regions at national scale.
            </p>

            {/* CTAs */}
            <div className="mb-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/control-room"
                className="btn btn-primary h-12 px-7 text-sm font-semibold"
              >
                Access Command Center
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <button
                className="btn btn-outline h-12 px-7 text-sm font-semibold"
                onClick={() => scrollTo("capabilities")}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Platform Overview
              </button>
            </div>

            {/* Capability pills */}
            <div className="flex flex-wrap gap-2">
              {pills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Product preview */}
          <div
            className="animate-card-in"
            style={{ transform: "rotate(-1deg)" }}
          >
            <ProductPreview />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center lg:mt-20">
          <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
            <span className="text-[0.6rem] uppercase tracking-widest">Scroll to explore</span>
            <div className="flex h-8 w-5 justify-center rounded-full border border-border/40 pt-1.5">
              <div
                className="h-1.5 w-0.5 rounded-full bg-muted-foreground/40"
                style={{ animation: "scroll-bob 1.6s ease-in-out infinite" }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-bob {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
