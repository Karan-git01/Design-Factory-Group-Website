import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../context/ApiContext";
import ProjectCard from "./ProjectCard";

export default function ProjectsTimeline() {
  const api = useApi();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/projects?limit=5")
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [api]);

  return (
    <section className="bg-ink px-6 py-24 sm:px-12">
      <div className="mb-12 flex items-end justify-between">
        <h2 className="font-display text-4xl font-medium text-surface sm:text-5xl">
          Premium projects made by{" "}
          <span className="text-primary">Design Factory Group</span>
        </h2>
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
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

      {!loading && !error && projects.length === 0 && (
        <p className="text-secondary-light">
          No projects to show yet — check back soon.
        </p>
      )}

      {!loading && !error && projects.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/projects"
              className="inline-block rounded-full bg-surface px-10 py-4 text-base font-medium text-ink transition hover:bg-primary hover:text-surface"
            >
              View more
            </Link>
          </div>
        </>
      )}
    </section>
  );
}