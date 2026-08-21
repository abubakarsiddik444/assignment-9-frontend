"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";

/**
 * Wrapper for private routes.
 *
 * While the session is being restored from the HTTPOnly cookie (isPending),
 * it shows a loading spinner instead of redirecting — so a logged-in user is
 * never kicked to the login page on a route reload.
 */
export default function PrivateRoute({ children }) {
  const { user, isPending } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login");
    }
  }, [isPending, user, router]);

  if (isPending || !user) {
    return <LoadingSpinner label="Checking your session..." />;
  }

  return <>{children}</>;
}
