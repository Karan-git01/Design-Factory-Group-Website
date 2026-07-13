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
    honeypot: "", // hidden field — real users never fill this
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
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
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        consent: false,
        honeypot: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl bg-surface p-10 text-center">
        <h3 className="font-display mb-2 text-2xl font-medium text-ink">
          Message sent
        </h3>
        <p className="text-secondary">
          Thanks for reaching out — we'll get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full bg-ink px-8 py-3 text-surface transition hover:bg-primary"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-surface p-8 sm:p-10">
      {/* Honeypot field — hidden from real users via CSS, bots fill it blindly */}
      <input
        type="text"
        name="honeypot"
        value={form.honeypot}
        onChange={handleChange}
        tabIndex="-1"
        autoComplete="off"
        className="absolute -left-[9999px]"
        aria-hidden="true"
      />

      <div className="mb-6">
        <label className="mb-2 block text-sm text-secondary">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border-b border-secondary/30 bg-transparent pb-3 text-ink outline-none focus:border-primary"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm text-secondary">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border-b border-secondary/30 bg-transparent pb-3 text-ink outline-none focus:border-primary"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm text-secondary">Phone</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border-b border-secondary/30 bg-transparent pb-3 text-ink outline-none focus:border-primary"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm text-secondary">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full border-b border-secondary/30 bg-transparent pb-3 text-ink outline-none focus:border-primary"
        />
      </div>

      <label className="mb-8 flex items-start gap-3 text-sm text-secondary">
        <input
          type="checkbox"
          name="consent"
          checked={form.consent}
          onChange={handleChange}
          className="mt-1"
        />
        By submitting this form, you agree to the processing of your personal
        data in accordance with our{" "}
        <a href="/privacy-policy" className="underline hover:text-primary">
          Privacy Policy
        </a>
        .
      </label>

      {status === "error" && (
        <p className="mb-4 text-sm text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-ink py-4 text-base font-medium text-surface transition hover:bg-primary disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Get in touch"}
      </button>
    </form>
  );
}