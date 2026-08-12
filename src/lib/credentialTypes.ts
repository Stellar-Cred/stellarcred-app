export interface CredentialTypeInfo {
  type: string;
  description: string;
  points: number;
  issuedBy: string;
  howToEarn: string;
}

export const CREDENTIAL_TYPES: CredentialTypeInfo[] = [
  {
    type: "PaymentRecord",
    description: "Wallet completed a verified on-chain payment.",
    points: 10,
    issuedBy: "Payments protocols",
    howToEarn:
      "Complete a payment through a StellarCred-integrated payments protocol.",
  },
  {
    type: "StreamCompleted",
    description: "Wallet fully completed a payment stream.",
    points: 20,
    issuedBy: "Streaming protocols",
    howToEarn:
      "Let a payment stream run to completion through an integrated protocol.",
  },
  {
    type: "InvoiceCreator",
    description: "Wallet created and settled an invoice.",
    points: 15,
    issuedBy: "Invoicing protocols",
    howToEarn:
      "Create and settle an invoice through an integrated invoicing protocol.",
  },
  {
    type: "WillOwner",
    description:
      "Wallet holds a configured on-chain will or inheritance plan.",
    points: 25,
    issuedBy: "Estate-planning protocols",
    howToEarn:
      "Configure an on-chain will or inheritance plan through an integrated protocol.",
  },
  {
    type: "DeveloperContrib",
    description: "Wallet merged a verified open-source contribution.",
    points: 30,
    issuedBy: "Open-source ecosystems (e.g. Drips)",
    howToEarn:
      "Get a merged pull request credited by a StellarCred-integrated repository.",
  },
  {
    type: "LongTermHolder",
    description: "Wallet has sustained on-chain activity over time.",
    points: 50,
    issuedBy: "StellarCred protocol",
    howToEarn: "Keep your wallet active on Stellar over an extended period.",
  },
  {
    type: "Verified",
    description:
      "Wallet passed a higher-trust manual or protocol attestation.",
    points: 100,
    issuedBy: "Trusted attestation issuers",
    howToEarn:
      "Pass a manual or protocol-level identity/trust attestation from a registered issuer.",
  },
];
