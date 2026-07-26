import { useEffect, useState } from "react";
import { useCountUp } from "react-countup";
import { Globe, Users, Maximize2 } from "lucide-react";
import { Reveal } from "../components/Reveal";
import WorldMapDots from "./WorldMapDots";

const COUNTRIES = ["India", "UAE", "USA", "UK", "Singapore", "Australia"];

const STATS = [
  { target: 17, suffix: "", label: "Countries Worldwide", icon: Globe },
  { target: 260, suffix: "+", label: "Clients Served", icon: Users },
  { target: 850, suffix: "K+", label: "Total Area Delivered", icon: Maximize2 },
];

const ROW_HEIGHT_REM = 4;
const VISIBLE_ROWS = 3;

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
    <div className="card-lift group flex items-center justify-between gap-4 rounded-3xl border border-border bg-background p-6 transition-colors duration-300 hover:border-copper">
      <div className="flex items-center gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-copper transition-colors duration-300 group-hover:border-copper group-hover:bg-copper group-hover:text-background">
          <Icon size={16} />
        </span>
        <span
          id={elementId}
          className="font-display text-4xl tracking-tight tabular-nums md:text-5xl"
        />
      </div>
      <span className="max-w-[8rem] text-right text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

// Ornamental flanking line — a solid line broken into two segments with
// clear space around a center dot, so nothing touches or overlaps.
function OrnamentLine() {
  return (
    <svg
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
      className="h-1.5 w-full text-copper/70"
      aria-hidden
    >
      <line x1="0" y1="4" x2="38" y2="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="4" r="2.5" fill="currentColor" />
      <line x1="62" y1="4" x2="100" y2="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function GlobalPresence() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % COUNTRIES.length), 1800);
    return () => clearInterval(t);
  }, []);

  const containerHeight = ROW_HEIGHT_REM * VISIBLE_ROWS;
  const centerOffset = ROW_HEIGHT_REM * Math.floor(VISIBLE_ROWS / 2);

  return (
    <section className="relative isolate overflow-hidden border-t border-border bg-cream-alt py-20 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[420px] overflow-hidden md:h-[560px]">
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
          <div className="pointer-events-none absolute -inset-x-6 -inset-y-6 -z-10 rounded-[3rem] bg-cream-alt/80 blur-2xl sm:-inset-x-10" />
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <Reveal>
                <span className="label-caps text-copper">— Global Presence</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
                  Building across <em className="text-copper">multiple countries</em>.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <p className="max-w-md text-muted-foreground md:justify-self-end">
                From private residences to large-scale developments, our studio delivers
                considered architecture wherever our clients are building.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-[1.2fr_1fr] lg:gap-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-background p-8 md:p-10">
              <div className="dot-grid absolute inset-0 text-foreground/40" />
              <div className="relative">
                <p className="label-caps flex items-center gap-2 text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-copper" />
                  </span>
                  Currently active in
                </p>

                {/* Centered auto-scrolling country picker */}
                <div
                  className="relative mt-6 overflow-hidden"
                  style={{
                    height: `${containerHeight}rem`,
                    WebkitMaskImage:
                      "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
                    maskImage:
                      "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
                  }}
                >
                  {/* Flanking ornamental SVG lines either side of the centered item */}
                  <div
                    className="pointer-events-none absolute inset-x-0 z-10 flex items-center justify-center gap-3 sm:gap-4"
                    style={{
                      top: `${centerOffset}rem`,
                      height: `${ROW_HEIGHT_REM}rem`,
                    }}
                  >
                    <span className="max-w-[64px] flex-1 sm:max-w-[80px] mx-10">
                      <OrnamentLine />
                    </span>
                    <span className="w-24 shrink-0 sm:w-28" />
                    <span className="max-w-[64px] flex-1 sm:max-w-[80px] mx-10">
                      <OrnamentLine />
                    </span>
                  </div>

                  <div
                    className="transition-transform duration-700 ease-out"
                    style={{
                      transform: `translateY(-${idx * ROW_HEIGHT_REM - centerOffset}rem)`,
                    }}
                  >
                    {COUNTRIES.map((c, i) => (
                      <div
                        key={c}
                        className="flex items-center justify-center font-display tracking-tight transition-all duration-500"
                        style={{ height: `${ROW_HEIGHT_REM}rem` }}
                      >
                        <span
                          className={`text-2xl md:text-3xl transition-all duration-500 ${
                            i === idx
                              ? "text-copper opacity-100 scale-100"
                              : "text-muted-foreground/50 opacity-60 scale-90"
                          }`}
                        >
                          {c}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 60}>
                <Stats target={s.target} suffix={s.suffix} label={s.label} icon={s.icon} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}




