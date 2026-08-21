"use client";

import axios from "axios";

const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

/**
 * Axios instance for protected API requests.
 * `withCredentials` makes sure the HTTPOnly session cookie is sent along.
 */
export default function useAxiosSecure() {
  return axiosSecure;
}
