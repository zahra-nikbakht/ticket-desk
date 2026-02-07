import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";
import { UserRole } from "../types/auth";

export const RoleRoute = ({
  allowed,
  children,
}: {
  allowed: UserRole[];
  children: React.ReactNode;
}) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (!allowed.includes(user.role)) return <Navigate to="/403" replace />;

  return <>{children}</>;
};
