import { motion } from "framer-motion";

const COUNTRIES = ["India", "UAE", "USA", "UK", "Singapore", "Australia"];

const STATS = [
  { value: "17", label: "Countries Worldwide" },
  { value: "260+", label: "Clients Served" },
  { value: "850K+", label: "Total Area Delivered" },
];

export default function Stats() {
  // Duplicate the list so the loop can restart seamlessly with no visible gap/jump
  const loopedCountries = [...COUNTRIES, ...COUNTRIES];

  return (
    <section className="bg-ink px-6 py-24 sm:px-12">
      <div className="relative mb-16 h-80 overflow-hidden rounded-3xl border border-secondary/30">
        {/* Scrolling content */}
        <motion.div
          className="flex flex-col items-center"
          animate={{ y: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 14,
            ease: "linear",
          }}
        >
          {loopedCountries.map((c, i) => (
            <p
              key={`${c}-${i}`}
              className="font-display py-4 text-3xl font-medium text-secondary-light transition hover:text-surface sm:text-4xl"
            >
              {c}
            </p>
          ))}
        </motion.div>

        {/* Vignette — fades the top and bottom edges to black so items disappear smoothly */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="grid grid-cols-1 divide-y divide-secondary/30 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col gap-2 py-6 text-center sm:py-0">
            <span className="font-display text-5xl font-medium text-surface">
              {s.value}
            </span>
            <span className="text-secondary-light">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}