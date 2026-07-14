export default function AboutPreview() {
  return (
    <section className="bg-ink px-6 py-24 sm:px-12">
      <p className="font-display mb-10 max-w-2xl text-2xl font-medium text-surface sm:text-3xl">
        Design Factory Group is a team working at the intersection of
        architecture, construction, and technology.
      </p>

      <button className="mb-16 w-full rounded-full bg-surface py-4 text-base font-medium text-ink transition hover:bg-primary hover:text-surface sm:w-auto sm:px-10">
        Discuss the Project
      </button>

      <div className="relative overflow-hidden rounded-3xl">
        <img
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600"
          alt="Design Factory Group project exterior"
          loading="lazy"
          className="h-[420px] w-full object-cover sm:h-[520px]"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/20 to-transparent p-8">
          <h3 className="font-display mb-2 text-xl font-medium text-surface">
            Who we work with
          </h3>
          <p className="max-w-md text-secondary-light">
            We work with private and commercial clients who value clarity,
            thoughtful decisions and a structured approach to building.
          </p>
        </div>
      </div>
    </section>
  );
}