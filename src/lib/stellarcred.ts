import {
  StellarCredClient,
  configureStellarCred,
  type StellarCredNetwork,
} from "@stellarcred/sdk";

const network = (process.env.NEXT_PUBLIC_STELLAR_NETWORK ||
  "testnet") as StellarCredNetwork;
const contractId = process.env.NEXT_PUBLIC_CONTRACT_ID || "";
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;

function buildConfig() {
  if (!contractId) {
    throw new Error(
      "StellarCred: NEXT_PUBLIC_CONTRACT_ID is not set. Copy .env.example to " +
        ".env.local and fill in your deployed contract ID.",
    );
  }
  return { network, contractId, ...(rpcUrl ? { rpcUrl } : {}) };
}

let client: StellarCredClient | null = null;

/**
 * Returns a shared StellarCredClient built from NEXT_PUBLIC_* env vars.
 * Also registers it as the default client used by the SDK's React hooks.
 */
export function getStellarCredClient(): StellarCredClient {
  if (!client) {
    const config = buildConfig();
    client = new StellarCredClient(config);
    configureStellarCred(config);
  }
  return client;
}
