import Link from "next/link";
import { FaPaw, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-linear-to-b from-[#16213e] to-[#0f1a33] text-slate-300">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-teal-500/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm md:grid-cols-3">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-black text-teal-300"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-teal-400 to-teal-600 text-white">
              <FaPaw />
            </span>
            PetAdopt
          </Link>
          <p className="mt-3 max-w-xs leading-6 text-slate-400">
            Connecting adoptable pets with caring families through a secure,
            transparent request workflow.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><Link href="/all-pets" className="transition hover:text-teal-300">Browse Pets</Link></li>
            <li><Link href="/register" className="transition hover:text-teal-300">Become an Owner</Link></li>
            <li><Link href="/dashboard/my-listings" className="transition hover:text-teal-300">My Listings</Link></li>
            <li><Link href="/dashboard/my-requests" className="transition hover:text-teal-300">My Requests</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white">Connect With Us</h3>
          <div className="mt-3 flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 transition hover:bg-teal-500 hover:text-white"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 transition hover:bg-teal-500 hover:text-white"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 transition hover:bg-teal-500 hover:text-white"
            >
              <FaLinkedinIn />
            </a>
          </div>
          <p className="mt-4 text-slate-400">Dhaka, Bangladesh</p>
          <p className="mt-1 text-slate-400">
            Copyright © {new Date().getFullYear()} PetAdopt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
