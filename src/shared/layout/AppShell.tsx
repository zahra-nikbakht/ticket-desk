import { NavLink } from "react-router-dom";
import { LayoutGrid, Ticket, Users, Settings, LogOut } from "lucide-react";
import clsx from "clsx";

type Role = "USER" | "ADMIN";

export type ShellNavItem = {
  label: string;
  to: string;
  icon: React.ReactNode;
  roles?: Role[];
};

export function AppShell({
  brand = "TicketDesk",
  userName,
  role,
  navItems,
  onLogout,
  headerRight,
  children,
}: {
  brand?: string;
  userName?: string;
  role?: Role;
  navItems: ShellNavItem[];
  onLogout: () => void;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
}) {
  const visible = navItems.filter((i) => !i.roles || (role && i.roles.includes(role)));

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      <div className="flex">
        <aside className="sticky top-0 h-screen w-72 border-r bg-white" style={{ borderColor: "rgb(var(--border))" }}>
          <div className="flex h-full flex-col px-5 py-6">
            {/* Brand */}
            <div className="flex px-2">
                <div className="text-lg font-bold">{brand}</div>
            </div>

            {/* Nav */}
            <nav className="mt-8 flex flex-col gap-2">
              {visible.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center gap-1 rounded-xl px-3 py-2 transition",
                      isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-50"
                    )
                  }
                  end
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl"
                        style={{ borderColor: "rgb(var(--border))" }}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Logout */}
            <div className="mt-auto pt-6">
              <button
                onClick={onLogout}
                className="flex w-full items-center gap-1 rounded-xl px-3 py-2 text-gray-700 hover:bg-gray-50"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl"
                      style={{ borderColor: "rgb(var(--border))" }}>
                  <LogOut size={18} />
                </span>
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-1 bg-gray-50">
          {/* Header */}
          <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur"
                  style={{ borderColor: "rgb(var(--border))" }}>
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-1">
                <div className="ui-muted">Welcome</div>
                <div className="text-lg font-semibold">{userName ?? "User"}</div>
              </div>
              <div className="flex items-center gap-3">{headerRight}</div>
            </div>
          </header>

          {/* Main */}
          <main className="p-6" style={{ background: "rgb(var(--muted))" }}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

/** Recommended nav items factory */
const NAV_BY_ROLE: Record<Role, ShellNavItem[]> = {
  USER: [
    { label: "My Tickets", to: "/app/tickets", icon: <LayoutGrid size={20} /> },
    { label: "New Ticket", to: "/app/tickets/new", icon: <Ticket size={20} /> },
    { label: "Settings", to: "/app/settings", icon: <Settings size={20} /> },
  ],
  ADMIN: [
    { label: "Dashboard", to: "/admin/tickets", icon: <LayoutGrid size={20} /> },
    { label: "All Tickets", to: "/admin/tickets", icon: <Ticket size={20} /> },
    { label: "Settings", to: "/app/settings", icon: <Settings size={20} /> },
  ],
};

export function defaultNav(role?: Role): ShellNavItem[] {
  if (!role) return [];
  return NAV_BY_ROLE[role] ?? [];
}
