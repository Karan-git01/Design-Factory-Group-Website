import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Building2, MapPin, Briefcase, Inbox, Menu, X } from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";

const LINKS = [
  { label: "Projects", to: "/admin/projects", icon: Building2 },
  { label: "Branches", to: "/admin/branches", icon: MapPin },
  { label: "Careers", to: "/admin/careers", icon: Briefcase },
  { label: "Enquiries", to: "/admin/enquiries", icon: Inbox },
];

export default function AdminLayout({ children }) {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function handleLogout() {
    await logout();
    navigate("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-cream-alt">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-background md:flex">
        <div className="px-6 py-6">
          <span className="label-caps text-muted-foreground">Design Factory</span>
          <p className="mt-2 font-display text-xl">Admin</p>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "text-primary-foreground"
                    : "text-foreground/80 hover:bg-cream-alt"
                }`
              }
              style={({ isActive }) =>
                isActive ? { background: "var(--gradient-copper)" } : undefined
              }
            >
              <link.icon size={16} /> {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground/80 hover:bg-cream-alt"
          >
            <LogOut size={16} /> Log out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-background px-5 py-3 md:hidden">
          <span className="font-display text-lg">Admin</span>
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </header>

        {mobileMenuOpen && (
          <nav className="grid gap-1 border-b border-border bg-background p-3 md:hidden">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                    isActive ? "bg-copper text-primary-foreground" : "hover:bg-cream-alt"
                  }`
                }
              >
                <link.icon size={16} /> {link.label}
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-destructive hover:bg-cream-alt"
            >
              <LogOut size={16} /> Log out
            </button>
          </nav>
        )}

        <main className="min-w-0 flex-1 p-5 md:p-10">{children}</main>
      </div>
    </div>
  );
}













// import { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useAdminAuth } from "../../context/AdminAuthContext";

// const LINKS = [
//   { label: "Projects", to: "/admin/projects" },
//   { label: "Branches", to: "/admin/branches" },
//   { label: "Careers", to: "/admin/careers" },
//   { label: "Enquiries", to: "/admin/enquiries" },
// ];

// export default function AdminLayout({ children }) {
//   const { logout } = useAdminAuth();
//   const navigate = useNavigate();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   async function handleLogout() {
//     await logout();
//     navigate("/admin/login");
//   }

//   return (
//     <div className="min-h-screen bg-ink sm:flex">
//       {/* Mobile top bar — visible only below sm breakpoint */}
//       <div className="flex items-center justify-between border-b border-secondary/20 p-4 sm:hidden">
//         <h2 className="font-display text-lg font-medium text-surface">DFG Admin</h2>
//         <button
//           onClick={() => setMobileMenuOpen((v) => !v)}
//           className="rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink"
//         >
//           {mobileMenuOpen ? "Close" : "Menu"}
//         </button>
//       </div>

//       {/* Mobile dropdown menu */}
//       {mobileMenuOpen && (
//         <nav className="flex flex-col gap-1 border-b border-secondary/20 p-4 sm:hidden">
//           {LINKS.map((link) => (
//             <NavLink
//               key={link.to}
//               to={link.to}
//               onClick={() => setMobileMenuOpen(false)}
//               className={({ isActive }) =>
//                 `rounded-xl px-4 py-3 text-sm transition ${
//                   isActive
//                     ? "bg-primary text-surface"
//                     : "text-secondary-light hover:bg-secondary/10 hover:text-surface"
//                 }`
//               }
//             >
//               {link.label}
//             </NavLink>
//           ))}
//           <button
//             onClick={handleLogout}
//             className="rounded-xl px-4 py-3 text-left text-sm text-secondary-light transition hover:bg-secondary/10 hover:text-surface"
//           >
//             Log Out
//           </button>
//         </nav>
//       )}

//       {/* Desktop sidebar — unchanged, hidden on mobile */}
//       <aside className="hidden w-64 flex-col border-r border-secondary/20 p-6 sm:flex">
//         <h2 className="font-display mb-10 text-xl font-medium text-surface">
//           DFG Admin
//         </h2>
//         <nav className="flex flex-col gap-2">
//           {LINKS.map((link) => (
//             <NavLink
//               key={link.to}
//               to={link.to}
//               className={({ isActive }) =>
//                 `rounded-xl px-4 py-3 text-sm transition ${
//                   isActive
//                     ? "bg-primary text-surface"
//                     : "text-secondary-light hover:bg-secondary/10 hover:text-surface"
//                 }`
//               }
//             >
//               {link.label}
//             </NavLink>
//           ))}
//         </nav>
//         <button
//           onClick={handleLogout}
//           className="mt-auto rounded-xl px-4 py-3 text-left text-sm text-secondary-light transition hover:bg-secondary/10 hover:text-surface"
//         >
//           Log Out
//         </button>
//       </aside>

//       <div className="flex-1 overflow-x-hidden px-6 py-8 sm:px-10">{children}</div>
//     </div>
//   );
// }