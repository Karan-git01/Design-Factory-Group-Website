import { useEffect, useRef, useState } from "react";
import { Reveal } from "../components/Reveal";

import responsibilityImg from "../assets/images/why-responsibility.webp";
import collaborationImg from "../assets/images/why-collaboration.webp";
import workflowImg from "../assets/images/why-workflow.webp";
import involvementImg from "../assets/images/why-involvement.webp";

const whyPoints = [
  {
    n: "01",
    title: "Responsibility",
    body: "We take responsibility for the full scope of work, allowing decisions, coordination and execution to remain aligned throughout the project.",
    image: responsibilityImg,
    caption: "Full-scope ownership",
  },
  {
    n: "02",
    title: "Collaboration",
    body: "Clients work directly with the team involved in the project, ensuring clear communication and faster, more informed decisions.",
    image: collaborationImg,
    caption: "Direct, not filtered",
  },
  {
    n: "03",
    title: "Workflow",
    body: "Each project is developed through a clear and structured process, helping to minimise uncertainty and avoid unnecessary complexity.",
    image: workflowImg,
    caption: "Structured, not rigid",
  },
  {
    n: "04",
    title: "Involvement",
    body: "We stay closely involved at every stage of the project, maintaining continuity from early planning through construction and completion.",
    image: involvementImg,
    caption: "Site to sign-off",
  },
];

const SWIPE_THRESHOLD = 40;
const AUTOPLAY_MS = 7000; // <-- change this number to adjust auto-swipe speed

export default function WhyUs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const count = whyPoints.length;

  const next = () => setActive((p) => (p + 1) % count);
  const prev = () => setActive((p) => (p - 1 + count) % count);

  // auto-swipe, pauses while the user is hovering, focused, or swiping
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      delta < 0 ? next() : prev();
    }
    setPaused(false);
    touchStartX.current = null;
  };

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 md:py-2 md:mt-25"
    >
      <Reveal>
        <span className="label-caps text-copper">— Why choose us</span>
      </Reveal>
      <Reveal delay={80}>
        <h2
          id="why-us-heading"
          className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight md:text-5xl"
        >
          Why work with <em className="text-copper">Design Factory Group</em>.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
        {/* IMAGE — taller on tablet where it was reading short, swipeable
            on touch, capped heights instead of a tall aspect ratio so it
            never overruns the viewport */}
        <Reveal>
          <div className="md:flex md:h-full md:items-center">
          <div
            className="relative h-[300px] w-full touch-pan-y select-none overflow-hidden rounded-sm border border-border sm:h-[420px] md:h-[620px] lg:h-[520px]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {whyPoints.map((p, i) => (
              <img
                key={p.n}
                src={p.image}
                alt={`${p.caption} — Design Factory Group`}
                aria-hidden={i !== active}
                loading={i === 0 ? "eager" : "lazy"}
                draggable={false}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* subtle grade so the caption and dots stay legible over any photo */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
            />

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-6 sm:left-6 sm:right-6">
              {/* CTA — a signage tag (accent rule + label), not a
                  blurred glass pill, so it reads as a made choice
                  rather than a template default */}
              <div
                aria-live="polite"
                className="flex items-center gap-2.5 rounded bg-background px-3.5 py-2 sm:gap-3 sm:px-4 sm:py-2.5"
              >
                <span aria-hidden="true" className="h-3 w-px shrink-0 bg-copper" />
                <span className="label-caps text-[10px] leading-none text-foreground sm:text-[11px] md:text-xs">
                  {whyPoints[active].caption}
                </span>
              </div>

              {/* progress dots — unchanged, still the section's
                  signature device reading the active pillar. Purely
                  decorative: the list below already exposes the same
                  state (and controls it) accessibly. */}
              <div aria-hidden="true" className="flex items-center gap-1.5 pb-2 sm:pb-2.5">
                {whyPoints.map((p, i) => (
                  <span
                    key={p.n}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === active
                        ? "w-6 bg-copper"
                        : "w-1.5 bg-background/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          </div>
        </Reveal>

        {/* LIST — active item's number fills solid, inactive numbers sit
            as quiet outline marks; hover/focus/tap all drive the image */}
        <ul className="divide-y divide-border">
          {whyPoints.map((p, i) => {
            const isActive = i === active;
            return (
              <Reveal key={p.n} delay={i * 60}>
                <li>
                  <button
                    type="button"
                    onMouseEnter={() => {
                      setActive(i);
                      setPaused(true);
                    }}
                    onMouseLeave={() => setPaused(false)}
                    onFocus={() => {
                      setActive(i);
                      setPaused(true);
                    }}
                    onBlur={() => setPaused(false)}
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className="group grid w-full grid-cols-[auto_1fr] items-start gap-6 py-6 text-left"
                  >
                    <span
                      aria-hidden="true"
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border font-display text-lg transition-all duration-300 ${
                        isActive
                          ? "border-copper bg-copper text-primary-foreground"
                          : "border-border text-muted-foreground group-hover:border-copper group-hover:text-copper"
                      }`}
                    >
                      {p.n}
                    </span>
                    <div className="min-w-0">
                      <h3
                        className={`font-display text-2xl tracking-tight transition-colors duration-300 ${
                          isActive ? "text-copper" : "text-foreground"
                        }`}
                      >
                        {p.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                        {p.body}
                      </p>
                    </div>
                  </button>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}