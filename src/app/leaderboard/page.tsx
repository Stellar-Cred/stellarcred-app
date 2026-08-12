import Link from "next/link";
import { getScoreTier, truncateAddress } from "@stellarcred/sdk";

import { TierBadge } from "@/components/TierBadge";
import { getStellarCredClient } from "@/lib/stellarcred";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const client = getStellarCredClient();
  const entries = await client.getLeaderboard(100);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
        <p className="mt-2 text-slate-400">
          Top 100 wallets by StellarCred score.
        </p>
      </div>

      {entries.length === 0 ? (
        <p className="text-center text-sm text-slate-400">
          No wallets have earned credentials yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/70 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Tier</th>
                <th className="px-4 py-3">Credentials</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr
                  key={entry.address}
                  className="border-t border-slate-800 transition hover:bg-slate-900/40"
                >
                  <td className="px-4 py-3 text-slate-400">#{index + 1}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/profile/${entry.address}`}
                      className="font-mono text-cred-gold hover:underline"
                    >
                      {truncateAddress(entry.address)}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-white">{entry.score}</td>
                  <td className="px-4 py-3">
                    <TierBadge tier={getScoreTier(entry.score)} />
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {entry.credentialCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
