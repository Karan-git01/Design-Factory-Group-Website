const STAGES = [
  {
    number: "01",
    title: "Initial contact",
    text: "You get in touch with us to discuss your goals, preferences and overall expectations for the project.",
  },
  {
    number: "02",
    title: "Project briefing",
    text: "We define the scope, budget range, timeline and key requirements to establish a clear project brief.",
  },
  {
    number: "03",
    title: "Location analysis",
    text: "The location is carefully reviewed to understand its conditions, context and any existing constraints.",
  },
  {
    number: "04",
    title: "Concept development",
    text: "Initial architectural ideas are developed, focusing on layout, spatial organisation and direction.",
  },
  {
    number: "05",
    title: "Detailed design",
    text: "The approved concept is developed further through detailed architectural and technical solutions.",
  },
];

export default function WorkStages() {
  return (
    <section
      id="work-stages"
      className="relative bg-ink px-6 py-24 sm:px-12"
    >
      <img
        src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600"
        alt="Architectural detail"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-ink/60" />

      <div className="relative z-10">
        <h2 className="font-display mb-16 text-4xl font-medium text-surface sm:text-5xl">
          Steps to your new home
        </h2>

        <div className="flex flex-col gap-6">
          {STAGES.map((stage) => (
            <div
              key={stage.number}
              className="sticky top-24 rounded-3xl border border-white/10 bg-ink/60 p-8 backdrop-blur-md sm:p-10"
            >
              <span className="font-display mb-6 block text-4xl font-medium text-surface">
                {stage.number}
              </span>
              <h3 className="font-display mb-3 text-2xl font-medium text-surface">
                {stage.title}
              </h3>
              <p className="max-w-md text-secondary-light">{stage.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}