"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiX, FiSun, FiMoon, FiLogOut } from "react-icons/fi";
import { FaPaw } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import { authClient } from "@/lib/auth-client";
import { showSuccess, showError } from "@/utils/toastConfig";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "All Pets", href: "/all-pets" },
];

export default function Navbar() {
  const { user, isPending, refetch } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("petadopt-theme") || "light";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("petadopt-theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }

  async function handleLogout() {
    try {
      await authClient.signOut();
      refetch();
      showSuccess("Logged out successfully.");
      router.push("/");
    } catch (error) {
      showError(error?.message || "Failed to log out.");
    }
  }

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const dashboardLinks = [
    { label: "My Listings", href: "/dashboard/my-listings" },
    { label: "My Requests", href: "/dashboard/my-requests" },
    { label: "Add Pet", href: "/dashboard/add-pet" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-[#161922]/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tight text-teal-700 dark:text-teal-300">
          <FaPaw className="text-xl" />
          PetAdopt
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 text-sm font-semibold md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 transition ${
                isActive(link.href)
                  ? "bg-teal-700 text-white"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user && (
            <div className="ml-1 flex items-center gap-1">
              {dashboardLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 transition ${
                    isActive(link.href)
                      ? "bg-teal-700 text-white"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 font-bold text-white">
                  {(user.name || "U").charAt(0).toUpperCase()}
                </div>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                Logout
              </button>
            </div>
          ) : isPending ? (
            <span className="px-2 text-sm text-slate-500">Checking...</span>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-teal-800"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile logout + menu toggle */}
        {user && (
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Logout"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-lg text-slate-700 transition hover:bg-slate-100 md:hidden dark:border-slate-600 dark:text-slate-200 dark:hover:bg-white/10"
          >
            <FiLogOut />
          </button>
        )}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-xl md:hidden dark:border-slate-600"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="border-t border-black/10 bg-white px-4 py-4 md:hidden dark:border-white/10 dark:bg-[#161922]">
          <nav className="flex flex-col gap-1 text-sm font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2 ${
                  isActive(link.href)
                    ? "bg-teal-700 text-white"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user &&
              dashboardLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-3 py-2 ${
                    isActive(link.href)
                      ? "bg-teal-700 text-white"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

            <div className="mt-2 flex items-center gap-2 border-t border-black/10 pt-3 dark:border-white/10">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-lg dark:border-slate-600"
              >
                {theme === "light" ? <FiMoon /> : <FiSun />}
              </button>
              {isPending ? (
                <span className="text-slate-500">Checking...</span>
              ) : user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex-1 rounded-lg bg-slate-950 px-4 py-2 font-bold text-white dark:bg-white dark:text-slate-950"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-center font-bold dark:border-slate-600"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 rounded-lg bg-teal-700 px-4 py-2 text-center font-bold text-white"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
