import { useEffect, useState } from "react";
import { MapPin, AlertCircle } from "lucide-react";
import { useApi } from "../context/ApiContext";
import { Reveal } from "../components/Reveal";
import BranchCard from "./BranchCard";

function SkeletonCard() {
  return (
    <div aria-hidden="true" className="relative h-[420px] overflow-hidden rounded-sm border border-border bg-card">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-border/20 via-border/50 to-border/20" />
    </div>
  );
}

function StateCard({ icon: Icon, title, body }) {
  return (
    <div className="mt-12 flex flex-col items-center gap-3 rounded-sm border border-border bg-card px-8 py-16 text-center">
      <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full border border-copper/25 text-copper">
        <Icon size={18} aria-hidden="true" focusable="false" />
      </span>
      <p className="font-display text-lg tracking-tight">{title}</p>
      <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

export default function BranchesSection() {
  const api = useApi();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/branches")
      .then(setBranches)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [api]);

  return (
    <section id="branches" aria-labelledby="branches-heading" className="border-t border-border bg-cream-alt py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <Reveal>
              <span className="label-caps text-copper">— Our presence</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="branches-heading" className="mt-4 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                Our <em className="text-copper">branches</em>.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="flex flex-col items-start gap-3 border-t border-border pt-5 md:items-end md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-right">
                Visit one of our offices across Siliguri and India, and connect with our architecture, interior, and construction specialists.
              </p>
              {!loading && !error && branches.length > 0 && (
                <span className="font-display text-sm tracking-wide text-copper">
                  {String(branches.length).padStart(2, "0")} location
                  {branches.length === 1 ? "" : "s"}
                </span>
              )}
            </div>
          </Reveal>
        </div>

        {loading && (
          <div role="status" aria-live="polite" className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <span className="sr-only">Loading branches…</span>
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div role="alert">
            <StateCard
              icon={AlertCircle}
              title="Couldn't load branches"
              body="Something went wrong on our end — please refresh the page or try again shortly."
            />
          </div>
        )}

        {!loading && !error && branches.length === 0 && (
          <div role="status">
            <StateCard
              icon={MapPin}
              title="Branch information coming soon"
              body="We're setting up our locations here. Check back soon, or get in touch directly."
            />
          </div>
        )}

        {!loading && !error && branches.length > 0 && (
          <ul aria-label="Design Factory Group branch locations" className="mt-14 grid list-none gap-6 p-0 m-0 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {branches.map((branch, i) => (
              <li key={branch._id}>
                <Reveal delay={i * 70}>
                  <div className="group relative transition-transform duration-500 ease-out hover:-translate-y-1.5">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -left-3 -top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-copper/30 bg-background font-display text-xs text-copper shadow-sm transition-all duration-500 group-hover:border-copper group-hover:bg-copper group-hover:text-background"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <BranchCard branch={branch} />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}