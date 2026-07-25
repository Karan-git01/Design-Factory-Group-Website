export function TextField({ label, value, onChange, type = "text", placeholder }) {
  return (
    <label className="block">
      <span className="label-caps text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-copper"
      />
    </label>
  );
}

export function TextArea({ label, value, onChange, rows = 4 }) {
  return (
    <label className="block">
      <span className="label-caps text-muted-foreground">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-copper"
      />
    </label>
  );
}

export function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="label-caps text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-copper"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}