import { ScoreTier } from "@stellar-cred/sdk";

const TIER_STYLES: Record<ScoreTier, string> = {
  [ScoreTier.Newcomer]: "bg-slate-700 text-slate-200",
  [ScoreTier.Bronze]: "bg-amber-800 text-amber-100",
  [ScoreTier.Silver]: "bg-slate-400 text-slate-900",
  [ScoreTier.Gold]: "bg-cred-gold text-cred-dark",
  [ScoreTier.Platinum]: "bg-cred-purple text-white",
  [ScoreTier.Diamond]: "bg-cred-diamond text-cred-dark",
};

export function TierBadge({ tier }: { tier: ScoreTier }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${TIER_STYLES[tier]}`}
    >
      {tier}
    </span>
  );
}
