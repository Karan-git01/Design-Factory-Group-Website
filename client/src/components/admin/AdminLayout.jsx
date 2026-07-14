import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

const LINKS = [
  { label: "Projects", to: "/admin/projects" },
  { label: "Branches", to: "/admin/branches" },
  { label: "Careers", to: "/admin/careers" },
  { label: "Enquiries", to: "/admin/enquiries" },
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
    <div className="min-h-screen bg-ink sm:flex">
      {/* Mobile top bar — visible only below sm breakpoint */}
      <div className="flex items-center justify-between border-b border-secondary/20 p-4 sm:hidden">
        <h2 className="font-display text-lg font-medium text-surface">DFG Admin</h2>
        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink"
        >
          {mobileMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <nav className="flex flex-col gap-1 border-b border-secondary/20 p-4 sm:hidden">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-primary text-surface"
                    : "text-secondary-light hover:bg-secondary/10 hover:text-surface"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="rounded-xl px-4 py-3 text-left text-sm text-secondary-light transition hover:bg-secondary/10 hover:text-surface"
          >
            Log Out
          </button>
        </nav>
      )}

      {/* Desktop sidebar — unchanged, hidden on mobile */}
      <aside className="hidden w-64 flex-col border-r border-secondary/20 p-6 sm:flex">
        <h2 className="font-display mb-10 text-xl font-medium text-surface">
          DFG Admin
        </h2>
        <nav className="flex flex-col gap-2">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-primary text-surface"
                    : "text-secondary-light hover:bg-secondary/10 hover:text-surface"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto rounded-xl px-4 py-3 text-left text-sm text-secondary-light transition hover:bg-secondary/10 hover:text-surface"
        >
          Log Out
        </button>
      </aside>

      <div className="flex-1 overflow-x-hidden px-6 py-8 sm:px-10">{children}</div>
    </div>
  );
}