// ProjectCard.jsx
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project }) {
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
            className={`label-caps rounded-full px-3 py-1.5 backdrop-blur ${
              project.status === "Ongoing"
                ? "bg-copper/90 text-primary-foreground"
                : "bg-background/90 text-foreground"
            }`}
          >
            {project.status}
          </span>
          <span className="label-caps rounded-full bg-background/90 px-3 py-1.5 text-foreground backdrop-blur">
            {project.year}
          </span>
        </div>
        <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-foreground opacity-0 backdrop-blur transition group-hover:opacity-100">
          <ArrowUpRight size={16} />
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="font-display text-2xl tracking-tight md:text-3xl">{project.name}</h3>
          <p className="mt-1 label-caps text-muted-foreground">{project.location}</p>
        </div>
      </div>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.scope?.map((s) => (
          <span
            key={s}
            className="rounded-full border border-border px-3 py-1 text-xs text-foreground/80"
          >
            {s}
          </span>
        ))}
      </div>
    </Link>
  );
}




// import { Link } from "react-router-dom";

// export default function ProjectCard({ project }) {
//   return (
//     <Link
//       to={`/projects/${project._id}`}
//       className="group block overflow-hidden rounded-3xl bg-surface"
//     >
//       <div className="relative h-64 overflow-hidden sm:h-80">
//         <img
//           src={project.imageUrl}
//           alt={project.name}
//           loading="lazy"
//           className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//         />
//         <span
//           className={`absolute top-4 left-4 rounded-full px-4 py-1 text-xs font-medium ${
//             project.status === "Ongoing"
//               ? "bg-primary text-surface"
//               : "bg-ink text-surface"
//           }`}
//         >
//           {project.status}
//         </span>
//       </div>

//       <div className="p-6">
//         <div className="mb-2 flex items-center justify-between">
//           <h3 className="font-display text-xl font-medium text-ink">
//             {project.name}
//           </h3>
//           <span className="text-secondary">{project.year}</span>
//         </div>
//         <p className="mb-3 text-sm text-secondary">{project.location}</p>
//         <p className="mb-4 line-clamp-2 text-sm text-secondary">
//           {project.description}
//         </p>

//         {project.scope?.length > 0 && (
//           <div className="flex flex-wrap gap-2">
//             {project.scope.map((tag) => (
//               <span
//                 key={tag}
//                 className="rounded-full border border-secondary/30 px-3 py-1 text-xs text-secondary"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         )}
//       </div>
//     </Link>
//   );
// }