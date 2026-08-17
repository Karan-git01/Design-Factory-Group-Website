import { useEffect, useRef, useState } from "react";
import { useCountUp } from "react-countup";
import { Globe, Users, Maximize2 } from "lucide-react";
import { Reveal } from "../components/Reveal";
import WorldMapDots from "./WorldMapDots";

// All 28 Indian states — operations are pan-India, not global.
const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const STATS = [
  { target: STATES.length, suffix: "", label: "States Covered", icon: Globe },
  { target: 260, suffix: "+", label: "Clients Served", icon: Users },
  { target: 850, suffix: "K+", label: "Total Area Delivered", icon: Maximize2 },
];

const ROW_HEIGHT_REM = 4;
const VISIBLE_ROWS = 3;
// Reserve center-column width based on the longest name ("Arunachal Pradesh"
// / "Himachal Pradesh", 17 chars) plus generous breathing room on each side,
// so the dimension lines never sit under the text.
const LONGEST_NAME_CH = Math.max(...STATES.map((s) => s.length)) + 8;
// Must match the `duration-700` Tailwind class used on the scroller below.
const TRANSITION_MS = 700;
// Fixed type size for every state name, regardless of length, so the
// scroller reads as a single consistent instrument rather than reflowing.
const NAME_SIZE_CLASS = "text-xl sm:text-2xl md:text-3xl";

// Append a duplicate of the first state to the end of the display list.
// This gives the auto-scroller somewhere to animate "past" the last real
// item, so it can then snap back to index 0 (which looks pixel-identical
// to the duplicate) without ever animating a jarring reverse jump.
const DISPLAY_STATES = [...STATES, STATES[0]];

// Small L-shaped ticks in each corner of a relatively-positioned parent —
// the recurring "technical viewport" mark used across the section: on the
// state-picker card, on each stat card, framing content like a drawing
// detail callout.
function CornerBrackets() {
  const positions = [
    "top-0 left-0 border-t border-l",
    "top-0 right-0 border-t border-r",
    "bottom-0 left-0 border-b border-l",
    "bottom-0 right-0 border-b border-r",
  ];
  return (
    <>
      {positions.map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`pointer-events-none absolute h-3 w-3 border-copper/50 ${pos}`}
        />
      ))}
    </>
  );
}

// Dimension-line ornament — a gradient line terminating in a short
// perpendicular tick at the end nearest the text, the way a measurement
// line closes on a drawing. Replaces the plain gradient-only version.
function DimensionLine({ side = "left" }) {
  const gradient =
    side === "left"
      ? "bg-gradient-to-r from-transparent to-copper/70"
      : "bg-gradient-to-l from-transparent to-copper/70";
  const tick = <span aria-hidden="true" className="h-2 w-px shrink-0 bg-copper/70" />;
  return (
    <span aria-hidden="true" className="flex w-full items-center">
      {side === "right" && tick}
      <span className={`block h-[1.5px] w-full rounded-full ${gradient}`} />
      {side === "left" && tick}
    </span>
  );
}

// Renders the animated count-up figure plus its label. The figure itself is
// hidden from assistive tech (it's injected imperatively by useCountUp, so
// it's empty on first paint / before the scroll-triggered animation runs,
// and an empty node is worse for screen readers than no node at all). A
// visually-hidden fallback with the final value ships instead, so the
// number is always available to screen readers and to search engines.
function Stats({ target, suffix, label, icon: Icon }) {
  const elementId = `stat-${target}-${suffix}`;

  useCountUp({
    ref: elementId,
    end: target,
    suffix,
    duration: 1.6,
    enableScrollSpy: true,
    scrollSpyOnce: true,
  });

  return (
    <div className="group relative flex items-center gap-5 overflow-hidden rounded-sm border border-border bg-background p-6">
      <CornerBrackets />
      <span
        aria-hidden="true"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border text-copper transition-colors duration-300 group-hover:border-copper group-hover:bg-copper group-hover:text-background"
      >
        <Icon size={16} aria-hidden="true" focusable="false" />
      </span>
      <div className="flex flex-1 items-baseline justify-between gap-4">
        <span
          id={elementId}
          aria-hidden="true"
          className="font-display text-4xl tracking-tight tabular-nums md:text-5xl"
        />
        <span className="max-w-[7rem] text-right font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
        <span className="sr-only">
          {target}
          {suffix} {label}
        </span>
      </div>
    </div>
  );
}

export default function GlobalPresence() {
  // idx counts up indefinitely — it is NOT wrapped with `% STATES.length`.
  // Wrapping it caused the transform to occasionally jump backward
  // mid-animation, which read as the list "looping" after only a few
  // items instead of scrolling smoothly through all 28 states.
  const [idx, setIdx] = useState(0);
  const [animate, setAnimate] = useState(true);
  const snapTimeout = useRef(null);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => i + 1);
    }, 1800);
    return () => clearInterval(t);
  }, []);

  // Once we've scrolled onto the appended duplicate of STATES[0], wait for
  // that transition to finish, disable the transition for one frame, and
  // reset idx back to 0 — visually seamless since the duplicate is a copy
  // of the real first item, so the reset is imperceptible.
  useEffect(() => {
    if (idx === STATES.length) {
      snapTimeout.current = setTimeout(() => {
        setAnimate(false);
        setIdx(0);
      }, TRANSITION_MS);
      return () => clearTimeout(snapTimeout.current);
    }
    if (!animate) {
      const raf = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [idx, animate]);

  const containerHeight = ROW_HEIGHT_REM * VISIBLE_ROWS;
  const centerOffset = ROW_HEIGHT_REM * Math.floor(VISIBLE_ROWS / 2);
  // Which real state (0..27) should be styled as "active" — derived from
  // idx, decoupled from the raw (unwrapped) scroll position.
  const highlightIdx = idx % STATES.length;
  const indexLabel = String(highlightIdx + 1).padStart(2, "0");
  const totalLabel = String(STATES.length).padStart(2, "0");

  return (
    <section
      id="global-presence"
      aria-labelledby="global-presence-heading"
      className="relative isolate overflow-hidden border-t border-border bg-cream-alt py-20 md:py-32"
    >
      {/* Faint blueprint grid — ambient, low-contrast, ties the section to
          a drafting sheet without competing with content. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[420px] overflow-hidden md:h-[560px]"
      >
        <WorldMapDots className="absolute left-1/2 top-0 w-[140%] max-w-none -translate-x-1/2 text-copper/25" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top, transparent 30%, var(--cream-alt) 80%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative">
          <div className="pointer-events-none absolute -inset-x-6 -inset-y-6 -z-10 rounded-[3rem] bg-cream-alt/80 blur-2xl sm:-inset-x-10" aria-hidden="true" />
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <Reveal>
                <span className="label-caps text-copper">— Presence Across India</span>
              </Reveal>
              <Reveal delay={80}>
                <h2
                  id="global-presence-heading"
                  className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight md:text-6xl"
                >
                  Building across <em className="text-copper">every state</em>.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <p className="max-w-md text-muted-foreground md:justify-self-end">
                From our studio in Siliguri, West Bengal, we deliver considered
                architecture across every state in India, wherever our clients
                are building.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-[1.2fr_1fr] lg:gap-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-sm border border-border bg-background p-8 shadow-sm md:p-10">
              <CornerBrackets />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-3 border border-border/40"
              />
              <div aria-hidden="true" className="dot-grid absolute inset-0 text-foreground/40" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <p className="label-caps flex items-center gap-2 text-muted-foreground">
                    <span aria-hidden="true" className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-copper" />
                    </span>
                    Currently active in
                  </p>
                  <span aria-hidden="true" className="font-mono text-xs tabular-nums tracking-[0.1em] text-muted-foreground">
                    <span className="text-copper">{indexLabel}</span> / {totalLabel}
                  </span>
                </div>

                {/* Live-region fallback: the scroller below is hidden from
                    assistive tech (it's a fast-cycling decorative marquee —
                    reading every transiting state name aloud would be
                    unusable), so this visually-hidden node is the actual
                    accessible source of truth for "which state is active
                    now", updating in step with the visual highlight. */}
                <p aria-live="polite" className="sr-only">
                  Currently active in {STATES[highlightIdx]}
                </p>

                {/* Centered auto-scrolling state picker */}
                <div
                  aria-hidden="true"
                  className="relative mt-6 overflow-hidden"
                  style={{
                    height: `${containerHeight}rem`,
                    WebkitMaskImage:
                      "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
                    maskImage:
                      "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
                  }}
                >
                  {/* Flanking dimension lines either side of the centered
                      item. The center gap is sized off the longest name in
                      STATES so it never clips a long name. */}
                  <div
                    className="pointer-events-none absolute inset-x-0 z-10 flex items-center justify-center gap-4 px-2 sm:gap-6"
                    style={{
                      top: `${centerOffset}rem`,
                      height: `${ROW_HEIGHT_REM}rem`,
                    }}
                  >
                    <span className="min-w-[12px] flex-1">
                      <DimensionLine side="left" />
                    </span>
                    <span
                      className="shrink-0"
                      style={{ width: `${LONGEST_NAME_CH}ch`, maxWidth: "70%" }}
                    />
                    <span className="min-w-[12px] flex-1">
                      <DimensionLine side="right" />
                    </span>
                  </div>

                  <div
                    className={animate ? "transition-transform duration-700 ease-out" : ""}
                    style={{
                      transform: `translateY(-${idx * ROW_HEIGHT_REM - centerOffset}rem)`,
                    }}
                  >
                    {DISPLAY_STATES.map((s, i) => (
                      <div
                        key={`${s}-${i}`}
                        className="flex items-center justify-center px-3 font-display tracking-tight transition-all duration-500"
                        style={{ height: `${ROW_HEIGHT_REM}rem` }}
                      >
                        <span
                          className={`whitespace-nowrap ${NAME_SIZE_CLASS} transition-all duration-500 ${
                            i % STATES.length === highlightIdx
                              ? "scale-100 text-copper opacity-100"
                              : "scale-90 text-muted-foreground/50 opacity-60"
                          }`}
                        >
                          {s}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <ul aria-label="Key statistics" className="grid list-none gap-4 p-0 m-0">
            {STATS.map((s, i) => (
              <li key={s.label}>
                <Reveal delay={i * 60}>
                  <Stats target={s.target} suffix={s.suffix} label={s.label} icon={s.icon} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}