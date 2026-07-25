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
    <article className="pb-24">
      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <Link
          to="/projects"
          className="btn-arrow inline-flex items-center gap-2 label-caps text-copper"
        >
          <ArrowLeft size={14} /> Back to Projects
        </Link>
      </div>

      <Reveal>
        <div className="mx-auto mt-8 max-w-7xl px-5 sm:px-8">
          <div className="img-zoom overflow-hidden rounded-[2rem] border border-border">
            <img
              src={project.imageUrl}
              alt={project.name}
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </div>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <Reveal>
          <div className="flex items-center gap-3">
            <span
              className={`label-caps rounded-full px-3 py-1.5 ${
                project.status === "Ongoing"
                  ? "bg-copper text-primary-foreground"
                  : "bg-foreground text-background"
              }`}
            >
              {project.status}
            </span>
            <span className="label-caps text-muted-foreground">{project.year}</span>
          </div>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
            {project.name}
          </h1>
          <p className="mt-4 label-caps text-muted-foreground">{project.location}</p>
        </Reveal>

        <Reveal delay={100}>
          <p className="text-lg leading-relaxed text-foreground/85">{project.description}</p>
          {project.scope?.length > 0 && (
            <div className="mt-8">
              <p className="label-caps text-muted-foreground">Scope</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.scope.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1.5 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </article>
  );
}























// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useApi } from "../context/ApiContext";
// import { usePageMeta } from "../hooks/usePageMeta";

// export default function ProjectDetail() {
//   const { id } = useParams();
//   const api = useApi();
//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   usePageMeta(project?.name, project?.description);

//   useEffect(() => {
//     setLoading(true);
//     api
//       .get(`/projects/${id}`)
//       .then(setProject)
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false));
//   }, [api, id]);

//   if (loading) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-ink">
//         <p className="text-secondary-light">Loading project...</p>
//       </main>
//     );
//   }

//   if (error || !project) {
//     return (
//       <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink px-6 text-center">
//         <h1 className="font-display text-3xl font-medium text-surface">
//           Project not found
//         </h1>
//         <p className="text-secondary-light">
//           This project may have been removed or the link is incorrect.
//         </p>
//         <Link
//           to="/projects"
//           className="rounded-full bg-primary px-8 py-3 text-surface transition hover:bg-primary-dark"
//         >
//           Back to Projects
//         </Link>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-ink px-6 pt-32 pb-24 sm:px-12">
//       <div className="mx-auto max-w-5xl">
//         <Link
//           to="/projects"
//           className="mb-10 inline-block text-sm text-secondary-light hover:text-primary"
//         >
//           ← Back to Projects
//         </Link>

//         <div className="mb-10 overflow-hidden rounded-[2rem]">
//           <img
//             src={project.imageUrl}
//             alt={project.name}
//             className="h-[360px] w-full object-cover sm:h-[480px]"
//           />
//         </div>

//         <div className="mb-3 flex flex-wrap items-center gap-3">
//           <h1 className="font-display text-4xl font-medium text-surface sm:text-5xl">
//             {project.name}
//           </h1>
//           <span
//             className={`rounded-full px-4 py-1 text-xs font-medium ${
//               project.status === "Ongoing"
//                 ? "bg-primary text-ink"
//                 : "border border-secondary/20 text-secondary-light"
//             }`}
//           >
//             {project.status}
//           </span>
//         </div>

//         <p className="mb-8 text-secondary-light">
//           {project.location} · {project.year}
//         </p>

//         <p className="mb-8 max-w-2xl text-lg leading-8 text-secondary-light">
//           {project.description}
//         </p>

//         {project.scope?.length > 0 && (
//           <div className="flex flex-wrap gap-2">
//             {project.scope.map((tag) => (
//               <span
//                 key={tag}
//                 className="rounded-full border border-secondary/20 px-4 py-2 text-xs uppercase tracking-wide text-secondary-light"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }