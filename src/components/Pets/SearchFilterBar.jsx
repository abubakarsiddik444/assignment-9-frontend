"use client";

import { FiSearch } from "react-icons/fi";

const speciesOptions = [
  "Dog",
  "Cat",
  "Bird",
  "Rabbit",
  "Hamster",
  "Parrot",
  "Fish",
  "Ferret",
  "Guinea Pig",
  "Tortoise",
  "Other",
];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "feeLow", label: "Fee: Low to High" },
  { value: "feeHigh", label: "Fee: High to Low" },
];

export default function SearchFilterBar({ filters, onChange }) {
  function handleChange(key, value) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 dark:bg-[#161922] dark:ring-white/10">
      <div className="grid gap-3 sm:grid-cols-3">
        {/* Search by name */}
        <label className="relative block">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            placeholder="Search pets by name..."
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-teal-600 dark:border-slate-600 dark:bg-slate-900"
          />
        </label>

        {/* Filter by species */}
        <select
          value={filters.species}
          onChange={(e) => handleChange("species", e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white py-2.5 px-3 text-sm outline-none transition focus:border-teal-600 dark:border-slate-600 dark:bg-slate-900"
        >
          <option value="all">All Species</option>
          {speciesOptions.map((species) => (
            <option key={species} value={species}>
              {species}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={filters.sort}
          onChange={(e) => handleChange("sort", e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white py-2.5 px-3 text-sm outline-none transition focus:border-teal-600 dark:border-slate-600 dark:bg-slate-900"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
