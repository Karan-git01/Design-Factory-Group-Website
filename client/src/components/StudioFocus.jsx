import { Target, Compass, ShieldCheck, Users } from "lucide-react";
import { Reveal } from "../components/Reveal";

const philosophyPoints = [
  {
    n: "01",
    title: "Focused expertise",
    body: "We concentrate on a limited number of projects to ensure full attention, consistency and control at every stage of the process.",
  },
  {
    n: "02",
    title: "Thoughtful execution",
    body: "Every element is carefully considered — from overall composition to the smallest architectural and technical decisions, with precision.",
  },
  {
    n: "03",
    title: "Long-term quality",
    body: "Our work is guided by durability, relevance and carefully developed solutions that remain strong, refined and appropriate over time.",
  },
  {
    n: "04",
    title: "Collaborative partnership",
    body: "We believe exceptional projects are built through transparent communication, close collaboration and a shared vision from concept to completion.",
  },
];

const philosophyIcons = [Target, Compass, ShieldCheck, Users];

export default function Philosophy() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-32">
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <div>
          <Reveal>
            <span className="label-caps text-copper">— Studio focus</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
              A modern studio with a clear <em className="text-copper">focus</em>.
            </h2>
          </Reveal>
        </div>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {philosophyPoints.map((p, i) => {
          const Icon = philosophyIcons[i];
          const dark = i % 2 === 1;
          return (
            <Reveal key={p.n} delay={i * 70}>
              <div
                className={`card-lift group flex h-full flex-col justify-between rounded-3xl border p-7 md:p-9 ${
                  dark
                    ? "border-transparent bg-foreground text-background"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-full border ${
                      dark ? "border-background/30 text-background" : "border-border text-foreground"
                    }`}
                  >
                    <Icon size={18} />
                  </span>
                  <span className={`font-display text-2xl ${dark ? "text-background/60" : "text-muted-foreground"}`}>
                    {p.n}
                  </span>
                </div>
                <div className="mt-16">
                  <h3 className="font-display text-2xl tracking-tight md:text-3xl">{p.title}</h3>
                  <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-background/70" : "text-muted-foreground"}`}>
                    {p.body}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}




// const CARDS = [
//   {
//     number: "01",
//     title: "Focused expertise",
//     text: "We concentrate on a limited number of projects to ensure full attention, consistency and control at every stage of the process.",
//     dark: true,
//   },
//   {
//     number: "02",
//     title: "Thoughtful execution",
//     text: "Every element is carefully considered — from overall composition to the smallest architectural and technical decisions, with precision.",
//     dark: false,
//   },
//   {
//     number: "03",
//     title: "Long-term quality",
//     text: "Our work is guided by durability, relevance and carefully developed solutions that remain strong, refined and appropriate over time.",
//     dark: true,
//   },
//   {
//     number: "04",
//     title: "Collaborative partnership",
//     text: "We believe exceptional projects are built through transparent communication, close collaboration and a shared vision from concept to completion.",
//     dark: false,
//   },
// ];

// export default function StudioFocus() {
//   return (
//     <section className="border-t border-secondary/20 bg-ink">
//       <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 md:px-12 lg:px-16 xl:px-20 xl:py-28">
//         <div className="mb-14 lg:mb-20">
//           <div className="mb-5 flex items-center gap-4">
//             <div className="h-px w-12 bg-primary" />
//             <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-secondary-light">
//               Our Philosophy
//             </span>
//           </div>

//           <h2 className="font-display max-w-4xl text-4xl font-light leading-[0.95] tracking-[-0.04em] text-surface sm:text-5xl lg:text-7xl">
//             A modern studio
//             <br />
//             <span className="text-secondary-light">with a clear focus</span>
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
//           {CARDS.map((card, index) => (
//             <div
//               key={card.number}
//               className={`sticky lg:static ${
//                 index === 0
//                   ? "top-24"
//                   : index === 1
//                     ? "top-28"
//                     : index === 2
//                       ? "top-32"
//                       : "top-36"
//               } overflow-hidden rounded-[28px] border transition-all duration-500 ${
//                 card.dark
//                   ? "border-secondary/20 bg-ink-light text-surface"
//                   : "border-transparent bg-surface text-ink"
//               }`}
//             >
//               <div className="flex h-full flex-col p-6 sm:p-8 lg:p-10 xl:p-12">
//                 <div className="mb-8 flex items-start justify-between lg:mb-12">
//                   <span
//                     className={`font-display text-4xl font-light leading-none tracking-[-0.05em] sm:text-5xl lg:text-6xl ${
//                       card.dark ? "text-primary" : "text-ink"
//                     }`}
//                   >
//                     {card.number}
//                   </span>

//                   <div
//                     className={`flex h-11 w-11 items-center justify-center rounded-full border text-lg transition-all duration-300 sm:h-12 sm:w-12 lg:h-14 lg:w-14 lg:text-xl ${
//                       card.dark
//                         ? "border-secondary/20 bg-surface/5 text-surface"
//                         : "border-ink/10 bg-ink text-surface"
//                     }`}
//                   >
//                     +
//                   </div>
//                 </div>

//                 <div
//                   className={`mb-6 h-px ${
//                     card.dark ? "bg-secondary/20" : "bg-ink/10"
//                   }`}
//                 />

//                 <h3 className="font-display text-xl font-light leading-tight tracking-[-0.03em] sm:text-2xl lg:text-3xl">
//                   {card.title}
//                 </h3>

//                 <p
//                   className={`mt-5 flex-1 text-sm leading-7 sm:text-base lg:text-lg lg:leading-8 ${
//                     card.dark ? "text-secondary-light" : "text-secondary"
//                   }`}
//                 >
//                   {card.text}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }