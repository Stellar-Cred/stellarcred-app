import type { Credential } from "@stellarcred/sdk";
import { credentialIcon, timeAgo, truncateAddress } from "@stellarcred/sdk";

const TYPE_COLORS: Record<string, string> = {
  PaymentRecord: "border-emerald-500/40 bg-emerald-500/10",
  StreamCompleted: "border-sky-500/40 bg-sky-500/10",
  InvoiceCreator: "border-amber-500/40 bg-amber-500/10",
  WillOwner: "border-purple-500/40 bg-purple-500/10",
  DeveloperContrib: "border-orange-500/40 bg-orange-500/10",
  LongTermHolder: "border-teal-500/40 bg-teal-500/10",
  Verified: "border-cred-gold/50 bg-cred-gold/10",
};

const DEFAULT_TYPE_COLOR = "border-slate-600/50 bg-slate-800/40";

export function CredentialCard({ credential }: { credential: Credential }) {
  const colorClass = TYPE_COLORS[credential.credentialType] ?? DEFAULT_TYPE_COLOR;

  return (
    <div className={`rounded-xl border p-4 ${colorClass}`}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-2xl">
          {credentialIcon(credential.credentialType)}
        </span>
        <span className="text-xs text-slate-400">
          {timeAgo(credential.issuedAt)}
        </span>
      </div>
      <h3 className="mt-3 font-semibold text-white">
        {credential.credentialType}
      </h3>
      <p className="mt-1 text-xs text-slate-400">
        Issued by{" "}
        <span className="font-mono">
          {truncateAddress(credential.issuer)}
        </span>
      </p>
      {credential.metadata ? (
        <p className="mt-2 truncate text-xs text-slate-500">
          {credential.metadata}
        </p>
      ) : null}
    </div>
  );
}
