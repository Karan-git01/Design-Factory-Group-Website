import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project._id}`}
      className="group block h-full overflow-hidden rounded-[2rem] border border-secondary/20 bg-ink-light transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
    >
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink/55 via-transparent to-ink/10" />

        <img
          src={project.imageUrl}
          alt={project.name}
          loading="lazy"
          className="h-64 w-full object-cover transition duration-700 group-hover:scale-110 sm:h-72 lg:h-80"
        />

        <span
          className={`absolute left-5 top-5 z-20 rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] backdrop-blur-xl transition-all duration-300 ${
            project.status === "Ongoing"
              ? "border-primary/30 bg-primary text-ink"
              : "border-secondary/20 bg-ink/45 text-surface"
          }`}
        >
          {project.status}
        </span>

        <div className="absolute bottom-5 right-5 z-20 rounded-full border border-secondary/20 bg-ink/45 px-4 py-2 text-xs font-medium text-surface/80 backdrop-blur-xl">
          {project.year}
        </div>
      </div>

      <div className="flex flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl font-light leading-tight tracking-[-0.03em] text-surface transition-colors duration-300 group-hover:text-primary">
            {project.name}
          </h3>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-secondary/20 text-secondary-light transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-ink group-hover:translate-x-1">
            →
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          <p className="text-sm tracking-wide text-secondary-light">
            {project.location}
          </p>
        </div>

        <p className="mt-5 line-clamp-3 text-[15px] leading-7 text-secondary-light">
          {project.description}
        </p>

        {project.scope?.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {project.scope.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-secondary/20 bg-surface/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-secondary-light transition-all duration-300 group-hover:border-primary/30 group-hover:text-primary"
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