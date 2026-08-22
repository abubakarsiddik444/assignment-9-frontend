import { FaStethoscope, FaHome, FaUtensils } from "react-icons/fa";
import SectionTitle from "@/components/Shared/SectionTitle";

const tips = [
  {
    text: "Schedule a vet checkup",
    icon: <FaStethoscope />,
    color: "bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300",
  },
  {
    text: "Prepare a quiet first-day space",
    icon: <FaHome />,
    color: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  },
  {
    text: "Keep food changes gradual",
    icon: <FaUtensils />,
    color: "bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300",
  },
];

export default function PetCareTips() {
  return (
    <section className="px-4 py-16">
      <SectionTitle
        eyebrow="Care tips"
        title="Plan the first week before pickup"
        text="A few simple steps help your new companion settle in comfortably."
      />
      <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3">
        {tips.map((tip, i) => (
          <div
            key={tip.text}
            className="relative rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-[#161922] dark:ring-white/10"
          >
            <span className="absolute right-4 top-3 text-5xl font-black text-slate-100 dark:text-white/5">
              {i + 1}
            </span>
            <div
              className={`relative mx-auto flex h-12 w-12 items-center justify-center rounded-xl text-xl ${tip.color}`}
            >
              {tip.icon}
            </div>
            <p className="relative mt-4 font-bold">{tip.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
