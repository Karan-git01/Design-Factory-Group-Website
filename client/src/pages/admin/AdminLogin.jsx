import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.username, form.password);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-alt px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-border bg-card p-10"
      >
        <Link
          to="/"
          className="btn-arrow mb-6 inline-flex items-center gap-2 label-caps text-copper"
        >
          <ArrowLeft size={14} /> Back to site
        </Link>

        <h1 className="font-display text-3xl tracking-tight">Admin</h1>
        <p className="mt-2 text-muted-foreground">
          Sign in to manage the site
        </p>

        <div className="mb-5 mt-8">
          <label className="label-caps text-muted-foreground">Username</label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
            required
            className="mt-2 w-full rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-copper"
          />
        </div>

        <div className="mb-6">
          <label className="label-caps text-muted-foreground">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            required
            className="mt-2 w-full rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-copper"
          />
        </div>

        {error && (
          <p className="mb-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-arrow w-full rounded-full bg-foreground py-3.5 label-caps text-background transition hover:bg-copper disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}

















// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAdminAuth } from "../../context/AdminAuthContext";

// export default function AdminLogin() {
//   const { login } = useAdminAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       await login(form.username, form.password);
//       navigate("/admin");
//     } catch (err) {
//       setError(err.message || "Invalid credentials.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <main className="flex min-h-screen items-center justify-center bg-ink px-6">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-sm rounded-3xl bg-surface p-10"
//       >
//         <h1 className="font-display mb-8 text-3xl font-medium text-ink">
//           Admin Login
//         </h1>

//         <div className="mb-5">
//           <label className="mb-2 block text-sm text-secondary">Username</label>
//           <input
//             type="text"
//             value={form.username}
//             onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
//             required
//             className="w-full border-b border-secondary/30 bg-transparent pb-3 text-ink outline-none focus:border-primary"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="mb-2 block text-sm text-secondary">Password</label>
//           <input
//             type="password"
//             value={form.password}
//             onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
//             required
//             className="w-full border-b border-secondary/30 bg-transparent pb-3 text-ink outline-none focus:border-primary"
//           />
//         </div>

//         {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full rounded-full bg-ink py-3 font-medium text-surface transition hover:bg-primary disabled:opacity-50"
//         >
//           {loading ? "Logging in..." : "Log In"}
//         </button>
//       </form>
//     </main>
//   );
// }