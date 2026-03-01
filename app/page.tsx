import Link from 'next/link'

const S = {
  page: { background: '#030712', minHeight: '100vh', color: '#f1f5f9', fontFamily: 'Inter, system-ui, sans-serif' } as React.CSSProperties,
  section: { maxWidth: 1100, margin: '0 auto', padding: '80px 32px' } as React.CSSProperties,
  badge: { display: 'inline-block', padding: '4px 14px', borderRadius: 999, background: 'rgba(52,211,153,0.1)', color: '#6ee7b7', fontSize: 13, border: '1px solid rgba(52,211,153,0.2)', marginBottom: 24 } as React.CSSProperties,
  h1: { fontSize: 52, fontWeight: 700, lineHeight: 1.15, margin: '0 0 20px', color: '#ffffff' } as React.CSSProperties,
  lead: { fontSize: 19, color: '#94a3b8', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.65 } as React.CSSProperties,
  btnPrimary: { display: 'inline-block', background: '#059669', color: '#ffffff', padding: '12px 28px', borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: 'none' } as React.CSSProperties,
  btnSecondary: { display: 'inline-block', border: '1px solid #334155', color: '#e2e8f0', padding: '12px 28px', borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: 'none' } as React.CSSProperties,
  codeBox: { background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, padding: '24px', marginTop: 48, maxWidth: 660, marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' } as React.CSSProperties,
  pre: { fontSize: 13, fontFamily: 'ui-monospace, monospace', whiteSpace: 'pre', overflowX: 'auto', margin: 0, lineHeight: 1.6 } as React.CSSProperties,
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 } as React.CSSProperties,
  card: { background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, padding: '24px' } as React.CSSProperties,
  sectionTitle: { fontSize: 30, fontWeight: 700, color: '#ffffff', marginBottom: 12, textAlign: 'center' } as React.CSSProperties,
  sectionSub: { fontSize: 15, color: '#64748b', textAlign: 'center', marginBottom: 48 } as React.CSSProperties,
};

export default function Home() {
  return (
    <div style={S.page}>
      {/* Hero */}
      <div style={{ ...S.section, textAlign: 'center' }}>
        <div style={S.badge}>IP Geolocation API</div>
        <h1 style={S.h1}>Know Where Your<br />Requests Come From</h1>
        <p style={S.lead}>
          Accurate IP geolocation with country, city, ISP, timezone, and coordinates.<br />One API key. Instant results.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href="/docs" style={S.btnPrimary}>Get Free API Key</Link>
          <Link href="/docs" style={S.btnSecondary}>View Docs →</Link>
        </div>
        <div style={S.codeBox}>
          <div style={{ fontSize: 12, color: '#475569', marginBottom: 8 }}>Example</div>
          <pre style={{ ...S.pre, color: '#94a3b8' }}>{`curl https://geospy-lovat.vercel.app/api/v1/ip/8.8.8.8 \\
  -H "X-API-Key: gs_your_key_here"`}</pre>
          <pre style={{ ...S.pre, color: '#6ee7b7', marginTop: 16 }}>{`{
  "data": {
    "ip": "8.8.8.8",
    "country": "United States",
    "city": "Mountain View",
    "timezone": "America/Los_Angeles",
    "isp": "Google LLC"
  },
  "usage": { "remaining": 97, "limit": 100 }
}`}</pre>
        </div>
      </div>

      {/* Features */}
      <div style={{ ...S.section, paddingTop: 0 }}>
        <div style={S.grid3}>
          {[
            { icon: '🌍', title: 'Global Coverage', desc: 'Accurate geolocation for IPs worldwide. Country, region, city, and coordinates.' },
            { icon: '⚡', title: 'Fast & Cached', desc: 'Sub-100ms average response. Results cached at the edge for frequently queried IPs.' },
            { icon: '🔒', title: 'Fraud Detection Ready', desc: 'ISP, ASN, timezone, and proxy detection built in. Perfect for risk scoring.' },
          ].map(f => (
            <div key={f.title} style={S.card}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.55 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div style={{ ...S.section, paddingTop: 0 }}>
        <div style={S.sectionTitle as React.CSSProperties}>Simple Pricing</div>
        <div style={{ fontSize: 15, color: '#64748b', textAlign: 'center', marginBottom: 48 } as React.CSSProperties}>Start free, upgrade when you need more.</div>
        <div style={S.grid3}>
          {[
            { name: 'Free', price: '$0', period: '/mo', limit: '100 req/day', features: ['100 lookups/day', '1 API key', 'Full geo data'], highlight: false },
            { name: 'Standard', price: '$15', period: '/mo', limit: '5,000 req/day', features: ['5,000 lookups/day', '5 API keys', 'Full geo data', 'Email support'], highlight: true },
            { name: 'Pro', price: '$49', period: '/mo', limit: '100k req/day', features: ['100k lookups/day', 'Unlimited keys', 'Full geo data', 'Priority support', 'SLA'], highlight: false },
          ].map(p => (
            <div key={p.name} style={{ ...S.card, border: p.highlight ? '1px solid #059669' : '1px solid #1e293b', background: p.highlight ? '#022c22' : '#0f172a' }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#e2e8f0', marginBottom: 6 }}>{p.name}</div>
              <div style={{ fontSize: 38, fontWeight: 700, color: '#ffffff' }}>{p.price}<span style={{ fontSize: 14, color: '#64748b', fontWeight: 400 }}>{p.period}</span></div>
              <div style={{ fontSize: 13, color: '#475569', marginBottom: 20 }}>{p.limit}</div>
              <div style={{ marginBottom: 24 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#94a3b8', marginBottom: 8 }}>
                    <span style={{ color: '#34d399' }}>✓</span>{f}
                  </div>
                ))}
              </div>
              <Link href="/docs" style={{ display: 'block', textAlign: 'center', padding: '10px', borderRadius: 8, background: p.highlight ? '#059669' : 'transparent', border: p.highlight ? 'none' : '1px solid #334155', color: '#ffffff', textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#475569' }}>
          <span>© 2026 GeoSpy. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/docs" style={{ color: '#475569', textDecoration: 'none' }}>Docs</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
