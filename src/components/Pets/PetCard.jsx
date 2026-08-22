"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaRegHeart, FaPaw } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80";

const statusStyles = {
  available: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  adopted: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
};

export default function PetCard({ pet }) {
  const { user } = useAuth();

  function toggleWishlist(e) {
    e.preventDefault();
    try {
      const raw = localStorage.getItem("petadopt-wishlist") || "[]";
      const list = JSON.parse(raw);
      const next = list.includes(pet._id)
        ? list.filter((id) => id !== pet._id)
        : [...list, pet._id];
      localStorage.setItem("petadopt-wishlist", JSON.stringify(next));
    } catch {
      /* ignore storage errors */
    }
  }

  const isAdopted = pet.status === "adopted";

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 dark:bg-[#161922] dark:ring-white/10"
    >
      <div className="relative h-52 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pet.image || FALLBACK_IMAGE}
          alt={pet.name}
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyles[pet.status] || statusStyles.available}`}
        >
          {pet.status}
        </span>
        <button
          type="button"
          onClick={toggleWishlist}
          aria-label="Toggle wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-rose-500 shadow transition hover:scale-110 dark:bg-slate-900/80"
        >
          <FaRegHeart className="text-lg" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-xl font-black">{pet.name}</h3>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              {pet.species}
              {pet.breed ? ` · ${pet.breed}` : ""}
            </p>
          </div>
          <p className="rounded-lg bg-teal-50 px-3 py-1 text-sm font-black text-teal-700 dark:bg-teal-500/15 dark:text-teal-300">
            ৳ {pet.adoptionFee}
          </p>
        </div>

        <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <FaMapMarkerAlt className="text-teal-600" />
          {pet.location || "Location not specified"}
        </p>

        <div className="mt-auto flex gap-2 pt-5">
          <Link
            href={`/pets/${pet._id}`}
            className="flex-1 rounded-lg bg-slate-950 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950"
          >
            View Details
          </Link>
          {isAdopted ? (
            <span className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-400 dark:bg-white/5 dark:text-slate-500">
              <FaPaw /> Adopted
            </span>
          ) : (
            <Link
              href={user ? `/pets/${pet._id}` : `/login?redirect=${encodeURIComponent(`/pets/${pet._id}`)}`}
              className="flex-1 rounded-lg bg-teal-700 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-teal-800"
            >
              Adopt Now
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
