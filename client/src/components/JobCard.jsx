import { Phone, Mail, MapPin } from "lucide-react";

export default function JobCard({ job }) {
  return (
    <article className="card-lift grid gap-5 overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-6 md:grid-cols-[1.5fr_1fr] md:gap-6 md:p-7">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="label-caps rounded-full border border-border px-2.5 py-1 text-foreground/80">
            {job.employmentType}
          </span>
          {job.location && (
            <span className="inline-flex items-center gap-1.5 label-caps text-muted-foreground">
              <MapPin size={11} /> {job.location}
            </span>
          )}
        </div>
        <h2 className="mt-3 font-display text-2xl tracking-tight md:text-3xl">
          {job.title}
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
          {job.description}
        </p>
      </div>

      <div className="flex min-w-0 flex-col justify-center gap-2.5 border-t border-border pt-4 md:border-l md:border-t-0 md:pl-7 md:pt-0">
        <p className="label-caps text-muted-foreground">Apply directly</p>
        <a
          href={`tel:${job.contactNumber}`}
          className="btn-arrow inline-flex w-full min-w-0 items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm transition hover:border-foreground/40 sm:w-auto"
        >
          <Phone size={13} className="shrink-0" />
          <span className="truncate">{job.contactNumber}</span>
        </a>
        <a
          href={`mailto:${job.contactEmail}?subject=${encodeURIComponent(
            `Application: ${job.title}`
          )}`}
          className="btn-arrow inline-flex w-full min-w-0 items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm text-background transition hover:bg-copper sm:w-auto"
        >
          <Mail size={12} className="shrink-0" />
          <span className="truncate">{job.contactEmail}</span>
        </a>
      </div>
    </article>
  );
}










// import { Phone, Mail, MapPin } from "lucide-react";

// export default function JobCard({ job }) {
//   return (
//     <article className="card-lift grid gap-8 rounded-3xl border border-border bg-card p-7 md:grid-cols-[1.4fr_1fr] md:p-10">
//       <div>
//         <div className="flex flex-wrap items-center gap-3">
//           <span className="label-caps rounded-full border border-border px-3 py-1.5 text-foreground/80">
//             {job.employmentType}
//           </span>
//           {job.location && (
//             <span className="inline-flex items-center gap-1.5 label-caps text-muted-foreground">
//               <MapPin size={12} /> {job.location}
//             </span>
//           )}
//         </div>
//         <h2 className="mt-4 font-display text-3xl tracking-tight md:text-4xl">
//           {job.title}
//         </h2>
//         <p className="mt-3 max-w-xl text-muted-foreground">{job.description}</p>
//       </div>

//       <div className="flex flex-col justify-center gap-3 border-t border-border pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
//         <p className="label-caps text-muted-foreground">Apply directly</p>
//         <a
//           href={`tel:${job.contactNumber}`}
//           className="btn-arrow inline-flex items-center gap-3 rounded-full border border-border bg-background px-5 py-3 text-sm transition hover:border-foreground/40"
//         >
//           <Phone size={14} /> {job.contactNumber}
//         </a>
//         <a
//           href={`mailto:${job.contactEmail}?subject=${encodeURIComponent(
//             `Application: ${job.title}`
//           )}`}
//           className="btn-arrow inline-flex items-center gap-3 rounded-full bg-foreground px-5 py-3 text-sm text-background transition hover:bg-copper"
//         >
//           <Mail size={14} /> {job.contactEmail}
//         </a>
//       </div>
//     </article>
//   );
// }
