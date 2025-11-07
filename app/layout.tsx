import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Greece Trip Blog",
  description: "Stories, photos, and highlights from an unforgettable journey through Greece.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-zinc-900`}>
        <nav className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
            <Link href="/" className="text-lg font-semibold">Greece Trip</Link>
            <Link href="/new" className="rounded-md bg-sky-700 px-3 py-1.5 text-sm text-white hover:bg-sky-800">Add Post</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
