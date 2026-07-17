import { useEffect, useState } from "react";
import { useApi } from "../../context/ApiContext";
import AdminLayout from "../../components/admin/AdminLayout";

const STATUS_OPTIONS = ["new", "contacted", "closed"];

export default function AdminEnquiries() {
  const api = useApi();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  function loadEnquiries() {
    setLoading(true);
    api
      .get("/contact")
      .then(setEnquiries)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadEnquiries();
  }, []);

  async function handleStatusChange(id, status) {
    await api.patch(`/contact/${id}`, { status });
    loadEnquiries();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this enquiry? This cannot be undone.")) return;
    await api.del(`/contact/${id}`);
    loadEnquiries();
  }

  return (
    <AdminLayout>
      <h1 className="font-display mb-8 text-3xl font-medium text-surface">
        Enquiries
      </h1>

      {loading ? (
        <p className="text-secondary-light">Loading enquiries...</p>
      ) : enquiries.length === 0 ? (
        <p className="text-secondary-light">No enquiries yet.</p>
      ) : (
        <div className="space-y-5">
          {enquiries.map((e) => (
            <div
              key={e._id}
              className="group rounded-[2rem] border border-white/10 bg-[#171717] p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl font-light tracking-[-0.03em] text-white">
                      {e.name}
                    </h3>

                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-primary">
                      {e.status}
                    </span>
                  </div>

                  <div className="mb-5 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/50">
                    <span>{e.email}</span>

                    {e.phone && <span>{e.phone}</span>}
                  </div>

                  <p className="leading-7 text-white/65">{e.message}</p>

                  <p className="mt-5 text-xs uppercase tracking-[0.18em] text-white/30">
                    {new Date(e.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <select
                    value={e.status}
                    onChange={(ev) =>
                      handleStatusChange(e._id, ev.target.value)
                    }
                    className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white outline-none transition focus:border-primary"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option
                        key={s}
                        value={s}
                        className="bg-[#171717] text-white"
                      >
                        {s}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleDelete(e._id)}
                    className="rounded-full border border-red-500/20 bg-red-500/10 px-6 py-3 text-sm font-medium text-red-300 transition-all duration-300 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
