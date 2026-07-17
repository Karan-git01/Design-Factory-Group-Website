import { useState } from "react";
import { useApi } from "../context/ApiContext";

export default function ContactForm() {
  const api = useApi();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
    website: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

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
      setForm({ name: "", email: "", phone: "", message: "", consent: false, website: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[2rem] bg-ink-light p-10 text-center">
        <h3 className="font-display mb-2 text-2xl font-medium text-surface">
          Message sent
        </h3>
        <p className="text-secondary-light">
          Thanks for reaching out — we'll get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full bg-primary px-8 py-3 text-surface transition hover:bg-primary-dark"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-[2rem] bg-ink-light p-6 sm:p-8 lg:p-10"
    >
      <input
  type="text"
  name="website"
  value={form.website}
  onChange={handleChange}
  tabIndex="-1"
  autoComplete="off"
  style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
  aria-hidden="true"
/>

      <div className="mb-8">
        <label className="mb-3 block text-[11px] uppercase tracking-[0.3em] text-secondary-light">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border-b border-secondary/30 bg-transparent pb-4 text-lg font-light text-surface outline-none transition-colors duration-300 focus:border-primary"
        />
      </div>

      <div className="mb-8">
        <label className="mb-3 block text-[11px] uppercase tracking-[0.3em] text-secondary-light">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border-b border-secondary/30 bg-transparent pb-4 text-lg font-light text-surface outline-none transition-colors duration-300 focus:border-primary"
        />
      </div>

      <div className="mb-8">
        <label className="mb-3 block text-[11px] uppercase tracking-[0.3em] text-secondary-light">
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border-b border-secondary/30 bg-transparent pb-4 text-lg font-light text-surface outline-none transition-colors duration-300 focus:border-primary"
        />
      </div>

      <div className="mb-10">
        <label className="mb-3 block text-[11px] uppercase tracking-[0.3em] text-secondary-light">
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full resize-none border-b border-secondary/30 bg-transparent pb-4 text-lg font-light leading-8 text-surface outline-none transition-colors duration-300 focus:border-primary"
        />
      </div>

      <label className="mb-10 flex items-start gap-4 text-sm leading-7 text-secondary-light">
        <input
          type="checkbox"
          name="consent"
          checked={form.consent}
          onChange={handleChange}
          className="mt-1 h-4 w-4 accent-primary"
        />
        <span>
          By submitting this form, you agree to the processing of your personal
          data in accordance with our{" "}
          <a
            href="/privacy-policy"
            className="text-surface underline underline-offset-4 transition-colors hover:text-primary"
          >
            Privacy Policy
          </a>
          .
        </span>
      </label>

      {status === "error" && (
        <p className="mb-6 border-l-2 border-red-500 pl-4 text-sm text-red-500">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex items-center gap-4 disabled:opacity-50"
      >
        <span className="font-display text-lg font-light text-surface transition-colors duration-300 group-hover:text-primary">
          {status === "submitting" ? "Sending..." : "Get in touch"}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-surface transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary"
        >
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      </button>
    </form>
  );
}



















 // <form onSubmit={handleSubmit} className="rounded-3xl bg-surface p-8 sm:p-10">
    //   {/* website field — hidden from real users via CSS, bots fill it blindly */}
    //   <input
    //     type="text"
    //     name="website"
    //     value={form.website}
    //     onChange={handleChange}
    //     tabIndex="-1"
    //     autoComplete="off"
    //     className="absolute -left-[9999px]"
    //     aria-hidden="true"
    //   />

    //   <div className="mb-6">
    //     <label className="mb-2 block text-sm text-secondary">Name</label>
    //     <input
    //       type="text"
    //       name="name"
    //       value={form.name}
    //       onChange={handleChange}
    //       required
    //       className="w-full border-b border-secondary/30 bg-transparent pb-3 text-ink outline-none focus:border-primary"
    //     />
    //   </div>

    //   <div className="mb-6">
    //     <label className="mb-2 block text-sm text-secondary">Email</label>
    //     <input
    //       type="email"
    //       name="email"
    //       value={form.email}
    //       onChange={handleChange}
    //       required
    //       className="w-full border-b border-secondary/30 bg-transparent pb-3 text-ink outline-none focus:border-primary"
    //     />
    //   </div>

    //   <div className="mb-6">
    //     <label className="mb-2 block text-sm text-secondary">Phone</label>
    //     <input
    //       type="tel"
    //       name="phone"
    //       value={form.phone}
    //       onChange={handleChange}
    //       className="w-full border-b border-secondary/30 bg-transparent pb-3 text-ink outline-none focus:border-primary"
    //     />
    //   </div>

    //   <div className="mb-6">
    //     <label className="mb-2 block text-sm text-secondary">Message</label>
    //     <textarea
    //       name="message"
    //       value={form.message}
    //       onChange={handleChange}
    //       required
    //       rows={4}
    //       className="w-full border-b border-secondary/30 bg-transparent pb-3 text-ink outline-none focus:border-primary"
    //     />
    //   </div>

    //   <label className="mb-8 flex items-start gap-3 text-sm text-secondary">
    //     <input
    //       type="checkbox"
    //       name="consent"
    //       checked={form.consent}
    //       onChange={handleChange}
    //       className="mt-1"
    //     />
    //     By submitting this form, you agree to the processing of your personal
    //     data in accordance with our{" "}
    //     <a href="/privacy-policy" className="underline hover:text-primary">
    //       Privacy Policy
    //     </a>
    //     .
    //   </label>

    //   {status === "error" && (
    //     <p className="mb-4 text-sm text-red-600">{errorMsg}</p>
    //   )}

    //   <button
    //     type="submit"
    //     disabled={status === "submitting"}
    //     className="w-full rounded-full bg-ink py-4 text-base font-medium text-surface transition hover:bg-primary disabled:opacity-50"
    //   >
    //     {status === "submitting" ? "Sending..." : "Get in touch"}
    //   </button>
    // </form>