"use client";

import Link from "next/link";
import { useIdentity, useWallet } from "@stellar-cred/sdk/hooks";

import { CredentialCard } from "@/components/CredentialCard";
import { ProgressToNextTier } from "@/components/ProgressToNextTier";
import { ScoreMeter } from "@/components/ScoreMeter";
import { TierBadge } from "@/components/TierBadge";

export default function DashboardPage() {
  const { publicKey, connect, isConnected } = useWallet();

  if (!isConnected || !publicKey) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-white">Connect your wallet</h1>
        <p className="max-w-md text-sm text-slate-400">
          Connect your Freighter wallet to view your StellarCred profile and
          credentials.
        </p>
        <button
          type="button"
          onClick={() => {
            void connect();
          }}
          className="rounded-full bg-cred-purple px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  return <DashboardContent address={publicKey} />;
}

function DashboardContent({ address }: { address: string }) {
  const { credentials, score, tier, isLoading, error, refetch } =
    useIdentity(address);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-6 text-center text-red-300">
        <p>Failed to load your profile: {error.message}</p>
        <button
          type="button"
          onClick={() => {
            void refetch();
          }}
          className="mt-4 rounded-full border border-red-400 px-4 py-2 text-sm transition hover:bg-red-500/10"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <h1 className="text-2xl font-bold text-white">Your Profile</h1>
          <TierBadge tier={tier} />
        </div>
        <ScoreMeter score={score} />
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Progress</h2>
        <ProgressToNextTier score={score} />
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">
          Your Credentials ({credentials.length})
        </h2>
        {credentials.length === 0 ? (
          <p className="text-sm text-slate-400">
            You don&apos;t have any credentials yet. Interact with a
            StellarCred-integrated protocol to start earning them.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {credentials.map((credential) => (
              <CredentialCard
                key={credential.credentialType}
                credential={credential}
              />
            ))}
          </div>
        )}
      </div>

      <div className="text-center">
        <Link
          href="/credentials"
          className="text-sm text-cred-gold hover:underline"
        >
          See all credential types and how to earn them →
        </Link>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-10">
      <div className="mx-auto h-44 w-44 rounded-full bg-slate-800" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((key) => (
          <div key={key} className="h-32 rounded-xl bg-slate-800" />
        ))}
      </div>
    </div>
  );
}
