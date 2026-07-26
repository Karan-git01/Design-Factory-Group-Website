import { Reveal } from "../components/Reveal";

const whyPoints = [
  {
    n: "01",
    title: "Responsibility",
    body: "We take responsibility for the full scope of work, allowing decisions, coordination and execution to remain aligned throughout the project.",
  },
  {
    n: "02",
    title: "Collaboration",
    body: "Clients work directly with the team involved in the project, ensuring clear communication and faster, more informed decisions.",
  },
  {
    n: "03",
    title: "Workflow",
    body: "Each project is developed through a clear and structured process, helping to minimise uncertainty and avoid unnecessary complexity.",
  },
  {
    n: "04",
    title: "Involvement",
    body: "We stay closely involved at every stage of the project, maintaining continuity from early planning through construction and completion.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 md:py-2 md:mt-25">
      <Reveal>
        <span className="label-caps text-copper">— Why choose us</span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
          Why work with <em className="text-copper">Design Factory Group</em>.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
        <Reveal>
          <div className="img-zoom relative overflow-hidden rounded-[2rem] border border-border">
            <img
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600"
              alt="Interior living space"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 hidden rounded-full border border-border bg-background/90 px-5 py-3 backdrop-blur-xl md:block">
              <span className="label-caps text-muted-foreground">
                Premium Residential Design
              </span>
            </div>
          </div>
        </Reveal>

        <ul className="divide-y divide-border">
          {whyPoints.map((p, i) => (
            <Reveal key={p.n} delay={i * 60}>
              <li className="group grid grid-cols-[auto_1fr] items-start gap-6 py-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-copper font-display text-lg text-copper transition-all duration-300 group-hover:bg-copper group-hover:text-primary-foreground">
                  {p.n}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-2xl tracking-tight">{p.title}</h3>
                  <p className="mt-2 max-w-xl text-sm text-muted-foreground">{p.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}



