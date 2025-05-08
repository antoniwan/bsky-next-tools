import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Session {
  accessJwt: string;
  refreshJwt: string;
  handle: string;
  did: string;
  email: string;
}

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if we have a session cookie
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        if (response.ok) {
          const data = await response.json();
          setSession(data);
        } else {
          setSession(null);
        }
      } catch (error) {
        console.error("Session check error:", error);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
      setSession(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return {
    session,
    loading,
    logout,
    isAuthenticated: !!session,
  };
}
