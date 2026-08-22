"use client";

import { useState } from "react";
import Link from "next/link";
import { FaPaw, FaCheckCircle } from "react-icons/fa";
import { createAdoptionRequest } from "@/api/requestApi";
import { showError } from "@/utils/toastConfig";

export default function AdoptionForm({ pet, user, onSubmitted }) {
  const [form, setForm] = useState({ pickupDate: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.pickupDate) {
      showError("Please choose a pickup date.");
      return;
    }
    setIsSubmitting(true);
    try {
      await createAdoptionRequest(pet._id, form);
      setSubmitted(true);
      setForm({ pickupDate: "", message: "" });
      onSubmitted?.();
    } catch (error) {
      showError(error?.response?.data?.message || error?.message || "Failed to submit request.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-[#161922] dark:ring-white/10"
    >
      <div className="flex items-center gap-2">
        <FaPaw className="text-xl text-teal-700" />
        <h3 className="text-lg font-black">Adoption Request</h3>
      </div>

      <Field label="Pet Name" readOnly value={pet.name} />

      <Field label="Your Name" readOnly value={user?.name || ""} />

      <Field label="Your Email" readOnly value={user?.email || ""} />

      <label className="block">
        <span className="mb-1 block text-sm font-semibold text-slate-600 dark:text-slate-300">
          Pickup Date *
        </span>
        <input
          type="date"
          min={today}
          required
          value={form.pickupDate}
          onChange={(e) => setForm({ ...form, pickupDate: e.target.value })}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-teal-600 dark:border-slate-600 dark:bg-slate-900"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-semibold text-slate-600 dark:text-slate-300">
          Message (optional)
        </span>
        <textarea
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell the owner why you would be a great home..."
          className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-teal-600 dark:border-slate-600 dark:bg-slate-900"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-teal-700 py-3 text-sm font-black text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Adopt Now"}
      </button>
      </form>

      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#161922] p-8 text-center shadow-2xl ring-1 ring-white/10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/20">
              <FaCheckCircle className="text-4xl text-teal-400" />
            </div>
            <h3 className="mt-4 text-xl font-black text-white">Request Submitted!</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Your adoption request for{" "}
              <span className="font-bold text-teal-300">{pet.name}</span> has been sent to the
              owner. You can track its status in My Requests.
            </p>
            <Link
              href="/dashboard/my-requests"
              className="mt-6 inline-block w-full rounded-lg border border-teal-500/40 px-6 py-3 text-sm font-bold text-teal-300 transition hover:bg-teal-500/10"
            >
              View My Requests
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function Field({ label, value }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-slate-600 dark:text-slate-300">
        {label}
      </span>
      <input
        type="text"
        readOnly
        value={value}
        className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
      />
    </label>
  );
}
