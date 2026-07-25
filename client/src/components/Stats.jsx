import { useEffect, useState } from "react";
import { useCountUp } from "react-countup";
import { Reveal } from "../components/Reveal";
import WorldMapDots from "./WorldMapDots";

const COUNTRIES = ["India", "UAE", "USA", "UK", "Singapore", "Australia"];

const STATS = [
  { target: 17, suffix: "", label: "Countries Worldwide" },
  { target: 260, suffix: "+", label: "Clients Served" },
  { target: 850, suffix: "K+", label: "Total Area Delivered" },
];

function Stats({ target, suffix, label }) {
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
    <div className="card-lift flex items-baseline justify-between rounded-3xl border border-border bg-background p-7">
      <span
        id={elementId}
        className="font-display text-5xl tracking-tight tabular-nums md:text-6xl"
      />
      <span className="max-w-[10rem] text-right text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

export default function GlobalPresence() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % COUNTRIES.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden border-t border-border bg-cream-alt py-20 md:py-32">
      <WorldMapDots className="pointer-events-none absolute left-1/2 top-1/2 w-[140%] max-w-none -translate-x-1/2 -translate-y-1/2 text-copper/25" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, var(--cream-alt) 80%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <span className="label-caps text-copper">— Global Presence</span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
            Building across <em className="text-copper">multiple countries</em>.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-[1.2fr_1fr] lg:gap-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-background p-8 md:p-10">
              <div className="dot-grid absolute inset-0 text-foreground/40" />
              <div className="relative">
                <p className="label-caps text-muted-foreground">Currently active in</p>
                <div className="mt-6 h-40 overflow-hidden">
                  <div
                    className="transition-transform duration-700 ease-out"
                    style={{ transform: `translateY(-${idx * 3}rem)` }}
                  >
                    {COUNTRIES.map((c) => (
                      <div
                        key={c}
                        className="flex h-12 items-center font-display text-3xl tracking-tight md:text-4xl"
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex gap-1">
                  {COUNTRIES.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 flex-1 rounded-full ${
                        i === idx ? "bg-copper" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 60}>
                <Stats target={s.target} suffix={s.suffix} label={s.label} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}






// import { motion } from "framer-motion";

// const COUNTRIES = ["India", "UAE", "USA", "UK", "Singapore", "Australia"];

// const STATS = [
//   { value: "17", label: "Countries Worldwide" },
//   { value: "260+", label: "Clients Served" },
//   { value: "850K+", label: "Total Area Delivered" },
// ];

// export default function Stats() {
//   const loopedCountries = [...COUNTRIES, ...COUNTRIES];

//   return (
//     <section className="border-t border-secondary/20 bg-ink">
//       <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 md:px-12 lg:px-16 xl:px-20 xl:py-28">
//         <div className="mb-14">
//           <div className="mb-6 flex items-center gap-4">
//             <div className="h-px w-14 bg-primary" />
//             <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-secondary-light">
//               Global Presence
//             </span>
//           </div>
//           <h2 className="font-display max-w-4xl text-4xl font-light leading-[0.95] tracking-[-0.04em] text-surface sm:text-5xl lg:text-6xl">
//             Building across
//             <span className="text-primary"> multiple countries</span>
//           </h2>
//         </div>

//         <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
//           <div className="relative overflow-hidden rounded-[2rem] border border-secondary/20 bg-ink-light">
//             <div className="flex h-[420px] items-center justify-center">
//               <motion.div
//                 className="flex flex-col items-center"
//                 animate={{ y: ["0%", "-50%"] }}
//                 transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
//               >
//                 {loopedCountries.map((country, i) => (
//                   <div key={`${country}-${i}`} className="py-5">
//                     <h3 className="font-display text-3xl font-light tracking-[-0.03em] text-secondary-light transition duration-300 hover:text-surface sm:text-4xl">
//                       {country}
//                     </h3>
//                   </div>
//                 ))}
//               </motion.div>
//             </div>

//             <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink-light to-transparent" />
//             <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-light to-transparent" />
//           </div>

//           <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
//             {STATS.map((stat) => (
//               <div
//                 key={stat.label}
//                 className="group rounded-[2rem] border border-secondary/20 bg-ink-light p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
//               >
//                 <div className="mb-6 flex items-center justify-between">
//                   <div className="h-px w-10 bg-primary transition-all duration-300 group-hover:w-16" />
//                   <div className="flex h-10 w-10 items-center justify-center rounded-full border border-secondary/20 text-secondary-light transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-ink">
//                     ↗
//                   </div>
//                 </div>
//                 <h3 className="font-display text-5xl font-light tracking-[-0.05em] text-surface lg:text-6xl">
//                   {stat.value}
//                 </h3>
//                 <p className="mt-4 text-sm uppercase tracking-[0.25em] text-secondary-light">
//                   {stat.label}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }