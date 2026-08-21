"use client";

import { useState } from "react";
import { FaPaw } from "react-icons/fa";
import { createAdoptionRequest } from "@/api/requestApi";
import { showSuccess, showError } from "@/utils/toastConfig";

export default function AdoptionForm({ pet, user, onSubmitted }) {
  const [form, setForm] = useState({ pickupDate: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      showSuccess("Adoption request submitted successfully!");
      setForm({ pickupDate: "", message: "" });
      onSubmitted?.();
    } catch (error) {
      showError(error?.response?.data?.message || error?.message || "Failed to submit request.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
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
