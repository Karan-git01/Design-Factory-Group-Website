import { Phone, Mail, MapPin } from "lucide-react";

export default function JobCard({ job }) {
  return (
    <article className="card-lift grid gap-5 overflow-hidden rounded-sm border border-border bg-card p-5 sm:p-6 md:grid-cols-[1.5fr_1fr] md:gap-6 md:p-7">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="label-caps rounded-full border border-border px-2.5 py-1 text-foreground/80">
            {job.employmentType}
          </span>
          {job.location && (
            <span className="inline-flex items-center gap-1.5 label-caps text-muted-foreground">
              <MapPin size={11} aria-hidden="true" focusable="false" /> {job.location}
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
        {/* FIX: guarded like job.location above — a job entry without a
            phone number no longer renders a dead "tel:undefined" link */}
        {job.contactNumber && (
          <a
            href={`tel:${job.contactNumber}`}
            className="btn-arrow inline-flex w-full min-w-0 items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm transition hover:border-foreground/40 sm:w-auto"
          >
            <Phone size={13} aria-hidden="true" focusable="false" className="shrink-0" />
            <span className="truncate">{job.contactNumber}</span>
          </a>
        )}
        {/* FIX: same guard for the email button */}
        {job.contactEmail && (
          <a
            href={`mailto:${job.contactEmail}?subject=${encodeURIComponent(
              `Application: ${job.title}`
            )}`}
            className="btn-arrow inline-flex w-full min-w-0 items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm text-background transition hover:bg-copper sm:w-auto"
          >
            {/* FIX: was size={12}, mismatched with Phone's size={13} above */}
            <Mail size={13} aria-hidden="true" focusable="false" className="shrink-0" />
            <span className="truncate">{job.contactEmail}</span>
          </a>
        )}
      </div>
    </article>
  );
}