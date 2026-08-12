import { truncateAddress } from "@stellarcred/sdk";

import { getStellarCredClient } from "@/lib/stellarcred";

export const dynamic = "force-dynamic";

export default async function IssuersPage() {
  const client = getStellarCredClient();
  const issuers = await client.getIssuers();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Registered Issuers</h1>
        <p className="mt-2 text-slate-400">
          Protocols authorized to issue StellarCred credentials.
        </p>
      </div>

      {issuers.length === 0 ? (
        <p className="text-center text-sm text-slate-400">
          No issuers have registered yet.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {issuers.map((issuer) => (
            <div
              key={issuer.address}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">{issuer.name}</h3>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    issuer.active
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {issuer.active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="mt-1 font-mono text-xs text-slate-500">
                {truncateAddress(issuer.address)}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {issuer.credentialTypes.map((type) => (
                  <span
                    key={type}
                    className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300"
                  >
                    {type}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Registered {issuer.registeredAt.toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
