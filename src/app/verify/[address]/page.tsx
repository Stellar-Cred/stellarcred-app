"use client";

import { use, useState } from "react";
import type { Credential } from "@stellarcred/sdk";
import { credentialIcon, timeAgo, truncateAddress } from "@stellarcred/sdk";

import { CREDENTIAL_TYPES } from "@/lib/credentialTypes";
import { getStellarCredClient } from "@/lib/stellarcred";

interface VerifyPageProps {
  params: Promise<{ address: string }>;
}

type VerifyResult =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "found"; credential: Credential }
  | { status: "not-found" }
  | { status: "error"; message: string };

export default function VerifyPage({ params }: VerifyPageProps) {
  const { address } = use(params);
  const [credentialType, setCredentialType] = useState(
    CREDENTIAL_TYPES[0]?.type ?? "",
  );
  const [result, setResult] = useState<VerifyResult>({ status: "idle" });

  async function handleVerify() {
    setResult({ status: "loading" });
    try {
      const client = getStellarCredClient();
      const has = await client.hasCredential(address, credentialType);
      if (!has) {
        setResult({ status: "not-found" });
        return;
      }
      const credentials = await client.getCredentials(address);
      const credential = credentials.find(
        (c) => c.credentialType === credentialType,
      );
      if (!credential) {
        setResult({ status: "not-found" });
        return;
      }
      setResult({ status: "found", credential });
    } catch (err) {
      setResult({
        status: "error",
        message: err instanceof Error ? err.message : "Verification failed",
      });
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">
          Verify a Credential
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Checking{" "}
          <span className="font-mono text-slate-300">
            {truncateAddress(address)}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          value={credentialType}
          onChange={(event) => setCredentialType(event.target.value)}
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white focus:border-cred-purple focus:outline-none"
        >
          {CREDENTIAL_TYPES.map((credential) => (
            <option key={credential.type} value={credential.type}>
              {credential.type}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => {
            void handleVerify();
          }}
          className="rounded-lg bg-cred-purple px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Verify
        </button>
      </div>

      {result.status === "loading" ? (
        <p className="text-center text-sm text-slate-400">
          Checking on-chain…
        </p>
      ) : null}

      {result.status === "found" ? (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-5 text-center">
          <span className="text-3xl">
            {credentialIcon(result.credential.credentialType)}
          </span>
          <p className="mt-2 font-semibold text-emerald-300">
            Yes — this wallet holds {result.credential.credentialType}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Issued by {truncateAddress(result.credential.issuer)} ·{" "}
            {timeAgo(result.credential.issuedAt)}
          </p>
        </div>
      ) : null}

      {result.status === "not-found" ? (
        <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5 text-center text-slate-300">
          No — this wallet does not hold this credential.
        </div>
      ) : null}

      {result.status === "error" ? (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-5 text-center text-red-300">
          {result.message}
        </div>
      ) : null}
    </div>
  );
}
