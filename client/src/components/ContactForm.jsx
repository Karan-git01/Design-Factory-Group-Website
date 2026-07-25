import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { useApi } from "../context/ApiContext";

function Field({ label, name, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label htmlFor={name} className="label-caps text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-2 w-full rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-copper"
      />
    </div>
  );
}

export default function ContactForm() {
  const api = useApi();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setErrorMsg("Please fill in your name, email and a short message.");
      return;
    }

    if (!form.consent) {
      setStatus("error");
      setErrorMsg("Please agree to the privacy policy to continue.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      await api.post("/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "", consent: false });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="grid place-items-center rounded-[2rem] border border-border bg-card p-10 text-center md:p-16">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-copper text-primary-foreground">
          <Check size={22} />
        </span>
        <h3 className="mt-6 font-display text-3xl">Message sent</h3>
        <p className="mt-2 max-w-md text-muted-foreground">
          Thanks for reaching out — we'll get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 label-caps text-copper link-grow"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-border bg-card p-7 md:p-10"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mt-5">
        <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="label-caps text-muted-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          required
          className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-copper"
        />
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          checked={form.consent}
          onChange={handleChange}
          className="mt-1 h-4 w-4 accent-[color:var(--copper)]"
        />
        <span>
          I agree to the{" "}
          <Link to="/privacy-policy" className="link-underline text-foreground">
            Privacy Policy
          </Link>{" "}
          and consent to being contacted about my enquiry.
        </span>
      </label>

      {status === "error" && (
        <p className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-arrow mt-8 inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 label-caps text-background transition hover:bg-copper disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Get in touch"}
      </button>
    </form>
  );
}




















// import { useState } from "react";
// import { useApi } from "../context/ApiContext";

// export default function ContactForm() {
//   const api = useApi();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//     consent: false,
//   });
//   const [status, setStatus] = useState("idle");
//   const [errorMsg, setErrorMsg] = useState("");

//   function handleChange(e) {
//     const { name, value, type, checked } = e.target;
//     setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (!form.consent) {
//       setStatus("error");
//       setErrorMsg("Please agree to the privacy policy to continue.");
//       return;
//     }

//     setStatus("submitting");
//     setErrorMsg("");

//     try {
//       await api.post("/contact", form);
//       setStatus("success");
//       setForm({ name: "", email: "", phone: "", message: "", consent: false });
//     } catch (err) {
//       setStatus("error");
//       setErrorMsg(err.message || "Something went wrong. Please try again.");
//     }
//   }

//   if (status === "success") {
//     return (
//       <div className="rounded-[2rem] bg-ink-light p-10 text-center">
//         <h3 className="font-display mb-2 text-2xl font-medium text-surface">
//           Message sent
//         </h3>
//         <p className="text-secondary-light">
//           Thanks for reaching out — we'll get back to you shortly.
//         </p>
//         <button
//           onClick={() => setStatus("idle")}
//           className="mt-6 rounded-full bg-primary px-8 py-3 text-surface transition hover:bg-primary-dark"
//         >
//           Send another message
//         </button>
//       </div>
//     );
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="relative rounded-[2rem] bg-ink-light p-6 sm:p-8 lg:p-10"
//     >
//       <div className="mb-8">
//         <label className="mb-3 block text-[11px] uppercase tracking-[0.3em] text-secondary-light">
//           Name
//         </label>
//         <input
//           type="text"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           required
//           className="w-full border-b border-secondary/30 bg-transparent pb-4 text-lg font-light text-surface outline-none transition-colors duration-300 focus:border-primary"
//         />
//       </div>

//       <div className="mb-8">
//         <label className="mb-3 block text-[11px] uppercase tracking-[0.3em] text-secondary-light">
//           Email
//         </label>
//         <input
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           required
//           className="w-full border-b border-secondary/30 bg-transparent pb-4 text-lg font-light text-surface outline-none transition-colors duration-300 focus:border-primary"
//         />
//       </div>

//       <div className="mb-8">
//         <label className="mb-3 block text-[11px] uppercase tracking-[0.3em] text-secondary-light">
//           Phone
//         </label>
//         <input
//           type="tel"
//           name="phone"
//           value={form.phone}
//           onChange={handleChange}
//           className="w-full border-b border-secondary/30 bg-transparent pb-4 text-lg font-light text-surface outline-none transition-colors duration-300 focus:border-primary"
//         />
//       </div>

//       <div className="mb-10">
//         <label className="mb-3 block text-[11px] uppercase tracking-[0.3em] text-secondary-light">
//           Message
//         </label>
//         <textarea
//           name="message"
//           value={form.message}
//           onChange={handleChange}
//           required
//           rows={5}
//           className="w-full resize-none border-b border-secondary/30 bg-transparent pb-4 text-lg font-light leading-8 text-surface outline-none transition-colors duration-300 focus:border-primary"
//         />
//       </div>

//       <label className="mb-10 flex items-start gap-4 text-sm leading-7 text-secondary-light">
//         <input
//           type="checkbox"
//           name="consent"
//           checked={form.consent}
//           onChange={handleChange}
//           className="mt-1 h-4 w-4 accent-primary"
//         />
//         <span>
//           By submitting this form, you agree to the processing of your personal
//           data in accordance with our{" "}
//           <a
//             href="/privacy-policy"
//             className="text-surface underline underline-offset-4 transition-colors hover:text-primary"
//           >
//             Privacy Policy
//           </a>
//           .
//         </span>
//       </label>

//       {status === "error" && (
//         <p className="mb-6 border-l-2 border-red-500 pl-4 text-sm text-red-500">
//           {errorMsg}
//         </p>
//       )}

//       <button
//         type="submit"
//         disabled={status === "submitting"}
//         className="group inline-flex items-center gap-4 disabled:opacity-50"
//       >
//         <span className="font-display text-lg font-light text-surface transition-colors duration-300 group-hover:text-primary">
//           {status === "submitting" ? "Sending..." : "Get in touch"}
//         </span>
//         <svg
//           aria-hidden="true"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="1.8"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="h-5 w-5 text-surface transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary"
//         >
//           <path d="M5 12h14" />
//           <path d="M13 6l6 6-6 6" />
//         </svg>
//       </button>
//     </form>
//   );
// }