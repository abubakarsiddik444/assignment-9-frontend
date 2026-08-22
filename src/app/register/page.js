"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaPaw } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/hooks/useAuth";
import { showSuccess, showError } from "@/utils/toastConfig";

const emptyForm = {
  name: "",
  email: "",
  photoURL: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const router = useRouter();
  const { refetch } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function validate() {
    if (!form.name.trim()) return "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Please enter a valid email address.";
    if (form.password.length < 6) return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(form.password)) return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(form.password)) return "Password must contain at least one lowercase letter.";
    if (form.password !== form.confirmPassword) return "Password and confirm password must match.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errorMessage = validate();
    if (errorMessage) {
      showError(errorMessage);
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        image: form.photoURL || undefined,
      });
      if (error) {
        showError(error.message || "Failed to create account.");
        return;
      }
      refetch();
      showSuccess("Account created successfully!");
      router.push("/");
    } catch (err) {
      showError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogle() {
    setIsGoogleLoading(true);
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      if (error) {
        showError(
          error.message?.includes("provider")
            ? "Google login is not configured yet. Please use email registration or add Google OAuth credentials."
            : error.message || "Google sign-up failed. Please try again."
        );
        setIsGoogleLoading(false);
      }
    } catch (err) {
      showError(err?.message || "Google login is not configured yet.");
      setIsGoogleLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-teal-600 dark:border-slate-600 dark:bg-slate-900";

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 dark:bg-[#161922] dark:ring-white/10">
        <div className="text-center">
          <FaPaw className="mx-auto text-4xl text-teal-700" />
          <h1 className="mt-3 text-2xl font-black">Create your account</h1>
          <p className="mt-1 text-sm text-slate-500">Join PetAdopt to adopt or list pets.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-600 dark:text-slate-300">Name</span>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your full name"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-600 dark:text-slate-300">Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-600 dark:text-slate-300">
              Photo URL (optional)
            </span>
            <input
              type="url"
              value={form.photoURL}
              onChange={(e) => setForm({ ...form, photoURL: e.target.value })}
              placeholder="https://..."
              className={inputClass}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-600 dark:text-slate-300">Password</span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Min 6 chars"
                  className={`${inputClass} pr-11`}
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

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-600 dark:text-slate-300">
                Confirm Password
              </span>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="Repeat password"
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((show) => !show)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-slate-400 transition hover:text-teal-600"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </label>
          </div>

          <p className="text-xs leading-5 text-slate-400">
            Password must be at least 6 characters and include at least one uppercase and one lowercase letter.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-teal-700 py-3 text-sm font-black text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Register"}
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
          {isGoogleLoading ? "Connecting..." : "Sign up with Google"}
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-teal-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
