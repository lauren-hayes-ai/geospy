import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GeoSpy — IP Geolocation & Network Intelligence API",
  description: "IP geolocation for country, city, ISP, timezone, and coordinates. Built for developers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-950 text-gray-100 min-h-screen`}>
        <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-emerald-400">
              GeoSpy
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/docs" className="text-sm text-gray-400 hover:text-white transition">Docs</Link>
              <Link href="/#pricing" className="text-sm text-gray-400 hover:text-white transition">Pricing</Link>
              <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white transition">Dashboard</Link>
              <span className="text-sm bg-gray-700 px-4 py-2 rounded-lg text-gray-400 cursor-not-allowed">
                Sign In (Auth0 pending)
              </span>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
