import { usePageMeta } from "../hooks/usePageMeta";
import { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";
import ProjectCard from "../components/ProjectCard";
import { Reveal } from "../components/Reveal";

const FILTERS = ["All", "Ongoing", "Completed"];

export default function Projects() {
  // FIX: previously passed
  // "Architecture & Construction Projects in Siliguri | Design Factory
  // Group" as the title, but usePageMeta already appends
  // " | Design Factory Group" itself — that produced a duplicated suffix
  // in the actual <title> tag (same bug fixed in Contact.jsx, Home.jsx,
  // NotFound.jsx). Also added the canonical path, matching the other
  // pages' calls.
  usePageMeta(
    "Architecture & Construction Projects in Siliguri",
    "Explore residential and commercial projects by Design Factory Group — one of the best architecture and construction studios in Siliguri, West Bengal, delivering completed and ongoing work across India.",
    "/projects"
  );

  const api = useApi();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // FIX: this effect previously had no unmount guard — same class of
    // bug already fixed in Careers.jsx and BranchPage.jsx. A slow request
    // resolving after the user has navigated away from /projects would
    // call setState on an unmounted component.
    let ignore = false;

    setLoading(true);
    setError(null);

    api
      .get("/projects")
      .then((data) => {
        if (!ignore) setProjects(data);
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
  }, [api]);

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.status === filter);

  // ItemList structured data for the currently visible projects — helps
  // search engines understand this page is a project portfolio and can
  // surface individual projects as rich results. Only emitted once real
  // data has loaded, and only for projects that have a name/title and a
  // linkable slug, so we never publish incomplete or placeholder entries.
  const projectListSchema =
    !loading && !error && filtered.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Design Factory Group Projects",
          itemListElement: filtered
            .map((project, i) => {
              if (!project.name) return null;
              return {
                "@type": "ListItem",
                position: i + 1,
                name: project.name,
                // FIX: was designfactorygroup.in — contradicts every other
                // file (Header.jsx JSON-LD, BranchPage.jsx, Contact.jsx,
                // all .com). Normalized to .com per the registry — please
                // confirm .com is correct across all of these.
                url: `https://www.designfactorygroup.com/projects/${project._id}`,
              };
            })
            .filter(Boolean),
        }
      : null;

  return (
    <section
      className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24"
      aria-labelledby="projects-heading"
    >
      {projectListSchema && (
        // eslint-disable-next-line react/no-danger
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectListSchema) }}
        />
      )}

      <Reveal>
        <span className="label-caps text-copper">— Portfolio</span>
      </Reveal>
      <Reveal delay={80}>
        <h1
          id="projects-heading"
          className="mt-4 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight md:text-7xl"
        >
          Our <em className="text-copper">Projects</em>.
        </h1>
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-6 max-w-xl text-muted-foreground">
          A curated selection of residential and commercial projects from
          Design Factory Group, one of Siliguri's leading architecture and
          construction studios — showcasing our approach to design,
          construction and thoughtful execution across India.
        </p>
      </Reveal>

      <div
        className="mt-10 flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter projects by status"
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
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
          <span className="ml-auto label-caps text-muted-foreground" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          </span>
        )}
      </div>

      {loading && (
        <div
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
          role="status"
          aria-live="polite"
        >
          <span className="sr-only">Loading projects…</span>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              aria-hidden="true"
              className="h-[400px] animate-pulse rounded-3xl border border-border bg-card"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div
          className="mt-16 rounded-3xl border border-destructive/20 bg-destructive/5 p-12 text-center"
          role="alert"
        >
          <p className="text-muted-foreground">
            Couldn't load projects right now. Please try again shortly.
          </p>
        </div>
      )}

      {/* FIX: added role="status" — this state is often reached by a user
          switching filters (e.g. "Ongoing" with zero matches), so it's a
          dynamic status message that deserves the same accessible
          announcement the loading and error states already get. */}
      {!loading && !error && filtered.length === 0 && (
        <div
          role="status"
          className="mt-16 rounded-3xl border border-dashed border-border bg-cream-alt p-12 text-center"
        >
          <p className="font-display text-2xl">No projects to show</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try switching filters — more work coming soon.
          </p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {filtered.map((project, i) => (
            <li key={project._id}>
              <Reveal delay={i * 40}>
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}