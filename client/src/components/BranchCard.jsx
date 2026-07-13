import { Link } from "react-router-dom";

export default function BranchCard({ branch }) {
  return (
    <Link
      to={`/branches/${branch.slug}`}
      className="group block overflow-hidden rounded-3xl bg-surface"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={branch.photoUrl}
          alt={branch.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {branch.isMain && (
          <span className="absolute top-4 left-4 rounded-full bg-primary px-4 py-1 text-xs font-medium text-surface">
            Main Branch
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-display mb-1 text-xl font-medium text-ink">
          {branch.name}
        </h3>
        <p className="text-sm text-secondary">{branch.address}</p>
      </div>
    </Link>
  );
}