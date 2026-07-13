import { useState } from "react";

const FAQS = [
  {
    q: "Do you handle both design and construction?",
    a: "Yes. We provide a full design and build service, allowing all stages of the project to be developed and executed within one coordinated process.",
  },
  {
    q: "How long does a typical project take?",
    a: "Timelines vary depending on scope and scale, but most residential projects move from initial concept to completion within 12–24 months.",
  },
  {
    q: "What is the process for starting a project with you?",
    a: "It begins with an initial consultation, followed by a project briefing, concept development, detailed design, and finally construction.",
  },
  {
    q: "Do you work on projects outside your main branch location?",
    a: "Yes. We take on projects across the regions served by our branches, and can discuss feasibility for other locations during your initial consultation.",
  },
  {
    q: "What types of projects do you take on?",
    a: "We specialize in high-end residential design and build projects, including private homes, renovations, and architectural developments.",
  },
  {
    q: "How involved will I be during the project?",
    a: "Clients work directly with our team throughout, with regular updates and decision points at each stage.",
  },
  {
    q: "Do you provide cost estimates before starting?",
    a: "Yes. During the project briefing stage, we define scope, budget range, and key requirements to give you a clear picture of costs.",
  },
  {
    q: "Can I make changes once construction has started?",
    a: "Minor changes can often be accommodated, though significant changes may affect timeline and cost. We'll always discuss implications with you first.",
  },
];

export default function FAQ() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % FAQS.length);
  const prev = () => setIndex((i) => (i - 1 + FAQS.length) % FAQS.length);

  return (
    <section id="faq" className="bg-ink px-6 py-24 sm:px-12">
      <h2 className="font-display mb-16 text-4xl font-medium text-surface sm:text-5xl">
        Questions <span className="text-secondary-light">&amp; answers</span>
      </h2>

      <div className="rounded-3xl bg-surface p-10 sm:p-14">
        <div className="mb-10 flex items-start justify-between">
          <span className="font-display text-4xl font-medium text-ink">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="font-display mb-4 text-2xl font-medium text-ink">
          {FAQS[index].q}
        </h3>
        <p className="text-secondary">{FAQS[index].a}</p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-2">
          {FAQS.map((_, i) => (
            <span
              key={i}
              className={`h-1 w-8 rounded-full transition ${
                i === index ? "bg-surface" : "bg-secondary/40"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={prev}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-surface transition hover:bg-primary"
          >
            ←
          </button>
          <button
            onClick={next}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-surface transition hover:bg-primary"
          >
            →
          </button>
        </div>
      </div>

      <p className="mt-16 text-center text-secondary-light">
        Have more questions or need additional information? We are here to
        help.
      </p>
      <button className="mx-auto mt-6 block w-full rounded-full bg-surface py-4 text-base font-medium text-ink transition hover:bg-primary hover:text-surface sm:w-auto sm:px-10">
        Get in touch
      </button>
    </section>
  );
}