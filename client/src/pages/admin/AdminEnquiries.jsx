import { useEffect, useState } from "react";
import { Trash2, Mail, Phone } from "lucide-react";
import { useApi } from "../../context/ApiContext";
import AdminLayout from "../../components/admin/AdminLayout";
import { AdminHeader } from "../../components/admin/AdminUI";

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
      <AdminHeader
        title="Enquiries"
        subtitle={!loading ? `${enquiries.length} total` : undefined}
      />

      {loading ? (
        <p className="text-muted-foreground">Loading enquiries...</p>
      ) : enquiries.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
          <p className="font-display text-2xl">No enquiries yet.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Contact form submissions will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {enquiries.map((e) => (
            <article key={e._id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display text-xl">{e.name}</p>
                    <span className="label-caps rounded-full border border-border px-2 py-0.5 text-foreground/70">
                      {e.status}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <a
                      href={`mailto:${e.email}`}
                      className="inline-flex items-center gap-1 link-underline"
                    >
                      <Mail size={11} /> {e.email}
                    </a>
                    {e.phone && (
                      <a
                        href={`tel:${e.phone}`}
                        className="inline-flex items-center gap-1 link-underline"
                      >
                        <Phone size={11} /> {e.phone}
                      </a>
                    )}
                    <span>{new Date(e.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={e.status}
                    onChange={(ev) => handleStatusChange(e._id, ev.target.value)}
                    className={`rounded-full border border-border bg-background px-3 py-1.5 text-xs capitalize outline-none ${
                      e.status === "new" ? "text-copper" : ""
                    }`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDelete(e._id)}
                    className="grid h-9 w-9 place-items-center rounded-full border border-border text-destructive hover:border-destructive/60"
                    aria-label="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <p className="mt-4 rounded-xl bg-cream-alt p-4 text-sm text-foreground/85">
                {e.message}
              </p>
            </article>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}










// import { useEffect, useState } from "react";
// import { useApi } from "../../context/ApiContext";
// import AdminLayout from "../../components/admin/AdminLayout";

// const STATUS_OPTIONS = ["new", "contacted", "closed"];

// export default function AdminEnquiries() {
//   const api = useApi();
//   const [enquiries, setEnquiries] = useState([]);
//   const [loading, setLoading] = useState(true);

//   function loadEnquiries() {
//     setLoading(true);
//     api
//       .get("/contact")
//       .then(setEnquiries)
//       .finally(() => setLoading(false));
//   }

//   useEffect(() => {
//     loadEnquiries();
//   }, []);

//   async function handleStatusChange(id, status) {
//     await api.patch(`/contact/${id}`, { status });
//     loadEnquiries();
//   }

//   async function handleDelete(id) {
//     if (!confirm("Delete this enquiry? This cannot be undone.")) return;
//     await api.del(`/contact/${id}`);
//     loadEnquiries();
//   }

//   return (
//     <AdminLayout>
//       <h1 className="font-display mb-8 text-3xl font-medium text-surface">
//         Enquiries
//       </h1>

//       {loading ? (
//         <p className="text-secondary-light">Loading enquiries...</p>
//       ) : enquiries.length === 0 ? (
//         <p className="text-secondary-light">No enquiries yet.</p>
//       ) : (
//         <div className="space-y-5">
//           {enquiries.map((e) => (
//             <div
//               key={e._id}
//               className="group rounded-[2rem] border border-white/10 bg-[#171717] p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
//             >
//               <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
//                 <div className="min-w-0 flex-1">
//                   <div className="mb-3 flex flex-wrap items-center gap-3">
//                     <h3 className="font-display text-2xl font-light tracking-[-0.03em] text-white">
//                       {e.name}
//                     </h3>

//                     <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-primary">
//                       {e.status}
//                     </span>
//                   </div>

//                   <div className="mb-5 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/50">
//                     <span>{e.email}</span>

//                     {e.phone && <span>{e.phone}</span>}
//                   </div>

//                   <p className="leading-7 text-white/65">{e.message}</p>

//                   <p className="mt-5 text-xs uppercase tracking-[0.18em] text-white/30">
//                     {new Date(e.createdAt).toLocaleString()}
//                   </p>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-3">
//                   <select
//                     value={e.status}
//                     onChange={(ev) =>
//                       handleStatusChange(e._id, ev.target.value)
//                     }
//                     className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white outline-none transition focus:border-primary"
//                   >
//                     {STATUS_OPTIONS.map((s) => (
//                       <option
//                         key={s}
//                         value={s}
//                         className="bg-[#171717] text-white"
//                       >
//                         {s}
//                       </option>
//                     ))}
//                   </select>

//                   <button
//                     onClick={() => handleDelete(e._id)}
//                     className="rounded-full border border-red-500/20 bg-red-500/10 px-6 py-3 text-sm font-medium text-red-300 transition-all duration-300 hover:bg-red-500/20"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </AdminLayout>
//   );
// }
