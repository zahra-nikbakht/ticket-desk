import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex">
      
        <aside className="flex h-full flex-col sticky top-0 h-screen w-64 shrink-0 border-r border-slate-200 bg-white">
          <div className="text-lg font-bold border-b border-slate-200 p-4">Ticket Dashboard</div>

          <nav className="mt-6 flex flex-col gap-2 text-sm px-4 py-2">
            <Link className="rounded-lg px-3 py-2 hover:bg-gray-50" to="/app/tickets">
              My tickets
            </Link>
            <Link className="rounded-lg px-3 py-2 hover:bg-gray-50" to="/app/tickets/new">
              New ticket
            </Link>
            {user?.role === "ADMIN" && (
              <Link className="rounded-lg px-3 py-2 hover:bg-gray-50" to="/admin/tickets">
                Admin · All tickets
              </Link>
            )}
          </nav>
          <div className="mt-auto border-t border-slate-200 px-4 py-2 ">
            <button onClick={onLogout} className="flex w-full rounded-lg px-3 py-2 text-sm hover:bg-gray-50">
              Log out
            </button>
          </div>
        </aside>
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      
    </div>
  );
};
