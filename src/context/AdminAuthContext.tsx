import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

const SESSION_KEY = "kawade-admin-session";

function readSession(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

function getExpectedPassword(): string {
  const fromEnv = import.meta.env.VITE_ADMIN_PASSWORD;
  if (typeof fromEnv === "string" && fromEnv.length > 0) return fromEnv;
  return "kawade-admin";
}

type AdminAuthContextValue = {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(readSession);

  const login = useCallback((password: string) => {
    const ok = password === getExpectedPassword();
    if (ok) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setIsAuthenticated(true);
    }
    return ok;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
