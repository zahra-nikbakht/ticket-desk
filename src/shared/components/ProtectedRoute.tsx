import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};
