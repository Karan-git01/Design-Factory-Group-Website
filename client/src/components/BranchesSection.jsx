import { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";
import { Reveal } from "../components/Reveal";
import BranchCard from "./BranchCard";

export default function BranchesSection() {
  const api = useApi();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/branches")
      .then(setBranches)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [api]);

  return (
    <section id="branches" className="border-t border-border bg-cream-alt py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <Reveal>
              <span className="label-caps text-copper">— Our Presence</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
                Our <em className="text-copper">Branches</em>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="max-w-md text-muted-foreground md:justify-self-end">
              Visit one of our offices and connect with our architecture, interior, and
              construction specialists.
            </p>
          </Reveal>
        </div>

        {loading && (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
            <p className="text-muted-foreground">Couldn't load branches right now.</p>
          </div>
        )}

        {!loading && !error && branches.length === 0 && (
          <div className="mt-12 rounded-3xl border border-border bg-card px-8 py-10 text-center">
            <p className="text-muted-foreground">Branch information coming soon.</p>
          </div>
        )}

        {!loading && !error && branches.length > 0 && (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {branches.map((branch, i) => (
              <Reveal key={branch._id} delay={i * 60}>
                <BranchCard branch={branch} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}







// import { useEffect, useState } from "react";
// import { useApi } from "../context/ApiContext";
// import BranchCard from "./BranchCard";

// export default function BranchesSection() {
//   const api = useApi();
//   const [branches, setBranches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     api
//       .get("/branches")
//       .then(setBranches)
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false));
//   }, [api]);

//   return (
//     <section id="branches" className="border-t border-secondary/20 bg-ink py-24">
//       <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
//         <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
//           <div>
//             <div className="mb-5 flex items-center gap-4">
//               <div className="h-px w-14 bg-primary" />
//               <span className="text-[11px] uppercase tracking-[0.45em] text-secondary-light">
//                 Our Presence
//               </span>
//             </div>
//             <h2 className="font-display text-5xl font-light leading-[0.92] tracking-[-0.05em] text-surface sm:text-6xl">
//               Our Branches
//             </h2>
//           </div>
//           <p className="max-w-md leading-8 text-secondary-light">
//             Visit one of our offices and connect with our architecture,
//             interior, and construction specialists.
//           </p>
//         </div>

//         {loading && (
//           <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
//             {[1, 2, 3].map((i) => (
//               <div
//                 key={i}
//                 className="h-[420px] animate-pulse rounded-[2rem] border border-secondary/20 bg-ink-light"
//               />
//             ))}
//           </div>
//         )}

//         {!loading && error && (
//           <div className="rounded-[2rem] border border-red-500/20 bg-red-500/10 p-8 text-red-400">
//             Couldn't load branches right now.
//           </div>
//         )}

//         {!loading && !error && branches.length === 0 && (
//           <div className="rounded-[2rem] border border-secondary/20 bg-ink-light p-8 text-secondary-light">
//             Branch information coming soon.
//           </div>
//         )}

//         {!loading && !error && branches.length > 0 && (
//           <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
//             {branches.map((branch) => (
//               <BranchCard key={branch._id} branch={branch} />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

