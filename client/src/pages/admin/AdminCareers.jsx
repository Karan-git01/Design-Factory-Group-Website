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
    api.get("/careers").then(setJobs).finally(() => setLoading(false));
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
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-medium text-surface">Careers</h1>
        <button
          onClick={openCreateForm}
          className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-surface transition hover:bg-primary-dark"
        >
          + Add Job Listing
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-10 rounded-3xl bg-surface p-8">
          <h2 className="font-display mb-6 text-xl font-medium text-ink">
            {editingId ? "Edit Job Listing" : "New Job Listing"}
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-secondary">Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full border-b border-secondary/30 bg-transparent pb-2 text-ink outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-secondary">Location (optional)</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                className="w-full border-b border-secondary/30 bg-transparent pb-2 text-ink outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-secondary">Employment Type</label>
              <select
                value={form.employmentType}
                onChange={(e) => setForm((f) => ({ ...f, employmentType: e.target.value }))}
                className="w-full border-b border-secondary/30 bg-transparent pb-2 text-ink outline-none focus:border-primary"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm text-secondary">Contact Number</label>
              <input
                type="text"
                required
                value={form.contactNumber}
                onChange={(e) => setForm((f) => ({ ...f, contactNumber: e.target.value }))}
                className="w-full border-b border-secondary/30 bg-transparent pb-2 text-ink outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-secondary">Contact Email</label>
              <input
                type="email"
                required
                value={form.contactEmail}
                onChange={(e) => setForm((f) => ({ ...f, contactEmail: e.target.value }))}
                className="w-full border-b border-secondary/30 bg-transparent pb-2 text-ink outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm text-secondary">Description</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full border-b border-secondary/30 bg-transparent pb-2 text-ink outline-none focus:border-primary"
            />
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-ink px-8 py-3 text-sm font-medium text-surface transition hover:bg-primary disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Job Listing"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-full border border-secondary/30 px-8 py-3 text-sm font-medium text-secondary"
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
        <div className="flex flex-col gap-4">
          {jobs.map((j) => (
            <div key={j._id} className="flex items-center justify-between gap-4 rounded-2xl bg-surface p-5">
              <div>
                <p className="font-medium text-ink">{j.title}</p>
                <p className="text-sm text-secondary">
                  {j.employmentType} {j.location && `· ${j.location}`}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => openEditForm(j)}
                  className="rounded-full border border-secondary/30 px-4 py-2 text-sm text-secondary hover:border-primary hover:text-primary"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(j._id)}
                  className="rounded-full bg-red-600/10 px-4 py-2 text-sm text-red-600 hover:bg-red-600/20"
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