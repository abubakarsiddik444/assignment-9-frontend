import { FaLock, FaShieldAlt, FaUserCheck } from "react-icons/fa";
import SectionTitle from "@/components/Shared/SectionTitle";

const points = [
  {
    icon: <FaLock />,
    title: "HTTPOnly cookies",
    text: "Session tokens are stored in HTTPOnly cookies, away from client scripts.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Protected routes",
    text: "Private pages and APIs verify every request before granting access.",
  },
  {
    icon: <FaUserCheck />,
    title: "Owner-only actions",
    text: "Only the pet owner can update, delete or approve requests.",
  },
];

export default function ExtraSection2() {
  return (
    <section className="px-4 py-16">
      <SectionTitle
        eyebrow="Trust"
        title="Protected actions stay behind authentication"
        text="Adding pets, submitting requests, and handling approvals require a Better Auth session."
      />
      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
        {points.map((point) => (
          <div
            key={point.title}
            className="rounded-2xl bg-white p-7 text-center shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-[#161922] dark:ring-white/10"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-xl text-teal-700 dark:bg-teal-500/15 dark:text-teal-300">
              {point.icon}
            </div>
            <h3 className="mt-4 text-lg font-black">{point.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {point.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
