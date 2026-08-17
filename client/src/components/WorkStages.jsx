import { useEffect, useRef, useState } from "react";
import {
  PhoneCall,
  ClipboardList,
  MapPin,
  Lightbulb,
  PenTool,
} from "lucide-react";
import { Reveal } from "../components/Reveal";

import stage01 from "../assets/images/stage-01-initial-contact.webp";
import stage02 from "../assets/images/stage-02-project-briefing.webp";
import stage03 from "../assets/images/stage-03-location-analysis.webp";
import stage04 from "../assets/images/stage-04-concept-development.webp";
import stage05 from "../assets/images/stage-05-detailed-design.webp";

const workStages = [
  {
    n: "01",
    title: "Initial contact",
    body: "You get in touch with us to discuss your goals, preferences and overall expectations for the project.",
    image: stage01,
  },
  {
    n: "02",
    title: "Project briefing",
    body: "We define the scope, budget range, timeline and key requirements to establish a clear project brief.",
    image: stage02,
  },
  {
    n: "03",
    title: "Location analysis",
    body: "The location is carefully reviewed to understand its conditions, context and any existing constraints.",
    image: stage03,
  },
  {
    n: "04",
    title: "Concept development",
    body: "Initial architectural ideas are developed, focusing on layout, spatial organisation and direction.",
    image: stage04,
  },
  {
    n: "05",
    title: "Detailed design",
    body: "The approved concept is developed further through detailed architectural and technical solutions.",
    image: stage05,
  },
];

const stageIcons = [PhoneCall, ClipboardList, MapPin, Lightbulb, PenTool];

/**
 * Continuous scroll progress (0–100) across the whole list, plus which row
 * has been passed — computed together on every scroll frame instead of at
 * discrete IntersectionObserver thresholds, so the fill tracks the scroll
 * position smoothly rather than snapping between states.
 */
function useScrollSpine(containerRef, rowRefs) {
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    let ticking = false;

    const compute = () => {
      ticking = false;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.5;
      const pct = ((viewportCenter - rect.top) / rect.height) * 100;
      setProgress(Math.min(100, Math.max(0, pct)));

      let last = -1;
      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        if (el.getBoundingClientRect().top <= viewportCenter) last = i;
      });
      setActiveIndex(last);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(compute);
      }
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [containerRef, rowRefs]);

  return { progress, activeIndex };
}

function StageRow({ s, Icon, index, isActive, rowRef }) {
  const isEven = index % 2 === 0;
  return (
    <li
      ref={rowRef}
      data-stage-index={index}
      className="group relative flex gap-5 py-8 md:grid md:grid-cols-12 md:items-stretch md:gap-x-6 md:py-6"
    >
      {/* Spine dot — left column on mobile, middle column on desktop. The
          connecting line itself is a single continuous rail rendered once
          behind the whole list (see below), not per row. Purely a visual
          progress marker: the stage number/title carry the actual meaning. */}
      <div
        aria-hidden="true"
        className="relative z-10 flex w-8 flex-none items-center justify-center md:order-2 md:col-span-2 md:w-auto md:self-stretch"
      >
        <span
          className={`h-3 w-3 flex-none rounded-full border-2 bg-background transition-all duration-300 ${
            isActive
              ? "scale-125 border-copper bg-copper shadow-[0_0_0_4px_theme(colors.copper/15%)]"
              : "border-copper group-hover:bg-copper"
          }`}
        />
      </div>

      {/* Content: stacked column on mobile (display: contents on desktop so
          the image/text below become direct grid children instead) */}
      <div className="flex flex-1 flex-col gap-4 md:contents">
        {/* Image */}
        <div
          className={`w-full md:col-span-5 ${isEven ? "md:order-1" : "md:order-3"}`}
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-border/30 md:aspect-[4/3]">
            <img
              src={s.image}
              alt={`${s.title} — stage ${s.n} of Design Factory Group's residential design process, Siliguri, India`}
              className="h-full w-full object-cover grayscale-[20%] transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
              loading="lazy"
            />
            <div
              className="absolute inset-0 ring-1 ring-inset ring-black/5"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Text */}
        <div
          className={`md:col-span-5 md:flex md:flex-col md:justify-center ${isEven ? "md:order-3" : "md:order-1"}`}
        >
          <span
            className={`label-caps transition-colors duration-300 ${
              isActive ? "text-copper" : "text-muted-foreground"
            }`}
          >
            Stage {s.n}
          </span>
          <h3 className="relative mt-3 block w-fit pb-1.5 font-display text-2xl leading-tight tracking-tight md:text-3xl lg:text-4xl">
            {s.title}
            <span
              className="absolute inset-x-0 bottom-0 h-px bg-foreground/20"
              aria-hidden="true"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-copper transition-transform duration-500 ease-out group-hover:scale-x-100"
            />
          </h3>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground md:mt-4">
            {s.body}
          </p>
          <span
            aria-hidden="true"
            className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-copper/30 text-copper transition-all duration-500 group-hover:border-copper group-hover:bg-copper group-hover:text-background"
          >
            <Icon size={16} aria-hidden="true" focusable="false" />
          </span>
        </div>
      </div>
    </li>
  );
}

export default function WorkStages() {
  const listRef = useRef(null);
  const rowRefs = useRef([]);
  rowRefs.current = [];
  const addRowRef = (el) => {
    if (el) rowRefs.current.push(el);
  };

  const { progress, activeIndex } = useScrollSpine(listRef, rowRefs);

  return (
    <section
      id="work-stages"
      aria-labelledby="work-stages-heading"
      className="relative overflow-hidden py-20 md:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <Reveal>
              <span className="label-caps text-copper">— Work process</span>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="work-stages-heading"
                className="mt-4 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl"
              >
                Steps to your <em className="text-copper">new home</em>.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="flex flex-col items-start gap-3 border-t border-border pt-5 md:items-end md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground md:text-right">
                Five stages, from the first call to a fully resolved design —
                each one building directly on the last, wherever you're building
                in India.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-16">
          {/* Continuous rail — mobile: fixed to the left edge of the spine dots.
              Desktop: centered in the middle spine column. Two positions,
              one progress value, both driven by the same scroll math. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-0 h-full w-px -translate-x-1/2 bg-border md:left-1/2"
          >
            <div
              className="w-px bg-copper"
              style={{
                height: `${progress}%`,
                transition: "height 120ms linear",
              }}
            />
          </div>

          <ol
            ref={listRef}
            aria-label="Design Factory Group's five-stage project process"
            className="list-none divide-y divide-border p-0 m-0"
          >
            {workStages.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <StageRow
                  s={s}
                  Icon={stageIcons[i]}
                  index={i}
                  isActive={i <= activeIndex}
                  rowRef={addRowRef}
                />
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
