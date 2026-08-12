export default function LeaderboardLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="mx-auto h-8 w-48 rounded bg-slate-800" />
      <div className="space-y-2">
        {[0, 1, 2, 3, 4].map((key) => (
          <div key={key} className="h-12 rounded-lg bg-slate-800" />
        ))}
      </div>
    </div>
  );
}
