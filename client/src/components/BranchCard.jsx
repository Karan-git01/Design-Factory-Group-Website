import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function BranchCard({ branch }) {
  const { slug, name, address, photoUrl, isMain } = branch;

  return (
    <Link to={`/branches/${slug}`} className="group block">
      <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-border bg-card transition-colors duration-300 group-hover:border-copper/40">
        <img
          src={photoUrl}
          alt={name ? `${name} branch` : "Branch photo"}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {isMain && (
          <span className="label-caps absolute left-3 top-3 rounded-sm bg-copper px-2.5 py-1 text-primary-foreground shadow-sm">
            Main Branch
          </span>
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="relative inline-block max-w-full truncate pb-1.5 font-display text-2xl tracking-tight">
            {name}
            <span className="absolute inset-x-0 bottom-0 h-px bg-foreground/70" />
            <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-copper transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </h3>
          <p className="mt-2 line-clamp-2 max-w-sm text-sm text-muted-foreground">
            {address}
          </p>
        </div>

        <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-sm border border-border text-copper transition-all duration-300 group-hover:border-copper group-hover:bg-copper group-hover:text-background">
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}