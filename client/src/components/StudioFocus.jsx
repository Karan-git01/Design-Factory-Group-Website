const CARDS = [
  {
    number: "01",
    title: "Focused expertise",
    text: "We concentrate on a limited number of projects to ensure full attention, consistency and control at every stage of the process.",
    dark: true,
  },
  {
    number: "02",
    title: "Thoughtful execution",
    text: "Every element is carefully considered — from overall composition to the smallest architectural and technical decisions, with precision.",
    dark: false,
  },
  {
    number: "03",
    title: "Long-term quality",
    text: "Our work is guided by durability, relevance and carefully developed solutions that remain strong, refined and appropriate over time.",
    dark: true,
  },
];

export default function StudioFocus() {
  return (
    <section className="bg-ink px-6 py-24 sm:px-12">
      <h2 className="font-display mb-16 max-w-2xl text-4xl font-medium text-surface sm:text-5xl">
        A modern studio with a clear focus
      </h2>

      <div className="flex flex-col gap-6">
        {CARDS.map((card) => (
          <div
            key={card.number}
            className={`sticky top-24 rounded-3xl border p-10 sm:p-14 ${
              card.dark
                ? "border-secondary/30 bg-ink text-surface"
                : "border-transparent bg-surface text-ink"
            }`}
          >
            <div className="mb-16 flex items-start justify-between sm:mb-24">
              <span className="font-display text-5xl font-medium">
                {card.number}
              </span>
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${
                  card.dark ? "bg-surface text-ink" : "bg-ink text-surface"
                }`}
              >
                +
              </span>
            </div>
            <h3 className="font-display mb-3 text-2xl font-medium">
              {card.title}
            </h3>
            <p
              className={`max-w-md text-base ${
                card.dark ? "text-secondary-light" : "text-secondary"
              }`}
            >
              {card.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}