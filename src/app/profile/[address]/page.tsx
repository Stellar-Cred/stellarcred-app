import { notFound } from "next/navigation";
import { getScoreTier, truncateAddress } from "@stellarcred/sdk";

import { CopyButton } from "@/components/CopyButton";
import { CredentialCard } from "@/components/CredentialCard";
import { ScoreMeter } from "@/components/ScoreMeter";
import { TierBadge } from "@/components/TierBadge";
import { getStellarCredClient } from "@/lib/stellarcred";

const STELLAR_ADDRESS_PATTERN = /^G[A-Z2-7]{55}$/;

export const dynamic = "force-dynamic";

interface ProfilePageProps {
  params: Promise<{ address: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { address } = await params;

  if (!STELLAR_ADDRESS_PATTERN.test(address)) {
    notFound();
  }

  const client = getStellarCredClient();
  const [credentials, score] = await Promise.all([
    client.getCredentials(address),
    client.getScore(address),
  ]);

  const tier = getScoreTier(score);

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg text-white">
              {truncateAddress(address)}
            </span>
            <CopyButton text={address} />
          </div>
          <TierBadge tier={tier} />
          <a
            href={`https://stellar.expert/explorer/testnet/account/${address}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-cred-gold hover:underline"
          >
            View on Stellar Expert →
          </a>
        </div>
        <ScoreMeter score={score} />
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">
          Credentials ({credentials.length})
        </h2>
        {credentials.length === 0 ? (
          <p className="text-sm text-slate-400">
            This wallet has no credentials yet.
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
    </div>
  );
}
