export default function TeamMemberCard({ member }) {
  return (
    <div className="group overflow-hidden rounded-[1.75rem] border border-secondary/20 bg-ink-light transition-all duration-300 hover:border-primary/30">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink">
        <img
          src={member.photoUrl}
          alt={member.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
      </div>

      <div className="p-6 sm:p-7">
        <p className="mb-3 text-[11px] uppercase tracking-[0.32em] text-primary">
          {member.role}
        </p>
        <h3 className="font-display text-2xl font-light tracking-[-0.03em] text-surface">
          {member.name}
        </h3>
        <div className="my-5 h-px w-10 bg-secondary/20 transition-all duration-300 group-hover:w-16 group-hover:bg-primary" />
        <p className="leading-7 text-secondary-light">{member.bio}</p>
      </div>
    </div>
  );
}


// export default function TeamMemberCard({ member }) {
//   return (
//     <div className="overflow-hidden rounded-3xl bg-surface">
//       <div className="h-72 overflow-hidden bg-secondary/20">
//         <img
//           src={member.photoUrl}
//           alt={member.name}
//           loading="lazy"
//           className="h-full w-full object-cover"
//         />
//       </div>
//       <div className="p-6">
//         <h3 className="font-display text-xl font-medium text-ink">
//           {member.name}
//         </h3>
//         <p className="mb-3 text-sm font-medium text-primary">{member.role}</p>
//         <p className="text-sm text-secondary">{member.bio}</p>
//       </div>
//     </div>
//   );
// }