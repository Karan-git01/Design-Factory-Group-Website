import { usePageMeta } from "../hooks/usePageMeta";
import { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";
import ProjectCard from "../components/ProjectCard";
import { Reveal } from "../components/Reveal";

const FILTERS = ["All", "Ongoing", "Completed"];

export default function Projects() {
  usePageMeta(
    "Projects — Design Factory Group",
    "Selected residential projects from Design Factory Group — completed and ongoing across 17 countries."
  );

  const api = useApi();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    api
      .get("/projects")
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [api]);

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.status === filter);

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
      <Reveal>
        <span className="label-caps text-copper">— Portfolio</span>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
          Our <em className="text-copper">Projects</em>.
        </h1>
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-6 max-w-xl text-muted-foreground">
          A curated selection of residential and commercial projects that showcase our
          approach to architecture, construction and thoughtful execution.
        </p>
      </Reveal>

      <div className="mt-10 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-5 py-2 label-caps transition ${
              filter === f
                ? "border-transparent bg-foreground text-background"
                : "border-border bg-card text-foreground/80 hover:border-foreground/40"
            }`}
          >
            {f}
          </button>
        ))}
        {!loading && !error && (
          <span className="ml-auto label-caps text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          </span>
        )}
      </div>

      {loading && (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-[400px] animate-pulse rounded-3xl border border-border bg-card"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="mt-16 rounded-3xl border border-destructive/20 bg-destructive/5 p-12 text-center">
          <p className="text-muted-foreground">
            Couldn't load projects right now. Please try again shortly.
          </p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="mt-16 rounded-3xl border border-dashed border-border bg-cream-alt p-12 text-center">
          <p className="font-display text-2xl">No projects to show</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try switching filters — more work coming soon.
          </p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {filtered.map((project, i) => (
            <Reveal key={project._id} delay={i * 40}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}