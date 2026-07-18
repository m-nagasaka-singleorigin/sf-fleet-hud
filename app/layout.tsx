import type { Metadata } from "next";
import { Saira_Condensed, Share_Tech_Mono } from "next/font/google";
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
  title: "SF FLEET HUD — shadcn/ui registry",
  description:
    "Dark sci-fi fleet-ops UI kit for shadcn/ui. Monochrome + orange accent, radius 0, condensed sans + terminal mono.",
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
      </body>
    </html>
  );
}
