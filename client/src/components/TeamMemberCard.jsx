export default function TeamMemberCard({ member }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card transition-all duration-300 hover:border-copper/30">
      <div className="img-zoom relative aspect-[5/4] overflow-hidden">
        <img
          src={member.photoUrl}
          alt={`${member.name}, ${member.role} at Design Factory Group`}
          loading="lazy"
          className="h-full w-full object-cover object-[50%_10%]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="label-caps mb-2 text-copper">{member.role}</p>
        <h3 className="font-display text-xl tracking-tight">{member.name}</h3>
        <div className="my-4 h-px w-10 bg-border transition-all duration-300 group-hover:w-16 group-hover:bg-copper" />
        <p className="text-sm leading-7 text-muted-foreground">{member.bio}</p>
      </div>
    </div>
  );
}