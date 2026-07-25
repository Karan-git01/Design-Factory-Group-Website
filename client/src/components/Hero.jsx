import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown, MapPin } from "lucide-react";
import { Reveal } from "../components/Reveal";

export default function Hero() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const scrolled = Math.max(0, -rect.top);
      const heroH = rect.height;
      setProgress(Math.min(1, scrolled / Math.max(1, heroH * 0.6)));
      const indicator = document.getElementById("hero-scroll-indicator");
      if (indicator) {
        const o = Math.max(0, 1 - scrolled / (vh * 0.6));
        indicator.style.opacity = String(o);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headline = [
    [{ text: "High-end" }],
    [{ text: "residential" }],
    [{ text: "design" }, { text: "&", copper: true, italic: true }, { text: "build" }],
  ];
  let wordIndex = 0;

  return (
    <section
      ref={sectionRef}
      className="grain relative overflow-hidden pb-10 pt-6 sm:pt-10 md:pb-14 md:pt-16"
    >
      {/* Radial gradient accent — sits behind the headline text */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-0 h-[24rem] w-[24rem] sm:h-[28rem] sm:w-[28rem] md:left-[8%] md:h-[34rem] md:w-[34rem] md:top-4"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--copper) 20%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* Ghosted architectural wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 select-none overflow-hidden text-center leading-none"
      >
        <div className="font-display italic tracking-[-0.04em] text-ink/[0.045] md:text-ink/[0.055] text-[32vw] md:text-[18vw] translate-y-[28%]">
          atelier
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative mt-4 grid gap-10 md:mt-8 md:grid-cols-12 md:gap-8">
          {/* LEFT — editorial column */}
          <div className="relative z-10 md:col-span-7 md:pr-6">
            <h1
              className="font-display font-normal leading-[0.98] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.75rem, 3.2rem + 4vw, 6.25rem)" }}
            >
              {headline.map((line, li) => (
                <span key={li} className="block">
                  {line.map((w, wi) => {
                    const delay = wordIndex * 90;
                    wordIndex += 1;
                    return (
                      <span
                        key={wi}
                        className="hero-word"
                        style={{ animationDelay: `${delay}ms` }}
                      >
                        {w.copper ? (
                          <em className="font-light italic text-copper">{w.text}</em>
                        ) : w.italic ? (
                          <em className="font-light italic">{w.text}</em>
                        ) : (
                          w.text
                        )}
                        {wi < line.length - 1 && "\u00A0"}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>

            <Reveal delay={300}>
              <div className="mt-8 grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8 md:mt-10">
                <span className="hidden h-px w-8 translate-y-3 bg-copper sm:block" />
                <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                  A global studio shaping private residences with a rare balance
                  of restraint, craftsmanship and quiet ambition — from
                  first sketch to the final threshold.
                </p>
              </div>
            </Reveal>

            <Reveal delay={380}>
              <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10 md:mt-10">
                <Link
                  to="/contact"
                  className="btn-arrow group inline-flex items-center gap-6 rounded-full bg-ink px-7 py-4 label-caps text-background transition hover:bg-copper"
                >
                  <span>Discuss the Project</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-copper text-primary-foreground transition group-hover:bg-background group-hover:text-copper">
                    <ArrowUpRight size={14} />
                  </span>
                </Link>

                <Link to="/projects" className="group inline-flex flex-col items-start">
                  <span className="label-caps text-foreground transition group-hover:text-copper">
                    View Our Work
                  </span>
                  <span className="mt-1 h-px w-16 bg-copper transition-all group-hover:w-24" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — single editorial image */}
          <div className="relative md:col-span-5">
            {/* Vertical index — desktop */}
            <div className="pointer-events-none absolute -left-50 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
              <div className="flex origin-center -rotate-90 items-center gap-3 whitespace-nowrap">
                <span className="h-px w-10 bg-copper" />
                <span className="label-caps text-muted-foreground">Featured · Villa Aria — Como, IT</span>
              </div>
            </div>

            <figure className="relative">
              {/* Corner ticks frame */}
              <div aria-hidden className="pointer-events-none absolute -inset-3 hidden md:block">
                <span className="absolute left-0 top-0 h-4 w-px bg-copper" />
                <span className="absolute left-0 top-0 h-px w-4 bg-copper" />
                <span className="absolute right-0 top-0 h-4 w-px bg-copper" />
                <span className="absolute right-0 top-0 h-px w-4 bg-copper" />
                <span className="absolute bottom-0 left-0 h-4 w-px bg-copper" />
                <span className="absolute bottom-0 left-0 h-px w-4 bg-copper" />
                <span className="absolute bottom-0 right-0 h-4 w-px bg-copper" />
                <span className="absolute bottom-0 right-0 h-px w-4 bg-copper" />
              </div>

              {/* Dot grid accent */}
              <div
                aria-hidden
                className="pointer-events-none absolute -left-9 -top-9 z-10 hidden h-20 w-20 text-copper dot-grid md:block"
              />

              <div className="relative overflow-hidden rounded-[2rem] bg-card shadow-[0_50px_100px_-40px_rgb(31_27_22_/_0.4)]">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&h=1750&q=85"
                  alt="Featured residence by Design Factory Group — Villa Aria, Como"
                  className="aspect-[4/5] w-full object-cover"
                  draggable={false}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 via-black/25 to-transparent"
                />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-copper" />
                  <span className="label-caps text-white">Featured Residence</span>
                </div>
              </div>

              <figcaption className="absolute -bottom-6 -left-4 z-10 hidden max-w-[80%] rounded-2xl border border-border bg-background/95 p-4 shadow-[0_30px_60px_-30px_rgb(31_27_22_/_0.35)] backdrop-blur sm:block md:-left-8">
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-copper/10 text-copper">
                    <MapPin size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="label-caps text-muted-foreground">Project N° 214</div>
                    <div className="mt-1 font-display text-lg leading-tight tracking-tight">
                      Villa Aria <span className="text-copper">/</span> Lake Como
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      45.8081° N &nbsp;·&nbsp; 9.0852° E
                    </div>
                  </div>
                </div>
              </figcaption>
            </figure>

            {/* Scroll indicator */}
            <div
              id="hero-scroll-indicator"
              className="mt-16 flex items-center justify-end gap-4 transition-opacity duration-300 md:mt-10"
            >
              <span className="label-caps text-muted-foreground">Scroll</span>
              <div
                className="scroll-line"
                style={{ "--p": `${Math.round(progress * 100)}%` }}
              />
              <span className="grid h-10 w-10 place-items-center rounded-full border border-copper/60 text-copper">
                <ChevronDown size={16} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


