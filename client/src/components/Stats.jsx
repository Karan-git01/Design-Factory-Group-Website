import { motion } from "framer-motion";

const COUNTRIES = ["India", "UAE", "USA", "UK", "Singapore", "Australia"];

const STATS = [
  { value: "17", label: "Countries Worldwide" },
  { value: "260+", label: "Clients Served" },
  { value: "850K+", label: "Total Area Delivered" },
];

export default function Stats() {
  const loopedCountries = [...COUNTRIES, ...COUNTRIES];

  return (
    <section className="border-t border-secondary/20 bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 md:px-12 lg:px-16 xl:px-20 xl:py-28">
        <div className="mb-14">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-14 bg-primary" />
            <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-secondary-light">
              Global Presence
            </span>
          </div>
          <h2 className="font-display max-w-4xl text-4xl font-light leading-[0.95] tracking-[-0.04em] text-surface sm:text-5xl lg:text-6xl">
            Building across
            <span className="text-primary"> multiple countries</span>
          </h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-secondary/20 bg-ink-light">
            <div className="flex h-[420px] items-center justify-center">
              <motion.div
                className="flex flex-col items-center"
                animate={{ y: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
              >
                {loopedCountries.map((country, i) => (
                  <div key={`${country}-${i}`} className="py-5">
                    <h3 className="font-display text-3xl font-light tracking-[-0.03em] text-secondary-light transition duration-300 hover:text-surface sm:text-4xl">
                      {country}
                    </h3>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink-light to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-light to-transparent" />
          </div>

          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="group rounded-[2rem] border border-secondary/20 bg-ink-light p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="h-px w-10 bg-primary transition-all duration-300 group-hover:w-16" />
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-secondary/20 text-secondary-light transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-ink">
                    ↗
                  </div>
                </div>
                <h3 className="font-display text-5xl font-light tracking-[-0.05em] text-surface lg:text-6xl">
                  {stat.value}
                </h3>
                <p className="mt-4 text-sm uppercase tracking-[0.25em] text-secondary-light">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}