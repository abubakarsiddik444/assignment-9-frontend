import { FaHeart, FaBookOpen, FaShieldAlt } from "react-icons/fa";
import SectionTitle from "@/components/Shared/SectionTitle";

export default function WhyAdopt() {
  const items = [
    {
      title: "Save a life",
      text: "Give a waiting pet a safe home and a second chance.",
      icon: <FaHeart />,
      iconBg: "bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300",
    },
    {
      title: "Know the story",
      text: "Health, vaccination, fee, and owner details stay visible.",
      icon: <FaBookOpen />,
      iconBg: "bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300",
    },
    {
      title: "Request safely",
      text: "Owners handle each request through a protected workflow.",
      icon: <FaShieldAlt />,
      iconBg: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    },
  ];

  return (
    <section className="px-4 py-16">
      <SectionTitle
        eyebrow="Why adopt"
        title="Responsible adoption starts with clear information"
        text="PetAdopt keeps the process transparent for adopters and owners."
      />
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="group relative overflow-hidden rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:bg-[#161922] dark:ring-white/10"
          >
            <span className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-teal-500/5 transition duration-300 group-hover:bg-teal-500/15" />
            <div
              className={`relative flex h-12 w-12 items-center justify-center rounded-xl text-xl transition duration-300 group-hover:scale-110 ${item.iconBg}`}
            >
              {item.icon}
            </div>
            <h3 className="relative mt-5 text-xl font-black">{item.title}</h3>
            <p className="relative mt-3 leading-7 text-slate-600 dark:text-slate-300">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
