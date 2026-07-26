import { useEffect, useState } from "react";

const DEFAULT_ITEMS = [
  "Award-Winning Design",
  "Sustainable Builds",
  "Est. 2004",
  "Full-Service Architecture",
  "Bespoke Residences",
];

export default function MarqueeStrip({ items = DEFAULT_ITEMS }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const Divider = () => (
    <span
      aria-hidden="true"
      className="mx-4 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-copper/80 sm:mx-6 md:mx-8"
    />
  );

  const Row = ({ ariaHidden = false }) => (
    <div
      className="flex shrink-0 items-center whitespace-nowrap px-4"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="label-caps text-background/90">{item}</span>
          <Divider />
        </span>
      ))}
    </div>
  );

  if (reduced) {
    return (
      <section className="marquee-strip relative w-full overflow-x-auto overflow-y-hidden border-y border-background/10 bg-ink py-5">
        <Row />
      </section>
    );
  }

  return (
    <section
      className="marquee-strip group relative w-full overflow-hidden border-y border-background/10 bg-ink py-5"
      aria-label="Studio highlights"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-ink to-transparent sm:w-16 md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-ink to-transparent sm:w-16 md:w-24" />
      <div className="marquee-track flex w-max">
        <Row />
        <Row ariaHidden />
      </div>
    </section>
  );
}