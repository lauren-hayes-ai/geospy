import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <section className="max-w-6xl mx-auto px-4 py-24 text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm mb-6 border border-blue-500/20">
          IP Geolocation API
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
          Know Where Your<br />Requests Come From
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Accurate IP geolocation with country, city, ISP, timezone, and coordinates. One API key. Instant results.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/docs" className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-medium transition">
            Get Free API Key
          </a>
          <Link href="/docs" className="border border-gray-700 hover:border-gray-500 px-6 py-3 rounded-lg font-medium transition">
            View Docs →
          </Link>
        </div>
        <div className="mt-16 max-w-2xl mx-auto text-left bg-gray-900 rounded-xl border border-gray-800 p-6 overflow-x-auto">
          <div className="text-sm text-gray-500 mb-2">Example</div>
          <pre className="text-sm font-mono text-gray-300">{`curl https://geospy-eta.vercel.app/api/ip/8.8.8.8 \\
  -H "X-API-Key: gs_your_key_here"

# Response
{
  "data": {
    "ip": "8.8.8.8",
    "country": "United States",
    "city": "Mountain View",
    "timezone": "America/Los_Angeles",
    "isp": "Google LLC",
    "lat": 37.386,
    "lon": -122.0838
  },
  "usage": { "remaining": 97, "limit": 100 }
}`}</pre>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: '🌍', title: 'Global Coverage', desc: 'Accurate geolocation for IPs worldwide. Country, region, city, and coordinates.' },
            { icon: '⚡', title: 'Fast & Cached', desc: 'Sub-100ms average response. Results cached at the edge for frequently queried IPs.' },
            { icon: '🔒', title: 'Fraud Detection Ready', desc: 'ISP, ASN, timezone, and proxy detection built in. Perfect for risk scoring.' },
          ].map((f) => (
            <div key={f.title} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Free', price: '$0', limit: '100 req/day', keys: '1 key', features: ['100 lookups/day', '1 API key', 'Full geo data'] },
            { name: 'Standard', price: '$15', limit: '5,000 req/day', keys: '5 keys', features: ['5,000 lookups/day', '5 API keys', 'Full geo data', 'Email support'], highlight: true },
            { name: 'Pro', price: '$49', limit: '100k req/day', keys: 'Unlimited', features: ['100k lookups/day', 'Unlimited keys', 'Full geo data', 'Priority support', 'SLA'] },
          ].map((p) => (
            <div key={p.name} className={`rounded-xl p-6 border ${(p as any).highlight ? 'border-blue-500 bg-blue-500/5' : 'border-gray-800 bg-gray-900'}`}>
              <h3 className="text-xl font-bold mb-1">{p.name}</h3>
              <div className="text-3xl font-bold mb-1">{p.price}<span className="text-sm text-gray-400 font-normal">/mo</span></div>
              <p className="text-sm text-gray-400 mb-4">{p.limit} · {p.keys}</p>
              <ul className="space-y-1 mb-6">{p.features.map(f => <li key={f} className="text-sm text-gray-300 flex items-center gap-2"><span className="text-blue-400">✓</span>{f}</li>)}</ul>
              <a href="/docs" className={`block text-center py-2.5 rounded-lg text-sm font-medium transition ${(p as any).highlight ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'border border-gray-700 hover:border-gray-500 text-white'}`}>
                Get Started
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
