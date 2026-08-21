export default function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center">
      {eyebrow && (
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-3xl font-black sm:text-4xl">{title}</h2>
      {text && <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{text}</p>}
    </div>
  );
}
