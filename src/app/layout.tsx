import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

import { WalletConnect } from "@/components/WalletConnect";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StellarCred",
  description: "On-chain reputation on Stellar",
};

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/credentials", label: "Credentials" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/issuers", label: "Issuers" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen bg-cred-dark text-slate-100`}
      >
        <header className="border-b border-slate-800">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
            <Link href="/" className="text-lg font-bold text-white">
              Stellar<span className="text-cred-gold">Cred</span>
            </Link>
            <nav className="flex flex-wrap gap-5 text-sm text-slate-300">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <WalletConnect />
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
