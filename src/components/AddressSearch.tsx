"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const STELLAR_ADDRESS_PATTERN = /^G[A-Z2-7]{55}$/;

export function AddressSearch({
  placeholder = "Search a Stellar wallet address (G...)",
}: {
  placeholder?: string;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const address = value.trim();
    if (!STELLAR_ADDRESS_PATTERN.test(address)) {
      setError("Enter a valid Stellar address (starts with G, 56 characters).");
      return;
    }
    setError(null);
    router.push(`/profile/${address}`);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 font-mono text-sm text-white placeholder:text-slate-500 focus:border-cred-purple focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-cred-purple px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Search
        </button>
      </div>
      {error ? <p className="mt-2 text-xs text-red-400">{error}</p> : null}
    </form>
  );
}
