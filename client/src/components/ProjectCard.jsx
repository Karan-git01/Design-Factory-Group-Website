import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";

export default function ProjectCard({ project }) {
  const visibleScope = project.scope?.slice(0, 3) || [];
  const extraScope = (project.scope?.length || 0) - visibleScope.length;

  const imageAlt = project.location
    ? `${project.name} — a ${project.location} project by Design Factory Group`
    : `${project.name} — a project by Design Factory Group`;

  return (
    // FIX: without an aria-label, this link's accessible name is the
    // concatenation of everything inside it — status badge, year, name,
    // location, description, and every scope tag — read out as one blob
    // to screen reader users. A concise label keeps the rich visual card
    // but gives assistive tech a clean, predictable name.
    <Link
      to={`/projects/${project._id}`}
      className="group block"
      aria-label={`View ${project.name}${
        project.location ? `, ${project.location}` : ""
      } project`}
    >
      {/*
        <article>: each card is a self-contained, independently
        distributable piece of content (one project entry) — the
        appropriate semantic wrapper for a list of project summaries,
        and it pairs with the ItemList/ListItem JSON-LD emitted on the
        Projects page.
      */}
      <article>
        <div className="img-zoom relative overflow-hidden rounded-sm border border-border bg-card transition-colors duration-300 group-hover:border-copper/40">
          <div className="aspect-[4/3] w-full">
            <img
              src={project.imageUrl}
              alt={imageAlt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="absolute left-3 top-3 flex items-center gap-2">
            <span
              className={`label-caps flex items-center gap-1.5 rounded-sm px-2.5 py-1 shadow-sm backdrop-blur ${
                project.status === "Ongoing"
                  ? "bg-copper/90 text-primary-foreground"
                  : "bg-background/90 text-foreground"
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${
                  project.status === "Ongoing" ? "bg-primary-foreground" : "bg-copper"
                }`}
              />
              {project.status}
            </span>
            {project.year && (
              <span className="label-caps rounded-sm bg-background/90 px-2.5 py-1 text-foreground shadow-sm backdrop-blur">
                <time dateTime={String(project.year)}>{project.year}</time>
              </span>
            )}
          </div>

          <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-sm bg-background/90 text-foreground opacity-0 shadow-sm backdrop-blur transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight size={16} aria-hidden="true" focusable="false" />
          </span>
        </div>

        <div className="px-1">
          <div className="mt-5 flex items-start justify-between gap-6">
            <div>
              <h3 className="relative inline-block pb-1.5 font-display text-2xl tracking-tight md:text-3xl">
                {project.name}
                <span className="absolute inset-x-0 bottom-0 h-px bg-foreground/70" />
                <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-copper transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </h3>
              {project.location && (
                <p className="mt-1.5 flex items-center gap-1.5 label-caps text-muted-foreground">
                  <MapPin size={11} aria-hidden="true" focusable="false" className="text-copper" />
                  {project.location}
                </p>
              )}
            </div>
          </div>

          {project.description && (
            <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          )}

          {visibleScope.length > 0 && (
            <ul
              aria-label="Project scope"
              className="mt-4 flex list-none flex-wrap items-center gap-2 p-0 m-0"
            >
              {visibleScope.map((s) => (
                <li
                  key={s}
                  className="rounded-sm border border-border px-2.5 py-1 text-xs text-foreground/80"
                >
                  {s}
                </li>
              ))}
              {extraScope > 0 && (
                <li className="rounded-sm border border-dashed border-border px-2.5 py-1 text-xs text-muted-foreground">
                  +{extraScope} more
                </li>
              )}
            </ul>
          )}
        </div>
      </article>
    </Link>
  );
}