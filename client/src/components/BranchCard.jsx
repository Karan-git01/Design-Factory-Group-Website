import { Link } from "react-router-dom";

export default function BranchCard({ branch }) {
  const { slug, name, address, photoUrl, isMain } = branch;

  return (
    <Link
      to={`/branches/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-secondary/20 bg-ink-light transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_25px_80px_rgba(0,0,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:rounded-[2rem]"
    >
      <div className="relative h-48 shrink-0 overflow-hidden sm:h-56 lg:h-64">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

        <img
          src={photoUrl}
          alt={name ? `${name} branch` : "Branch photo"}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        {isMain && (
          <span className="absolute left-3 top-3 z-20 rounded-full border border-primary/30 bg-primary px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink shadow-lg sm:left-5 sm:top-5 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.25em]">
            Main Branch
          </span>
        )}

        <div className="absolute bottom-3 left-3 z-20 rounded-full border border-secondary/20 bg-ink/45 px-3 py-1.5 backdrop-blur-xl sm:bottom-5 sm:left-5 sm:px-4 sm:py-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-surface/80 sm:text-xs sm:tracking-[0.25em]">
            Office
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-7">
        <div>
          <h3 className="font-display text-xl font-light tracking-[-0.02em] text-surface transition-colors duration-300 group-hover:text-primary sm:text-2xl sm:tracking-[-0.03em]">
            {name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-secondary-light sm:mt-3 sm:leading-7">
            {address}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-secondary/20 pt-4 sm:mt-6 sm:pt-5">
          <span className="text-[10px] uppercase tracking-[0.25em] text-secondary-light sm:text-[11px] sm:tracking-[0.35em]">
            View Branch
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-secondary/20 transition-all duration-300 group-hover:border-primary sm:h-10 sm:w-10">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary sm:h-7 sm:w-7">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3 text-ink transition-transform duration-300 group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

























// import { Link } from "react-router-dom";

// export default function BranchCard({ branch }) {
//   return (
//     <Link
//       to={`/branches/${branch.slug}`}
//       className="group block overflow-hidden rounded-3xl bg-surface"
//     >
//       <div className="relative h-56 overflow-hidden">
//         <img
//           src={branch.photoUrl}
//           alt={branch.name}
//           loading="lazy"
//           className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//         />
//         {branch.isMain && (
//           <span className="absolute top-4 left-4 rounded-full bg-primary px-4 py-1 text-xs font-medium text-surface">
//             Main Branch
//           </span>
//         )}
//       </div>
//       <div className="p-6">
//         <h3 className="font-display mb-1 text-xl font-medium text-ink">
//           {branch.name}
//         </h3>
//         <p className="text-sm text-secondary">{branch.address}</p>
//       </div>
//     </Link>
//   );
// }