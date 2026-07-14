export default function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#0F0F10] pt-28 sm:pt-32">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920"
        alt="Modern residential architecture at dusk"
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[6000ms] ease-out hover:scale-[1.03]"
      />

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl items-end px-6 pb-14 sm:px-8 sm:pb-16 md:px-12 lg:px-16 xl:px-20 xl:pb-24">
        <div className="max-w-3xl">
          {/* Label */}
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px w-14 bg-primary" />
            <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-white/70">
              Design Factory Group
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-[3.25rem] font-light leading-[0.92] tracking-[-0.05em] text-white sm:text-[4.25rem] md:text-[5.4rem] lg:text-[6.6rem] xl:text-[7.5rem]">
            High-end
            <br />
            residential design
            <br />
            <span className="text-primary">&amp; build</span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-xl text-base leading-8 text-white/75 sm:text-lg md:text-xl">
            Our work is defined by careful thinking, technical precision and
            attention to detail.
          </p>

          {/* CTA */}
          <div className="mt-12">
            <button className="group inline-flex items-center gap-5 text-sm font-medium uppercase tracking-[0.28em] text-white transition-colors duration-300 hover:text-primary">
              <span>Discuss the Project</span>

              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-black">
                →
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-white/10" />
    </section>
  );
}










// export default function Hero() {
//   return (
//     <section className="relative flex min-h-screen items-end overflow-hidden bg-ink">
//       <img
//         src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920"
//         alt="Modern residential architecture at dusk"
//         className="absolute inset-0 h-full w-full object-cover opacity-70"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

//       <div className="relative z-10 max-w-3xl px-6 pb-20 sm:px-12 sm:pb-28">
//         <h1 className="font-display text-5xl font-medium leading-tight text-surface sm:text-7xl">
//           High-end residential design{" "}
//           <span className="text-primary">&amp; build</span>
//         </h1>
//         <p className="mt-6 max-w-xl text-lg text-secondary-light">
//           Our work is defined by careful thinking, technical precision and
//           attention to detail.
//         </p>
//         <button className="mt-8 rounded-full bg-primary px-8 py-4 text-base font-medium text-surface transition hover:bg-primary-dark">
//           Discuss the Project
//         </button>
//       </div>
//     </section>
//   );
// }