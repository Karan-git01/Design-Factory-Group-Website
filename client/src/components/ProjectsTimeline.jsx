import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FolderOpen, TriangleAlert } from "lucide-react";
import { useApi } from "../context/ApiContext";
import { Reveal } from "../components/Reveal";
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
    <section className="border-t border-border bg-cream-alt py-16 sm:py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <span className="label-caps text-copper">— Selected work</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 font-display text-[2.25rem] leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
                Premium projects by <em className="text-copper">Design Factory Group</em>.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <Link
              to="/projects"
              className="group inline-flex w-fit items-center gap-4 rounded-full border border-copper/40 py-2 pl-6 pr-2 transition-colors duration-300 hover:border-copper"
            >
              <span className="label-caps text-foreground transition-colors duration-300 group-hover:text-copper">
                View all projects
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-copper text-background">
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 ease-out group-hover:-rotate-45"
                />
              </span>
            </Link>
          </Reveal>
        </div>

        {loading && (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded border border-border bg-card"
              >
                <div className="aspect-[4/3] w-full bg-muted" />
                <div className="space-y-3 p-6">
                  <div className="h-2.5 w-1/3 rounded-full bg-muted" />
                  <div className="h-4 w-2/3 rounded-full bg-muted" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mt-16 flex flex-col items-center gap-3 rounded border border-destructive/20 bg-destructive/5 p-12 text-center">
            <TriangleAlert size={22} className="text-destructive/70" />
            <p className="text-muted-foreground">
              Couldn't load projects right now. Please try again shortly.
            </p>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="mt-16 flex flex-col items-center gap-3 rounded border border-dashed border-border bg-cream-alt p-12 text-center">
            <FolderOpen size={22} className="text-muted-foreground/70" />
            <p className="font-display text-2xl">No projects to show</p>
            <p className="text-sm text-muted-foreground">
              Check back soon — more work is on the way.
            </p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {projects.map((project, i) => (
              <Reveal key={project._id} delay={i * 40}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}