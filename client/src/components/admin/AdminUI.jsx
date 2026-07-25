import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useLenis } from "../../context/LenisContext";

export function AdminHeader({ title, subtitle, action }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl tracking-tight md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Modal({ children, title, onClose }) {
  const lenisRef = useLenis();
  const scrollYRef = useRef(0);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) lenis.stop();

    scrollYRef.current = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollYRef.current);

      if (lenis) lenis.start();
    };
  }, [lenisRef]);

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 grid place-items-end bg-foreground/40 backdrop-blur-sm md:place-items-center"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-border bg-background p-6 md:rounded-3xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl">{title}</h2>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-border"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ModalActions({ onCancel, onSave, saving, saveLabel = "Save" }) {
  return (
    <div className="mt-8 flex justify-end gap-3">
      <button
        onClick={onCancel}
        className="rounded-full border border-border px-5 py-2.5 label-caps hover:border-foreground/40"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        disabled={saving}
        className="rounded-full bg-foreground px-5 py-2.5 label-caps text-background hover:bg-copper disabled:opacity-50"
      >
        {saving ? "Saving..." : saveLabel}
      </button>
    </div>
  );
}