import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";
import { AppShell, defaultNav } from "../shared/layout/AppShell";

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <AppShell
      brand="TicketDesk"
      userName={user?.name}
      role={user?.role}
      navItems={defaultNav(user?.role)}
      onLogout={onLogout}
    >
      <Outlet />
    </AppShell>
  );
};
