import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { useApi } from "../context/ApiContext";

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  autoComplete,
  invalid = false,
  errorId,
}) {
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
        autoComplete={autoComplete}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? errorId : undefined}
        className="mt-2 w-full rounded-sm border border-border bg-background px-5 py-3 text-sm outline-none focus:border-copper"
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
  // FIX: tracks which specific field(s) are missing/invalid so they can
  // carry aria-invalid + aria-describedby, instead of only a generic
  // error banner with no field-level signal for screen reader users.
  const [invalidFields, setInvalidFields] = useState({});

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    // FIX: clear a field's invalid flag as soon as the user fixes it,
    // so aria-invalid doesn't keep announcing a field that's now filled in.
    setInvalidFields((prev) => (prev[name] ? { ...prev, [name]: false } : prev));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // FIX: guard against a second submit firing while one is already in
    // flight — previously only the (disabled) submit button prevented
    // this, with no check in the handler itself.
    if (status === "submitting") return;

    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setErrorMsg("Please fill in your name, email and a short message.");
      setInvalidFields({
        name: !form.name,
        email: !form.email,
        message: !form.message,
      });
      return;
    }

    if (!form.consent) {
      setStatus("error");
      setErrorMsg("Please agree to the privacy policy to continue.");
      setInvalidFields({ consent: true });
      return;
    }

    setInvalidFields({});
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
      <div className="grid place-items-center rounded-sm border border-border bg-card p-10 text-center md:p-16">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-copper text-primary-foreground">
          <Check size={22} aria-hidden="true" focusable="false" />
        </span>
        <h2 className="mt-6 font-display text-3xl">Message sent</h2>
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
      aria-labelledby="contact-form-heading"
      className="rounded-sm border border-border bg-card p-7 md:p-10"
      noValidate
    >
      <h2 id="contact-form-heading" className="label-caps text-muted-foreground">
        Send us a message
      </h2>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Field
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          autoComplete="name"
          required
          invalid={invalidFields.name}
          errorId="contact-form-error"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          required
          invalid={invalidFields.email}
          errorId="contact-form-error"
        />
      </div>

      <div className="mt-5">
        <Field
          label="Phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          autoComplete="tel"
        />
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
          aria-invalid={invalidFields.message || undefined}
          aria-describedby={invalidFields.message ? "contact-form-error" : undefined}
          className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-copper"
        />
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          checked={form.consent}
          onChange={handleChange}
          aria-invalid={invalidFields.consent || undefined}
          aria-describedby={invalidFields.consent ? "contact-form-error" : undefined}
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
        <p
          id="contact-form-error"
          className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
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