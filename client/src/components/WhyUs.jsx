const REASONS = [
  {
    number: "01",
    title: "Responsibility",
    text: "We take responsibility for the full scope of work, allowing decisions, coordination and execution to remain aligned throughout the project.",
  },
  {
    number: "02",
    title: "Collaboration",
    text: "Clients work directly with the team involved in the project, ensuring clear communication and faster, more informed decisions.",
  },
  {
    number: "03",
    title: "Workflow",
    text: "Each project is developed through a clear and structured process, helping to minimise uncertainty and avoid unnecessary complexity.",
  },
  {
    number: "04",
    title: "Involvement",
    text: "We stay closely involved at every stage of the project, maintaining continuity from early planning through construction and completion.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="border-t border-secondary/20 bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 md:px-12 lg:px-16 xl:px-20 xl:py-28">
        <div className="mb-16">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-14 bg-primary" />
            <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-secondary-light">
              Why Choose Us
            </span>
          </div>

          <h2 className="font-display max-w-4xl text-4xl font-light leading-[0.95] tracking-[-0.04em] text-surface sm:text-5xl lg:text-6xl">
            Why work with{" "}
            <span className="text-primary">Design Factory Group</span>
          </h2>
        </div>

        <div className="relative mb-20 overflow-hidden rounded-[2rem] border border-secondary/20">
          <img
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600"
            alt="Interior living space"
            loading="lazy"
            className="h-[260px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[380px] lg:h-[520px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 hidden rounded-full border border-secondary/20 bg-ink/40 px-5 py-3 backdrop-blur-xl md:block">
            <span className="text-xs uppercase tracking-[0.35em] text-secondary-light">
              Premium Residential Design
            </span>
          </div>
        </div>

        <div className="divide-y divide-secondary/20">
          {REASONS.map((r) => (
            <div
              key={r.number}
              className="group grid gap-8 py-8 transition-all duration-300 md:grid-cols-[110px_1fr]"
            >
              <div>
                <span className="font-display text-5xl font-light tracking-[-0.05em] text-secondary/30 transition duration-300 group-hover:text-primary">
                  {r.number}
                </span>
              </div>

              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
                <div className="max-w-2xl">
                  <h3 className="font-display text-2xl font-light text-surface transition-colors duration-300 group-hover:text-primary sm:text-3xl">
                    {r.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-[15px] leading-7 text-secondary-light">
                    {r.text}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary/20 text-secondary-light transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-ink group-hover:translate-x-2">
                  →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
