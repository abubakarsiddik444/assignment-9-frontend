"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPet } from "@/api/petApi";
import { useAuth } from "@/hooks/useAuth";
import { showSuccess, showError } from "@/utils/toastConfig";

export const emptyPetForm = {
  name: "",
  species: "Dog",
  breed: "",
  age: "",
  gender: "Unknown",
  image: "",
  healthStatus: "Good",
  vaccinationStatus: "Not Vaccinated",
  location: "",
  adoptionFee: "",
  description: "",
};

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-teal-600 dark:border-slate-600 dark:bg-slate-900";

export default function AddPetForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [form, setForm] = useState(emptyPetForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.image.trim() || !form.location.trim() || !form.adoptionFee) {
      showError("Please fill in pet name, image URL, location and adoption fee.");
      return;
    }
    setIsSubmitting(true);
    try {
      await createPet({ ...form, adoptionFee: Number(form.adoptionFee) || 0 });
      showSuccess("Pet added successfully!");
      router.push("/dashboard/my-listings");
    } catch (error) {
      showError(error?.response?.data?.message || error?.message || "Failed to add pet.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-[#161922] dark:ring-white/10 sm:p-8">
      <h1 className="text-2xl font-black">Add a New Pet</h1>
      <p className="mt-1 text-sm text-slate-500">Fill in the details below to list a pet for adoption.</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Pet Name *">
          <input type="text" required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Max" className={inputClass} />
        </Field>

        <Field label="Species *">
          <select value={form.species} onChange={(e) => update("species", e.target.value)} className={inputClass}>
            {["Dog", "Cat", "Bird", "Rabbit", "Other"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>

        <Field label="Breed">
          <input type="text" value={form.breed} onChange={(e) => update("breed", e.target.value)} placeholder="e.g. Golden Retriever" className={inputClass} />
        </Field>

        <Field label="Age">
          <input type="text" value={form.age} onChange={(e) => update("age", e.target.value)} placeholder="e.g. 2 years" className={inputClass} />
        </Field>

        <Field label="Gender">
          <select value={form.gender} onChange={(e) => update("gender", e.target.value)} className={inputClass}>
            {["Male", "Female", "Unknown"].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </Field>

        <Field label="Image URL *">
          <input type="url" required value={form.image} onChange={(e) => update("image", e.target.value)} placeholder="https://i.ibb.co/..." className={inputClass} />
        </Field>

        <Field label="Health Status">
          <select value={form.healthStatus} onChange={(e) => update("healthStatus", e.target.value)} className={inputClass}>
            {["Good", "Healthy", "Under Treatment", "Special Needs"].map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </Field>

        <Field label="Vaccination Status">
          <select value={form.vaccinationStatus} onChange={(e) => update("vaccinationStatus", e.target.value)} className={inputClass}>
            {["Vaccinated", "Not Vaccinated", "Partial"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </Field>

        <Field label="Location *">
          <input type="text" required value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="e.g. Dhaka" className={inputClass} />
        </Field>

        <Field label="Adoption Fee (৳) *">
          <input type="number" min="0" required value={form.adoptionFee} onChange={(e) => update("adoptionFee", e.target.value)} placeholder="e.g. 1500" className={inputClass} />
        </Field>

        {/* Owner email — auto-filled, read only */}
        <div className="sm:col-span-2">
          <Field label="Owner Email">
            <input type="email" readOnly value={user?.email || ""} className={`${inputClass} cursor-not-allowed bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400`} />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Description">
            <textarea rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Tell adopters about this pet's personality, history and needs..." className={`${inputClass} resize-none`} />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-teal-700 py-3 text-sm font-black text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Adding Pet..." : "Add Pet"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-slate-600 dark:text-slate-300">{label}</span>
      {children}
    </label>
  );
}
