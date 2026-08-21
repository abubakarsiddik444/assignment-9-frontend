"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const AuthContext = createContext(null);

/**
 * Global authentication provider.
 *
 * Manages the Better Auth session manually (with retries) so the session
 * check can never get stuck on "Checking..." — even if a navigation or a
 * StrictMode double-mount aborts the first request. The session token lives
 * in an HTTPOnly cookie, which is exactly what keeps logged-in users logged
 * in when a private route is reloaded.
 */
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const refetch = useCallback(async () => {
    try {
      const { data, error } = await authClient.getSession();
      if (error) {
        setUser(null);
        setSession(null);
      } else {
        setSession(data);
        setUser(data?.user ?? null);
      }
    } catch {
      // keep current state on transient failures
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function init() {
      // Retry a few times to survive aborted / transient requests so the
      // "Checking..." state can never hang indefinitely.
      for (let attempt = 0; attempt < 3 && active; attempt++) {
        try {
          const { data, error } = await authClient.getSession();
          if (!active) return;
          if (error) {
            setUser(null);
            setSession(null);
          } else {
            setSession(data);
            setUser(data?.user ?? null);
          }
          setIsPending(false);
          return;
        } catch {
          if (!active) return;
          await new Promise((resolve) => setTimeout(resolve, 250));
        }
      }
      if (active) setIsPending(false);
    }

    init();
    return () => {
      active = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, isPending, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }
  return context;
}
