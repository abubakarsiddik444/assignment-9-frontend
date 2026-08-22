"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { FaPaw, FaCheckCircle, FaHome } from "react-icons/fa";
import { getMyListings, getDashboardStats, deletePet } from "@/api/petApi";
import PetListingCard from "@/components/Dashboard/PetListingCard";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { showSuccess, showError } from "@/utils/toastConfig";

export default function MyListingsPage() {
  const [stats, setStats] = useState({ total: 0, available: 0, adopted: 0 });
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const [statsData, listingsData] = await Promise.all([
        getDashboardStats(),
        getMyListings(),
      ]);
      setStats(statsData.stats || { total: 0, available: 0, adopted: 0 });
      setPets(listingsData.pets || []);
    } catch (error) {
      showError(error?.message || "Failed to load your listings.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id) {
    try {
      await deletePet(id);
      showSuccess("Pet deleted successfully!");
      load();
    } catch (error) {
      showError(error?.response?.data?.message || error?.message || "Failed to delete pet.");
    }
  }

  const statCards = [
    {
      label: "Total Listings",
      value: stats.total,
      icon: <FaPaw />,
      iconBg: "bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300",
      accent: "text-teal-700 dark:text-teal-300",
    },
    {
      label: "Available",
      value: stats.available,
      icon: <FaCheckCircle />,
      iconBg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
      accent: "text-emerald-600 dark:text-emerald-300",
    },
    {
      label: "Adopted",
      value: stats.adopted,
      icon: <FaHome />,
      iconBg: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
      accent: "text-rose-600 dark:text-rose-300",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-black">My Listings</h1>
      <p className="mt-1 text-sm text-slate-500">Manage the pets you have listed for adoption.</p>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 dark:bg-[#161922] dark:ring-white/10"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${card.iconBg}`}
            >
              {card.icon}
            </div>
            <div>
              <p className={`text-2xl font-black ${card.accent}`}>{card.value}</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {card.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Listings */}
      <div className="mt-6">
        {isLoading ? (
          <LoadingSpinner label="Loading your listings..." />
        ) : pets.length === 0 ? (
          <div className="rounded-2xl bg-white py-16 text-center shadow-sm ring-1 ring-black/5 dark:bg-[#161922] dark:ring-white/10">
            <p className="text-slate-500">You have not added any pets yet.</p>
            <Link
              href="/dashboard/add-pet"
              className="mt-4 inline-block rounded-lg bg-teal-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
            >
              Add Your First Pet
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {pets.map((pet) => (
              <PetListingCard key={pet._id} pet={pet} onDelete={handleDelete} onDecision={load} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
