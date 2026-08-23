import Link from "next/link";
import { FaPaw } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <FaPaw className="text-6xl text-teal-700" />
      <h1 className="mt-4 text-7xl font-black tracking-tight">404</h1>
      <p className="mt-4 max-w-md text-lg leading-8 text-slate-600 dark:text-slate-300">
        Oops! This page seems to have wandered off the leash. Let&apos;s get you
        back to the pack.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-teal-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
      >
        Back to Home
      </Link>
    </div>
  );
}
