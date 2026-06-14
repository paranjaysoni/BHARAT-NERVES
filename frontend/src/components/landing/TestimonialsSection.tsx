const testimonials = [
  {
    quote:
      "Project Aegis provides unprecedented visibility into our critical infrastructure corridors. The AI agent consensus model surfaces threats we would never have caught with traditional monitoring alone — it has fundamentally changed how we prepare.",
    name: "Rajiv Menon",
    title: "Director, Emergency Operations Center",
    org: "National Disaster Authority"
  },
  {
    quote:
      "The AI-driven insights and scenario simulations have cut our inter-agency coordination time by over 60%. When a cyclone is 48 hours out, Aegis already has impact maps, resource requirements, and response playbooks ready for every district.",
    name: "Priya Nair",
    title: "Joint Secretary, Disaster Response",
    org: "Ministry of Home Affairs"
  },
  {
    quote:
      "Aegis is the future of crisis intelligence for national logistics networks. We can now see exactly which port closures cascade into supply shortfalls — and by how much — before they happen. That lead time is invaluable.",
    name: "Arvind Sharma",
    title: "CEO",
    org: "National Logistics Council"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-card/30 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
            Testimonials
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Voices from the Field
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="surface-card flex flex-col gap-5 rounded-xl p-7 transition-all duration-200 hover:border-blue-500/30 hover:shadow-[0_12px_28px_rgb(59_130_246/0.08)]"
            >
              {/* Quote mark */}
              <svg className="h-8 w-8 text-blue-500/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="border-t border-border/60 pt-4">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.title}</p>
                <p className="text-xs text-blue-500">{t.org}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
