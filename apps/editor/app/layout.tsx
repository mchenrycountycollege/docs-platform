import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Lexend } from "next/font/google";
import "./globals.css";

// Self-hosted via next/font instead of a <link rel="stylesheet"> to
// fonts.googleapis.com: that render-blocking cross-origin request was
// delaying hydration on a cold session long enough that the first click
// anywhere in the shell (e.g. the bionic-reading toggle) landed before
// listeners were attached and silently did nothing -- a second click then
// "worked" once hydration had caught up. next/font fetches at build time and
// exposes the family as a CSS variable, so tokens.css below references
// var(--font-lexend) instead of the literal family name.
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MCC Docs · editor",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={lexend.variable}>
      <body>{children}</body>
    </html>
  );
}
