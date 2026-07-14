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
    api.get("/contact").then(setEnquiries).finally(() => setLoading(false));
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
      <h1 className="font-display mb-8 text-3xl font-medium text-surface">Enquiries</h1>

      {loading ? (
        <p className="text-secondary-light">Loading enquiries...</p>
      ) : enquiries.length === 0 ? (
        <p className="text-secondary-light">No enquiries yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {enquiries.map((e) => (
            <div key={e._id} className="rounded-2xl bg-surface p-6">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-ink">{e.name}</p>
                  <p className="text-sm text-secondary">
                    {e.email} {e.phone && `· ${e.phone}`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={e.status}
                    onChange={(ev) => handleStatusChange(e._id, ev.target.value)}
                    className="rounded-full border border-secondary/30 px-4 py-1.5 text-sm text-secondary"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDelete(e._id)}
                    className="rounded-full bg-red-600/10 px-4 py-1.5 text-sm text-red-600 hover:bg-red-600/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-secondary">{e.message}</p>
              <p className="mt-2 text-xs text-secondary-light">
                {new Date(e.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}