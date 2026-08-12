export default function ProfileLoading() {
  return (
    <div className="animate-pulse space-y-10">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <div className="h-6 w-40 rounded bg-slate-800" />
          <div className="h-5 w-20 rounded-full bg-slate-800" />
        </div>
        <div className="h-44 w-44 rounded-full bg-slate-800" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((key) => (
          <div key={key} className="h-32 rounded-xl bg-slate-800" />
        ))}
      </div>
    </div>
  );
}
