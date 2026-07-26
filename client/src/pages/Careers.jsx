import { usePageMeta } from "../hooks/usePageMeta";
import { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";
import JobCard from "../components/JobCard";
import { Reveal } from "../components/Reveal";

export default function Careers() {
  usePageMeta(
    "Careers — Design Factory Group",
    "Open roles at Design Factory Group. Architecture, interiors and construction talent, worldwide."
  );

  const api = useApi();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/careers")
      .then(setJobs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [api]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
      <Reveal>
        <span className="label-caps text-copper">— Careers</span>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
          Build spaces. <em className="text-copper">Build your career</em>.
        </h1>
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-6 max-w-xl text-muted-foreground">
          Join Design Factory Group and collaborate with architects, engineers, designers
          and construction professionals creating thoughtful residential and commercial spaces.
        </p>
      </Reveal>

      {loading && (
        <div className="mt-14 grid gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-3xl border border-border bg-card"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="mt-16 rounded-3xl border border-destructive/20 bg-destructive/5 p-12 text-center">
          <p className="text-muted-foreground">
            Couldn't load job listings right now. Please try again shortly.
          </p>
        </div>
      )}

      {!loading && !error && jobs.length === 0 && (
        <div className="mt-16 rounded-3xl border border-dashed border-border bg-cream-alt p-12 text-center">
          <p className="font-display text-2xl">No open positions right now</p>
          <p className="mt-2 text-sm text-muted-foreground">Check back soon.</p>
        </div>
      )}

      {!loading && !error && jobs.length > 0 && (
        <div className="mt-14 grid gap-6">
          {jobs.map((job, i) => (
            <Reveal key={job._id} delay={i * 40}>
              <JobCard job={job} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}













