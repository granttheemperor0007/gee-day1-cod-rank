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
  description: "K/D Tracker",
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
