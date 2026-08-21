"use client";

import { useEffect, useState } from "react";
import { getPets } from "@/api/petApi";
import SearchFilterBar from "@/components/Pets/SearchFilterBar";
import PetCard from "@/components/Pets/PetCard";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import SectionTitle from "@/components/Shared/SectionTitle";
import { showError } from "@/utils/toastConfig";

const PAGE_SIZE = 9;

export default function AllPetsPage() {
  const [filters, setFilters] = useState({
    search: "",
    species: "all",
    sort: "newest",
    page: 1,
  });
  const [data, setData] = useState({ pets: [], total: 0, totalPages: 1, page: 1 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      setIsLoading(true);
      try {
        const params = {
          search: filters.search,
          species: filters.species === "all" ? "" : filters.species,
          sort: filters.sort,
          page: filters.page,
          limit: PAGE_SIZE,
        };
        const result = await getPets(params);
        if (active) setData(result);
      } catch (error) {
        if (active) showError(error?.message || "Failed to load pets.");
      } finally {
        if (active) setIsLoading(false);
      }
    }

    const timer = setTimeout(load, 300);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [filters.search, filters.species, filters.sort, filters.page]);

  function handleFilterChange(next) {
    setFilters({ ...next, page: 1 });
  }

  function goToPage(page) {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Browse pets"
          title="All Pets Available for Adoption"
          text={`Search, filter by species and sort by adoption fee — ${data.total} pets found.`}
        />

        <SearchFilterBar filters={filters} onChange={handleFilterChange} />

        <div className="mt-8">
          {isLoading ? (
            <LoadingSpinner label="Loading pets..." />
          ) : data.pets.length === 0 ? (
            <p className="py-16 text-center text-slate-500">
              No pets match your search. Try a different name or species.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.pets.map((pet) => (
                <PetCard key={pet._id} pet={pet} />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {data.totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={data.page <= 1}
              onClick={() => goToPage(data.page - 1)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold disabled:opacity-40 dark:border-slate-600"
            >
              Prev
            </button>
            {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                className={`h-10 w-10 rounded-lg text-sm font-bold transition ${
                  page === data.page
                    ? "bg-teal-700 text-white"
                    : "border border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-white/10"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              disabled={data.page >= data.totalPages}
              onClick={() => goToPage(data.page + 1)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold disabled:opacity-40 dark:border-slate-600"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
