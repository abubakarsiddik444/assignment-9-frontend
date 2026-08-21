import SectionTitle from "@/components/Shared/SectionTitle";

export default function SuccessStories() {
  return (
    <section className="bg-white px-4 py-12 dark:bg-[#161922]">
      <SectionTitle
        eyebrow="Stories"
        title="Small requests, big new beginnings"
        text="Shelters and owners can keep every adoption conversation organized."
      />
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2">
        <Story name="Milo and Araf" text="Approved in two days after a thoughtful pickup plan." />
        <Story name="Luna and Nabila" text="A quiet home matched Luna's personality perfectly." />
      </div>
    </section>
  );
}

function Story({ name, text }) {
  return (
    <article className="border-l-4 border-teal-700 bg-[#f5f7f2] p-6 dark:bg-white/10">
      <h3 className="text-xl font-black">{name}</h3>
      <p className="mt-2 text-slate-600 dark:text-slate-300">{text}</p>
    </article>
  );
}
