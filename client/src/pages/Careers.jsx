import { usePageMeta } from "../hooks/usePageMeta";
import { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";
import JobCard from "../components/JobCard";

export default function Careers() {
  usePageMeta("Careers", "Explore current job openings at Design Factory Group.");

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
    <main className="min-h-screen border-t border-secondary/20 bg-ink pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px w-14 bg-primary" />
          <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-secondary-light">
            Careers
          </span>
        </div>

        <div className="mb-20 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <h1 className="font-display text-5xl font-light leading-[0.92] tracking-[-0.05em] text-surface sm:text-6xl lg:text-7xl">
              Build spaces.
              <br />
              <span className="text-primary">Build your career.</span>
            </h1>
          </div>
          <p className="max-w-md text-base leading-8 text-secondary-light">
            Join Design Factory Group and collaborate with architects,
            engineers, designers and construction professionals creating
            thoughtful residential and commercial spaces.
          </p>
        </div>

        {loading && (
          <div className="flex flex-col gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-[2rem] border border-secondary/20 bg-ink-light"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-[2rem] border border-red-500/20 bg-red-500/5 px-8 py-10 text-center">
            <p className="text-secondary-light">
              Couldn't load job listings right now. Please try again shortly.
            </p>
          </div>
        )}

        {!loading && !error && jobs.length === 0 && (
          <div className="rounded-[2rem] border border-secondary/20 bg-ink-light px-8 py-10 text-center">
            <p className="text-secondary-light">
              No open positions right now — check back soon.
            </p>
          </div>
        )}

        {!loading && !error && jobs.length > 0 && (
          <div className="flex flex-col gap-8">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}