import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useApi } from "../context/ApiContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { Reveal } from "../components/Reveal";

export default function ProjectDetail() {
  const { id } = useParams();
  const api = useApi();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  usePageMeta(project?.name, project?.description);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/projects/${id}`)
      .then(setProject)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [api, id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <p className="text-muted-foreground">Loading project...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="font-display text-5xl">Project not found</h1>
        <p className="mt-4 text-muted-foreground">
          This project may have been removed or the link is incorrect.
        </p>
        <Link
          to="/projects"
          className="btn-arrow mt-8 inline-flex items-center gap-2 label-caps text-copper"
        >
          <ArrowLeft size={14} /> Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <article className="relative pb-24">
      {/* Page-level background layer: drafting grid + two copper glows (one near the title, one lower
          near the image). This single full-width, overflow-hidden layer is a sibling to the content —
          it never wraps the sticky scope rail below, so sticky positioning stays intact. Because it
          spans edge-to-edge (inset-x-0) and clips its own contents, glows can bleed freely without
          ever pushing the page wider than the viewport. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1000px] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 70% 55% at 50% 0%, black 40%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 55% at 50% 0%, black 40%, transparent 85%)",
          }}
        />
        {/* Glow near the title */}
        <div
          className="absolute -top-32 left-[20%] h-[420px] w-[860px] -translate-x-1/2 rounded-full bg-copper/10 blur-[110px]"
          aria-hidden="true"
        />
        {/* Glow near the hero image, sitting lower and to the right */}
        <div
          className="absolute right-0 top-[14rem] h-[300px] w-[380px] translate-x-1/3 rounded-full bg-copper/20 blur-[100px]"
          aria-hidden="true"
        />
      </div>

      <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
        <Link
          to="/projects"
          className="btn-arrow inline-flex items-center gap-2 label-caps text-copper"
        >
          <ArrowLeft size={14} /> Back to Projects
        </Link>

        <Reveal delay={60}>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span
              className={`label-caps inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.25)] ${
                project.status === "Ongoing"
                  ? "bg-copper text-primary-foreground"
                  : "bg-foreground text-background"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  project.status === "Ongoing" ? "bg-primary-foreground" : "bg-copper"
                }`}
              />
              {project.status}
            </span>
            <span className="h-3 w-px bg-border" />
            <span className="label-caps text-muted-foreground">{project.year}</span>
            <span className="h-3 w-px bg-border" />
            <span className="label-caps text-muted-foreground">{project.location}</span>
          </div>
        </Reveal>

        <Reveal delay={110}>
          <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.02] tracking-tight md:text-7xl">
            {project.name}
          </h1>
        </Reveal>
      </div>

      <Reveal delay={160}>
        <div className="relative mx-auto mt-12 max-w-6xl px-5 sm:px-8">
          <div className="img-zoom relative overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.name}
              className="aspect-[16/8] w-full object-cover md:aspect-[21/9]"
            />
            <span className="pointer-events-none absolute left-0 top-0 h-7 w-7 border-l-2 border-t-2 border-copper" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-7 w-7 border-b-2 border-r-2 border-copper" />
          </div>
        </div>
      </Reveal>

      <div className="mx-auto mt-16 max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          {project.scope?.length > 0 && (
            <Reveal delay={100}>
              <div className="lg:sticky lg:top-24">
                <div className="flex items-center gap-2">
                  <span className="h-px w-4 bg-copper" />
                  <p className="label-caps text-muted-foreground">Scope</p>
                </div>
                <div className="mt-4 flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-2.5">
                  {project.scope.map((tag) => (
                    <span
                      key={tag}
                      className="w-fit rounded-sm border border-border px-2.5 py-1.5 text-sm text-foreground/80 transition-all hover:-translate-y-0.5 hover:border-copper/50 hover:shadow-[0_6px_16px_-6px_rgba(0,0,0,0.2)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          <Reveal delay={160}>
            <div className={project.scope?.length > 0 ? "lg:border-l lg:border-border lg:pl-16" : ""}>
              <p className="w-full max-w-none text-lg leading-relaxed text-foreground/85">
                {project.description}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}