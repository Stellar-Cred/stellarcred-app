import { credentialIcon } from "@stellar-cred/sdk";

import { CREDENTIAL_TYPES } from "@/lib/credentialTypes";

export default function CredentialsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Credential Types</h1>
        <p className="mt-2 text-slate-400">
          Every way to build your StellarCred reputation score.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CREDENTIAL_TYPES.map((credential) => (
          <div
            key={credential.type}
            className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">
                {credentialIcon(credential.type)}
              </span>
              <span className="rounded-full bg-cred-gold/10 px-2 py-1 text-xs font-semibold text-cred-gold">
                {credential.points} pts
              </span>
            </div>
            <h3 className="mt-3 font-semibold text-white">
              {credential.type}
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              {credential.description}
            </p>
            <p className="mt-3 text-xs text-slate-500">
              <span className="font-semibold text-slate-400">
                Issued by:
              </span>{" "}
              {credential.issuedBy}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              <span className="font-semibold text-slate-400">
                How to earn:
              </span>{" "}
              {credential.howToEarn}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
