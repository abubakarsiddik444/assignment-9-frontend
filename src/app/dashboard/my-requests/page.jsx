"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { FiEye, FiXCircle } from "react-icons/fi";
import { FaPaw } from "react-icons/fa";
import { getMyRequests, deleteRequest } from "@/api/requestApi";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { showSuccess, showError } from "@/utils/toastConfig";

const statusStyles = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  rejected: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
};

export default function MyRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getMyRequests();
      setRequests(data.requests || []);
    } catch (error) {
      showError(error?.message || "Failed to load your requests.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleCancel(id) {
    try {
      await deleteRequest(id);
      showSuccess("Request cancelled successfully!");
      load();
    } catch (error) {
      showError(error?.response?.data?.message || error?.message || "Failed to cancel request.");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-black">My Requests</h1>
      <p className="mt-1 text-sm text-slate-500">Track the adoption requests you have submitted.</p>

      <div className="mt-6">
        {isLoading ? (
          <LoadingSpinner label="Loading your requests..." />
        ) : requests.length === 0 ? (
          <div className="rounded-2xl bg-white py-16 text-center shadow-sm ring-1 ring-black/5 dark:bg-[#161922] dark:ring-white/10">
            <p className="text-slate-500">You have not submitted any adoption requests yet.</p>
            <Link
              href="/all-pets"
              className="mt-4 inline-block rounded-lg bg-teal-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
            >
              Browse Pets
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 dark:bg-[#161922] dark:ring-white/10">
            <div className="hidden grid-cols-[1.4fr_1fr_1fr_0.8fr_1.2fr] gap-4 border-b border-slate-200 px-5 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 sm:grid dark:border-slate-700">
              <span>Pet</span>
              <span>Request Date</span>
              <span>Pickup Date</span>
              <span>Status</span>
              <span className="text-right">Actions</span>
            </div>

            {requests.map((request) => (
              <div
                key={request._id}
                className="grid gap-3 border-b border-slate-100 px-5 py-4 last:border-0 sm:grid-cols-[1.4fr_1fr_1fr_0.8fr_1.2fr] sm:items-center dark:border-slate-800"
              >
                <div className="flex items-center gap-3">
                  {request.petImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={request.petImage} alt={request.petName} className="h-12 w-12 rounded-lg object-cover" />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300">
                      <FaPaw />
                    </div>
                  )}
                  <div>
                    <p className="font-black">{request.petName}</p>
                    <p className="text-xs text-slate-500">{request.petId.slice(-6)}</p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {new Date(request.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {new Date(request.pickupDate).toLocaleDateString()}
                </p>

                <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyles[request.status]}`}>
                  {request.status}
                </span>

                <div className="flex justify-start gap-2 sm:justify-end">
                  <Link
                    href={`/pets/${request.petId}`}
                    className="flex items-center gap-1 rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950"
                  >
                    <FiEye /> View
                  </Link>
                  {request.status === "pending" && (
                    <button
                      type="button"
                      onClick={() => handleCancel(request._id)}
                      className="flex items-center gap-1 rounded-lg bg-rose-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-rose-700"
                    >
                      <FiXCircle /> Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
