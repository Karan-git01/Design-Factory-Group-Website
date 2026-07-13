export default function TeamMemberCard({ member }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-surface">
      <div className="h-72 overflow-hidden bg-secondary/20">
        <img
          src={member.photoUrl}
          alt={member.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl font-medium text-ink">
          {member.name}
        </h3>
        <p className="mb-3 text-sm font-medium text-primary">{member.role}</p>
        <p className="text-sm text-secondary">{member.bio}</p>
      </div>
    </div>
  );
}