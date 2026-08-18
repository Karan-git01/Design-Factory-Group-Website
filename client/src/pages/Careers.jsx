import { usePageMeta } from "../hooks/usePageMeta";
import { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";
import JobCard from "../components/JobCard";
import { Reveal } from "../components/Reveal";

export default function Careers() {
  // FIX: was "Careers — Design Factory Group" — usePageMeta already
  // appends " | Design Factory Group" itself, so this produced
  // "Careers — Design Factory Group | Design Factory Group" in the
  // actual <title> tag (same bug fixed in BranchPage.jsx). Also added the
  // canonical path, matching the fix already applied there.
  usePageMeta(
    "Careers",
    "Open roles at Design Factory Group. Architecture, interiors and construction talent, worldwide.",
    "/careers"
  );

  const api = useApi();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // FIX: bumped to retry the fetch without a full page reload.
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    // FIX: guards against calling setState after this effect's component
    // has unmounted (e.g. user navigates away before the request resolves).
    let ignore = false;

    setLoading(true);
    setError(null);

    api
      .get("/careers")
      .then((data) => {
        if (!ignore) setJobs(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [api, retryToken]);

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

      {/* FIX: loading state previously had no accessible indication that
          content was being fetched — screen reader users would land on
          three unlabeled pulsing blocks with nothing announced. The
          pulse blocks stay aria-hidden (purely decorative); the sr-only
          text is what actually gets announced. */}
      {loading && (
        <div className="mt-14 grid gap-6" role="status" aria-live="polite">
          <span className="sr-only">Loading job listings…</span>
          <div aria-hidden="true" className="contents">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-3xl border border-border bg-card"
              />
            ))}
          </div>
        </div>
      )}

      {/* FIX: added role="alert" so a failed fetch is proactively
          announced to screen reader users instead of only being
          discoverable by browsing into this section. */}
      {!loading && error && (
        <div
          role="alert"
          className="mt-16 rounded-3xl border border-destructive/20 bg-destructive/5 p-12 text-center"
        >
          <p className="text-muted-foreground">
            Couldn't load job listings right now. Please try again shortly.
          </p>
          {/* FIX: previously no way to recover from this state short of a
              manual browser refresh. */}
          <button
            type="button"
            onClick={() => setRetryToken((n) => n + 1)}
            className="mt-4 label-caps text-copper link-grow"
          >
            Try again
          </button>
        </div>
      )}

      {/* FIX: added role="status" for the same reason as the loading
          state — this is a status message about the result of the fetch. */}
      {!loading && !error && jobs.length === 0 && (
        <div
          role="status"
          className="mt-16 rounded-3xl border border-dashed border-border bg-cream-alt p-12 text-center"
        >
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