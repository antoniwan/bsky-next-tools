"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getSession, isAuthenticated, logout } from "./bsky-client";
import type { AtpSessionData } from "@atproto/api";

interface AuthContextType {
  isAuthenticated: boolean;
  session: AtpSessionData | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  session: null,
  loading: true,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AtpSessionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const currentSession = getSession();
    setSession(currentSession || null);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    logout();
    setSession(null);
  };

  const value = {
    isAuthenticated: isAuthenticated(),
    session,
    loading,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
