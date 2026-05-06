import type { Metadata } from "next";
import { Geist, Geist_Mono, Bevan, Big_Shoulders } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bevan = Bevan({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["800"],
});

export const metadata: Metadata = {
  title: "K/D Tracker",
  description:
    "Look up your Call of Duty rank against a global leaderboard.",
  openGraph: {
    title: "K/D Tracker",
    description:
      "Look up your Call of Duty rank against a global leaderboard.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 725,
        alt: "K/D Tracker",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "K/D Tracker",
    description:
      "Look up your Call of Duty rank against a global leaderboard.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${bevan.variable} ${bigShoulders.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
