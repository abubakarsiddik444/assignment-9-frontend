"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaPaw } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/hooks/useAuth";
import { showSuccess, showError } from "@/utils/toastConfig";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refetch } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const redirect = searchParams.get("redirect") || "/";

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) {
      showError("Please fill in both email and password.");
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await authClient.signIn.email({
        email: form.email,
        password: form.password,
      });
      if (error) {
        showError(error.message || "Invalid email or password.");
        return;
      }
      refetch();
      showSuccess("Logged in successfully!");
      router.push(redirect);
    } catch (err) {
      showError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogle() {
    setIsGoogleLoading(true);
    try {
      const callbackURL = new URL(redirect, window.location.origin).toString();
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL,
        errorCallbackURL: `${window.location.origin}/login`,
      });
      if (error) {
        showError(
          error.message?.includes("not configured") ||
            error.message?.includes("provider")
            ? "Google login is not configured yet. Please use email login or add Google OAuth credentials."
            : error.message || "Google login failed. Please try again."
        );
        setIsGoogleLoading(false);
      }
    } catch (err) {
      showError(err?.message || "Google login is not configured yet.");
      setIsGoogleLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 dark:bg-[#161922] dark:ring-white/10">
        <div className="text-center">
          <FaPaw className="mx-auto text-4xl text-teal-700" />
          <h1 className="mt-3 text-2xl font-black">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-500">Log in to manage pets and adoption requests.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-600 dark:text-slate-300">Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-teal-600 dark:border-slate-600 dark:bg-slate-900"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-600 dark:text-slate-300">Password</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 pr-11 text-sm outline-none transition focus:border-teal-600 dark:border-slate-600 dark:bg-slate-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword((show) => !show)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-slate-400 transition hover:text-teal-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-teal-700 py-3 text-sm font-black text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs font-semibold text-slate-400">
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          OR
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={isGoogleLoading}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 py-3 text-sm font-bold transition hover:bg-slate-50 disabled:opacity-60 dark:border-slate-600 dark:hover:bg-white/5"
        >
          <FcGoogle className="text-xl" />
          {isGoogleLoading ? "Connecting..." : "Continue with Google"}
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          New here?{" "}
          <Link href="/register" className="font-bold text-teal-700 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh]" />}>
      <LoginForm />
    </Suspense>
  );
}
