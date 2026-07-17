import { useState } from "react";
import { Link } from "react-router-dom";

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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FAQ() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % FAQS.length);
  const prev = () => setIndex((i) => (i - 1 + FAQS.length) % FAQS.length);

  return (
    <section id="faq" className="relative overflow-hidden border-t border-secondary/20 bg-ink">
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 md:px-12 lg:px-16 xl:px-20 xl:py-28">
        <div className="mb-16">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-14 bg-primary" />
            <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-secondary-light">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="font-display max-w-4xl text-4xl font-light leading-[0.95] tracking-[-0.04em] text-surface sm:text-5xl lg:text-7xl">
            Questions
            <br />
            <span className="text-secondary-light">&amp; answers</span>
          </h2>
        </div>

        <div className="rounded-[2rem] border border-secondary/20 bg-ink-light p-8 sm:p-12 lg:p-16">
          <div className="mb-12 flex items-start justify-between">
            <span className="font-display text-5xl font-light tracking-[-0.05em] text-primary sm:text-6xl">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="hidden h-px flex-1 bg-secondary/20 lg:ml-12 lg:block" />
          </div>

          <h3 className="font-display max-w-4xl text-3xl font-light leading-tight tracking-[-0.03em] text-surface sm:text-4xl lg:text-5xl">
            {FAQS[index].q}
          </h3>

          <p className="mt-8 max-w-3xl text-base leading-8 text-secondary-light sm:text-lg">
            {FAQS[index].a}
          </p>

          <div className="mt-16 flex flex-col gap-8 border-t border-secondary/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              {FAQS.map((_, i) => (
                <span
                  key={i}
                  className={`h-[2px] rounded-full transition-all duration-500 ${
                    i === index ? "w-16 bg-primary" : "w-8 bg-secondary/30"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={prev}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-secondary/20 text-lg text-surface transition-all duration-300 hover:border-primary hover:bg-primary hover:text-ink"
              >
                ←
              </button>
              <button
                onClick={next}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-secondary/20 text-lg text-surface transition-all duration-300 hover:border-primary hover:bg-primary hover:text-ink"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-secondary/20 pt-12 lg:flex-row lg:items-end">
          <p className="text-base leading-8 text-secondary-light sm:text-lg">
            Have more questions or need additional information?
            <br />
            We'd be delighted to discuss your project.
          </p>

          <Link
            to="/contact"
            className="group inline-flex items-center gap-5 text-sm font-medium uppercase tracking-[0.28em] text-surface transition-colors duration-300 hover:text-primary"
          >
            <span>Get in touch</span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary/20 transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-ink">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
