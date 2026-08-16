import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "../components/Reveal";

const SLIDES = [
  {
    project: "The Lake Haveli",
    location: "Udaipur, Rajasthan",
    image:
      "https://images.unsplash.com/photo-1682414180825-c0df1934387f?auto=format&fit=crop&w=2400&h=2000&q=85",
    alt: "The Lake Haveli, a stepped sandstone residence overlooking the lake in Udaipur",
    copy: "A quiet courtyard residence built into the city, using sandstone and jaali screens to soften the lake light.",
  },
  {
    project: "Jharokha House",
    location: "Jodhpur, Rajasthan",
    image:
      "https://images.unsplash.com/photo-1682414181845-a725f154a14a?auto=format&fit=crop&w=2400&h=2000&q=85",
    alt: "Jharokha House, a sandstone residence with carved overhanging balconies in Jodhpur",
    copy: "Latticed sandstone jharokhas and deep verandahs turn every quiet room into a frame for the old city beyond.",
  },
  {
    project: "Nalukettu Residence",
    location: "Palakkad, Kerala",
    image:
      "https://images.unsplash.com/photo-1642667670006-6b3059ccf96d?auto=format&fit=crop&w=2400&h=2000&q=85",
    alt: "Nalukettu Residence, a white courtyard house with sloped tiled roofs in Palakkad",
    copy: "Sloped tile roofs and deep verandahs keep the interior cool while the plan opens to the central courtyard.",
  },
  {
    project: "The Bikaner House",
    location: "Bikaner, Rajasthan",
    image:
      "https://images.unsplash.com/photo-1629725053305-9bb7886f9545?auto=format&fit=crop&w=2400&h=2000&q=85",
    alt: "The Bikaner House, a red sandstone residence set among trees in Bikaner",
    copy: "Sandstone and aged teak read as one material from a distance, softening into grain and carving up close.",
  },
];

const SWIPE_THRESHOLD = 40;
const AUTOPLAY_MS = 6000; // <-- change this number to adjust auto-swipe speed

export default function Hero() {
  const magnetRef = useRef(null);
  const touchStartX = useRef(null);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = SLIDES.length;

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqPointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    setReducedMotion(mqMotion.matches);
    setFinePointer(mqPointer.matches);
    const onMotion = (e) => setReducedMotion(e.matches);
    const onPointer = (e) => setFinePointer(e.matches);
    mqMotion.addEventListener("change", onMotion);
    mqPointer.addEventListener("change", onPointer);
    return () => {
      mqMotion.removeEventListener("change", onMotion);
      mqPointer.removeEventListener("change", onPointer);
    };
  }, []);

  const next = useCallback(() => setActive((p) => (p + 1) % count), [count]);
  const prev = useCallback(
    () => setActive((p) => (p - 1 + count) % count),
    [count],
  );

  // auto-swipe, pauses while the user is hovering, focused, or swiping
  useEffect(() => {
    if (paused || reducedMotion) return undefined;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reducedMotion, next]);

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

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
      setPaused(true);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
      setPaused(true);
    }
  };

  const handleMagnetMove = (e) => {
    const el = magnetRef.current;
    if (!el || reducedMotion || !finePointer) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setMagnet({ x: relX * 0.18, y: relY * 0.28 });
  };
  const handleMagnetLeave = () => setMagnet({ x: 0, y: 0 });

  const headline = [
    [{ text: "High-end residential" }],
    [
      { text: "design" },
      { text: "&", copper: true, italic: true },
      { text: "build" },
    ],
  ];

  const slide = SLIDES[active];
  const indexLabel = String(active + 1).padStart(2, "0");
  const countLabel = String(count).padStart(2, "0");

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-background pt-10 sm:pt-14"
    >
      <style>{`
        @keyframes dfLineReveal {
          from { transform: translateY(115%) rotate(1.2deg); }
          to { transform: translateY(0) rotate(0deg); }
        }
        @keyframes dfCaptionIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dfKenBurns {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
        .df-line-mask { display: block; overflow: hidden; padding-bottom: 0.06em; }
        .df-line-inner { display: block; will-change: transform; }
        .df-slide-img { transform-origin: center; }
        .df-nav-btn { opacity: 0; transition: opacity 0.25s ease; }
        .df-slider-frame:hover .df-nav-btn,
        .df-slider-frame:focus-within .df-nav-btn { opacity: 1; }

        /* Matches how the header wordmark actually renders (sans-serif,
           normal case, medium weight) rather than the brand-mark utility's
           declared values, which don't match the live output. */
        .df-caption-mark {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 500;
          line-height: 1.5;
        }
        @media (min-width: 768px) {
          .df-caption-mark { font-size: 1.05rem; }
        }

        /* Background photo mask: hidden behind the text column, then
           reveals starting where the text column ends. Below lg the
           layout stacks (grid-cols-1) so we use the same ~38.5% split
           as a reasonable default; at lg, where the grid is actually
           1fr / 1.6fr (text column ≈ 38.5% width), the reveal starts
           sooner so more of the photo shows behind the wider slider. */
        .df-bg-mask {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            transparent 38.5%,
            white 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            transparent 38.5%,
            white 100%
          );
        }
        @media (min-width: 1024px) {
          .df-bg-mask {
            -webkit-mask-image: linear-gradient(
              to right,
              transparent 0%,
              transparent 28%,
              white 100%
            );
            mask-image: linear-gradient(
              to right,
              transparent 0%,
              transparent 28%,
              white 100%
            );
          }
        }

        /* "View Our Work" hairline underline — sits fully out to the
           left at rest and translates in to full width on hover, rather
           than growing/scaling from a point. */
        .df-work-underline {
          transform: translateX(-100%);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .df-work-link:hover .df-work-underline,
        .df-work-link:focus-visible .df-work-underline {
          transform: translateX(0);
        }
        .df-work-arrow {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .df-work-link:hover .df-work-arrow,
        .df-work-link:focus-visible .df-work-arrow {
          transform: translateX(4px);
        }
      `}</style>

      {/* Background photo — soft, elegant palm frond shadows cast across
          a light wall (Dubai), well-composed rather than busy/scattered.
          Masked via the .df-bg-mask class above (hidden behind the text
          column, reveals starting where the text ends — sooner at lg). */}
      <div
        aria-hidden
        className="df-bg-mask pointer-events-none absolute inset-x-0 bottom-0 -top-50 md:-top-70 lg:top-0"
        style={{
          zIndex: 0,
          opacity: 0.4,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1530177150700-84cd9a3b059b?auto=format&fit=crop&w=2000&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Copper blob — an irregular organic shape sitting behind the
          headline text, instead of a flat gradient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-6 h-[340px] w-[340px] sm:-left-20 sm:top-4 sm:h-[440px] sm:w-[440px] lg:h-[520px] lg:w-[520px]"
        style={{
          zIndex: 0,
          opacity: 0.11,
          filter: "blur(20px)",
          background:
            "linear-gradient(150deg, var(--copper), color-mix(in oklch, var(--copper) 45%, transparent))",
          borderRadius: "58% 42% 63% 37% / 41% 55% 45% 59%",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-center lg:gap-10">
          {/* Headline & copy — leads on every breakpoint */}
          <div className="min-w-0">
            <h1
              id="hero-heading"
              className="font-display font-normal leading-[0.98] tracking-[-0.02em] text-ink"
              style={{ fontSize: "clamp(2.4rem, 1.9rem + 3.4vw, 4.25rem)" }}
            >
              {headline.map((line, li) => (
                <span key={li} className="df-line-mask">
                  <span
                    className="df-line-inner"
                    style={
                      reducedMotion
                        ? undefined
                        : {
                            animation:
                              "dfLineReveal 0.95s cubic-bezier(0.16,1,0.3,1) both",
                            animationDelay: `${li * 130}ms`,
                          }
                    }
                  >
                    {line.map((w, wi) => (
                      <span key={wi}>
                        {w.copper ? (
                          <em className="font-light italic text-copper">
                            {w.text}
                          </em>
                        ) : w.italic ? (
                          <em className="font-light italic">{w.text}</em>
                        ) : (
                          w.text
                        )}
                        {wi < line.length - 1 && "\u00A0"}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </h1>

            <Reveal delay={250}>
              <div className="mt-6 flex flex-col gap-8 border-t border-border pt-6 sm:mt-8 sm:pt-8">
                <p
                  key={active}
                  aria-live="polite"
                  className="df-caption-mark max-w-sm text-muted-foreground"
                  style={
                    reducedMotion
                      ? undefined
                      : {
                          animation:
                            "dfCaptionIn 0.5s cubic-bezier(0.16,1,0.3,1) both",
                        }
                  }
                >
                  {slide.copy}
                </p>

                <div className="flex flex-wrap items-center gap-8">
                  <div
                    ref={magnetRef}
                    onMouseMove={handleMagnetMove}
                    onMouseLeave={handleMagnetLeave}
                    className="inline-flex"
                  >
                    <Link
                      to="/contact"
                      style={{
                        transform: `translate(${magnet.x}px, ${magnet.y}px)`,
                      }}
                      className="btn-arrow btn-primary-copper group ring-focus !gap-2 !px-5 !py-2.5 !text-xs"
                    >
                      <span>Discuss the Project</span>
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-background text-copper transition group-hover:bg-ink group-hover:text-background">
                        <ArrowUpRight size={12} />
                      </span>
                    </Link>
                  </div>

                  <Link
                    to="/projects"
                    className="df-work-link ring-focus group inline-flex flex-col items-start text-ink"
                  >
                    <span className="label-caps inline-flex items-center gap-1.5 transition group-hover:text-copper">
                      View Our Work
                      <ArrowRight
                        size={14}
                        className="df-work-arrow"
                        aria-hidden
                      />
                    </span>
                    <span className="relative mt-1.5 h-px w-full overflow-hidden bg-border">
                      <span className="df-work-underline absolute inset-0 bg-copper" />
                    </span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Slider — same language as the Why Us section: swipeable,
              hover-to-pause, a signage caption tag, and the width-based
              progress dots as the recurring signature device */}
          <Reveal delay={150}>
            {/* single parent container — frame, images, overlay, and
                captions are all direct children of this one element */}
            <div
              className="df-slider-frame relative min-w-0 h-[300px] w-full touch-pan-y select-none overflow-hidden rounded-sm border border-border ring-focus sm:h-[420px] lg:h-[540px] xl:h-[600px]"
              role="group"
              aria-roledescription="carousel"
              aria-label="Featured projects"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              {SLIDES.map((s, i) => (
                <img
                  key={s.project}
                  src={s.image}
                  alt={s.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  draggable={false}
                  className={`df-slide-img absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                  style={
                    i === active && !reducedMotion
                      ? {
                          animation: `dfKenBurns ${AUTOPLAY_MS + 900}ms linear both`,
                          animationPlayState: paused ? "paused" : "running",
                        }
                      : undefined
                  }
                />
              ))}

              {/* subtle two-stop grade so the caption and dots stay legible
                  over any photo, without heavying up the image itself */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.32), rgba(0,0,0,0) 50%)",
                }}
              />

              {/* prev/next — desktop hover only, touch stays swipe-driven */}
              {finePointer && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      prev();
                      setPaused(true);
                    }}
                    aria-label="Previous project"
                    className="df-nav-btn ring-focus absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-background/85 text-ink transition hover:bg-background sm:left-4"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      next();
                      setPaused(true);
                    }}
                    aria-label="Next project"
                    className="df-nav-btn ring-focus absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-background/85 text-ink transition hover:bg-background sm:right-4"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-6 sm:left-6 sm:right-6">
                {/* signage tag — accent rule + label, matches the Why Us caption */}
                <div className="flex items-center gap-2.5 rounded bg-background px-3.5 py-2 sm:gap-3 sm:px-4 sm:py-2.5">
                  <span className="h-3 w-px shrink-0 bg-copper" />
                  <span className="label-caps text-[10px] leading-none text-foreground sm:text-[11px] md:text-xs">
                    <h2 className="m-0 inline text-inherit font-inherit">
                      {slide.project}
                    </h2>{" "}
                    · {slide.location}
                  </span>
                </div>

                {/* index + progress dots — the number is a real position in
                    a real sequence, not decoration */}
                <div className="flex items-center gap-3 pb-2 sm:pb-2.5">
                  <span className="label-caps hidden text-[10px] leading-none text-background/85 sm:inline">
                    {indexLabel} — {countLabel}
                  </span>
                  <nav aria-label="Project slides" className="flex items-center gap-1.5">
                    {SLIDES.map((s, i) => (
                      <button
                        key={s.project}
                        type="button"
                        onClick={() => {
                          setActive(i);
                          setPaused(true);
                        }}
                        aria-label={`Show ${s.project}`}
                        aria-current={i === active}
                        className="ring-focus block"
                      >
                        <span
                          className={`block h-1.5 rounded-full transition-all duration-500 ${
                            i === active
                              ? "w-6 bg-copper"
                              : "w-1.5 bg-background/70"
                          }`}
                        />
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}