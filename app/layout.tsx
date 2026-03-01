import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GeoSpy — IP Geolocation API",
  description: "IP geolocation for country, city, ISP, timezone, and coordinates.",
};

const navStyle: React.CSSProperties = {
  borderBottom: '1px solid #1e293b',
  background: 'rgba(3,7,18,0.95)',
  position: 'sticky', top: 0, zIndex: 50,
};
const navInner: React.CSSProperties = {
  maxWidth: 1100, margin: '0 auto', padding: '0 32px',
  height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#030712', color: '#f1f5f9', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <nav style={navStyle}>
          <div style={navInner}>
            <Link href="/" style={{ fontSize: 18, fontWeight: 700, color: '#34d399', textDecoration: 'none' }}>GeoSpy</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <Link href="/docs" style={{ fontSize: 14, color: '#64748b', textDecoration: 'none' }}>Docs</Link>
              <Link href="/#pricing" style={{ fontSize: 14, color: '#64748b', textDecoration: 'none' }}>Pricing</Link>
              <Link href="/dashboard" style={{ fontSize: 14, color: '#64748b', textDecoration: 'none' }}>Dashboard</Link>
              <span style={{ fontSize: 14, color: '#475569', padding: '7px 18px', background: '#1e293b', borderRadius: 7 }}>Auth0 pending</span>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
