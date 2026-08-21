export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="flex min-h-40 items-center justify-center gap-3 text-slate-500">
      <span className="h-5 w-5 animate-spin border-2 border-slate-300 border-t-teal-700" />
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
}
