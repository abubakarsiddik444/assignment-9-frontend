import SectionTitle from "@/components/Shared/SectionTitle";

export default function ExtraSection1() {
  return (
    <section className="bg-teal-700 px-4 py-12 text-white">
      <SectionTitle
        eyebrow="Shelter tools"
        title="Owners can approve one request and close the loop"
        text="When a request is approved, the pet becomes adopted and other pending requests are blocked automatically."
      />
    </section>
  );
}
