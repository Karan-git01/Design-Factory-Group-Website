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
      .get("/projects?limit=5") // matches the "show first 5" requirement
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [api]);

  return (
    <section className="border-t border-secondary/20 bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 md:px-12 lg:px-16 xl:px-20 xl:py-28">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-14 bg-primary" />
              <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-secondary-light">
                Featured Projects
              </span>
            </div>
            <h2 className="font-display max-w-4xl text-4xl font-light leading-[0.95] tracking-[-0.04em] text-surface sm:text-5xl lg:text-6xl">
              Premium projects made by{" "}
              <span className="text-primary">Design Factory Group</span>
            </h2>
          </div>
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[420px] animate-pulse rounded-[2rem] border border-secondary/20 bg-ink-light"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-[2rem] border border-red-500/20 bg-red-500/5 px-8 py-10 text-center">
            <p className="text-secondary-light">
              Couldn't load projects right now. Please try again shortly.
            </p>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="rounded-[2rem] border border-secondary/20 bg-ink-light px-8 py-10 text-center">
            <p className="text-secondary-light">
              No projects to show yet — check back soon.
            </p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>

            <div className="mt-20 flex justify-center">
              <Link to="/projects" className="group inline-flex items-center gap-5">
                <span className="font-display text-lg font-light text-surface transition-colors duration-300 group-hover:text-primary">
                  View all projects
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary/30 transition-all duration-300 group-hover:border-primary">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-ink transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </div>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}