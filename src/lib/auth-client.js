"use client";

import { createAuthClient } from "better-auth/react";

/**
 * Better Auth client instance.
 * Talks to the backend server's /api/auth/* endpoints and stores the
 * session token in an HTTPOnly cookie automatically.
 */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
});
