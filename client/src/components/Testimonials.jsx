import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Reveal } from "../components/Reveal";

const DEFAULT_TESTIMONIALS = {
  featured: {
    quote:
      "The team's attention to detail and ability to translate our vision into a home beyond expectation is rare.",
    name: "Alexander R.",
    role: "Private Client",
    location: "Lake Como, Italy",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  cards: [
    {
      quote:
        "Professional, precise and incredibly creative. They designed a home that feels iconic and liveable.",
      name: "Isabella M.",
      role: "Homeowner",
      location: "Malibu, California",
    },
    {
      quote:
        "A seamless experience from concept to completion. The quality of craftsmanship is outstanding.",
      name: "Matthew L.",
      role: "Developer",
      location: "Dubai, UAE",
    },
    {
      quote:
        "They don't just design buildings, they create environments that elevate everyday living.",
      name: "Sofia K.",
      role: "Private Client",
      location: "London, UK",
    },
    {
      quote:
        "Every decision was explained clearly and every deadline was met. Rare to find that level of discipline.",
      name: "Daniel P.",
      role: "Private Client",
      location: "Zurich, Switzerland",
    },
    {
      quote:
        "Our home feels like it was designed around how we actually live, not how a brochure said we should.",
      name: "Priya N.",
      role: "Homeowner",
      location: "Singapore",
    },
    {
      quote:
        "Working across three time zones was never an issue. Communication was constant and precise throughout.",
      name: "Thomas W.",
      role: "Developer",
      location: "New York, USA",
    },
  ],
};

function Initial({ name }) {
  const initial = name?.trim()?.[0] ?? "•";
  return (
    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink/5 font-display text-lg text-ink">
      {initial}
    </div>
  );
}

export default function Testimonials({
  featured = DEFAULT_TESTIMONIALS.featured,
  testimonials = DEFAULT_TESTIMONIALS.cards,
  eyebrow = "Client Stories",
  heading = (
    <>
      Crafted experiences, <em className="text-copper">trusted by those who live in them</em>.
    </>
  ),
  intro = "We collaborate closely with our clients to create residences that are considered, timeless and deeply personal.",
  autoPlay = true,
  autoPlayInterval = 3000,
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const total = testimonials.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const go = (dir) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + total) % total);
  };
  const goTo = (i) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  useEffect(() => {
    if (!autoPlay || reduced || paused || total <= 1) return;
    const t = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % total);
    }, autoPlayInterval);
    return () => clearInterval(t);
    // Resets the timer to a full interval whenever the slide changes,
    // whether that change came from autoplay or a manual click.
  }, [index, autoPlay, reduced, paused, autoPlayInterval, total]);

  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-5 pt-25 pb-25 text-ink sm:px-8 md:py-32">
      <div className="hairline mb-16" />

      <Reveal>
        <span className="label-caps text-copper">— {eyebrow}</span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
          {heading}
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
        <Reveal>
          <p className="max-w-md text-muted-foreground">{intro}</p>
        </Reveal>
      </div>

      {/* Featured card */}
      <Reveal delay={100}>
        <article className="relative mt-12 grid grid-cols-1 gap-0 overflow-hidden border border-border bg-card p-4 md:grid-cols-[1fr_1.3fr] md:p-6">
          <Quote
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 -top-2 hidden h-28 w-28 rotate-180 fill-border stroke-none lg:block"
          />
          <div className="aspect-[4/5] w-full overflow-hidden">
            <img
              src={featured.image}
              alt={`Project for ${featured.name}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col justify-center px-4 py-8 md:px-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="label-caps text-copper">Featured Client Story</span>
              <span className="h-px w-10 bg-border" />
            </div>
            <div className="flex gap-4">
              <span aria-hidden className="font-display text-5xl leading-none text-copper">
                &ldquo;
              </span>
              <p className="font-display text-2xl leading-[1.35] text-foreground md:text-3xl">
                {featured.quote}
              </p>
            </div>
            <div className="mt-8 h-px w-full bg-border" />
            <div className="mt-6 flex items-center gap-4">
              <Initial name={featured.name} />
              <div>
                <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-foreground">
                  {featured.name}
                </div>
                <div className="mt-1 text-[0.68rem] uppercase tracking-[0.22em] text-copper">
                  {featured.role}
                </div>
                <div className="text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
                  {featured.location}
                </div>
              </div>
            </div>
          </div>

        </article>
      </Reveal>

      {/* Testimonial slider */}
      <Reveal delay={160}>
        <div
          className="mt-6 border border-border bg-card"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12 md:px-14 md:py-14">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.article
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="flex flex-col"
              >
                <span
                  aria-hidden
                  className="mb-4 font-display text-4xl leading-none text-copper sm:text-5xl"
                >
                  &ldquo;
                </span>
                <p className="max-w-3xl font-display text-xl leading-[1.4] text-foreground sm:text-2xl md:text-[28px]">
                  {testimonials[index].quote}
                </p>
                <div className="mt-8 h-px w-full bg-border" />
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Initial name={testimonials[index].name} />
                  <div className="min-w-0">
                    <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-foreground">
                      {testimonials[index].name}
                    </div>
                    <div className="mt-1 text-[0.68rem] uppercase tracking-[0.22em] text-copper">
                      {testimonials[index].role}
                    </div>
                    <div className="text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
                      {testimonials[index].location}
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Slider controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-5 sm:px-10 md:px-14">
            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-copper" : "w-2 bg-border hover:bg-muted-foreground/40"
                  }`}
                />
              ))}
              <span className="ml-3 text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-copper hover:text-copper"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="grid h-11 w-11 place-items-center rounded-full border border-copper bg-copper text-primary-foreground transition-colors hover:bg-copper-dark"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}