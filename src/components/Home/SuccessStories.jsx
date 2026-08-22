import { FaQuoteLeft } from "react-icons/fa";
import SectionTitle from "@/components/Shared/SectionTitle";

const stories = [
  {
    name: "Milo and Araf",
    text: "Approved in two days after a thoughtful pickup plan.",
    emoji: "🐕",
  },
  {
    name: "Luna and Nabila",
    text: "A quiet home matched Luna's personality perfectly.",
    emoji: "🐈",
  },
];

export default function SuccessStories() {
  return (
    <section className="bg-white px-4 py-16 dark:bg-[#161922]">
      <SectionTitle
        eyebrow="Stories"
        title="Small requests, big new beginnings"
        text="Shelters and owners can keep every adoption conversation organized."
      />
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {stories.map((story) => (
          <article
            key={story.name}
            className="relative rounded-2xl bg-[#f5f7f2] p-7 ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-white/5 dark:ring-white/10"
          >
            <FaQuoteLeft className="text-3xl text-teal-700/25 dark:text-teal-300/25" />
            <p className="mt-4 text-lg font-semibold leading-7 text-slate-700 dark:text-slate-200">
              {story.text}
            </p>
            <div className="mt-5 flex items-center gap-3 border-t border-black/5 pt-4 dark:border-white/10">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-teal-400 to-teal-600 text-xl">
                {story.emoji}
              </div>
              <div>
                <p className="font-black">{story.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Successful adoption
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
