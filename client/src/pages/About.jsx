import { usePageMeta } from "../hooks/usePageMeta";
import TeamMemberCard from "../components/TeamMemberCard";
import TextReveal from "../components/TextReveal";
import { Reveal } from "../components/Reveal";

const TEAM = [
  {
    name: "Your Name",
    role: "Founder & Principal",
    bio: "Leads the studio's overall vision, client relationships, and project direction.",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600",
  },
  {
    name: "Team Member 2",
    role: "Lead Architect",
    bio: "Oversees architectural design and technical detailing across all projects.",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600",
  },
  {
    name: "Team Member 3",
    role: "Project Manager",
    bio: "Coordinates timelines, budgets, and communication between all project stakeholders.",
    photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600",
  },
  {
    name: "Team Member 4",
    role: "Site Engineer",
    bio: "Manages on-site construction quality, safety, and execution standards.",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600",
  },
];

export default function About() {
  usePageMeta(
    "About — Design Factory Group",
    "Design Factory Group is a global studio for high-end residential architecture, interiors and construction."
  );

  return (
    <>
      {/* Hero intro */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-6 pt-10 sm:px-8 md:grid-cols-[1.3fr_1fr] md:items-center md:gap-16 md:pb-8 md:pt-14">
        <div>
          <Reveal>
            <span className="label-caps text-copper">— About the studio</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[1.02] tracking-tight md:mt-4 md:text-7xl">
              Building spaces with <em className="text-copper">purpose</em> &amp; precision.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-6 grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8 md:mt-8">
              <span className="hidden h-px w-8 translate-y-3 bg-copper sm:block" />
              <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                Design Factory Group is a global studio for high-end residential architecture,
                interiors and construction. We concentrate on a limited number of projects at a
                time, ensuring full attention, consistency and control from the first conversation
                to the final handover.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={220}>
          <div className="relative hidden md:block">

            <figure className="relative">
              {/* Corner ticks frame */}
              <div aria-hidden className="pointer-events-none absolute -inset-3 hidden md:block">
                <span className="absolute left-0 top-0 h-4 w-px bg-copper" />
                <span className="absolute left-0 top-0 h-px w-4 bg-copper" />
                <span className="absolute right-0 top-0 h-4 w-px bg-copper" />
                <span className="absolute right-0 top-0 h-px w-4 bg-copper" />
                <span className="absolute bottom-0 left-0 h-4 w-px bg-copper" />
                <span className="absolute bottom-0 left-0 h-px w-4 bg-copper" />
                <span className="absolute bottom-0 right-0 h-4 w-px bg-copper" />
                <span className="absolute bottom-0 right-0 h-px w-4 bg-copper" />
              </div>

              {/* Dot grid accent */}
              <div
                aria-hidden
                className="dot-grid pointer-events-none absolute -left-9 -top-9 z-10 hidden h-20 w-20 text-copper md:block"
              />

              <div className="relative overflow-hidden rounded-[2rem] bg-card shadow-[0_50px_100px_-40px_rgb(31_27_22_/_0.4)]">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200"
                  alt="Design Factory Group studio at work"
                  loading="lazy"
                  draggable={false}
                  className="aspect-[8/5] w-full object-cover"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 via-black/25 to-transparent"
                />
                
              </div>
            </figure>
          </div>
        </Reveal>
      </section>

      {/* Two-column supporting text */}
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-0 sm:px-8 md:pb-14">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <Reveal>
            <p className="text-base leading-relaxed text-foreground/85 md:text-lg">
              We keep architecture, interiors and construction under one accountable team.
              That closeness lets us hold intent all the way from first sketch to the moment
              a client turns the key — details survive the journey.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-base leading-relaxed text-foreground/85 md:text-lg">
              Our approach combines careful design thinking with hands-on construction
              expertise, giving every client one accountable team throughout the entire
              journey — from the first conversation to the final handover.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section className="border-t border-border bg-cream-alt py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-4 md:grid-cols-[1fr_1.4fr] md:items-end md:gap-10">
            <div>
              <Reveal>
                <span className="label-caps text-copper">— The team</span>
              </Reveal>
              <Reveal delay={80}>
                <TextReveal
                  text="Meet the team."
                  emphasize={["team."]}
                  className="mt-3 font-display text-4xl leading-[1.05] tracking-tight md:mt-4 md:text-5xl"
                />
              </Reveal>
            </div>
            <Reveal delay={140}>
              <p className="max-w-md text-muted-foreground md:justify-self-end">
                A multidisciplinary team of architects, engineers and construction
                professionals working together to deliver timeless spaces with
                uncompromising quality.
              </p>
            </Reveal>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:mt-10 lg:grid-cols-4">
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={i * 60}>
                <TeamMemberCard member={member} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}









// import { usePageMeta } from "../hooks/usePageMeta";
// import TeamMemberCard from "../components/TeamMemberCard";
// import TextReveal from "../components/TextReveal";
// import { Reveal } from "../components/Reveal";

// const TEAM = [
//   {
//     name: "Your Name",
//     role: "Founder & Principal",
//     bio: "Leads the studio's overall vision, client relationships, and project direction.",
//     photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600",
//   },
//   {
//     name: "Team Member 2",
//     role: "Lead Architect",
//     bio: "Oversees architectural design and technical detailing across all projects.",
//     photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600",
//   },
//   {
//     name: "Team Member 3",
//     role: "Project Manager",
//     bio: "Coordinates timelines, budgets, and communication between all project stakeholders.",
//     photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600",
//   },
//   {
//     name: "Team Member 4",
//     role: "Site Engineer",
//     bio: "Manages on-site construction quality, safety, and execution standards.",
//     photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600",
//   },
// ];

// export default function About() {
//   usePageMeta(
//     "About — Design Factory Group",
//     "Design Factory Group is a global studio for high-end residential architecture, interiors and construction."
//   );

//   return (
//     <>
//       {/* Hero intro */}
//       <section className="mx-auto max-w-7xl px-5 pb-6 pt-10 sm:px-8 md:pb-8 md:pt-14">
//         <Reveal>
//           <span className="label-caps text-copper">— About the studio</span>
//         </Reveal>
//         <Reveal delay={80}>
//           <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[1.02] tracking-tight md:mt-4 md:text-7xl">
//             Building spaces with <em className="text-copper">purpose</em> &amp; precision.
//           </h1>
//         </Reveal>
//         <Reveal delay={160}>
//           <div className="mt-6 grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8 md:mt-8">
//             <span className="hidden h-px w-8 translate-y-3 bg-copper sm:block" />
//             <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
//               Design Factory Group is a global studio for high-end residential architecture,
//               interiors and construction. We concentrate on a limited number of projects at a
//               time, ensuring full attention, consistency and control from the first conversation
//               to the final handover.
//             </p>
//           </div>
//         </Reveal>
//       </section>

//       {/* Two-column supporting text */}
//       <section className="mx-auto max-w-7xl px-5 pb-10 pt-0 sm:px-8 md:pb-14">
//         <div className="grid gap-6 md:grid-cols-2 md:gap-12">
//           <Reveal>
//             <p className="text-base leading-relaxed text-foreground/85 md:text-lg">
//               We keep architecture, interiors and construction under one accountable team.
//               That closeness lets us hold intent all the way from first sketch to the moment
//               a client turns the key — details survive the journey.
//             </p>
//           </Reveal>
//           <Reveal delay={100}>
//             <p className="text-base leading-relaxed text-foreground/85 md:text-lg">
//               Our approach combines careful design thinking with hands-on construction
//               expertise, giving every client one accountable team throughout the entire
//               journey — from the first conversation to the final handover.
//             </p>
//           </Reveal>
//         </div>
//       </section>

//       {/* Team */}
//       <section className="border-t border-border bg-cream-alt py-12 md:py-16">
//         <div className="mx-auto max-w-7xl px-5 sm:px-8">
//           <div className="grid gap-4 md:grid-cols-[1fr_1.4fr] md:items-end md:gap-10">
//             <div>
//               <Reveal>
//                 <span className="label-caps text-copper">— The team</span>
//               </Reveal>
//               <Reveal delay={80}>
//                 <TextReveal
//                   text="Meet the team."
//                   emphasize={["team."]}
//                   className="mt-3 font-display text-4xl leading-[1.05] tracking-tight md:mt-4 md:text-5xl"
//                 />
//               </Reveal>
//             </div>
//             <Reveal delay={140}>
//               <p className="max-w-md text-muted-foreground md:justify-self-end">
//                 A multidisciplinary team of architects, engineers and construction
//                 professionals working together to deliver timeless spaces with
//                 uncompromising quality.
//               </p>
//             </Reveal>
//           </div>

//           <div className="mt-8 grid gap-6 sm:grid-cols-2 md:mt-10 lg:grid-cols-4">
//             {TEAM.map((member, i) => (
//               <Reveal key={member.name} delay={i * 60}>
//                 <TeamMemberCard member={member} />
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }