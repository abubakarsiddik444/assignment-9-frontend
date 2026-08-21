import SectionTitle from "@/components/Shared/SectionTitle";

export default function PetCareTips() {
  const tips = ["Schedule a vet checkup", "Prepare a quiet first-day space", "Keep food changes gradual"];

  return (
    <section className="px-4 py-12">
      <SectionTitle eyebrow="Care tips" title="Plan the first week before pickup" />
      <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3">
        {tips.map((tip) => (
          <span key={tip} className="bg-amber-100 px-4 py-3 text-sm font-bold text-amber-900">
            {tip}
          </span>
        ))}
      </div>
    </section>
  );
}
