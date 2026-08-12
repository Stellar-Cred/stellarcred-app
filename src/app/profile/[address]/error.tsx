"use client";

export default function ProfileError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-red-500/40 bg-red-500/10 p-8 text-center">
      <h2 className="text-lg font-semibold text-red-300">
        Couldn&apos;t load this profile
      </h2>
      <p className="max-w-md text-sm text-red-200/80">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full border border-red-400 px-4 py-2 text-sm text-red-200 transition hover:bg-red-500/10"
      >
        Try again
      </button>
    </div>
  );
}
