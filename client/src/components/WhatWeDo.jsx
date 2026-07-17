export default function WhatWeDo() {
  return (
    <section className="bg-ink px-6 py-20 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center gap-4">
          <div className="h-px w-14 bg-primary" />
          <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-secondary-light">
            What We Do
          </span>
        </div>

        <div className="relative overflow-hidden rounded-[2.25rem] border border-secondary/20 bg-surface/5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
          <div className="pointer-events-none absolute inset-4 rounded-[1.8rem] border border-secondary/20" />

          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600"
            alt="Contemporary residential project"
            loading="lazy"
            className="h-[420px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[520px] lg:h-[700px]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

          <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-lg">
            <div className="rounded-[28px] border border-secondary/20 bg-ink-light/90 p-6 backdrop-blur-2xl sm:p-8">
              <div className="mb-5 flex items-center gap-4">
                <div className="h-px w-10 bg-primary" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-secondary-light">
                  Our Expertise
                </span>
              </div>

              <h3 className="font-display text-3xl font-light text-surface sm:text-4xl">
                What we do
              </h3>

              <p className="mt-5 text-sm leading-7 text-secondary-light sm:text-base">
                We design and build contemporary residential and commercial
                projects, integrating architecture and construction into one
                coordinated process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}