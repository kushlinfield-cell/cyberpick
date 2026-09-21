import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import { ShortlistProvider } from "@/context/ShortlistContext";

export const metadata: Metadata = {
  title: "CyberPick — Find the right cybersecurity partner",
  description:
    "CyberPick helps Nordic buyers turn security requirements into a structured procurement brief, match with suitable providers, and request comparable proposals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-paper font-sans text-ink antialiased">
        <ShortlistProvider>{children}</ShortlistProvider>
      </body>
    </html>
  );
}
