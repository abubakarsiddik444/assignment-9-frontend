"use client";

import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { FaCheck, FaTimes, FaPaw } from "react-icons/fa";
import { getPetRequests, updateRequestStatus } from "@/api/requestApi";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { showSuccess, showError } from "@/utils/toastConfig";

const statusStyles = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  rejected: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
};

export default function RequestsModal({ pet, onClose, onDecision }) {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    let active = true;
    async function load() {
      setIsLoading(true);
      try {
        const data = await getPetRequests(pet._id);
        if (active) setRequests(data.requests || []);
      } catch (error) {
        if (active) showError(error?.message || "Failed to load requests.");
      } finally {
        if (active) setIsLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [pet._id]);

  async function handleDecision(requestId, status) {
    setProcessingId(requestId);
    try {
      await updateRequestStatus(requestId, status);
      showSuccess(`Request ${status} successfully!`);
      const data = await getPetRequests(pet._id);
      setRequests(data.requests || []);
      onDecision?.();
    } catch (error) {
      showError(error?.response?.data?.message || error?.message || "Failed to update request.");
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-[#161922]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black">
            Requests for <span className="text-teal-700">{pet.name}</span>
          </h3>
          <button type="button" onClick={onClose} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/10">
            <FiX className="text-xl" />
          </button>
        </div>

        {isLoading ? (
          <div className="py-10"><LoadingSpinner label="Loading requests..." /></div>
        ) : requests.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <FaPaw className="mx-auto text-4xl text-slate-300 dark:text-slate-600" />
            <p className="mt-3">No adoption requests yet.</p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {requests.map((request) => {
              const decided = request.status === "approved" || request.status === "rejected";
              return (
                <div key={request._id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-black">{request.userName}</p>
                      <p className="text-sm text-slate-500">{request.userEmail}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyles[request.status]}`}>
                      {request.status}
                    </span>
                  </div>
                  <dl className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex justify-between">
                      <dt className="text-slate-400">Pickup Date</dt>
                      <dd className="font-semibold">{new Date(request.pickupDate).toLocaleDateString()}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-slate-400">Requested</dt>
                      <dd className="font-semibold">{new Date(request.createdAt).toLocaleDateString()}</dd>
                    </div>
                    {request.message && (
                      <div className="pt-2">
                        <dt className="text-slate-400">Message</dt>
                        <dd className="mt-1 rounded-lg bg-slate-50 p-3 text-slate-600 dark:bg-white/5 dark:text-slate-300">
                          {request.message}
                        </dd>
                      </div>
                    )}
                  </dl>

                  {!decided && (
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        disabled={processingId === request._id}
                        onClick={() => handleDecision(request._id, "approved")}
                        className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-emerald-600 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:opacity-60"
                      >
                        <FaCheck /> Approve
                      </button>
                      <button
                        type="button"
                        disabled={processingId === request._id}
                        onClick={() => handleDecision(request._id, "rejected")}
                        className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-rose-600 py-2.5 text-sm font-bold text-white transition hover:bg-rose-700 disabled:opacity-60"
                      >
                        <FaTimes /> Reject
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
