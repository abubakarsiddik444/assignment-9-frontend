"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPaw, FaHeart, FaRegFileAlt, FaPlusCircle } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";

const links = [
  { label: "My Listings", href: "/dashboard/my-listings", icon: <FaHeart /> },
  { label: "My Requests", href: "/dashboard/my-requests", icon: <FaRegFileAlt /> },
  { label: "Add Pet", href: "/dashboard/add-pet", icon: <FaPlusCircle /> },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside className="shrink-0 lg:w-64">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-linear-to-b from-[#1b2b54] via-[#16213e] to-[#0f1a33] text-white shadow-xl ring-1 ring-white/10">
        {/* Decorative glows */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-rose-500/10 blur-3xl" />

        {/* Brand header */}
        <div className="relative flex items-center justify-between gap-2 border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-teal-400 to-teal-600 text-white shadow-md">
              <FaPaw className="text-lg" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-black tracking-wide">PetAdopt</p>
              <p className="text-[11px] text-white/50">Adoption Platform</p>
            </div>
          </div>
          <span className="rounded-full border border-teal-400/30 bg-teal-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-teal-300">
            Dashboard
          </span>
        </div>

        {/* Menu label */}
        <p className="relative px-5 pb-2 pt-6 text-[11px] font-bold uppercase tracking-widest text-white/40">
          Menu
        </p>

        {/* Navigation */}
        <nav className="relative flex flex-1 gap-1.5 overflow-x-auto px-3 lg:flex-col lg:overflow-visible">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative flex shrink-0 items-center gap-3 overflow-hidden rounded-xl px-3.5 py-2.5 text-sm font-bold transition ${
                  active
                    ? "bg-linear-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-900/40"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-white" />
                )}
                <span className="text-base">{link.icon}</span>
                {link.label}
                {active && (
                  <span className="ml-auto hidden h-1.5 w-1.5 rounded-full bg-white lg:block" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User profile */}
        <div className="relative m-3 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
          {user?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name}
              className="h-9 w-9 rounded-full object-cover ring-2 ring-teal-400/40"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-teal-400 to-teal-600 text-sm font-black text-white ring-2 ring-teal-400/40">
              {(user?.name || "U").charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{user?.name}</p>
            <p className="truncate text-xs text-white/50">{user?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
