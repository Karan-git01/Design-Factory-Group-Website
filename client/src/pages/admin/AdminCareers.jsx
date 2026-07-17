import { useEffect, useState } from "react";
import { useApi } from "../../context/ApiContext";
import AdminLayout from "../../components/admin/AdminLayout";

const EMPTY_FORM = {
  title: "",
  description: "",
  location: "",
  employmentType: "Full-time",
  contactNumber: "",
  contactEmail: "",
};

export default function AdminCareers() {
  const api = useApi();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function loadJobs() {
    setLoading(true);
    api
      .get("/careers")
      .then(setJobs)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadJobs();
  }, []);

  function openCreateForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
    setError("");
  }

  function openEditForm(job) {
    setForm({
      title: job.title,
      description: job.description,
      location: job.location || "",
      employmentType: job.employmentType,
      contactNumber: job.contactNumber,
      contactEmail: job.contactEmail,
    });
    setEditingId(job._id);
    setShowForm(true);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (editingId) {
        await api.put(`/careers/${editingId}`, form);
      } else {
        await api.post("/careers", form);
      }
      setShowForm(false);
      loadJobs();
    } catch (err) {
      setError(err.message || "Failed to save job listing.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this job listing? This cannot be undone.")) return;
    await api.del(`/careers/${id}`);
    loadJobs();
  }

  return (
    <AdminLayout>
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            Admin Panel
          </p>

          <h1 className="font-display text-4xl font-light text-surface">
            Careers
          </h1>
        </div>

        <button
          onClick={openCreateForm}
          className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-surface transition-all duration-300 hover:scale-[1.02] hover:bg-primary-dark"
        >
          + Add Job Listing
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-12 rounded-[2rem] border border-black/5 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] lg:p-10"
        >
          <h2 className="font-display mb-8 text-2xl font-medium text-ink">
            {editingId ? "Edit Job Listing" : "New Job Listing"}
          </h2>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Title
              </label>

              <input
                type="text"
                required
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-ink transition focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Location (optional)
              </label>

              <input
                type="text"
                value={form.location}
                onChange={(e) =>
                  setForm((f) => ({ ...f, location: e.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-ink transition focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Employment Type
              </label>

              <select
                value={form.employmentType}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    employmentType: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-ink transition focus:border-primary focus:outline-none"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>

            <div>
              <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Contact Number
              </label>

              <input
                type="text"
                required
                value={form.contactNumber}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    contactNumber: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-ink transition focus:border-primary focus:outline-none"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Contact Email
              </label>

              <input
                type="email"
                required
                value={form.contactEmail}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    contactEmail: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-ink transition focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-8">
            <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Description
            </label>

            <textarea
              required
              rows={5}
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  description: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-ink transition focus:border-primary focus:outline-none"
            />
          </div>

          {error && (
            <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-ink px-8 py-3 text-sm font-medium text-white transition hover:bg-primary disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Job Listing"}
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-full border border-gray-300 px-8 py-3 text-sm font-medium text-secondary transition hover:border-primary hover:text-primary"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-secondary-light">Loading job listings...</p>
      ) : jobs.length === 0 ? (
        <p className="text-secondary-light">No job listings yet.</p>
      ) : (
        <div className="space-y-5">
          {jobs.map((j) => (
            <div
              key={j._id}
              className="group flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-[#171717] p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] lg:flex-row lg:items-center"
            >
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-2xl font-light tracking-[-0.03em] text-white">
                    {j.title}
                  </h3>

                  <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-primary">
                    {j.employmentType}
                  </span>

                  {j.location && (
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/60">
                      {j.location}
                    </span>
                  )}
                </div>

                {j.description && (
                  <p className="mb-4 max-w-3xl text-sm leading-7 text-white/50 line-clamp-2">
                    {j.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/45">
                  <span>{j.contactNumber}</span>
                  <span>{j.contactEmail}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => openEditForm(j)}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:border-primary hover:text-primary"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(j._id)}
                  className="rounded-full border border-red-500/20 bg-red-500/10 px-6 py-3 text-sm font-medium text-red-300 transition-all duration-300 hover:bg-red-500/20"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
