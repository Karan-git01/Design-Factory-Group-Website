import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useApi } from "./ApiContext";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const api = useApi();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      await api.get("/auth/check");
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setChecking(false);
    }
  }, [api]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  async function login(username, password) {
    await api.post("/auth/login", { username, password });
    setIsAuthenticated(true);
  }

  async function logout() {
    await api.post("/auth/logout", {});
    setIsAuthenticated(false);
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, checking, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}