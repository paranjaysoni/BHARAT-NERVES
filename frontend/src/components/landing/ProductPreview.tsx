"use client";

const mapDots = [
  // Kashmir / North
  { x: 44, y: 8, intensity: 0.4 }, { x: 47, y: 10, intensity: 0.6 },
  { x: 50, y: 12, intensity: 0.3 }, { x: 53, y: 14, intensity: 0.5 },
  // Punjab / HP / Uttarakhand
  { x: 38, y: 18, intensity: 0.5 }, { x: 44, y: 17, intensity: 0.7 },
  { x: 50, y: 16, intensity: 0.4 }, { x: 56, y: 18, intensity: 0.3 },
  // Plains / UP / Bihar
  { x: 34, y: 24, intensity: 0.6 }, { x: 40, y: 22, intensity: 0.8 },
  { x: 46, y: 21, intensity: 0.5 }, { x: 52, y: 22, intensity: 0.9 },
  { x: 58, y: 23, intensity: 0.6 }, { x: 63, y: 24, intensity: 0.4 },
  // Central India
  { x: 32, y: 32, intensity: 0.4 }, { x: 38, y: 30, intensity: 0.6 },
  { x: 44, y: 29, intensity: 0.7 }, { x: 50, y: 30, intensity: 0.5 },
  { x: 56, y: 31, intensity: 1.0 }, { x: 62, y: 30, intensity: 0.8 },
  { x: 68, y: 29, intensity: 0.4 },
  // Western coast / Rajasthan / Gujarat
  { x: 24, y: 28, intensity: 0.5 }, { x: 22, y: 35, intensity: 0.6 },
  { x: 20, y: 42, intensity: 0.7 }, { x: 22, y: 48, intensity: 0.4 },
  // Deccan
  { x: 30, y: 40, intensity: 0.5 }, { x: 36, y: 38, intensity: 0.6 },
  { x: 42, y: 37, intensity: 0.4 }, { x: 48, y: 39, intensity: 0.7 },
  { x: 54, y: 38, intensity: 0.5 }, { x: 60, y: 39, intensity: 0.6 },
  { x: 65, y: 37, intensity: 0.8 },
  // Eastern coast / West Bengal / Odisha (storm hotspot)
  { x: 66, y: 28, intensity: 0.9 }, { x: 68, y: 34, intensity: 0.7 },
  { x: 70, y: 38, intensity: 1.0 }, { x: 68, y: 43, intensity: 0.6 },
  // South
  { x: 32, y: 52, intensity: 0.5 }, { x: 38, y: 50, intensity: 0.7 },
  { x: 44, y: 48, intensity: 0.6 }, { x: 50, y: 50, intensity: 0.5 },
  { x: 56, y: 49, intensity: 0.4 }, { x: 62, y: 48, intensity: 0.6 },
  // Far south
  { x: 38, y: 62, intensity: 0.5 }, { x: 44, y: 60, intensity: 0.4 },
  { x: 50, y: 62, intensity: 0.6 }, { x: 44, y: 70, intensity: 0.3 }
];

const incidents = [
  { label: "Cyclone Warning — Odisha Coast", status: "HIGH", color: "text-red-400", dot: "bg-red-500" },
  { label: "Port Congestion — Paradip Port", status: "MED", color: "text-orange-400", dot: "bg-orange-500" },
  { label: "Highway Blockage — NH-16 Corridor", status: "MED", color: "text-yellow-400", dot: "bg-yellow-400" }
];

const kpis = [
  { label: "Affected Pop.", value: "2.48M", color: "text-slate-200" },
  { label: "Economic Impact", value: "₹12.4 Cr", color: "text-slate-200" },
  { label: "Infra Risk", value: "High", color: "text-red-400", badge: true },
  { label: "Recovery Conf.", value: "76%", color: "text-cyan-400" }
];

const corridors = [
  { name: "Normal", pct: 82, color: "bg-green-500" },
  { name: "Stressed", pct: 55, color: "bg-yellow-400" },
  { name: "Disrupted", pct: 30, color: "bg-orange-500" },
  { name: "Closed", pct: 8, color: "bg-red-500" }
];

export function ProductPreview() {
  return (
    <div
      className="relative w-full"
      style={{ animation: "hero-float 6s ease-in-out infinite" }}
    >
      <style>{`
        @keyframes hero-float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-10px) rotate(-1deg); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.6); }
        }
        @keyframes scan-line {
          0% { top: 0%; opacity: 0; }
          5% { opacity: 0.5; }
          95% { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      {/* Ambient glow beneath */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-blue-500/[0.07] blur-3xl" />

      {/* Outer frame */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-500/25 bg-[#0b1120] shadow-[0_0_60px_rgb(59_130_246/0.18),0_32px_64px_rgb(0_0_0/0.6)]">

        {/* Browser chrome */}
        <div className="flex h-8 items-center gap-2 border-b border-white/5 bg-[#0d1525] px-3">
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-red-500/60" />
            <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
            <div className="h-2 w-2 rounded-full bg-green-500/60" />
          </div>
          <div className="mx-auto flex h-4 w-44 items-center justify-center rounded-sm bg-[#131e35] text-[0.5rem] text-slate-500 tracking-wider font-mono">
            aegis.bharat-nerves.gov.in
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[0.48rem] text-green-400 font-semibold tracking-widest">LIVE</span>
          </div>
        </div>

        {/* Top header bar */}
        <div className="flex items-center justify-between border-b border-white/5 bg-[#0d1525] px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-blue-600 flex items-center justify-center">
              <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-[0.55rem] font-bold text-blue-400 tracking-widest uppercase">Control Room</p>
              <p className="text-[0.62rem] font-semibold text-white">National Overview</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <p className="text-[0.48rem] text-slate-500">14 JUN 2026</p>
              <p className="text-[0.55rem] text-slate-300 font-mono">09:41:22 IST</p>
            </div>
            <div className="h-6 w-px bg-white/10" />
            {/* Mini nav icons */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-5 w-5 rounded bg-slate-800/60 border border-white/5" />
            ))}
          </div>
        </div>

        {/* Main layout */}
        <div className="flex">
          {/* Slim left sidebar */}
          <div className="flex w-8 flex-col items-center gap-3 border-r border-white/5 bg-[#0a0f1e] py-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-5 w-5 rounded ${i === 0 ? "bg-blue-600/80" : "bg-slate-800/60"}`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 p-3">
            {/* Critical Alert banner */}
            <div className="mb-3 flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2">
              <div
                className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-red-500"
                style={{ animation: "pulse-dot 1.2s ease-in-out infinite" }}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-[0.55rem] font-bold uppercase tracking-widest text-red-400">Critical Alert</p>
                  <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-[0.48rem] font-bold text-red-300 uppercase">Landfall in &lt;12 hrs</span>
                </div>
                <p className="text-[0.6rem] font-semibold text-slate-200 mt-0.5">Cyclone Landfall Predicted — Odisha Coast</p>
                <p className="text-[0.5rem] text-slate-400">Odisha Coast · 2.48M population at risk</p>
              </div>
              <button className="flex-shrink-0 rounded bg-red-600/80 px-2 py-0.5 text-[0.45rem] font-semibold text-white">
                View Details
              </button>
            </div>

            {/* Two-column main area */}
            <div className="grid grid-cols-[1fr_120px] gap-3">
              {/* Left: map + incidents */}
              <div>
                {/* India map */}
                <div className="relative mb-3 h-[110px] overflow-hidden rounded-lg border border-white/5 bg-[#060d1a]">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
                      backgroundSize: "10px 10px"
                    }}
                  />
                  {/* Scan line */}
                  <div
                    className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                    style={{ animation: "scan-line 4s linear infinite" }}
                  />
                  <p className="absolute left-2 top-1 text-[0.45rem] font-semibold uppercase tracking-widest text-slate-600">
                    India · Digital Twin
                  </p>
                  {/* Map dots */}
                  {mapDots.map((dot, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        left: `${dot.x}%`,
                        top: `${dot.y}%`,
                        width: dot.intensity > 0.8 ? "3px" : "2px",
                        height: dot.intensity > 0.8 ? "3px" : "2px",
                        backgroundColor: dot.intensity > 0.85
                          ? `rgba(239,68,68,${dot.intensity})`
                          : dot.intensity > 0.6
                          ? `rgba(249,115,22,${dot.intensity})`
                          : `rgba(59,130,246,${dot.intensity + 0.2})`
                      }}
                    />
                  ))}
                  {/* Cyclone hotspot ring */}
                  <div
                    className="absolute rounded-full border border-red-500/60 bg-red-500/10"
                    style={{ right: "20%", top: "35%", width: 20, height: 20, animation: "pulse-dot 1.8s ease-in-out infinite" }}
                  />
                  <div
                    className="absolute rounded-full border border-red-500/30"
                    style={{ right: "18%", top: "32%", width: 28, height: 28 }}
                  />
                </div>

                {/* KPI row */}
                <div className="mb-2 grid grid-cols-4 gap-1">
                  {kpis.map((k) => (
                    <div key={k.label} className="rounded bg-slate-900/70 px-1.5 py-1.5 text-center border border-white/5">
                      <p className={`text-[0.62rem] font-bold ${k.color}`}>{k.value}</p>
                      <p className="text-[0.45rem] text-slate-500 mt-0.5">{k.label}</p>
                    </div>
                  ))}
                </div>

                {/* Active incidents */}
                <div>
                  <p className="mb-1 text-[0.48rem] font-semibold uppercase tracking-widest text-slate-500">Active Incidents</p>
                  <div className="space-y-0.5">
                    {incidents.map((inc) => (
                      <div key={inc.label} className="flex items-center gap-1.5 rounded bg-slate-900/40 px-2 py-1 border border-white/[0.04]">
                        <div className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${inc.dot}`} />
                        <p className="flex-1 truncate text-[0.55rem] text-slate-300">{inc.label}</p>
                        <span className={`text-[0.45rem] font-bold uppercase ${inc.color}`}>{inc.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right sidebar */}
              <div className="space-y-3">
                {/* Corridor Status */}
                <div className="rounded-lg border border-white/5 bg-slate-900/40 p-2">
                  <p className="mb-2 text-[0.48rem] font-semibold uppercase tracking-widest text-blue-400">Corridor Status</p>
                  <div className="space-y-1.5">
                    {corridors.map((c) => (
                      <div key={c.name} className="flex items-center gap-1.5">
                        <div className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${c.color}`} />
                        <span className="flex-1 text-[0.48rem] text-slate-400">{c.name}</span>
                        <span className="text-[0.48rem] text-slate-500">{c.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Agents */}
                <div className="rounded-lg border border-white/5 bg-slate-900/40 p-2">
                  <p className="mb-2 text-[0.48rem] font-semibold uppercase tracking-widest text-blue-400">AI Agents</p>
                  <div className="space-y-1">
                    {[
                      { name: "WeatherNet", s: "ON" },
                      { name: "CrisisGPT", s: "ALERT" },
                      { name: "TradeAI", s: "ON" },
                      { name: "LogisticAI", s: "ON" }
                    ].map((a) => (
                      <div key={a.name} className="flex items-center justify-between">
                        <span className="text-[0.48rem] text-slate-400">{a.name}</span>
                        <span className={`rounded px-1 py-0.5 text-[0.4rem] font-bold ${
                          a.s === "ALERT" ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
                        }`}>{a.s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System health */}
                <div className="rounded-lg border border-white/5 bg-slate-900/40 p-2 text-center">
                  <p className="text-[0.45rem] text-slate-500">Recovery Confidence</p>
                  <p className="text-base font-bold text-cyan-400">76%</p>
                  <div className="mt-1 h-1 w-full rounded-full bg-slate-800">
                    <div className="h-1 w-[76%] rounded-full bg-cyan-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
