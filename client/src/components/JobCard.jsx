export default function JobCard({ job }) {
  return (
    <div className="rounded-3xl bg-surface p-8 sm:p-10">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-2xl font-medium text-ink">
          {job.title}
        </h3>
        <span className="rounded-full bg-ink px-4 py-1 text-xs font-medium text-surface">
          {job.employmentType}
        </span>
      </div>

      {job.location && (
        <p className="mb-4 text-sm text-secondary">{job.location}</p>
      )}

      <p className="mb-6 text-secondary">{job.description}</p>

      <div className="flex flex-col gap-2 border-t border-secondary/20 pt-6 sm:flex-row sm:gap-8">
        <a
          href={`tel:${job.contactNumber}`}
          className="text-ink transition hover:text-primary"
        >
          📞 {job.contactNumber}
        </a>
        <a
          href={`mailto:${job.contactEmail}`}
          className="text-ink transition hover:text-primary"
        >
          ✉️ {job.contactEmail}
        </a>
      </div>
    </div>
  );
}