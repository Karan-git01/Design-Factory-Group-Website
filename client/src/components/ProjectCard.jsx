import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";

export default function ProjectCard({ project }) {
  const visibleScope = project.scope?.slice(0, 3) || [];
  const extraScope = (project.scope?.length || 0) - visibleScope.length;

  return (
    <Link to={`/projects/${project._id}`} className="group block">
      <div className="img-zoom relative overflow-hidden rounded-3xl border border-border bg-card">
        <div className="aspect-[4/3] w-full">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span
            className={`label-caps flex items-center gap-1.5 rounded-full px-3 py-1.5 shadow-sm backdrop-blur ${
              project.status === "Ongoing"
                ? "bg-copper/90 text-primary-foreground"
                : "bg-background/90 text-foreground"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                project.status === "Ongoing" ? "bg-primary-foreground" : "bg-copper"
              }`}
            />
            {project.status}
          </span>
          <span className="label-caps rounded-full bg-background/90 px-3 py-1.5 text-foreground shadow-sm backdrop-blur">
            {project.year}
          </span>
        </div>
        <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-foreground opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100">
          <ArrowUpRight size={16} />
        </span>
      </div>

      <div className="px-2.5">
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <h3 className="relative inline-block pb-1.5 font-display text-2xl tracking-tight md:text-3xl">
              {project.name}
              <span className="absolute inset-x-0 bottom-0 h-px bg-foreground/70" />
              <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-copper transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </h3>
            <p className="mt-1.5 flex items-center gap-1.5 label-caps text-muted-foreground">
              <MapPin size={11} className="text-copper" />
              {project.location}
            </p>
          </div>
        </div>

        {project.description && (
          <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        )}

        {visibleScope.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {visibleScope.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border px-3 py-1 text-xs text-foreground/80"
              >
                {s}
              </span>
            ))}
            {extraScope > 0 && (
              <span className="rounded-full border border-dashed border-border px-3 py-1 text-xs text-muted-foreground">
                +{extraScope} more
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}















// import { Link } from "react-router-dom";
// import { ArrowUpRight } from "lucide-react";
// export default function ProjectCard({ project }) {
//   return (
//     <Link to={`/projects/${project._id}`} className="group block">
//       <div className="img-zoom relative overflow-hidden rounded-3xl border border-border bg-card">
//         <div className="aspect-[4/3] w-full">
//           <img
//             src={project.imageUrl}
//             alt={project.name}
//             className="h-full w-full object-cover"
//             loading="lazy"
//           />
//         </div>
//         <div className="absolute left-4 top-4 flex items-center gap-2">
//           <span
//             className={`label-caps rounded-full px-3 py-1.5 backdrop-blur ${
//               project.status === "Ongoing"
//                 ? "bg-copper/90 text-primary-foreground"
//                 : "bg-background/90 text-foreground"
//             }`}
//           >
//             {project.status}
//           </span>
//           <span className="label-caps rounded-full bg-background/90 px-3 py-1.5 text-foreground backdrop-blur">
//             {project.year}
//           </span>
//         </div>
//         <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-foreground opacity-0 backdrop-blur transition group-hover:opacity-100">
//           <ArrowUpRight size={16} />
//         </span>
//       </div>
//       <div className="mt-5 flex items-start justify-between gap-6">
//         <div>
//           <h3 className="relative inline-block pb-1.5 font-display text-2xl tracking-tight md:text-3xl">
//             {project.name}
//             <span className="absolute inset-x-0 bottom-0 h-px bg-foreground/70" />
//             <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-copper transition-transform duration-300 ease-out group-hover:scale-x-100" />
//           </h3>
//           <p className="mt-1 label-caps text-muted-foreground">{project.location}</p>
//         </div>
//       </div>
//       <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
//         {project.description}
//       </p>
//       <div className="mt-4 flex flex-wrap gap-2">
//         {project.scope?.map((s) => (
//           <span
//             key={s}
//             className="rounded-full border border-border px-3 py-1 text-xs text-foreground/80"
//           >
//             {s}
//           </span>
//         ))}
//       </div>
//     </Link>
//   );
// }