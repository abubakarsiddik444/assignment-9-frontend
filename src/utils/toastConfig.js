"use client";

import toast from "react-hot-toast";

/** Shared options passed to every toast notification. */
export const toastConfig = {
  position: "top-center",
  duration: 3000,
  style: {
    borderRadius: "12px",
    background: "#0f172a",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
  },
  success: {
    iconTheme: { primary: "#0d9488", secondary: "#fff" },
  },
  error: {
    iconTheme: { primary: "#e11d48", secondary: "#fff" },
  },
};

export function showSuccess(message) {
  toast.success(message, toastConfig);
}

export function showError(message) {
  toast.error(message || "Something went wrong. Please try again.", toastConfig);
}

export function showInfo(message) {
  toast(message, toastConfig);
}
