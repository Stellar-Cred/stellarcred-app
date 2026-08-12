import { calculateProgressToNextTier, ScoreTier } from "@stellar-cred/sdk";

const TIER_MIN: Record<ScoreTier, number> = {
  [ScoreTier.Newcomer]: 0,
  [ScoreTier.Bronze]: 100,
  [ScoreTier.Silver]: 300,
  [ScoreTier.Gold]: 500,
  [ScoreTier.Platinum]: 700,
  [ScoreTier.Diamond]: 900,
};

const SUGGESTIONS: Record<ScoreTier, string> = {
  [ScoreTier.Newcomer]:
    "Complete your first on-chain payment to earn a PaymentRecord credential.",
  [ScoreTier.Bronze]:
    "Complete a payment stream or create an invoice to keep building history.",
  [ScoreTier.Silver]:
    "Contribute to an open-source Stellar project for a DeveloperContrib credential.",
  [ScoreTier.Gold]:
    "Keep your wallet active over time to earn a LongTermHolder credential.",
  [ScoreTier.Platinum]:
    "Get a Verified attestation from a trusted issuer to reach Diamond.",
  [ScoreTier.Diamond]: "You've reached the highest tier.",
};

export function ProgressToNextTier({ score }: { score: number }) {
  const { current, next, progress } = calculateProgressToNextTier(score);

  if (!next) {
    return (
      <div className="rounded-xl border border-cred-diamond/40 bg-cred-diamond/10 p-4 text-sm text-slate-200">
        You have reached the highest tier, Diamond. 🎉
      </div>
    );
  }

  const pointsNeeded = Math.max(TIER_MIN[next] - score, 0);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-slate-300">
        <span>{current}</span>
        <span>{next}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-cred-gold transition-all duration-700"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
      <p className="text-xs text-slate-400">
        {pointsNeeded} points to {next}
      </p>
      <p className="text-xs text-slate-500">{SUGGESTIONS[current]}</p>
    </div>
  );
}
