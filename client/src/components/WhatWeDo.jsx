import { Reveal } from "../components/Reveal";
import TextReveal from "./TextReveal";

export default function WhatWeDo() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-32">
      <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
        <div className="relative order-2 md:order-1">
          <div className="img-zoom overflow-hidden rounded-[2rem] border border-border">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600"
              alt="Contemporary residential project"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="absolute -right-4 top-8 max-w-[240px] rounded-3xl border border-border bg-background p-5 shadow-xl">
  <p className="label-caps text-copper">Our Expertise</p>
  <p className="mt-2 font-display text-lg leading-tight">
    Architecture and construction, one coordinated process.
  </p>
</div>
        </div>

        <div className="order-1 flex flex-col justify-center md:order-2">
          <Reveal>
            <span className="label-caps text-copper">— What we do</span>
          </Reveal>
          <TextReveal
            className="mt-4 font-display text-4xl leading-[1.08] tracking-tight md:text-5xl"
            text="A single, accountable team from first sketch to keys handed over."
            emphasize={["first", "sketch"]}
          />
          <Reveal delay={160}>
            <p className="mt-6 max-w-lg text-muted-foreground">
              We design and build contemporary residential and commercial projects,
              integrating architecture and construction into one coordinated process.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}



// export default function WhatWeDo() {
//   return (
//     <section className="bg-ink px-6 py-20 sm:px-8 md:px-12 lg:px-16 xl:px-20">
//       <div className="mx-auto max-w-7xl">
//         <div className="mb-12 flex items-center gap-4">
//           <div className="h-px w-14 bg-primary" />
//           <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-secondary-light">
//             What We Do
//           </span>
//         </div>

//         <div className="relative overflow-hidden rounded-[2.25rem] border border-secondary/20 bg-surface/5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
//           <div className="pointer-events-none absolute inset-4 rounded-[1.8rem] border border-secondary/20" />

//           <img
//             src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600"
//             alt="Contemporary residential project"
//             loading="lazy"
//             className="h-[420px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[520px] lg:h-[700px]"
//           />

//           <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

//           <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-lg">
//             <div className="rounded-[28px] border border-secondary/20 bg-ink-light/90 p-6 backdrop-blur-2xl sm:p-8">
//               <div className="mb-5 flex items-center gap-4">
//                 <div className="h-px w-10 bg-primary" />
//                 <span className="text-[10px] uppercase tracking-[0.35em] text-secondary-light">
//                   Our Expertise
//                 </span>
//               </div>

//               <h3 className="font-display text-3xl font-light text-surface sm:text-4xl">
//                 What we do
//               </h3>

//               <p className="mt-5 text-sm leading-7 text-secondary-light sm:text-base">
//                 We design and build contemporary residential and commercial
//                 projects, integrating architecture and construction into one
//                 coordinated process.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }