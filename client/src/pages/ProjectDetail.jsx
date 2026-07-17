import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useApi } from "../context/ApiContext";
import { usePageMeta } from "../hooks/usePageMeta";

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
      <main className="flex min-h-screen items-center justify-center bg-ink">
        <p className="text-secondary-light">Loading project...</p>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink px-6 text-center">
        <h1 className="font-display text-3xl font-medium text-surface">
          Project not found
        </h1>
        <p className="text-secondary-light">
          This project may have been removed or the link is incorrect.
        </p>
        <Link
          to="/projects"
          className="rounded-full bg-primary px-8 py-3 text-surface transition hover:bg-primary-dark"
        >
          Back to Projects
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink px-6 pt-32 pb-24 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/projects"
          className="mb-10 inline-block text-sm text-secondary-light hover:text-primary"
        >
          ← Back to Projects
        </Link>

        <div className="mb-10 overflow-hidden rounded-[2rem]">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="h-[360px] w-full object-cover sm:h-[480px]"
          />
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-4xl font-medium text-surface sm:text-5xl">
            {project.name}
          </h1>
          <span
            className={`rounded-full px-4 py-1 text-xs font-medium ${
              project.status === "Ongoing"
                ? "bg-primary text-ink"
                : "border border-secondary/20 text-secondary-light"
            }`}
          >
            {project.status}
          </span>
        </div>

        <p className="mb-8 text-secondary-light">
          {project.location} · {project.year}
        </p>

        <p className="mb-8 max-w-2xl text-lg leading-8 text-secondary-light">
          {project.description}
        </p>

        {project.scope?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.scope.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-secondary/20 px-4 py-2 text-xs uppercase tracking-wide text-secondary-light"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}