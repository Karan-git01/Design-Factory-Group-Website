import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";


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
  const current = FAQS[index];

  const next = () => setIndex((i) => (i + 1) % FAQS.length);
  const prev = () => setIndex((i) => (i - 1 + FAQS.length) % FAQS.length);

  return (
    <section id="faq" className="mx-auto max-w-7xl overflow-x-hidden px-5 py-20 sm:px-8 md:py-32">
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <div>
          <Reveal>
            <span className="label-caps text-copper">— Questions</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Questions <em className="text-copper">&amp;</em> answers.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-sm text-muted-foreground">
              A few we hear often. Not seeing yours?
            </p>
            <Link
              to="/contact"
              className="btn-arrow mt-4 inline-flex items-center gap-2 label-caps text-copper"
            >
              Get in touch <ArrowRight size={14} />
            </Link>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-12 max-w-sm rounded-2xl border border-border bg-card p-6">
              <p className="label-caps text-muted-foreground">Response time</p>
              <p className="mt-3 font-display text-lg leading-snug tracking-tight text-foreground">
                Most enquiries hear back from our team within 24 hours.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="rounded-[2rem] border border-border bg-card p-8 md:p-12">
            <div className="flex items-center justify-between">
              <span className="font-display text-4xl text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex gap-1.5">
                {FAQS.map((_, j) => (
                  <span
                    key={j}
                    className={`h-1.5 w-6 rounded-full transition ${
                      j === index ? "bg-copper" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>

            <h3 className="mt-8 font-display text-2xl leading-tight tracking-tight md:text-4xl">
              {current.q}
            </h3>
            <p className="mt-6 max-w-xl text-muted-foreground">{current.a}</p>

            <div className="mt-10 flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous question"
                className="grid h-12 w-12 place-items-center rounded-full border border-border transition hover:border-foreground/40"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={next}
                aria-label="Next question"
                className="grid h-12 w-12 place-items-center rounded-full bg-foreground text-background transition hover:bg-copper"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}















// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import TextReveal from "./TextReveal";
// import { Reveal } from "./Reveal";


// const FAQS = [
//   {
//     q: "Do you handle both design and construction?",
//     a: "Yes. We provide a full design and build service, allowing all stages of the project to be developed and executed within one coordinated process.",
//   },
//   {
//     q: "How long does a typical project take?",
//     a: "Timelines vary depending on scope and scale, but most residential projects move from initial concept to completion within 12–24 months.",
//   },
//   {
//     q: "What is the process for starting a project with you?",
//     a: "It begins with an initial consultation, followed by a project briefing, concept development, detailed design, and finally construction.",
//   },
//   {
//     q: "Do you work on projects outside your main branch location?",
//     a: "Yes. We take on projects across the regions served by our branches, and can discuss feasibility for other locations during your initial consultation.",
//   },
//   {
//     q: "What types of projects do you take on?",
//     a: "We specialize in high-end residential design and build projects, including private homes, renovations, and architectural developments.",
//   },
//   {
//     q: "How involved will I be during the project?",
//     a: "Clients work directly with our team throughout, with regular updates and decision points at each stage.",
//   },
//   {
//     q: "Do you provide cost estimates before starting?",
//     a: "Yes. During the project briefing stage, we define scope, budget range, and key requirements to give you a clear picture of costs.",
//   },
//   {
//     q: "Can I make changes once construction has started?",
//     a: "Minor changes can often be accommodated, though significant changes may affect timeline and cost. We'll always discuss implications with you first.",
//   },
// ];

// const faqSchema = {
//   "@context": "https://schema.org",
//   "@type": "FAQPage",
//   mainEntity: FAQS.map((f) => ({
//     "@type": "Question",
//     name: f.q,
//     acceptedAnswer: { "@type": "Answer", text: f.a },
//   })),
// };

// export default function FAQ() {
//   const [index, setIndex] = useState(0);
//   const current = FAQS[index];

//   const next = () => setIndex((i) => (i + 1) % FAQS.length);
//   const prev = () => setIndex((i) => (i - 1 + FAQS.length) % FAQS.length);

//   return (
//     <section id="faq" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-32">
//       <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

//       <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
//         <div>
//           <Reveal>
//             <span className="label-caps text-copper">— Questions</span>
//           </Reveal>
//           <Reveal delay={80}>
//             <TextReveal
//               text="Questions & answers."
//               emphasize={["&"]}
//               className="mt-4 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl whitespace-nowrap"
//             />
//           </Reveal>
//           <Reveal delay={160}>
//             <p className="mt-6 max-w-sm text-muted-foreground">
//               A few we hear often. Not seeing yours?
//             </p>
//             <Link
//               to="/contact"
//               className="btn-arrow mt-4 inline-flex items-center gap-2 label-caps text-copper"
//             >
//               Get in touch <ArrowRight size={14} />
//             </Link>
//           </Reveal>
//         </div>

//         <Reveal delay={100}>
//           <div className="rounded-[2rem] border border-border bg-card p-8 md:p-12">
//             <div className="flex items-center justify-between">
//               <span className="font-display text-4xl text-muted-foreground">
//                 {String(index + 1).padStart(2, "0")}
//               </span>
//               <div className="flex gap-1.5">
//                 {FAQS.map((_, j) => (
//                   <span
//                     key={j}
//                     className={`h-1.5 w-6 rounded-full transition ${
//                       j === index ? "bg-copper" : "bg-border"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>

//             <h3 className="mt-8 font-display text-2xl leading-tight tracking-tight md:text-4xl">
//               {current.q}
//             </h3>
//             <p className="mt-6 max-w-xl text-muted-foreground">{current.a}</p>

//             <div className="mt-10 flex items-center gap-3">
//               <button
//                 onClick={prev}
//                 aria-label="Previous question"
//                 className="grid h-12 w-12 place-items-center rounded-full border border-border transition hover:border-foreground/40"
//               >
//                 <ArrowLeft size={16} />
//               </button>
//               <button
//                 onClick={next}
//                 aria-label="Next question"
//                 className="grid h-12 w-12 place-items-center rounded-full bg-foreground text-background transition hover:bg-copper"
//               >
//                 <ArrowRight size={16} />
//               </button>
//             </div>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }



