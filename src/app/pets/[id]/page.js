"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaMapMarkerAlt, FaPaw, FaVenusMars, FaHeart, FaSyringe, FaShieldAlt, FaUser } from "react-icons/fa";
import { getPetById } from "@/api/petApi";
import { useAuth } from "@/hooks/useAuth";
import AdoptionForm from "@/components/Pets/AdoptionForm";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { showError } from "@/utils/toastConfig";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1100&q=80";

export default function PetDetailsPage() {
  const { id } = useParams();
  const { user, isPending } = useAuth();
  const [pet, setPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  // Adopt mode is active when the URL has ?adopt=1 (from the "Adopt Now" button).
  // Opening with plain "View Details" shows only the pet details, without the adoption form.
  const [adoptMode] = useState(
    () => typeof window !== "undefined" && new URLSearchParams(window.location.search).get("adopt") === "1"
  );

  useEffect(() => {
    let active = true;
    async function load() {
      setIsLoading(true);
      try {
        const data = await getPetById(id);
        if (active) setPet(data.pet);
      } catch (error) {
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
    return <LoadingSpinner label="Loading pet details..." />;
  }

  if (notFound || !pet) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <FaPaw className="text-6xl text-teal-700" />
        <h1 className="mt-4 text-2xl font-black">Pet not found</h1>
        <p className="mt-2 text-slate-500">This pet may have been removed or adopted.</p>
        <Link href="/all-pets" className="mt-6 rounded-lg bg-teal-700 px-6 py-3 text-sm font-bold text-white">
          Browse All Pets
        </Link>
      </div>
    );
  }

  const isOwner = user && String(pet.ownerId) === String(user.id);
  const isAdopted = pet.status === "adopted";
  const vaccinationStatus = pet.vaccinationStatus || (pet.vaccinated ? "Vaccinated" : "Not Vaccinated");

  return (
    <div className="px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <Link href="/all-pets" className="text-sm font-bold text-teal-700 hover:underline">
          ← Back to All Pets
        </Link>

        <div className={`mt-6 grid gap-8 ${adoptMode ? "lg:grid-cols-[1.15fr_0.85fr]" : "lg:grid-cols-1"}`}>
          {/* Pet details */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 dark:bg-[#161922] dark:ring-white/10">
            <div className="relative h-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pet.image || FALLBACK_IMAGE}
                alt={pet.name}
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
                className="h-full w-full object-cover"
              />
              <span
                className={`absolute left-4 top-4 rounded-full px-4 py-1.5 text-sm font-bold capitalize ${
                  isAdopted
                    ? "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
                    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                }`}
              >
                {isAdopted ? "Adopted" : "Available"}
              </span>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-3xl font-black">{pet.name}</h1>
                  <p className="mt-1 text-slate-500 dark:text-slate-400">
                    {pet.species}
                    {pet.breed ? ` · ${pet.breed}` : ""}
                  </p>
                </div>
                <p className="rounded-lg bg-teal-50 px-4 py-2 text-lg font-black text-teal-700 dark:bg-teal-500/15 dark:text-teal-300">
                  ৳ {pet.adoptionFee}
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <InfoItem icon={<FaMapMarkerAlt />} label="Location" value={pet.location || "Not specified"} />
                <InfoItem icon={<FaVenusMars />} label="Gender" value={pet.gender || "Unknown"} />
                <InfoItem icon={<FaHeart />} label="Health Status" value={pet.healthStatus || "Good"} />
                <InfoItem icon={<FaSyringe />} label="Vaccination" value={vaccinationStatus} />
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-black">About {pet.name}</h2>
                <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">
                  {pet.description || "No description provided for this pet yet."}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-xl bg-slate-50 p-4 dark:bg-white/5">
                {pet.ownerImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={pet.ownerImage} alt={pet.ownerName} className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-white">
                    <FaUser />
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold">{pet.ownerName || "Pet Owner"}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{pet.ownerEmail}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Adoption side panel (only shown in adopt mode) */}
          {adoptMode && (
          <div>
            {isAdopted ? (
              <div className="rounded-2xl bg-rose-50 p-6 text-center ring-1 ring-rose-200 dark:bg-rose-500/10 dark:ring-rose-500/30">
                <FaShieldAlt className="mx-auto text-4xl text-rose-500" />
                <h3 className="mt-3 text-lg font-black text-rose-700 dark:text-rose-300">
                  This pet has been adopted
                </h3>
                <p className="mt-2 text-sm text-rose-600/80 dark:text-rose-200/80">
                  {pet.name} found a loving home. Check out other pets waiting for adoption.
                </p>
                <Link
                  href="/all-pets"
                  className="mt-4 inline-block rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-bold text-white"
                >
                  Browse Other Pets
                </Link>
              </div>
            ) : isPending ? (
              <LoadingSpinner label="Checking session..." />
            ) : !user ? (
              <div className="rounded-2xl bg-slate-50 p-6 text-center ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10">
                <FaPaw className="mx-auto text-4xl text-teal-700" />
                <h3 className="mt-3 text-lg font-black">Login to adopt {pet.name}</h3>
                <p className="mt-2 text-sm text-slate-500">
                  You need an account to submit an adoption request.
                </p>
                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/login?redirect=${encodeURIComponent(`/pets/${pet._id}`)}`}
                    className="flex-1 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-bold text-white"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="flex-1 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-bold dark:border-slate-600"
                  >
                    Register
                  </Link>
                </div>
              </div>
            ) : isOwner ? (
              <div className="rounded-2xl bg-amber-50 p-6 text-center ring-1 ring-amber-200 dark:bg-amber-500/10 dark:ring-amber-500/30">
                <FaPaw className="mx-auto text-4xl text-amber-600" />
                <h3 className="mt-3 text-lg font-black text-amber-700 dark:text-amber-300">
                  This is your listing
                </h3>
                <p className="mt-2 text-sm text-amber-700/80 dark:text-amber-200/80">
                  Owners cannot request adoption for their own pets. Manage requests from your dashboard.
                </p>
                <Link
                  href="/dashboard/my-listings"
                  className="mt-4 inline-block rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-bold text-white"
                >
                  Go to My Listings
                </Link>
              </div>
            ) : (
              <AdoptionForm pet={pet} user={user} />
            )}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 dark:bg-white/5">
      <span className="text-xl text-teal-700">{icon}</span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
        <p className="text-sm font-bold">{value}</p>
      </div>
    </div>
  );
}
