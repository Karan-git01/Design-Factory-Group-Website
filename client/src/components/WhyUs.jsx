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
    <section id="why-us" className="bg-ink px-6 py-24 sm:px-12">
      <h2 className="font-display mb-12 text-4xl font-medium text-surface sm:text-5xl">
        Why work with us
      </h2>

      <div className="mb-12 overflow-hidden rounded-3xl">
        <img
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600"
          alt="Interior living space"
          loading="lazy"
          className="h-[320px] w-full object-cover sm:h-[420px]"
        />
      </div>

      <div className="flex flex-col divide-y divide-secondary/30">
        {REASONS.map((r) => (
          <div key={r.number} className="grid gap-4 py-8 sm:grid-cols-[100px_1fr]">
            <span className="font-display text-4xl font-medium text-secondary-light">
              {r.number}
            </span>
            <div>
              <h3 className="font-display mb-2 text-xl font-medium text-surface">
                {r.title}
              </h3>
              <p className="max-w-lg text-secondary-light">{r.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}