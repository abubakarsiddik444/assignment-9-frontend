"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SectionTitle from "@/components/Shared/SectionTitle";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import PetCard from "@/components/Pets/PetCard";
import { getFeaturedPets } from "@/api/petApi";
import { showError } from "@/utils/toastConfig";

export default function FeaturedPets() {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const data = await getFeaturedPets();
        if (active) setPets(data.pets || []);
      } catch (error) {
        if (active) showError(error?.message || "Failed to load featured pets.");
      } finally {
        if (active) setIsLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="px-4 py-12">
      <SectionTitle
        eyebrow="Featured pets"
        title="Meet pets ready for a forever home"
        text="A hand-picked selection of the latest pets waiting to be adopted."
      />
      {isLoading ? (
        <LoadingSpinner label="Loading featured pets..." />
      ) : pets.length === 0 ? (
        <p className="text-center text-slate-500">No featured pets available right now.</p>
      ) : (
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      )}
      <div className="mt-10 text-center">
        <Link
          href="/all-pets"
          className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-white/10"
        >
          View All Pets
        </Link>
      </div>
    </section>
  );
}
