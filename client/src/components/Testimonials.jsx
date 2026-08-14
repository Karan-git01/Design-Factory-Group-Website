import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "../components/Reveal";

const DEFAULT_TESTIMONIALS = {
  featured: {
    quote:
      "The team's attention to detail and ability to translate our vision into a home beyond expectation is rare.The team's attention to detail and ability to translate our vision into a home beyond expectation is rare.",
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

const SWIPE_THRESHOLD = 40;

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
  autoPlayInterval = 5000,
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef(null);
  const pausedRef = useRef(paused);
  const total = testimonials.length;

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

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

  // Autoplay: advances the slide after autoPlayInterval.
  useEffect(() => {
    if (!autoPlay || reduced || paused || total <= 1) return;
    const t = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % total);
    }, autoPlayInterval);
    return () => clearInterval(t);
  }, [index, autoPlay, reduced, paused, autoPlayInterval, total]);

  // Progress-bar fill: driven entirely by requestAnimationFrame instead of
  // a CSS animation, so pausing/resuming and mobile touch don't leave the
  // bar stuck at 0% (the old animation-play-state approach was unreliable
  // on mobile browsers).
  useEffect(() => {
    setProgress(0);
    if (!autoPlay || reduced || total <= 1) return undefined;

    let raf;
    let start = null;
    let elapsedAtPause = 0;
    let pauseStart = pausedRef.current ? performance.now() : null;

    const tick = (t) => {
      if (pausedRef.current) {
        if (pauseStart === null) pauseStart = t;
        raf = requestAnimationFrame(tick);
        return;
      }
      if (pauseStart !== null) {
        elapsedAtPause += t - pauseStart;
        pauseStart = null;
      }
      if (start === null) start = t;
      const elapsed = t - start - elapsedAtPause;
      const pct = Math.min(100, (elapsed / autoPlayInterval) * 100);
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, autoPlay, reduced, autoPlayInterval, total]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      go(delta < 0 ? 1 : -1);
    }
    touchStartX.current = null;
    setPaused(false);
  };

  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-5 pt-10 pb-16 text-ink sm:px-8 md:py-24">
      <div className="hairline mb-16" />

      <Reveal>
        <span className="label-caps text-copper">— {eyebrow}</span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
          {heading}
        </h2>
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-6 max-w-md text-muted-foreground">{intro}</p>
      </Reveal>

      {/* Featured story */}
      <Reveal delay={200}>
        <article className="mt-10 grid grid-cols-1 rounded-sm border border-border bg-card md:grid-cols-[0.7fr_1.3fr]">
          <div className="img-zoom aspect-[16/10] w-full overflow-hidden rounded-t md:aspect-auto md:max-h-[360px] md:self-center md:rounded-l md:rounded-tr-none">
            <img
              src={featured.image}
              alt={`Project for ${featured.name}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="relative flex flex-col justify-center overflow-visible px-6 py-6 md:px-8 md:py-7">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-4 left-6 select-none font-display text-[5rem] leading-none text-copper/90 md:-top-6 md:left-8 md:text-[8rem] lg:text-[12rem]"
            >
              &ldquo;
            </span>

            <span className="label-caps relative text-copper underline underline-offset-4">Featured Client Story</span>

            <p className="relative mt-3 font-display text-lg leading-[1.35] text-foreground md:text-xl lg:text-2xl">
              {featured.quote}
            </p>

            <div className="relative mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.50rem] md:text-[0.64rem] uppercase tracking-[0.2em]">
              <span className="font-semibold text-foreground">{featured.name}</span>
              <span className="text-border">/</span>
              <span className="text-copper">{featured.role}</span>
              <span className="text-border">/</span>
              <span className="text-muted-foreground">{featured.location}</span>
            </div>
          </div>
        </article>
      </Reveal>

      {/* Testimonial slider */}
      <Reveal delay={240}>
        <div
          className="mt-6 rounded-sm border border-border bg-card"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            className="relative touch-pan-y select-none overflow-hidden px-6 py-6 sm:px-8 sm:py-6 md:px-9 md:py-7"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
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
                  className="mb-2 font-display text-3xl leading-none text-copper sm:text-4xl"
                >
                  &ldquo;
                </span>
                <p className="max-w-2xl font-display text-lg leading-[1.4] text-foreground sm:text-xl lg:w-[70%] md:max-w-full md:text-xl lg:text-2xl">
                  {testimonials[index].quote}
                </p>
                <div className="mt-4 h-px w-full bg-border" />
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink/5 font-display text-base text-ink">
                    {testimonials[index].name?.trim()?.[0] ?? "•"}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-foreground">
                      {testimonials[index].name}
                    </div>
                    <div className="mt-0.5 text-[0.54rem] uppercase tracking-[0.2em] text-copper">
                      {testimonials[index].role}
                    </div>
                    <div className="text-[0.54rem] uppercase tracking-[0.2em] text-muted-foreground">
                      {testimonials[index].location}
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Slider controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-3 sm:px-8 md:px-9">
            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => {
                const isActive = i === index;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={`relative h-1.5 overflow-hidden rounded-full bg-border transition-all ${
                      isActive ? "w-9" : "w-1.5 hover:bg-muted-foreground/40"
                    }`}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-y-0 left-0 h-full rounded-full bg-copper"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                  </button>
                );
              })}
              <span className="ml-3 text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-copper hover:text-copper"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="grid h-9 w-9 place-items-center rounded-full border border-copper bg-copper text-primary-foreground transition-colors hover:bg-copper-dark"
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