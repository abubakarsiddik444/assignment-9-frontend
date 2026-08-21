"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPaw, FaListUl, FaHeart, FaPlusCircle } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";

const links = [
  { label: "My Listings", href: "/dashboard/my-listings", icon: <FaListUl /> },
  { label: "My Requests", href: "/dashboard/my-requests", icon: <FaHeart /> },
  { label: "Add Pet", href: "/dashboard/add-pet", icon: <FaPlusCircle /> },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside className="shrink-0 lg:w-64">
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 dark:bg-[#161922] dark:ring-white/10">
        <div className="flex items-center gap-3">
          {user?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt={user.name} className="h-12 w-12 rounded-full object-cover" />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-700 text-xl font-black text-white">
              {(user?.name || "U").charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate font-black">{user?.name}</p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
          </div>
        </div>

        <nav className="mt-5 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition ${
                  active
                    ? "bg-teal-700 text-white"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
                }`}
              >
                <span className="text-base">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-5 hidden items-center gap-2 rounded-xl bg-teal-50 p-4 text-sm text-teal-800 dark:bg-teal-500/10 dark:text-teal-300 lg:flex">
          <FaPaw className="shrink-0" />
          <span>Manage your pets and adoption requests from here.</span>
        </div>
      </div>
    </aside>
  );
}
