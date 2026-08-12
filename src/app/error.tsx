"use client";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="text-xl font-semibold text-red-300">
        Something went wrong
      </h1>
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
