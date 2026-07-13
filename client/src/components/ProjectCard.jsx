import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project._id}`}
      className="group block overflow-hidden rounded-3xl bg-surface"
    >
      <div className="relative h-64 overflow-hidden sm:h-80">
        <img
          src={project.imageUrl}
          alt={project.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute top-4 left-4 rounded-full px-4 py-1 text-xs font-medium ${
            project.status === "Ongoing"
              ? "bg-primary text-surface"
              : "bg-ink text-surface"
          }`}
        >
          {project.status}
        </span>
      </div>

      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-display text-xl font-medium text-ink">
            {project.name}
          </h3>
          <span className="text-secondary">{project.year}</span>
        </div>
        <p className="mb-3 text-sm text-secondary">{project.location}</p>
        <p className="mb-4 line-clamp-2 text-sm text-secondary">
          {project.description}
        </p>

        {project.scope?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.scope.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-secondary/30 px-3 py-1 text-xs text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}