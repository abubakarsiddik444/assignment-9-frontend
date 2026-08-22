import { FaCheckCircle, FaPaw, FaBan } from "react-icons/fa";

export default function ExtraSection1() {
  const steps = [
    {
      icon: <FaCheckCircle />,
      title: "One approval",
      text: "Only a single request can be accepted for each pet.",
    },
    {
      icon: <FaPaw />,
      title: "Auto-adopt",
      text: "Approving a request instantly marks the pet as adopted.",
    },
    {
      icon: <FaBan />,
      title: "Others blocked",
      text: "Remaining pending requests are rejected automatically.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-r from-teal-700 via-teal-800 to-teal-900 px-4 py-16 text-white">
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-200">
            Shelter tools
          </p>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            Owners can approve one request and close the loop
          </h2>
          <p className="mt-3 leading-7 text-teal-100">
            When a request is approved, the pet becomes adopted and other pending
            requests are blocked automatically.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/15"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-xl">
                {step.icon}
              </div>
              <h3 className="mt-4 text-lg font-black">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-teal-100">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
