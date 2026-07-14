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
    api.get("/projects").then(setProjects).finally(() => setLoading(false));
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
      scope: form.scope.split(",").map((s) => s.trim()).filter(Boolean),
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
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-medium text-surface">Projects</h1>
        <button
          onClick={openCreateForm}
          className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-surface transition hover:bg-primary-dark"
        >
          + Add Project
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 rounded-3xl bg-surface p-8"
        >
          <h2 className="font-display mb-6 text-xl font-medium text-ink">
            {editingId ? "Edit Project" : "New Project"}
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-secondary">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full border-b border-secondary/30 bg-transparent pb-2 text-ink outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-secondary">Year</label>
              <input
                type="number"
                required
                value={form.year}
                onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                className="w-full border-b border-secondary/30 bg-transparent pb-2 text-ink outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-secondary">Location</label>
              <input
                type="text"
                required
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                className="w-full border-b border-secondary/30 bg-transparent pb-2 text-ink outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-secondary">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                className="w-full border-b border-secondary/30 bg-transparent pb-2 text-ink outline-none focus:border-primary"
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
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

          <div className="mt-5">
            <label className="mb-2 block text-sm text-secondary">
              Scope (comma-separated, e.g. Architecture, Interior Design)
            </label>
            <input
              type="text"
              value={form.scope}
              onChange={(e) => setForm((f) => ({ ...f, scope: e.target.value }))}
              className="w-full border-b border-secondary/30 bg-transparent pb-2 text-ink outline-none focus:border-primary"
            />
          </div>

          <div className="mt-5">
            <ImageUploadField
              value={form.imageUrl}
              onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
              label="Project Image"
            />
          </div>

          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-ink px-8 py-3 text-sm font-medium text-surface transition hover:bg-primary disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Project"}
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
        <p className="text-secondary-light">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-secondary-light">No projects yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {projects.map((p) => (
            <div
              key={p._id}
              className="flex items-center gap-4 rounded-2xl bg-surface p-4"
            >
              <img
                src={p.imageUrl}
                alt={p.name}
                className="h-16 w-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-ink">{p.name}</p>
                <p className="text-sm text-secondary">
                  {p.location} · {p.year} · {p.status}
                </p>
              </div>
              <button
                onClick={() => openEditForm(p)}
                className="rounded-full border border-secondary/30 px-4 py-2 text-sm text-secondary hover:border-primary hover:text-primary"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="rounded-full bg-red-600/10 px-4 py-2 text-sm text-red-600 hover:bg-red-600/20"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}