// ProjectsTimeline.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useApi } from "../context/ApiContext";
import { Reveal } from "../components/Reveal";
import ProjectCard from "./ProjectCard";

export default function ProjectsTimeline() {
  const api = useApi();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/projects?limit=5") // matches the "show first 5" requirement
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [api]);

  return (
    <section className="border-t border-border bg-cream-alt py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Reveal>
              <span className="label-caps text-copper">— Selected work</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
                Premium projects by <em className="text-copper">Design Factory Group</em>.
              </h2>
            </Reveal>
          </div>
          <Link
            to="/projects"
            className="btn-arrow inline-flex items-center gap-2 label-caps text-copper"
          >
            View all projects <ArrowUpRight size={14} />
          </Link>
        </div>

        {loading && (
          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:gap-14">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[420px] animate-pulse rounded-3xl border border-border bg-card"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mt-12 rounded-3xl border border-red-500/20 bg-red-500/5 px-8 py-10 text-center">
            <p className="text-muted-foreground">
              Couldn't load projects right now. Please try again shortly.
            </p>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="mt-12 rounded-3xl border border-border bg-card px-8 py-10 text-center">
            <p className="text-muted-foreground">
              No projects to show yet — check back soon.
            </p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:gap-14">
            {projects.map((project, i) => (
              <Reveal key={project._id} delay={i * 60}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useApi } from "../context/ApiContext";
// import ProjectCard from "./ProjectCard";

// export default function ProjectsTimeline() {
//   const api = useApi();
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     api
//       .get("/projects?limit=5") // matches the "show first 5" requirement
//       .then(setProjects)
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false));
//   }, [api]);

//   return (
//     <section className="border-t border-secondary/20 bg-ink">
//       <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 md:px-12 lg:px-16 xl:px-20 xl:py-28">
//         <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
//           <div>
//             <div className="mb-6 flex items-center gap-4">
//               <div className="h-px w-14 bg-primary" />
//               <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-secondary-light">
//                 Featured Projects
//               </span>
//             </div>
//             <h2 className="font-display max-w-4xl text-4xl font-light leading-[0.95] tracking-[-0.04em] text-surface sm:text-5xl lg:text-6xl">
//               Premium projects made by{" "}
//               <span className="text-primary">Design Factory Group</span>
//             </h2>
//           </div>
//         </div>

//         {loading && (
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
//             {[1, 2, 3].map((i) => (
//               <div
//                 key={i}
//                 className="h-[420px] animate-pulse rounded-[2rem] border border-secondary/20 bg-ink-light"
//               />
//             ))}
//           </div>
//         )}

//         {!loading && error && (
//           <div className="rounded-[2rem] border border-red-500/20 bg-red-500/5 px-8 py-10 text-center">
//             <p className="text-secondary-light">
//               Couldn't load projects right now. Please try again shortly.
//             </p>
//           </div>
//         )}

//         {!loading && !error && projects.length === 0 && (
//           <div className="rounded-[2rem] border border-secondary/20 bg-ink-light px-8 py-10 text-center">
//             <p className="text-secondary-light">
//               No projects to show yet — check back soon.
//             </p>
//           </div>
//         )}

//         {!loading && !error && projects.length > 0 && (
//           <>
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
//               {projects.map((project) => (
//                 <ProjectCard key={project._id} project={project} />
//               ))}
//             </div>

//             <div className="mt-20 flex justify-center">
//               <Link to="/projects" className="group inline-flex items-center gap-5">
//                 <span className="font-display text-lg font-light text-surface transition-colors duration-300 group-hover:text-primary">
//                   View all projects
//                 </span>
//                 <div className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary/30 transition-all duration-300 group-hover:border-primary">
//                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-ink transition-transform duration-300 group-hover:translate-x-1">
//                     →
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           </>
//         )}
//       </div>
//     </section>
//   );
// }