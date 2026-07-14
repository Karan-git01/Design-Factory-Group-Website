import { usePageMeta } from "../hooks/usePageMeta";
import { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";
import ProjectCard from "../components/ProjectCard";

const FILTERS = ["All", "Ongoing", "Completed"];

export default function Projects() {
  usePageMeta(
    "Projects",
    "Explore ongoing and completed residential and commercial projects by Design Factory Group.",
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
    <main className="min-h-screen bg-ink px-6 pt-32 pb-24 sm:px-12">
      <h1 className="font-display mb-4 text-5xl font-medium text-surface sm:text-6xl">
        Our Projects
      </h1>
      <p className="mb-12 max-w-xl text-secondary-light">
        A look at the residential and commercial work we've delivered, and
        what's currently underway.
      </p>

      <div className="mb-12 flex gap-3">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-6 py-2 text-sm font-medium transition ${
              filter === f
                ? "bg-primary text-surface"
                : "border border-secondary/30 text-secondary-light hover:border-primary"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-96 animate-pulse rounded-3xl bg-secondary/20"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="text-secondary-light">
          Couldn't load projects right now. Please try again shortly.
        </p>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p className="text-secondary-light">
          No {filter !== "All" ? filter.toLowerCase() : ""} projects to show
          right now.
        </p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </main>
  );
}