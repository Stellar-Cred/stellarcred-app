import Link from "next/link";
import { credentialIcon } from "@stellar-cred/sdk";

import { AddressSearch } from "@/components/AddressSearch";
import { CREDENTIAL_TYPES } from "@/lib/credentialTypes";

const STEPS = [
  {
    title: "Take action on Stellar",
    description:
      "Pay an invoice, complete a payment stream, or merge a contribution.",
  },
  {
    title: "Issuer mints credential to your wallet",
    description:
      "The protocol you interacted with issues a soul-bound credential.",
  },
  {
    title: "Score calculated automatically",
    description:
      "Your credentials combine into a 0-1000 on-chain reputation score.",
  },
  {
    title: "Other dApps use your score",
    description:
      "Any Stellar app can query your score to gate access or set terms.",
  },
];

const WHY_CARDS = [
  {
    title: "No KYC needed",
    description:
      "Your reputation comes from verified on-chain activity, not identity documents.",
  },
  {
    title: "Permissionless",
    description:
      "Any registered Stellar protocol can issue credentials — no gatekeepers.",
  },
  {
    title: "Composable with any dApp",
    description:
      "A single contract call is all any app needs to read your score.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-24">
      <section className="flex flex-col items-center gap-6 py-12 text-center">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          Your on-chain reputation on{" "}
          <span className="text-cred-gold">Stellar</span>
        </h1>
        <p className="max-w-2xl text-slate-400">
          StellarCred turns your verified on-chain activity — payments,
          streams, contributions, and attestations — into a portable,
          soul-bound reputation score any Stellar dApp can read. No KYC, no
          off-chain systems.
        </p>
        <AddressSearch />
        <Link
          href="/dashboard"
          className="rounded-full bg-cred-purple px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        >
          View Your Profile
        </Link>
      </section>

      <section>
        <h2 className="mb-8 text-center text-2xl font-bold text-white">
          How it works
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
            >
              <span className="text-sm font-semibold text-cred-gold">
                Step {index + 1}
              </span>
              <h3 className="mt-2 font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-center text-2xl font-bold text-white">
          Credential types
        </h2>
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
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-center text-2xl font-bold text-white">
          Why StellarCred
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {WHY_CARDS.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center"
            >
              <h3 className="font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-400">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
        <p>
          StellarCred is built for the{" "}
          <a
            href="https://www.drips.network/wave/stellar"
            target="_blank"
            rel="noreferrer"
            className="text-cred-gold hover:underline"
          >
            Drips Stellar Wave
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
