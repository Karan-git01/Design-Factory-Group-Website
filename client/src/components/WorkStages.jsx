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
    <section id="work-stages" className="relative border-t border-secondary/20 bg-ink">
      <img
        src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600"
        alt="Architectural detail"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-[2px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-8 md:px-12 lg:px-16 xl:px-20 xl:py-28">
        <div className="mb-16">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-14 bg-primary" />
            <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-secondary-light">
              Work Process
            </span>
          </div>

          <h2 className="font-display max-w-4xl text-4xl font-light leading-[0.95] tracking-[-0.04em] text-surface sm:text-5xl lg:text-6xl">
            Steps to your
            <span className="text-primary"> new home</span>
          </h2>
        </div>

        {/* Mobile — plain informational cards, no fake interactivity */}
        <div className="flex flex-col gap-5 lg:hidden">
          {STAGES.map((stage) => (
            <div
              key={stage.number}
              className="sticky top-24 rounded-[2rem] border border-secondary/20 bg-ink-light/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            >
              <span className="font-display block text-5xl font-light text-primary">
                {stage.number}
              </span>
              <h3 className="font-display mt-8 text-2xl font-light text-surface">
                {stage.title}
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-secondary-light">
                {stage.text}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop — hover still adds polish here since a real cursor exists,
            but no arrow implying it's clickable */}
        <div className="hidden gap-8 lg:grid lg:grid-cols-2">
          {STAGES.map((stage) => (
            <div
              key={stage.number}
              className="group rounded-[2rem] border border-secondary/20 bg-ink-light/95 p-10 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_25px_70px_rgba(0,0,0,0.35)]"
            >
              <span className="font-display block text-6xl font-light tracking-[-0.05em] text-primary">
                {stage.number}
              </span>
              <h3 className="font-display mt-10 text-3xl font-light text-surface transition-colors duration-300 group-hover:text-primary">
                {stage.title}
              </h3>
              <p className="mt-5 max-w-md text-[15px] leading-8 text-secondary-light">
                {stage.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}