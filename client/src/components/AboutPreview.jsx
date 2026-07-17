import TextReveal from "./TextReveal";

export default function AboutPreview() {
  return (
    <section className="border-t border-secondary/20 bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 md:px-12 lg:px-16 xl:px-20 xl:py-28">
        <div className="mb-16 flex items-center gap-4">
          <div className="h-px w-14 bg-primary" />
          <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-secondary-light">
            About Us
          </span>
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <TextReveal
              className="font-display max-w-3xl text-4xl font-light leading-[0.95] tracking-[-0.045em] text-surface sm:text-5xl lg:text-6xl"
              text={`Design Factory Group
is a team working at the intersection of architecture,
construction, and technology.`}
            />

            <button className="group mt-14 inline-flex items-center gap-5">
              <span className="font-display text-lg font-light text-surface transition-colors duration-300 group-hover:text-primary">
                Discuss the Project
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary/30 transition-all duration-300 group-hover:border-primary">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-ink transition duration-300 group-hover:translate-x-1">
                  →
                </div>
              </div>
            </button>
          </div>

          <div className="relative">
            <div className="absolute -left-6 -top-6 hidden h-full w-full rounded-[2rem] border border-secondary/20 lg:block" />

            <div className="group relative overflow-hidden rounded-[2rem]">
              <img
                src="https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600"
                alt="Design Factory Group project exterior"
                loading="lazy"
                className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[420px] lg:h-[620px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            </div>

            <div className="relative mx-5 -mt-24 rounded-[30px] border border-secondary/20 bg-ink-light/95 p-6 backdrop-blur-2xl sm:mx-8 sm:p-8 lg:absolute lg:bottom-8 lg:left-8 lg:right-8 lg:m-0">
              <div className="mb-5 flex items-center gap-4">
                <div className="h-px w-10 bg-primary" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-secondary-light">
                  Our Clients
                </span>
              </div>
              <h3 className="font-display text-2xl font-light text-surface sm:text-3xl">
                Who we work with
              </h3>
              <p className="mt-4 max-w-lg text-sm leading-7 text-secondary-light sm:text-base">
                We work with private and commercial clients who value clarity,
                thoughtful decisions and a structured approach to building.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// export default function AboutPreview() {
//   return (
//     <section className="bg-ink px-6 py-24 sm:px-12">
//       <p className="font-display mb-10 max-w-2xl text-2xl font-medium text-surface sm:text-3xl">
//         Design Factory Group is a team working at the intersection of
//         architecture, construction, and technology.
//       </p>

//       <button className="mb-16 w-full rounded-full bg-surface py-4 text-base font-medium text-ink transition hover:bg-primary hover:text-surface sm:w-auto sm:px-10">
//         Discuss the Project
//       </button>

//       <div className="relative overflow-hidden rounded-3xl">
//         <img
//           src="https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600"
//           alt="Design Factory Group project exterior"
//           loading="lazy"
//           className="h-[420px] w-full object-cover sm:h-[520px]"
//         />
//         <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/20 to-transparent p-8">
//           <h3 className="font-display mb-2 text-xl font-medium text-surface">
//             Who we work with
//           </h3>
//           <p className="max-w-md text-secondary-light">
//             We work with private and commercial clients who value clarity,
//             thoughtful decisions and a structured approach to building.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }
