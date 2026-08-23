"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";


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
