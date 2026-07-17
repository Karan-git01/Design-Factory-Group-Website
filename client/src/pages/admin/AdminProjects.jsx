import { useEffect, useState } from "react";
import { useApi } from "../../context/ApiContext";
import AdminLayout from "../../components/admin/AdminLayout";
import ImageUploadField from "../../components/admin/ImageUploadField";

const EMPTY_FORM = {
  name: "",
  year: new Date().getFullYear(),
  location: "",
  description: "",
  imageUrl: "",
  scope: "",
  status: "Ongoing",
};

export default function AdminProjects() {
  const api = useApi();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function loadProjects() {
    setLoading(true);
    api
      .get("/projects")
      .then(setProjects)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function openCreateForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
    setError("");
  }

  function openEditForm(project) {
    setForm({
      name: project.name,
      year: project.year,
      location: project.location,
      description: project.description,
      imageUrl: project.imageUrl,
      scope: project.scope?.join(", ") || "",
      status: project.status,
    });
    setEditingId(project._id);
    setShowForm(true);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      year: Number(form.year),
      scope: form.scope
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, payload);
      } else {
        await api.post("/projects", payload);
      }
      setShowForm(false);
      loadProjects();
    } catch (err) {
      setError(err.message || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    await api.del(`/projects/${id}`);
    loadProjects();
  }

  return (
    <AdminLayout>
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            Admin Panel
          </p>

          <h1 className="font-display text-4xl font-light text-surface">
            Projects
          </h1>
        </div>

        <button
          onClick={openCreateForm}
          className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-surface transition-all duration-300 hover:scale-[1.02] hover:bg-primary-dark"
        >
          + Add Project
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-12 rounded-[2rem] border border-black/5 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] lg:p-10"
        >
          <h2 className="font-display mb-8 text-2xl font-medium text-ink">
            {editingId ? "Edit Project" : "New Project"}
          </h2>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Name
              </label>

              <input
                type="text"
                required
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-ink transition focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Year
              </label>

              <input
                type="number"
                required
                value={form.year}
                onChange={(e) =>
                  setForm((f) => ({ ...f, year: e.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-ink transition focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Location
              </label>

              <input
                type="text"
                required
                value={form.location}
                onChange={(e) =>
                  setForm((f) => ({ ...f, location: e.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-ink transition focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  setForm((f) => ({ ...f, status: e.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-ink transition focus:border-primary focus:outline-none"
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="mt-8">
            <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Description
            </label>

            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-ink transition focus:border-primary focus:outline-none"
            />
          </div>

          <div className="mt-8">
            <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Scope (comma-separated, e.g. Architecture, Interior Design)
            </label>

            <input
              type="text"
              value={form.scope}
              onChange={(e) =>
                setForm((f) => ({ ...f, scope: e.target.value }))
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-ink transition focus:border-primary focus:outline-none"
            />
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-gray-300 p-6">
            <ImageUploadField
              value={form.imageUrl}
              onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
              label="Project Image"
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
              {saving ? "Saving..." : "Save Project"}
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
        <p className="text-secondary-light">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-secondary-light">No projects yet.</p>
      ) : (
        <div className="space-y-6">
          {projects.map((p) => (
            <div
              key={p._id}
              className="group flex flex-col gap-6 overflow-hidden rounded-[2rem] border border-white/10 bg-[#171717] transition-all duration-300 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] lg:flex-row"
            >
              <img
                src={p.imageUrl}
                alt={p.name}
                className="h-60 w-full object-cover lg:h-auto lg:w-72"
              />

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.25em] ${
                        p.status === "Completed"
                          ? "border-green-500/30 bg-green-500/10 text-green-300"
                          : "border-primary/30 bg-primary/10 text-primary"
                      }`}
                    >
                      {p.status}
                    </span>

                    <span className="text-sm text-white/45">{p.year}</span>
                  </div>

                  <h3 className="font-display text-2xl font-light tracking-[-0.03em] text-white">
                    {p.name}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/50">
                    {p.location}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/35">
                    Project Management
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => openEditForm(p)}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:border-primary hover:text-primary"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="rounded-full border border-red-500/20 bg-red-500/10 px-6 py-3 text-sm font-medium text-red-300 transition-all duration-300 hover:bg-red-500/20"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
