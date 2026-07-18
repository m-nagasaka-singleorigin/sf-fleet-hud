import type { Metadata } from "next";
import { Saira_Condensed, Share_Tech_Mono } from "next/font/google";
import { HudToaster } from "@/registry/hud/hud-sonner";
import "./globals.css";

const sairaCondensed = Saira_Condensed({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-saira-condensed",
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://sf-fleet-hud.vercel.app"
  ),
  title: "SF FLEET HUD — shadcn/ui registry",
  description:
    "Dark sci-fi fleet-ops UI kit for shadcn/ui. Monochrome + orange accent, radius 0, condensed sans + terminal mono.",
  openGraph: {
    title: "SF Fleet HUD",
    description:
      "Dark sci-fi fleet-ops UI kit for shadcn/ui. 42 components, dark-only, MIT.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${sairaCondensed.variable} ${shareTechMono.variable} antialiased`}
      >
        {children}
        <HudToaster />
      </body>
    </html>
  );
}
