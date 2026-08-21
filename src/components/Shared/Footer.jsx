import Link from "next/link";
import { FaPaw, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white dark:border-white/10 dark:bg-[#161922]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-2 text-lg font-black text-teal-700 dark:text-teal-300">
            <FaPaw />
            PetAdopt
          </Link>
          <p className="mt-3 max-w-xs leading-6">
            Connecting adoptable pets with caring families through a secure,
            transparent request workflow.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-slate-950 dark:text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><Link href="/all-pets" className="transition hover:text-teal-700">Browse Pets</Link></li>
            <li><Link href="/register" className="transition hover:text-teal-700">Become an Owner</Link></li>
            <li><Link href="/dashboard/my-listings" className="transition hover:text-teal-700">My Listings</Link></li>
            <li><Link href="/dashboard/my-requests" className="transition hover:text-teal-700">My Requests</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-slate-950 dark:text-white">Connect With Us</h3>
          <div className="mt-3 flex gap-3">
            <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 transition hover:bg-teal-700 hover:text-white dark:bg-white/10">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 transition hover:bg-teal-700 hover:text-white dark:bg-white/10">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 transition hover:bg-teal-700 hover:text-white dark:bg-white/10">
              <FaLinkedinIn />
            </a>
          </div>
          <p className="mt-4">Dhaka, Bangladesh</p>
          <p className="mt-1">Copyright © {new Date().getFullYear()} PetAdopt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
