import TeamMemberCard from "../components/TeamMemberCard";

// Placeholder team — swap in real names, roles, bios, and photos whenever ready.
// photoUrl can point to a Cloudinary URL once real photos are uploaded.
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
  return (
    <main className="min-h-screen bg-ink px-6 pt-32 pb-24 sm:px-12">
      <h1 className="font-display mb-8 text-5xl font-medium text-surface sm:text-6xl">
        About Us
      </h1>

      <p className="font-display mb-6 max-w-2xl text-2xl font-medium text-surface sm:text-3xl">
        Design Factory Group is a team working at the intersection of
        architecture, construction, and technology.
      </p>

      <p className="mb-20 max-w-2xl text-secondary-light">
        We concentrate on a limited number of projects at a time, ensuring
        full attention, consistency, and control at every stage — from the
        first conversation to the final handover. Our approach combines
        careful design thinking with hands-on construction expertise, so our
        clients get one accountable team instead of juggling separate
        architects and contractors.
      </p>

      <h2 className="font-display mb-10 text-3xl font-medium text-surface sm:text-4xl">
        Meet the Team
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((member) => (
          <TeamMemberCard key={member.name} member={member} />
        ))}
      </div>
    </main>
  );
}