"use client";

import { useAuthContext } from "@/providers/AuthProvider";

/**
 * Hook to access the current authenticated user and session helpers.
 *
 * @returns {{ user: object|null, session: object|null, isPending: boolean, refetch: Function }}
 */
export function useAuth() {
  return useAuthContext();
}
