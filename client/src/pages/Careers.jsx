import { usePageMeta } from "../hooks/usePageMeta";
import { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";
import JobCard from "../components/JobCard";

export default function Careers() {
  usePageMeta(
    "Careers",
    "Explore current job openings at Design Factory Group.",
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
    <main className="min-h-screen bg-ink px-6 pt-32 pb-24 sm:px-12">
      <h1 className="font-display mb-4 text-5xl font-medium text-surface sm:text-6xl">
        Careers
      </h1>
      <p className="mb-12 max-w-xl text-secondary-light">
        Join the Design Factory Group team. Reach out directly using the
        contact details on any open role below.
      </p>

      {loading && (
        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-3xl bg-secondary/20"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="text-secondary-light">
          Couldn't load job listings right now. Please try again shortly.
        </p>
      )}

      {!loading && !error && jobs.length === 0 && (
        <p className="text-secondary-light">
          No open positions right now — check back soon.
        </p>
      )}

      {!loading && !error && jobs.length > 0 && (
        <div className="flex flex-col gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </main>
  );
}