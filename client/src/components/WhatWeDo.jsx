import { Reveal } from "../components/Reveal";
import TextReveal from "./TextReveal";

export default function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      aria-labelledby="what-we-do-heading"
      className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-32"
    >
      <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
        <figure className="relative order-2 m-0 md:order-1">
          <div className="img-zoom overflow-hidden rounded-sm border border-border">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600"
              alt="Contemporary residential architecture project by Design Factory Group in Siliguri, India"
              loading="lazy"
              className="aspect-[4/3] w-full max-h-[360px] object-cover sm:max-h-[420px] md:aspect-auto md:h-[420px] md:max-h-none lg:aspect-[4/3] lg:h-auto lg:max-h-[480px]"
            />
          </div>
          <figcaption className="group absolute -right-4 top-8 max-w-[150px] rounded-sm border border-copper bg-copper p-3 shadow-xl sm:max-w-[180px] sm:p-4 md:max-w-[200px] md:p-4 lg:max-w-[240px] lg:p-5">
            <p className="label-caps relative inline-block w-fit pb-1 text-background/70">
              Our Expertise
              <span className="absolute inset-x-0 bottom-0 h-px bg-background/30" />
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-background transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </p>
            <p className="relative mt-2 font-display text-sm leading-tight text-background text-[0.75rem] md:text-base lg:text-lg">
              Architecture and construction, one coordinated process.
            </p>
          </figcaption>
        </figure>

        <div className="order-1 flex flex-col justify-center md:order-2">
          <Reveal>
            <span className="label-caps text-copper">— What we do</span>
          </Reveal>
          {/* role="heading"/aria-level exposes this as a real h2 to screen
              readers and search engines without altering how TextReveal
              renders or animates its own markup. */}
          <div role="heading" aria-level={2} id="what-we-do-heading">
            <TextReveal
              className="mt-4 font-display text-4xl leading-[1.08] tracking-tight md:text-5xl"
              text="A single, accountable team from first sketch to keys handed over."
              emphasize={["first", "sketch"]}
            />
          </div>
          <Reveal delay={160}>
            <p className="mt-6 max-w-lg text-muted-foreground">
              Design Factory Group designs and builds contemporary residential
              and commercial projects in Siliguri and across India, integrating
              architecture and construction into one coordinated process from
              first sketch to keys handed over.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}