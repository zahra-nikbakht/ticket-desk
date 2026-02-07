import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User } from "../../../shared/types/auth";
import { getMe } from "../api/auth.api";

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  loginSuccess: (token: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsLoading(false);
      return;
    }

    getMe()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("accessToken");
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const loginSuccess = (token: string, u: User) => {
    localStorage.setItem("accessToken", token);
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  const value = useMemo(() => ({ user, isLoading, loginSuccess, logout }), [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
