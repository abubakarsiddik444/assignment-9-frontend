import SectionTitle from "@/components/Shared/SectionTitle";

export default function WhyAdopt() {
  const items = [
    ["Save a life", "Give a waiting pet a safe home and a second chance."],
    ["Know the story", "Health, vaccination, fee, and owner details stay visible."],
    ["Request safely", "Owners handle each request through a protected workflow."],
  ];

  return (
    <section className="px-4 py-12">
      <SectionTitle
        eyebrow="Why adopt"
        title="Responsible adoption starts with clear information"
        text="PetAdopt keeps the process transparent for adopters and owners."
      />
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
        {items.map(([title, text]) => (
          <article key={title} className="bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-[#161922] dark:ring-white/10">
            <h3 className="text-xl font-black">{title}</h3>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
