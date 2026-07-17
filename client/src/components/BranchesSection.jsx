import { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";
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
    <section id="branches" className="border-t border-secondary/20 bg-ink py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <div className="h-px w-14 bg-primary" />
              <span className="text-[11px] uppercase tracking-[0.45em] text-secondary-light">
                Our Presence
              </span>
            </div>
            <h2 className="font-display text-5xl font-light leading-[0.92] tracking-[-0.05em] text-surface sm:text-6xl">
              Our Branches
            </h2>
          </div>
          <p className="max-w-md leading-8 text-secondary-light">
            Visit one of our offices and connect with our architecture,
            interior, and construction specialists.
          </p>
        </div>

        {loading && (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[420px] animate-pulse rounded-[2rem] border border-secondary/20 bg-ink-light"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-[2rem] border border-red-500/20 bg-red-500/10 p-8 text-red-400">
            Couldn't load branches right now.
          </div>
        )}

        {!loading && !error && branches.length === 0 && (
          <div className="rounded-[2rem] border border-secondary/20 bg-ink-light p-8 text-secondary-light">
            Branch information coming soon.
          </div>
        )}

        {!loading && !error && branches.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {branches.map((branch) => (
              <BranchCard key={branch._id} branch={branch} />
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
//     <section id="branches" className="bg-ink px-6 py-24 sm:px-12">
//       <h2 className="font-display mb-12 text-4xl font-medium text-surface sm:text-5xl">
//         Our Branches
//       </h2>

//       {loading && (
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
//           {[1, 2, 3].map((i) => (
//             <div key={i} className="h-72 animate-pulse rounded-3xl bg-secondary/20" />
//           ))}
//         </div>
//       )}

//       {!loading && error && (
//         <p className="text-secondary-light">Couldn't load branches right now.</p>
//       )}

//       {!loading && !error && branches.length === 0 && (
//         <p className="text-secondary-light">Branch information coming soon.</p>
//       )}

//       {!loading && !error && branches.length > 0 && (
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
//           {branches.map((branch) => (
//             <BranchCard key={branch._id} branch={branch} />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }