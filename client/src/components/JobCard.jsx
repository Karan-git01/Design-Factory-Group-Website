export default function JobCard({ job }) {
  return (
    <div className="rounded-[1.75rem] border border-secondary/20 bg-ink-light p-6 transition-all duration-300 hover:border-primary/30 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <h3 className="font-display text-3xl font-light tracking-[-0.04em] text-surface sm:text-4xl">
            {job.title}
          </h3>
          {job.location && (
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-secondary-light">
              {job.location}
            </p>
          )}
        </div>

        <span className="self-start rounded-full border border-secondary/20 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-secondary-light">
          {job.employmentType}
        </span>
      </div>

      <div className="mt-10 max-w-3xl">
        <p className="leading-8 text-secondary-light">{job.description}</p>
      </div>

      <div className="mt-10 flex flex-col gap-8 border-t border-secondary/20 pt-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-secondary">
              Phone
            </p>
            <a
              href={`tel:${job.contactNumber}`}
              className="text-lg font-light text-surface transition-colors duration-300 hover:text-primary"
            >
              {job.contactNumber}
            </a>
          </div>

          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-secondary">
              Email
            </p>
            <a
              href={`mailto:${job.contactEmail}`}
              className="break-all text-lg font-light text-surface transition-colors duration-300 hover:text-primary"
            >
              {job.contactEmail}
            </a>
          </div>
        </div>

        {/* "Apply" is now a real mailto link — matches the no-upload decision:
            interested applicants email the listed address directly. */}
        <a
          href={`mailto:${job.contactEmail}?subject=${encodeURIComponent(
            `Application: ${job.title}`
          )}`}
          className="group flex items-center gap-4 self-start lg:self-end"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-secondary transition-colors duration-300 group-hover:text-primary">
            Apply
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-surface transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary"
          >
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </div>
  );
}



// export default function JobCard({ job }) {
//   return (
//     <div className="rounded-3xl bg-surface p-8 sm:p-10">
//       <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
//         <h3 className="font-display text-2xl font-medium text-ink">
//           {job.title}
//         </h3>
//         <span className="rounded-full bg-ink px-4 py-1 text-xs font-medium text-surface">
//           {job.employmentType}
//         </span>
//       </div>

//       {job.location && (
//         <p className="mb-4 text-sm text-secondary">{job.location}</p>
//       )}

//       <p className="mb-6 text-secondary">{job.description}</p>

//       <div className="flex flex-col gap-2 border-t border-secondary/20 pt-6 sm:flex-row sm:gap-8">
//         <a
//           href={`tel:${job.contactNumber}`}
//           className="text-ink transition hover:text-primary"
//         >
//           📞 {job.contactNumber}
//         </a>
//         <a
//           href={`mailto:${job.contactEmail}`}
//           className="text-ink transition hover:text-primary"
//         >
//           ✉️ {job.contactEmail}
//         </a>
//       </div>
//     </div>
//   );
// }