import { usePageMeta } from "../hooks/usePageMeta";
import TeamMemberCard from "../components/TeamMemberCard";

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
    "About Us",
    "Meet the Design Factory Group team and learn about our approach to architecture and construction."
  );

  return (
    <main className="min-h-screen border-t border-secondary/20 bg-ink pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="mb-12 flex items-center gap-4">
          <div className="h-px w-14 bg-primary" />
          <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-secondary-light">
            About Us
          </span>
        </div>

        <div className="grid gap-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h1 className="font-display text-5xl font-light leading-[0.9] tracking-[-0.05em] text-surface sm:text-6xl xl:text-7xl">
              Building
              <br />
              spaces with
              <br />
              <span className="text-primary">
                purpose &<br />
                precision.
              </span>
            </h1>
          </div>

          <div className="flex flex-col justify-end lg:col-span-7">
            <p className="font-display max-w-3xl text-2xl font-light leading-[1.35] text-surface sm:text-3xl">
              Design Factory Group is a team working at the intersection of
              architecture, construction, and technology.
            </p>

            <div className="mt-12 grid gap-10 md:grid-cols-2">
              <p className="leading-8 text-secondary-light">
                We concentrate on a limited number of projects at a time,
                ensuring full attention, consistency and control from the first
                conversation to the final handover.
              </p>
              <p className="leading-8 text-secondary-light">
                Our approach combines careful design thinking with hands-on
                construction expertise, giving every client one accountable team
                throughout the entire journey.
              </p>
            </div>
          </div>
        </div>

        <div className="my-24 h-px bg-gradient-to-r from-primary/60 via-secondary/20 to-transparent" />

        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-secondary-light">
                Our Team
              </span>
            </div>
            <h2 className="font-display text-4xl font-light leading-tight tracking-[-0.04em] text-surface sm:text-5xl">
              Meet the people
              <br />
              behind Design Factory Group
            </h2>
          </div>

          <p className="max-w-md leading-8 text-secondary-light">
            A multidisciplinary team of architects, engineers and construction
            professionals working together to deliver timeless spaces with
            uncompromising quality.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {TEAM.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </main>
  );
}