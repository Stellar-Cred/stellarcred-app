"use client";

import { truncateAddress } from "@stellar-cred/sdk";
import { useWallet } from "@stellar-cred/sdk/hooks";

export function WalletConnect() {
  const { publicKey, connect, disconnect, isConnected } = useWallet();

  if (isConnected && publicKey) {
    return (
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-slate-800 px-3 py-1.5 font-mono text-sm text-slate-200">
          {truncateAddress(publicKey)}
        </span>
        <button
          type="button"
          onClick={disconnect}
          className="text-sm text-slate-400 transition hover:text-white"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        void connect();
      }}
      className="rounded-full bg-cred-purple px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
    >
      Connect Wallet
    </button>
  );
}
