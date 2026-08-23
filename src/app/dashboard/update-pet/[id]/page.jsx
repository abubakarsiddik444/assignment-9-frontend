"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getPetById } from "@/api/petApi";
import { useAuth } from "@/hooks/useAuth";
import UpdatePetModal from "@/components/Dashboard/UpdatePetModal";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { showError } from "@/utils/toastConfig";

export default function UpdatePetPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [pet, setPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      setIsLoading(true);
      try {
        const data = await getPetById(id);
        if (active) setPet(data.pet);
      } catch {
        if (active) setNotFound(true);
      } finally {
        if (active) setIsLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner label="Loading pet..." />;
  }

  if (notFound || !pet) {
    return (
      <div className="rounded-2xl bg-white py-16 text-center shadow-sm ring-1 ring-black/5 dark:bg-[#161922] dark:ring-white/10">
        <p className="text-slate-500">Pet not found.</p>
        <Link href="/dashboard/my-listings" className="mt-4 inline-block rounded-lg bg-teal-700 px-6 py-3 text-sm font-bold text-white">
          Back to My Listings
        </Link>
      </div>
    );
  }

  if (user && String(pet.ownerId) !== String(user.id)) {
    return (
      <div className="rounded-2xl bg-white py-16 text-center shadow-sm ring-1 ring-black/5 dark:bg-[#161922] dark:ring-white/10">
        <p className="text-slate-500">You can only update your own pets.</p>
        <Link href="/dashboard/my-listings" className="mt-4 inline-block rounded-lg bg-teal-700 px-6 py-3 text-sm font-bold text-white">
          Back to My Listings
        </Link>
      </div>
    );
  }

  return <UpdatePetModal pet={pet} />;
}
