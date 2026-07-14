import { useEffect, useState } from "react";
import { useApi } from "../../context/ApiContext";
import AdminLayout from "../../components/admin/AdminLayout";
import ImageUploadField from "../../components/admin/ImageUploadField";

const EMPTY_FORM = {
  name: "",
  slug: "",
  isMain: false,
  address: "",
  phone: "",
  email: "",
  photoUrl: "",
  workingHours: "",
  latitude: "",
  longitude: "",
};

export default function AdminBranches() {
  const api = useApi();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function loadBranches() {
    setLoading(true);
    api.get("/branches").then(setBranches).finally(() => setLoading(false));
  }

  useEffect(() => {
    loadBranches();
  }, []);

  function openCreateForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
    setError("");
  }

  function openEditForm(branch) {
    setForm({
      name: branch.name,
      slug: branch.slug,
      isMain: branch.isMain,
      address: branch.address,
      phone: branch.phone,
      email: branch.email,
      photoUrl: branch.photoUrl,
      workingHours: branch.workingHours || "",
      latitude: branch.latitude,
      longitude: branch.longitude,
    });
    setEditingId(branch._id);
    setShowForm(true);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
    };

    try {
      if (editingId) {
        await api.put(`/branches/${editingId}`, payload);
      } else {
        await api.post("/branches", payload);
      }
      setShowForm(false);
      loadBranches();
    } catch (err) {
      setError(err.message || "Failed to save branch.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this branch? This cannot be undone.")) return;
    await api.del(`/branches/${id}`);
    loadBranches();
  }

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-medium text-surface">Branches</h1>
        <button
          onClick={openCreateForm}
          className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-surface transition hover:bg-primary-dark"
        >
          + Add Branch
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-10 rounded-3xl bg-surface p-8">
          <h2 className="font-display mb-6 text-xl font-medium text-ink">
            {editingId ? "Edit Branch" : "New Branch"}
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
              <label className="mb-2 block text-sm text-secondary">
                Slug (used in URL, e.g. "main-office")
              </label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="w-full border-b border-secondary/30 bg-transparent pb-2 text-ink outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-secondary">Phone</label>
              <input
                type="text"
                required
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full border-b border-secondary/30 bg-transparent pb-2 text-ink outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-secondary">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full border-b border-secondary/30 bg-transparent pb-2 text-ink outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-secondary">Latitude</label>
              <input
                type="number"
                step="any"
                required
                value={form.latitude}
                onChange={(e) => setForm((f) => ({ ...f, latitude: e.target.value }))}
                className="w-full border-b border-secondary/30 bg-transparent pb-2 text-ink outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-secondary">Longitude</label>
              <input
                type="number"
                step="any"
                required
                value={form.longitude}
                onChange={(e) => setForm((f) => ({ ...f, longitude: e.target.value }))}
                className="w-full border-b border-secondary/30 bg-transparent pb-2 text-ink outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm text-secondary">Address</label>
            <input
              type="text"
              required
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              className="w-full border-b border-secondary/30 bg-transparent pb-2 text-ink outline-none focus:border-primary"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm text-secondary">
              Working Hours (optional)
            </label>
            <input
              type="text"
              value={form.workingHours}
              onChange={(e) => setForm((f) => ({ ...f, workingHours: e.target.value }))}
              className="w-full border-b border-secondary/30 bg-transparent pb-2 text-ink outline-none focus:border-primary"
            />
          </div>

          <label className="mt-5 flex items-center gap-3 text-sm text-secondary">
            <input
              type="checkbox"
              checked={form.isMain}
              onChange={(e) => setForm((f) => ({ ...f, isMain: e.target.checked }))}
            />
            This is the main branch
          </label>

          <div className="mt-5">
            <ImageUploadField
              value={form.photoUrl}
              onChange={(url) => setForm((f) => ({ ...f, photoUrl: url }))}
              label="Branch Photo"
            />
          </div>

          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-ink px-8 py-3 text-sm font-medium text-surface transition hover:bg-primary disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Branch"}
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
        <p className="text-secondary-light">Loading branches...</p>
      ) : branches.length === 0 ? (
        <p className="text-secondary-light">No branches yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {branches.map((b) => (
            <div key={b._id} className="flex items-center gap-4 rounded-2xl bg-surface p-4">
              <img src={b.photoUrl} alt={b.name} loading="lazy" className="h-16 w-16 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="font-medium text-ink">
                  {b.name} {b.isMain && <span className="text-primary">(Main)</span>}
                </p>
                <p className="text-sm text-secondary">{b.address}</p>
              </div>
              <button
                onClick={() => openEditForm(b)}
                className="rounded-full border border-secondary/30 px-4 py-2 text-sm text-secondary hover:border-primary hover:text-primary"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(b._id)}
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