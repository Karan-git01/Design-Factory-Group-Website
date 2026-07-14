export default function WhatWeDo() {
  return (
    <section className="bg-ink px-6 py-12 sm:px-12">
      <div className="relative overflow-hidden rounded-3xl">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600"
          alt="Contemporary residential project"
          loading="lazy"
          className="h-[480px] w-full object-cover sm:h-[560px]"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/10 to-transparent p-8">
          <h3 className="font-display mb-2 text-xl font-medium text-surface">
            What we do
          </h3>
          <p className="max-w-md text-secondary-light">
            We design and build contemporary residential and commercial
            projects, integrating architecture and construction into one
            coordinated process.
          </p>
        </div>
      </div>
    </section>
  );
}