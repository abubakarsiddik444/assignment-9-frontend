"use client";

import { useState } from "react";
import Link from "next/link";
import { FiEye, FiEdit2, FiTrash2, FiInbox } from "react-icons/fi";
import RequestsModal from "@/components/Dashboard/RequestsModal";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80";

const statusStyles = {
  available: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  adopted: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
};

export default function PetListingCard({ pet, onDelete, onDecision }) {
  const [showRequests, setShowRequests] = useState(false);
  const [confirming, setConfirming] = useState(false);

  return (
    <>
      <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 dark:bg-[#161922] dark:ring-white/10">
        <div className="relative h-44">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pet.image || FALLBACK_IMAGE} alt={pet.name} className="h-full w-full object-cover" />
          <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyles[pet.status] || statusStyles.available}`}>
            {pet.status}
          </span>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black">{pet.name}</h3>
            <p className="rounded-lg bg-teal-50 px-3 py-1 text-sm font-black text-teal-700 dark:bg-teal-500/15 dark:text-teal-300">
              ৳ {pet.adoptionFee}
            </p>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {pet.species}
            {pet.breed ? ` · ${pet.breed}` : ""} · {pet.location || "No location"}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setShowRequests(true)}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 py-2 text-sm font-bold transition hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-white/10"
            >
              <FiInbox /> Requests
            </button>
            <Link
              href={`/dashboard/update-pet/${pet._id}`}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 py-2 text-sm font-bold text-white transition hover:bg-amber-600"
            >
              <FiEdit2 /> Edit
            </Link>
            <Link
              href={`/pets/${pet._id}`}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-slate-950 py-2 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950"
            >
              <FiEye /> View
            </Link>
            {confirming ? (
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    onDelete?.(pet._id);
                    setConfirming(false);
                  }}
                  className="flex-1 rounded-lg bg-rose-600 py-2 text-sm font-bold text-white hover:bg-rose-700"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  className="flex-1 rounded-lg border border-slate-300 py-2 text-sm font-bold hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-white/10"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirming(true)}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-rose-600 py-2 text-sm font-bold text-white transition hover:bg-rose-700"
              >
                <FiTrash2 /> Delete
              </button>
            )}
          </div>
        </div>
      </article>

      {showRequests && (
        <RequestsModal
          pet={pet}
          onClose={() => setShowRequests(false)}
          onDecision={onDecision}
        />
      )}
    </>
  );
}
