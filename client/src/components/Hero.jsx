export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-ink">
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920"
        alt="Modern residential architecture at dusk"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

      <div className="relative z-10 max-w-3xl px-6 pb-20 sm:px-12 sm:pb-28">
        <h1 className="font-display text-5xl font-medium leading-tight text-surface sm:text-7xl">
          High-end residential design{" "}
          <span className="text-primary">&amp; build</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-secondary-light">
          Our work is defined by careful thinking, technical precision and
          attention to detail.
        </p>
        <button className="mt-8 rounded-full bg-primary px-8 py-4 text-base font-medium text-surface transition hover:bg-primary-dark">
          Discuss the Project
        </button>
      </div>
    </section>
  );
}