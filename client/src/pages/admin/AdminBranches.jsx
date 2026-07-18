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
    api
      .get("/branches")
      .then(setBranches)
      .finally(() => setLoading(false));
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
      <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-5 flex items-center gap-4">
            <div className="h-px w-14 bg-primary" />
            <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-white/45">
              Admin Panel
            </span>
          </div>

          <h1 className="font-display text-4xl font-light tracking-[-0.04em] text-white md:text-5xl">
            Branches
          </h1>

          <p className="mt-4 max-w-xl leading-8 text-white/55">
            Manage all office locations, contact information, maps and featured
            branches from a single place.
          </p>
        </div>

        <button
          onClick={openCreateForm}
          className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-primary px-7 py-3 text-sm font-medium text-surface transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_35px_rgba(214,170,74,0.25)]"
        >
          + Add Branch
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-14 rounded-[2rem] border border-white/10 bg-[#171717] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8 lg:p-10"
        >
          <h2 className="font-display mb-10 text-3xl font-light tracking-[-0.03em] text-white">
            {editingId ? "Edit Branch" : "New Branch"}
          </h2>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <label className="mb-3 block text-[11px] font-medium uppercase tracking-[0.35em] text-white/45">
                Name
              </label>

              <input
                type="text"
                required
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-primary focus:bg-white/[0.05]"
              />
            </div>

            <div>
              <label className="mb-3 block text-[11px] font-medium uppercase tracking-[0.35em] text-white/45">
                Slug
              </label>

              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) =>
                  setForm((f) => ({ ...f, slug: e.target.value }))
                }
                placeholder="main-office"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-primary focus:bg-white/[0.05]"
              />

              <p className="mt-2 text-xs text-white/35">
                Used in the branch URL.
              </p>
            </div>

            <div>
              <label className="mb-3 block text-[11px] font-medium uppercase tracking-[0.35em] text-white/45">
                Phone
              </label>

              <input
                type="text"
                required
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-primary focus:bg-white/[0.05]"
              />
            </div>

            <div>
              <label className="mb-3 block text-[11px] font-medium uppercase tracking-[0.35em] text-white/45">
                Email
              </label>

              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-primary focus:bg-white/[0.05]"
              />
            </div>

            <div>
              <label className="mb-3 block text-[11px] font-medium uppercase tracking-[0.35em] text-white/45">
                Latitude
              </label>

              <input
                type="number"
                step="any"
                required
                value={form.latitude}
                onChange={(e) =>
                  setForm((f) => ({ ...f, latitude: e.target.value }))
                }
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-primary focus:bg-white/[0.05]"
              />
            </div>

            <div>
              <label className="mb-3 block text-[11px] font-medium uppercase tracking-[0.35em] text-white/45">
                Longitude
              </label>

              <input
                type="number"
                step="any"
                required
                value={form.longitude}
                onChange={(e) =>
                  setForm((f) => ({ ...f, longitude: e.target.value }))
                }
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-primary focus:bg-white/[0.05]"
              />
            </div>
          </div>

          <div className="mt-8">
            <label className="mb-3 block text-[11px] font-medium uppercase tracking-[0.35em] text-white/45">
              Address
            </label>

            <input
              type="text"
              required
              value={form.address}
              onChange={(e) =>
                setForm((f) => ({ ...f, address: e.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-primary focus:bg-white/[0.05]"
            />
          </div>
          <div className="mt-8">
            <label className="mb-3 block text-[11px] font-medium uppercase tracking-[0.35em] text-white/45">
              Working Hours
            </label>

            <input
              type="text"
              value={form.workingHours}
              onChange={(e) =>
                setForm((f) => ({ ...f, workingHours: e.target.value }))
              }
              placeholder="Mon – Sat • 9:00 AM – 6:00 PM"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-primary focus:bg-white/[0.05]"
            />

            <p className="mt-2 text-xs text-white/35">
              Optional — display office operating hours.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-primary/30">
            <label className="flex cursor-pointer items-center gap-4">
              <input
                type="checkbox"
                checked={form.isMain}
                onChange={(e) =>
                  setForm((f) => ({ ...f, isMain: e.target.checked }))
                }
                className="h-5 w-5 rounded border-white/20 bg-transparent text-primary focus:ring-primary"
              />

              <div>
                <p className="text-sm font-medium text-white">Main Branch</p>

                <p className="mt-1 text-xs leading-6 text-white/45">
                  Mark this office as the company's primary branch.
                </p>
              </div>
            </label>
          </div>

          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/45">
                Branch Photo
              </p>

              <p className="mt-2 text-sm text-white/40">
                Upload a high-quality image representing this branch.
              </p>
            </div>

            <ImageUploadField
              value={form.photoUrl}
              onChange={(url) => setForm((f) => ({ ...f, photoUrl: url }))}
              label="Branch Photo"
            />
          </div>

          {error && (
            <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_35px_rgba(214,170,74,0.25)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Branch"}
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-8 py-3.5 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.03] py-20">
          <p className="text-white/50">Loading branches...</p>
        </div>
      ) : branches.length === 0 ? (
        <div className="flex items-center justify-center rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] py-20">
          <p className="text-white/45">No branches yet.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {branches.map((b) => (
            <div
              key={b._id}
              className="group flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-[#171717] p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] lg:flex-row lg:items-center"
            >
              <img
                src={b.photoUrl}
                alt={b.name}
                loading="lazy"
                className="h-24 w-full rounded-2xl object-cover lg:h-24 lg:w-32"
              />

              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-2xl font-light tracking-[-0.03em] text-white">
                    {b.name}
                  </h3>

                  {b.isMain && (
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-primary">
                      Main Branch
                    </span>
                  )}
                </div>

                <p className="max-w-2xl text-sm leading-7 text-white/50">
                  {b.address}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => openEditForm(b)}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:border-primary hover:text-primary"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(b._id)}
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
