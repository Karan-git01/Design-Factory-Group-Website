import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";

// Same three-tower mark as Header.jsx's <Logo />, rebuilt with motion.path
// so each tower draws itself in on load instead of appearing as a static
// image. Guide lines (the thin construction-line accents) stroke on first,
// then each tower is drawn as its own individual strokes — roof+side, left
// side, base — one after another, rather than one path animating all at
// once. Towers stroke on in sequence — red, blue, black.
//
// A single stroke segment, drawn in with a small glowing tip that travels
// along the actual path geometry as it draws. Defined at module scope (not
// inside AnimatedLogo) so it's a stable component identity across renders —
// otherwise React would remount it, and its draw animation, on every
// re-render of the parent.
function Stroke({ d, color, delay, duration, reduceMotion }) {
  const pathRef = useRef(null);
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const dotOpacity = useMotionValue(0);
  // FIX: pathLength is now a single motion value that both the visible
  // stroke (via `style`) and the dot-position calculation (via `onUpdate`)
  // read from. Previously the stroke was drawn by Framer's declarative
  // `animate={{ pathLength: 1 }}` (cubic-bezier(0.22,1,0.36,1)) while the
  // dot was positioned by a separate hand-rolled rAF loop using a
  // different easing formula (1 - (1-v)^3) — same delay/duration, but a
  // different curve, so the dot visibly drifted from the actual tip of
  // the drawing stroke. Driving both from one value makes them sync by
  // construction instead of by matching two independent formulas.
  const pathLength = useMotionValue(0);
  const startDelay = reduceMotion ? 0 : delay;
  const dur = reduceMotion ? 0 : duration;

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    if (reduceMotion) {
      pathLength.set(1);
      return;
    }

    const controls = animate(pathLength, 1, {
      delay: startDelay,
      duration: dur,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        const length = path.getTotalLength();
        const point = path.getPointAtLength(v * length);
        dotX.set(point.x);
        dotY.set(point.y);
        dotOpacity.set(v > 0.03 && v < 0.97 ? 1 : 0);
      },
      onComplete: () => dotOpacity.set(0),
    });

    return () => controls.stop();
  }, [reduceMotion, startDelay, dur, pathLength, dotX, dotY, dotOpacity]);

  return (
    <>
      <motion.path
        ref={pathRef}
        d={d}
        stroke={color}
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{ pathLength }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: startDelay, duration: dur, ease: [0.22, 1, 0.36, 1] }}
      />
      {!reduceMotion && (
        <motion.circle r="12" fill={color} style={{ cx: dotX, cy: dotY, opacity: dotOpacity }} />
      )}
    </>
  );
}

// Renders one tower as three separate strokes, staggered so each line
// segment visibly draws in after the last completes.
function Tower({ segments, color, delay, reduceMotion }) {
  const strokeDuration = 0.25;
  const strokeStagger = 0.12;
  return (
    <>
      {segments.map((d, i) => (
        <Stroke
          key={i}
          d={d}
          color={color}
          delay={delay + i * strokeStagger}
          duration={strokeDuration}
          reduceMotion={reduceMotion}
        />
      ))}
    </>
  );
}

function AnimatedLogo({ reduceMotion }) {
  const guideLine = (d, delay) => (
    <motion.path
      d={d}
      stroke="#a8a8a8"
      strokeWidth="4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ delay: reduceMotion ? 0 : delay, duration: reduceMotion ? 0 : 0.15, ease: "easeOut" }}
    />
  );

  return (
    <svg
      viewBox="0 0 512 577"
      className="h-16 w-16 sm:h-20 sm:w-20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* red tower */}
        {guideLine("M102,220 L77,206", 0)}
        {guideLine("M102,220 L102,188", 0)}
        {guideLine("M245,299 L270,313", 0)}
        {guideLine("M245,299 L245,267", 0)}
        <Tower
          segments={["M102,220 L245,299 L245,568", "M102,220 L102,568", "M102,568 L245,568"]}
          color="#e6120a"
          delay={0.05}
          reduceMotion={reduceMotion}
        />

        {/* blue tower */}
        {guideLine("M331,422 L306,436", 0.45)}
        {guideLine("M331,422 L331,390", 0.45)}
        {guideLine("M478,338 L503,324", 0.45)}
        {guideLine("M478,338 L478,311", 0.45)}
        {guideLine("M478,568 L511,568", 0.45)}
        <Tower
          segments={["M331,422 L478,338 L478,568", "M331,422 L331,568", "M331,568 L478,568"]}
          color="#0d0dc9"
          delay={0.55}
          reduceMotion={reduceMotion}
        />

        {/* black tower */}
        {guideLine("M195,54 L171,38", 0.95)}
        {guideLine("M195,54 L195,22", 0.95)}
        {guideLine("M393,185 L417,201", 0.95)}
        {guideLine("M393,185 L393,154", 0.95)}
        <Tower
          segments={["M195,54 L393,185 L393,568", "M195,54 L195,568", "M195,568 L393,568"]}
          color="#000000"
          delay={1.05}
          reduceMotion={reduceMotion}
        />
      </g>
    </svg>
  );
}

/** Ticks 0 → 100% once while the mark draws in. */
function Counter({ reduceMotion, active }) {
  const [value, setValue] = useState(reduceMotion ? 100 : 0);

  useEffect(() => {
    if (reduceMotion || !active) return;
    const duration = 1500;
    let raf;
    let start;
    const tick = (t) => {
      if (start === undefined) start = t;
      const progress = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * 100));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, active]);

  return (
    <span className="tabular-nums">
      {value}%
    </span>
  );
}

export default function SplashScreen({ show }) {
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Design Factory Group is loading"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background accent — decorative only */}
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper/10 blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatedLogo reduceMotion={reduceMotion} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduceMotion ? 0 : 0.5, duration: reduceMotion ? 0 : 0.5 }}
              className="mt-6 text-[11px] uppercase tracking-[0.45em] text-muted-foreground"
            >
              Design Factory Group
            </motion.p>

            {/* Loading line + percentage — decorative only, the accessible status is on the root */}
            <div className="mt-14 flex items-center gap-4" aria-hidden="true">
              <div className="h-px w-52 overflow-hidden bg-border">
                <motion.div
                  className="h-full origin-left bg-copper"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: reduceMotion ? 0 : 1.5,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                />
              </div>
              <span className="text-[10px] tracking-[0.2em] text-muted-foreground">
                <Counter reduceMotion={reduceMotion} active={show} />
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}