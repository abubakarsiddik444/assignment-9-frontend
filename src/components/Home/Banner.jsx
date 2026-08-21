"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Banner() {
  return (
    <section className="border-b border-black/10 bg-white dark:border-white/10 dark:bg-[#161922]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">
            Adopt with confidence
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-6xl">
            Find the right pet and manage every adoption request in one place.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Browse pets, inspect health details, submit pickup requests, and let
            owners approve or reject requests from a focused dashboard.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/all-pets"
              className="h-12 rounded-lg bg-teal-700 px-6 text-sm font-black text-white transition hover:bg-teal-800"
            >
              Adopt Now
            </Link>
            <Link
              href="/dashboard/add-pet"
              className="h-12 rounded-lg border border-slate-300 px-6 text-sm font-black text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-white/10"
            >
              Add a Pet
            </Link>
          </div>
        </motion.div>
        <motion.img
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1100&q=80"
          alt="Happy adopted pets"
          className="h-80 w-full rounded-2xl object-cover shadow-xl"
        />
      </div>
    </section>
  );
}
