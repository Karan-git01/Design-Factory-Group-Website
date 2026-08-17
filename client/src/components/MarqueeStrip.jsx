import { useEffect, useState } from "react";

const DEFAULT_ITEMS = [
  "Turnkey Project Delivery",
  "Vastu-Compliant Design",
  "In-House Design & Execution Team",
  "Design-to-Handover Construction",
  "Custom Homes Across India",
  "260+ Clients Served",
  "Present in 28 States",
  "850K+ Sq. Ft. Delivered",
  "Residential & Interior Design",
  "One Accountable Team",
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

  // A real <ul>/<li> list instead of bare spans — this is what search
  // engines and screen readers parse as a list of distinct items, rather
  // than one run-on string of text.
  const Row = ({ ariaHidden = false }) => (
    <ul
      className="flex shrink-0 list-none items-center whitespace-nowrap px-4"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((item, i) => (
        <li key={i} className="flex items-center">
          <span className="label-caps text-background/90">{item}</span>
          <Divider />
        </li>
      ))}
    </ul>
  );

  if (reduced) {
    return (
      <section
        className="marquee-strip relative w-full overflow-x-auto overflow-y-hidden border-y border-background/10 bg-ink py-5"
        aria-label="Studio highlights"
      >
        <h2 className="sr-only">Studio Highlights</h2>
        <Row />
      </section>
    );
  }

  return (
    <section
      className="marquee-strip group relative w-full overflow-hidden border-y border-background/10 bg-ink py-5"
      aria-label="Studio highlights"
    >
      {/* Visually hidden but crawlable heading — gives the strip a real
          document-outline entry instead of relying only on aria-label,
          which search engines weight less than actual page content. */}
      <h2 className="sr-only">Studio Highlights</h2>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-ink to-transparent sm:w-16 md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-ink to-transparent sm:w-16 md:w-24" />
      <div className="marquee-track flex w-max">
        <Row />
        <Row ariaHidden />
      </div>
    </section>
  );
}