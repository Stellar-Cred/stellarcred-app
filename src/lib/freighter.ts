import {
  connectWallet,
  getPublicKey,
  isFreighterInstalled,
} from "@stellar-cred/sdk";

const isBrowser = typeof window !== "undefined";

/**
 * SSR-safe check for whether the Freighter extension is installed. Always
 * resolves to `false` when called during server rendering.
 */
export async function safeIsFreighterInstalled(): Promise<boolean> {
  if (!isBrowser) {
    return false;
  }
  return isFreighterInstalled();
}

/**
 * SSR-safe wallet connect. Resolves to `null` (instead of throwing) when
 * called during server rendering.
 */
export async function safeConnectWallet(): Promise<string | null> {
  if (!isBrowser) {
    return null;
  }
  return connectWallet();
}

/**
 * SSR-safe public key lookup. Resolves to `null` during server rendering,
 * or if Freighter is not installed/connected, instead of throwing.
 */
export async function safeGetPublicKey(): Promise<string | null> {
  if (!isBrowser) {
    return null;
  }
  try {
    return await getPublicKey();
  } catch {
    return null;
  }
}
